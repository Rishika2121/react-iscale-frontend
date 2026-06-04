const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'CourseDetailsPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Tools
// Replace {toolsData && ( with {toolsData && toolsData.length > 0 && (
content = content.replace('{toolsData && (', '{toolsData && toolsData.length > 0 && (');

// Details
// Replace <div id="details" with {details && details.length > 0 && (\n          <div id="details"
// Replace           {/* Highlights */} with           )}\n\n          {/* Highlights */}
content = content.replace('<div id="details"', '{details && details.length > 0 && (\n          <div id="details"');
content = content.replace('          {/* Highlights */}', '          )}\n\n          {/* Highlights */}');

// Highlights
// Replace <div id="highlights" with {highlights && highlights.length > 0 && (\n          <div id="highlights"
// Replace           {/* Certificate */} with           )}\n\n          {/* Certificate */}
content = content.replace('<div id="highlights"', '{highlights && highlights.length > 0 && (\n          <div id="highlights"');
content = content.replace('          {/* Certificate */}', '          )}\n\n          {/* Certificate */}');

// Let's stop at details and highlights to test if they work first.
fs.writeFileSync(filePath, content);
console.log('Modified Details and Highlights');
