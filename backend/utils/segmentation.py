import torch
import torchvision.transforms as transforms
import numpy as np
import cv2
from PIL import Image
import base64
import io
from torchvision.models.segmentation import deeplabv3_resnet50

def segment_image(image_file):
    try:
        print("Starting image segmentation")
        
        # Load the model (download only once and cache it)
        print("Loading DeepLabv3 model...")
        model = deeplabv3_resnet50(pretrained=True)
        model.eval()
        
        print("Processing uploaded image...")
        # Open and preprocess the image
        img = Image.open(image_file.stream).convert("RGB")
        
        # Define preprocessing transformations
        preprocess = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        
        # Preprocess the image
        input_tensor = preprocess(img)
        input_batch = input_tensor.unsqueeze(0)  # Add batch dimension
        
        # Perform inference
        with torch.no_grad():
            output = model(input_batch)['out'][0]
        
        # Get the predicted class for each pixel (person class is 15 in COCO)
        person_mask = (output.argmax(0) == 15).byte().cpu().numpy()
        
        # Apply the mask to the original image
        img_array = np.array(img)
        segmented_img = img_array.copy()
        
        # Create a blended image: keep person, make background darker
        background = img_array.copy()
        background = background * 0.3  # Darken the background
        
        # Apply the person mask
        for c in range(3):  # For each color channel
            segmented_img[:, :, c] = np.where(person_mask == 1, img_array[:, :, c], background[:, :, c])
        
        # Convert the segmented image to PIL Image
        segmented_pil = Image.fromarray(segmented_img.astype('uint8'))
        
        # Convert to base64 string to return to frontend
        buffered = io.BytesIO()
        segmented_pil.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        print("Segmentation complete, returning result")
        return img_str
    except Exception as e:
        print(f"Error in segmentation: {str(e)}")
        raise