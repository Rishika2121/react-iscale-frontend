import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Search, Filter, RotateCcw, Clock, Globe, BookOpen, CheckCircle } from 'lucide-react';

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
        const response = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses');
        const data = await response.json();
        
        if (data && Array.isArray(data.data)) {
          const mappedCourses = data.data.map((course, index) => {
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
              category: (course.category !== 'N/A' && course.category) ? course.category :
                        (course.title.toLowerCase().includes('data science') ? 'Data Science Courses' :
                        (course.title.toLowerCase().includes('data analytics') || course.title.toLowerCase().includes('data analyst') ? 'Data Analyst Courses' :
                        (course.title.toLowerCase().includes('cohort') ? 'Cohort Courses' :
                        (course.course_type === 'Free' || course.title.toLowerCase().includes('free') ? 'Free Category' : 'Foundation Courses')))),
              tag: course.course_type === 'Paid' ? 'PREMIUM' : 'FREE',
              title: course.title,
              subtitle: course.subtitle || '',
              price: offerPriceNum > 0 ? `₹${offerPriceNum.toLocaleString()}` : (course.course_type === 'Free' ? 'FREE' : ''),
              original: (priceNum > offerPriceNum) ? `₹${priceNum.toLocaleString()}` : '',
              discount: discountStr,
              rating: course.rating || 0,
              students: course.students || 0,
              img: imgUrl,
              color: defaultColors[index % defaultColors.length],
              duration: course.duration || '',
              language: course.language || '',
              lectures: course.lectures || '',
              features: course.features || [],
              skills: course.skills || []
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
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.subtitle.toLowerCase().includes(search.toLowerCase());
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
          padding: 60px 0;
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
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--card-shadow);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
        }
        .public-card:hover {
          transform: translateY(-8px);
          border-color: var(--red);
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
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
            Explore Our <span className="text-gradient">Courses</span>
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
            {filtered.map((course, idx) => (
              <div 
                key={idx} 
                className="public-card"
                onClick={() => setCurrentPage(`course-details/${course.id}`)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  borderRadius: 20
                }}
              >
                <div>
                  {/* Thumbnail */}
                  <div className="public-card-thumb" style={{ background: course.color, height: 145, position: 'relative', overflow: 'hidden' }}>
                    <span className="public-card-tag">
                      {course.tag}
                    </span>
                    <span className="public-card-duration" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={11} /> {course.duration}
                    </span>
                    <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', zIndex: 1 }} />
                  </div>

                  {/* Body Details */}
                  <div className="public-card-info" style={{ padding: '16px 16px 0 16px' }}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', minHeight: '16px' }}>
                      {course.language && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Globe size={12} color="var(--red)" /> {course.language}
                        </span>
                      )}
                      {course.lectures && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <BookOpen size={12} color="var(--red)" /> {course.lectures}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: 11, color: 'var(--red)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{course.category}</div>
                    <h3 className="public-card-title" style={{ fontSize: '16px', fontWeight: 800, marginBottom: 6, color: 'var(--text-primary)' }}>{course.title}</h3>
                    {course.subtitle && (
                      <p className="public-card-subtitle" style={{ fontSize: '12px', lineHeight: '1.4', height: '34px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: 12, color: 'var(--text-secondary)' }}>{course.subtitle}</p>
                    )}

                    {course.rating > 0 && (
                      <div className="public-card-rating" style={{ marginBottom: 12, fontSize: 11 }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} fill="#FFD700" color="#FFD700" />)}
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', marginLeft: 4 }}>{course.rating}</span>
                        {course.students > 0 && (
                          <span style={{ color: 'var(--text-muted)', marginLeft: 2 }}>({course.students.toLocaleString()})</span>
                        )}
                      </div>
                    )}

                    {/* Features checklist in 2x2 Grid */}
                    {course.features && course.features.length > 0 && (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '8px 10px', 
                        marginBottom: 16, 
                        padding: '10px 12px', 
                        background: 'var(--bg-primary)', 
                        borderRadius: 12, 
                        border: '1px solid var(--border-color)' 
                      }}>
                        {course.features.slice(0, 4).map((feat, fidx) => (
                          <div key={fidx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)' }}>
                            <CheckCircle size={12} color="#22c55e" style={{ flexShrink: 0 }} />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={feat}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills pills */}
                    {course.skills && course.skills.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
                        {course.skills.map((skill, sidx) => (
                          <span 
                            key={sidx} 
                            style={{ 
                              fontSize: 9, 
                              fontWeight: 700, 
                              color: 'var(--red)', 
                              background: 'rgba(237, 28, 36, 0.04)', 
                              padding: '3px 8px', 
                              borderRadius: 6, 
                              border: '1px solid rgba(237, 28, 36, 0.08)' 
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Section */}
                <div style={{ padding: '0 16px 16px 16px' }}>
                  <div style={{ height: 1, background: 'var(--border-color)', margin: '12px 0' }} />
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>Course Fee</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, color: 'var(--red)' }}>{course.price}</span>
                        {course.original && (
                          <span style={{ color: 'var(--text-muted)', fontSize: 12, textDecoration: 'line-through' }}>{course.original}</span>
                        )}
                      </div>
                    </div>
                    {course.discount && (
                      <span style={{
                        background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e',
                        fontSize: 10, fontWeight: 800, padding: '3px 8px',
                        borderRadius: 100, border: '1px solid rgba(34, 197, 94, 0.15)'
                      }}>
                        {course.discount}
                      </span>
                    )}
                  </div>

                  <button
                    className="public-enroll-btn"
                    onClick={(e) => { e.stopPropagation(); setCurrentPage(`course-details/${course.id}`); }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: 'var(--red)',
                      color: '#fff',
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 4px 12px rgba(237, 28, 36, 0.12)'
                    }}
                  >
                    Enroll Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
