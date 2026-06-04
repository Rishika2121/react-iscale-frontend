const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'CourseDetailsPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. tools: {toolsData && (  -> {toolsData && toolsData.length > 0 && (
content = content.replace('{toolsData && (', '{toolsData && toolsData.length > 0 && (');

// 2. details: Wrap div id="details"
// Find index of <div id="details"
// Find the closing </div>
const detailsStr = '<div id="details"';
content = content.replace(detailsStr, '{details && details.length > 0 && (\n          ' + detailsStr);
// The details block ends right before Highlights
content = content.replace('          {/* Highlights */}', '          )}\n\n          {/* Highlights */}');

// 3. highlights:
const highlightsStr = '<div id="highlights"';
content = content.replace(highlightsStr, '{highlights && highlights.length > 0 && (\n          ' + highlightsStr);
content = content.replace('          {/* Certificate */}', '          )}\n\n          {/* Certificate */}');

// 4. certificate:
const certStr = '<div id="certificate"';
content = content.replace(certStr, '{(certText || certImg) && (\n          ' + certStr);
content = content.replace('          {/* FAQ moved below Instructor */}', '          )}\n\n          {/* FAQ moved below Instructor */}');

// 5. faq:
const faqStr = '<section id="faq"';
content = content.replace(faqStr, '{faqs && faqs.length > 0 && (\n      ' + faqStr);
content = content.replace('      {/* Review Section */}', '      )}\n\n      {/* Review Section */}');

fs.writeFileSync(filePath, content);
console.log('Successfully wrapped sections conditionally');
