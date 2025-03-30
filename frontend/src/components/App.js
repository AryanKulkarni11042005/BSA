import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import BodySegmenter from './BodySegmenter';
import MeasurementInterface from './MeasurementInterface';
import ResultDisplay from './ResultDisplay';
import Instructions from './Instructions';
import '../styles/main.css';

const App = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [segmentedImage, setSegmentedImage] = useState(null);
    const [measurements, setMeasurements] = useState(null);
    const [currentStep, setCurrentStep] = useState(0); // Start with step 0 for instructions

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
        setCurrentStep(0); // Reset to instructions
    };

    const handleBack = () => {
        setCurrentStep(prevStep => Math.max(0, prevStep - 1));
    };

    const handleProceedFromInstructions = () => {
        setCurrentStep(1); // Move to the image upload step
    };

    return (
        <div className="app-container">
            <h1>Body Shape Analyzer</h1>
            <div className="content-container">
                {/* Sidebar for instructions */}
                <div className="instructions-sidebar">
                    <Instructions />
                </div>

                {/* Main content */}
                <div className="main-content">
                    {currentStep === 0 && (
                        <div>
                            <h2>Welcome to the Body Shape Analyzer</h2>
                            <button onClick={handleProceedFromInstructions} className="proceed-button">
                                Proceed to Upload
                            </button>
                        </div>
                    )}
                    
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
            </div>
        </div>
    );
};

export default App;