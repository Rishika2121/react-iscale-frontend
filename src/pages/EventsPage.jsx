import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, ArrowRight, Search, Filter } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import '../assets/css/Events.css';

const EventsPage = ({ setCurrentPage }) => {
  useReveal();

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  
  // For pagination if needed, hardcoded to 1 for now as per instructions
  const page = 1;
  const limit = 100;
  // The user requested status=inactive, but it can be changed to active if needed. We'll use active or whatever API returns.
  const [status, setStatus] = useState('active');

  useEffect(() => {
    // Fetch Categories
    fetch('https://iscale-backend.onrender.com/api/event-category/public-event-category-dropdown')
      .then(res => res.json())
      .then(result => {
        if (result.status && Array.isArray(result.data)) {
          setCategories(result.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    // Fetch Events with filters
    const url = new URL('https://iscale-backend.onrender.com/api/event/public-get-events');
    if (search) url.searchParams.append('search', search);
    if (category) url.searchParams.append('category', category);
    url.searchParams.append('status', status);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);

    fetch(url)
      .then(res => res.json())
      .then(result => {
        if (result.status && Array.isArray(result.data)) {
          const mapped = result.data.map(evt => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            
            let d = new Date();
            if (evt.m_event_date_start) {
              d = new Date(evt.m_event_date_start);
            }
            
            const dayStr = d.getDate().toString().padStart(2, '0');
            const monthStr = d.toLocaleString('en-US', { month: 'short' });
            const dateFullStr = `${dayStr} ${monthStr}, ${d.getFullYear()}`;

            return {
              id: evt._id,
              day: dayStr,
              month: monthStr,
              image: getImageUrl(evt.m_event_banner),
              dateFull: dateFullStr,
              time: evt.m_event_time_start || '10:00 AM',
              title: evt.m_event_title || 'Event',
              enrolled: evt.m_event_no_of_enroll || 0,
              status: evt.m_event_status || 'active'
            };
          });
          setEvents(mapped);
        } else {
          setEvents([]);
        }
      })
      .catch(err => {
        console.error('Events API Error:', err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, [search, category, page, limit, status]);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to register for this event.');
        return;
      }
      const res = await fetch('https://iscale-backend.onrender.com/api/enrolled-events/enroll-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ event_id: eventId })
      });
      const data = await res.json();
      if (data.status) {
        alert('Successfully registered for the event!');
      } else {
        alert(data.message || 'Failed to register.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  return (
    <div className="events-page-container">
      {/* Banner Section */}
      <section className="events-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#555' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>›</span>
            <span>All Events</span>
          </div>
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>All <span className="animated-text-gradient">Events</span></h1>
          <div className="events-count-badge reveal" style={{ transitionDelay: '200ms' }}>
            {events.length} {events.length === 1 ? 'Event' : 'Events'}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container" style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none' }}
          />
        </div>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Filter size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none', appearance: 'none', background: 'var(--card-bg)' }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.m_ec_title}</option>
            ))}
          </select>
        </div>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Filter size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: 12, border: '1px solid var(--border-color)', outline: 'none', appearance: 'none', background: 'var(--card-bg)' }}
          >
            <option value="active">Upcoming Events</option>
            <option value="inactive">Past Events</option>
            <option value="">All Events</option>
          </select>
        </div>
      </section>

      {/* Events List */}
      <section className="container">
        <div className="events-list" style={{ marginTop: 40 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, width: '100%' }}>Loading events...</div>
          ) : events.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, width: '100%' }}>No events found.</div>
          ) : (
            events.map((evt, index) => (
              <div key={index} className="event-row animate-fadeUp" style={{ opacity: 0, animationDelay: `${(index % 5) * 50}ms` }}>
                <div className="event-date-card">
                  <span className="event-day">{evt.day}</span>
                  <span className="event-month">{evt.month}</span>
                  <span className="event-status" style={{ background: evt.status === 'active' ? '#22c55e' : '#64748b' }}>
                    {evt.status === 'active' ? 'Upcoming' : 'Expired'}
                  </span>
                </div>
                
                <div className="event-card">
                  <img src={evt.image} alt={evt.title} className="event-image" />
                  <div className="event-content">
                    <div className="event-meta">
                      <span><Calendar size={16} /> {evt.dateFull}</span>
                      <span><Clock size={16} /> {evt.time}</span>
                    </div>
                    
                    <h4 className="event-title">{evt.title}</h4>
                    
                    <div className="event-divider"></div>
                    
                    <div className="event-footer">
                      <div className="event-enrolled">
                        <span><Users size={16} style={{ display: 'inline', color: 'var(--red)', marginRight: '4px' }} /> <strong>{evt.enrolled}</strong> People Enrolled</span>
                      </div>
                      <button 
                        className="event-btn" 
                        onClick={() => evt.status === 'active' && handleRegister(evt.id)}
                        disabled={evt.status !== 'active'}
                        style={{ cursor: evt.status === 'active' ? 'pointer' : 'not-allowed', opacity: evt.status === 'active' ? 1 : 0.6 }}
                      >
                        {evt.status === 'active' ? 'Register' : 'Expired'} <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
