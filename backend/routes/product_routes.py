from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from firebase_admin import firestore, credentials, initialize_app

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
initialize_app(cred)
db = firestore.client()

# Blueprint setup
crop_bp = Blueprint('crop_routes', __name__)

UPLOAD_FOLDER = 'uploads'  # Folder to save uploaded files
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@crop_bp.route('/add_crop', methods=['POST'])
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
        land_record_path = os.path.join(UPLOAD_FOLDER, land_record_filename)
        land_record.save(land_record_path)

    if field_photo:
        field_photo_filename = secure_filename(field_photo.filename)
        field_photo_path = os.path.join(UPLOAD_FOLDER, field_photo_filename)
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


# Add a route to retrieve the crop details
@crop_bp.route('/get_crops', methods=['GET'])
def get_crops():
    try:
        crops_ref = db.collection('harvest')
        crops = crops_ref.stream()
        crops_list = []

        for crop in crops:
            crops_list.append(crop.to_dict())

        return jsonify(crops_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
