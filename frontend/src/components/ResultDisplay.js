import React from 'react';

const ResultDisplay = ({ measurements, segmentedImage, onReset }) => {
  console.log("Rendering results with:", measurements);
  
  if (!measurements) {
    return <div>No measurement data available</div>;
  }

  return (
    <div className="results-container">
      <h2>Your Body Shape Analysis</h2>
      
      <div className="results-grid">
        <div className="image-section">
          <img 
            src={segmentedImage} 
            alt="Body shape" 
            className="result-image" 
          />
        </div>
        
        <div className="measurements-section">
          <div className="body-shape-result">
            <h3>Your Body Shape</h3>
            <div className="shape-name">{measurements.body_shape || "Not determined"}</div>
            <p className="shape-description">{measurements.description || "No description available"}</p>
          </div>
          
          <div className="measurements-details">
            <h3>Measurements</h3>
            <table>
              <tbody>
                <tr>
                  <td>Shoulder Width:</td>
                  <td>{measurements.measurements?.shoulder_width || "N/A"} px</td>
                </tr>
                <tr>
                  <td>Waist Width:</td>
                  <td>{measurements.measurements?.waist_width || "N/A"} px</td>
                </tr>
                <tr>
                  <td>Hip Width:</td>
                  <td>{measurements.measurements?.hip_width || "N/A"} px</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="ratios-details">
            <h3>Proportion Ratios</h3>
            <table>
              <tbody>
                <tr>
                  <td>Shoulder to Waist:</td>
                  <td>{measurements.ratios?.shoulder_to_waist || "N/A"}</td>
                </tr>
                <tr>
                  <td>Shoulder to Hip:</td>
                  <td>{measurements.ratios?.shoulder_to_hip || "N/A"}</td>
                </tr>
                <tr>
                  <td>Waist to Hip:</td>
                  <td>{measurements.ratios?.waist_to_hip || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="actions">
        <button onClick={onReset} className="reset-button">Analyze Another Photo</button>
      </div>
    </div>
  );
};

export default ResultDisplay;