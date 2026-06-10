import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Book, 
  Monitor, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Trophy,
  Sparkles,
  BookOpen
} from 'lucide-react';

const ProfileBadge = () => (
  <div style={{
    width: 80, height: 80,
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.2)',
    padding: 6,
    flexShrink: 0
  }}>
    <svg width="36" height="38" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0L10 20V55C10 77.2 27.2 97.4 50 105C72.8 97.4 90 77.2 90 55V20L50 0Z" fill="#fff" opacity="0.9" />
      <text x="50" y="72" fill="#b91c1c" fontSize="54" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">I</text>
    </svg>
  </div>
);

const styles = `
.dashboard-page-container {
  padding: 30px 24px;
  animation: fadeSlideIn 0.5s ease-out;
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
.dashboard-hero-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 24px;
  padding: 32px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  margin-bottom: 32px;
  border: 1px solid rgba(255, 255, 255, 0.04);
}
.dashboard-hero-pattern {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 50%;
  background: radial-gradient(circle, rgba(239, 28, 36, 0.08) 0%, transparent 70%);
  pointer-events: none;
}
.stats-grid-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
.stat-card-dashboard {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.01);
}
.stat-card-dashboard:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  border-color: #cbd5e1;
}
.stat-card-dashboard.premium {
  border-left: 4px solid #ef4444;
}
.stat-card-dashboard.progress-stat {
  border-left: 4px solid #8b5cf6;
}
.stat-card-dashboard.certificates {
  border-left: 4px solid #10b981;
}
.stat-icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-card-dashboard.premium .stat-icon-wrapper {
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
}
.stat-card-dashboard.progress-stat .stat-icon-wrapper {
  background: rgba(139, 92, 246, 0.08);
  color: #8b5cf6;
}
.stat-card-dashboard.certificates .stat-icon-wrapper {
  background: rgba(16, 185, 129, 0.08);
  color: #10b981;
}
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding-left: 20px;
}
.activity-timeline::before {
  content: '';
  position: absolute;
  top: 8px; left: 4px; bottom: 8px;
  width: 2px;
  background: var(--border-color);
}
.activity-item {
  position: relative;
  display: flex;
  gap: 16px;
}
.activity-bullet {
  position: absolute;
  left: -20px;
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--text-muted);
  border: 2px solid var(--card-bg);
  box-shadow: 0 0 0 2px var(--border-color);
}
.activity-bullet.active {
  background: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}
.activity-bullet.complete {
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

@media (max-width: 768px) {
  .dashboard-page-container {
    padding: 16px 12px;
  }
  .dashboard-hero-banner {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 24px;
  }
  .stats-grid-dashboard {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
:root {
  --premium-card-bg: #eef2ff;
  --free-card-bg: #faf5ff;
}
:root[data-theme='dark'] {
  --premium-card-bg: rgba(99, 102, 241, 0.08);
  --free-card-bg: rgba(168, 85, 247, 0.08);
}
.stats-grid-dashboard-real {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
.course-stat-card-real {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.01);
}
.course-stat-card-real:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
  border-color: var(--red);
}
.course-stat-card-real.premium-card {
  background: var(--premium-card-bg);
  border: 1.5px solid rgba(99, 102, 241, 0.15);
}
.course-stat-card-real.free-card {
  background: var(--free-card-bg);
  border: 1.5px solid rgba(168, 85, 247, 0.15);
}
.course-stat-icon-wrapper-real {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}
.premium-card .course-stat-icon-wrapper-real {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
  border: 1.5px solid rgba(99, 102, 241, 0.3);
}
.free-card .course-stat-icon-wrapper-real {
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
  border: 1.5px solid rgba(168, 85, 247, 0.3);
}
.course-stat-number-real {
  font-size: 54px;
  font-weight: 850;
  color: var(--text-primary);
  line-height: 1;
}
.course-stat-label-real {
  font-size: 13px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.premium-card .course-stat-label-real {
  color: var(--red);
}
.free-card .course-stat-label-real {
  color: #a855f7;
}
}
`;

