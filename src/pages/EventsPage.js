import React, { useState } from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './Events.css';

const EventsPage = ({ setCurrentPage }) => {
  useReveal();

  const [events] = useState([
    {
        "day": "18",
        "month": "April",
        "image": "https://www.theiscale.com/myadmin/uploads/event/PRAYAS_Batch_(1).jpg",
        "dateFull": "18 Apr, 2026",
        "time": "09:00 PM",
        "title": "NEW COHORT BATCH START | DATA SCIENCE",
        "enrolled": "126"
    },
    {
        "day": "25",
        "month": "April",
        "image": "https://www.theiscale.com/myadmin/uploads/event/PRAYAS_Batch_(1)-Picsart-AiImageEnhancer.jpg",
        "dateFull": "25 Apr, 2026",
        "time": "09:00 PM",
        "title": "NEW COHORT BATCH START | DATA ANALYTICS",
        "enrolled": "57"
    }
]);

  return (
    <div className="events-page-container">
      {/* Banner Section */}
      <section className="events-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#555' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span>›</span>
            <span>All Event</span>
          </div>
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>All Event</h1>
          <div className="events-count-badge reveal" style={{ transitionDelay: '200ms' }}>
            🎉 {events.length} Events
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="container">
        <div className="events-list">
          {events.map((evt, index) => (
            <div key={index} className="event-row reveal" style={{ transitionDelay: `${(index % 5) * 50}ms` }}>
              <div className="event-date-card">
                <span className="event-day">{evt.day}</span>
                <span className="event-month">{evt.month}</span>
                <span className="event-status">Expired</span>
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
                    <button className="event-btn">
                      Expired <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
