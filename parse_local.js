const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\padma\\.gemini\\antigravity\\brain\\ebaf8ed3-216c-43b8-92f5-e494a08e1103\\.system_generated\\steps\\114\\content.md', 'utf8');

const jobs = [];
// More robust regex
const cardRegex = /<div class="rbt-card variation-01 rbt-hover card-list-2 shadow">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;

let cardMatch;
while ((cardMatch = cardRegex.exec(data)) !== null) {
    const cardHtml = cardMatch[1];
    
    let logo = '';
    const imgMatch = cardHtml.match(/<img src="(.*?)"/);
    if (imgMatch) logo = imgMatch[1];
    
    let title = '';
    const titleMatch = cardHtml.match(/<h4 class="rbt-card-title">[\s\S]*?>\s*(.*?)\s*<\/a>/);
    if (titleMatch) title = titleMatch[1].trim();
    
    let company = '';
    const companyMatch = cardHtml.match(/<span class="lesson-number mb-1 color-primary">\s*(.*?)\s*<\/span>/);
    if (companyMatch) company = companyMatch[1].trim();
    
    let salary = '', location = '', exp = '';
    const pMatch = cardHtml.match(/<p class="small mb-4 mt-1">\s*Salary : (.*?)<br>\s*Location :\s*(.*?)<br>\s*Exp :\s*(.*?)<\/p>/);
    if (pMatch) {
        salary = pMatch[1].replace(/\s+/g, ' ').trim();
        location = pMatch[2].trim();
        exp = pMatch[3].trim();
    }
    
    if (title) {
        jobs.push({
            logo, title, company, salary, location, exp
        });
    }
}

fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
console.log('Parsed ' + jobs.length + ' jobs');
