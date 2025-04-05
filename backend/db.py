import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")  
firebase_admin.initialize_app(cred)

db = firestore.client()

crops = [
    {
        "type": "Tomato",
        "available_qty": 150,
        "available_tokens": 30,
        "price_per_token": 20
    },
    {
        "type": "Basmati Rice",
        "available_qty": 500,
        "available_tokens": 100,
        "price_per_token": 50
    },
    {
        "type": "Potato",
        "available_qty": 300,
        "available_tokens": 60,
        "price_per_token": 15
    },
    {
        "type": "Carrot",
        "available_qty": 120,
        "available_tokens": 25,
        "price_per_token": 18
    },
    {
        "type": "Wheat",
        "available_qty": 1000,
        "available_tokens": 200,
        "price_per_token": 40
    },
    {
        "type": "Brinjal",
        "available_qty": 100,
        "available_tokens": 20,
        "price_per_token": 16
    },
    {
        "type": "Onion",
        "available_qty": 250,
        "available_tokens": 50,
        "price_per_token": 12
    },
    {
        "type": "Chili",
        "available_qty": 80,
        "available_tokens": 16,
        "price_per_token": 22
    },
    {
        "type": "Maize",
        "available_qty": 700,
        "available_tokens": 140,
        "price_per_token": 30
    },
    {
        "type": "Cabbage",
        "available_qty": 90,
        "available_tokens": 18,
        "price_per_token": 14
    }
]


buyers = [
    {"buyer_id": "buyer_001", "name": "Anita Rao", "contact": "9876543210", "location": "Chennai"},
    {"buyer_id": "buyer_002", "name": "Ravi Kumar", "contact": "9823456781", "location": "Coimbatore"},
    {"buyer_id": "buyer_003", "name": "Sita Iyer", "contact": "9843210987", "location": "Madurai"},
    {"buyer_id": "buyer_004", "name": "Amit Shah", "contact": "9887654321", "location": "Trichy"},
    {"buyer_id": "buyer_005", "name": "Meena Das", "contact": "9812345678", "location": "Salem"}
]


vendors = [
    {"vendor_id": "vendor_001", "name": "Arun Veggies", "area": "Chennai", "selling_type": "vegetables", "contact": "9000000001", "min_price": 15},
    {"vendor_id": "vendor_002", "name": "Green Grains", "area": "Madurai", "selling_type": "grains", "contact": "9000000002", "min_price": 45},
    {"vendor_id": "vendor_003", "name": "Fresh Farm", "area": "Trichy", "selling_type": "vegetables", "contact": "9000000003", "min_price": 18},
    {"vendor_id": "vendor_004", "name": "Golden Wheat", "area": "Salem", "selling_type": "grains", "contact": "9000000004", "min_price": 35},
    {"vendor_id": "vendor_005", "name": "Onion Express", "area": "Erode", "selling_type": "vegetables", "contact": "9000000005", "min_price": 10},
    {"vendor_id": "vendor_006", "name": "Veggie Cart", "area": "Tirunelveli", "selling_type": "vegetables", "contact": "9000000006", "min_price": 12}
]


for crop in crops:
    db.collection("crops").add(crop)

for buyer in buyers:
    db.collection("buyers").document(buyer["buyer_id"]).set(buyer)

for vendor in vendors:
    db.collection("vendors").document(vendor["vendor_id"]).set(vendor)

print("✅ Crops, Buyers, and Vendors added to Firestore!")
