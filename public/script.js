async function fetchNews() {
    try {
        const response = await fetch('http://localhost:5000/api/news');
        const data = await response.json();

        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; // Clear any existing content

        data.articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Fetch news when the page loads
window.onload = fetchNews;
