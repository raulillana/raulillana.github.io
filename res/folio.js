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
    const domain = getDomainFromUrl(data.url);
    thumbnail.src = `res/imgs/${domain}.png`;
    
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

// Deprecated projects:
//{ type: "AGENCY", url: "https://socialistes.cat" },

const projects = [
    { type: "PERSONAL", url: "https://embotellador.es" },
    { type: "PERSONAL", url: "https://alegre.pro" },
    { type: "PERSONAL", url: "https://raulillana.com" },
    { type: "FREELANCE", url: "https://cooperatingvolunteers.com" },
    { type: "AGENCY", url: "https://unareceta.com" },
    { type: "AGENCY", url: "https://museunacional.cat" },
    { type: "AGENCY", url: "https://pcactual.com" },
    { type: "AGENCY", url: "https://rbarevistas.com" },
    { type: "AGENCY", url: "https://agorasanitaria.com/" },
    { type: "AGENCY", url: "https://cofbserveis.net/" },
    { type: "AGENCY", url: "https://ddgi.cat/web/" },
    { type: "AGENCY", url: "https://miriadax.net/" },
    { type: "AGENCY", url: "https://smartcampus.neurotrauma.net/" },
    { type: "AGENCY", url: "https://moodleted.telefonicaed.com/" },
    { type: "AGENCY", url: "https://theycorrect.com/" },
    { type: "AGENCY", url: "https://wiikon.es/" },
    { type: "AGENCY", url: "https://campus-mcmutual.com/" },
    { type: "AGENCY", url: "https://geze.es/" },
    { type: "AGENCY", url: "https://irec.cat/" },
    { type: "AGENCY", url: "https://actualidadviajes.com/" },
    { type: "AGENCY", url: "https://absolutcruceros.com/" },
    { type: "AGENCY", url: "https://tatuantes.com/" },
    { type: "AGENCY", url: "https://notigatos.es/" },
    { type: "AGENCY", url: "https://noticaballos.com/" },
    { type: "FREELANCE", url: "https://coptering.com" },
    { type: "FREELANCE", url: "https://kalapa-clinic.com" },
    { type: "FREELANCE", url: "https://misterbarcelo.com" },
    { type: "FREELANCE", url: "https://felycan.es" },
    { type: "FREELANCE", url: "https://sensalialabs.com" },
    { type: "FREELANCE", url: "https://stakehound.com" },
    { type: "FREELANCE", url: "https://imperfectus.com" },
    { type: "PERSONAL", url: "https://iphoneado.com" },
    { type: "PERSONAL", url: "https://paradiabeticos.es" },
    { type: "PERSONAL", url: "https://wpmercs.com" },
    { type: "PERSONAL", url: "https://wordcamp.es" },
    { type: "AGENCY", url: "https://mundoperros.es/" },
    { type: "AGENCY", url: "https://meteorologiaenred.com/" },
    { type: "AGENCY", url: "https://hombresconestilo.com/" },
    { type: "AGENCY", url: "https://cibercactus.com/" },
    { type: "AGENCY", url: "https://actualidadliteratura.com/" },
    { type: "AGENCY", url: "https://renovablesverdes.com/" },
    { type: "AGENCY", url: "https://formacionyestudios.com/" },
    { type: "AGENCY", url: "https://economiafinanzas.com/" },
    { type: "AGENCY", url: "https://actualidadecommerce.com/" },
    { type: "AGENCY", url: "https://nutridieta.com/" },
    { type: "AGENCY", url: "https://madreshoy.com/" },
    { type: "AGENCY", url: "https://jardineriaon.com/" },
    { type: "AGENCY", url: "https://thermorecetas.com/" },
    { type: "AGENCY", url: "https://mycookrecetas.com/" },
    { type: "AGENCY", url: "https://windowsnoticias.com/" },
    { type: "AGENCY", url: "https://ubunlog.com/" },
    { type: "AGENCY", url: "https://trucosdescargas.com/" },
    { type: "AGENCY", url: "https://todoereaders.com/" },
    { type: "AGENCY", url: "https://soydemac.com/" },
    { type: "AGENCY", url: "https://linuxadictos.com/" },
    { type: "AGENCY", url: "https://hwlibre.com/" },
    { type: "AGENCY", url: "https://blog.desdelinux.net/" },
    { type: "AGENCY", url: "https://creativosonline.org/blog/" },
    { type: "AGENCY", url: "https://androidguias.com/" },
    { type: "AGENCY", url: "https://androidsis.com/" },
    { type: "AGENCY", url: "https://actualidadiphone.com/" },
    { type: "AGENCY", url: "https://actualidadgadget.com" },
    { type: "AGENCY", url: "https://actualidadmotor.com" },
    { type: "AGENCY", url: "https://guiaswow.com" },
    { type: "AGENCY", url: "https://bezzia.com" },
    { type: "AGENCY", url: "https://lasrecetascocina.com" },
    { type: "AGENCY", url: "https://hoteles4you.com" },
    { type: "AGENCY", url: "https://absolutviajes.com" },
    { type: "AGENCY", url: "https://actualidadblog.com" },
    { type: "AGENCY", url: "https://abinternet.es" },
    { type: "AGENCY", url: "https://crenco.org/" },
    { type: "AGENCY", url: "https://dracoglobal.es/" },
    { type: "AGENCY", url: "https://eduma.com/" },
    { type: "AGENCY", url: "https://escolamarilocasals.com/" },
    { type: "AGENCY", url: "https://fp.uoc.fje.edu/ca/estudis" },
    { type: "AGENCY", url: "https://folio.uoc.edu/" },
    { type: "AGENCY", url: "https://uoc.edu/portal/es/uoc-x/" },
    { type: "AGENCY", url: "https://didactaplus.com/" },
    { type: "AGENCY", url: "https://mirai.com" },
    { type: "AGENCY", url: "https://almirall.com" },
    { type: "AGENCY", url: "https://almirall.es" },
    { type: "AGENCY", url: "https://almirall.co.uk" },
    { type: "AGENCY", url: "https://almirall.global" },
    { type: "AGENCY", url: "https://terribilis.net" },
    { type: "AGENCY", url: "https://blog.camon.es" },
    { type: "AGENCY", url: "https://iasist.com.es" },
    { type: "AGENCY", url: "https://gestion.campus-mcmutual.com/" }
];

const loadFolio = () => {
    try {
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
document.addEventListener('DOMContentLoaded', loadFolio);
