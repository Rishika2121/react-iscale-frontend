import React, { useState, useEffect } from "react";
import { Star, Search, Grid, List, RotateCcw, Brain, BarChart2, BookOpen, Users, Gift, Layers, Calendar, Eye, Filter } from 'lucide-react';

const styles = `
.explore-container {
  min-height: 100vh;
  background: var(--bg-gradient);
  color: var(--text-primary);
  padding-bottom: 80px;
}

/* Hero Section */
.explore-hero {
  background: var(--gradient-hero);
  padding: 35px 0 45px 0;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
}

.explore-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -20%;
  width: 60%;
  height: 150%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, transparent 70%);
  z-index: 1;
  pointer-events: none;
}

.explore-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.breadcrumb {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 10px;
  font-weight: 600;
  background: var(--bg-secondary);
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid var(--border-color);
}

.bc-active {
  color: var(--red);
  font-weight: 700;
}

.explore-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  font-family: var(--font-display);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  line-height: 1.2;
}



.explore-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  max-width: 650px;
  line-height: 1.5;
  margin: 0 auto;
}

/* Controls Wrapper */
.explore-controls-wrapper {
  max-width: 1200px;
  margin: -22px auto 24px;
  padding: 0 18px;
  position: relative;
  z-index: 10;
}

.explore-controls {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  padding: 12px 20px;
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  backdrop-filter: blur(10px);
}

.view-toggle {
  display: flex;
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 2px;
  border: 1px solid var(--border-color);
}

.view-btn {
  padding: 8px 14px;
  background: none;
  border: none;
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 7px;
}

.view-btn-active {
  background: var(--bg-primary);
  color: var(--red);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  transition: color 0.3s;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 42px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 0.9rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input:focus {
  background: var(--bg-primary);
  border-color: var(--red);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
}

.search-input:focus + .search-icon {
  color: var(--red);
}

.reset-btn-control {
  padding: 10px 18px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.reset-btn-control:hover {
  background: var(--red);
  color: white;
  border-color: var(--red);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

/* Category Filter Section */
.filter-title-section {
  max-width: 1200px;
  margin: 0 auto 10px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-results-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
  background: var(--bg-secondary);
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid var(--border-color);
}

/* Premium Category Card Grid */
.premium-cats-grid {
  max-width: 1200px;
  margin: 0 auto 48px;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.cat-card-premium {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 18px 14px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--card-shadow);
}

.cat-card-premium::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cat-card-premium:hover::before {
  opacity: 1;
}

.cat-card-premium:hover {
  transform: translateY(-3px);
  border-color: var(--red);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.05);
}

.cat-card-premium-active {
  background: linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%) !important;
  border-color: var(--red) !important;
  color: #fff !important;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3) !important;
}

.cat-card-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(37, 99, 235, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--red);
  transition: all 0.3s;
}

.cat-card-premium-active .cat-card-icon-wrap {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.cat-card-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.3s;
  line-height: 1.2;
}

.cat-card-premium-active .cat-card-title {
  color: #fff !important;
}

.cat-card-count {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 20px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  transition: all 0.3s;
}

.cat-card-premium-active .cat-card-count {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

/* Design Divider */
.explore-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 48px auto 36px;
  padding: 0 24px;
}

.explore-divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color) 20%, var(--border-color) 80%, transparent);
}

.explore-divider-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 6px 16px;
  border-radius: 100px;
}

/* Courses Grid & List Layouts */
.courses-grid-wrap {
  max-width: 1200px;
  margin: 12px auto 0;
  padding: 0 24px;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr));
  gap: 34px;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Card Styling */
.course-card-premium {
  background: var(--card-bg);
  border-radius: 22px;
  border: 1px solid var(--border-color);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
}

.course-card-premium:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border-color: var(--red);
}

.courses-list .course-card-premium {
  flex-direction: row;
  height: 220px;
}

.course-thumb-container-premium {
  height: 190px;
  position: relative;
  overflow: hidden;
  display: flex;
}

.courses-list .course-thumb-container-premium {
  width: 320px;
  height: 100%;
  flex-shrink: 0;
}

.course-body-premium {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.course-title-premium {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.45;
  margin-bottom: 12px;
  font-family: var(--font-display);
}

.course-meta-row-premium {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.course-meta-item-premium {
  font-size: 1.25rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
}

.course-meta-item-premium svg {
  flex-shrink: 0;
}

.course-category-badge {
  font-size: 1.05rem;
  color: var(--red);
  background: rgba(37, 99, 235, 0.08);
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 700;
  display: inline-block;
  align-self: flex-start;
  margin-bottom: 18px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.course-footer-premium {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-color);
  padding-top: 18px;
}

.price-wrap-premium {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price-current-premium {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-primary);
}

.price-original-premium {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-decoration: line-through;
  font-weight: 500;
}

.learn-more-premium {
  background: var(--red);
  color: #fff;
  padding: 12px 22px;
  border-radius: 999px;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.course-card-premium:hover .learn-more-premium {
  background: var(--red-dark);
}

@media (max-width: 900px) {
  .courses-list .course-card-premium {
    flex-direction: column;
    height: auto;
  }
  
  .courses-list .course-thumb-container-premium {
    width: 100%;
    height: 220px;
  }
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }

  .course-thumb-container-premium {
    height: 210px;
  }

  .course-body-premium {
    padding: 20px;
  }

  .course-footer-premium {
    gap: 12px;
  }

  .learn-more-premium {
    padding: 10px 16px;
  }
}

@media (max-width: 768px) {
  .premium-cats-grid {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 12px;
    margin-bottom: 36px;
    gap: 12px;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
  }
  
  .cat-card-premium {
    flex-shrink: 0;
    width: 150px;
    padding: 16px 12px;
    scroll-snap-align: start;
  }
}

@media (max-width: 600px) {
  .explore-controls {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }
  .search-wrap {
    width: 100%;
  }
  .reset-btn-control {
    justify-content: center;
  }
}

.explore-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 24px;
}

.explore-sidebar {
  width: 320px;
  flex-shrink: 0;
  position: sticky;
  top: 100px;
}

@media (max-width: 768px) {
  .explore-layout {
    flex-direction: column-reverse;
  }
  .explore-sidebar {
    width: 100%;
    position: relative;
    top: 0;
    margin-bottom: 24px;
  }
}
`;

