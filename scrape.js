const https = require('https');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

async function scrape() {
  const html = await fetchHTML('https://www.theiscale.com/allied-college');
  const regex = /<img[^>]+src="([^">]+)"/g;
  let match;
  const images = [];
  while ((match = regex.exec(html)) !== null) {
    if (match[1].includes('myadmin/uploads')) {
       images.push(match[1]);
    }
  }
  console.log("Allied College Images:", [...new Set(images)]);
}
scrape();
