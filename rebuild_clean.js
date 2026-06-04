const fs = require('fs');

const layoutPath = 'converted_layout.jsx';
const layoutHtml = fs.readFileSync(layoutPath, 'utf8');

// We need to fix the unclosed <br> tags in layoutHtml if any exist
const fixedLayoutHtml = layoutHtml.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');

const newComponent = `import React, { useState, useEffect } from 'react';

const CourseDetailsPage = ({ courseId, setCurrentPage }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`https://iscale-backend.onrender.com/api/course/public-course/\${courseId}\`);
        const json = await response.json();
        
        if (json && json.data) {
          const c = json.data;
          
          let imgUrl = \`https://ui-avatars.com/api/?name=\${encodeURIComponent(c.title)}&background=random\`;
          if (c.banner && c.banner !== 'N/A') {
            const cleanedPath = c.banner.replace(/\\\\/g, '/');
            imgUrl = cleanedPath.startsWith('http') ? cleanedPath : \`https://iscale-backend.onrender.com/\${cleanedPath.replace(/^src\\//, '')}\`;
          }

          setData({
            id: c.slug || c._id,
            title: c.title,
            description: c.description || '',
            price: c.price !== 'N/A' && c.price ? \`₹\${parseInt(c.price).toLocaleString()}\` : 'FREE',
            original: c.price !== 'N/A' && c.price ? \`₹\${parseInt(c.price).toLocaleString()}\` : '',
            thumbnail: imgUrl,
            category: c.category || '',
            views: c.views || 0,
            language: c.language || 'English',
            lastUpdated: c.updated_at ? new Date(c.updated_at).toLocaleDateString() : '',
            videoUrl: c.video_link || ''
          });
        }
      } catch (err) {
        console.error('Course API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading Course Details...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Course Not Found</h2>
        <button onClick={() => setCurrentPage('courses')} style={{ marginTop: 20, padding: '10px 20px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Back to Courses</button>
      </div>
    );
  }

  // Define certImg to avoid undefined error in the template
  const certImg = 'https://www.theiscale.com/assets/images/Sample%20Certificate.png';

  return (
    <div style={{ minHeight: '100vh' }}>
      ${fixedLayoutHtml}
    </div>
  );
};

export default CourseDetailsPage;
`;

fs.writeFileSync('src/pages/CourseDetailsPage.jsx', newComponent, 'utf8');
console.log('Successfully wrote clean, API-driven CourseDetailsPage.jsx');