const normalizeCategory = (value) => String(value || '').trim().toLowerCase();

const categories = [
  "All Category",
  "Data Science Courses",
  "Data Analyst Courses",
  "Foundation Courses",
  "Cohort Courses",
  "Free Category"
];

// API fetched data will replace this array

const CourseCard = ({ course, setCurrentPage }) => (
  <div className="course-card-premium" onClick={() => setCurrentPage(`course-details/${course.id}`)}>
    <div className="course-thumb-container-premium">
      {course.cssThumbnailConfig ? (
        <div style={{ width: '100%', height: '100%', background: course.cssThumbnailConfig.bg, position: 'relative', display: 'flex' }}>
          {course.cssThumbnailConfig.badge && (
            <div style={{ position: 'absolute', top: 12, left: 16, background: 'var(--red)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '4px 8px', borderRadius: 4, zIndex: 10 }}>
              {course.cssThumbnailConfig.badge}
            </div>
          )}
          <div style={{ flex: 1, padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1, marginTop: course.cssThumbnailConfig.badge ? 16 : 0 }}>
            {course.cssThumbnailConfig.lines.map((line, idx) => (
              <div key={idx} style={line.style}>{line.text}</div>
            ))}
          </div>
          <div style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '100%', background: `url(${course.cssThumbnailConfig.bgImage}) center/cover`, opacity: 0.6, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
        </div>
      ) : (
        <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
      
      <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--red)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '4px 8px', borderBottomLeftRadius: 8, zIndex: 10 }}>
        {course.price === 0 ? 'FREE COURSE' : 'PREMIUM COURSE'}
      </div>
    </div>

    <div className="course-body-premium">
      <h3 className="course-title-premium"><span className="animated-text-gradient">{course.title}</span></h3>

      <div className="course-meta-row-premium" style={{ minHeight: '16px' }}>
        <span className="course-meta-item-premium">
          <Eye size={20} style={{ color: 'var(--red)' }} /> {course.views.toLocaleString()} Views
        </span>
        <span className="course-meta-item-premium">
          <BookOpen size={20} style={{ color: 'var(--red)' }} /> {course.chapters} Chapters
        </span>
        <span className="course-meta-item-premium">
          <Calendar size={20} style={{ color: 'var(--red)' }} /> {course.days} Days
        </span>
      </div>

      <div className="course-category-badge">
        ⚡ {course.category}
      </div>

      <div className="course-footer-premium">
        <div className="price-wrap-premium">
          {course.price === 0 ? (
            <span className="price-current-premium">Free</span>
          ) : (
            <>
              <span className="price-current-premium">₹ {course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <span className="price-original-premium">₹ {course.originalPrice.toLocaleString()}</span>
              )}
            </>
          )}
        </div>
        <div className="learn-more-premium">
          Learn More →
        </div>
      </div>
    </div>
  </div>
);

