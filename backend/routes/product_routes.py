from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from config import firebase_app  

db = firestore.client()
product_ref = db.collection('crops')

product_bp = Blueprint('product_routes', __name__)

@product_bp.route('/add_crop', methods=['POST'])
def add_crop():
    try:
        data = request.get_json()

        required_fields = ['type', 'available_qty', 'availabe_tokens', 'price_per_token']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        doc_ref = product_ref.add(data)

        return jsonify({
            "message": "Crop added successfully",
            "doc_id": doc_ref[1].id
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
