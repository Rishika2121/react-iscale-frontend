import React, { useState } from "react";

const styles = `
.explore-container {
  min-height: 100vh;
  background: #fdfdfd;
}

/* Hero */
.explore-hero {
  background: linear-gradient(135deg, #fce4ff 0%, #dbeafe 50%, #e0e7ff 100%);
  padding: 60px 0 100px 0;
  position: relative;
}

.explore-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 24px;
}

.bc-active {
  color: #334155;
  font-weight: 500;
}

.explore-title {
  font-size: 3rem;
  font-weight: 900;
  color: #1e293b;
  font-family: var(--font-display);
  margin-bottom: 40px;
}

.explore-controls-wrapper {
  max-width: 1200px;
  margin: -40px auto 40px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
}

.explore-controls {
  background: #fff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.view-toggle {
  display: flex;
  background: #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
}

.view-btn {
  padding: 12px 20px;
  background: none;
  border: none;
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.view-btn-active {
  background: #fff;
  color: var(--red);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border-radius: 10px;
  margin: 2px;
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #f8fafc;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  background: #fff;
  border-color: #cbd5e1;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
}

.category-select {
  padding: 12px 40px 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #f8fafc;
  cursor: pointer;
  color: #334155;
  font-weight: 500;
  outline: none;
}

.reset-btn {
  padding: 12px 24px;
  background: #b91c1c;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}
.reset-btn:hover {
  background: #991b1b;
}

.courses-grid-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 60px;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
}

.courses-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.course-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}

.courses-list .course-card {
  flex-direction: row;
  height: 220px;
}

.course-thumb-container {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.courses-list .course-thumb-container {
  width: 340px;
  height: 100%;
}

.course-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.course-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 12px;
  font-family: var(--font-display);
}

.course-meta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.course-meta-item {
  font-size: 0.75rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.course-category {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.course-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-current {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

.price-original {
  font-size: 0.85rem;
  color: #94a3b8;
  text-decoration: line-through;
  font-weight: 500;
}

.learn-more {
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 768px) {
  .explore-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .courses-grid {
    grid-template-columns: 1fr;
  }
  .courses-list .course-card {
    flex-direction: column;
    height: auto;
  }
  .courses-list .course-thumb-container {
    width: 100%;
    height: 200px;
  }
}
`;

const categories = [
  "All Category",
  "Data Science Courses",
  "Data Analyst Courses",
  "Foundation Courses",
  "Cohort Courses",
  "Free Category"
];

