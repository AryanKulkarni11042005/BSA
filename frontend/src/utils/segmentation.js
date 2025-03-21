import axios from 'axios';

// Function to upload and segment an image using the Flask backend
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    // Change the URL to use the service name from docker-compose.yml
    const response = await axios.post('http://localhost:5001/api/segment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.segmented_image;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Function to calculate body measurements
export const calculateMeasurements = async (shoulderLine, waistLine, hipLine) => {
  try {
    // Change the URL to use the service name from docker-compose.yml
    const response = await axios.post('http://localhost:5001/api/calculate', {
      shoulder_line: shoulderLine,
      waist_line: waistLine,
      hip_line: hipLine
    });
    
    return response.data;
  } catch (error) {
    console.error('Error calculating measurements:', error);
    throw error;
  }
};