import React, { useEffect } from 'react';

const ExpertDetailsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 80, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 6 }}>
          &larr; Back to Experts
        </button>
        
        <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 20px 40px rgba(0,0,0,0.05)', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          <div style={{ width: 200, flexShrink: 0 }}>
            <div style={{ width: '100%', aspectRatio: '1/1', background: '#e2e8f0', borderRadius: 20, overflow: 'hidden' }}></div>
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-block', background: '#eef2ff', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Motivational Speaker</div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', marginBottom: 12 }}>Dr. Vivek Bindra</h1>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: '#64748b', marginBottom: 30 }}>Founder & CEO at Bada Business</h3>
            
            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#475569', marginBottom: 24 }}>
              Dr. Vivek Bindra is a renowned motivational speaker, leadership consultant, and corporate trainer. With millions of followers globally, his expertise in business scaling and entrepreneurship has transformed countless careers and startups.
            </p>
            
            <h4 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 16, marginTop: 30 }}>Areas of Expertise</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {['Leadership', 'Business Strategy', 'Entrepreneurship', 'Public Speaking'].map(skill => (
                <span key={skill} style={{ background: '#f1f5f9', color: '#334155', padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500 }}>{skill}</span>
              ))}
            </div>
            
            <button style={{ marginTop: 40, padding: '14px 32px', background: 'var(--red)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 20px rgba(237, 28, 36, 0.2)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              View Mentor Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailsPage;
