import React, { useEffect, useState } from 'react';

const HireWithUsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://iscale-backend.onrender.com/api/hiring-form/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, phone, requirements })
      });
      const data = await response.json();
      if (data.status || response.ok) {
        alert(`Thank you ${name}! We have received your hiring inquiry.`);
        setName('');
        setEmail('');
        setCompany('');
        setPhone('');
        setRequirements('');
      } else {
        alert(data.message || 'Failed to submit the form. Please try again later.');
      }
    } catch (err) {
      console.error('Hiring Form Error:', err);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dots" style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingTop: 80, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 20 }}>Hire <span className="text-gradient">From Us</span></h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 16, marginBottom: 60 }}>Connect with top talent from iSCALE and scale your team.</p>
        
        <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', padding: 40, borderRadius: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4, color: 'var(--text-primary)' }}>Employer Details</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <input 
              type="text" 
              placeholder="Contact Person Name" 
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <input 
              type="text" 
              placeholder="Company Name" 
              value={company}
              onChange={e => setCompany(e.target.value)}
              required
              style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} 
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15 }} 
            />
          </div>

          <textarea 
            placeholder="What roles are you hiring for? (Any specific requirements?)" 
            rows="5" 
            value={requirements}
            onChange={e => setRequirements(e.target.value)}
            required
            style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 15, resize: 'none' }}
          ></textarea>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-shine" 
            style={{ padding: '16px', background: 'var(--red)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: loading ? 0.7 : 1 }} 
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HireWithUsPage;
