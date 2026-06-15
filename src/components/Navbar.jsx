import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Youtube, Sun, Moon, Calendar, Trophy, MessageSquare, Briefcase, Mic, ShieldCheck, TrendingUp, Award, Sparkles } from 'lucide-react';

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
    <div style={{
      width: 44, height: 44,
      background: 'var(--red)',
      borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative'
    }}>
      <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>i</span>
    </div>
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: -0.5, color: 'var(--text-primary)' }}>
      <span style={{ color: 'var(--red)' }}>i</span>SCALE
    </span>
  </div>
);

const MegaDropdown = ({ type, isOpen, onClose, setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState(
    type === 'cohort' ? 'Cohort Courses' : 'Data Science Courses'
  );

  const categories = {
    'Data Science Courses': [
      { name: 'Data Science With Generative AI Course', path: 'data-science-with-generative-ai-course' }
    ],
    'AI Courses': [
      { name: 'AI Engineer Advance Program', path: 'ai-engineer-advance-program' }
    ],
    'Data Analyst Courses': [
      { name: 'Master Of Data Analytics Program', path: 'master-of-data-analytics-program' }
    ],
    'Foundation Courses': [
      { name: 'Advance Python with AI Tools', path: 'advance-python-with-ai-tools' },
      { name: 'Power BI & Tableau For Data Visualization', path: 'power-bi-tableau-for-data-visualization' },
      { name: 'AI Powered Excel Full Course', path: 'ai-powered-excel-full-course' },
      { name: 'AI Cohort Course', path: 'ai-cohort-course' }
    ],
    'Cohort Courses': [
      { name: 'AI For Everyone : Complete Guide', path: 'ai-for-everyone-complete-guide' }
    ],
    'Free Category': [
      { name: 'Free Data Science Course', path: 'free-data-science-course' },
      { name: 'Free Data Analytics Course', path: 'free-data-analytics-course' }
    ]
  };

  useEffect(() => {
    if (type === 'cohort') {
      setActiveCategory('Cohort Courses');
    } else if (activeCategory === 'Cohort Courses') {
      setActiveCategory('Data Science Courses');
    }
  }, [type]);

  if (!isOpen) return null;

  const activeCategories = type === 'cohort' ? ['Cohort Courses'] : Object.keys(categories).filter(c => c !== 'Cohort Courses');

  return (
    <div className="mega-dropdown-overlay" onMouseLeave={onClose}>
      {/* Highlights Ribbon */}
      <div className="highlights-ribbon">
        <div className="ribbon-text-container">
          <span className="ribbon-item" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><TrendingUp size={14} /> Average Package: 12 LPA</span>
          <span className="ribbon-divider">|</span>
          <span className="ribbon-item" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Award size={14} /> 1,500+ Successful Placements</span>
          <span className="ribbon-divider">|</span>
          <span className="ribbon-item" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Briefcase size={14} /> 500+ Tier-1 Hiring Partners</span>
          <span className="ribbon-divider">|</span>
          <span className="ribbon-item" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><TrendingUp size={14} /> 150% Maximum Salary Hike</span>
          <span className="ribbon-divider">|</span>
          <span className="ribbon-item" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MessageSquare size={14} /> 1-on-1 Personal Mentorship</span>
        </div>
      </div>

      <div className={`${type === 'cohort' ? 'container-fluid mega-grid-cohort' : 'container mega-grid-all'} mega-dropdown-content`}>
        {/* Left Column: Categories List (Only for All Courses) */}
        {type !== 'cohort' && (
          <div className="mega-dropdown-categories">
            {activeCategories.map(cat => (
              <div
                key={cat}
                onMouseEnter={() => setActiveCategory(cat)}
                className={`category-item ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </div>
            ))}
          </div>
        )}

        {/* Middle Column: Course Cards Grid */}
        <div className="mega-dropdown-courses">
          <div className="courses-grid-header">
            <h3>{activeCategory}</h3>
            <p>Certified programs and hands-on syllabus engineered for career success.</p>
          </div>
          <div className="courses-list-grid">
            {categories[activeCategory]?.map((course, idx) => (
              <div
                key={idx}
                onClick={() => { setCurrentPage(`course-details/${course.path}`); onClose(); }}
                className="course-link-card"
              >
                <h4>{course.name}</h4>
                <span>Explore Details →</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Advisor / Promo Card */}
        <div className="mega-dropdown-promo">
          <div className="promo-card">
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}><Sparkles size={14} /> EXPERT ASSISTANCE</span>
            <h3>Need Career Guidance?</h3>
            <p>Talk to our expert counselors today and select the path best matching your background.</p>
            <button onClick={() => { setCurrentPage('contact'); onClose(); }}>Book Consultation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ currentPage, setCurrentPage, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  
  // Dropdown states
  const [dropdownAllOpen, setDropdownAllOpen] = useState(false);
  const [dropdownCohortOpen, setDropdownCohortOpen] = useState(false);

  // Mobile accordions
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileCohortOpen, setMobileCohortOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState('');

  const categories = {
    'Data Science Courses': [
      { name: 'Data Science With Generative AI Course', path: 'data-science-with-generative-ai-course' }
    ],
    'AI Courses': [
      { name: 'AI Engineer Advance Program', path: 'ai-engineer-advance-program' }
    ],
    'Data Analyst Courses': [
      { name: 'Master Of Data Analytics Program', path: 'master-of-data-analytics-program' }
    ],
    'Foundation Courses': [
      { name: 'Advance Python with AI Tools', path: 'advance-python-with-ai-tools' },
      { name: 'Power BI & Tableau For Data Visualization', path: 'power-bi-tableau-for-data-visualization' },
      { name: 'AI Powered Excel Full Course', path: 'ai-powered-excel-full-course' },
      { name: 'AI Cohort Course', path: 'ai-cohort-course' }
    ],
    'Cohort Courses': [
      { name: 'AI For Everyone : Complete Guide', path: 'ai-for-everyone-complete-guide' }
    ],
    'Free Category': [
      { name: 'Free Data Science Course', path: 'free-data-science-course' },
      { name: 'Free Data Analytics Course', path: 'free-data-analytics-course' }
    ]
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = ['Home', 'Explore Courses'];

  const moreLinks = [
    { name: 'Events', path: 'events', icon: <Calendar size={16} /> },
    { name: 'Success Story', path: 'success-story', icon: <Trophy size={16} /> },
    { name: 'Student Testimonials', path: 'student-testimonials', icon: <MessageSquare size={16} /> },
    { name: 'Job Updates', path: 'job-updates', icon: <Briefcase size={16} /> },
    { name: 'Placement Talks', path: 'placement-talks', icon: <Mic size={16} /> },
    { name: 'Verify Certificate', path: 'verify-certificate', icon: <ShieldCheck size={16} /> },
  ];

  return (
    <>
      <style>{`
        .nav-links { display: flex; gap: clamp(8px, 1.5vw, 24px); flex: 1; justify-content: center; align-items: center; }
        .nav-ctas { display: flex; gap: 12px; align-items: center; }
        .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--text-primary); }
        
        /* Mega Dropdown CSS */
        .mega-dropdown-overlay {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          width: 100%;
          background: var(--dropdown-bg);
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
          z-index: 1000;
          border-bottom: 1px solid var(--border-color);
          border-top: 1px solid var(--border-color);
          animation: navSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .highlights-ribbon {
          background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
          color: #fff;
          padding: 8px 0;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          overflow: hidden;
          white-space: nowrap;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .ribbon-text-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
        }
        .ribbon-item {
          flex-shrink: 0;
        }
        .ribbon-divider {
          opacity: 0.5;
        }
        .mega-dropdown-content {
          display: grid;
          min-height: 380px;
          padding: 32px 24px;
          gap: 32px;
        }
        .mega-grid-all {
          grid-template-columns: 240px 1fr 280px;
        }
        .mega-grid-cohort {
          grid-template-columns: 1fr 320px;
        }
        .mega-dropdown-categories {
          border-right: 1px solid var(--border-color);
          padding-right: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .category-item {
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.2s;
          text-align: left;
        }
        .category-item:hover, .category-item.active {
          color: var(--red);
          background: var(--bg-secondary);
        }
        .mega-dropdown-courses {
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .courses-grid-header h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .courses-grid-header p {
          font-size: 13px;
          color: var(--text-muted);
        }
        .courses-list-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .course-link-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
        }
        .course-link-card:hover {
          border-color: var(--red);
          background: var(--dropdown-bg);
          box-shadow: var(--card-shadow);
        }
        .course-link-card h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .course-link-card span {
          font-size: 12px;
          font-weight: 600;
          color: var(--red);
        }
        .mega-dropdown-promo {
          padding-left: 16px;
          border-left: 1px solid var(--border-color);
        }
        .promo-card {
          background: linear-gradient(135deg, #161d30 0%, #0d0f17 100%);
          color: #fff;
          padding: 24px;
          border-radius: 16px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          text-align: left;
        }
        .promo-card span {
          color: #60a5fa;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .promo-card h3 {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .promo-card p {
          font-size: 12px;
          color: #a0aec0;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .promo-card button {
          background: #fff;
          color: #0f0f1b;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .promo-card button:hover {
          background: var(--red);
          color: #fff;
        }

        /* Mobile structure overrides */
        .mobile-dropdown-content { display: none; }
        .mobile-menu-active {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 70px; left: 0; right: 0;
          background: var(--dropdown-bg);
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border-top: 1px solid var(--border-color);
          gap: 16px;
          z-index: 99;
          max-height: calc(100vh - 70px);
          overflow-y: auto;
          animation: navSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .nav-ctas { display: none; }
          .mobile-menu-btn { display: block; }
        }
      `}</style>
      
      {/* Top Bar */}
      <div style={{
        background: '#090d16', color: '#cbd5e1', fontSize: 13,
        padding: '6px 24px', display: 'flex', alignItems: 'center', gap: 24,
        flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Youtube size={14} color="#ff0000" />
          <span>100k Community</span>
        </div>
        <span>📱 +91-7880113112</span>
        <span>📞 +91 7880113112</span>
      </div>

      {/* Main Navbar */}
      <nav style={{
        background: scrolled ? 'var(--nav-bg)' : 'var(--bg-primary)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? 'var(--card-shadow)' : 'none',
        borderBottom: `1px solid var(--border-color)`,
        position: 'sticky', top: 0, zIndex: 100,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          width: '100%', margin: '0 auto', padding: '0 4%',
          display: 'flex', alignItems: 'center', height: 70, gap: '2%', justifyContent: 'space-between'
        }}>
          <div onClick={() => { setCurrentPage('home'); setDropdownAllOpen(false); setDropdownCohortOpen(false); }}>
            <Logo />
          </div>

          <div className="nav-links">
            {/* All Courses Dropdown Trigger */}
            <div 
              style={{ position: 'relative' }} 
              onMouseEnter={() => { setDropdownAllOpen(true); setDropdownCohortOpen(false); }}
            >
              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '14px 18px', borderRadius: 8,
                  border: `1.5px solid ${dropdownAllOpen ? 'var(--red)' : 'var(--border-color)'}`,
                  background: 'var(--bg-secondary)',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 20,
                  color: dropdownAllOpen ? 'var(--red)' : 'var(--text-primary)',
                  transition: 'all 0.2s', cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>▦ All Courses</span>
                <ChevronDown size={20} style={{ transform: dropdownAllOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            </div>

            {/* Standard Nav Links */}
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => { setCurrentPage(item.toLowerCase().replace(' ', '-')); setDropdownAllOpen(false); setDropdownCohortOpen(false); }}
                style={{
                  padding: '14px 18px', background: 'none', border: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 20,
                  color: currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : 'var(--text-primary)',
                  borderRadius: 8, transition: 'all 0.2s',
                  cursor: 'pointer', whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => e.target.style.color = 'var(--red)'}
                onMouseLeave={e => e.target.style.color = currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : 'var(--text-primary)'}
              >
                {item}
              </button>
            ))}

            {/* Cohort Courses Dropdown Trigger */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => { setDropdownCohortOpen(true); setDropdownAllOpen(false); }}
            >
              <div 
                onClick={() => { setCurrentPage('cohort-courses'); setDropdownCohortOpen(false); }}
                style={{
                  padding: '14px 18px', fontWeight: 600, fontSize: 20,
                  color: dropdownCohortOpen ? 'var(--red)' : 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap'
                }}
              >
                <span>Cohort Courses</span>
                <span style={{ background: 'var(--red)', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 100, fontWeight: 800 }}>NEW</span>
                <ChevronDown size={14} style={{ transform: dropdownCohortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
            </div>

            {/* More Menu Dropdown */}
            <div 
              style={{
                padding: '14px 18px', fontWeight: 600, fontSize: 20,
                color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                position: 'relative', whiteSpace: 'nowrap'
              }}
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              More <ChevronDown size={20} />
              {moreOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0,
                  background: 'var(--dropdown-bg)', borderRadius: 12, boxShadow: 'var(--card-shadow)',
                  padding: 12, width: 240, zIndex: 1000, border: '1px solid var(--border-color)',
                  display: 'flex', flexDirection: 'column', gap: 4,
                  animation: 'navSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}>
                  {moreLinks.map(link => (
                    <div 
                      key={link.name}
                      onClick={() => { setCurrentPage(link.path); setDropdownAllOpen(false); setDropdownCohortOpen(false); setMoreOpen(false); }}
                      style={{ 
                        padding: '10px 14px', fontSize: 14, borderRadius: 8, cursor: 'pointer', color: 'var(--text-secondary)',
                        display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      <span style={{ display: 'flex', color: 'inherit' }}>{link.icon}</span>
                      {link.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="nav-ctas">
            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              title="Toggle Light/Dark Theme"
              style={{
                position: 'relative',
                width: 54, height: 28,
                background: theme === 'dark' ? '#0f172a' : 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                border: theme === 'dark' ? '1.5px solid var(--border-color)' : '1.5px solid #7dd3fc',
                borderRadius: 100,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: 0,
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                boxShadow: theme === 'dark' ? 'none' : 'inset 0 2px 4px rgba(255,255,255,0.5)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 2,
                  left: 2,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: theme === 'dark' ? '#334155' : '#ffffff',
                  boxShadow: theme === 'dark' ? '0 2px 5px rgba(0,0,0,0.15)' : '0 2px 8px rgba(245, 158, 11, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: theme === 'dark' ? 'translateX(26px)' : 'translateX(0)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  color: theme === 'dark' ? '#e2e8f0' : '#f59e0b'
                }}
              >
                {theme === 'dark' ? <Moon size={11} fill="#e2e8f0" /> : <Sun size={11} fill="#f59e0b" />}
              </div>
            </button>

            {localStorage.getItem('token') ? (
              <button
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  padding: '10px 22px', background: 'var(--red)', color: '#fff',
                  borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                  transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)'
                }}
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                style={{
                  padding: '10px 22px', background: 'var(--red)', color: '#fff',
                  borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                  transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)'
                }}
              >
                Login/Register
              </button>
            )}
            
            <button style={{
              padding: '8px 16px', background: '#000', color: '#fff',
              borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12,
              display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #222'
            }}>
              <span style={{ fontSize: 16 }}>▶</span>
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: 9, opacity: 0.7 }}>GET IT ON</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Google Play</div>
              </div>
            </button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mega Dropdowns Rendering (Desktop) */}
        <MegaDropdown 
          type="all"
          isOpen={dropdownAllOpen} 
          onClose={() => setDropdownAllOpen(false)} 
          setCurrentPage={setCurrentPage} 
        />
        <MegaDropdown 
          type="cohort"
          isOpen={dropdownCohortOpen} 
          onClose={() => setDropdownCohortOpen(false)} 
          setCurrentPage={setCurrentPage} 
        />

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div className="mobile-menu-active">
            {/* Mobile Mode Switcher */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Switch Theme</span>
              <button
                onClick={toggleTheme}
                title="Toggle Light/Dark Theme"
                style={{
                  position: 'relative',
                  width: 54, height: 28,
                  background: theme === 'dark' ? '#0f172a' : 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                  border: theme === 'dark' ? '1.5px solid var(--border-color)' : '1.5px solid #7dd3fc',
                  borderRadius: 100,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  padding: 0,
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: theme === 'dark' ? 'none' : 'inset 0 2px 4px rgba(255,255,255,0.5)'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: theme === 'dark' ? '#334155' : '#ffffff',
                    boxShadow: theme === 'dark' ? '0 2px 5px rgba(0,0,0,0.15)' : '0 2px 8px rgba(245, 158, 11, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: theme === 'dark' ? 'translateX(26px)' : 'translateX(0)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: theme === 'dark' ? '#e2e8f0' : '#f59e0b'
                  }}
                >
                  {theme === 'dark' ? <Moon size={10} fill="#e2e8f0" /> : <Sun size={10} fill="#f59e0b" />}
                </div>
              </button>
            </div>

            {/* Mobile All Courses Accordion */}
            <div style={{ borderBottom: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                style={{
                  width: '100%', padding: '12px 16px', fontSize: 16, fontWeight: 700,
                  color: 'var(--text-primary)', background: 'none', border: 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <span>▦ All Courses</span>
                <ChevronDown size={18} style={{ transform: mobileCoursesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {mobileCoursesOpen && (
                <div style={{ padding: '0 16px 12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {Object.keys(categories).filter(c => c !== 'Cohort Courses').map(cat => (
                    <div key={cat} style={{ textAlign: 'left' }}>
                      <button
                        onClick={() => setMobileActiveCategory(mobileActiveCategory === cat ? '' : cat)}
                        style={{
                          width: '100%', padding: '8px 0', fontSize: 14, fontWeight: 600,
                          color: mobileActiveCategory === cat ? 'var(--red)' : 'var(--text-secondary)',
                          background: 'none', border: 'none', textAlign: 'left',
                          display: 'flex', justifyContent: 'space-between'
                        }}
                      >
                        {cat}
                        <span>{mobileActiveCategory === cat ? '−' : '+'}</span>
                      </button>
                      {mobileActiveCategory === cat && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 12, marginTop: 4 }}>
                          {categories[cat].map((course, idx) => (
                            <div
                              key={idx}
                              onClick={() => { setCurrentPage(`course-details/${course.path}`); setMobileOpen(false); }}
                              style={{ padding: '6px 0', fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer' }}
                            >
                              {course.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Cohort Courses Accordion */}
            <div style={{ borderBottom: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => setMobileCohortOpen(!mobileCohortOpen)}
                style={{
                  width: '100%', padding: '12px 16px', fontSize: 16, fontWeight: 700,
                  color: 'var(--text-primary)', background: 'none', border: 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Cohort Courses</span>
                  <span style={{ background: 'var(--red)', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 100, fontWeight: 800 }}>NEW</span>
                </div>
                <ChevronDown size={18} style={{ transform: mobileCohortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {mobileCohortOpen && (
                <div style={{ padding: '0 16px 12px 28px', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
                  {categories['Cohort Courses'].map((course, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setCurrentPage(`course-details/${course.path}`); setMobileOpen(false); }}
                      style={{ padding: '6px 0', fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer' }}
                    >
                      {course.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Standard Items */}
            {navItems.map(item => (
              <div
                key={item}
                onClick={() => { setCurrentPage(item.toLowerCase().replace(' ', '-')); setMobileOpen(false); }}
                style={{
                  padding: '12px 16px', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-color)', cursor: 'pointer', textAlign: 'left'
                }}
              >
                {item}
              </div>
            ))}
            
            {/* More options accordion */}
            <div style={{ padding: '12px 16px', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }} onClick={() => setMoreOpen(!moreOpen)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>More options</span>
                <ChevronDown size={18} style={{ transform: moreOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>
              {moreOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12, paddingLeft: 12, textAlign: 'left' }}>
                  {moreLinks.map(link => (
                    <div 
                      key={link.name}
                      onClick={(e) => { e.stopPropagation(); setCurrentPage(link.path); setMobileOpen(false); }}
                      style={{ 
                        fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px 12px',
                        display: 'flex', alignItems: 'center', gap: 10, borderRadius: 8, fontWeight: 600
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--red)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                      <span style={{ display: 'flex' }}>{link.icon}</span>
                      {link.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Logins */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              {localStorage.getItem('token') ? (
                <button
                  onClick={() => { setCurrentPage('dashboard'); setMobileOpen(false); }}
                  style={{
                    padding: '12px', background: 'var(--red)', color: '#fff',
                    borderRadius: 8, fontWeight: 600, fontSize: 15, border: 'none'
                  }}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => { setCurrentPage('login'); setMobileOpen(false); }}
                  style={{
                    padding: '12px', background: 'var(--red)', color: '#fff',
                    borderRadius: 8, fontWeight: 600, fontSize: 15, border: 'none'
                  }}
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