const allCourses = [
  {
    id: 'data-science-with-generative-ai-course',
    title: 'Data Science With Generative AI Course',
    views: 28574,
    chapters: 80,
    days: 365,
    category: 'Data Science Courses',
    price: 39999,
    originalPrice: null,
    thumbnail: 'https://www.theiscale.com/myadmin/uploads/courses/Data_science_Course_paid_compressed.png',
  },
  {
    id: 'master-of-data-analytics-program',
    title: 'Master Of Data Analytics Program',
    views: 28749,
    chapters: 43,
    days: 180,
    category: 'Data Analyst Courses',
    price: 23999,
    originalPrice: null,
    cssThumbnailConfig: {
      bg: 'linear-gradient(to right, #450a0a, #000)',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'MASTER OF', style: { color: '#fff', fontSize: 18, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)' } },
        { text: 'DATA', style: { color: '#fbbf24', fontSize: 28, fontWeight: 900, lineHeight: 1.1, marginTop: 4, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'ANALYTICS', style: { color: '#fbbf24', fontSize: 28, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'PROGRAM', style: { color: '#cbd5e1', fontSize: 13, fontWeight: 800, lineHeight: 1.2, marginTop: 6, letterSpacing: 1 } }
      ]
    }
  },
  {
    id: 'advance-python-with-ai-tools',
    title: 'Advance Python with AI Tools',
    views: 765,
    chapters: 45,
    days: 90,
    category: 'Foundation Courses',
    price: 8999,
    originalPrice: 10999,
    cssThumbnailConfig: {
      badge: 'APP + WEB COURSE',
      bg: 'linear-gradient(to right, #1a0b16, #000)',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'ADVANCE', style: { color: '#fbbf24', fontSize: 26, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'PYTHON', style: { color: '#fbbf24', fontSize: 26, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'WITH AI TOOLS', style: { color: '#cbd5e1', fontSize: 13, fontWeight: 800, lineHeight: 1.2, marginTop: 6, letterSpacing: 1 } }
      ]
    }
  },
  {
    id: 'power-bi-tableau-for-data-visualization',
    title: 'Power BI & Tableau For Data Visualization',
    views: 163,
    chapters: 39,
    days: 40,
    category: 'Foundation Courses',
    price: 4999,
    originalPrice: 5999,
    cssThumbnailConfig: {
      badge: 'APP + WEB COURSE',
      bg: 'linear-gradient(to right, #1a0b16, #000)',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'POWER BI', style: { color: '#fbbf24', fontSize: 24, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: '& TABLEAU', style: { color: '#fbbf24', fontSize: 24, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'FOR DATA VISUALIZATION', style: { color: '#cbd5e1', fontSize: 11, fontWeight: 800, lineHeight: 1.2, marginTop: 6, letterSpacing: 1 } }
      ]
    }
  },
  {
    id: 'free-data-science-course',
    title: 'Free Data Science Course',
    views: 45739,
    chapters: 16,
    days: 15,
    category: 'Free Category',
    price: 0,
    cssThumbnailConfig: {
      badge: 'Free YouTube',
      bg: 'linear-gradient(to right, #1a0b16, #000)',
      bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'DATA', style: { color: '#fbbf24', fontSize: 36, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'SCIENCE', style: { color: '#fbbf24', fontSize: 36, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } }
      ]
    }
  },
  {
    id: 'free-data-analytics-course',
    title: 'Free Data Analytics Course',
    views: 337047,
    chapters: 66,
    days: 15,
    category: 'Free Category',
    price: 0,
    cssThumbnailConfig: {
      badge: 'Free YouTube',
      bg: 'linear-gradient(to right, #1a0b16, #000)',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'DATA', style: { color: '#fbbf24', fontSize: 36, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'ANALYTICS', style: { color: '#fbbf24', fontSize: 36, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } }
      ]
    }
  },
  {
    id: 'ai-powered-excel-full-course',
    title: 'AI Powered Excel Full Course',
    views: 30,
    chapters: 48,
    days: 30,
    category: 'Foundation Courses',
    price: 1999,
    originalPrice: 2499,
    cssThumbnailConfig: {
      badge: 'APP + WEB COURSE',
      bg: 'linear-gradient(to right, #1a0b16, #000)',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'ADVANCE', style: { color: '#fbbf24', fontSize: 24, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'EXCEL', style: { color: '#fbbf24', fontSize: 24, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'MASTER CLASS', style: { color: '#fbbf24', fontSize: 24, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'WITH AI', style: { color: '#cbd5e1', fontSize: 13, fontWeight: 800, lineHeight: 1.2, marginTop: 4, letterSpacing: 1 } }
      ]
    }
  },
  {
    id: 'ai-for-everyone-complete-guide',
    title: 'AI For Everyone : Complete Guide',
    views: 1278,
    chapters: 16,
    days: 120,
    category: 'Cohort Courses',
    price: 4999,
    originalPrice: 6999,
    cssThumbnailConfig: {
      bg: 'linear-gradient(to right, #1a0b16, #000)',
      bgImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'AI COHORT 1.0', style: { color: '#d8b4fe', fontSize: 28, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1, textShadow: '0 2px 10px rgba(168, 85, 247, 0.5)' } },
        { text: 'FOR EVERYONE: COMPLETE GUIDE', style: { color: '#cbd5e1', fontSize: 9, fontWeight: 700, lineHeight: 1.2, marginTop: 6, letterSpacing: 1 } },
        { text: 'WITH 🔴 LIVE', style: { color: '#fff', fontSize: 11, fontWeight: 800, lineHeight: 1.2, marginTop: 8 } },
        { text: 'MARATHON CLASS', style: { color: '#cbd5e1', fontSize: 11, fontWeight: 800, lineHeight: 1.2, marginTop: 2 } }
      ]
    }
  },
  {
    id: 'ai-cohort-course',
    title: 'AI Cohort Course',
    views: 693,
    chapters: 31,
    days: 45,
    category: 'Foundation Courses',
    price: 5990,
    originalPrice: 5999,
    cssThumbnailConfig: {
      badge: '🔴 LIVE',
      bg: 'linear-gradient(to right, #1a0b16, #000)',
      bgImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'AI COHORT', style: { color: '#fbbf24', fontSize: 26, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'COURSE', style: { color: '#fbbf24', fontSize: 26, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'BATCH 01', style: { color: '#cbd5e1', fontSize: 14, fontWeight: 800, lineHeight: 1.2, marginTop: 6, letterSpacing: 1 } },
        { text: '📅 05th May 2026', style: { color: '#94a3b8', fontSize: 10, fontWeight: 600, lineHeight: 1.2, marginTop: 4 } }
      ]
    }
  },
  {
    id: 'ai-engineer-advance-program',
    title: 'AI Engineer Advance Program',
    views: 200,
    chapters: 15,
    days: 365,
    category: 'Data Science Courses',
    price: 34999,
    originalPrice: null,
    cssThumbnailConfig: {
      badge: 'APP + WEB COURSE',
      bg: 'linear-gradient(to right, #1a0b16, #000)',
      bgImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'AI ENGINEER', style: { color: '#d8b4fe', fontSize: 26, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'ADVANCE', style: { color: '#fbbf24', fontSize: 26, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'PROGRAM', style: { color: '#fbbf24', fontSize: 26, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } }
      ]
    }
  }
];

