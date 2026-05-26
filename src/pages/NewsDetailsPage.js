import React, { useEffect } from 'react';

const NewsDetailsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingTop: 80, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 30, display: 'flex', alignItems: 'center', gap: 6 }}>
          &larr; Back to News
        </button>
        
        <h1 style={{ fontSize: 40, fontWeight: 900, color: '#0f172a', marginBottom: 20, lineHeight: 1.2 }}>The iScale received recognition from Indian Startup News</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <span style={{ color: 'var(--red)', fontWeight: 600, fontSize: 14, background: '#fff0f0', padding: '4px 12px', borderRadius: 100 }}>Press Release</span>
          <span style={{ color: '#94a3b8', fontSize: 14 }}>Oct 24, 2024</span>
        </div>
        
        <div style={{ width: '100%', height: 400, borderRadius: 24, overflow: 'hidden', marginBottom: 40, background: '#f1f5f9', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, #e2e8f0, #cbd5e1)' }}></div>
        </div>
        
        <div style={{ fontSize: 17, lineHeight: 1.8, color: '#334155' }}>
          <p style={{ marginBottom: 24 }}>The iScale, a leading upskilling platform, was recently recognized by Indian Startup News for its outstanding contribution to bridging the skill gap in India.</p>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginTop: 40, marginBottom: 16 }}>Empowering the Youth</h3>
          <p style={{ marginBottom: 24 }}>With an innovative curriculum and hands-on training approach, iScale has successfully placed thousands of students in top-tier companies across the globe. Our unique cohort-based learning ensures that every student gets personalized attention and mentorship from industry experts.</p>
          <blockquote style={{ borderLeft: '4px solid var(--red)', paddingLeft: 24, margin: '40px 0', fontSize: 20, fontStyle: 'italic', color: '#1e293b' }}>
            "This recognition is a testament to our team's hard work and dedication to transforming the education landscape in India."
          </blockquote>
          <p style={{ marginBottom: 24 }}>We continue to forge strong partnerships with top institutions and corporations to ensure our curriculum stays relevant and our students remain ahead of the curve.</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
