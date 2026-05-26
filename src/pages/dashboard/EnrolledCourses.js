import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingVideo, setPlayingVideo] = useState(false);

  useEffect(() => {
    // API Simulation for fetching enrolled courses
    setTimeout(() => {
      setCourses([
        { 
          id: 1, 
          title: 'Data Science & Machine Learning', 
          category: 'Data Science', 
          progress: 45, 
          bgGradient: 'linear-gradient(135deg, #ffebee, #ffcdd2)' 
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div style={{ padding: '40px 32px' }}>Loading Courses...</div>;

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .course-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 25px rgba(0,0,0,0.03);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.08);
        }
        .course-card .img-bg {
          transition: all 0.3s ease;
        }
        .course-card:hover .img-bg {
          transform: scale(1.05);
        }
        .resume-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #fff;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.2);
        }
        .resume-btn:hover {
          background: linear-gradient(135deg, #1e293b, #334155);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.3);
        }
      `}</style>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 8 }}>Enrolled Courses</h1>
        <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>Pick up where you left off and complete your learning goals.</p>
      </div>
      
      {courses.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: 24, padding: '60px 24px', textAlign: 'center', boxShadow: '0 4px 25px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>📚</div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>No Courses Enrolled Yet</h3>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20, maxWidth: 360, margin: '0 auto 20px', fontWeight: 500 }}>
            You are not currently enrolled in any courses. Explore our curated professional courses to start your upskilling journey!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 30 }}>
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <div className="img-bg" style={{ width: '100%', height: '100%', background: course.bgGradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 48 }}>📊</div>
                </div>
                <span style={{ position: 'absolute', top: 16, right: 16, background: '#ED1C24', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 6, boxShadow: '0 4px 10px rgba(237,28,36,0.3)' }}>
                  Premium
                </span>
              </div>
              <div style={{ padding: 24 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>{course.category}</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>{course.title}</h3>
                
                {/* Completion Progress Bar */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#475569', marginBottom: 8, fontWeight: 600 }}>
                    <span>Course Progress</span>
                    <span style={{ color: '#ED1C24' }}>{course.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${course.progress}%`, height: '100%', background: 'linear-gradient(90deg, #ED1C24, #f72a32)', borderRadius: 4 }} />
                  </div>
                </div>

                <button 
                  onClick={() => setPlayingVideo(true)}
                  className="resume-btn"
                >
                  Resume Learning <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal (Optional, carried over from original implementation) */}
      {playingVideo && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeSlideUp 0.3s ease' }}>
          <button onClick={() => setPlayingVideo(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 24, width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#ED1C24'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>✕</button>
          <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls autoPlay style={{ width: '80%', maxWidth: 1000, borderRadius: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;