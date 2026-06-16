import React, { useState, useEffect } from 'react';
import { FileText, Search, BookOpen, Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollNoteId, setEnrollNoteId] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const fetchMyNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await fetch('https://iscale-backend.onrender.com/api/notes/user/my/enrollments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status && Array.isArray(data.data)) {
        setNotes(data.data);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollNote = async (e) => {
    e.preventDefault();
    if (!enrollNoteId.trim()) {
      alert('Please enter a Note ID to enroll.');
      return;
    }
    
    try {
      setEnrolling(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`https://iscale-backend.onrender.com/api/notes/enroll/${enrollNoteId.trim()}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.status) {
        alert('Enrolled in note successfully!');
        setEnrollNoteId('');
        fetchMyNotes(); // Refresh the list
      } else {
        alert(data.message || 'Failed to enroll in note.');
      }
    } catch (err) {
      alert('An error occurred during note enrollment.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading your notes...</div>;

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out', maxWidth: 1000, margin: '0 auto', width: '100%', padding: '20px 0' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .note-card {
          border-radius: 16px;
          padding: 24px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
        }
        .note-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
          border-color: #8b5cf6;
        }
        .note-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
          color: #8b5cf6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .enroll-box {
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
          border: 1px solid #ddd6fe;
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 30px;
        }
        .text-input {
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          width: 100%;
          font-size: 15px;
          max-width: 400px;
        }
        .enroll-btn {
          padding: 12px 24px;
          background: #8b5cf6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .enroll-btn:hover:not(:disabled) {
          background: #7c3aed;
        }
        .enroll-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .download-btn {
          background: #8b5cf6;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .download-btn:hover {
          background: #7c3aed;
        }
      `}</style>

      <div style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <BookOpen size={24} color="#8b5cf6" /> My Notes
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Access your enrolled study materials and notes.</p>
      </div>

      <div className="enroll-box">
        <h3 style={{ margin: '0 0 16px 0', fontSize: 18, color: '#6d28d9' }}>Enroll in a New Note</h3>
        <form onSubmit={handleEnrollNote} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Enter Note ID (e.g., 6a05836...)"
            className="text-input" 
            value={enrollNoteId} 
            onChange={(e) => setEnrollNoteId(e.target.value)}
            required
          />
          <button type="submit" className="enroll-btn" disabled={enrolling || !enrollNoteId.trim()}>
            {enrolling ? 'Enrolling...' : <>Enroll Now <Plus size={18} /></>}
          </button>
        </form>
      </div>

      {notes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: 16 }}>
          <FileText size={40} color="#94a3b8" style={{ marginBottom: 16 }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>No Notes Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You haven't enrolled in any notes yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {notes.map((note, idx) => {
            const actualNote = note.noteId || note.note || note;
            return (
              <div 
                key={actualNote._id || actualNote.id || idx} 
                className="note-card"
                onClick={() => navigate(`/note-details/${actualNote._id || actualNote.id}`)}
              >
                <div className="note-icon-wrapper">
                  <FileText size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: 18, color: 'var(--text-primary)' }}>
                    {actualNote.title || actualNote.name || `Note Document ${idx + 1}`}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14 }}>
                    {actualNote.description || 'Comprehensive study material and notes.'}
                  </p>
                </div>
                <div>
                  <button className="download-btn" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/note-details/${actualNote._id || actualNote.id}`);
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyNotes;
