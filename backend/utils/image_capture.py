import cv2
import requests
import time

def capture_image(filename='captured_image.jpg', countdown_seconds=10):
    # Open the camera
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open camera.")
        return None
    
    # Set up font for displaying countdown
    font = cv2.FONT_HERSHEY_SIMPLEX
    
    # Countdown loop
    start_time = time.time()
    while time.time() - start_time < countdown_seconds:
        # Read a frame
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame.")
            cap.release()
            return None
        
        # Calculate remaining time
        remaining = countdown_seconds - int(time.time() - start_time)
        
        # Display the countdown on the frame
        cv2.putText(frame, f"Capturing in: {remaining}s", (50, 50), 
                    font, 1, (0, 255, 255), 2, cv2.LINE_AA)
        
        # Display the frame
        cv2.imshow('Webcam Countdown', frame)
        
        # Exit if user presses 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            cap.release()
            cv2.destroyAllWindows()
            return None
    
    # After countdown, capture the image
    ret, frame = cap.read()
    cv2.destroyAllWindows()
    
    if ret:
        cv2.imwrite(filename, frame)
        print(f"Image saved as {filename}")
    else:
        print("Error: Could not capture image.")
        filename = None
    
    cap.release()
    return filename

def upload_image(file_path, upload_url):
    if file_path:
        files = {'file': open(file_path, 'rb')}
        response = requests.post(upload_url, files=files)
        print(f"Response: {response.text}")
    else:
        print("No image to upload.")

if __name__ == "__main__":
    image_path = capture_image()
    if image_path:
        upload_url = "http://your-model-server.com/upload"  # Change to your actual model API URL
        upload_image(image_path, upload_url)
