import React, { useState, useEffect } from 'react';
import { uploadImage } from '../utils/segmentation';

const BodySegmenter = ({ image, onSegmentation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("Initializing segmentation...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const segmentImage = async () => {
      try {
        setIsLoading(true);
        setProgress("Sending image to server...");
        setError(null);
        
        setTimeout(() => {
          if (isLoading) setProgress("Processing image (this may take a few minutes)...");
        }, 3000);
        
        setTimeout(() => {
          if (isLoading) setProgress("Applying body segmentation model...");
        }, 10000);
        
        const segmentedImageBase64 = await uploadImage(image);
        onSegmentation(`data:image/png;base64,${segmentedImageBase64}`);
      } catch (error) {
        console.error('Segmentation error:', error);
        setError("Failed to segment the image. Please try again with a different image.");
      } finally {
        setIsLoading(false);
      }
    };

    if (image) {
      segmentImage();
    }
  }, [image, onSegmentation]);

  if (error) {
    return (
      <div className="segmenter-error">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="segmenter-container">
      <h3>Body Segmentation</h3>
      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>{progress}</p>
        </div>
      )}
    </div>
  );
};

export default BodySegmenter;