const DashboardPage = ({ setCurrentPage }) => {
  const [user, setUser] = useState({ name: 'Student', enrolledCount: 0 });
  const [avgProgress, setAvgProgress] = useState(0);
  const [certCount, setCertCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('Welcome');
  const [activeCourseId, setActiveCourseId] = useState('ai-engineer-advance-program');
  const [premiumCount, setPremiumCount] = useState(0);
  const [freeCount, setFreeCount] = useState(0);

  useEffect(() => {
    // Determine dynamic greeting based on hours
    const hrs = new Date().getHours();
    if (hrs < 12) setGreeting('Good Morning');
    else if (hrs < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://iscale-backend.onrender.com/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }

        const data = await response.json();

        if (data.status && data.data) {
          const dashboardStats = data.data;
          
          // Fallback to local storage if API doesn't provide name
          let name = dashboardStats.name;
          if (!name || name === 'NA') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              const u = JSON.parse(storedUser);
              if (u && u.name) name = u.name;
            }
          }
          setUser(prev => ({ ...prev, name: name || 'Student' }));
          setFreeCount(dashboardStats.freeCourses || 0);
          setPremiumCount(dashboardStats.premiumCourses || 0);
        }

        // Keep local enrolled list for the visual course cards
        const storedEnrolled = localStorage.getItem('enrolled_courses');
        let enrolledList = [];
        if (storedEnrolled && storedEnrolled !== 'undefined') {
          try {
            enrolledList = JSON.parse(storedEnrolled);
          } catch(e) {}
        }
        
        if (!enrolledList || enrolledList.length === 0) {
          // Prepopulate default course
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

        // Fetch true progress from the server for all enrolled courses
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
        
        // Save the synced list back to local storage
        localStorage.setItem('enrolled_courses', JSON.stringify(enrolledList));

        if (enrolledList.length > 0) {
          setActiveCourseId(enrolledList[0].id);
        }

        // Calculate average progress for the visual cards
        let totalProg = 0;
        let completedCerts = 0;
        enrolledList.forEach(c => {
          totalProg += (c.progress || 0);
          if (c.progress === 100) completedCerts++;
        });
        const avg = enrolledList.length > 0 ? Math.round(totalProg / enrolledList.length) : 0;
        
        setAvgProgress(avg);
        setCertCount(completedCerts);
        setUser(prev => ({ ...prev, enrolledCount: enrolledList.length }));
        
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(237,28,36,0.1)', borderTop: '3px solid #ED1C24', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-page-container">
        
        {/* Dynamic greeting hero banner */}
        <div className="dashboard-hero-banner">
          <div className="dashboard-hero-pattern" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, zIndex: 1, flexWrap: 'wrap' }}>
            <ProfileBadge />
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, color: '#fca5a5' }}>
                <Sparkles size={12} /> Student Account Unlocked
              </div>
              <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 850, letterSpacing: '-0.5px', margin: 0 }}>
                {greeting}, <span style={{ color: '#fca5a5' }}>{user.name.split(' ')[0]}</span>!
              </h1>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: '6px 0 0 0', fontWeight: 500, maxWidth: 500, lineHeight: 1.5 }}>
                Ready to level up your technical knowledge today? Track your overall progress and claim verified credentials upon module completion.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentPage(`course-details/${activeCourseId}`)}
            style={{
              background: '#ffffff',
              color: '#0f172a',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              zIndex: 1
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            Resume Learning <ArrowRight size={16} />
          </button>
        </div>

        {/* Real Website Style Profile Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          background: 'var(--card-bg)',
          padding: '20px 24px',
          borderRadius: 20,
          border: '1.5px solid var(--border-color)',
          marginBottom: 28,
          boxShadow: '0 4px 15px rgba(0,0,0,0.01)'
        }}>
          {/* Logo Circle Badge */}
          <div style={{
            width: 84, height: 84,
            borderRadius: '50%',
            border: '2px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            background: 'var(--card-bg)',
            flexShrink: 0
          }}>
            <div style={{
              width: 52, height: 52,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(239, 68, 68, 0.15)'
            }}>
              <span style={{ color: '#ffffff', fontSize: 28, fontWeight: 950, fontFamily: 'sans-serif' }}>I</span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 800, color: '#b91c1c', marginTop: 2, letterSpacing: 0.5 }}>iSCALE</span>
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>{user.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13, marginTop: 6, fontWeight: 600 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: -1 }}>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Courses Enrolled
            </div>
          </div>
        </div>

        {/* Dynamic metrics stat grid (Real Website Style) */}
        <div className="stats-grid-dashboard-real">
          
          {/* Premium Courses Card */}
          <div className="course-stat-card-real premium-card" onClick={() => setCurrentPage('enrolled-courses')}>
            <div className="course-stat-icon-wrapper-real">
              <BookOpen size={28} />
            </div>
            <div className="course-stat-number-real">{premiumCount}</div>
            <div className="course-stat-label-real">Premium Courses</div>
          </div>

          {/* Free Courses Card */}
          <div className="course-stat-card-real free-card" onClick={() => setCurrentPage('enrolled-courses')}>
            <div className="course-stat-icon-wrapper-real">
              <Monitor size={28} />
            </div>
            <div className="course-stat-number-real">{freeCount}</div>
            <div className="course-stat-label-real">Free Courses</div>
          </div>

        </div>

        {/* Activity & Achievements Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30 }}>
          
          {/* Recent activities section */}
          <div style={{ background: 'var(--card-bg)', borderRadius: 20, border: '1.5px solid var(--border-color)', padding: 28, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20, textAlign: 'left' }}>Recent Activities</h3>
            <div className="activity-timeline">
              <div className="activity-item">
                <div className="activity-bullet active" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Authenticated Student Session</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Secure session validated successfully</div>
                </div>
              </div>

              {certCount > 0 ? (
                <div className="activity-item">
                  <div className="activity-bullet complete" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Certificate Unlocked!</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>ISO certified credentials claimed successfully</div>
                  </div>
                </div>
              ) : (
                <div className="activity-item">
                  <div className="activity-bullet" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Enrolled in Primary Cohort</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Module syllabus initialized in workspace</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Certificate claiming guidance widget */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(34, 197, 94, 0.08) 100%)',
            borderRadius: 20,
            border: '1.5px dashed rgba(34, 197, 94, 0.3)',
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            textAlign: 'left'
          }}>
            <div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 4px 10px rgba(34,197,94,0.2)' }}>
                <Award size={20} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>ISO Certification</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
                Every program includes an industry-recognized certification verified via secure ID validation. Complete all lectures to claim your printed copy and add to LinkedIn!
              </p>
            </div>
            
            <button
              onClick={() => setCurrentPage(`course-details/${activeCourseId}`)}
              style={{
                background: '#166534',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 18px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              Resume & Unlock <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </>
  );
};

export default DashboardPage;
