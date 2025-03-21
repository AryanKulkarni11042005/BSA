import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import BodySegmenter from './BodySegmenter';
import MeasurementInterface from './MeasurementInterface';
import ResultDisplay from './ResultDisplay';
import '../styles/main.css';

const App = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [segmentedImage, setSegmentedImage] = useState(null);
    const [measurements, setMeasurements] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    const handleImageUpload = (uploadedImage) => {
        setOriginalImage(uploadedImage);
        setCurrentStep(2);
    };

    const handleSegmentation = (segmented) => {
        setSegmentedImage(segmented);
        setCurrentStep(3);
    };

    const handleMeasurementComplete = (newMeasurements) => {
        console.log("Measurements received:", newMeasurements);
        setMeasurements(newMeasurements);
        setCurrentStep(4);
    };

    const handleReset = () => {
        setOriginalImage(null);
        setSegmentedImage(null);
        setMeasurements(null);
        setCurrentStep(1);
    };

    const handleBack = () => {
        setCurrentStep(prevStep => Math.max(1, prevStep - 1));
    };

    return (
        <div className="app-container">
            <h1>Body Shape Analyzer</h1>
            
            {currentStep === 1 && (
                <ImageUploader onImageUpload={handleImageUpload} />
            )}
            
            {currentStep === 2 && originalImage && (
                <BodySegmenter 
                    image={originalImage} 
                    onSegmentation={handleSegmentation} 
                    onBack={handleBack}
                />
            )}
            
            {currentStep === 3 && segmentedImage && (
                <MeasurementInterface 
                    segmentedImage={segmentedImage} 
                    onMeasurementComplete={handleMeasurementComplete} 
                    onBack={handleBack}
                />
            )}
            
            {currentStep === 4 && measurements && (
                <ResultDisplay 
                    measurements={measurements} 
                    segmentedImage={segmentedImage}
                    onReset={handleReset}
                />
            )}
        </div>
    );
};

export default App;