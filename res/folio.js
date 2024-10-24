const generateThumbnail = (url) => {
    return `https://image.thum.io/get/width/600/crop/800/viewportWidth/1200/png/${url}`;
};

const getDomainFromUrl = (url) => {
    try {
        const domain = new URL(url).hostname;
        return domain.replace(/^www\./, '');
    } catch {
        return url;
    }
};

const createArticle = (data) => {
    const article = document.createElement('article');
    
    const thumbnail = document.createElement('img');
    thumbnail.alt = data.url;
    thumbnail.loading = 'lazy';
    thumbnail.style.width = '100%';
    thumbnail.style.height = 'auto';
    thumbnail.style.borderRadius = '4px';
    thumbnail.src = generateThumbnail(data.url);
    
    const type = document.createElement('span');
    type.textContent = data.type;
    type.className = `badge ${data.type.toLowerCase()}`;
    
    const title = document.createElement('h2');
    const titleLink = document.createElement('a');
    titleLink.href = data.url;
    titleLink.textContent = getDomainFromUrl(data.url);
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    title.appendChild(titleLink);
    
    article.appendChild(thumbnail);
    article.appendChild(type);
    article.appendChild(title);
    
    return article;
};

const loadFolio = async (csvUrl) => {
    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        const projects = csvText
            .split('\n')
            .slice(1) // Skip header row
            .filter(row => row.trim()) // Remove empty rows
            .map(row => {
                const [type, url] = row.split(',').map(field => field.trim());
                return { type, url };
            });
        
        const grid = document.querySelector('#projects .grid');
        grid.innerHTML = ''; // Clear existing content
        
        projects.forEach(project => {
            const article = createArticle(project);
            grid.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading folio:', error);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadFolio('res/projects.csv');
});
