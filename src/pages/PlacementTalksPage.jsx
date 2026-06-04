import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './PlacementTalks.css';

const PlacementTalksPage = ({ setCurrentPage }) => {
  useReveal();

  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);

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
        if (result.status && Array.isArray(result.data)) {
          const mappedTalks = result.data.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            return {
             image1: getImageUrl(item.m_pre_image),
              name: item.m_pre_name || 'Guest Speaker',
              role: item.m_pre_designation || 'Speaker',
             image2: getImageUrl(item.m_pre_company_logo),
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
        // Suppress console error to keep console clean, set talks to empty array
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
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>Pre-Placement Talks</h1>
        </div>
      </section>

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
