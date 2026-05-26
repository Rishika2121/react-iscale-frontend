import React, { useState, useEffect } from 'react';
import { GraduationCap, Book, Monitor } from 'lucide-react';

const ProfileBadge = () => (
  <div style={{
    width: 90, height: 90,
    borderRadius: '50%',
    border: '2.5px solid #eaeaea',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    padding: 6,
    flexShrink: 0
  }}>
    <svg width="42" height="45" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0L10 20V55C10 77.2 27.2 97.4 50 105C72.8 97.4 90 77.2 90 55V20L50 0Z" fill="#800000" />
      <path d="M50 8L18 24V55C18 73.2 31.8 89.8 50 96.5C68.2 89.8 82 73.2 82 55V24L50 8Z" fill="#800000" stroke="white" strokeWidth="4" />
      <text x="50" y="68" fill="white" fontSize="45" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">I</text>
    </svg>
    <span style={{ fontSize: 9, fontWeight: '800', color: '#800000', marginTop: 3, letterSpacing: '0.2px' }}>iSCALE</span>
  </div>
);

const styles = `
.dashboard-page-container {
  padding: 40px 32px;
}
.dashboard-title {
  font-size: 26px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 20px;
}
.profile-summary {
  background: #ffffff;
  border: 1px solid #eef0f3;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.015);
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}
.stat-card {
  border-radius: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  width: 100%;
}
.stat-card:hover {
  transform: translateY(-6px);
}
.stat-card.premium {
  background: #edf2fc;
  border: 1px solid #e1e8fa;
}
.stat-card.free {
  background: #f8effa;
  border: 1px solid #f1e2f5;
}
.activity-section {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #eef0f3;
  padding: 24px;
}

@media (max-width: 768px) {
  .dashboard-page-container {
    padding: 0;
  }
  .profile-summary {
    flex-direction: column;
    text-align: center;
    padding: 20px;
    gap: 16px;
  }
  .profile-summary p {
    justify-content: center;
  }
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .stat-card {
    padding: 24px;
  }
}
`;

const DashboardPage = () => {
  const [user, setUser] = useState({ name: 'User', enrolledCoursesCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call that will be replaced later
    const fetchDashboardData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== "undefined") {
          setUser(JSON.parse(storedUser));
        } else {
          setUser({ name: 'Ridhi Mishra', enrolledCoursesCount: 1 });
        }
      } catch (error) {
        console.error(error);
        setUser({ name: 'Ridhi Mishra', enrolledCoursesCount: 1 });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading Dashboard...</h2>;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-page-container">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="profile-summary">
          <ProfileBadge />
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{user.name}</h2>
            <p style={{ color: '#64748b', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <GraduationCap size={16} />
              <span>{user.enrolledCoursesCount} Courses Enrolled</span>
            </p>
          </div>
        </div>

        <div className="stats-grid">
          {/* Premium Courses Card */}
          <div className="stat-card premium">
            <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: '#dce6fa', transition: 'all 0.3s' }}>
              <Book size={24} color="#dc2626" />
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, marginBottom: 12, color: '#dc2626' }}>{user.enrolledCoursesCount}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#ef4444' }}>Premium Courses</div>
          </div>

          {/* Free Courses Card */}
          <div className="stat-card free">
            <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: '#f3e1f7', transition: 'all 0.3s' }}>
              <Monitor size={24} color="#7c3aed" />
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, marginBottom: 12, color: '#4c1d95' }}>0</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9333ea' }}>Free Courses</div>
          </div>
        </div>

        <div className="activity-section">
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', marginTop: 6 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Logged into the Dashboard</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Just now</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', marginTop: 6 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Profile updated successfully</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>A few moments ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;