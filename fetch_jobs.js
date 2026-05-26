const fs = require('fs');
const https = require('https');

https.get('https://www.theiscale.com/job-opening', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const jobs = [];
        const regex = /<div class="rbt-card variation-01 rbt-hover card-list-2 shadow">[\s\S]*?<img src="(.*?)"[\s\S]*?<h4 class="rbt-card-title">[\s\S]*?>\s*(.*?)\s*<\/a>[\s\S]*?<span class="lesson-number mb-1 color-primary">\s*(.*?)\s*<\/span>[\s\S]*?<p class="small mb-4 mt-1">\s*Salary : (.*?)<br>\s*Location :\s*(.*?)<br>\s*Exp :\s*(.*?)<\/p>/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
            jobs.push({
                logo: match[1],
                title: match[2].trim(),
                company: match[3].trim(),
                salary: match[4].replace(/\s+/g, ' ').trim(),
                location: match[5].trim(),
                exp: match[6].trim()
            });
        }
        fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
        console.log('Wrote ' + jobs.length + ' jobs');
    });
});
