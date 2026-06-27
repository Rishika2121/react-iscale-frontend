import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
  Search,
  Bell,
  Menu,
  X,
  FileText,
  Heart,
  Briefcase
} from 'lucide-react';

import iscaleLogo from '../assets/images/iscale-logo-v3.png';

const MegaDropdown = ({ type, isOpen, onClose, setCurrentPage, categories }) => {
  const [activeCategory, setActiveCategory] = useState(
    type === 'cohort' ? 'Cohort Courses' : 'All Courses'
  );

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
    <div className="mega-dropdown-overlay" onMouseLeave={onClose} onClick={onClose}>
      <div className="mega-dropdown-inner-bg" onClick={e => e.stopPropagation()}>
        <div className="container-fluid mega-dropdown-content" style={{ padding: '24px' }}>
          <div className={type === 'cohort' ? 'mega-grid-cohort' : 'mega-grid-all'}>
            {/* Left Column: Categories List (Only for All Courses) */}
            {type !== 'cohort' && (
              <div className="mega-dropdown-categories">
                {activeCategories.map(cat => (
                  <div
                    key={cat}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={`category-item ${activeCategory === cat ? 'active' : ''}`}
                  >
                    <span>{cat}</span>
                    <ChevronRight size={16} />
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
                    <span>6 Months</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                <span onClick={() => { setCurrentPage('explore-courses'); onClose(); }} style={{ fontSize: 13, textDecoration: 'underline', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}>View All Courses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldLogo = ({ onClick }) => (
  <div onClick={onClick} className="logo-container" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
    <img src={iscaleLogo} alt="iSCALE Logo" style={{ height: 'var(--logo-height, 52px)', objectFit: 'contain' }} className="responsive-logo" />
  </div>
);

const DashboardLayout = ({ children, activeTab, setCurrentPage, theme, toggleTheme }) => {
  const [user, setUser] = useState({ name: 'User' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [dbCourses, setDbCourses] = useState([]);

  const categoriesMap = {
    'All Courses': [],
    'Data Science Courses': [],
    'AI Courses': [],
    'Data Analyst Courses': [],
    'Foundation Courses': [],
    'Cohort Courses': [],
    'Free Category': []
  };

  dbCourses.forEach((c) => {
    const catName = c.category && c.category !== 'N/A' ? c.category : 'Foundation Courses';
    const courseItem = { name: c.title, path: c._id };
    if (!categoriesMap[catName]) {
      categoriesMap[catName] = [];
    }
    categoriesMap[catName].push(courseItem);
    categoriesMap['All Courses'].push(courseItem);
  });

  const coursesRef = useRef(null);
  const moreRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.data)) {
            setDbCourses(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch courses for layout dropdown:", err);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coursesRef.current && !coursesRef.current.contains(event.target)) {
        setCoursesDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        
        /* Responsive Logo */
        :root {
          --logo-height: 52px;
        }
        .responsive-logo {
          max-width: 100%;
          transition: all 0.2s ease;
        }
        @media (max-width: 1024px) {
          :root {
            --logo-height: 44px;
          }
        }
        @media (max-width: 768px) {
          :root {
            --logo-height: 38px;
          }
        }
        @media (max-width: 480px) {
          :root {
            --logo-height: 32px;
          }
        }
        .db-header {
          position: sticky;
          top: 0;
          z-index: 9999 !important;
          background: var(--nav-bg);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: visible !important;
        }
        .db-header-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: visible !important;
        }
        .db-nav-left {
          display: flex;
          align-items: center;
          gap: 20px;
          overflow: visible !important;
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
          font-size: 17px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .db-nav-link:hover {
          color: #2563eb;
        }
        .db-nav-link.active {
          color: var(--red);
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
          overflow: visible !important;
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
          position: sticky;
          top: 30px;
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
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%);
          color: var(--red);
          font-weight: 600;
          border-right: 4px solid var(--red);
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
        .db-custom-dropdown {
          position: absolute !important;
          display: block !important;
          background: var(--dropdown-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          box-shadow: var(--card-shadow);
          padding: 8px;
          z-index: 100000 !important;
        }

        /* Mega Dropdown CSS */
        .mega-dropdown-overlay {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 100000 !important;
          animation: navFadeIn 0.2s forwards;
          cursor: default;
        }
        .mega-dropdown-inner-bg {
          background: var(--bg-primary);
          width: 100%;
          max-width: 1060px;
          margin-left: 4%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          border: 1px solid var(--border-color);
          border-top: none;
          border-radius: 0 0 12px 12px;
          overflow: hidden;
          animation: navSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes navFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mega-dropdown-content {
          display: grid;
          min-height: 380px;
          padding: 32px 24px;
          gap: 32px;
          flex: 1;
          overflow-y: auto;
        }
        .mega-grid-all {
          display: grid;
          grid-template-columns: 320px 1fr;
        }
        .mega-grid-cohort {
          display: grid;
          grid-template-columns: 1fr;
        }
        .mega-dropdown-categories {
          border-right: 1px solid var(--border-color);
          padding-right: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .category-item {
          padding: 14px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .category-item:hover, .category-item.active {
          color: var(--red);
          background: rgba(239, 68, 68, 0.08);
        }
        .mega-dropdown-courses {
          padding: 0 18px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: left;
        }
        .courses-grid-header h3 {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .courses-grid-header p {
          font-size: 14px;
          color: var(--text-muted);
        }
        .courses-list-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .course-link-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 24px;
          min-height: 120px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 16px;
          text-align: left;
        }
        .course-link-card:hover {
          border-color: rgba(0,0,0,0.1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .course-link-card h4 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.4;
        }
        .course-link-card span {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
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
            padding: 80px 10px 16px; 
            gap: 16px; 
            flex-direction: column;
            width: 100%;
            max-width: 100vw;
            overflow-x: hidden;
            box-sizing: border-box;
          }
          .sidebar {
            position: fixed; left: -320px; top: 0; bottom: 0; z-index: 1000;
            transition: left 0.3s ease; box-shadow: 4px 0 20px rgba(0,0,0,0.1);
            background: var(--bg-primary) !important;
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
            {/* Hamburger menu hidden entirely as we are moving to a bottom nav for mobile */}
            <button 
              style={{ display: 'none' }}
              className="md-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <ShieldLogo onClick={() => setCurrentPage('home')} />

            <div style={{ position: 'relative', marginLeft: 8 }}>
              <button
                onClick={() => {
                  setCoursesDropdownOpen(!coursesDropdownOpen);
                  setMoreDropdownOpen(false);
                  setNotificationsOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="courses-trigger-btn"
              >
                <span>▦ Courses</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <nav className="db-nav-center">
            <button onClick={() => setCurrentPage('home')} className="db-nav-link">Home</button>
            <button onClick={() => navigateToTab('explore-courses')} className={`db-nav-link ${activeTab === 'explore-courses' ? 'active' : ''}`}>Explore Courses</button>
            <button onClick={() => setCurrentPage('cohort-courses')} className="db-nav-link" style={{ color: '#2563eb' }}>
              Cohort Courses
              <span className="cohort-badge">New</span>
            </button>
            <div ref={moreRef} style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setMoreDropdownOpen(!moreDropdownOpen);
                  setCoursesDropdownOpen(false);
                  setNotificationsOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="db-nav-link more-trigger-btn"
              >
                More <ChevronDown size={14} />
              </button>
              {moreDropdownOpen && (
                <div className="db-custom-dropdown" style={{ top: '100%', right: 0, minWidth: 180, marginTop: 8, zIndex: 110, background: 'var(--dropdown-bg, #ffffff)', border: '1px solid var(--border-color, #e2e8f0)' }}>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('events'); }} className="dropdown-item">Events</button>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('success-story'); }} className="dropdown-item">Success Stories</button>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('student-testimonials'); }} className="dropdown-item">Testimonials</button>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('job-updates'); }} className="dropdown-item">Job Updates</button>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('placement-talks'); }} className="dropdown-item">Placement Talks</button>
                  <button onClick={() => { setMoreDropdownOpen(false); setCurrentPage('verify-certificate'); }} className="dropdown-item">Verify Certificate</button>
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

            <div ref={notificationsRef} style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setCoursesDropdownOpen(false);
                  setMoreDropdownOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="notifications-trigger-btn"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <Bell size={18} />
                {notifications.some(n => !n.read) && <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, background: '#2563eb', borderRadius: '50%' }} />}
              </button>
              {notificationsOpen && (
                <div className="db-custom-dropdown" style={{ top: '100%', right: 0, width: 280, marginTop: 8, padding: 12, zIndex: 110, background: 'var(--dropdown-bg, #ffffff)', border: '1px solid var(--border-color, #e2e8f0)' }}>
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

            <div ref={profileRef} style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setCoursesDropdownOpen(false);
                  setMoreDropdownOpen(false);
                  setNotificationsOpen(false);
                }}
                className="header-profile-trigger"
              >
                <div className="header-profile-icon"><User size={16} /></div>
                <span className="profile-name-text" style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{getDisplayFullName(user)}</span>
                <ChevronDown className="profile-name-text" size={14} style={{ color: 'var(--text-secondary)' }} />
              </button>
              {profileDropdownOpen && (
                <div className="db-custom-dropdown" style={{ top: '100%', right: 0, minWidth: 180, marginTop: 8, zIndex: 110, background: 'var(--dropdown-bg, #ffffff)', border: '1px solid var(--border-color, #e2e8f0)' }}>
                  <button onClick={() => { setProfileDropdownOpen(false); navigateToTab('my-profile'); }} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><User size={14} /> My Profile</button>
                  <button onClick={() => { setProfileDropdownOpen(false); navigateToTab('settings'); }} className="dropdown-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><SettingsIcon size={14} /> Settings</button>
                  <div style={{ height: 1, background: 'var(--border-color)', margin: '4px 0' }} />
                  <button onClick={() => { setProfileDropdownOpen(false); handleLogout(); }} className="dropdown-item dropdown-item-danger" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><LogOut size={14} /> Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <MegaDropdown 
          type="all"
          isOpen={coursesDropdownOpen} 
          onClose={() => setCoursesDropdownOpen(false)} 
          setCurrentPage={(page) => {
            setCurrentPage(page);
          }}
          categories={categoriesMap}
        />
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

      {/* Mobile Top Navigation */}
      <style dangerouslySetInnerHTML={{__html: `
        .mobile-top-nav {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-top-nav {
            display: flex;
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: var(--nav-bg);
            border-bottom: 1px solid var(--border-color);
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            z-index: 40;
            justify-content: space-around;
            align-items: center;
            height: 64px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
          .top-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            color: var(--text-secondary);
            font-size: 10px;
            font-weight: 500;
            background: none;
            border: none;
            flex: 1;
            height: 100%;
            cursor: pointer;
          }
          .top-nav-item.active {
          color: var(--red);
          font-weight: 700;
          }
          /* Remove the padding from previous bottom nav */
          .dashboard-container {
            padding-bottom: 0;
          }
        }
      `}} />
      <div className="mobile-top-nav">
        <button onClick={() => setCurrentPage('home')} className="top-nav-item">
          <Home size={22} />
          <span>Home</span>
        </button>
        <button onClick={() => navigateToTab('dashboard')} className={`top-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
          <User size={22} />
          <span>Dashboard</span>
        </button>
        <button onClick={() => navigateToTab('explore-courses')} className={`top-nav-item ${activeTab === 'explore-courses' ? 'active' : ''}`}>
          <Compass size={22} />
          <span>Courses</span>
        </button>
        <button onClick={() => setMobileMenuOpen(true)} className={`top-nav-item ${mobileMenuOpen ? 'active' : ''}`}>
          <Menu size={22} />
          <span>More</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
