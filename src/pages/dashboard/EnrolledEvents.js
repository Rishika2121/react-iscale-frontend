import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const EnrolledEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Simulation
    setTimeout(() => {
      setEvents([
        { id: 'ev-1', title: 'AI & ChatGPT Career Path Guidance', type: 'Webinar', date: 'May 28, 2026', time: '6:00 PM - 7:30 PM', instructor: 'Dr. Alok Mishra', status: 'Registered' },
        { id: 'ev-2', title: 'Placement Preparation Strategy', type: 'Workshop', date: 'June 02, 2026', time: '4:00 PM - 6:00 PM', instructor: 'Ridhi Mishra & Team', status: 'Join Live' },
        { id: 'ev-3', title: 'Full Stack Developer Roadmap 2026', type: 'Webinar', date: 'June 10, 2026', time: '5:00 PM - 6:30 PM', instructor: 'Amit K. Sharma', status: 'Register' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

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
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 35px rgba(0,0,0,0.06);
          border-color: #e2e8f0;
        }
        .event-btn {
          padding: 12px 28px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.2);
          width: 100%;
        }
        .event-btn:hover {
          background: linear-gradient(135deg, #1e293b, #334155);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.3);
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div>
              <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {event.type}
              </span>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: '#0f172a', margin: '12px 0 6px' }}>{event.title}</h3>
              <p style={{ color: '#64748b', fontSize: 13, marginBottom: 12, fontWeight: 500 }}>Instructor: <strong style={{ color: '#1e293b' }}>{event.instructor}</strong></p>
              <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#475569', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>📅 {event.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>⏱ {event.time}</span>
              </div>
            </div>
            <div className="event-card-actions">
              {event.status === 'Join Live' ? (
                <button 
                  onClick={() => alert('Redirecting to live class Zoom/Meet link...')}
                  className="live-btn"
                >
                  <span style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                  Join Live Now
                </button>
              ) : event.status === 'Registered' ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontSize: 14, fontWeight: 700, padding: '10px 16px', background: '#ecfdf5', borderRadius: 12 }}>
                  <CheckCircle size={18} /> Registered
                </span>
              ) : (
                <button 
                  onClick={() => {
                    alert(`Registered successfully for ${event.title}!`);
                    // Change state to registered
                  }}
                  className="event-btn"
                >Register Event</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledEvents;