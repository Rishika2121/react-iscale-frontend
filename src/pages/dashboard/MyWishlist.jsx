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
      if (!token) { setLoading(false); return; }
      const headers = { 'Authorization': `Bearer ${token}` };

      // Extract the raw ID string from any field shape the DB might use
      const extractId = (item, possibleKeys) => {
        for (const k of possibleKeys) {
          const val = item[k];
          if (val && typeof val === 'string') return val;           // plain ID string
          if (val && typeof val === 'object') {
            const nested = val._id || val.id;
            if (nested) return nested;                             // nested object with _id
          }
        }
        return item._id || item.id || null;
      };

      // Fetch full course details from public API using ID
      const fetchCourseById = async (id) => {
        try {
          const r = await fetch(`https://iscale-backend.onrender.com/api/course/public-course/${id}`);
          const j = await r.json();
          if (j.status && j.data) return j.data;
        } catch (e) {}
        return null;
      };

      // ── COURSES ──
      const coursesRes = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/course/my', { headers });
      const coursesData = await coursesRes.json();
      if (coursesData.status && Array.isArray(coursesData.data)) {
        const resolved = await Promise.all(
          coursesData.data.map(async (item) => {
            const courseId = extractId(item, ['course_id', 'courseId', 'course']);
            if (!courseId) return { ...item, _courseData: null };
            const courseData = await fetchCourseById(courseId);
            return { ...item, _courseData: courseData };
          })
        );
        setCourseWishlist(resolved);
      }

      // ── TEST PACKAGES ──
      const testsRes = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/test-pack/my', { headers });
      const testsData = await testsRes.json();
      if (testsData.status && Array.isArray(testsData.data)) {
        const resolved = await Promise.all(
          testsData.data.map(async (item) => {
            const packId = extractId(item, ['test_pack_id', 'testPackId', 'packageId', 'pack_id']);
            if (!packId) return { ...item, _packData: null };
            try {
              const r = await fetch(`https://iscale-backend.onrender.com/api/test-pack/public/${packId}`);
              const j = await r.json();
              return { ...item, _packData: j.status && j.data ? j.data : null };
            } catch (e) { return { ...item, _packData: null }; }
          })
        );
        setTestPackWishlist(resolved);
      }

      // ── NOTES ──
      const notesRes = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/notes/my', { headers });
      const notesData = await notesRes.json();
      if (notesData.status && Array.isArray(notesData.data)) {
        const resolved = await Promise.all(
          notesData.data.map(async (item) => {
            const noteId = extractId(item, ['note_id', 'noteId', 'note']);
            if (!noteId) return { ...item, _noteData: null };
            try {
              const r = await fetch(`https://iscale-backend.onrender.com/api/notes/public/${noteId}`);
              const j = await r.json();
              return { ...item, _noteData: j.status && j.data ? j.data : null };
            } catch (e) { return { ...item, _noteData: null }; }
          })
        );
        setNotesWishlist(resolved);
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
              const course = item._courseData;
              const id = course?._id || item.course_id || item.courseId;
              if (!course) return null; // skip if DB fetch failed
              return (
                <div key={id || idx} className="wishlist-card" onClick={() => handleCourseClick(course.slug, id)}>
                  <div className="heart-icon-wrapper"><Heart size={16} fill="#ec4899" /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PlayCircle size={24} color="#64748b" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.4, paddingRight: 32 }}>
                      {course.title || course.name}
                    </h3>
                  </div>
                  {(course.description || course.short_description) && (
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {course.description || course.short_description}
                    </p>
                  )}
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
              const pack = item._packData;
              const id = pack?._id || item.test_pack_id || item.packageId;
              if (!pack) return null;
              return (
                <div key={id || idx} className="wishlist-card" onClick={() => handleTestPackClick(id)}>
                  <div className="heart-icon-wrapper"><Heart size={16} fill="#ec4899" /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={24} color="#64748b" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.4, paddingRight: 32 }}>
                      {pack.title || pack.name || pack.m_test_category_title}
                    </h3>
                  </div>
                  {(pack.description || pack.short_description) && (
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {pack.description || pack.short_description}
                    </p>
                  )}
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
              const note = item._noteData;
              const id = note?._id || item.note_id || item.noteId;
              if (!note) return null;
              return (
                <div key={id || idx} className="wishlist-card" onClick={() => handleNoteClick(id)}>
                  <div className="heart-icon-wrapper"><Heart size={16} fill="#ec4899" /></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={24} color="#64748b" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.4, paddingRight: 32 }}>
                      {note.title || note.name}
                    </h3>
                  </div>
                  {(note.description || note.short_description) && (
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {note.description || note.short_description}
                    </p>
                  )}
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
