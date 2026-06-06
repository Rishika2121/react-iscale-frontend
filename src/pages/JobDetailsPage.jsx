import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, IndianRupee, Clock, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import './JobDetails.css';

const JobDetailsPage = ({ setCurrentPage }) => {
  useReveal();
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyMessage, setApplyMessage] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://iscale-backend.onrender.com/api/comp-requirement/user-get-job/${id}`);
        const data = await response.json();
        
        if (data && data.status && data.data) {
          setJob(data.data);
        } else {
          setError('Job not found or invalid response.');
        }
      } catch (err) {
        console.error('Job Details API Error:', err);
        setError('Failed to fetch job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      setApplyLoading(true);
      setApplyMessage(null);
      
      const res = await fetch(`https://iscale-backend.onrender.com/api/comp-requirement/user-apply-job/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }
      
      setApplyMessage({ type: data.status ? 'success' : 'error', text: data.message || 'Applied successfully' });
    } catch (err) {
      setApplyMessage({ type: 'error', text: 'Error applying for job' });
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="job-page-container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Loading Job Details...</h2>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-page-container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>{error || 'Job not found'}</h2>
        <button onClick={() => navigate('/job-updates')} style={{ padding: '10px 20px', marginTop: '20px', background: 'var(--red)', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="job-page-container" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Banner Section */}
      <section className="job-banner" style={{ padding: '60px 0 40px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff' }}>
        <div className="container">
          <div className="breadcrumb-nav" style={{ color: '#aaa', marginBottom: '16px' }}>
            <span style={{ cursor: 'pointer', margin: 0 }} onClick={() => navigate('/')}>Home</span>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ cursor: 'pointer', margin: 0 }} onClick={() => navigate('/job-updates')}>Job Openings</span>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#fff' }}>{job.job_title}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ width: '100px', height: '100px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', overflow: 'hidden' }}>
              <img 
                src={job.company_logo ? (job.company_logo.startsWith('http') ? job.company_logo : `https://iscale-backend.onrender.com/${job.company_logo.replace(/\\/g, '/').replace(/^src\//, '')}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name || 'Company')}&background=random`} 
                alt={job.company_name} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                onError={(e) => {
                  if (!e.target.dataset.error) {
                    e.target.dataset.error = true;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name || 'Company')}&background=random`;
                  }
                }}
              />
            </div>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>{job.job_title}</h1>
              <p style={{ fontSize: '20px', color: '#cbd5e1', marginBottom: '16px' }}>{job.company_name}</p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: '#94a3b8', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} /> {Array.isArray(job.job_locations) ? job.job_locations.join(', ') : (job.job_locations || 'Remote')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IndianRupee size={16} /> {typeof job.salary === 'object' ? `₹${job.salary?.min || 0} - ₹${job.salary?.max || 0}` : `₹${job.salary || 0}`} {job.salary_type === 'per_month' ? '/ Month' : '/ Annum'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={16} /> {typeof job.experience === 'string' ? job.experience : `${job.experience?.min || 0} - ${job.experience?.max || 0} ${job.experience?.label || 'Years'}`}
                </div>
                {job.created_at && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={16} /> Posted: {new Date(job.created_at).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Column: Job Description */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              Job Description
            </h3>
            
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '16px', whiteSpace: 'pre-wrap' }}>
              {typeof job.job_description === 'string' ? job.job_description : (job.job_description ? JSON.stringify(job.job_description) : 'No detailed description provided for this job.')}
            </div>
            
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  onClick={handleApply}
                  disabled={applyLoading || (applyMessage && applyMessage.type === 'success')}
                  style={{ 
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
                    padding: '14px 32px', background: (applyMessage && applyMessage.type === 'success') ? '#10b981' : 'var(--red)', color: '#fff', 
                    border: 'none', cursor: (applyLoading || (applyMessage && applyMessage.type === 'success')) ? 'not-allowed' : 'pointer',
                    borderRadius: '10px', fontWeight: '700', fontSize: '16px', 
                    textDecoration: 'none', transition: 'all 0.3s',
                    boxShadow: (applyMessage && applyMessage.type === 'success') ? '0 4px 15px rgba(16,185,129,0.3)' : '0 4px 15px rgba(192,0,12,0.3)'
                  }}
                >
                  {applyLoading ? 'Applying...' : (applyMessage && applyMessage.type === 'success') ? 'Applied Successfully ✓' : 'Apply for this Job'}
                </button>
                {applyMessage && (
                  <div style={{ color: applyMessage.type === 'success' ? '#10b981' : '#ef4444', fontSize: '14px', fontWeight: '600' }}>
                    {applyMessage.text}
                  </div>
                )}
              </div>
          </div>
          
          {/* Right Column: Company Info */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              About {job.company_name}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', fontSize: '15px' }}>
              {job.company_social_links?.website && (
                <a href={job.company_social_links.website} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', textDecoration: 'none' }}>
                  <Globe size={18} /> Company Website
                </a>
              )}
              {job.company_social_links?.linkedin && (
                <a href={job.company_social_links.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0077b5', textDecoration: 'none' }}>
                  <Linkedin size={18} /> LinkedIn Profile
                </a>
              )}
              {job.company_social_links?.twitter && (
                <a href={job.company_social_links.twitter} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1da1f2', textDecoration: 'none' }}>
                  <Twitter size={18} /> Twitter Profile
                </a>
              )}
              {job.company_social_links?.instagram && (
                <a href={job.company_social_links.instagram} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e1306c', textDecoration: 'none' }}>
                  <Instagram size={18} /> Instagram Profile
                </a>
              )}
              
              {!job.company_social_links?.website && !job.company_social_links?.linkedin && !job.company_social_links?.twitter && !job.company_social_links?.instagram && (
                <p>No social links provided.</p>
              )}
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default JobDetailsPage;
