import React, { useEffect } from 'react';

const clientsData = [
  {
    "name": "PhonePe",
    "desc": "PhonePe is an Indian digital payments and financial services company headquartered in Bengaluru, Karnataka, India.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/phonepay1.png"
  },
  {
    "name": "Good Glamm Group",
    "desc": "The Good Glamm Group is a content-to-commerce company that produces and sells personal care and cosmetic products, with operations in India, Dubai, Singapore, and the USA.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/good_glam1.png"
  },
  {
    "name": "Cultsports",
    "desc": "At cult.fit, we make group workouts fun, daily food healthy & tasty, mental fitness easy with yoga & meditation, and medical & lifestyle care hassle-free.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/cutsports1.png"
  },
  {
    "name": "TATA 1mg",
    "desc": "Tata 1mg, previously 1mg, is a healthcare platform based in Gurugram, India. It provides services, including e-pharmacy, diagnostics, e-consultation, and health content.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/tata1mg1.png"
  },
  {
    "name": "Ultravoilette Automotive",
    "desc": "We live by design, technology and user experience. We are mavericks from across aerospace, automotive engineering and consumer electronics. Our sole mission in life - to redefine mobility.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/ultraviolette.png"
  },
  {
    "name": "Paisa bazar",
    "desc": "Paisabazaar aims to make personal finance decisions easy, transparent and convenient for India. Through technology and data innovations, along with a lot of hard work, we intend to make complex decisions simple for you.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/paisa_bazar1.png"
  },
  {
    "name": "Baxy Mobility",
    "desc": "BAXY Mobility has been consistently leading India's three wheeler industry. A decade ago, BAXY Pvt Ltd ventured into the domain with a goal to redefine quality and economics of three-wheeled vehicles.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/Baxy_Group.png"
  },
  {
    "name": "Magenta Mobility",
    "desc": "Integrated electric mobility, EV charging, and technology platform Magenta aims to revolutionize and aggregate the urban freight & transportation segment.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/megenta1.png"
  },
  {
    "name": "Airblack Technologies Pvt. Ltd.",
    "desc": "We are entrepreneurs, designers, hackers, artists and engineers on a mission to help people convert their passion to a livelihood.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/airblack.png"
  },
  {
    "name": "Omega Seiki Mobility",
    "desc": "Omega Seiki Mobility represents speed, agility & capable leadership. Founded in 2016, and backed by years of capability in creating precision engineering solutions, Omega Seiki Mobility has become sy",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/omega_seiki_mobiity.png"
  },
  {
    "name": "Planet Spark",
    "desc": "PlanetSpark is on a journey to make the traditional and unorganized tuitions obsolete through its virtual classroom.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/planetspark2.png"
  },
  {
    "name": "Ola Electric",
    "desc": "Ola has carved itself a name by being India's largest mobility platform and one of the world's largest ride-hailing companies.",
    "logo": "https://www.theiscale.com/myadmin/uploads/more/OLA_Electric.png"
  }
];

const ClientsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
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
