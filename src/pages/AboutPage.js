import React, { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 80, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(16px)',
          borderRadius: 24,
          padding: 60,
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          border: '1px solid rgba(255,255,255,0.4)',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: '#0f172a', marginBottom: 24 }}>About <span style={{ color: 'var(--red)' }}>iScale</span></h1>
          <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.8, marginBottom: 40, maxWidth: 700, margin: '0 auto 40px' }}>
            We are India's most trusted upskilling platform, dedicated to bridging the gap between academia and industry. Our mission is to empower learners with practical skills and outcome-driven education.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginTop: 40 }}>
            {[ { title: '100K+', desc: 'Active Learners' }, { title: '50+', desc: 'Expert Mentors' }, { title: '200+', desc: 'Hiring Partners' } ].map((stat, i) => (
              <div key={i} style={{ background: '#fff', padding: 30, borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.04)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--red)', marginBottom: 8 }}>{stat.title}</div>
                <div style={{ color: '#64748b', fontWeight: 600 }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
