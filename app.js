// app.js

// Example frontend code (JavaScript) to interact with the backend
async function generateBio() {
    const career = document.getElementById('career').value;
    const personality = document.getElementById('personality').value;
    const interests = document.getElementById('interests').value;
    const relationshipGoals = document.getElementById('relationshipGoals').value;
  
    const response = await fetch('http://127.0.0.1:5000/generate_bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        career: career,
        personality: personality,
        interests: interests,
        relationshipGoals: relationshipGoals
      })
    });
  
    const data = await response.json();
    if (data.bio) {
      document.getElementById('bio').innerText = data.bio;
    } else {
      document.getElementById('bio').innerText = 'Error generating bio';
    }
  }
  
  // Add event listener to the form to trigger the function when the user submits
  document.getElementById('bio-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from reloading the page
    generateBio();
  });
  