import React, { useState, useEffect } from 'react';
import { Briefcase, Building2, MapPin, IndianRupee, Clock, CheckCircle, Clock3 } from 'lucide-react';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      // Fetching from the standard user-get endpoint convention
      const response = await fetch('https://iscale-backend.onrender.com/api/comp-requirement/user-get-applied-jobs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      if (result.status && Array.isArray(result.data)) {
        setAppliedJobs(result.data);
      } else if (result.data?.docs && Array.isArray(result.data.docs)) {
        setAppliedJobs(result.data.docs);
      } else {
        setAppliedJobs([]);
      }
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      setAppliedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'applied':
        return <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '6px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} /> Applied</span>;
      case 'in review':
      case 'under review':
        return <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '6px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock3 size={14} /> In Review</span>;
      case 'shortlisted':
        return <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '6px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={14} /> Shortlisted</span>;
      case 'rejected':
        return <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '6px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>Rejected</span>;
      default:
        return <span style={{ background: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', padding: '6px 12px', borderRadius: '100px', fontSize: '13px', fontWeight: '700' }}>{status || 'Unknown'}</span>;
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(96, 165, 250, 0.1))', padding: '12px', borderRadius: '14px', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
          <Briefcase size={28} color="#3b82f6" />
        </div>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>My Applied Jobs</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '4px 0 0 0' }}>Track the status of your job applications</p>
        </div>
      </div>

      {appliedJobs.length === 0 ? (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '60px 20px', textAlign: 'center' }}>
          <Briefcase size={48} color="var(--text-muted)" style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '8px' }}>No Applications Yet</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You haven't applied to any jobs yet. Start exploring opportunities!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {appliedJobs.map((job, idx) => (
            <div key={job.id || idx} className="hover-glow" style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '16px', 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, #2563eb, #3b82f6)' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>{job.job_title || job.job?.job_title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    <Building2 size={16} /> {job.company_name || job.job?.company_name}
                  </div>
                </div>
                <div>
                  {getStatusBadge(job.status || job.application_status)}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: 'var(--text-secondary)', fontSize: '14px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="#94a3b8" />
                  {Array.isArray(job.job_locations || job.job?.job_locations) ? (job.job_locations || job.job?.job_locations).join(', ') : (job.job_locations || job.job?.job_locations || 'Not specified')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IndianRupee size={16} color="#94a3b8" />
                  {job.salary || job.job?.salary || 'Not disclosed'} {(job.salary_type || job.job?.salary_type) === 'per_month' ? '/ Month' : '/ Annum'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="#94a3b8" />
                  Applied: {new Date(job.applied_date || job.createdAt || new Date()).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
