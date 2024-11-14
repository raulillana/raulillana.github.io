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
    const domain = getDomainFromUrl(data.url);
    
    // Create image container with fixed aspect ratio (800/600 = 1.33)
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    imageContainer.style.paddingBottom = '40%';
    
    const thumbnail = document.createElement('img');
    thumbnail.alt = data.url;
    thumbnail.loading = 'lazy';
    thumbnail.dataset.src = `res/imgs/${domain}.png`;
    
    // Add load event listener
    thumbnail.addEventListener('load', () => {
        thumbnail.classList.add('loaded');
    });
    
    imageContainer.appendChild(thumbnail);
    
    const type = document.createElement('span');
    type.textContent = data.type;
    type.className = `badge type ${data.type.toLowerCase()}`;

    const tech = document.createElement('span');
    tech.textContent = data.tech;
    tech.className = `badge tech ${data.tech.toLowerCase()}`;
    
    const title = document.createElement('h2');
    const titleLink = document.createElement('a');
    titleLink.href = data.url;
    titleLink.textContent = domain;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    title.appendChild(titleLink);
    
    article.appendChild(title);
    article.appendChild(imageContainer);
    article.appendChild(type);
    article.appendChild(tech);
    
    return article;
};

const observeImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
};

const projects = [
    { tech: "WORDPRESS", type: "PERSONAL", url: "https://embotellador.es" },
    { tech: "WORDPRESS", type: "PERSONAL", url: "https://alegre.pro" },
    { tech: "STATIC", type: "PERSONAL", url: "https://raulillana.com" },
    { tech: "WORDPRESS", type: "FREELANCE", url: "https://cooperatingvolunteers.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://unareceta.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://museunacional.cat" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://pcactual.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://rbarevistas.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://agorasanitaria.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://cofbserveis.net/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://ddgi.cat/web/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://miriadax.net/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://smartcampus.neurotrauma.net/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://moodleted.telefonicaed.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://theycorrect.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://wiikon.es/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://campus-mcmutual.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://geze.es/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://irec.cat/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://actualidadviajes.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://absolutcruceros.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://tatuantes.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://notigatos.es/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://noticaballos.com/" },
    { tech: "WORDPRESS", type: "FREELANCE", url: "https://coptering.com" },
    { tech: "WORDPRESS", type: "FREELANCE", url: "https://kalapa-clinic.com" },
    { tech: "WORDPRESS", type: "FREELANCE", url: "https://misterbarcelo.com" },
    { tech: "WORDPRESS", type: "FREELANCE", url: "https://felycan.es" },
    { tech: "WORDPRESS", type: "FREELANCE", url: "https://sensalialabs.com" },
    { tech: "WORDPRESS", type: "FREELANCE", url: "https://stakehound.com" },
    { tech: "WORDPRESS", type: "FREELANCE", url: "https://imperfectus.com" },
    { tech: "WORDPRESS", type: "PERSONAL", url: "https://iphoneado.com" },
    { tech: "WORDPRESS", type: "PERSONAL", url: "https://paradiabeticos.es" },
    { tech: "WORDPRESS", type: "PERSONAL", url: "https://wpmercs.com" },
    { tech: "WORDPRESS", type: "PERSONAL", url: "https://wordcamp.es" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://mundoperros.es/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://meteorologiaenred.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://hombresconestilo.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://cibercactus.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://actualidadliteratura.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://renovablesverdes.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://formacionyestudios.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://economiafinanzas.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://actualidadecommerce.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://nutridieta.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://madreshoy.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://jardineriaon.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://thermorecetas.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://mycookrecetas.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://windowsnoticias.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://ubunlog.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://trucosdescargas.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://todoereaders.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://soydemac.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://linuxadictos.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://hwlibre.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://blog.desdelinux.net/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://creativosonline.org/blog/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://androidguias.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://androidsis.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://actualidadiphone.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://actualidadgadget.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://actualidadmotor.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://guiaswow.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://bezzia.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://lasrecetascocina.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://hoteles4you.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://absolutviajes.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://actualidadblog.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://abinternet.es" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://crenco.org/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://dracoglobal.es/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://eduma.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://escolamarilocasals.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://fp.uoc.fje.edu/ca/estudis" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://folio.uoc.edu/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://uoc.edu/portal/es/uoc-x/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://didactaplus.com/" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://mirai.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://almirall.com" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://almirall.es" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://almirall.co.uk" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://almirall.global" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://terribilis.net" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://blog.camon.es" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://iasist.com.es" },
    { tech: "WORDPRESS", type: "AGENCY", url: "https://gestion.campus-mcmutual.com/" }
];

const loadFolio = () => {
    try {
        const grid = document.querySelector('#projects .grid');
        grid.innerHTML = ''; // Clear existing content
        
        projects.forEach(project => {
            const article = createArticle(project);
            grid.appendChild(article);
        });
        
        // Start observing images for lazy loading
        observeImages();
    } catch (error) {
        console.error('Error loading folio:', error);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadFolio);
