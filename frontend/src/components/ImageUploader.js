import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUploader = ({ onImageUpload }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [countdown, setCountdown] = useState(null); // State for the countdown
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onImageUpload(file);
      }
    },
    accept: 'image/*',
    multiple: false,
  });

  const openWebcam = () => {
    setIsWebcamOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
      });
  };

  const startCountdown = () => {
    let timeLeft = 10; // 10 seconds countdown
    setCountdown(timeLeft);

    const timer = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        captureImage(); // Capture the image when the countdown ends
      }
    }, 1000);
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert canvas to image
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
        setCapturedImage(URL.createObjectURL(blob));
        onImageUpload(file);
      }, 'image/jpeg');
    }
    setCountdown(null); // Reset the countdown
  };

  const closeWebcam = () => {
    setIsWebcamOpen(false);
    setCountdown(null); // Reset the countdown
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="uploader-container">
      <h2>Upload or Capture Your Image</h2>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <div className="upload-instructions">
            <p>Drag & drop an image here, or click to select one</p>
            <small>
              For best results, use a full-body photo against a simple background
            </small>
          </div>
        )}
      </div>
      <button onClick={openWebcam} className="capture-button">
        Open Webcam
      </button>
      {isWebcamOpen && (
        <div className="webcam-container">
          <video ref={videoRef} className="webcam-feed"></video>
          <canvas ref={canvasRef} className="webcam-canvas" width="640" height="480" style={{ display: 'none' }}></canvas>
          {countdown === null ? (
            <button onClick={startCountdown} className="capture-button">
              Start 10-Second Timer
            </button>
          ) : (
            <div className="countdown-display">
              <h3>Capturing in {countdown} seconds...</h3>
            </div>
          )}
          <button onClick={closeWebcam} className="close-button">
            Close Webcam
          </button>
        </div>
      )}
      {capturedImage && (
        <div className="captured-image-preview">
          <h3>Captured Image:</h3>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;