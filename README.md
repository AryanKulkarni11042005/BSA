# Body Shape Analyzer

This project is a web application designed to analyze body shapes using a single uploaded image. It utilizes a DeepLab model for image segmentation and provides an interface for users to select key body lines (shoulder, waist, and hip) to calculate body measurements.

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

The frontend is built using React and includes the following components:

- **ImageUploader**: Allows users to upload an image for analysis.
- **BodySegmenter**: Handles the segmentation of the uploaded image using the DeepLab model.
- **MeasurementInterface**: Provides an interface for users to select the shoulder line, waist line, and hip line on the segmented image.
- **ResultDisplay**: Displays the results of the body shape analysis, including calculated measurements.

### Backend

The backend is built using Flask and includes:

- **DeepLab Model**: Implements the segmentation model for processing images.
- **Segmentation Utilities**: Contains functions for image processing and segmentation.
- **Measurement Utilities**: Provides functions for calculating body measurements based on user-selected lines.

## Setup Instructions

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies using npm:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies using pip:
   ```
   pip install -r requirements.txt
   ```
3. Run the Flask application:
   ```
   python app.py
   ```

## Usage

1. Open the web application in your browser.
2. Upload an image of your body.
3. Use the measurement interface to select the shoulder, waist, and hip lines.
4. View the calculated body shape analysis results.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.