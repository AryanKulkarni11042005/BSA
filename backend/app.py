from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from utils.segmentation import segment_image
from utils.measurements import calculate_measurements

app = Flask(__name__)
# Allow all origins in development
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/segment', methods=['POST'])
def segment():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    segmented_image = segment_image(image)
    
    return jsonify({'segmented_image': segmented_image}), 200

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    shoulder_line = data.get('shoulder_line')
    waist_line = data.get('waist_line')
    hip_line = data.get('hip_line')
    
    if not shoulder_line or not waist_line or not hip_line:
        return jsonify({'error': 'Missing measurement lines'}), 400
    
    measurements = calculate_measurements(shoulder_line, waist_line, hip_line)
    
    return jsonify(measurements), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)  # Changed from 5000 to 5001