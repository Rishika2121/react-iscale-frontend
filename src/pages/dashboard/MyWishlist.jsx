import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Search, ArrowRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyWishlist = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'test-packs'
  const [courseWishlist, setCourseWishlist] = useState([]);
  const [testPackWishlist, setTestPackWishlist] = useState([]);
  const [notesWishlist, setNotesWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch Courses
      const coursesRes = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/course/my', { headers });
      const coursesData = await coursesRes.json();
      if (coursesData.status && Array.isArray(coursesData.data)) {
        setCourseWishlist(coursesData.data);
      }

      // Fetch Test Packs
      const testsRes = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/test-pack/my', { headers });
      const testsData = await testsRes.json();
      if (testsData.status && Array.isArray(testsData.data)) {
        setTestPackWishlist(testsData.data);
      }

      // Fetch Notes
      const notesRes = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/notes/my', { headers });
      const notesData = await notesRes.json();
      if (notesData.status && Array.isArray(notesData.data)) {
        setNotesWishlist(notesData.data);
      }
    } catch (err) {
      console.error('Failed to fetch wishlists:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (slug, id) => {
    if (setCurrentPage) {
      setCurrentPage('explore-courses');
    } else {
      navigate(`/course-details/${slug || id}`);
    }
  };

  const handleTestPackClick = (id) => {
    if (setCurrentPage) {
      setCurrentPage(`test-package-details/${id}`);
    } else {
      navigate(`/test-package-details/${id}`);
    }
  };

  const handleNoteClick = (id) => {
    if (setCurrentPage) {
      setCurrentPage(`note-details/${id}`);
    } else {
      navigate(`/note-details/${id}`);
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading your wishlist...</div>;

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out', maxWidth: 1000, margin: '0 auto', width: '100%', padding: '20px 0' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-btn {
          padding: 12px 24px;
          border: none;
          background: transparent;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          color: var(--text-secondary);
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .tab-btn.active {
          color: #ec4899;
          border-bottom: 2px solid #ec4899;
        }
        .tab-btn:hover:not(.active) {
          color: var(--text-primary);
        }
        .wishlist-card {
          border-radius: 16px;
          padding: 24px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 16px;
          cursor: pointer;
          position: relative;
        }
        .wishlist-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
          border-color: #ec4899;
        }
        .heart-icon-wrapper {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #fdf2f8;
          color: #ec4899;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Heart size={24} color="#ec4899" fill="#ec4899" /> My Wishlist
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Access all the courses and test packages you've saved for later.</p>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: 24, overflowX: 'auto' }}>
        <button 
          className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses ({courseWishlist.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'test-packs' ? 'active' : ''}`}
          onClick={() => setActiveTab('test-packs')}
        >
          Test Packages ({testPackWishlist.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Notes ({notesWishlist.length})
        </button>
      </div>

      {activeTab === 'courses' && (
        courseWishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: 16 }}>
            <Search size={40} color="#94a3b8" style={{ marginBottom: 16 }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Your Course Wishlist is Empty</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Explore courses and add them to your wishlist to view them here.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {courseWishlist.map((item, idx) => {
              const course = item.courseId || item.course || item;
              return (
                <div key={course._id || course.id || idx} className="wishlist-card" onClick={() => handleCourseClick(course.slug, course._id || course.id)}>
                  <div className="heart-icon-wrapper"><Heart size={16} fill="#ec4899" /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PlayCircle size={24} color="#64748b" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.4, paddingRight: 32 }}>
                      {course.title || course.name || `Course ${idx + 1}`}
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {course.description || course.short_description || 'View course details...'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#ec4899', fontSize: 14, fontWeight: 600, marginTop: 'auto', paddingTop: 8 }}>
                    View Details <ArrowRight size={16} style={{ marginLeft: 6 }} />
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {activeTab === 'test-packs' && (
        testPackWishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: 16 }}>
            <Search size={40} color="#94a3b8" style={{ marginBottom: 16 }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Your Test Package Wishlist is Empty</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Explore test packages and add them to your wishlist to view them here.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {testPackWishlist.map((item, idx) => {
              const pack = item.packageId || item.testPackId || item.testPack || item;
              return (
                <div key={pack._id || pack.id || idx} className="wishlist-card" onClick={() => handleTestPackClick(pack._id || pack.id)}>
                  <div className="heart-icon-wrapper"><Heart size={16} fill="#ec4899" /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={24} color="#64748b" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.4, paddingRight: 32 }}>
                      {pack.title || pack.name || pack.m_test_category_title || `Test Package ${idx + 1}`}
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {pack.description || pack.short_description || 'View test package details...'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#ec4899', fontSize: 14, fontWeight: 600, marginTop: 'auto', paddingTop: 8 }}>
                    View Package Details <ArrowRight size={16} style={{ marginLeft: 6 }} />
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {activeTab === 'notes' && (
        notesWishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: 16 }}>
            <Search size={40} color="#94a3b8" style={{ marginBottom: 16 }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Your Notes Wishlist is Empty</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Explore study materials and add them to your wishlist to view them here.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {notesWishlist.map((item, idx) => {
              const note = item.noteId || item.note || item;
              return (
                <div key={note._id || note.id || idx} className="wishlist-card" onClick={() => handleNoteClick(note._id || note.id)}>
                  <div className="heart-icon-wrapper"><Heart size={16} fill="#ec4899" /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={24} color="#64748b" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.4, paddingRight: 32 }}>
                      {note.title || note.name || `Study Note ${idx + 1}`}
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {note.description || note.short_description || 'View note details...'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#ec4899', fontSize: 14, fontWeight: 600, marginTop: 'auto', paddingTop: 8 }}>
                    View Note Details <ArrowRight size={16} style={{ marginLeft: 6 }} />
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default MyWishlist;
