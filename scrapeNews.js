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

async function scrapeNews() {
  const html = await fetchHTML('https://www.theiscale.com/');
  
  // We're looking for the section "We've been in the news"
  // Let's just find all <a href="..."> Read More </a> around those logos.
  // Or simpler: grab all `img` tags and `href` links in the news carousel.
  // Let's write a regex that matches the cards.
  const regex = /<div class="news-card"[^>]*>([\s\S]*?)<\/div>/g;
  
  // Actually, I'll just save the HTML to a file and grep it, or regex search it for "Read More"
  const fs = require('fs');
  fs.writeFileSync('home.html', html);
  
  // Find strings near "Read More"
  const readMoreRegex = /<a[^>]+href="([^"]+)"[^>]*>Read More<\/a>/gi;
  let match;
  while ((match = readMoreRegex.exec(html)) !== null) {
     console.log("Read More link:", match[1]);
  }
}

scrapeNews();
