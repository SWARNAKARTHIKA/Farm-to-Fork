from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# MongoDB connection
client = MongoClient("mongodb+srv://atlas-sample-dataset-load-67f0f450c1c41262ab8f4fc3:Swarna123@farm-to-fork.fatlubj.mongodb.net/")
db = client['farm_to_fork']
collection = db['users']

@app.route('/register', methods=['POST'])
def register():
    form_data = request.form
    file = request.files['id_proof']

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

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

    collection.insert_one(user)
    return jsonify({"message": "User registered successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
