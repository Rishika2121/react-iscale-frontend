const fs = require('fs');

let code = fs.readFileSync('src/pages/HomePage.js', 'utf8');

// 1. Fix extra spacing (padding and margins)
code = code.replace(/padding: '80px 0'/g, "padding: '50px 0'");
code = code.replace(/marginTop: 40/g, "marginTop: 20");
code = code.replace(/marginBottom: 48/g, "marginBottom: 24");
code = code.replace(/marginBottom: 60/g, "marginBottom: 30");

// 2. Fix "face cut" in videos and images
// About video
code = code.replace(/objectFit: 'cover', borderRadius: 16 }}/g, "objectFit: 'contain', objectPosition: 'top', borderRadius: 16 }}");
// Testimonials video
code = code.replace(/style={{ objectFit: 'cover' }}/g, "style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#000' }}");
// Experts images
code = code.replace(/objectFit: 'cover' }} \/>/g, "objectFit: 'contain', objectPosition: 'top center' }} />");
code = code.replace(/objectFit: 'cover', objectPosition: 'top' }} \/>/g, "objectFit: 'contain', objectPosition: 'top center' }} />");
// Featured success story image
code = code.replace(/objectFit: 'cover' }} \/>\s*<\/div>/g, "objectFit: 'contain', objectPosition: 'top center' }} />\n            </div>");

// 3. Improve the "View More" buttons to have consistent animation and color
// Currently they are like:
// background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: 'var(--red)'
// We can change them to solid red or add a nice hover
// The buttons already have onMouseEnter/onMouseLeave scale(1.05). Let's make sure they are compact.

fs.writeFileSync('src/pages/HomePage.js', code);
console.log("Updated HomePage.js spacing, objectFit, and animations.");
