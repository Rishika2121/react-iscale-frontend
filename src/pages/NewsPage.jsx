import React, { useEffect } from 'react';

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    fetch('https://iscale-backend.onrender.com/api/news&updates/public-all-news&updates?page=1&limit=100', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map((item, idx) => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return 'https://images.unsplash.com/photo-1593642532744-d377abf07dc6?auto=format&fit=crop&w=800&q=80';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            
            let dateStr = "Recent";
            if (item.createdAt || item.date || item.m_news_date) {
              const d = new Date(item.createdAt || item.date || item.m_news_date);
              dateStr = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
            }

            return {
              id: item._id || idx,
              title: item.title || item.m_news_title || 'News Update',
              date: dateStr,
              desc: item.desc || item.description || item.m_news_desc || 'Read more about this latest update.',
              link: item.link || item.url || item.m_news_link || '/news-details',
              img: getImageUrl(item.image || item.img || item.m_news_image)
            };
          });
          setNewsItems(mapped);
        } else {
          setNewsItems([]);
        }
      })
      .catch(() => setNewsItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingBottom: 80 }}>
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
          {loading ? (
            <div style={{ padding: '40px 0' }}>Loading news...</div>
          ) : newsItems.length === 0 ? (
            <div style={{ padding: '40px 0', color: 'var(--text-secondary)' }}>No news updates available.</div>
          ) : (
            newsItems.map(news => (
              <div key={news.id} style={{
                background: 'var(--card-bg)', borderRadius: 8, overflow: 'hidden',
                boxShadow: 'var(--card-shadow)', display: 'flex', flexDirection: 'column',
                border: '1px solid var(--border-color)'
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
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.4 }}>{news.title}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 12, marginBottom: 16 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {news.date}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{news.desc}</p>
                  <a href={news.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Learn More <span>→</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Recent Post Sidebar */}
        <div style={{ width: 350, background: 'var(--card-bg)', borderRadius: 8, padding: '24px', boxShadow: 'var(--card-shadow)', border: '2px solid var(--red)', position: 'sticky', top: 100 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 24, borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>Recent Post</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {newsItems.slice(0, 3).map(post => (
              <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: 16, cursor: 'pointer', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                {post.img ? (
                  <img src={post.img} alt={post.title} style={{ width: 64, height: 64, borderRadius: 6, objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 64, height: 64, background: '#f1f5f9', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.4 }}>{post.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 11 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {post.date}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsPage;
