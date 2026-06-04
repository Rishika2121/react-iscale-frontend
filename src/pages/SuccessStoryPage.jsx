import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './SuccessStory.css';

const SuccessStoryPage = ({ setCurrentPage }) => {
  useReveal();

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/success-story/public-all-ss?page=1&limit=50')
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map(item => {
            let videoUrl = item.videoUrl || item.url || item.c_ss_video_url || item.c_ss_link || '';
            // If it's a raw youtube watch link, convert to embed
            if (videoUrl.includes('watch?v=')) {
              videoUrl = videoUrl.replace('watch?v=', 'embed/');
            }
            if (videoUrl.includes('youtu.be/')) {
              videoUrl = videoUrl.replace('youtu.be/', 'youtube.com/embed/');
            }
            if (videoUrl.includes('/shorts/')) {
              videoUrl = videoUrl.replace('/shorts/', '/embed/');
            }

            return {
              videoId: videoUrl,
              name: item.name || item.studentName || item.c_ss_name || item.c_ss_student_name || 'Student',
              company: item.company || item.companyName || item.c_ss_company || 'Partner Company',
              package: item.package || item.c_ss_package || 'N/A'
            };
          });
          setStories(mapped);
        }
      })
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, []);

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
            <div key={index} className="success-card reveal" style={{ transitionDelay: `${(index % 8) * 50}ms` }}>
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