const CourseCard = ({ course, setCurrentPage }) => (
  <div className="course-card" onClick={() => setCurrentPage(`course-details/${course.id}`)}>
    <div className="course-thumb-container">
      {course.cssThumbnailConfig ? (
        <div style={{ width: '100%', height: '100%', background: course.cssThumbnailConfig.bg, position: 'relative', display: 'flex' }}>
          {course.cssThumbnailConfig.badge && (
            <div style={{ position: 'absolute', top: 12, left: 16, background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 800, padding: '4px 8px', borderRadius: 4, zIndex: 10 }}>
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
      
      {/* Premium / Free Badge in top right corner */}
      <div style={{ position: 'absolute', top: 0, right: 0, background: course.price === 0 ? '#ef4444' : '#ef4444', color: '#fff', fontSize: 9, fontWeight: 800, padding: '4px 8px', borderBottomLeftRadius: 8, zIndex: 10 }}>
        {course.price === 0 ? 'FREE COURSE' : 'PREMIUM COURSE'}
      </div>
    </div>

    <div className="course-body">
      <h3 className="course-title">{course.title}</h3>

      <div className="course-meta-row">
        <span className="course-meta-item">
          👁 {course.views.toLocaleString()} Views
        </span>
        <span className="course-meta-item">
          📚 {course.chapters} Chapters
        </span>
        <span className="course-meta-item">
          📅 {course.days} Days
        </span>
      </div>

      <div className="course-category">
        ⚡ Category : {course.category}
      </div>

      <div className="course-footer">
        <div className="price-wrap">
          {course.price === 0 ? (
            <span className="price-current">Free</span>
          ) : (
            <>
              <span className="price-current">₹ {course.price.toLocaleString()}</span>
              {course.originalPrice && (
                <span className="price-original">₹ {course.originalPrice.toLocaleString()}</span>
              )}
            </>
          )}
        </div>
        <div className="learn-more">
          Learn More →
        </div>
      </div>
    </div>
  </div>
);

const ExploreCourses = ({ setCurrentPage }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Category");
  const [view, setView] = useState("grid");

  const filtered = allCourses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All Category" || c.category === category;
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
            <h1 className="explore-title">All Courses</h1>
          </div>
        </div>

        <div className="explore-controls-wrapper">
          <div className="explore-controls">
            <div className="view-toggle">
              <button className={`view-btn ${view === "grid" ? "view-btn-active" : ""}`} onClick={() => setView("grid")}>
                ⊞ Grid
              </button>
              <button className={`view-btn ${view === "list" ? "view-btn-active" : ""}`} onClick={() => setView("list")}>
                ☰ List
              </button>
            </div>

            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search Your Course.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button className="reset-btn" onClick={handleReset}>
              ↺ Reset
            </button>
          </div>
        </div>

        <div className="courses-grid-wrap">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16 }}>
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: 16 }}>No courses found matching your criteria.</p>
              <button className="reset-btn" onClick={handleReset} style={{ margin: '0 auto' }}>Reset Filters</button>
            </div>
          ) : (
            <div className={view === "grid" ? "courses-grid" : "courses-list"}>
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} setCurrentPage={setCurrentPage} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExploreCourses;