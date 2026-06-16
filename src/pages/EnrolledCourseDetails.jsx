import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Lock, CheckCircle, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EnrolledCourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [courseDetails, setCourseDetails] = useState(null);
  const [accessDetails, setAccessDetails] = useState(null);
  const [certificateStatus, setCertificateStatus] = useState('locked'); // 'locked', 'requested', 'approved'
  const [loading, setLoading] = useState(true);
  const [certMessage, setCertMessage] = useState('');
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch Course Details
        const courseRes = await fetch(`https://iscale-backend.onrender.com/api/enrolled-courses/course-full-details/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (courseRes.ok) {
          const courseData = await courseRes.json();
          if (courseData.status) {
            setCourseDetails(courseData.data);
          }
        }

        // Fetch Access Details
        const accessRes = await fetch(`https://iscale-backend.onrender.com/api/enrolled-courses/course-access-details/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (accessRes.ok) {
          const accessData = await accessRes.json();
          if (accessData.status) {
            setAccessDetails(accessData.data);
          }
        }

        // Fetch Certificate Status
        const certRes = await fetch(`https://iscale-backend.onrender.com/api/certificate/status/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (certRes.ok) {
          const certData = await certRes.json();
          if (certData.status && certData.data) {
            setCertificateStatus(certData.data.status || 'locked');
            if (certData.data.message) setCertMessage(certData.data.message);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleRequestCertificate = async () => {
    try {
      setRequesting(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`https://iscale-backend.onrender.com/api/certificate/request`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ course_id: id })
      });
      const data = await res.json();
      if (data.status) {
        alert('Certificate request submitted successfully!');
        setCertificateStatus('requested');
      } else {
        alert(data.message || 'Failed to request certificate.');
      }
    } catch (err) {
      alert('Server error.');
    } finally {
      setRequesting(false);
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://iscale-backend.onrender.com/api/certificate/download/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // If backend returns a JSON with a URL or direct blob
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (data.status && data.url) {
          window.open(data.url, '_blank');
        } else {
          alert('Certificate download link not available.');
        }
      } else {
        // Blob download fallback
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Certificate_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      alert('Failed to download certificate.');
    }
  };
  
  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading course details...</div>;
  }

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
        .action-button-dark:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35);
          background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%);
        }
        .action-button-dark:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
      `}</style>

      {/* Thin gradient strip at the top */}
      <div className="gradient-top-strip"></div>

      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Main Card */}
        <div className="content-card">
          <h2 style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>
            {courseDetails?.title || courseDetails?.name || 'My Courses'}
          </h2>
          
          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0 -40px 24px -40px' }}></div>
          
          {(accessDetails?.expiry_days || courseDetails?.expiry_days) ? (
            <h3 style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></span>
              Course Access Expires In: <span style={{ color: '#ef4444' }}>{accessDetails?.expiry_days || courseDetails?.expiry_days} days</span>
            </h3>
          ) : (
            <h3 style={{ color: 'var(--text-primary)', fontSize: '17px', fontWeight: '700', marginBottom: '24px' }}>
              Access Granted
            </h3>
          )}
          
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7', marginBottom: '50px', fontWeight: '500' }}>
            {courseDetails?.instructions || courseDetails?.description || 'Follow the links below to access your learning materials.'}
          </p>

          {/* Buttons Row */}
          <div className="buttons-row">
            {courseDetails?.android_link && (
              <button className="action-button-dark" onClick={() => window.open(courseDetails.android_link, '_blank')}>
                Android App Access <ArrowRight size={18} />
              </button>
            )}

            <button className="action-button-dark" onClick={() => navigate(`/enroll-course-details-list/${id}?type=2`)}>
              Web & IOS Access <ArrowRight size={18} />
            </button>
            
            {courseDetails?.live_link && (
              <button className="action-button-dark" onClick={() => window.open(courseDetails.live_link, '_blank')}>
                Live Classes <ArrowRight size={18} />
              </button>
            )}

            {courseDetails?.test_link && (
              <button className="action-button-dark" onClick={() => window.open(courseDetails.test_link, '_blank')}>
                Test Series <ArrowRight size={18} />
              </button>
            )}
          </div>
          
          {/* Certificate Section */}
          <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-secondary)' }}>Certificate Status</h4>
            
            {certificateStatus === 'approved' ? (
              <button 
                className="action-button-dark"
                style={{ background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)' }}
                onClick={handleDownloadCertificate}
              >
                Download Certificate <Download size={18} />
              </button>
            ) : certificateStatus === 'requested' ? (
              <button className="action-button-dark" style={{ background: '#e2e8f0', color: '#64748b' }} disabled>
                Certificate Requested (Pending Approval) <CheckCircle size={18} />
              </button>
            ) : (
              <button 
                className="action-button-dark"
                style={{ background: '#e2e8f0', color: '#64748b' }}
                disabled={requesting}
                onClick={handleRequestCertificate}
              >
                {requesting ? 'Requesting...' : 'Request Certificate'} <FileText size={18} />
              </button>
            )}

            {certMessage && (
              <span style={{ fontSize: '13px', color: certificateStatus === 'approved' ? '#16a34a' : '#ef4444', fontWeight: '500' }}>
                {certMessage}
              </span>
            )}
            
            {certificateStatus === 'locked' && !certMessage && (
              <span style={{ fontSize: '13px', color: '#ef4444', fontWeight: '500' }}>
                Complete the course progress to request your certificate.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseDetails;
