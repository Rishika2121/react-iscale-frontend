import React, { useState, useEffect } from 'react';
import useReveal from '../hooks/useReveal';
import './SuccessStory.css';

// Utility to generate dynamic YouTube Embed URLs from any YouTube link format
const getEmbedUrl = (url) => {
  if (!url) return '';
  let videoId = '';
  
  if (url.includes('youtube.com/embed/')) {
    return url;
  } else if (url.includes('watch?v=')) {
    const parts = url.split('watch?v=')[1];
    if (parts) {
      videoId = parts.split('&')[0];
    }
  } else if (url.includes('youtu.be/')) {
    const parts = url.split('youtu.be/')[1];
    if (parts) {
      videoId = parts.split('?')[0];
    }
  } else if (url.includes('/shorts/')) {
    const parts = url.split('/shorts/')[1];
    if (parts) {
      videoId = parts.split('?')[0];
    }
  }
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Basic replacement fallbacks
  let fallbackUrl = url;
  if (fallbackUrl.includes('watch?v=')) {
    fallbackUrl = fallbackUrl.replace('watch?v=', 'embed/');
  }
  if (fallbackUrl.includes('youtu.be/')) {
    fallbackUrl = fallbackUrl.replace('youtu.be/', 'youtube.com/embed/');
  }
  if (fallbackUrl.includes('/shorts/')) {
    fallbackUrl = fallbackUrl.replace('/shorts/', '/embed/');
  }
  return fallbackUrl;
};

// Utility to handle relative backend image paths
const getImageUrl = (url) => {
  if (!url || url === 'N/A') return null;
  const cleaned = String(url).replace(/\\/g, '/');
  return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
};

const SuccessStoryPage = ({ setCurrentPage }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalStories, setTotalStories] = useState(0);
  const limit = 8; // Fits 4 columns on desktop perfectly (2 rows)

  useReveal([stories]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://iscale-backend.onrender.com/api/success-story/public-all-ss?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        setTotalStories(result.total || arr.length);
        
        if (Array.isArray(arr)) {
          const mapped = arr.map(item => {
            const rawVideoUrl = item.m_ss_youtube_url || item.m_ss_video || item.videoUrl || item.url || item.video || item.c_ss_video_url || item.c_ss_link || '';
            const videoUrl = getEmbedUrl(rawVideoUrl);
            const studentName = item.m_ss_name || item.name || item.studentName || item.c_ss_name || item.c_ss_student_name || 'Student';
            const imgUrl = getImageUrl(item.m_ss_image || item.image || item.c_ss_image);

            return {
              videoId: videoUrl,
              name: studentName,
              company: item.m_ss_placed || item.company || item.companyName || item.c_ss_company || 'Partner Company',
              package: item.m_ss_package || item.package || item.c_ss_package || 'N/A',
              img: imgUrl
            };
          });
          setStories(mapped);
        }
      })
      .catch((err) => {
        console.error("SuccessStoryPage Fetch Error:", err);
        setStories([]);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(totalStories / limit);

  return (
    <div className="success-page-container">
      {/* Banner Section */}
      <section className="success-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#e2e8f0' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span style={{ color: '#94a3b8' }}>›</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>Success Story</span>
          </div>
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>Success Story</h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container" style={{ marginTop: '50px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', fontSize: 18, color: 'var(--text-secondary)' }}>
            Loading Success Stories...
          </div>
        ) : stories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', fontSize: 18, color: 'var(--text-secondary)' }}>
            No success stories found.
          </div>
        ) : (
          <>
            <div className="success-grid">
              {stories.map((story, index) => (
                <div key={index} className="success-card reveal" style={{ transitionDelay: `${(index % 8) * 50}ms` }}>
                  {story.videoId && (
                    <div className="video-container">
                      <iframe 
                        src={story.videoId} 
                        webkitallowfullscreen="true" 
                        mozallowfullscreen="true" 
                        allowFullScreen 
                        title={story.name}
                      ></iframe>
                    </div>
                  )}
                  <div className="success-card-content">
                    <div className="student-meta" style={{ display: 'flex', alignItems: 'center', gap: story.img ? '16px' : '0px' }}>
                      {story.img && (
                        <img src={story.img} alt={story.name} className="student-avatar" />
                      )}
                      <div className="student-info">
                        <h5 className="student-name">{story.name}</h5>
                        <div className="student-details">
                          Placed at: <strong>{story.company}</strong> <br />
                          Package: <strong>{story.package}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-container reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 48 }}>
                <button 
                  className="pagination-btn" 
                  onClick={() => setPage(p => Math.max(p - 1, 1))} 
                  disabled={page === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                  <button 
                    key={num} 
                    className={`pagination-btn ${page === num ? 'active' : ''}`}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                ))}
                <button 
                  className="pagination-btn" 
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))} 
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default SuccessStoryPage;
