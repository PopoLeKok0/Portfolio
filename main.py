from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Define the chat function
def chat_with_gemini(user_input, api_key):
    genai.configure(api_key=api_key)

    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash-exp",
        generation_config=generation_config,
    )

    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(user_input)
    return response.text

# Flask route
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    api_key = "AIzaSyBuMEdQaZoxffJ2YX1LyrJpnlABa6OhkRU"  # Your API key
    try:
        response = chat_with_gemini(user_message, api_key)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)