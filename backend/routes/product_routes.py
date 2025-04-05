from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from config import *  # Firebase initialization
from firebase_admin import firestore

# Blueprint setup
crop_bp = Blueprint('crop_routes', __name__)
db = firestore.client()

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

    # Prepare the user data to store in Firestore
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
        # Add the crop data to Firestore
        db.collection('harvest').add(crop_data)
        return jsonify({"message": "Crop data submitted successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
