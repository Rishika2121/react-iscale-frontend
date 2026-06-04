const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'CourseDetailsPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// TOOLS
if (content.includes('{toolsData && (')) {
  content = content.replace('{toolsData && (', '{toolsData && toolsData.length > 0 && (');
}

// DETAILS
const detailsStart = '<div id="details"';
if (content.includes(detailsStart) && !content.includes('{details && details.length > 0 && (')) {
  content = content.replace(detailsStart, '{details && details.length > 0 && (\n          ' + detailsStart);
  content = content.replace('          {/* Highlights */}', '          )}\n\n          {/* Highlights */}');
}

// HIGHLIGHTS
const highlightsStart = '<div id="highlights"';
if (content.includes(highlightsStart) && !content.includes('{highlights && highlights.length > 0 && (')) {
  content = content.replace(highlightsStart, '{highlights && highlights.length > 0 && (\n          ' + highlightsStart);
  content = content.replace('          {/* Certificate */}', '          )}\n\n          {/* Certificate */}');
}

// CERTIFICATE
const certStart = '<div id="certificate"';
if (content.includes(certStart) && !content.includes('{(certText || certImg) && (')) {
  content = content.replace(certStart, '{(certText || certImg) && (\n          ' + certStart);
  content = content.replace('          {/* FAQ moved below Instructor */}', '          )}\n\n          {/* FAQ moved below Instructor */}');
}

// FAQ
const faqStart = '<section id="faq"';
if (content.includes(faqStart) && !content.includes('{faqs && faqs.length > 0 && (')) {
  content = content.replace(faqStart, '{faqs && faqs.length > 0 && (\n      ' + faqStart);
  content = content.replace('      {/* Review Section */}', '      )}\n\n      {/* Review Section */}');
}

fs.writeFileSync(filePath, content);
console.log('Sections wrapped conditionally!');
