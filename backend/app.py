from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore

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

# Register user route
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

# Add crop route
@app.route('/api/add_crop', methods=['POST'])
def add_crop():
    # Extract form data
    form_data = request.form
    
    # Handle file uploads
    land_record = request.files.get('landRecord')
    field_photo = request.files.get('fieldPhoto')

    # Save the uploaded files to the server
    land_record_path = None
    field_photo_path = None

    if land_record:
        land_record_filename = secure_filename(land_record.filename)
        land_record_path = os.path.join(app.config['UPLOAD_FOLDER'], land_record_filename)
        land_record.save(land_record_path)

    if field_photo:
        field_photo_filename = secure_filename(field_photo.filename)
        field_photo_path = os.path.join(app.config['UPLOAD_FOLDER'], field_photo_filename)
        field_photo.save(field_photo_path)

    # Prepare the crop data to store in Firestore
    crop_data = {
        'crop_type': form_data.get('cropType'),
        'variety': form_data.get('variety'),
        'sowing_date': form_data.get('sowingDate'),
        'expected_harvest_date': form_data.get('harvestDate'),
        'total_land_area': form_data.get('landArea'),
        'expected_yield': form_data.get('expectedYield'),
        'historical_yield': form_data.get('historicalYield'),
        'irrigation_source': form_data.get('irrigationSource'),
        'fertilizer_pesticide_use': form_data.get('fertilizerUse'),
        'token_quantity_kg': form_data.get('tokenQty'),
        'token_price_per_kg': form_data.get('tokenPrice'),
        'min_purchase_quantity': form_data.get('minQty'),
        'land_record_path': land_record_path,  # Path of land record file
        'field_photo_path': field_photo_path,  # Path of field photo file
    }

    try:
        # Add the crop data to Firestore in 'harvest' collection
        db.collection('harvest').add(crop_data)
        return jsonify({"message": "Crop data submitted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
