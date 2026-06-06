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

  const dateStr = news.createdAt || news.date || news.m_news_date 
    ? new Date(news.createdAt || news.date || news.m_news_date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
    : "Recent";

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', paddingTop: 80, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 30, display: 'flex', alignItems: 'center', gap: 6 }}>
          &larr; Back to News
        </button>
        
        <h1 style={{ fontSize: 40, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 20, lineHeight: 1.2 }}>{news.title || news.m_news_title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <span style={{ color: 'var(--red)', fontWeight: 600, fontSize: 14, background: 'rgba(237, 28, 36, 0.08)', padding: '4px 12px', borderRadius: 100 }}>Press Release</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{dateStr}</span>
        </div>
        
        <div style={{ width: '100%', height: 400, borderRadius: 24, overflow: 'hidden', marginBottom: 40, background: 'var(--bg-secondary)', position: 'relative' }}>
          {(news.image || news.img || news.m_news_image || news.m_news_images) ? (
            <img src={getImageUrl(news.image || news.img || news.m_news_image || news.m_news_images)} alt={news.title || 'News Update'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, var(--bg-secondary), var(--border-color))' }}></div>
          )}
        </div>
        
        <div style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: 24, whiteSpace: 'pre-wrap' }}>{news.desc || news.description || news.m_news_desc}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
