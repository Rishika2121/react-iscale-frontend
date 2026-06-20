import React, { useEffect, useState } from 'react';

const ContactPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://iscale-backend.onrender.com/api/contact-us/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await response.json();
      if (data.status || response.ok) {
        alert(`Thank you ${name}! We have received your inquiry.`);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert(data.message || 'Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error('Contact Form Error:', err);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dots" style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingTop: 80, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 20 }}>Contact <span className="text-gradient">Us</span></h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 16, marginBottom: 60 }}>Have questions? Our team is here to help you.</p>
        
        <div className="mobile-col" style={{ display: 'flex', gap: 40 }}>
          <form onSubmit={handleSubmit} style={{ flex: 1, background: 'var(--card-bg)', padding: 40, borderRadius: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4, color: 'var(--text-primary)' }}>Send us a message</h3>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} 
            />
            <textarea 
              placeholder="How can we help?" 
              rows="4" 
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, resize: 'none' }}
            ></textarea>
            <button className="btn-shine" style={{ padding: '16px', background: 'var(--red)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>Send Message</button>
          </form>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30, padding: '20px 0' }}>
            <div className="hover-glow" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: 30, borderRadius: 16, boxShadow: 'var(--card-shadow)' }}>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>Email Support</h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>contact@theiscale.com</p>
            </div>
            <div className="hover-glow" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: 30, borderRadius: 16, boxShadow: 'var(--card-shadow)' }}>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>Phone / WhatsApp</h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>+91 7880113112</p>
            </div>
            <div className="hover-glow" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: 30, borderRadius: 16, boxShadow: 'var(--card-shadow)' }}>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>Locations</h4>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Bangalore | Chhattisgarh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
