
import React, { useState, useEffect } from 'react';
import useReveal from '../hooks/useReveal';

const StudentTestimonialPage = ({ setCurrentPage }) => {
  useReveal();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('/shorts/')) {
      return url.replace('/shorts/', '/embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  };

  useEffect(() => {
    // TODO: Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
    const fetchTestimonials = async () => {
      try {
       const response = await fetch(
  'https://iscale-backend.onrender.com/api/stdtestimonials/user-get-stdtestimonials'
);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       const data = await response.json();


console.log(data);
setTestimonials(Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError(error.message);
        
        // Fallback data for demonstration if API fails or is not yet integrated
        
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: 60 }}>
      {/* Banner Section */}
      <section style={{ background: 'var(--primary-gradient)', padding: '60px 0', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: 14, marginBottom: 12, opacity: 0.8 }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setCurrentPage && setCurrentPage('home')}>Home</span> › Student Testimonials
          </div>
          <h1 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800 }}>Student <span className="animated-text-gradient">Testimonials</span></h1>
          <p className="reveal" style={{ transitionDelay: '100ms', fontSize: 16, opacity: 0.9, marginTop: 12, maxWidth: 600, margin: '12px auto 0' }}>
            Hear from our students about their learning journey and success stories.
          </p>
        </div>
        </section>

        <div className="container" style={{ maxWidth: 1200, margin: '-40px auto 40px', position: 'relative', zIndex: 10, padding: '0 24px' }}>
          <div style={{ background: 'var(--card-bg)', borderRadius: 16, padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 12, padding: '14px 24px', border: '1px solid var(--border-color)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 12 }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search testimonials or keywords..." style={{ border: 'none', background: 'transparent', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: 16 }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="hover-glow" style={{ padding: '14px 28px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Advanced Filter
              </button>
            </div>
          </div>
        </div>
  
        {/* API Content Section */}
        <section className="container" style={{ marginTop: 20 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', fontSize: 18, color: 'var(--text-secondary)' }}>Loading testimonials...</div>
        ) : error && (!testimonials || testimonials.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '40px 0', fontSize: 18, color: 'var(--red)' }}>Error: {error}</div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: 32 
          }}>
            {(testimonials || []).map((testimonial, index) => (
              <div key={testimonial._id || index} style={{ 
                background: 'var(--card-bg)', 
                borderRadius: 16, 
                overflow: 'hidden', 
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
                animation: `fadeUp 0.5s ease forwards`,
                animationDelay: `${(index % 6) * 50}ms`,
                opacity: 0
              }}>
                {testimonial.m_st_url ? (
                  <div style={{ width: '100%', aspectRatio: '16/9' }}>
                    <iframe 
                      src={getEmbedUrl(testimonial.m_st_url)} 
                      width="100%" 
                      height="100%" 
                      allowFullScreen 
                      title={testimonial.name || "Student Testimonial"}
                      style={{ border: 'none' }}
                    ></iframe>
                  </div>
                ) : testimonial.m_st_video ? (
                  <div style={{ width: '100%', aspectRatio: '16/9', background: '#000' }}>
                    <video 
                      src={`https://iscale-backend.onrender.com/${testimonial.m_st_video?.replace(/\\/g, '/').replace('src/', '')}`}
                      controls
                      width="100%" 
                      height="100%" 
                      style={{ objectFit: 'contain' }}
                    ></video>
                  </div>
                ) : (
                   <div style={{ width: '100%', height: 200, background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                     No Video Available
                   </div>
                )}
                <div style={{ padding: 24, textAlign: 'left' }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{testimonial.name || "iScale Student"}</h3>
                  <div style={{ color: 'var(--red)', fontWeight: 600, fontSize: 14 }}>
                    {testimonial.company ? `Placed at: ${testimonial.company}` : 'Successful Placement'}
                  </div>
                  {testimonial.feedback && (
                    <p style={{ marginTop: 12, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      "{testimonial.feedback}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentTestimonialPage;
