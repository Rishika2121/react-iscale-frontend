import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, ArrowRight } from 'lucide-react';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let stored = localStorage.getItem('enrolled_courses');
        let enrolledList = [];
        if (stored) {
          enrolledList = JSON.parse(stored);
        } else {
          // Pre-populate with default course if none exists
          enrolledList = [
            { 
              id: 'ai-engineer-advance-program', 
              title: 'AI Engineer Advance Program', 
              category: 'AI Courses', 
              progress: 0, 
              bgGradient: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
              img: 'https://www.theiscale.com/myadmin/uploads/courses/Your_paragraph_text_(10).jpg'
            }
          ];
          localStorage.setItem('enrolled_courses', JSON.stringify(enrolledList));
        }

        // Fetch true progress from the server
        const token = localStorage.getItem('token');
        if (token && enrolledList.length > 0) {
          enrolledList = await Promise.all(enrolledList.map(async (c) => {
            try {
              
              const progRes = await fetch(`https://iscale-backend.onrender.com/api/lecture-progress/course/${c.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (progRes.ok) {
                const progData = await progRes.json();
                if (progData.status && progData.data) {
                  c.progress = progData.data.progress || 0;
                }
              }
            } catch(e) {}
            return c;
          }));
          localStorage.setItem('enrolled_courses', JSON.stringify(enrolledList));
        }
        
        setCourses(enrolledList);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
        <div style={{ width: 36, height: 36, border: '3px solid rgba(37,99,235,0.1)', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .course-card-compact {
          background: var(--card-bg);
          border: 1.5px solid var(--border-color);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.02);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          text-align: left;
        }
        .course-card-compact:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
          border-color: var(--red);
        }
        .compact-resume-btn {
          width: 100%;
          padding: 10px;
          background: var(--red);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .compact-resume-btn:hover {
          background: var(--red-dark);
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
        }
      `}</style>
      
      <div style={{ marginBottom: 24, textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 850, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 4 }}>Enrolled Courses</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Select your active cohort programs and resume your learning track.</p>
      </div>
      
      {courses.length === 0 ? (
        <div style={{ background: 'var(--card-bg)', border: '1.5px solid var(--border-color)', borderRadius: 16, padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>📚</div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>No Active Enrollments</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16, maxWidth: 320, margin: '0 auto 16px', fontWeight: 500 }}>
            Start your learning path by selecting one of our high-demand professional certificates today.
          </p>
          <button
            onClick={() => navigate('/explore-courses')}
            style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
          >
            Explore Courses
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 }}>
          {courses.map(course => (
            <div key={course.id} className="course-card-compact">
              <div style={{ height: 110, overflow: 'hidden', position: 'relative' }}>
                {course.img ? (
                  <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: course.bgGradient || 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayCircle size={36} color="var(--text-muted)" />
                  </div>
                )}
                <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(37, 99, 235, 0.95)', color: '#fff', fontSize: 8, fontWeight: 800, padding: '3px 8px', borderRadius: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                  Enrolled
                </span>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{course.category || 'UPSKILLING'}</span>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0 12px 0', lineHeight: 1.3, height: 36, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }} title={course.title}>
                    {course.title}
                  </h3>
                  
                  {/* Progress bar */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 600 }}>
                      <span>Syllabus Progress</span>
                      <span style={{ color: '#2563eb' }}>{course.progress || 0}%</span>
                    </div>
                    <div style={{ width: '100%', height: 5, background: 'var(--bg-secondary)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress || 0}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #f72a32)', borderRadius: 3 }} />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/enrolled-course-details/${course.id}`)}
                  className="compact-resume-btn"
                >
                  Resume Player <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
