from flask import Flask, request, jsonify
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

app = Flask(__name__)

# Load Model and Tokenizer
model_path = "sentiment_model.pth"
tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")

model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased", num_labels=3)
model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
model.eval()

labels = ["Negative", "Neutral", "Positive"]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Tokenization
    inputs = tokenizer(text, truncation=True, padding="max_length", max_length=128, return_tensors="pt")
    
    with torch.no_grad():
        output = model(**inputs)
    
    prediction = torch.argmax(output.logits, dim=1).item()
    
    return jsonify({"sentiment": labels[prediction]})

if __name__ == "__main__":
    app.run(debug=True)
