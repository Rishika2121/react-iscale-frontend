import React, { useEffect } from 'react';

const AboutPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="bg-dots" style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingTop: 80, paddingBottom: 80, color: 'var(--text-primary)' }}>
      <div className="container" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <div className="glass-card" style={{
          borderRadius: 24,
          padding: 60,
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 24 }}>About <span className="text-gradient">iScale</span></h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40, maxWidth: 700, margin: '0 auto 40px' }}>
            We are India's most trusted upskilling platform, dedicated to bridging the gap between academia and industry. Our mission is to empower learners with practical skills and outcome-driven education.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 24, marginTop: 40 }}>
            {[ { title: '100K+', desc: 'Active Learners' }, { title: '50+', desc: 'Expert Mentors' }, { title: '200+', desc: 'Hiring Partners' } ].map((stat, i) => (
              <div key={i} className="hover-glow glow-border" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: 30, borderRadius: 16, boxShadow: 'var(--card-shadow)', cursor: 'default' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--red)', marginBottom: 8 }}>{stat.title}</div>
                <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
