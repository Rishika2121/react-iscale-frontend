import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Download, Award } from 'lucide-react';

const EnrollCourseDetailsList = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [courseTitle, setCourseTitle] = useState('Course Title Loading...');
  const [category, setCategory] = useState('Foundation Courses');
  const [isCertificateApproved, setIsCertificateApproved] = useState(false); // TODO: Fetch from API
  
  useEffect(() => {
    // We would fetch course details here from API
    if (id) {
      // Create a readable title from the slug ID for now
      const formattedTitle = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setCourseTitle(formattedTitle);
    }
  }, [id]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Inter", sans-serif', animation: 'fadeSlideUp 0.4s ease-out' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .study-hero {
          background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #fce7f3 100%);
          padding: 60px 5%;
          position: relative;
        }
        .study-breadcrumb {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 24px;
          font-weight: 500;
        }
        .study-title {
          font-size: clamp(32px, 5vw, 46px);
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 20px 0;
          letter-spacing: -1px;
        }
        .study-meta {
          font-size: 18px;
          color: #334155;
          margin-bottom: 12px;
          font-weight: 500;
        }
        .progress-container {
          margin-top: 30px;
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 500px;
        }
        .progress-bar-bg {
          flex: 1;
          height: 10px;
          background-color: #e2e8f0;
          border-radius: 10px;
          position: relative;
        }
        .progress-bar-fill {
          height: 100%;
          background-color: #1e293b;
          border-radius: 10px;
          width: 3%;
          position: relative;
        }
        .progress-knob {
          position: absolute;
          right: -12px;
          top: -12px;
          background-color: #1e293b;
          color: white;
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 14px;
          font-weight: 700;
          border: 3px solid #e0e7ff;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 30px;
        }
        .progress-wrapper {
          flex: 1;
          min-width: 300px;
        }
        .certificate-btn {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
          width: auto;
        }
        @media (max-width: 768px) {
          .study-hero {
            padding: 40px 20px;
          }
          .progress-wrapper {
            min-width: 100%;
          }
          .certificate-btn {
            width: 100%;
            justify-content: center;
          }
        }
        @media (min-width: 1400px) {
          .study-hero {
            padding: 80px 10%;
          }
          .study-title {
            font-size: 56px;
          }
          .study-meta {
            font-size: 20px;
          }
        }
      `}</style>
      
      {/* Gradient Hero Section */}
      <div className="study-hero">
        <div className="study-breadcrumb">
          Home &gt; {category}
        </div>
        
        <h1 className="study-title">
          {courseTitle}
        </h1>
        
        <div className="study-meta">
          <strong>Subject:</strong> null
        </div>
        
        <div className="study-meta" style={{ color: '#64748b' }}>
          Topic: Workflow Prepare
        </div>
        
        <div className="hero-actions">
          <div className="progress-container progress-wrapper">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '3%' }}>
                <div className="progress-knob">3%</div>
              </div>
            </div>
          </div>
          
          {isCertificateApproved && (
            <button 
              className="certificate-btn"
              onClick={() => alert('Downloading certificate...')}
            >
              <Award size={20} /> Download Official Certificate
            </button>
          )}
        </div>
      </div>
      
      {/* Content Section Placeholder */}
      <div style={{ padding: '40px 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          border: '1px dashed var(--border-color)', 
          borderRadius: '12px', 
          padding: '60px 20px', 
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <h2>Curriculum & Video Player Area</h2>
          <p>This section will be populated with the course modules and content once the API is integrated.</p>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseDetailsList;
