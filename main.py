import os
import sys

site_packages = '/home/Popolekok0/.local/lib/python3.10/site-packages'
if site_packages not in sys.path:
    sys.path.append(site_packages)

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://popolekok0.github.io"}})

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

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    api_key = os.environ.get('GEMINI_API_KEY')
    try:
        response = chat_with_gemini(user_message, api_key)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def health_check():
    return "Server is running!"

if __name__ == "__main__":
    port = 5000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 5000.")
    app.run(host='0.0.0.0', port=port)