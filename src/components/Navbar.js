import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Youtube } from 'lucide-react';

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
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>
      <span style={{ color: 'var(--red)' }}>i</span>SCALE
    </span>
  </div>
);

const CoursesDropdown = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Data Science Courses');

  const categories = {
    'Data Science Courses': [
      { name: 'Data Science With Generative AI Course', path: 'data-science-with-generative-ai-course' },
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

  return (
    <div 
      style={{ position: 'relative' }} 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 16px', borderRadius: 8,
          border: `1.5px solid ${isOpen ? 'var(--red)' : '#ddd'}`,
          background: '#f9f9f9',
          fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14,
          color: isOpen ? 'var(--red)' : '#000',
          transition: 'all 0.2s', cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: 16 }}>▦</span> Courses
      </button>

      {isOpen && (
        <div className="courses-dropdown-menu">
          {/* Invisible bridge to prevent hover loss */}
          <div style={{ position: 'absolute', top: -10, left: 0, width: '100%', height: 10 }} />
          
          {/* Left: Categories */}
          <div className="courses-dropdown-left" style={{ width: 220, borderRight: '1px solid #eef0f3', padding: 12, background: '#fafafa' }}>
            {Object.keys(categories).map(cat => (
              <div 
                key={cat}
                onMouseEnter={() => setActiveCategory(cat)}
                style={{
                  padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
                  color: activeCategory === cat ? 'var(--red)' : '#475569',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  background: activeCategory === cat ? '#fff' : 'transparent',
                  boxShadow: activeCategory === cat ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                  fontSize: 14, transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* Right: Courses */}
          <div style={{ flex: 1, padding: 16, background: '#fff' }}>
            {categories[activeCategory].length > 0 ? (
              categories[activeCategory].map((course, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentPage(`course-details/${course.path}`)}
                  style={{
                    padding: '12px 16px', cursor: 'pointer', fontSize: 14, color: '#1e293b',
                    transition: 'all 0.2s', borderRadius: 8, fontWeight: 500,
                    marginBottom: 4
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.background = '#f8f9ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#1e293b'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {course.name}
                </div>
              ))
            ) : (
              <div style={{ padding: 16, color: '#94a3b8', fontSize: 14, fontStyle: 'italic' }}>More courses coming soon...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = ['Home', 'Explore Courses'];

  return (
    <>
      <style>{`
        .nav-links { display: flex; gap: 4px; flex: 1; justify-content: center; align-items: center; }
        .nav-ctas { display: flex; gap: 12px; align-items: center; }
        .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: #333; }
        .courses-dropdown-menu {
          position: absolute; top: 100%; left: 0;
          width: 500px; background: #fff; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          display: flex; z-index: 1000; margin-top: 10px; border: 1px solid #eef0f3;
        }
        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .nav-ctas { display: none; }
          .mobile-menu-btn { display: block; }
        }
        @media (max-width: 600px) {
          .courses-dropdown-menu { width: 90vw; flex-direction: column; left: 0; transform: none; }
          .courses-dropdown-left { width: 100% !important; border-right: none !important; border-bottom: 1px solid #eef0f3; display: flex; overflow-x: auto; }
        }
        .mobile-dropdown-content {
          display: none;
        }
        .mobile-menu-active {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 70px;
          left: 0;
          right: 0;
          background: #fff;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border-top: 1px solid #eee;
          gap: 16px;
          z-index: 99;
          max-height: 80vh;
          overflow-y: auto;
        }
      `}</style>
      
      {/* Top bar */}
      <div style={{
        background: '#111', color: '#fff', fontSize: 13,
        padding: '6px 24px', display: 'flex', alignItems: 'center', gap: 24,
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Youtube size={14} color="#ff0000" />
          <span>100k Community</span>
        </div>
        <span>📱 +91-7880113112</span>
        <span>📞 +91 7880113112</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          {['f','𝕏','in','📷','🔵'].map((s,i) => (
            <span key={i} style={{ cursor: 'pointer', opacity: 0.8 }}>{s}</span>
          ))}
        </div>
      </div>

      {/* Main navbar */}
      <nav style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 0 #eee',
        position: 'sticky', top: 0, zIndex: 100,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', height: 70, gap: 32, justifyContent: 'space-between'
        }}>
          <div onClick={() => setCurrentPage('home')}>
            <Logo />
          </div>

          <div className="nav-links">
            <CoursesDropdown setCurrentPage={setCurrentPage} />

            {navItems.map(item => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase().replace(' ', '-'))}
                style={{
                  padding: '8px 16px', background: 'none', border: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15,
                  color: currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : '#333',
                  borderRadius: 8, transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => e.target.style.color = 'var(--red)'}
                onMouseLeave={e => e.target.style.color = currentPage === item.toLowerCase().replace(' ', '-') ? 'var(--red)' : '#333'}
              >
                {item}
              </button>
            ))}

            <div 
              onClick={() => setCurrentPage('cohort-courses')}
              style={{
                padding: '8px 16px', fontWeight: 600, fontSize: 15,
                color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
              }}
            >
              <span style={{ color: 'var(--red)' }}>Cohort Courses</span>
              <span style={{ background: 'var(--red)', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 100, fontWeight: 800 }}>NEW</span>
            </div>

            <div 
              style={{
                padding: '8px 16px', fontWeight: 500, fontSize: 15,
                color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                position: 'relative'
              }}
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              More <ChevronDown size={16} />
              {moreOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0,
                  background: '#fff', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  padding: 8, width: 200, zIndex: 1000, border: '1px solid #eee'
                }}>
                  {['Events', 'Success Story', 'Job Updates', 'Placement Talks'].map(item => (
                    <div 
                      key={item}
                      onClick={() => setCurrentPage(item.toLowerCase().replace(' ', '-'))}
                      style={{ padding: '10px 16px', fontSize: 14, borderRadius: 6, cursor: 'pointer', color: '#444' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f9f9f9'; e.currentTarget.style.color = 'var(--red)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#444'; }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="nav-ctas">
            {localStorage.getItem('token') ? (
              <button
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  padding: '10px 22px', background: 'var(--red)', color: '#fff',
                  borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                  transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(192,0,12,0.3)'
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
                  transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(192,0,12,0.3)'
                }}
              >
                Login/Register
              </button>
            )}
            <button style={{
              padding: '8px 16px', background: '#000', color: '#fff',
              borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12,
              display: 'flex', alignItems: 'center', gap: 6
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

        {/* Mobile Dropdown */}
        <div className={mobileOpen ? 'mobile-menu-active' : 'mobile-dropdown-content'}>
          <div style={{ marginBottom: 16 }}>
             <CoursesDropdown setCurrentPage={(p) => { setCurrentPage(p); setMobileOpen(false); }} />
          </div>
          {navItems.map(item => (
            <div
              key={item}
              onClick={() => { setCurrentPage(item.toLowerCase().replace(' ', '-')); setMobileOpen(false); }}
              style={{
                padding: '12px 16px', fontSize: 16, fontWeight: 600, color: '#333',
                borderBottom: '1px solid #f0f0f0', cursor: 'pointer'
              }}
            >
              {item}
            </div>
          ))}
          <div 
            onClick={() => { setCurrentPage('cohort-courses'); setMobileOpen(false); }}
            style={{
              padding: '12px 16px', fontSize: 16, fontWeight: 600, color: '#333',
              borderBottom: '1px solid #f0f0f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <span style={{ color: 'var(--red)' }}>Cohort Courses</span>
            <span style={{ background: 'var(--red)', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 100, fontWeight: 800 }}>NEW</span>
          </div>
          
          <div style={{ padding: '12px 16px', fontSize: 16, fontWeight: 600, color: '#333' }}>
            More options:
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12, paddingLeft: 12 }}>
              {['Events', 'Success Story', 'Job Updates', 'Placement Talks'].map(item => (
                <div 
                  key={item}
                  onClick={() => { setCurrentPage(item.toLowerCase().replace(' ', '-')); setMobileOpen(false); }}
                  style={{ fontSize: 15, color: '#555', cursor: 'pointer' }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {localStorage.getItem('token') ? (
              <button
                onClick={() => { setCurrentPage('dashboard'); setMobileOpen(false); }}
                style={{
                  padding: '12px', background: 'var(--red)', color: '#fff',
                  borderRadius: 8, fontWeight: 600, fontSize: 16, border: 'none'
                }}
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => { setCurrentPage('login'); setMobileOpen(false); }}
                style={{
                  padding: '12px', background: 'var(--red)', color: '#fff',
                  borderRadius: 8, fontWeight: 600, fontSize: 16, border: 'none'
                }}
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
