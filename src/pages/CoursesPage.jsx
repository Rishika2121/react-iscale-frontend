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
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .courses-layout {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          padding: 40px 24px;
        }
        .courses-sidebar {
          width: 280px;
          flex-shrink: 0;
          background: var(--card-bg);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid var(--border-color);
          position: sticky;
          top: 100px;
          box-shadow: var(--card-shadow);
        }
        .public-course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: 24px;
          flex: 1;
          min-width: 0;
        }
        .public-card {
          background: var(--card-bg);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--card-shadow);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-align: left;
          position: relative;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .public-card:hover {
          transform: translateY(-6px);
          border-color: var(--red);
          box-shadow: 0 15px 35px rgba(37, 99, 235, 0.15);
        }
        .public-card-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .public-enroll-btn {
          padding: 8px 16px;
          background: var(--red);
          color: #fff;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .public-card:hover .public-enroll-btn {
          background: var(--red-dark);
        }
        @media (max-width: 900px) {
          .courses-layout {
            flex-direction: column;
          }
          .courses-sidebar {
            width: 100%;
            position: relative;
            top: 0;
          }
        }
      `}} />

      {/* Header Banner */}
      <div className="public-courses-hero">
        <div className="container">
          <h1 style={{ fontSize: 44, fontWeight: 900 }}>
            <span className="animated-text-gradient">Explore Courses</span>
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

      <div className="container courses-layout">
        {/* Left Sidebar Filter */}
        <div className="courses-sidebar">
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} color="var(--red)" /> Filters
          </h3>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}><span className="animated-text-gradient">Categories</span></h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categories.map(cat => (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: activeCategory === cat ? 'var(--red)' : 'var(--text-secondary)', fontWeight: activeCategory === cat ? 700 : 500, transition: 'all 0.2s' }}>
                  <input 
                    type="radio" 
                    name="category" 
                    checked={activeCategory === cat} 
                    onChange={() => setActiveCategory(cat)} 
                    style={{ accentColor: 'var(--red)', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  {cat === 'All' ? 'All Categories' : cat}
                </label>
              ))}
            </div>
          </div>
          
          <button onClick={handleReset} style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--red)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
            <RotateCcw size={16} /> Reset Filters
          </button>
        </div>

        {/* Right Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 15, fontWeight: 600 }}>
              Showing <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{filtered.length}</span> <span className="animated-text-gradient">programs</span>
            </span>
          </div>

          {/* Courses Listing Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ width: 40, height: 40, border: '3px solid rgba(37,99,235,0.2)', borderTop: '3px solid var(--red)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              <h3 style={{ color: 'var(--text-secondary)' }}>Loading Courses...</h3>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 16 }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 16 }}>No courses found matching your criteria.</p>
              <button onClick={handleReset} style={{ padding: '10px 24px', background: 'var(--red)', color: '#fff', borderRadius: 8, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Reset Search</button>
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
                >
                  <div style={{ padding: '16px 16px 0 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ borderRadius: 12, overflow: 'hidden', height: 160, marginBottom: 16, position: 'relative', border: '1px solid var(--border-color)' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: cardColor, opacity: 0.15, zIndex: 1 }}></div>
                      <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 0 }} />
                    </div>
                    
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, marginBottom: 12, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                      <span className="animated-text-gradient">{course.title}</span>
                    </h4>

                    <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Eye size={14} /> {course.views} Views
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <BookOpen size={14} /> {course.chapters} Chapters
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 12 }}>
                      <Calendar size={14} /> {course.duration}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 16 }}>
                      <Zap size={14} color="var(--red)" /> {course.category}
                    </div>
                  </div>

                  <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--text-primary)' }}>
                      {course.price}
                    </span>
                    
                    {(() => {
                      let isAlreadyEnrolled = false;
                      try {
                        const localEnrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
                        isAlreadyEnrolled = localEnrolled.some(c => c.id === course.id || c._id === course.id);
                      } catch(e) {}
                      
                      return isAlreadyEnrolled ? (
                        <span className="public-enroll-btn" style={{ background: '#22c55e', pointerEvents: 'none' }}>
                          Enrolled <CheckCircle size={14} />
                        </span>
                      ) : (
                        <span className="public-enroll-btn">
                          Learn More <ArrowRight size={14} />
                        </span>
                      );
                    })()}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
