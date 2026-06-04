import React from 'react';
import { Home, LogIn, Calendar, PlayCircle, Eye, Award, ArrowRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './CohortPage.css';

const CohortPage = ({ setCurrentPage }) => {
  useReveal();

  return (
    <div className="cohort-container">
      <div className="cohort-content">
        
        {/* Top Navigation specific to Cohort */}
        <div className="cohort-nav reveal" style={{ transitionDelay: '50ms' }}>
          <button className="cohort-nav-btn" onClick={() => setCurrentPage('home')}>
            <Home size={16} /> Home
          </button>
          <button className="cohort-nav-btn cohort-login-btn" onClick={() => setCurrentPage('login')}>
            Login <LogIn size={16} />
          </button>
        </div>

        {/* Hero Header */}
        <div className="cohort-header reveal" style={{ transitionDelay: '150ms' }}>
          <div className="cohort-badge">
            <div className="cohort-badge-dot"></div>
            LIVE COHORT COURSES
          </div>
          
          <h1 className="cohort-title">
            Become The AI-Ready Professional <span className="cyan">The Next</span> <span className="pink">Decade Demands</span>
          </h1>
        </div>

        {/* Course Grid */}
        <div className="cohort-grid">
          <div className="cohort-card-wrapper reveal" style={{ transitionDelay: '300ms' }}>
            <div className="cohort-card">
              
              {/* Video Area */}
              <div className="cohort-card-img-container" style={{ aspectRatio: '16/9', overflow: 'hidden', padding: 0, border: 'none' }}>
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/_Ninr7_gjmM?autoplay=1&mute=1&loop=1&playlist=_Ninr7_gjmM&controls=0&showinfo=0&rel=0" 
                  title="AI COHORT 1.0 FOR EVERYONE" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  style={{ pointerEvents: 'none', transform: 'scale(1.2)' }}
                ></iframe>
              </div>

              {/* Glass Stats Bar */}
              <div className="cohort-stats">
                <div className="stat-item">
                  <Calendar size={18} className="stat-icon" />
                  <span className="stat-text">120 Days</span>
                </div>
                <div className="stat-item">
                  <PlayCircle size={18} className="stat-icon" />
                  <span className="stat-text">180 Lectures</span>
                </div>
                <div className="stat-item">
                  <Eye size={18} className="stat-icon" />
                  <span className="stat-text">1278 Views</span>
                </div>
                <div className="stat-item">
                  <Award size={18} className="stat-icon green" />
                  <span className="stat-text green">Certificate</span>
                </div>
              </div>

              {/* Info Area */}
              <div className="cohort-card-info">
                <h3 className="cohort-course-title">AI For Everyone : Complete Guide</h3>
                
                <div className="cohort-price-row">
                  <div className="cohort-price">Paid</div>
                  <div className="cohort-access-badge">COHORT ACCESS</div>
                </div>

                <button className="cohort-start-btn" onClick={() => setCurrentPage('course-details/ai-for-everyone-complete-guide')}>
                  START NOW
                  <div className="cohort-start-btn-icon">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CohortPage;
