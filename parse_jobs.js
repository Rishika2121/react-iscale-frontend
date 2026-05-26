const fs = require('fs');
const html = fs.readFileSync('theiscale.html', 'utf8');
// Cheerio removed
// Let's check if cheerio is available, if not I'll use simple regex.

const jobs = [];
// Based on the grep output, the structure looks like this:
// <a href="..."><img src="..." alt="..."></a>
// <h4> Business Analyst [Fresher] - AddWeb </h4>

// I will write a simple parser using regex.
const regex = /<img loading="lazy"\s*src="([^"]+)"[\s\S]*?<a\s*href="[^"]+">\s*([\s\S]*?)<\/a>[\s\S]*?<span>(.*?)<\/span>[\s\S]*?Salary\s*:\s*(.*?)<\/p>[\s\S]*?Location\s*:\s*(.*?)<\/p>[\s\S]*?Exp:\s*(.*?)<\/p>/g;

let match;
while ((match = regex.exec(html)) !== null) {
  jobs.push({
    logo: match[1].trim(),
    title: match[2].replace(/<[^>]*>?/gm, '').trim(),
    company: match[3].replace(/<[^>]*>?/gm, '').trim(),
    salary: match[4].trim(),
    location: match[5].trim(),
    exp: match[6].trim()
  });
}

// Write to a json file
fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
console.log('Found ' + jobs.length + ' jobs');
