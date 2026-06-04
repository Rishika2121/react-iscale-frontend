import React, { useEffect } from 'react';

const ExpertDetailsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="bg-dots" style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingTop: 80, paddingBottom: 80, color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 6 }}>
          &larr; Back to Experts
        </button>
        
        <div className="mobile-col" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 40, boxShadow: 'var(--card-shadow)', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          <div style={{ width: '100%', maxWidth: 200, flexShrink: 0, margin: '0 auto' }}>
            <div style={{ width: '100%', aspectRatio: '1/1', background: 'var(--bg-secondary)', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border-color)' }}></div>
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-block', background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Motivational Speaker</div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 12 }}>Dr. Vivek Bindra</h1>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 30 }}>Founder & CEO at Bada Business</h3>
            
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>
              Dr. Vivek Bindra is a renowned motivational speaker, leadership consultant, and corporate trainer. With millions of followers globally, his expertise in business scaling and entrepreneurship has transformed countless careers and startups.
            </p>
            
            <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, marginTop: 30 }}>Areas of Expertise</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {['Leadership', 'Business Strategy', 'Entrepreneurship', 'Public Speaking'].map(skill => (
                <span key={skill} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500 }}>{skill}</span>
              ))}
            </div>
            
            <button className="btn-shine" style={{ marginTop: 40, padding: '14px 32px', background: 'var(--red)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 20px rgba(237, 28, 36, 0.2)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              View Mentor Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailsPage;
