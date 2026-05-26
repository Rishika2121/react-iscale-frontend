import React from 'react';

const Footer = ({ setCurrentPage }) => (
  <footer style={{ background: '#0d0d0d', color: '#fff', padding: '60px 0 24px' }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, background: 'var(--red)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>i</span>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>
              <span style={{ color: 'var(--red)' }}>i</span>SCALE
            </span>
          </div>
          <p style={{ color: '#aaa', lineHeight: 1.7, fontSize: 14, maxWidth: 280 }}>
            India's Trusted Upskilling & E-Learning Platform for Future Readiness. Democratizing quality education blending quality with affordability.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            {['📘','𝕏','💼','📷','▶️'].map((icon, i) => (
              <button key={i} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#222', border: '1px solid #333',
                color: '#fff', fontSize: 14, cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.target.style.background = 'var(--red)'}
              onMouseLeave={e => e.target.style.background = '#222'}
              >{icon}</button>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          { title: 'Quick Links', links: ['Home', 'Explore Courses', 'Events', 'About Us', 'Contact'] },
          { title: 'Courses', links: ['Data Science', 'AI & ML', 'Business Analytics', 'Full Stack', 'Digital Marketing'] },
          { title: 'Support', links: ['FAQ', 'Privacy Policy', 'Terms of Service', 'Refund Policy', 'Community'] }
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 16, color: '#fff' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none' }}>
              {col.links.map(link => (
                <li key={link} style={{ marginBottom: 10 }}>
                  <button 
                    onClick={() => setCurrentPage(link.toLowerCase().replace(' ', '-'))}
                    style={{ background: 'none', border: 'none', padding: 0, color: '#aaa', fontSize: 14, transition: 'color 0.2s', cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.color = 'var(--red)'}
                    onMouseLeave={e => e.target.style.color = '#aaa'}
                  >{link}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact info */}
      <div style={{
        borderTop: '1px solid #222', paddingTop: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16
      }}>
        <p style={{ color: '#666', fontSize: 13 }}>
          © 2024 iScale. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          <span style={{ color: '#aaa', fontSize: 13 }}>📱 +91-7880113112</span>
          <span style={{ color: '#aaa', fontSize: 13 }}>📞 +91 7880113112</span>
          <span style={{ color: '#aaa', fontSize: 13 }}>🌐 theiscale.com</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
