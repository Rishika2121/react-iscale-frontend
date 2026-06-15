import React, { useState } from 'react';
import { ArrowRight, Download, Lock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EnrolledCourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // TODO: Replace with actual API data for certificate approval status
  const [isCertificateApproved, setIsCertificateApproved] = useState(false);
  
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', padding: '0', fontFamily: '"Inter", sans-serif', animation: 'fadeSlideUp 0.4s ease-out' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gradient-top-strip {
          height: 12px;
          background: linear-gradient(to right, #93c5fd, #c4b5fd, #c7d2fe);
          width: 100%;
        }
        .action-button-dark {
          background: linear-gradient(135deg, #991b1b 0%, #dc2626 100%);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 260px;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .action-button-dark:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35);
          background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%);
        }
        .content-card {
          background-color: var(--card-bg);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          padding: 40px;
          margin-bottom: 24px;
        }
        .buttons-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .content-card {
            padding: 24px 20px;
          }
          .action-button-dark {
            width: 100%;
            min-width: 100%;
          }
          .buttons-row {
            gap: 20px;
            flex-direction: column;
          }
        }
        @media (min-width: 1400px) {
          .content-card {
            padding: 50px;
          }
          .action-button-dark {
            min-width: 300px;
            padding: 16px 32px;
            font-size: 16px;
          }
        }
      `}</style>

      {/* Thin gradient strip at the top as shown in image */}
      <div className="gradient-top-strip"></div>

      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Main Card */}
        <div className="content-card">
          <h2 style={{ 
            color: 'var(--text-primary)', 
            fontSize: '20px', 
            fontWeight: '800', 
            marginBottom: '24px'
          }}>
            My Courses
          </h2>
          
          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0 -40px 24px -40px' }}></div>
          
          <h3 style={{ 
            color: 'var(--text-primary)', 
            fontSize: '17px', 
            fontWeight: '700',
            marginBottom: '24px'
          }}>
            Your Course is expiring after <span style={{ color: '#ef4444' }}>24 days</span>
          </h3>
          
          <p style={{ 
            color: '#94a3b8', 
            fontSize: '15px', 
            lineHeight: '1.7',
            marginBottom: '50px',
            fontWeight: '500'
          }}>
            No Instruction Mentioned Here...
          </p>

          {/* Buttons Row */}
          <div className="buttons-row">
            <button className="action-button-dark" onClick={() => navigate('/cohort-courses')}>
              Android App Access <ArrowRight size={18} />
            </button>

            <button className="action-button-dark" onClick={() => navigate(`/enroll-course-details-list/${id}?type=2`)}>
              Web & IOS Access <ArrowRight size={18} />
            </button>
            
            <button className="action-button-dark" onClick={() => navigate('/cohort-courses')}>
              Live Classes <ArrowRight size={18} />
            </button>

            <button className="action-button-dark" onClick={() => navigate('/cohort-courses')}>
              Test Series <ArrowRight size={18} />
            </button>
          </div>
          
          {/* Certificate Section */}
          <div style={{ 
            marginTop: '40px', 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '30px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-secondary)' }}>Certificate Status</h4>
            <button 
              className="action-button-dark"
              style={{
                background: isCertificateApproved ? 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' : '#e2e8f0',
                color: isCertificateApproved ? 'white' : '#64748b',
                boxShadow: isCertificateApproved ? '0 4px 12px rgba(34, 197, 94, 0.2)' : 'none',
                cursor: isCertificateApproved ? 'pointer' : 'not-allowed'
              }}
              disabled={!isCertificateApproved}
              onClick={() => alert('Downloading certificate...')}
            >
              {isCertificateApproved ? (
                <>Download Certificate <Download size={18} /></>
              ) : (
                <>Certificate Locked (Pending Approval) <Lock size={18} /></>
              )}
            </button>
            {!isCertificateApproved && (
              <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: '500' }}>
                Complete the course and wait for admin approval to unlock.
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnrolledCourseDetails;
