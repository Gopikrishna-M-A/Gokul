from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app,origins = "https://gokul-alpha.vercel.app",
                methods=["GET", "POST", "PUT", "DELETE"])


# GET route to fetch all todos
@app.route('/', methods=['GET'])
def get_todos():
    return jsonify("server running")

# POST route to add a new todo
@app.route('/predict', methods=['POST'])
def checkCr():

    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']
    
    # Ensure the file has an allowed extension
    if file and allowed_file(file.filename):
        file.save('source.mp4') 

    return jsonify({'data': "File uploaded successfully"}), 201

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}  # Define the allowed video file extensions
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run()
