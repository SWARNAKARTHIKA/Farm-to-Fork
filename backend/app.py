from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

# Import Blueprints
from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from routes.buyer_routes import buyer_bp
#from routes.ledger_routes import ledger_bp
from routes.vendor_routes import vendor_bp

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

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(product_bp, url_prefix='/api')
app.register_blueprint(buyer_bp, url_prefix='/api')
#app.register_blueprint(ledger_bp, url_prefix='/api')
app.register_blueprint(vendor_bp, url_prefix='/api')

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

if __name__ == '__main__':
    app.run(debug=True)
