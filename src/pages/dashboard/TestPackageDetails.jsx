import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Clock, Award, FileText, Heart } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const TestPackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`https://iscale-backend.onrender.com/api/enrolled-test-packages/my-package/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.status && data.data) {
          setDetails(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch package details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackageDetails();
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add to wishlist.');
        return;
      }
      
      const res = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/test-pack/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ test_pack_id: id })
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

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading details...</div>;
  if (!details) return <div style={{ padding: 40, textAlign: 'center' }}>Test package not found.</div>;

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out', maxWidth: 1000, margin: '0 auto', width: '100%', padding: '20px 0' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .header-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: 16px;
          padding: 40px;
          color: white;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }
        .header-card::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: url('data:image/svg+xml;utf8,<svg opacity="0.03" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="white"/></svg>') repeat;
          pointer-events: none;
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
        .test-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          margin-bottom: 12px;
          transition: all 0.2s;
        }
        .test-list-item:hover {
          border-color: #3b82f6;
          background: var(--bg-secondary);
        }
        .start-btn {
          background: #0ea5e9;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .start-btn:hover {
          background: #0284c7;
        }
      `}</style>

      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, marginBottom: 20 }}>
        <ArrowLeft size={18} /> Back to Packages
      </button>

      <div className="header-card">
        <h1 style={{ margin: '0 0 16px 0', fontSize: 32, position: 'relative', zIndex: 1 }}>
          {details.title || details.name || details.m_test_category_title || 'Test Package Details'}
        </h1>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div className="meta-tag"><CheckCircle size={16} /> Enrolled</div>
          <div className="meta-tag"><FileText size={16} /> {details.tests?.length || 0} Tests</div>
          {details.duration && <div className="meta-tag"><Clock size={16} /> {details.duration}</div>}
        </div>
        
        <button 
          onClick={handleAddToWishlist}
          style={{ position: 'absolute', top: 32, right: 32, zIndex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 16px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
        >
          <Heart size={18} color="#ec4899" fill="#ec4899" /> Add to Wishlist
        </button>
      </div>

      <div className="content-card">
        <h2 style={{ fontSize: 20, color: 'var(--text-primary)', marginBottom: 20, borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
          Package Information
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 15, marginBottom: 40 }}>
          {details.description || details.long_description || 'This package contains various mock tests and assessments to help you prepare effectively. Review your progress and start taking tests below.'}
        </p>

        <h3 style={{ fontSize: 18, color: 'var(--text-primary)', marginBottom: 16 }}>Included Tests</h3>
        
        {(!details.tests || details.tests.length === 0) ? (
          <div style={{ padding: 30, textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 12, color: 'var(--text-secondary)' }}>
            No individual tests are actively listed under this package yet.
          </div>
        ) : (
          <div>
            {details.tests.map((test, index) => (
              <div key={test._id || test.id || index} className="test-list-item">
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)', fontSize: 16 }}>
                    {test.title || test.name || `Mock Test ${index + 1}`}
                  </h4>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                    {test.questions_count && `${test.questions_count} Questions • `}
                    {test.time_limit && `${test.time_limit} Mins`}
                  </div>
                </div>
                <button className="start-btn">Start Test</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPackageDetails;
