const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\padma\\.gemini\\antigravity\\brain\\ebaf8ed3-216c-43b8-92f5-e494a08e1103\\.system_generated\\steps\\169\\content.md', 'utf8');

const stories = [];
// <div class="col-xl-3"> ... <h5 class="m-0 mb-2">\s*(.*?)\s*<\/h5> ... Placed at:\s*(.*?) <br>Package:-\s*(.*?)\s*<\/p>
const regex = /<iframe[^>]*src="([^"]*)"[^>]*>.*?<\/iframe>[\s\S]*?<h5 class="m-0 mb-2">\s*(.*?)\s*<\/h5>[\s\S]*?Placed at:\s*(.*?)\s*<br>Package:-\s*(.*?)\s*<\/p>/g;

let match;
while ((match = regex.exec(data)) !== null) {
    stories.push({
        videoId: match[1],
        name: match[2].trim(),
        company: match[3].trim(),
        package: match[4].trim()
    });
}

let jsxContent = `import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './SuccessStory.css';

const SuccessStoryPage = ({ setCurrentPage }) => {
  useReveal();

  const [stories] = useState(REPLACE_ME_STORIES);

  return (
    <div className="success-page-container">
      {/* Banner Section */}
      <section className="success-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#555' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span>›</span>
            <span>Success Story</span>
          </div>
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>Success Story</h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container">
        <div className="success-grid">
          {stories.map((story, index) => (
            <div key={index} className="success-card reveal" style={{ transitionDelay: \`\${(index % 8) * 50}ms\` }}>
              <div className="video-container">
                <iframe src={story.videoId} webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen title={story.name}></iframe>
              </div>
              <div className="success-card-content">
                <div className="student-meta">
                  <img src="https://ui-avatars.com/api/?name=User&background=random&color=fff" alt="" className="student-avatar" />
                  <div className="student-info">
                    <h5 className="student-name">{story.name}</h5>
                    <div className="student-details">
                      Placed at: {story.company} <br />
                      Package: <strong>{story.package}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SuccessStoryPage;
`;

jsxContent = jsxContent.replace('REPLACE_ME_STORIES', JSON.stringify(stories, null, 4));

fs.writeFileSync('src/pages/SuccessStoryPage.js', jsxContent);
console.log('Successfully generated elegantly styled src/pages/SuccessStoryPage.js');
