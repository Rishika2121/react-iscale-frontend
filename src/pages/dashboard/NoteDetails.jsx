import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Download, Calendar, Heart } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`https://iscale-backend.onrender.com/api/notes/user/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.status && data.data) {
          setNote(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch note details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNoteDetails();
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add to wishlist.');
        return;
      }
      
      const res = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/notes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ note_id: id })
      });
      const data = await res.json();
      if (data.status) {
        alert('Added to Wishlist!');
      } else {
        alert(data.message || 'Failed to add to wishlist.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading note details...</div>;
  if (!note) return <div style={{ padding: 40, textAlign: 'center' }}>Note not found.</div>;

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out', maxWidth: 800, margin: '0 auto', width: '100%', padding: '20px 0' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .note-header-card {
          background: linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%);
          border-radius: 16px;
          padding: 40px;
          color: white;
          margin-bottom: 24px;
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }
        .note-icon-big {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .meta-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
        }
        .content-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .action-btn {
          background: #8b5cf6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .action-btn:hover {
          background: #7c3aed;
        }
      `}</style>

      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, marginBottom: 20 }}>
        <ArrowLeft size={18} /> Back to My Notes
      </button>

      <div className="note-header-card">
        <div className="note-icon-big">
          <FileText size={40} color="white" />
        </div>
        <div>
          <h1 style={{ margin: '0 0 16px 0', fontSize: 32 }}>
            {note.title || note.name || 'Study Material'}
          </h1>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div className="meta-tag"><Calendar size={16} /> Enrolled</div>
          </div>
        </div>
        
        <button 
          onClick={handleAddToWishlist}
          style={{ position: 'absolute', top: 32, right: 32, zIndex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 16px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
        >
          <Heart size={18} color="#f472b6" fill="#f472b6" /> Add to Wishlist
        </button>
      </div>

      <div className="content-card">
        <h2 style={{ fontSize: 20, color: 'var(--text-primary)', marginBottom: 20, borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
          Note Details
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 16, marginBottom: 40, whiteSpace: 'pre-wrap' }}>
          {note.description || note.long_description || 'Detailed contents and instructions for this study material. Download the attached file below to begin studying.'}
        </p>

        {note.file_url || note.url ? (
          <div style={{ padding: 24, background: 'var(--bg-secondary)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ padding: 12, background: 'white', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex' }}>
                <FileText size={24} color="#8b5cf6" />
              </div>
              <div>
                <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: 16 }}>Attached Document</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13 }}>Click to open or download the file</p>
              </div>
            </div>
            <button className="action-btn" onClick={() => window.open(note.file_url || note.url, '_blank')}>
              Download <Download size={18} />
            </button>
          </div>
        ) : (
          <div style={{ padding: 20, textAlign: 'center', background: '#fef2f2', color: '#ef4444', borderRadius: 12, border: '1px solid #fecaca' }}>
            No downloadable file is attached to this note.
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
