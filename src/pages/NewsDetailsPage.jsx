import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const NewsDetailsPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    if (id) {
      fetch(`https://iscale-backend.onrender.com/api/news&updates/public-single-news&updates/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.status && result.data) {
            setNews(result.data);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const getImageUrl = (url) => {
    if (!url || url === 'N/A') return '';
    const cleaned = url.replace(/\\/g, '/');
    return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', paddingTop: 100, textAlign: 'center' }}>Loading news details...</div>;
  }

  if (!news) {
    return <div style={{ minHeight: '100vh', paddingTop: 100, textAlign: 'center' }}>News not found.</div>;
  }

  const dateVal = news.m_news_added_on || news.createdAt || news.date || news.m_news_date;
  const dateStr = dateVal 
    ? new Date(dateVal).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
    : "Recent";

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingTop: 100, paddingBottom: 100 }}>
      <div className="container" style={{ maxWidth: 850, margin: '0 auto', padding: '0 24px' }}>
        <button 
          onClick={() => window.history.back()} 
          style={{ 
            background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, 
            cursor: 'pointer', marginBottom: 30, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' 
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.transform = 'translateX(-4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'none'; }}
        >
          &larr; Back to News
        </button>
        
        <h1 style={{ fontSize: 38, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 20, lineHeight: 1.25 }}>{news.m_news_title || news.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, background: 'rgba(37, 99, 235, 0.08)', padding: '6px 16px', borderRadius: 100 }}>Press Release</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {dateStr}
          </span>
        </div>
        
        <div style={{ width: '100%', height: 450, borderRadius: 24, overflow: 'hidden', marginBottom: 40, background: 'var(--bg-secondary)', position: 'relative', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}>
          {(news.m_news_image || news.image || news.img || news.m_news_images) ? (
            <img src={getImageUrl(news.m_news_image || news.image || news.img || news.m_news_images)} alt={news.m_news_title || 'News Update'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(59, 130, 246, 0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
          )}
        </div>
        
        <div style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--text-secondary)', letterSpacing: '0.2px' }}>
          {news.m_news_intro && (
            <p style={{ fontWeight: 600, fontSize: 19, color: 'var(--text-primary)', marginBottom: 28, borderLeft: '4px solid var(--red)', paddingLeft: 20 }}>
              {news.m_news_intro}
            </p>
          )}
          <p style={{ marginBottom: 24, whiteSpace: 'pre-wrap' }}>{news.m_news_description || news.description || news.desc || news.m_news_desc}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
