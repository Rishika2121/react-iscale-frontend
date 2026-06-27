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
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Fetch courses from API instead of dummy data
        let enrolledList = [];
        try {
          const [premiumRes, freeRes] = await Promise.all([
            fetch('https://iscale-backend.onrender.com/api/enrolled-courses/premium-courses', {
              headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch('https://iscale-backend.onrender.com/api/enrolled-courses/free-courses', {
              headers: { 'Authorization': `Bearer ${token}` }
            })
          ]);
          
          if (premiumRes.ok) {
            const data = await premiumRes.json();
            if (data.status && Array.isArray(data.data)) {
              enrolledList = [...enrolledList, ...data.data];
            }
          }
          if (freeRes.ok) {
            const data = await freeRes.json();
            if (data.status && Array.isArray(data.data)) {
              enrolledList = [...enrolledList, ...data.data];
            }
          }
        } catch(e) { console.error(e); }

        // Fetch true progress from the server for each course
        if (enrolledList.length > 0) {
          enrolledList = await Promise.all(enrolledList.map(async (c) => {
            const actualCourse = c.course_id || c.courseId || c;
            
            let rawImg = actualCourse.thumbnail || actualCourse.banner || actualCourse.m_course_thumbnail || actualCourse.m_course_image || actualCourse.img || c.thumbnail || c.img || '';
            let imgUrl = '';
            if (rawImg && rawImg !== 'N/A') {
              const cleanedPath = rawImg.replace(/\\/g, '/');
              imgUrl = cleanedPath.startsWith('http') ? cleanedPath : `https://iscale-backend.onrender.com/${cleanedPath.replace(/^src\//, '')}`;
            } else {
              imgUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';
            }

            const mappedCourse = {
              ...c,
              _id: actualCourse._id || actualCourse.id || c._id,
              id: actualCourse._id || actualCourse.id || c._id,
              title: actualCourse.title || actualCourse.m_course_title || 'Course',
              img: imgUrl,
              category: actualCourse.category || actualCourse.m_course_category?.m_cc_title || 'UPSKILLING',
              progress: 0
            };
            
            try {
              const courseId = mappedCourse.id;
              const progRes = await fetch(`https://iscale-backend.onrender.com/api/lecture-progress/course/${courseId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (progRes.ok) {
                const progData = await progRes.json();
                if (progData.status && progData.data) {
                  mappedCourse.progress = progData.data.progress || 0;
                }
              }
            } catch(e) {}
            return mappedCourse;
          }));
        }
        // Do not inject any dummy fallback data
        if (enrolledList.length > 0) {
          setCourses(enrolledList);
        } else {
          setCourses([]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDebugClick = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://iscale-backend.onrender.com/api/lecture-progress/debug/course/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      alert(`Debug Info:\n\n${JSON.stringify(data, null, 2)}`);
    } catch(e) {
      alert('Failed to fetch debug info');
    }
  };

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

                <div style={{ display: 'flex' }}>
                  <button 
                    onClick={() => navigate(`/enrolled-course-details/${course._id || course.id}`)}
                    className="compact-resume-btn"
                    style={{ flex: 1, width: '100%' }}
                  >
                    Resume Player <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
