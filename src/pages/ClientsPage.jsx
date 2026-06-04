import React, { useState, useEffect } from 'react';

const ClientsPage = () => {
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    
    fetch('https://iscale-backend.onrender.com/api/client/public-get-all-client?page=1&limit=10')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then(result => {
        // Handle pagination structure (e.g., result.data.docs or result.data)
        const clientsArray = Array.isArray(result.data?.docs) ? result.data.docs : (Array.isArray(result.data) ? result.data : []);
        
        if (result.status && clientsArray.length > 0) {
          const mappedClients = clientsArray.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            return {
              name: item.clientName || item.name || item.c_client_name || 'Partner Client',
              desc: item.description || item.desc || item.c_client_description || 'A valuable partner of our ecosystem.',
              logo: getImageUrl(item.logo || item.image || item.c_client_logo) || 'https://www.theiscale.com/myadmin/uploads/more/phonepay1.png'
            };
          });
          setClientsData(mappedClients);
        } else {
          throw new Error("Empty or invalid API data");
        }
      })
      .catch(err => {
        // Silently catch error
        setClientsData([]);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="bg-dots" style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingBottom: 80, color: 'var(--text-primary)' }}>
      {/* Header Banner */}
      <div style={{ 
        height: 250, 
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
          <h1 style={{ fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 12 }}>Our Clients</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
             Home <span style={{ margin: '0 8px' }}>›</span> Our Clients
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {clientsData.map((client, i) => (
            <div key={i} className="premium-card hover-glow" style={{
              background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12, padding: '32px 24px', 
              textAlign: 'center', display: 'flex', flexDirection: 'column',
              cursor: 'pointer',
              boxShadow: 'var(--card-shadow)'
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 100, marginBottom: 24, filter: 'brightness(var(--theme-logo-brightness, 1))' }}>
                <img src={client.logo} alt={client.name} style={{ maxWidth: '80%', maxHeight: 60, objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, textAlign: 'left' }}>{client.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, textAlign: 'left' }}>{client.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
