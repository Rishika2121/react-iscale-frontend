const fs = require('fs');

const jobs = JSON.parse(fs.readFileSync('jobs.json', 'utf8'));

let jsxContent = `import React, { useState } from 'react';
import { Filter, RotateCcw, Calendar } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './JobOpening.css';

const JobOpeningPage = ({ setCurrentPage }) => {
  useReveal();

  const [jobData] = useState(REPLACE_ME_JOBS);

  return (
    <div className="job-page-container">
      {/* Banner Section */}
      <section className="job-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#555' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span>›</span>
            <span>Job Opening</span>
          </div>
          <h1 className="job-title reveal" style={{ transitionDelay: '100ms' }}>Job Opening</h1>
          
          <div className="filter-container reveal" style={{ transitionDelay: '200ms' }}>
            <div className="filter-input-group">
              <input type="date" className="filter-input" placeholder="dd-mm-yyyy" />
            </div>
            <div className="filter-input-group">
              <input type="date" className="filter-input" placeholder="dd-mm-yyyy" />
            </div>
            <button className="filter-btn">
              <Filter size={18} /> Filter
            </button>
            <button className="reset-btn">
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container">
        <div className="job-grid">
          {jobData.map((job, index) => (
            <div key={index} className="job-card reveal" style={{ transitionDelay: \`\${(index % 10) * 50}ms\` }}>
              <div className="job-card-img-wrapper">
                <img 
                  src={job.logo} 
                  alt={job.company || 'Company Logo'} 
                  className="job-card-img"
                  onError={(e) => { 
                    e.target.src = \`https://ui-avatars.com/api/?name=\${encodeURIComponent(job.company || 'Job')}&background=random&color=fff&size=200\`; 
                  }} 
                />
              </div>
              <div className="job-card-content">
                <h4 className="job-card-title">{job.title}</h4>
                <div className="job-card-company">{job.company}</div>
                <div className="job-card-details">
                  Salary : {job.salary} <br />
                  Location : {job.location} <br />
                  Exp : {job.exp}
                </div>
                <div className="job-card-footer">
                  <a href="#" className="learn-more">
                    Learn More 
                    <svg width="16" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.614 1L15.629 6L10.614 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.663 6H15.629" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobOpeningPage;
`;

jsxContent = jsxContent.replace('REPLACE_ME_JOBS', JSON.stringify(jobs, null, 4));

fs.writeFileSync('src/pages/JobOpeningPage.js', jsxContent);
console.log('Successfully generated beautifully styled src/pages/JobOpeningPage.js');
