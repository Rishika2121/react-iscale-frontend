const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('temp_page.html', 'utf8');

// Extract Breadcrumb
const breadcrumbStart = html.indexOf('<div class="rbt-breadcrumb-default');
const breadcrumbEnd = html.indexOf('<!-- End Breadcrumb Area -->');
let breadcrumb = html.substring(breadcrumbStart, breadcrumbEnd);

// Extract Details Area
const detailsStart = html.indexOf('<div class="rbt-course-details-area');
const detailsEnd = html.indexOf('<div class="rbt-separator-mid">', detailsStart);
let details = html.substring(detailsStart, detailsEnd);

let combined = breadcrumb + '\n' + details;

// Clean up HTML
// Replace class with className
combined = combined.replace(/class="/g, 'className="');
combined = combined.replace(/for="/g, 'htmlFor="');

// Self close img, input, br, hr
combined = combined.replace(/<img([^>]+?)(?<!\/)>/g, '<img$1 />');
combined = combined.replace(/<input([^>]+?)(?<!\/)>/g, '<input$1 />');
combined = combined.replace(/<br([^>]+?)(?<!\/)>/g, '<br$1 />');
combined = combined.replace(/<hr([^>]+?)(?<!\/)>/g, '<hr$1 />');

// Remove HTML comments (JSX comments are {/* */})
combined = combined.replace(/<!--[\s\S]*?-->/g, '');

// Fix style attributes
combined = combined.replace(/style="([^"]*)"/g, (match, p1) => {
    const parts = p1.split(';').filter(p => p.trim() !== '');
    let styleObj = {};
    for (let part of parts) {
        let [key, val] = part.split(':');
        if (key && val) {
            key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            styleObj[key] = val.trim();
        }
    }
    return `style={${JSON.stringify(styleObj)}}`;
});

// Dynamic replacements
combined = combined.replace(/href="https:\/\/www\.youtube\.com\/embed\/N7b7uMIeigU"/g, 'href={videoUrl}');
combined = combined.replace(/>\s*Data Science With Generative AI Course\s*</g, '>{data.title}<');
combined = combined.replace(/Data Science With Generative AI Course/g, '{data.title}');

// Wrap in fragment
const jsx = `<>\n${combined}\n</>`;

fs.writeFileSync('converted_layout.jsx', jsx, 'utf8');
console.log('Successfully extracted and converted to converted_layout.jsx');
