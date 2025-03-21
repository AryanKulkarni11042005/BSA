import React, { useState, useRef, useEffect } from 'react';
import { calculateMeasurements } from '../utils/segmentation';

const MeasurementInterface = ({ segmentedImage, onMeasurementComplete, onBack }) => {
  const [step, setStep] = useState('shoulder');
  const [shoulderLine, setShoulderLine] = useState([]);
  const [waistLine, setWaistLine] = useState([]);
  const [hipLine, setHipLine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [measurements, setMeasurements] = useState(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (segmentedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.onload = () => {
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Draw instructions
        ctx.font = '18px Arial';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        const instructions = getInstructions();
        ctx.strokeText(instructions, 10, 30);
        ctx.fillText(instructions, 10, 30);
      };
      img.src = segmentedImage;
    }
  }, [segmentedImage, step]);
  
  useEffect(() => {
    console.log("Current measurements state:", measurements);
  }, [measurements]);
  
  const getInstructions = () => {
    switch(step) {
      case 'shoulder':
        return 'Click to mark left and right shoulder points';
      case 'waist':
        return 'Click to mark left and right waist points';
      case 'hip':
        return 'Click to mark left and right hip points';
      default:
        return '';
    }
  };
  
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const point = { x, y };
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    switch(step) {
      case 'shoulder':
        if (shoulderLine.length < 2) {
          const newShoulderLine = [...shoulderLine, point];
          setShoulderLine(newShoulderLine);
          
          if (newShoulderLine.length === 2) {
            drawLine(ctx, newShoulderLine, 'red');
            setStep('waist');
          }
        }
        break;
      case 'waist':
        if (waistLine.length < 2) {
          const newWaistLine = [...waistLine, point];
          setWaistLine(newWaistLine);
          
          if (newWaistLine.length === 2) {
            drawLine(ctx, newWaistLine, 'green');
            setStep('hip');
          }
        }
        break;
      case 'hip':
        if (hipLine.length < 2) {
          const newHipLine = [...hipLine, point];
          setHipLine(newHipLine);
          
          if (newHipLine.length === 2) {
            drawLine(ctx, newHipLine, 'blue');
            setStep('complete');
          }
        }
        break;
      default:
        break;
    }
  };
  
  const drawLine = (ctx, points, color) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.stroke();
  };
  
  const handleSubmit = async () => {
    if (shoulderLine.length === 2 && waistLine.length === 2 && hipLine.length === 2) {
      setLoading(true);
      try {
        console.log("Sending measurements to backend:", shoulderLine, waistLine, hipLine);
        const data = await calculateMeasurements(shoulderLine, waistLine, hipLine);
        console.log("Received measurements from backend:", data);
        setMeasurements(data);
        onMeasurementComplete(data);
      } catch (error) {
        console.error('Error calculating measurements:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleReset = () => {
    setShoulderLine([]);
    setWaistLine([]);
    setHipLine([]);
    setStep('shoulder');
    
    // Redraw the canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = segmentedImage;
  };
  
  return (
    <div className="measurement-container">
      <h2>Mark Your Measurement Lines</h2>
      <div className="canvas-container">
        <canvas 
          ref={canvasRef} 
          onClick={handleCanvasClick}
          className="measurement-canvas"
        />
      </div>
      
      <div className="controls">
        <button onClick={onBack} disabled={loading}>Back</button>
        <button onClick={handleReset} disabled={loading}>Reset Lines</button>
        {step === 'complete' && (
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="analyze-button"
          >
            {loading ? 'Analyzing...' : 'Analyze Body Shape'}
          </button>
        )}
      </div>
      
      <div className="instructions">
        <p>{getInstructions()}</p>
        <ul>
          <li className={shoulderLine.length === 2 ? 'completed' : ''}>Shoulder Line (Red)</li>
          <li className={waistLine.length === 2 ? 'completed' : ''}>Waist Line (Green)</li>
          <li className={hipLine.length === 2 ? 'completed' : ''}>Hip Line (Blue)</li>
        </ul>
      </div>
    </div>
  );
};

export default MeasurementInterface;