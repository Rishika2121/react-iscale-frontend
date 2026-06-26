import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Download, Award, PlayCircle, FileText, CheckCircle, Video } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

const EnrollCourseDetailsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [courseTitle, setCourseTitle] = useState('Course Topics');
  const [category, setCategory] = useState('Enrolled Course');
  
  const [certificateStatus, setCertificateStatus] = useState('locked');
  const [requestingCert, setRequestingCert] = useState(false);
  const [certMessage, setCertMessage] = useState('');
  const [realCourseId, setRealCourseId] = useState(id);
  
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTopic, setActiveTopic] = useState(null);
  
  useEffect(() => {
    const resolveSlugAndFetch = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
           navigate('/login');
           return;
        }

        let realCourseId = id;
        // If id is not a 24-char hex string (MongoDB ID), it's likely a slug
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
          try {
            const allRes = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses?page=1&limit=1000');
            const allData = await allRes.json();
            if (allData.status && Array.isArray(allData.data)) {
              const matchedCourse = allData.data.find(c => c.slug === id || c._id === id);
              if (matchedCourse) {
                realCourseId = matchedCourse._id;
              }
            }
          } catch (err) {
            console.error("Resolve slug error:", err);
          }
        }
        // Fetch Course Details to get the actual Course Title from the database
        try {
          const courseRes = await fetch(`https://iscale-backend.onrender.com/api/course/public-get-course/${realCourseId}`);
          const courseData = await courseRes.json();
          if (courseData.status && courseData.data) {
            setCourseTitle(courseData.data.m_course_title || courseData.data.title || courseData.data.m_event_title || 'Course Topics');
            setCategory(courseData.data.m_course_category || courseData.data.category || 'Enrolled Course');
          }
        } catch (err) {
          console.error("Failed to fetch course details:", err);
        }

        setRealCourseId(realCourseId);

        // Fetch Certificate Status
        try {
          const certRes = await fetch(`https://iscale-backend.onrender.com/api/certificate/status/${realCourseId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (certRes.ok) {
            const certData = await certRes.json();
            if (certData.status && certData.data) {
              setCertificateStatus(certData.data.status || 'locked');
              if (certData.data.message) setCertMessage(certData.data.message);
            }
          }
        } catch (e) {
          console.error("Failed to fetch cert status:", e);
        }

        // Fetch subjects first, because topics belong to subjects, not directly to courses
        const subjectsRes = await fetch(`https://iscale-backend.onrender.com/api/subject/public-get-subjects/${realCourseId}`);
        const subjectsData = await subjectsRes.json();

        if (subjectsData.status && Array.isArray(subjectsData.data) && subjectsData.data.length > 0) {
          let allTopics = [];
          
          for (const subject of subjectsData.data) {
            try {
              const topicRes = await fetch(`https://iscale-backend.onrender.com/api/lecture-progress/lectures/${subject._id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              if (topicRes.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                return;
              }
              
              const topicData = await topicRes.json();
              const topicsArr = topicData.data?.docs || topicData.data || [];
              if (Array.isArray(topicsArr) && topicsArr.length > 0) {
                const topicsWithSubject = topicsArr.map(t => ({
                  ...t, 
                  title: t.title || t.m_topic_title || t.ml_title || t.name || 'Topic',
                  subjectTitle: subject.m_subject_title || subject.title,
                  // Ensure we extract the video ID properly regardless of what the backend named it
                  video_url: t.video_id || t.videoUrl || t.video || t.video_url || t.vdocipher_id || t.video_link || t.ml_video_id || t.url || t.link
                }));
                allTopics = [...allTopics, ...topicsWithSubject];
              }
            } catch (err) {
              console.error(`Failed to fetch topics for subject ${subject._id}:`, err);
            }
          }
          
          if (allTopics.length > 0) {
            setTopics(allTopics);
            setActiveTopic(allTopics[0]);
          } else {
            setError('No topics found for this module.');
          }
        } else {
          // If there are no subjects, there are no topics
          setError('No subjects or topics found for this course.');
        }
      } catch (err) {
        console.error('Failed to fetch topics:', err);
        setError('An error occurred while fetching topics.');
      } finally {
        setLoading(false);
      }
    };

    resolveSlugAndFetch();
  }, [id, navigate]);

  const handleRequestCertificate = async () => {
    try {
      setRequestingCert(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`https://iscale-backend.onrender.com/api/certificate/request`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ course_id: realCourseId })
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
      setRequestingCert(false);
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://iscale-backend.onrender.com/api/certificate/download/${realCourseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
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
        a.download = `Certificate_${realCourseId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      alert('Failed to download certificate.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Inter", sans-serif', animation: 'fadeSlideUp 0.4s ease-out' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .study-hero {
          background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #e0e7ff 100%);
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
          width: 0%;
          position: relative;
          transition: width 0.3s ease;
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
        
        .topic-list-container {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 30px;
          padding: 40px 5%;
          max-width: 1400px;
          margin: 0 auto;
          align-items: start;
        }
        .topics-sidebar {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--card-shadow);
        }
        .topics-sidebar-header {
          padding: 20px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0,0,0,0.02);
        }
        .topic-item {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .topic-item:hover {
          background: rgba(37, 99, 235, 0.05);
        }
        .topic-item.active {
          background: rgba(37, 99, 235, 0.1);
          border-left: 4px solid var(--blue);
        }
        .topic-item-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }
        
        @media (max-width: 992px) {
          .topic-list-container {
            display: flex;
            flex-direction: column-reverse;
          }
          .topics-sidebar {
            width: 100%;
          }
          .video-player-area {
            width: 100%;
          }
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
          .video-player-area {
            padding: 16px !important;
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
          <strong>Module Topics:</strong> {topics.length} Available
        </div>
        
        <div className="hero-actions">
          <div className="progress-container progress-wrapper">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${topics.length > 0 ? Math.round((topics.filter(t => t.is_completed || t.isCompleted).length / topics.length) * 100) : 0}%` }}
              >
                <div className="progress-knob">
                  {topics.length > 0 ? Math.round((topics.filter(t => t.is_completed || t.isCompleted).length / topics.length) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
          
          {(() => {
            const prog = topics.length > 0 ? Math.round((topics.filter(t => t.is_completed || t.isCompleted).length / topics.length) * 100) : 0;
            if (certificateStatus === 'approved') {
              return (
                <button className="certificate-btn" onClick={handleDownloadCertificate}>
                  <Award size={20} /> Download Official Certificate
                </button>
              );
            } else if (certificateStatus === 'requested') {
              return (
                <button className="certificate-btn" style={{ background: '#e2e8f0', color: '#64748b' }} disabled>
                  <CheckCircle size={20} /> Certificate Requested (Pending)
                </button>
              );
            } else if (prog >= 100) {
              return (
                <button className="certificate-btn" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }} onClick={handleRequestCertificate} disabled={requestingCert}>
                  <FileText size={20} /> {requestingCert ? 'Requesting...' : 'Request Certificate'}
                </button>
              );
            } else {
              return null;
            }
          })()}
        </div>
      </div>
      
      {/* Topics and Video Section */}
      <div className="topic-list-container">
        
        {/* Sidebar Topics List */}
        <div className="topics-sidebar">
          <div className="topics-sidebar-header">
            <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary)' }}>Topics</h3>
          </div>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading topics...</div>
            ) : error ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--red)' }}>{error}</div>
            ) : topics.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No topics available.</div>
            ) : (
              topics.map((topic, index) => (
                <div 
                  key={topic._id || index} 
                  className={`topic-item ${activeTopic?._id === topic._id ? 'active' : ''}`}
                  onClick={() => setActiveTopic(topic)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {topic.video_url ? <PlayCircle size={20} color={activeTopic?._id === topic._id ? 'var(--blue)' : 'var(--text-secondary)'} /> : <FileText size={20} color="var(--text-secondary)" />}
                    <span className="topic-item-title">{topic.title || `Topic ${index + 1}`}</span>
                  </div>
                  {(topic.is_completed || topic.isCompleted) && (
                    <CheckCircle size={18} color="var(--blue)" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Video Player Area */}
        <div className="video-player-area" style={{ 
          backgroundColor: 'var(--card-bg)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '12px', 
          padding: '30px', 
        }}>
          {activeTopic ? (
            <>
              <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>{activeTopic.title}</h2>
              {activeTopic.description && (
                <p style={{ marginBottom: '24px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {activeTopic.description}
                </p>
              )}

              <div className="video-player-wrapper" style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#1e293b', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {activeTopic.video_url ? (
                  activeTopic.video_url.includes('http') || activeTopic.video_url.includes('youtube.com') || activeTopic.video_url.includes('vimeo.com') ? (
                    <iframe 
                      src={activeTopic.video_url} 
                      style={{ width: '100%', height: '100%', border: 'none' }} 
                      allowFullScreen 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  ) : (
                    <VideoPlayer videoId={activeTopic._id === '6a1fdf1410e732199d79eace' ? '69f9e9fdfc21abdc12331104' : activeTopic._id} />
                  )
                ) : (
                  <div style={{ padding: '60px 20px', textAlign: 'center', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                    <Video size={48} color="var(--text-secondary)" style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>No Video Available</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>This topic does not have a video attached.</p>
                  </div>
                )}
              </div>
              
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '16px' }}>
                {activeTopic.pdf_url && (
                  <a href={activeTopic.pdf_url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--blue)', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
                    <Download size={18} /> Download Material
                  </a>
                )}
                <button 
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem('token');
                      const res = await fetch('https://iscale-backend.onrender.com/api/lecture-progress/mark-complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify({ lecture_id: activeTopic._id || activeTopic.id })
                      });
                      const data = await res.json();
                      if (data.status) {
                        alert('Lecture marked as completed!');
                        const topicId = activeTopic._id || activeTopic.id;
                        
                        // Update local state instantly so the UI progress updates without refresh
                        setTopics(prev => prev.map(t => 
                          (t._id === topicId || t.id === topicId) 
                            ? { ...t, is_completed: true, isCompleted: true } 
                            : t
                        ));
                        setActiveTopic(prev => ({ ...prev, is_completed: true, isCompleted: true }));
                      } else {
                        alert(data.message || 'Error marking lecture complete');
                      }
                    } catch(e) {
                      alert('Server Error');
                    }
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--red)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  <CheckCircle size={18} /> Mark as Complete
                </button>
              </div>
            </>
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Select a topic from the list to view its contents.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EnrollCourseDetailsList;
