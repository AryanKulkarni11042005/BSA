import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageUpload(file);
    }
  }, [onImageUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });
  
  return (
    <div className="uploader-container">
      <h2>Upload Your Image</h2>
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
    </div>
  );
};

export default ImageUploader;