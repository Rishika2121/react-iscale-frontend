import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import '../assets/css/PlacementTalks.css';

const PlacementTalksPage = ({ setCurrentPage }) => {
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);

  useReveal([talks]);

  React.useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    fetch('https://iscale-backend.onrender.com/api/ppt/public-get-ppts', {
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then(result => {
        let dataArray = [];
        if (Array.isArray(result)) {
          dataArray = result;
        } else if (result && Array.isArray(result.data)) {
          dataArray = result.data;
        }

        if (dataArray.length > 0) {
          const mappedTalks = dataArray.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = String(url).replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            return {
             image1: getImageUrl(item.m_pre_image),
              name: item.m_pre_name || 'Guest Speaker',
              role: item.m_pre_designation || 'Speaker',
             image2: getImageUrl(item.m_pre_company_img || item.m_pre_company_logo),
              company: item.m_pre_company || '',
              link: item.m_pre_video_link || '#'
            };
          });
          setTalks(mappedTalks);
        } else {
          setTalks([]);
        }
      })
      .catch(err => {
        console.error("Error fetching placement talks:", err);
        setTalks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="placement-page-container">
      {/* Banner Section */}
      <section className="placement-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#555' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span>›</span>
            <span>Pre-Placement Talks</span>
          </div>
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>Pre-Placement <span className="animated-text-gradient">Talks</span></h1>
        </div>
        </section>

        <div className="container" style={{ maxWidth: 1200, margin: '-40px auto 40px', position: 'relative', zIndex: 10, padding: '0 24px' }}>
          <div style={{ background: 'var(--card-bg)', borderRadius: 16, padding: '20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 12, padding: '14px 24px', border: '1px solid var(--border-color)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 12 }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search for HR experts, companies, or industries..." style={{ border: 'none', background: 'transparent', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: 16 }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="hover-glow" style={{ padding: '14px 28px', background: 'linear-gradient(135deg, var(--red) 0%, #a91111 100%)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Advanced Filter
              </button>
            </div>
          </div>
        </div>
  
        {/* Grid Section */}
        <section className="container">
        <h3 className="page-subtitle reveal">Pre Placement <span>Talks</span> with the <span>Company's HR</span></h3>
        
        <div className="placement-grid">
          {talks.map((talk, index) => (
            <div key={index} className="placement-card reveal" style={{ transitionDelay: `${(index % 8) * 50}ms` }}>
              <img loading="lazy" src={talk.image1} alt={talk.name} className="placement-avatar" />
              <h5 className="placement-name">{talk.name}</h5>
              <p className="placement-role">{talk.role}</p>
              
              <img loading="lazy" src="https://www.theiscale.com/assets/images/down.png" alt="arrow down" className="placement-divider" />
              
              <img loading="lazy" src={talk.image2} alt={talk.company} className="placement-company-logo" />
              <p className="placement-company-name">{talk.company}</p>
              
              <a target="_blank" rel="noreferrer" className="placement-btn" href={talk.link}>
                Know More
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlacementTalksPage;
