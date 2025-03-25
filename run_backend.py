# filepath: /Users/aryankulkarni/Desktop/AuraSync/Web App/body-shape-analyzer/run_backend.py
import os
import sys
import subprocess

def run_backend():
    # Determine OS-specific commands
    is_windows = sys.platform.startswith('win')
    
    if is_windows:
        venv_activate = "venv\\Scripts\\activate"
        python_path = "venv\\Scripts\\python.exe"
    else:
        venv_activate = "source venv/bin/activate"
        python_path = "venv/bin/python"
    
    # Check if virtual environment exists
    if not os.path.exists("venv"):
        print("Creating virtual environment...")
        subprocess.run(["python", "-m", "venv", "venv"], shell=True)
    
    # Install dependencies
    print("Installing dependencies...")
    if is_windows:
        subprocess.run(f"{venv_activate} && pip install -r requirements.txt", shell=True)
    else:
        subprocess.run(f"{venv_activate} && pip install -r requirements.txt", shell=True)
    
    # Run the Flask app
    print("Starting Flask backend...")
    if is_windows:
        subprocess.run(f"{python_path} backend/app.py", shell=True)
    else:
        subprocess.run(f"{python_path} backend/app.py", shell=True)

if __name__ == "__main__":
    run_backend()