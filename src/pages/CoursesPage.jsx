import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Search, Filter, RotateCcw, Clock, Globe, BookOpen, CheckCircle, Eye, Calendar, Zap } from 'lucide-react';

const defaultColors = [
  'linear-gradient(135deg, #1e3a8a 0%, #0d1b3e 100%)', // Deep Blue
  'linear-gradient(135deg, #065f46 0%, #022c22 100%)', // Emerald
  'linear-gradient(135deg, #5b21b6 0%, #2e1065 100%)', // Violet
  'linear-gradient(135deg, #881337 0%, #4c0519 100%)', // Rose
  'linear-gradient(135deg, #7c2d12 0%, #3f160a 100%)', // Orange/Rust
  'linear-gradient(135deg, #111827 0%, #030712 100%)'  // Pitch Black
];

const CoursesPage = ({ setCurrentPage }) => {

  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses?page=1&limit=1000');
        const data = await response.json();
        
        const arr = data.data?.docs || data.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mappedCourses = arr.map((course, index) => {
            let imgUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=random`;
            if (course.banner && course.banner !== 'N/A') {
              const cleanedPath = course.banner.replace(/\\/g, '/');
              imgUrl = cleanedPath.startsWith('http') ? cleanedPath : `https://iscale-backend.onrender.com/${cleanedPath.replace(/^src\//, '')}`;
            }

            const priceNum = course.price !== 'N/A' && course.price ? parseInt(course.price) : 0;
            const offerPriceNum = course.offer_price !== 'N/A' && course.offer_price ? parseInt(course.offer_price) : 0;
            let discountStr = '';
            if (priceNum > 0 && offerPriceNum > 0 && priceNum > offerPriceNum) {
              discountStr = `${Math.round(((priceNum - offerPriceNum) / priceNum) * 100)}% OFF`;
            }

            return {
              id: course._id,
              slug: course.slug || course._id,
              category: (course.category !== 'N/A' && course.category) ? course.category : 'Course',
              tag: course.course_type === 'Paid' ? 'PREMIUM' : 'FREE',
              title: course.title,
              price: offerPriceNum > 0 ? `₹ ${offerPriceNum.toLocaleString()}` : (priceNum > 0 ? `₹ ${priceNum.toLocaleString()}` : (course.course_type === 'Free' ? 'FREE' : '')),
              original: '',
              duration: course.duration && course.duration !== 'N/A' ? (typeof course.duration === 'number' || !isNaN(course.duration) ? `${course.duration} Days` : course.duration) : '365 Days',
              views: course.views || 0,
              chapters: course.total_subjects || 0,
              lectures: course.total_lectures || 0,
              img: imgUrl
            };
          });
          
          setAllCourses(mappedCourses);
        } else {
          setAllCourses([]);
        }
      } catch (error) {
        console.error('Courses API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filtered = allCourses.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = (c.title || '').toLowerCase().includes(search.toLowerCase()) || (c.subtitle || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleReset = () => {
    setSearch('');
    setActiveCategory('All');
  };

  const categories = ['All', ...new Set(allCourses.map(c => c.category))];

  return (
    <div className="bg-dots" style={{ minHeight: '80vh' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .public-courses-hero {
          background: var(--gradient-hero);
          color: var(--text-primary);
          padding: 10px 0 30px 0;
          position: relative;
          border-bottom: 1px solid var(--border-color);
          text-align: center;
        }
        .public-courses-search {
          max-width: 500px;
          margin: 0 auto;
          position: relative;
          margin-top: 24px;
        }
        .public-courses-input {
          width: 100%;
          padding: 14px 14px 14px 48px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          font-size: 15px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          box-shadow: var(--card-shadow);
          outline: none;
          transition: all 0.2s;
        }
        .public-courses-input:focus {
          border-color: var(--red);
          background: var(--bg-primary);
          box-shadow: 0 0 0 3px rgba(237, 28, 36, 0.1);
        }
        .public-tab-btn {
          padding: 10px 24px;
          border-radius: 100px;
          border: 1px solid var(--border-color);
          background: var(--card-bg);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .public-tab-btn:hover {
          border-color: var(--red);
          color: var(--red);
        }
        .public-tab-btn.active {
          background: var(--red);
          color: #fff;
          border-color: var(--red);
          box-shadow: 0 4px 12px rgba(237, 28, 36, 0.2);
        }
        .public-course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
          gap: 30px;
        }
        .public-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-align: left;
          position: relative;
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .public-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .public-card-thumb {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 20px;
          overflow: hidden;
        }
        .public-card-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .public-card-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--red);
          color: #fff;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
          z-index: 10;
        }
        .public-card-duration {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.65);
          color: #fff;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          z-index: 10;
        }
        .public-card-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.4;
          font-family: var(--font-display);
        }
        .public-card-subtitle {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.5;
        }
        .public-card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .public-card-footer {
          margin-top: 8px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .public-enroll-btn {
          padding: 8px 16px;
          background: var(--red);
          color: #fff;
          border-radius: 8px;
          font-weight: 700;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s;
        }
        .public-card:hover .public-enroll-btn {
          background: var(--red-dark);
        }
        @media (max-width: 600px) {
          .courses-filter-row {
            flex-direction: column;
            align-items: stretch !important;
            gap: 16px;
          }
        }
      `}} />

      {/* Header Banner */}
      <div className="public-courses-hero">
        <div className="container">
          <h1 style={{ fontSize: 44, fontWeight: 900 }}>
            <span className="animated-text-gradient">Explore</span> <span className="text-gradient">Courses</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginTop: 8 }}>
            Upskill under leading domain experts with curated practical curriculum.
          </p>

          <div className="public-courses-search">
            <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              placeholder="Search courses by name or subject..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="public-courses-input"
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Filter Categories and Row */}
        <div className="courses-filter-row" style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 8, flexWrap: 'nowrap', WebkitOverflowScrolling: 'touch', alignItems: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`public-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat === 'All' ? 'All Courses' : cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
            {filtered.length} courses found
          </span>
        </div>

        {/* Courses Listing Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: 40, height: 40, border: '3px solid rgba(237,28,36,0.2)', borderTop: '3px solid var(--red)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <h3 style={{ color: 'var(--text-secondary)' }}>Loading Courses...</h3>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 16 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 16 }}>No courses found matching your criteria.</p>
            <button className="public-tab-btn" onClick={handleReset} style={{ margin: '0 auto' }}>Reset Filters</button>
          </div>
        ) : (
          <div className="public-course-grid">
            {filtered.map((course, idx) => {
              const cardColor = defaultColors[idx % defaultColors.length];
              return (
              <div 
                key={idx} 
                className="public-card hover-glow"
                onClick={() => setCurrentPage(`course-details/${course.id}`)}
                style={{
                  borderTop: `6px solid transparent`,
                  borderImage: `${cardColor} 1`,
                  borderImageSlice: '1 0 0 0',
                  color: '#333'
                }}
              >
                <div style={{ padding: '16px 16px 0 16px', flex: 1 }}>
                  <div style={{ borderRadius: 12, overflow: 'hidden', height: 160, marginBottom: 16, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: cardColor, opacity: 0.1, zIndex: 1 }}></div>
                    <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 0 }} />
                  </div>
                  
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, marginBottom: 12, lineHeight: 1.3, color: '#0f172a' }}>
                    {course.title}
                  </h4>

                  <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 13, color: '#64748b', fontWeight: 500 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Eye size={14} color="#94a3b8" /> {course.views} Views
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <BookOpen size={14} color="#94a3b8" /> {course.chapters} Chapters
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 12 }}>
                    <Calendar size={14} color="#94a3b8" /> {course.duration}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 16 }}>
                    <Zap size={14} color="#94a3b8" /> Category : {course.category}
                  </div>
                </div>

                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid rgba(0,0,0,0.04)', marginTop: 'auto' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#0f172a' }}>
                    {course.price}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: cardColor, padding: '8px 16px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
