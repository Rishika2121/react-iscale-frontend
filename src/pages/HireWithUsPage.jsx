import React, { useEffect, useState } from 'react';

const HireWithUsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const [formData, setFormData] = useState({
    organization_type: '',
    organization_name: '',
    hr_email_1: '',
    hr_email_2: '',
    hr_contact_no: '',
    whatsapp_no: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://iscale-backend.onrender.com/api/hiring-form/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status || response.ok) {
        alert(`Thank you! We have received your hiring inquiry.`);
        setFormData({
          organization_type: '',
          organization_name: '',
          hr_email_1: '',
          hr_email_2: '',
          hr_contact_no: '',
          whatsapp_no: '',
          description: ''
        });
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
    <div style={{ minHeight: '100vh', background: '#fff', paddingTop: 80, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
          {/* Left Side - Illustration */}
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 500 }}>
              <div style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', background: 'var(--red)', opacity: 0.1, borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }}></div>
              <img 
                src="https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-1564.jpg?w=800&t=st=1708420000~exp=1708420600~hmac=a4b123" 
                alt="Hire With Us" 
                style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1, borderRadius: 20 }} 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div style={{ flex: '1 1 500px', background: '#fff', padding: '40px 0' }}>
            <div style={{ marginBottom: 30 }}>
              <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--red)', padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                HIRE FOR EVERYONE
              </span>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 900, color: '#1e293b', marginTop: 16, lineHeight: 1.2 }}>
                Get Hire You Can Connect With Us
              </h1>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <select 
                  name="organization_type"
                  value={formData.organization_type}
                  onChange={handleChange}
                  required
                  style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#fff', color: formData.organization_type ? '#1e293b' : '#94a3b8', fontSize: 15, width: '100%', appearance: 'none', cursor: 'pointer' }} 
                >
                  <option value="" disabled>---Select Organization Type---</option>
                  <option value="Proprietorship Firm">Proprietorship Firm</option>
                  <option value="Partnership Firm">Partnership Firm</option>
                  <option value="Private Limited Company">Private Limited Company</option>
                  <option value="One Person Company">One Person Company</option>
                  <option value="Limited Liability Company">Limited Liability Company</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <input 
                  type="text" 
                  name="organization_name"
                  placeholder="Organization Name" 
                  value={formData.organization_name}
                  onChange={handleChange}
                  required
                  style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#fff', color: '#1e293b', fontSize: 15, width: '100%' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <input 
                  type="email" 
                  name="hr_email_1"
                  placeholder="HR Email (Option 1)" 
                  value={formData.hr_email_1}
                  onChange={handleChange}
                  required
                  style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#fff', color: '#1e293b', fontSize: 15, width: '100%' }} 
                />
                <input 
                  type="email" 
                  name="hr_email_2"
                  placeholder="HR Email (Option 2)" 
                  value={formData.hr_email_2}
                  onChange={handleChange}
                  style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#fff', color: '#1e293b', fontSize: 15, width: '100%' }} 
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <input 
                  type="tel" 
                  name="hr_contact_no"
                  placeholder="HR Contact No." 
                  value={formData.hr_contact_no}
                  onChange={handleChange}
                  required
                  style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#fff', color: '#1e293b', fontSize: 15, width: '100%' }} 
                />
                <input 
                  type="tel" 
                  name="whatsapp_no"
                  placeholder="WhatsApp No." 
                  value={formData.whatsapp_no}
                  onChange={handleChange}
                  style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#fff', color: '#1e293b', fontSize: 15, width: '100%' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <textarea 
                  name="description"
                  placeholder="Description / Requirements" 
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  style={{ padding: '16px 20px', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', background: '#fff', color: '#1e293b', fontSize: 15, width: '100%', resize: 'none' }} 
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-shine" 
                style={{ padding: '18px', marginTop: 10, background: 'var(--red)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: loading ? 0.7 : 1, width: '100%' }} 
              >
                {loading ? 'Submitting...' : 'Submit Now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireWithUsPage;
