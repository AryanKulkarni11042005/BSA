import React from 'react';

const Instructions = ({ onProceed }) => {
    return (
        <div className="instructions-container">
            <h2>Instructions for Capturing an Image</h2>
            <ul>
                <li>The room should be well-lit to ensure clear visibility.</li>
                <li>Clothes should not be baggy; wear fitted clothing for accurate measurements.</li>
                <li>Ensure that your entire body is visible in the frame.</li>
                <li>Stand straight and avoid slouching for better accuracy.</li>
                <li>Position the camera at a height that captures your full body.</li>
            </ul>
            {/* <button onClick={onProceed} className="proceed-button">Proceed</button> */}
        </div>
    );
};

export default Instructions;