const categoryDetails = {
  "All Category": { icon: Layers, label: "All Courses" },
  "Data Science Courses": { icon: Brain, label: "Data Science" },
  "Data Analyst Courses": { icon: BarChart2, label: "Data Analyst" },
  "Foundation Courses": { icon: BookOpen, label: "Foundation" },
  "Cohort Courses": { icon: Users, label: "Cohort Courses" },
  "Free Category": { icon: Gift, label: "Free Courses" }
};



const ExploreCourses = ({ setCurrentPage }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Category");
  const [view, setView] = useState("grid");
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses');
        const data = await response.json();
        
        if (data && Array.isArray(data.data)) {
          const mapped = data.data.map((c) => {
            const price = (c.offer_price !== 'N/A' && c.offer_price) ? parseInt(c.offer_price) : 
                          ((c.price !== 'N/A' && c.price) ? parseInt(c.price) : (c.course_type === 'Free' ? 0 : 0));
            const originalPrice = null;
            let imgUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.title)}&background=random&font-size=0.33`;
            if (c.banner && c.banner !== 'N/A') {
              const cleanedPath = c.banner.replace(/\\/g, '/');
              imgUrl = cleanedPath.startsWith('http') ? cleanedPath : `https://iscale-backend.onrender.com/${cleanedPath.replace(/^src\//, '')}`;
            }

            return {
              id: c._id,
              title: c.title,
              views: c.views || 0,
              chapters: c.total_subjects || 0,
              lectures: c.total_lectures || 0,
              days: c.duration && c.duration !== 'N/A' ? (typeof c.duration === 'number' || !isNaN(c.duration) ? parseInt(c.duration) : 365) : 365,
              category: (c.category !== 'N/A' && c.category) ? String(c.category).trim() :
                        (c.title.toLowerCase().includes('data science') ? 'Data Science Courses' :
                        (c.title.toLowerCase().includes('data analytics') || c.title.toLowerCase().includes('data analyst') ? 'Data Analyst Courses' :
                        (c.title.toLowerCase().includes('cohort') ? 'Cohort Courses' :
                        (c.course_type === 'Free' || c.title.toLowerCase().includes('free') ? 'Free Category' : 'Foundation Courses')))),
              price: price || 0,
              originalPrice: originalPrice,
              thumbnail: imgUrl
            };
          });
          setAllCourses(mapped);
        }
      } catch (err) {
        console.error('ExploreCourses API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = allCourses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = normalizeCategory(category) === normalizeCategory("All Category") || normalizeCategory(c.category) === normalizeCategory(category);
    return matchSearch && matchCat;
  });

  const handleReset = () => {
    setSearch("");
    setCategory("All Category");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="explore-container">
        <div className="explore-hero">
          <div className="explore-hero-inner">
            <nav className="breadcrumb">
              <span>Home</span>
              <span>›</span>
              <span className="bc-active">All Courses</span>
            </nav>
            <h1 className="explore-title" style={{ fontSize: '3.5rem' }}>Explore Our <span className="animated-text-gradient">Programs</span></h1>
            <p className="explore-subtitle">Empower your career with industry-tailored tracks, live mentorship, and complete certification programs.</p>
          </div>
        </div>

        <div className="explore-layout">
          
          {/* Sidebar Column (Category Menu) */}
          <div className="explore-sidebar">
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              backdropFilter: 'blur(16px)', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' 
            }}>
              {/* Highlight Ribbon */}
              <div className="animated-bg-gradient" style={{ 
                color: '#fff', 
                padding: '20px 24px', 
                fontWeight: 800, 
                fontSize: '1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
              }}>
                <Filter size={22} /> Course Categories
              </div>
              
              {/* Menu Items */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {categories.map(cat => {
                  const Icon = categoryDetails[cat]?.icon || Layers;
                  const isActive = category === cat;
                  return (
                    <button 
                      key={cat} 
                      onClick={() => setCategory(cat)} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '14px', 
                        cursor: 'pointer', 
                        fontSize: '1.05rem', 
                        padding: '16px 20px', 
                        borderRadius: '12px', 
                        background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent', 
                        border: isActive ? '1px solid rgba(37, 99, 235, 0.15)' : '1px solid transparent', 
                        transition: 'all 0.2s', 
                        color: isActive ? 'var(--red)' : 'var(--text-primary)', 
                        fontWeight: isActive ? 800 : 600,
                        textAlign: 'left'
                      }}
                    >
                      <Icon size={22} color={isActive ? 'var(--red)' : 'var(--text-muted)'} />
                      <span style={{ flex: 1 }}>{categoryDetails[cat]?.label || cat}</span>
                      {isActive && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 8px var(--red)' }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Column (Search & Courses) */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            {/* Top Controls */}
            <div className="explore-controls" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', boxShadow: 'var(--card-shadow)' }}>
              <div className="search-wrap" style={{ flex: '1 1 360px', position: 'relative' }}>
                <Search size={22} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search for courses by name, tools, or topics..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '16px 20px 16px 56px', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '1.1rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', transition: '0.2s' }}
                />
              </div>
              <button className="reset-btn-control" onClick={handleReset} style={{ whiteSpace: 'nowrap', fontSize: '1.1rem', padding: '14px 24px' }}>
                <RotateCcw size={16} /> Reset All
              </button>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 800, whiteSpace: 'nowrap' }}>Showing {filtered.length} courses</div>
                <div className="view-toggle" style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '4px', border: '1px solid var(--border-color)' }}>
                  <button className={`view-btn ${view === "grid" ? "view-btn-active" : ""}`} onClick={() => setView("grid")} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', background: view === 'grid' ? 'var(--bg-primary)' : 'transparent', color: view === 'grid' ? 'var(--red)' : 'var(--text-secondary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: view === 'grid' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', fontSize: '1rem' }}>
                    <Grid size={18} /> Grid
                  </button>
                  <button className={`view-btn ${view === "list" ? "view-btn-active" : ""}`} onClick={() => setView("list")} style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', background: view === 'list' ? 'var(--bg-primary)' : 'transparent', color: view === 'list' ? 'var(--red)' : 'var(--text-secondary)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: view === 'list' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', fontSize: '1rem' }}>
                    <List size={18} /> List
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="explore-main-area" style={{ width: '100%' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 600 }}>Loading cutting-edge programs...</div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍</div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 800, marginBottom: '8px' }}>No courses found</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Try adjusting your filters or search query.</p>
                </div>
              ) : (
                <div className={view === "grid" ? "courses-grid" : "courses-list"} style={view === "grid" ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' } : { display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {filtered.map((course, idx) => (
                    <CourseCard key={course.id || idx} course={course} setCurrentPage={setCurrentPage} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreCourses;
