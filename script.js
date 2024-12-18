// Fetch travel recommendations
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.recommendationData = data;
    })
    .catch(error => console.error("Error fetching recommendations:", error));

// Search functionality
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    
    if (window.recommendationData) {
        let results = [];

        if (query.includes('beach')) {
            results = window.recommendationData.beaches;
        }

        else if (query.includes('temple')) {
            results = window.recommendationData.temples;
        }

        else {
            window.recommendationData.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(query) || country.name.toLowerCase().includes(query)) {
                        results.push(city);
                    }
                });
            });
        }

        if (results.length > 0) {
            results.forEach(result => {
                const resultCard = document.createElement('div');
                resultCard.className = 'recommendation';
                resultCard.innerHTML = `
                    <img src="${result.imageUrl}" alt="${result.name}">
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                `;
                resultsContainer.appendChild(resultCard);
            });
        } else {
            resultsContainer.innerHTML = '<p>No recommendations found. Try different keywords!</p>';
        }
    } else {
        alert('Data not loaded yet. Please try again later.');
    }

    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 50);
});

// Clear results
document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = '';
});

// Contact form feedback
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
});
