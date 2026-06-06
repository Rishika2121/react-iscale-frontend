import React, { useState, useEffect } from 'react';

const AlliedCollegesPage = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    fetch('https://iscale-backend.onrender.com/api/allied/public-all-allied?page=1&limit=100')
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            return {
              name: item.m_allied_title || item.name || 'Allied College',
              img: getImageUrl(item.m_allied_logo || item.image || item.logo)
            };
          });
          setColleges(mapped);
        } else {
          setColleges([]);
        }
      })
      .catch(() => setColleges([]))
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <div className="bg-dots" style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingBottom: 80, color: 'var(--text-primary)' }}>
      {/* Header Banner */}
      <div style={{ 
        height: 240, 
        background: 'var(--gradient-hero)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Banner" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }}
        />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Allied Colleges</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>
             Home <span style={{ margin: '0 6px' }}>›</span> Allied Colleges
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading allied colleges...</div>
        ) : colleges.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {colleges.map((college, idx) => (
              <div key={idx} className="premium-card hover-glow" style={{
                background: 'var(--card-bg)', borderRadius: 12, padding: '24px 16px 16px', 
                textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)',
                cursor: 'pointer', height: 200
              }}>
                {college.img && (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, width: '100%', filter: 'brightness(var(--theme-logo-brightness, 1))' }}>
                    <img src={college.img} alt={college.name} style={{ maxWidth: '90%', maxHeight: 90, objectFit: 'contain' }} />
                  </div>
                )}
                <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 'auto', lineHeight: 1.4, padding: '0 10px' }}>
                  {college.name}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
            No allied colleges available yet.
          </div>
        )}
        
      </div>
    </div>
  );
};

export default AlliedCollegesPage;
