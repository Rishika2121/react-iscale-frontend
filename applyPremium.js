const fs = require('fs');

let cssCode = fs.readFileSync('src/index.css', 'utf8');

const premiumStyles = `

/* Premium Button Interactions */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

button:active {
  transform: scale(0.96) !important;
}

/* Premium Card Hover Effects */
.premium-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.premium-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.08);
}

.premium-card-img-wrap {
  overflow: hidden;
}

.premium-card-img-wrap img {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-card:hover .premium-card-img-wrap img {
  transform: scale(1.08);
}

/* Add a very subtle gradient overlay to the main body for a richer feel */
body {
  background: radial-gradient(circle at top right, rgba(240, 244, 255, 0.4), transparent 50%),
              radial-gradient(circle at bottom left, rgba(255, 240, 245, 0.4), transparent 50%),
              var(--white);
}
`;

if (!cssCode.includes('Premium Button Interactions')) {
  fs.writeFileSync('src/index.css', cssCode + premiumStyles);
  console.log("Added premium styles to index.css");
}

let homeCode = fs.readFileSync('src/pages/HomePage.js', 'utf8');

// Inject the class 'premium-card' and 'premium-card-img-wrap' into the Popular Courses cards
homeCode = homeCode.replace(
  /div key=\{i\} style=\{\{\s*borderRadius: 16,\s*overflow: 'hidden',\s*background: '#fff',\s*boxShadow: 'var\(--shadow-card\)',\s*transition: 'all 0.3s',\s*cursor: 'pointer'\s*\}\}/g,
  "div key={i} className=\"premium-card\" style={{ borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}"
);
// Remove inline hovers from Courses since premium-card handles it
homeCode = homeCode.replace(
  /onMouseEnter=\{e => \{\s*e.currentTarget.style.transform = 'translateY\(-6px\)';\s*e.currentTarget.style.boxShadow = 'var\(--shadow-lg\)';\s*\}\}\s*onMouseLeave=\{e => \{\s*e.currentTarget.style.transform = 'none';\s*e.currentTarget.style.boxShadow = 'var\(--shadow-card\)';\s*\}\}/g,
  ""
);

// Add img-wrap to Courses
homeCode = homeCode.replace(
  /background: course.color,\s*height: 180,\s*display: 'flex',\s*flexDirection: 'column',\s*alignItems: 'center',\s*justifyContent: 'center',\s*position: 'relative',\s*padding: 20/g,
  "background: course.color, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: 20"
).replace(
  /div style=\{\{\s*background: course.color,/g,
  "div className=\"premium-card-img-wrap\" style={{ background: course.color,"
);

// Success stories grid items
homeCode = homeCode.replace(
  /div key=\{idx\} style=\{\{ \s*width: 380,\s*height: 420,\s*background: '#fff',\s*borderRadius: 24,\s*padding: 0, \s*boxShadow: '0 10px 30px rgba\(0,0,0,0.08\)',\s*display: 'flex',\s*flexDirection: 'column', \s*alignItems: 'center',\s*textAlign: 'center',\s*overflow: 'hidden',\s*flexShrink: 0,\s*border: '1px solid #eee' \s*\}\}/g,
  "div key={idx} className=\"premium-card\" style={{ width: 380, height: 420, background: '#fff', borderRadius: 24, padding: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', overflow: 'hidden', flexShrink: 0, border: '1px solid #eee' }}"
);
homeCode = homeCode.replace(
  /div style=\{\{\s*width: '100%',\s*height: '70%',\s*background: '#f1f5f9',\s*overflow: 'hidden',\s*position: 'relative'\s*\}\}/g,
  "div className=\"premium-card-img-wrap\" style={{ width: '100%', height: '70%', background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}"
);

fs.writeFileSync('src/pages/HomePage.js', homeCode);
console.log("Updated HomePage with premium classes");
