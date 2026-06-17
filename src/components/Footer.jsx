import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, Globe, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, ChevronRight } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState({
    programs: false,
    freeCourses: false,
    quickLinks: false,
    support: false,
    seoTags: false
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    if (isMobile) {
      setOpenSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const handleCourseClick = (linkName) => {
    // Dynamic courses don't have static slugs anymore, so redirect to explore
    setCurrentPage('explore-courses');
  };

  const handleQuickLink = (link) => {
    const pageMap = {
      'Home': 'home',
      'Explore Courses': 'explore-courses',
      'Events': 'events',
      'About Us': 'about-us',
      'Contact': 'contact',
      'FAQ': 'faq',
      'Privacy Policy': 'about-us',
      'Terms of Service': 'about-us',
      'Refund Policy': 'about-us',
      'Community': 'about-us',
      'Verify Certificate': 'verify-certificate'
    };
    const target = pageMap[link] || 'home';
    setCurrentPage(target);
  };

  const isSectionVisible = (section) => {
    return !isMobile || openSections[section];
  };

  return (
    <footer style={{ background: '#090a10', color: '#fff', padding: '80px 0 32px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-grid {
          display: grid;
          grid-template-columns: 2.2fr 1.2fr 1.2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }
        .footer-link-btn {
          background: none;
          border: none;
          padding: 0;
          color: #94a3b8;
          font-size: 14px;
          text-align: left;
          transition: all 0.2s ease;
          cursor: pointer;
          font-family: var(--font-body);
        }
        .footer-link-btn:hover {
          color: var(--red);
          transform: translateX(4px);
        }
        .seo-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }
        .seo-tag {
          font-size: 11px;
          color: #64748b;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          padding: 6px 12px;
          border-radius: 100px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .seo-tag:hover {
          border-color: var(--red);
          color: var(--red);
          background: rgba(37,99,235,0.05);
        }
        .footer-header {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }
        .social-btn:hover {
          background: var(--red);
          border-color: var(--red);
          color: #fff;
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2fr 1.5fr 1.5fr;
            gap: 32px;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 0;
            margin-bottom: 24px;
          }
          .footer-col {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 16px 0;
          }
          .footer-header {
            margin-bottom: 0;
            cursor: pointer;
            user-select: none;
          }
          .footer-list {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out, padding 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .footer-list.open {
            max-height: 300px;
            padding-top: 16px;
            padding-bottom: 8px;
          }
          .seo-section {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding: 16px 0;
          }
        }
      `}} />
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Address Column */}
          <div className="footer-col" style={{ paddingBottom: isMobile ? '24px' : '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, background: 'var(--red)', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>i</span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: -0.5, color: '#fff' }}>
                <span style={{ color: 'var(--red)' }}>i</span>SCALE
              </span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14, marginBottom: 24, maxWidth: 320 }}>
              India's Trusted Upskilling & E-Learning Platform for Future Readiness. Democratizing premium quality tech education with complete affordability.
            </p>
            
            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#94a3b8' }}>
                <MapPin size={16} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
                <span><strong>Office:</strong> 2nd Floor, Startup Incubation Centre, Tech Hub, Sector-62, Noida, UP - 201301</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#94a3b8' }}>
                <Mail size={16} color="var(--red)" />
                <span>support@theiscale.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[<Facebook size={16} />, <Twitter size={16} />, <Linkedin size={16} />, <Instagram size={16} />, <Youtube size={16} />].map((icon, i) => (
                <button key={i} className="social-btn">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Programs */}
          <div className="footer-col">
            <h4 className="footer-header" onClick={() => toggleSection('programs')}>
              Popular Programs
              {isMobile && (openSections.programs ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </h4>
            <ul className={`footer-list ${isMobile && openSections.programs ? 'open' : ''}`} style={{ listStyle: 'none', display: isSectionVisible('programs') ? 'flex' : 'none', flexDirection: 'column', gap: 12, padding: 0 }}>
              {[
                'Data Science with GenAI',
                'Data Analytics Program',
                'AI Cohort Course',
                'AI Engineer Advance',
                'Python with AI Tools',
                'Power BI & Tableau'
              ].map(link => (
                <li key={link}>
                  <button className="footer-link-btn" onClick={() => handleCourseClick(link)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ChevronRight size={14} color="var(--red)" /> {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Courses */}
          <div className="footer-col">
            <h4 className="footer-header" onClick={() => toggleSection('freeCourses')}>
              Free Courses
              {isMobile && (openSections.freeCourses ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </h4>
            <ul className={`footer-list ${isMobile && openSections.freeCourses ? 'open' : ''}`} style={{ listStyle: 'none', display: isSectionVisible('freeCourses') ? 'flex' : 'none', flexDirection: 'column', gap: 12, padding: 0 }}>
              {[
                'Free Data Science Course',
                'Free Data Analytics Course'
              ].map(link => (
                <li key={link}>
                  <button className="footer-link-btn" onClick={() => handleCourseClick(link)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ChevronRight size={14} color="var(--red)" /> {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-header" onClick={() => toggleSection('quickLinks')}>
              Quick Links
              {isMobile && (openSections.quickLinks ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </h4>
            <ul className={`footer-list ${isMobile && openSections.quickLinks ? 'open' : ''}`} style={{ listStyle: 'none', display: isSectionVisible('quickLinks') ? 'flex' : 'none', flexDirection: 'column', gap: 12, padding: 0 }}>
              {['Home', 'Explore Courses', 'Events', 'About Us', 'Contact', 'Verify Certificate'].map(link => (
                <li key={link}>
                  <button className="footer-link-btn" onClick={() => handleQuickLink(link)}>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col" style={{ borderBottom: isMobile ? 'none' : 'initial' }}>
            <h4 className="footer-header" onClick={() => toggleSection('support')}>
              Support
              {isMobile && (openSections.support ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </h4>
            <ul className={`footer-list ${isMobile && openSections.support ? 'open' : ''}`} style={{ listStyle: 'none', display: isSectionVisible('support') ? 'flex' : 'none', flexDirection: 'column', gap: 12, padding: 0 }}>
              {['FAQ', 'Privacy Policy', 'Terms of Service', 'Refund Policy', 'Community'].map(link => (
                <li key={link}>
                  <button className="footer-link-btn" onClick={() => handleQuickLink(link)}>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI SEO Tag Cloud section (wscubetech style) */}
        <div className="seo-section" style={{ marginTop: 24, textAlign: 'left' }}>
          <h5 className="footer-header" onClick={() => toggleSection('seoTags')} style={{ fontSize: 12, borderBottom: 'none', padding: 0 }}>
            <span>Popular Search Topics & Technologies</span>
            {isMobile && (openSections.seoTags ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </h5>
          {isSectionVisible('seoTags') && (
            <div className="seo-tags-container">
              {[
                'Data Science Course Online', 'Learn Machine Learning', 'AI Generative Course', 
                'Power BI Dashboard Training', 'Python Coder Bootcamp', 'Data Analytics Certificate', 
                'iScale Placement Stories', 'Live Mentorship Classes', 'MNC Placement Opportunities', 
                'Free Coding Classes YouTube', 'Tableau for Beginners', 'SQL Programming Tutorial',
                'Advanced Excel Dashboard', 'AI Cohort Batch 1 Admission', 'iScale Tech Internships',
                'Corporate Upskilling India', 'Non-tech to Coder Transition'
              ].map(tag => (
                <span key={tag} className="seo-tag" onClick={() => setCurrentPage('explore-courses')}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Contact info bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)', marginTop: 32, paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16
        }}>
          <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>
            © 2026 iScale Platform. All rights reserved. Registered trademark.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <span style={{ color: '#94a3b8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={13} color="var(--red)" /> +91-7880113112</span>
            <span style={{ color: '#94a3b8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={13} color="var(--red)" /> www.theiscale.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
