import React, { useEffect } from 'react';

const newsItems = [
  {
    "id": 1,
    "img": "https://www.theiscale.com/myadmin/uploads/more/1.jpg",
    "title": "The iScale received recognition from Indian Startup News",
    "date": "February 10, 2025",
    "desc": "Entrackr | The Karo Startup | Read Article"
  },
  {
    "id": 2,
    "img": "https://www.theiscale.com/myadmin/uploads/more/WhatsApp_Image_2024-09-08_at_15_24_542.jpeg",
    "title": "The iScale was recognized by 14th President of India Shri Ram Nath Kovind.",
    "date": "September 08, 2024",
    "desc": "Our founders Miss. Swati & Mr. Nishant Dhote"
  },
  {
    "id": 3,
    "img": "https://www.theiscale.com/myadmin/uploads/more/WhatsApp_Image_2024-09-08_at_15_50_15.jpeg",
    "title": "In India Financial Gap Problem is bigger which gives birth to the Skill Gap Problem.",
    "date": "September 08, 2024",
    "desc": "Josh Talks Speaker | Founder The iScale"
  },
  {
    "id": 4,
    "img": "https://www.theiscale.com/myadmin/uploads/more/w_app_group.png",
    "title": "Join WhatsApp Group",
    "date": "April 02, 2024",
    "desc": "Join our Official WhatsApp Group for daily Jobs Alerts, Pre Placement Talk links & all other information's which will definitely skill up your professional career."
  },
  {
    "id": 5,
    "img": "https://www.theiscale.com/myadmin/uploads/more/151.jpg",
    "title": "Welcome to The iScale: Your Gateway to Affordable Upskilling and Job-Readiness",
    "date": "February 10, 2025",
    "desc": "\"Industries Helping Hands\" is now rebranded to \"The iScale\""
  },
  {
    "id": 6,
    "img": "https://www.theiscale.com/myadmin/uploads/more/Newspaper_headline.jpg",
    "title": "The iScale is on the Newspapers Headlines",
    "date": "September 12, 2024",
    "desc": "News@TheiScale"
  }
];

const NewsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 80 }}>
      {/* Header Banner */}
      <div style={{ 
        height: 250, 
        background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '10%'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(236,72,153,0.8), rgba(99,102,241,0.8))', mixBlendMode: 'multiply' }}></div>
        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="News Banner" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        
        <div style={{ position: 'relative', zIndex: 1, color: '#fff' }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, opacity: 0.9 }}>
            Home <span style={{ margin: '0 6px' }}>›</span> All News & Update
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 900, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>All News & Update</h1>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        
        {/* Left Side: News Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 30 }}>
          {newsItems.map(news => (
            <div key={news.id} style={{
              background: '#fff', borderRadius: 8, overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ width: '100%', height: 220, background: '#f1f5f9', position: 'relative' }}>
                {news.img ? (
                  <img src={news.img} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 14 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      Card image
                    </span>
                  </div>
                )}
              </div>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 12, lineHeight: 1.4 }}>{news.title}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 12, marginBottom: 16 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {news.date}
                </div>
                <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{news.desc}</p>
                <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = '/news-details'; }} style={{ color: '#0f172a', fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Learn More <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Recent Post Sidebar */}
        <div style={{ width: 350, background: '#fff', borderRadius: 8, padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '2px solid var(--red)', position: 'sticky', top: 100 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 24, borderBottom: '1px solid #e2e8f0', paddingBottom: 16 }}>Recent Post</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {newsItems.slice(0, 3).map(post => (
              <div key={post.id} style={{ display: 'flex', gap: 16, cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1} onClick={() => window.location.href = '/news-details'}>
                {post.img ? (
                  <img src={post.img} alt={post.title} style={{ width: 64, height: 64, borderRadius: 6, objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 64, height: 64, background: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 6, lineHeight: 1.4 }}>{post.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94a3b8', fontSize: 11 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsPage;
