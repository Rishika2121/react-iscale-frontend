import React, { useState, useEffect } from 'react';
import {
  Home,
  User,
  Compass,
  BookOpen,
  Calendar,
  Award,
  Settings as SettingsIcon,
  LogOut,
  ChevronDown,
  Search,
  Bell,
  Menu,
  X,
  FileText,
  Heart
} from 'lucide-react';


const ShieldLogo = ({ onClick }) => (
  <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
    <svg width="38" height="42" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0L10 20V55C10 77.2 27.2 97.4 50 105C72.8 97.4 90 77.2 90 55V20L50 0Z" fill="#2563eb" />
      <path d="M50 8L18 24V55C18 73.2 31.8 89.8 50 96.5C68.2 89.8 82 73.2 82 55V24L50 8Z" fill="#2563eb" stroke="white" strokeWidth="4" />
      <text x="50" y="68" fill="white" fontSize="45" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">I</text>
    </svg>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{ fontSize: 9, textTransform: 'uppercase', color: '#666', letterSpacing: 1.5, fontWeight: 700 }}>The</span>
      <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 22, color: '#2563eb', letterSpacing: '-0.5px' }}>iSCALE</span>
    </div>
  </div>
);

const DashboardLayout = ({ children, activeTab, setCurrentPage, theme, toggleTheme }) => {
  const [user, setUser] = useState({ name: 'User' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getDisplayFullName = (value) => {
    const resolved = value?.name || value?.fullName || value?.firstName || value?.fname || value?.first_name || value?.username || value?.userName || value?.c_first_name || value?.m_first_name || value?.displayName;
    
    if (!resolved || resolved === 'User') {
      if (value?.email) return String(value.email).split('@')[0];
      return 'Profile';
    }
    
    return String(resolved).trim() || 'Profile';
  };
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to iSCALE!', message: 'Start exploring courses to boost your career.', time: '2 hours ago', read: false },
    { id: 2, title: 'Upcoming Live Webinar', message: 'Figma to Code Masterclass starts tomorrow at 6 PM.', time: '1 day ago', read: true }
  ]);

  useEffect(() => {
    // Attempt to load user from local storage or API simulation
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) { }
    } else {
      // Mock user for now if missing
      setUser({ name: 'Ridhi Mishra' });
    }

    // Fetch latest profile from API to ensure we have the real name
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://iscale-backend.onrender.com/api/myprofile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(result => {
          if (result.status && result.data) {
            const data = result.data;
            const fetchedName = data.firstName || data.fname || data.c_first_name || data.name || data.fullName;
            if (fetchedName) {
               setUser(prev => {
                 const updatedUser = { ...prev, ...data, name: fetchedName, firstName: fetchedName };
                 localStorage.setItem('user', JSON.stringify(updatedUser));
                 return updatedUser;
               });
            }
          }
        })
        .catch(err => console.error("Failed to fetch user profile", err));
    }
    
    // Listen for real-time profile updates from the MyProfile component
    const handleProfileUpdate = () => {
      const updatedUserStr = localStorage.getItem('user');
      if (updatedUserStr) {
        try {
          setUser(JSON.parse(updatedUserStr));
        } catch (e) {}
      }
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  const navigateToTab = (tab) => {
    setCurrentPage(tab);
    setMobileMenuOpen(false);
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="dashboard-container">
      <style dangerouslySetInnerHTML={{__html: `
        .dashboard-container {
          min-height: 100vh;
          background: var(--bg-gradient);
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          color: var(--text-primary);
        }
        .db-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--nav-bg);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .db-header-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .db-nav-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .courses-trigger-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
        }
        .courses-trigger-btn:hover {
          background: var(--border-color);
        }
        .db-nav-center {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .db-nav-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 15px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .db-nav-link:hover {
          color: #2563eb;
        }
        .db-nav-link.active {
          color: #2563eb;
          font-weight: 600;
        }
        .cohort-badge {
          background: #2563eb;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          padding: 2px 5px;
          border-radius: 4px;
          margin-left: 4px;
          text-transform: uppercase;
        }
        .db-nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .header-profile-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          cursor: pointer;
          background: none;
          transition: all 0.2s;
          color: var(--text-primary);
        }
        .header-profile-trigger:hover {
          background: var(--bg-secondary);
        }
        .header-profile-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          border: 1.5px solid var(--border-color);
        }
        
        .main-layout {
          display: flex;
          flex: 1;
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          padding: 30px 24px;
          gap: 30px;
        }
        .sidebar {
          width: 320px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          border-radius: 12px;
          box-sizing: border-box;
          height: fit-content;
          transition: all 0.3s ease;
        }
        .sidebar.light-mode {
          background: #eff6ff;
          border: 1px solid #dbeafe;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.03);
        }
        .sidebar.dark-mode {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .sidebar-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          padding: 28px 16px;
          background: none;
          border: none;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 16px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar-btn.no-border {
          border-bottom: none;
        }
        .sidebar-btn:hover {
          background: var(--bg-secondary);
          color: var(--text-primary);
          transform: translateX(4px);
        }
        .sidebar-btn.active {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          font-weight: 600;
          border-radius: 8px;
        }
        .sidebar-section-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 32px 16px 8px;
          letter-spacing: 1.5px;
        }
        .sidebar-btn svg {
          stroke-width: 1.5;
        }

        .content-area {
          flex: 1;
          background: transparent;
          min-width: 0;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
        }
        
        /* Dropdowns */
        .dropdown-menu {
          position: absolute;
          background: var(--dropdown-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          box-shadow: var(--card-shadow);
          padding: 8px;
          z-index: 100;
        }
        .dropdown-item {
          display: block;
          width: 100%;
          padding: 10px 14px;
          text-align: left;
          background: none;
          border: none;
          font-size: 14px;
          color: var(--text-secondary);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .dropdown-item:hover {
          background: var(--bg-secondary);
          color: var(--red);
        }
        .dropdown-item-danger {
          color: #ef4444;
        }
        .dropdown-item-danger:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }
        
        /* Footer */
        .db-footer {
          background: #0B0E14;
          color: #94A3B8;
          padding: 60px 0 30px;
          border-top: 1px solid #1E293B;
        }
        .footer-grid {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 2fr 1.2fr 1.2fr 1.6fr;
          gap: 48px;
        }
        .footer-heading {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
          font-family: 'Poppins', sans-serif;
        }
        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-link-btn {
          background: none;
          border: none;
          color: #94A3B8;
          font-size: 14px;
          text-align: left;
          padding: 0;
          cursor: pointer;
          transition: color 0.2s;
        }
        .footer-link-btn:hover {
          color: #2563eb;
        }
        .social-icons-row {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .social-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1E293B;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-size: 14px;
        }
        .social-circle-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }
        
        @media (max-width: 1024px) {
          .db-nav-center { display: none; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 768px) {
          .main-layout { 
            padding: 16px 10px; 
            gap: 16px; 
            flex-direction: column;
            width: 100%;
            max-width: 100vw;
            overflow-x: hidden;
            box-sizing: border-box;
          }
          .sidebar {
            position: absolute; left: -260px; top: 0; bottom: 0; z-index: 1000;
            transition: left 0.3s ease; box-shadow: 4px 0 20px rgba(0,0,0,0.1);
          }
          .sidebar.open { left: 0; }
          .stats-grid { grid-template-columns: 1fr; gap: 16px; }
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
          .db-header-inner { padding: 0 12px; gap: 8px; }
          .courses-trigger-btn { display: none !important; }
          .profile-name-text { display: none !important; }
          .header-profile-trigger { padding: 4px; border: none; }
          .header-profile-icon { width: 36px; height: 36px; }
          .db-nav-left { gap: 8px; }
          .db-nav-right { gap: 8px; }
        }
      `}} />

      <header className="db-header">
        <div className="db-header-inner">
          <div className="db-nav-left">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', padding: 4 }}
              className="md-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <style dangerouslySetInnerHTML={{__html: `@media (max-width: 768px) { .md-menu-toggle-btn { display: block !important; } }`}} />

            <ShieldLogo onClick={() => setCurrentPage('home')} />

            <div style={{ position: 'relative', marginLeft: 8 }}>
              <button onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)} className="courses-trigger-btn">
                <span>▦ Courses</span>
                <ChevronDown size={14} />
              </button>
              {coursesDropdownOpen && (
                <div className="dropdown-menu" style={{ top: '100%', left: 0, minWidth: 220, marginTop: 8 }}>
                  {['Data Science & ML', 'Full Stack Developer', 'Generative AI', 'Business Analytics', 'Digital Marketing'].map((course, idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCoursesDropdownOpen(false);
                          navigateToTab('explore-courses');
                        }}
                        className="dropdown-item"
                      >
                        {course}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <nav className="db-nav-center">
            <button onClick={() => setCurrentPage('home')} className="db-nav-link">Home</button>
            <button onClick={() => navigateToTab('explore-courses')} className={`db-nav-link ${activeTab === 'explore-courses' ? 'active' : ''}`}>Explore Courses</button>
            <button onClick={() => setCurrentPage('cohort-courses')} className="db-nav-link" style={{ color: '#2563eb' }}>
              Cohort Courses
              <span className="cohort-badge">New</span>
            </button>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setMoreDropdownOpen(!moreDropdownOpen)} className="db-nav-link">
                More <ChevronDown size={14} />
              </button>
              {moreDropdownOpen && (
                <div className="dropdown-menu" style={{ top: '100%', right: 0, minWidth: 180, marginTop: 8 }}>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('job-updates'); }} className="dropdown-item">Job Updates</button>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('success-story'); }} className="dropdown-item">Success Stories</button>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('placement-talks'); }} className="dropdown-item">Placement Talks</button>
                </div>
              )}
            </div>
          </nav>

          <div className="db-nav-right">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="db-search-wrapper">
              <input type="text" placeholder="Search your courses..." style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px 12px 8px 36px', fontSize: 13, width: 200, outline: 'none', transition: 'width 0.2s' }} onFocus={e => e.target.style.width = '240px'} onBlur={e => e.target.style.width = '200px'} />
              <Search size={14} style={{ position: 'absolute', left: 12, color: '#94a3b8' }} />
            </div>
            <style dangerouslySetInnerHTML={{__html: `@media (max-width: 640px) { .db-search-wrapper { display: none !important; } }`}} />

            <div style={{ position: 'relative' }}>
              <button onClick={() => setNotificationsOpen(!notificationsOpen)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}>
                <Bell size={18} />
                {notifications.some(n => !n.read) && <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, background: '#2563eb', borderRadius: '50%' }} />}
              </button>
              {notificationsOpen && (
                <div className="dropdown-menu" style={{ top: '100%', right: 0, width: 280, marginTop: 8, padding: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderBottom: '1px solid var(--border-color)', paddingBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>Notifications</span>
                    <button onClick={markAllNotificationsRead} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>Mark read</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 220, overflowY: 'auto' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ padding: 6, borderRadius: 6, background: n.read ? 'var(--card-bg)' : 'rgba(37,99,235,0.08)', borderLeft: n.read ? '2px solid var(--border-color)' : '2px solid #2563eb' }}>
                        <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-primary)' }}>{n.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 4px' }}>{n.message}</div>
                        <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <div style={{ position: 'relative' }}>
              <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="header-profile-trigger">
                <div className="header-profile-icon"><User size={16} /></div>
                <span className="profile-name-text" style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{getDisplayFullName(user)}</span>
                <ChevronDown className="profile-name-text" size={14} style={{ color: 'var(--text-secondary)' }} />
              </button>
              {profileDropdownOpen && (
                <div className="dropdown-menu" style={{ top: '100%', right: 0, minWidth: 180, marginTop: 8 }}>
                  <button onClick={() => { setProfileDropdownOpen(false); navigateToTab('my-profile'); }} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><User size={14} /> My Profile</button>
                  <button onClick={() => { setProfileDropdownOpen(false); navigateToTab('settings'); }} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><SettingsIcon size={14} /> Settings</button>
                  <div style={{ height: 1, background: 'var(--border-color)', margin: '4px 0' }} />
                  <button onClick={() => { setProfileDropdownOpen(false); handleLogout(); }} className="dropdown-item dropdown-item-danger" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><LogOut size={14} /> Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''} ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
          <button onClick={() => navigateToTab('dashboard')} className={`sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <Home size={20} /><span>Dashboard</span>
          </button>
          <button onClick={() => navigateToTab('my-profile')} className={`sidebar-btn ${activeTab === 'my-profile' ? 'active' : ''}`}>
            <User size={20} /><span>My Profile</span>
          </button>
          <button onClick={() => navigateToTab('explore-courses')} className={`sidebar-btn ${activeTab === 'explore-courses' ? 'active' : ''}`}>
            <Compass size={20} /><span>Explore Courses</span>
          </button>
          <button onClick={() => navigateToTab('enrolled-courses')} className={`sidebar-btn ${activeTab === 'enrolled-courses' ? 'active' : ''}`}>
            <BookOpen size={20} /><span>Enrolled Courses</span>
          </button>
          <button onClick={() => navigateToTab('enrolled-events')} className={`sidebar-btn ${activeTab === 'enrolled-events' ? 'active' : ''}`}>
            <Calendar size={20} /><span>Enrolled Events</span>
          </button>
          <button onClick={() => navigateToTab('test-series-result')} className={`sidebar-btn no-border ${activeTab === 'test-series-result' ? 'active' : ''}`}>
            <Award size={20} /><span>Test Series Result</span>
          </button>
          
          <div className="sidebar-section-title">Tests & Notes</div>
          
          <button onClick={() => navigateToTab('test-packages')} className={`sidebar-btn ${activeTab === 'test-packages' ? 'active' : ''}`}>
            <BookOpen size={20} /><span>Test Packages</span>
          </button>
          <button onClick={() => navigateToTab('my-notes')} className={`sidebar-btn ${activeTab === 'my-notes' ? 'active' : ''}`}>
            <FileText size={20} /><span>My Notes</span>
          </button>
          <button onClick={() => navigateToTab('wishlist')} className={`sidebar-btn ${activeTab === 'wishlist' ? 'active' : ''}`}>
            <Heart size={20} /><span>My Wishlist</span>
          </button>
          
          <div className="sidebar-section-title">User</div>
          
          <button onClick={() => navigateToTab('settings')} className={`sidebar-btn ${activeTab === 'settings' ? 'active' : ''}`}>
            <SettingsIcon size={20} /><span>Settings</span>
          </button>
          <button onClick={handleLogout} className="sidebar-btn no-border" style={{ color: '#ef4444' }}>
            <LogOut size={20} /><span>Logout</span>
          </button>
        </aside>

        {mobileMenuOpen && (
          <div onClick={() => setMobileMenuOpen(false)} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.3)', zIndex: 90 }} />
        )}

        <div className="content-area">
          {children}
        </div>
      </div>

      <footer className="db-footer">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <ShieldLogo onClick={() => {}} />
            </div>
            <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6, marginBottom: 20 }}>Mastering Skills, Scaling Success.</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" height="40" style={{ cursor: 'pointer' }} />
          </div>
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links-list">
              <li><button className="footer-link-btn" onClick={() => setCurrentPage('home')}>About Us</button></li>
              <li><button className="footer-link-btn">Our Clients</button></li>
              <li><button className="footer-link-btn">Allied Colleges</button></li>
              <li><button className="footer-link-btn" onClick={() => setCurrentPage('hire-with-us')}>Hire with Us</button></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Helpful Links</h3>
            <ul className="footer-links-list">
              <li><button className="footer-link-btn">Contact Us</button></li>
              <li><button className="footer-link-btn">Terms & Conditions</button></li>
              <li><button className="footer-link-btn">Privacy Policy</button></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Reach Us Out</h3>
            <ul className="footer-links-list" style={{ gap: 16 }}>
              <li style={{ fontSize: 14, display: 'flex', gap: 8 }}><span style={{ color: '#2563eb' }}>Phone:</span> +91 7880113112</li>
              <li style={{ fontSize: 14, display: 'flex', gap: 8 }}><span style={{ color: '#2563eb' }}>Whatsapp:</span> +91 7880113112</li>
              <li style={{ fontSize: 14, display: 'flex', gap: 8 }}><span style={{ color: '#2563eb' }}>E-mail:</span> contact@theiscale.com | info@theiscale.com</li>
              <li style={{ fontSize: 14, display: 'flex', gap: 8, lineHeight: 1.5 }}><span style={{ color: '#2563eb' }}>Working Location:</span> Bangalore || Chhattisgarh</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
