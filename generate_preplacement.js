const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\padma\\.gemini\\antigravity\\brain\\ebaf8ed3-216c-43b8-92f5-e494a08e1103\\.system_generated\\steps\\185\\content.md', 'utf8');

const talks = [];
const regex = /<div class="card cardpre[\s\S]*?<img[^>]*src="([^"]*)"[^>]*>[\s\S]*?<h5 class="m-0 mb-2">\s*(.*?)\s*<\/h5>[\s\S]*?<p class="m-0 fs-4 small">\s*(.*?)\s*<\/p>[\s\S]*?<img[^>]*src="([^"]*)"[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"[^>]*>[\s\S]*?<p style="font-size: 13px;">\s*(.*?)\s*<\/p>[\s\S]*?href="([^"]*)"/g;

let match;
while ((match = regex.exec(data)) !== null) {
    talks.push({
        image1: match[1],
        name: match[2].trim(),
        role: match[3].trim(),
        image2: match[5],
        company: match[6].trim(),
        link: match[7]
    });
}

let jsxContent = `import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './PlacementTalks.css';

const PlacementTalksPage = ({ setCurrentPage }) => {
  useReveal();

  const [talks] = useState(REPLACE_ME_TALKS);

  return (
    <div className="placement-page-container">
      {/* Banner Section */}
      <section className="placement-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#555' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span>›</span>
            <span>Pre-Placement Talks</span>
          </div>
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>Pre-Placement Talks</h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container">
        <h3 className="page-subtitle reveal">Pre Placement <span>Talks</span> with the <span>Company's HR</span></h3>
        
        <div className="placement-grid">
          {talks.map((talk, index) => (
            <div key={index} className="placement-card reveal" style={{ transitionDelay: \`\${(index % 8) * 50}ms\` }}>
              <img loading="lazy" src={talk.image1} alt={talk.name} className="placement-avatar" />
              <h5 className="placement-name">{talk.name}</h5>
              <p className="placement-role">{talk.role}</p>
              
              <img loading="lazy" src="https://www.theiscale.com/assets/images/down.png" alt="arrow down" className="placement-divider" />
              
              <img loading="lazy" src={talk.image2} alt={talk.company} className="placement-company-logo" />
              <p className="placement-company-name">{talk.company}</p>
              
              <a target="_blank" rel="noreferrer" className="placement-btn" href={talk.link}>
                Know More
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlacementTalksPage;
`;

jsxContent = jsxContent.replace('REPLACE_ME_TALKS', JSON.stringify(talks, null, 4));

fs.writeFileSync('src/pages/PlacementTalksPage.js', jsxContent);
console.log('Successfully generated elegantly styled src/pages/PlacementTalksPage.js');
