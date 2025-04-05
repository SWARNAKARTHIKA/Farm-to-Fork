from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth

app = Flask(__name__)
CORS(app)

# Upload folder
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Firebase Admin Initialization using JSON from env variable
cred_dict = json.loads(os.environ["FIREBASE_CONFIG"])
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

@app.route('/add_crop', methods=['POST'])
def add_crop():
    form_data = request.form
    land_record = request.files.get('land_record')
    field_photo = request.files.get('field_photo')

    # Save uploaded files
    land_record_filename = secure_filename(land_record.filename) if land_record else None
    field_photo_filename = secure_filename(field_photo.filename) if field_photo else None
    
    if land_record:
        land_record_path = os.path.join(app.config['UPLOAD_FOLDER'], land_record_filename)
        land_record.save(land_record_path)
    if field_photo:
        field_photo_path = os.path.join(app.config['UPLOAD_FOLDER'], field_photo_filename)
        field_photo.save(field_photo_path)

    # Construct crop data
    crop = {
        'crop_type': form_data['crop_type'],
        'variety': form_data['variety'],
        'sowing_date': form_data['sowing_date'],
        'expected_harvest_date': form_data['expected_harvest_date'],
        'total_land_area': form_data['total_land_area'],
        'expected_yield': form_data['expected_yield'],
        'historical_yield': form_data['historical_yield'],
        'irrigation_source': form_data['irrigation_source'],
        'fertilizer_pesticide_use': form_data['fertilizer_pesticide_use'],
        'token_quantity_kg': form_data['token_quantity_kg'],
        'token_price_per_kg': form_data['token_price_per_kg'],
        'min_purchase_quantity': form_data['min_purchase_quantity'],
        'land_record_path': land_record_path if land_record else None,
        'field_photo_path': field_photo_path if field_photo else None,
    }

    # Store crop data in Firestore
    db.collection('crops').add(crop)

    return jsonify({"message": "Crop data added successfully!"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Retrieve user from Firestore by username
    users_ref = db.collection('users')
    query = users_ref.where('username', '==', username).where('password', '==', password).limit(1)
    results = query.stream()

    user = None
    for doc in results:
        user = doc.to_dict()

    if user:
        # If user is found, authenticate using Firebase Admin SDK
        try:
            # In a real scenario, you would use Firebase Authentication to verify credentials
            # Here, we simulate it by assuming the user is valid if they exist in Firestore.
            return jsonify({"message": "Login successful!", "user": user})
        except Exception as e:
            return jsonify({"message": f"Authentication failed: {str(e)}"}), 400
    else:
        return jsonify({"message": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)
