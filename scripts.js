document.addEventListener('DOMContentLoaded', () => {
    const bioForm = document.getElementById('bio-form');
    const generatedBio = document.getElementById('generated-bio');

    bioForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get user inputs
        const career = document.getElementById('career').value;
        const personality = document.getElementById('personality').value;
        const interests = document.getElementById('interests').value;
        const relationshipGoals = document.getElementById('relationship-goals').value;

        // Create an object to send to the backend
        const userInput = {
            career,
            personality,
            interests,
            relationshipGoals,
        };

        try {
            // Send the input to the backend
            const response = await fetch('http://localhost:5000/generate_bio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInput),
            });

            if (response.ok) {
                const data = await response.json();
                // Display the generated bio
                generatedBio.textContent = data.bio;
            } else {
                generatedBio.textContent = 'Error generating bio. Please try again.';
            }
        } catch (error) {
            generatedBio.textContent = 'Network error. Please check your connection.';
        }
    });
});
