import numpy as np

def calculate_measurements(shoulder_line, waist_line, hip_line):
    """
    Calculate body measurements and determine body shape based on shoulder, waist, and hip lines.
    
    Args:
        shoulder_line: List of points defining the shoulder line
        waist_line: List of points defining the waist line
        hip_line: List of points defining the hip line
    
    Returns:
        Dictionary containing measurements and body shape information
    """
    # WIDTH CALCUALTION
    shoulder_width = abs(shoulder_line[1]['x'] - shoulder_line[0]['x'])
    waist_width = abs(waist_line[1]['x'] - waist_line[0]['x'])
    hip_width = abs(hip_line[1]['x'] - hip_line[0]['x'])
    
    # RATIO CALCULATION
    shoulder_to_waist = shoulder_width / waist_width if waist_width > 0 else 0
    shoulder_to_hip = shoulder_width / hip_width if hip_width > 0 else 0
    waist_to_hip = waist_width / hip_width if hip_width > 0 else 0
    
    # BODY SHAPE DETERMINATION
    body_shape = determine_body_shape(shoulder_width, waist_width, hip_width)
    
    result = {
        'measurements': {
            'shoulder_width': round(shoulder_width, 2),
            'waist_width': round(waist_width, 2),
            'hip_width': round(hip_width, 2),
        },
        'ratios': {
            'shoulder_to_waist': round(shoulder_to_waist, 2),
            'shoulder_to_hip': round(shoulder_to_hip, 2),
            'waist_to_hip': round(waist_to_hip, 2),
        },
        'body_shape': body_shape,
        'description': get_body_shape_description(body_shape)
    }
    print("Sending result to frontend:", result)
    return result

def determine_body_shape(shoulder, waist, hip):
    """
    Determine body shape based on shoulder, waist, and hip measurements.
    
    Returns:
        String representing the body shape
    """
    # Tolerance threshold for considering measurements "equal"
    threshold = 0.05
    
    # Calculate ratios
    shoulder_hip_ratio = shoulder / hip
    shoulder_waist_ratio = shoulder / waist
    waist_hip_ratio = waist / hip
    
    # Print ratios for debugging
    print(f"Shoulder to Hip ratio: {shoulder_hip_ratio:.2f}")
    print(f"Shoulder to Waist ratio: {shoulder_waist_ratio:.2f}")
    print(f"Waist to Hip ratio: {waist_hip_ratio:.2f}")
    
    # Better body shape determination with clearer rules
    
    # Pear / Triangle
    if shoulder_hip_ratio < 0.97 and waist_hip_ratio < 0.9:
        return "Pear"
    
    # Hourglass
    # Shoulders and hips aligned with defined waist
    if abs(shoulder_hip_ratio - 1) < threshold and waist_hip_ratio < 0.8:
        return "Hourglass"
    
    # Inverted Triangle
    if shoulder_hip_ratio > 1.05 and shoulder_waist_ratio > 1.15:
        return "Inverted Triangle"
    
    # Rectangle / Straight
    if abs(shoulder_hip_ratio - 1) < threshold and waist_hip_ratio >= 0.8:
        return "Rectangle"
    
    # Apple / Round
    if waist_hip_ratio >= 0.9 and shoulder_hip_ratio < 1.05:
        return "Apple"
    
    # If we can't determine clearly, use a more generalized approach
    if shoulder_hip_ratio < 0.97:
        return "Pear"
    elif shoulder_hip_ratio > 1.05:
        return "Inverted Triangle"
    elif waist_hip_ratio < 0.8:
        return "Hourglass"
    else:
        return "Rectangle"

def get_body_shape_description(body_shape):
    """
    Get description for a given body shape.
    
    Returns:
        String with description of the body shape
    """
    descriptions = {
        "Hourglass": "Balanced shoulders and hips with a defined waist.",
        "Inverted Triangle": "Broader shoulders compared to hips, with a defined waist.",
        "Pear": "Narrower shoulders compared to hips, with a defined waist.",
        "Rectangle": "Balanced shoulders and hips with less waist definition.",
        "Apple": "Midsection is larger than shoulders and hips with less waist definition.",
        "Not Determined": "Unable to determine body shape from the measurements."
    }
    
    return descriptions.get(body_shape, "No description available.")