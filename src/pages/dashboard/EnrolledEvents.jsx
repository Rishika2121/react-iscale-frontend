import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar, Clock, User, Plus } from 'lucide-react';

const colors = [
  { bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '#bfdbfe', badgeBg: '#3b82f6', badgeText: '#fff', accent: '#2563eb' }, // Light Pink
  { bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '#bbf7d0', badgeBg: '#10b981', badgeText: '#fff', accent: '#16a34a' }, // Light Green (Mint)
  { bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '#e9d5ff', badgeBg: '#a855f7', badgeText: '#fff', accent: '#8b5cf6' }, // Lavender
  { bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '#bae6fd', badgeBg: '#0284c7', badgeText: '#fff', accent: '#0369a1' }, // Light Blue (Sky)
  { bg: 'linear-gradient(135deg, #f5f3ff 0%, #edd8ff 100%)', border: '#ddd6fe', badgeBg: '#8b5cf6', badgeText: '#fff', accent: '#6d28d9' }, // Lilac
  { bg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', border: '#fed7aa', badgeBg: '#f97316', badgeText: '#fff', accent: '#ea580c' }, // Light Peach (Orange)
  { bg: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)', border: '#99f6e4', badgeBg: '#0d9488', badgeText: '#fff', accent: '#0f766e' }, // Light Teal
  { bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '#fde68a', badgeBg: '#d97706', badgeText: '#fff', accent: '#b45309' }  // Light Yellow
];

const EnrolledEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollEventId, setEnrollEventId] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://iscale-backend.onrender.com/api/enrolled-events/my-enrolled-events', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.status && Array.isArray(data.data)) {
          const mapped = data.data.map(evt => {
            const actualEvt = evt.event_id || evt.eventId || evt;
            
            let d = new Date();
            if (actualEvt.m_event_date_start) {
              d = new Date(actualEvt.m_event_date_start);
            } else if (actualEvt.date) {
              d = new Date(actualEvt.date);
            }
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            return {
              id: actualEvt._id || actualEvt.id || evt._id,
              title: actualEvt.m_event_title || actualEvt.title || 'Event',
              type: actualEvt.m_event_type || actualEvt.type || 'Webinar',
              date: dateStr,
              time: actualEvt.m_event_time_start || actualEvt.time || '10:00 AM',
              instructor: actualEvt.m_event_speaker || actualEvt.m_event_host || actualEvt.speaker || 'iScale Experts',
              status: 'Registered'
            };
          });
          setEvents(mapped);
        } else {
          setEvents([]);
        }
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEnrollEvent = async (e) => {
    e.preventDefault();
    if (!enrollEventId.trim()) {
      alert('Please enter an Event ID to enroll.');
      return;
    }
    
    try {
      setEnrolling(true);
      const token = localStorage.getItem('token');
      const res = await fetch('https://iscale-backend.onrender.com/api/enrolled-events/enroll-event', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ event_id: enrollEventId.trim() })
      });
      const data = await res.json();
      if (data.status) {
        alert('Enrolled in event successfully!');
        setEnrollEventId('');
        fetchEvents(); // Refresh the list
      } else {
        alert(data.message || 'Failed to enroll in event.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div style={{ padding: '40px 32px' }}>Loading Events...</div>;

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        .event-card {
          border-radius: 20px;
          padding: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.05) !important;
        }
        .event-btn {
          padding: 12px 28px;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }
        .event-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }
        .live-btn {
          padding: 12px 28px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
          transition: all 0.3s ease;
          width: 100%;
        }
        .live-btn:hover {
          background: linear-gradient(135deg, #16a34a, #15803d);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
        }
        .event-card-actions {
          display: flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .event-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .event-card-actions {
            width: 100%;
            margin-top: 10px;
          }
        }
      `}</style>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 8 }}>Enrolled Events & Webinars</h1>
        <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>Join upcoming live sessions, workshops, and exclusive talks.</p>
      </div>

      <div className="enroll-box" style={{ background: 'var(--card-bg)', padding: '24px', borderRadius: '16px', marginBottom: '32px', border: '1px solid var(--border-color)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 18, color: '#6d28d9' }}>Enroll in a New Event</h3>
        <form onSubmit={handleEnrollEvent} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Enter Event ID"
            className="text-input" 
            value={enrollEventId} 
            onChange={(e) => setEnrollEventId(e.target.value)}
            required
            style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', color: 'var(--text-primary)', fontSize: '15px', minWidth: '200px' }}
          />
          <button type="submit" className="event-btn" disabled={enrolling || !enrollEventId.trim()} style={{ width: 'auto', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {enrolling ? 'Enrolling...' : <>Enroll Now <Plus size={18} /></>}
          </button>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 20 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No enrolled events found on your account.</p>
          </div>
        ) : (
          events.map((event, idx) => {
            const theme = colors[idx % colors.length];
            return (
              <div 
                key={event.id} 
                className="event-card"
                style={{
                  background: theme.bg,
                  borderColor: theme.border,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02), 0 8px 16px -6px rgba(0, 0, 0, 0.02)'
                }}
              >
                <div>
                  <span style={{ background: theme.badgeBg, color: theme.badgeText, fontSize: 10, fontWeight: 800, padding: '5px 12px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {event.type}
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', margin: '14px 0 8px', fontFamily: 'var(--font-display)', letterSpacing: '-0.3px' }}>{event.title}</h3>
                  <p style={{ color: '#475569', fontSize: 13, marginBottom: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={14} style={{ color: theme.accent }} /> Instructor: <strong style={{ color: '#0f172a' }}>{event.instructor}</strong>
                  </p>
                  <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#475569', fontWeight: 600, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={14} style={{ color: theme.accent }} /> {event.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Clock size={14} style={{ color: theme.accent }} /> {event.time}
                    </span>
                  </div>
                </div>
                <div className="event-card-actions">
                  {event.status === 'Join Live' ? (
                    <button 
                      onClick={() => alert('Redirecting to live class Zoom/Meet link...')}
                      className="live-btn"
                    >
                      <span style={{ width: 8, height: 8, background: 'var(--card-bg)', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                      Join Live Now
                    </button>
                  ) : event.status === 'Registered' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontSize: 14, fontWeight: 800, padding: '10px 20px', background: '#ecfdf5', borderRadius: 12, border: '1px solid #a7f3d0' }}>
                      <CheckCircle size={18} /> Registered
                    </span>
                  ) : (
                    <button 
                      onClick={() => {
                        alert(`Registered successfully for ${event.title}!`);
                      }}
                      className="event-btn"
                      style={{ background: theme.accent, boxShadow: `0 4px 14px ${theme.badgeBg}22` }}
                    >Register Event</button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EnrolledEvents;
