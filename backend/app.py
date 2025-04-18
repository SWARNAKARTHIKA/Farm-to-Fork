from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth
from dotenv import load_dotenv

load_dotenv()

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

@app.route('/register/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Retrieve user from Firestore by username and password
    users_ref = db.collection('users')
    query = users_ref.where('username', '==', username).where('password', '==', password).limit(1)
    results = query.stream()

    user = None
    for doc in results:
        user = doc.to_dict()

    if user:
        try:
            # Extract role from user document
            role = user.get('role', 'unknown').lower()
            return jsonify({
                "success": True,
                "message": "Login successful!",
                "role": role,
                "username": user.get('username')  # optional: you can return more info
            })
        except Exception as e:
            return jsonify({"success": False, "message": f"Authentication failed: {str(e)}"}), 400
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

@app.route('/api/register_vendor', methods=['POST'])
def register_vendor():
    try:
        # Get form data from the request
        data = request.get_json()

        # Create the vendor data
        vendor = {
            'vendorName': data['vendorName'],
            'contactPerson': data['contactPerson'],
            'phone': data['phone'],
            'vendorType': data['vendorType'],
            'baseLocation': data['baseLocation'],
            'serviceArea': data['serviceArea'],
            'cropsAccepted': data['cropsAccepted'],
            'minQty': data['minQty'],
            'maxQty': data['maxQty'],
            'pickup': data['pickup'],
            'storageType': data['storageType'],
            'storageCapacity': data['storageCapacity'],
            'advancePayment': data['advancePayment'],
            'pricingType': data['pricingType'],
            'grading': data['grading'],
            'packagingTesting': data['packagingTesting'],
        }

        # Add vendor data to Firestore
        db.collection('vendor_details').add(vendor)

        return jsonify({"message": "Vendor registered successfully!"}), 200
    except Exception as e:
        return jsonify({"message": f"Error occurred: {str(e)}"}), 500
        
@app.route('/select_vendor', methods=['GET'])
def select_vendor():
    try:
        # Fetch all vendors or filter based on pickup service
        vendors_ref = db.collection('vendor_details')  # You can remove `.where` for all vendors
        docs = vendors_ref.stream()

        vendors = []
        for doc in docs:
            data = doc.to_dict()
            data['id'] = doc.id  # optional: include Firestore document ID
            vendors.append(data)

        # Check if vendors list is empty
        if not vendors:
            return jsonify({"message": "No vendors found"}), 200

        return jsonify({"vendors": vendors}), 200
    except Exception as e:
        return jsonify({"message": f"Failed to fetch vendor data: {str(e)}"}), 500

@app.route('/available_tokens', methods=['GET'])
def available_tokens():
    tokens_ref = db.collection('crops').stream()
    available = []
    for doc in tokens_ref:
        data = doc.to_dict()
        # Attach document ID as tokenId for frontend tracking
        data['tokenId'] = doc.id
        # Rename fields to match frontend keys
        available.append({
            'cropType': data.get('crop_type'),
            'variety': data.get('variety'),
            'sowingDate': data.get('sowing_date'),
            'harvestDate': data.get('expected_harvest_date'),
            'landArea': data.get('total_land_area'),
            'expectedYield': data.get('expected_yield'),
            'irrigationSource': data.get('irrigation_source'),
            'fertilizerUse': data.get('fertilizer_pesticide_use'),
            'tokenQty': int(data.get('token_quantity_kg', 0)),
            'tokenPrice': float(data.get('token_price_per_kg', 0)),
            'minQty': int(data.get('min_purchase_quantity', 1)),
            'tokenId': doc.id
        })
    return jsonify(available)
@app.route('/buy_token', methods=['POST'])
def buy_token():
    data = request.get_json()
    user_qty = int(data.get('tokenQty'))  # Quantity user wants to buy

    # Fetch the first crop document (you can modify this logic to get 'latest' or 'featured')
    crops = db.collection('crops').limit(1).get()

    if not crops:
        return jsonify({'error': 'No crop tokens available'}), 404

    crop_doc = crops[0]
    crop_data = crop_doc.to_dict()
    available_qty = int(crop_data.get('token_quantity_kg', 0))  # Available tokens

    if user_qty > available_qty:
        return jsonify({'error': 'Not enough tokens available'}), 400

    # Update the available quantity in Firestore
    db.collection('crops').document(crop_doc.id).update({
        'token_quantity_kg': available_qty - user_qty
    })

    # Save purchase data (no tokenId field)
    buyer_token_data = {
        'cropType': crop_data.get('crop_type'),
        'variety': crop_data.get('variety'),
        'sowingDate': crop_data.get('sowing_date'),
        'harvestDate': crop_data.get('expected_harvest_date'),
        'landArea': crop_data.get('total_land_area'),
        'expectedYield': crop_data.get('expected_yield'),
        'irrigationSource': crop_data.get('irrigation_source'),
        'fertilizerUse': crop_data.get('fertilizer_pesticide_use'),
        'tokenQtyAvailable': available_qty,
        'userPurchaseQty': user_qty,
        'tokenPrice': crop_data.get('token_price_per_kg'),
        'minQty': crop_data.get('min_purchase_quantity')
    }

    db.collection('user_tokens').add(buyer_token_data)

    return jsonify({'message': f'Successfully bought {user_qty} tokens'}), 200


@app.route('/user_tokens', methods=['GET'])
def get_user_tokens():
    try:
        tokens_ref = db.collection('user_tokens').stream()

        tokens = []
        for doc in tokens_ref:
            data = doc.to_dict()
            data['tokenId'] = doc.id  # Include the document ID if needed
            tokens.append(data)

        if not tokens:
            return jsonify({'message': 'No tokens purchased yet'}), 200

        return jsonify(tokens), 200
    except Exception as e:
        return jsonify({'error': f'Failed to fetch purchased tokens: {str(e)}'}), 500

@app.route('/harvest_details', methods=['GET'])
def get_harvest_details():
    try:
        harvest_ref = db.collection('harvest').stream()
        harvest_list = []

        for doc in harvest_ref:
            data = doc.to_dict()
            harvest_list.append({
                'harvestId': doc.id,
                'crop_type': data.get('crop_type'),
                'expected_harvest_date': data.get('expected_harvest_date'),
                'expected_yield': data.get('expected_yield'),
                'fertilizer_pesticide_use': data.get('fertilizer_pesticide_use'),
                'field_photo_path': data.get('field_photo_path'),
                'historical_yield': data.get('historical_yield'),
                'irrigation_source': data.get('irrigation_source'),
                'land_record_path': data.get('land_record_path'),
                'min_purchase_quantity': data.get('min_purchase_quantity'),
                'sowing_date': data.get('sowing_date'),
                'token_price_per_kg': data.get('token_price_per_kg'),
                'token_quantity_kg': data.get('token_quantity_kg'),
                'total_land_area': data.get('total_land_area'),
                'variety': data.get('variety')
            })

        if not harvest_list:
            return jsonify({'message': 'No harvest details available'}), 200

        return jsonify(harvest_list), 200

    except Exception as e:
        return jsonify({'error': f'Failed to fetch harvest details: {str(e)}'}), 500



if __name__ == '__main__':
    app.run(debug=True)
