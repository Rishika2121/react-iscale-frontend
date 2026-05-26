import React, { useEffect } from 'react';

const ContactPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingTop: 80, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: '#0f172a', textAlign: 'center', marginBottom: 20 }}>Contact <span style={{ color: 'var(--red)' }}>Us</span></h1>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: 16, marginBottom: 60 }}>Have questions? Our team is here to help you.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div style={{ background: '#fff', padding: 40, borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Send us a message</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <input type="text" placeholder="Your Name" style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: 15 }} />
              <input type="email" placeholder="Email Address" style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: 15 }} />
              <textarea placeholder="How can we help?" rows="4" style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', fontSize: 15, resize: 'none' }}></textarea>
              <button style={{ padding: '16px', background: 'var(--red)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>Send Message</button>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, padding: '20px 0' }}>
            <div style={{ background: '#fff', padding: 30, borderRadius: 16, boxShadow: '0 10px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>Email Support</h4>
              <p style={{ color: '#64748b', margin: 0 }}>contact@theiscale.com</p>
            </div>
            <div style={{ background: '#fff', padding: 30, borderRadius: 16, boxShadow: '0 10px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>Phone / WhatsApp</h4>
              <p style={{ color: '#64748b', margin: 0 }}>+91 7880113112</p>
            </div>
            <div style={{ background: '#fff', padding: 30, borderRadius: 16, boxShadow: '0 10px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>Locations</h4>
              <p style={{ color: '#64748b', margin: 0 }}>Bangalore | Chhattisgarh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
