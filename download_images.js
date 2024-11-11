const fs = require('fs');
const https = require('https');
const path = require('path');
const csv = require('csv-parse/sync');

// Create imgs directory if it doesn't exist
const imgsDir = path.join(__dirname, 'res', 'imgs');
if (!fs.existsSync(imgsDir)) {
    fs.mkdirSync(imgsDir, { recursive: true });
}

// Function to get domain from URL
const getDomainFromUrl = (url) => {
    try {
        const domain = new URL(url).hostname;
        return domain.replace(/^www\./, '');
    } catch {
        return url;
    }
};

// Function to download image
const downloadImage = async (url) => {
    const domain = getDomainFromUrl(url);
    const thumbUrl = `https://image.thum.io/get/width/600/crop/800/viewportWidth/1200/png/${url}`;
    const filePath = path.join(imgsDir, `${domain}.png`);
    
    console.log(`Downloading ${domain}...`);
    
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(thumbUrl, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${domain}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {});
            console.error(`Error downloading ${domain}:`, err);
            reject(err);
        });
    });
};

// Function to get all URLs from CSV
const getAllUrls = () => {
    const csvContent = fs.readFileSync(path.join(__dirname, 'res', 'projects.csv'));
    const records = csv.parse(csvContent, {
        columns: true,
        skip_empty_lines: true
    });
    return records.map(record => record.url);
};

// Main function
async function main() {
    try {
        const targetUrl = process.argv[2];
        
        if (targetUrl) {
            // Download single image
            await downloadImage(targetUrl);
            console.log('Single image download completed');
        } else {
            // Download all images
            const urls = getAllUrls();
            for (const url of urls) {
                try {
                    await downloadImage(url);
                    // Add a small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } catch (error) {
                    console.error(`Failed to download ${url}:`, error);
                    // Continue with next URL even if one fails
                    continue;
                }
            }
            console.log('All downloads completed');
        }
    } catch (error) {
        console.error('Script error:', error);
        process.exit(1);
    }
}

main();
