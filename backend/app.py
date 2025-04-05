from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore
from routes.product_routes import crop_bp  # Import crop blueprint
#from user_routes import user_bp  # Import user blueprint

load_dotenv()

app = Flask(__name__)
CORS(app)

# Upload folder setup
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Firebase Admin Initialization using JSON from env variable
cred_dict = json.loads(os.environ["FIREBASE_CONFIG"])
# Check if Firebase app is already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

@app.route('/register', methods=['POST'])
def register():
    form_data = request.form
    file = request.files['id_proof']

    # Save uploaded file
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Construct user data
    user = {
        'username': form_data['username'],
        'password': form_data['password'],
        'mobile': form_data['mobile'],
        'location': form_data['location'],
        'city': form_data['city'],
        'state': form_data['state'],
        'role': form_data['role'],
        'id_proof_path': file_path
    }

    # Store in Firestore
    db.collection('users').add(user)

    return jsonify({"message": "User registered successfully!"})

# Register the blueprints
#app.register_blueprint(user_bp, url_prefix='/api')  # Register the user blueprint with '/api' prefix
app.register_blueprint(crop_bp, url_prefix='/api')  # Register the crop blueprint with '/api' prefix

if __name__ == '__main__':
    app.run(debug=True)
