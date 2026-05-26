const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\padma\\.gemini\\antigravity\\brain\\ebaf8ed3-216c-43b8-92f5-e494a08e1103\\.system_generated\\steps\\186\\content.md', 'utf8');

const events = [];
const regex = /<h1 class="m-0">\s*(.*?)\s*<\/h1>[\s\S]*?<h6 class="m-0 mb-2">\s*(.*?)\s*<\/h6>[\s\S]*?<img src="([^"]*)"[\s\S]*?<li><i class="feather-calendar"><\/i>\s*(.*?)\s*<\/li>[\s\S]*?<li><i class="feather-clock"><\/i>\s*(.*?)\s*<\/li>[\s\S]*?<h4 class="rbt-card-title mt-1">[\s\S]*?>\s*(.*?)\s*<\/a>[\s\S]*?<span class="color-primary"><i class="feather-users"><\/i>\s*(.*?)\s*<\/span>/g;

let match;
while ((match = regex.exec(data)) !== null) {
    events.push({
        day: match[1].trim(),
        month: match[2].trim(),
        image: match[3],
        dateFull: match[4].trim(),
        time: match[5].trim(),
        title: match[6].trim(),
        enrolled: match[7].trim()
    });
}

let jsxContent = `import React, { useState } from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './Events.css';

const EventsPage = ({ setCurrentPage }) => {
  useReveal();

  const [events] = useState(REPLACE_ME_EVENTS);

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
            <div key={index} className="event-row reveal" style={{ transitionDelay: \`\${(index % 5) * 50}ms\` }}>
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
`;

jsxContent = jsxContent.replace('REPLACE_ME_EVENTS', JSON.stringify(events, null, 4));

fs.writeFileSync('src/pages/EventsPage.js', jsxContent);
console.log('Successfully generated elegantly styled src/pages/EventsPage.js');
