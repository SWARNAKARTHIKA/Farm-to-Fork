from pymongo import MongoClient

uri = "mongodb+srv://soumya:soumya123@farm-to-fork.fatlubj.mongodb.net/?retryWrites=true&w=majority&appName=Farm-to-Fork"
client = MongoClient(uri)
db = client.test
print(db.list_collection_names())
