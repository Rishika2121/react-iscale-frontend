import React, { useState, useEffect } from 'react';
import { Filter, RotateCcw, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import '../assets/css/JobOpening.css';

const JobOpeningPage = ({ setCurrentPage }) => {
  useReveal();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [exp, setExp] = useState('');

  const fetchJobs = async (useFilters = false) => {
    setLoading(true);
    try {
      let url = 'https://iscale-backend.onrender.com/api/comp-requirement/user-get-all-jobs?page=1&limit=1000';
      
      if (useFilters) {
        if (location) url += `&location=${encodeURIComponent(location)}`;
        if (minSalary) url += `&minSalary=${encodeURIComponent(minSalary)}`;
        if (maxSalary) url += `&maxSalary=${encodeURIComponent(maxSalary)}`;
        if (exp) url += `&exp=${encodeURIComponent(exp)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data && Array.isArray(data.data)) {
        setJobData(data.data);
      } else {
        setJobData([]);
      }
    } catch (error) {
      console.error('Job API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(false);
  }, []);

  const handleFilter = () => {
    fetchJobs(true);
  };

  const handleReset = () => {
    setLocation('');
    setMinSalary('');
    setMaxSalary('');
    setExp('');
    fetchJobs(false);
  };

 

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
          
          <div className="filter-container reveal" style={{ transitionDelay: '200ms', flexWrap: 'wrap' }}>
            <div className="filter-input-group">
              <input type="text" className="filter-input" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="filter-input-group">
              <input type="number" className="filter-input" placeholder="Min Salary" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} />
            </div>
            <div className="filter-input-group">
              <input type="number" className="filter-input" placeholder="Max Salary" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} />
            </div>
            <div className="filter-input-group">
              <input type="number" className="filter-input" placeholder="Experience (Yrs)" value={exp} onChange={(e) => setExp(e.target.value)} />
            </div>
            <button className="filter-btn" onClick={handleFilter}>
              <Filter size={18} /> Filter
            </button>
            <button className="reset-btn" onClick={handleReset}>
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container">
  {loading ? (
    <h2>Loading Jobs...</h2>
  ) : (
    <div className="job-grid">
      {jobData.map((job, index) => (
        <div
          key={index}
          className="job-card"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/job-details/${job._id}`)}
        >
          <div className="job-card-img-wrapper">
            <img
              src={job.company_logo ? (job.company_logo.startsWith('http') ? job.company_logo : `https://iscale-backend.onrender.com/${job.company_logo.replace(/\\/g, '/').replace(/^src\//, '')}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name || 'Company')}&background=random`}
              alt={job.company_name || 'Company Logo'}
              className="job-card-img"
              onError={(e) => {
                if (!e.target.dataset.error) {
                  e.target.dataset.error = true;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name || 'Company')}&background=random`;
                }
              }}
            />
          </div>

          <div className="job-card-content">
            <h4 className="job-card-title">{job.job_title}</h4>

            <div className="job-card-company">
              {job.company_name}
            </div>

            <div className="job-card-details">
              Salary : {typeof job.salary === 'object' ? `₹${job.salary?.min || 0} - ₹${job.salary?.max || 0}` : `₹${job.salary || 0}`}
              <br />
              Location : {Array.isArray(job.job_locations) ? job.job_locations.join(', ') : (job.job_locations || 'Remote')}
              <br />
              Exp : {typeof job.experience === 'string' ? job.experience : `${job.experience?.min || 0} - ${job.experience?.max || 0} Years`}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
    </div>
  );
};

export default JobOpeningPage;
