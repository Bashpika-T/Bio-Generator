from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Initialize the GPT model
bio_generator = pipeline("text-generation", model="distilgpt2")

@app.route('/generate_bio', methods=['POST'])
def generate_bio():
    try:
        # Get the user inputs from the request body
        data = request.get_json()
        career = data.get('career')
        personality = data.get('personality')
        interests = data.get('interests')
        relationship_goals = data.get('relationshipGoals')

        # Construct the prompt for the bio generator
        prompt = (
            f"- **The {personality} {career}**\n\n"
            f'"{personality} {career} with a passion for {interests.lower()}. '
            f'Seeking a partner who shares my {relationship_goals.lower()}."'
        )

        # Generate the bio
        generated_bio = bio_generator(prompt, max_length=200, num_return_sequences=1)[0]['generated_text']
        
        # Return the generated bio as JSON
        return jsonify({'bio': generated_bio})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
