import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ArrowRight, CheckCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyTestPackages = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchMyPackages();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://iscale-backend.onrender.com/api/test-category/test-category-dropdown');
      const data = await res.json();
      if (data.status && Array.isArray(data.data)) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMyPackages = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await fetch('https://iscale-backend.onrender.com/api/enrolled-test-packages/my-packages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status && Array.isArray(data.data)) {
        setPackages(data.data);
      } else {
        setPackages([]);
      }
    } catch (err) {
      console.error(err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert('Please select a test package or category first.');
      return;
    }
    
    try {
      setEnrolling(true);
      const token = localStorage.getItem('token');
      const res = await fetch('https://iscale-backend.onrender.com/api/enrolled-test-packages/enroll', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // We pass the ID mapping common backend expectation patterns
        body: JSON.stringify({ 
          test_category_id: selectedCategory,
          category_id: selectedCategory,
          package_id: selectedCategory 
        })
      });
      const data = await res.json();
      if (data.status) {
        alert('Enrolled successfully!');
        fetchMyPackages(); // Refresh the list
      } else {
        alert(data.message || 'Failed to enroll.');
      }
    } catch (err) {
      alert('An error occurred during enrollment.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleNavigate = (id) => {
    if (setCurrentPage) {
      setCurrentPage(`test-package-details/${id}`);
    } else {
      navigate(`/test-package-details/${id}`);
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading your test packages...</div>;

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out', maxWidth: 1000, margin: '0 auto', width: '100%', padding: '20px 0' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pkg-card {
          border-radius: 16px;
          padding: 24px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 16px;
          cursor: pointer;
        }
        .pkg-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
          border-color: #3b82f6;
        }
        .enroll-box {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1px solid #bae6fd;
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 30px;
        }
        .select-input {
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          width: 100%;
          font-size: 15px;
          max-width: 400px;
        }
        .enroll-btn {
          padding: 12px 24px;
          background: #0ea5e9;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .enroll-btn:hover:not(:disabled) {
          background: #0284c7;
        }
        .enroll-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <BookOpen size={24} color="#0ea5e9" /> My Test Packages
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>View and enroll in new test packages to evaluate your skills.</p>
      </div>

      <div className="enroll-box">
        <h3 style={{ margin: '0 0 16px 0', fontSize: 18, color: '#0369a1' }}>Enroll in a New Test Package</h3>
        <form onSubmit={handleEnroll} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <select 
            className="select-input" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">-- Select a Test Category --</option>
            {categories.map(cat => (
              <option key={cat._id || cat.id} value={cat._id || cat.id}>
                {cat.m_test_category_title || cat.title || cat.name || 'Category'}
              </option>
            ))}
          </select>
          <button type="submit" className="enroll-btn" disabled={enrolling || !selectedCategory}>
            {enrolling ? 'Enrolling...' : <>Enroll Now <Plus size={18} /></>}
          </button>
        </form>
      </div>

      {packages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-secondary)', borderRadius: 16 }}>
          <Search size={40} color="#94a3b8" style={{ marginBottom: 16 }} />
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>No Test Packages Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You haven't enrolled in any test packages yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {packages.map((pkg, idx) => {
            const actualPkg = pkg.packageId || pkg.testId || pkg;
            const pId = actualPkg._id || actualPkg.id || idx;
            return (
              <div key={pId} className="pkg-card" onClick={() => handleNavigate(pId)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    {actualPkg.title || actualPkg.name || actualPkg.m_test_category_title || `Test Package ${idx + 1}`}
                  </h3>
                  <div style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                    Enrolled
                  </div>
                </div>
                
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {actualPkg.description || actualPkg.short_description || 'Click to view full details and start testing your knowledge.'}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6', fontSize: 14, fontWeight: 600, marginTop: 'auto', paddingTop: 8 }}>
                  View Package Details <ArrowRight size={16} style={{ marginLeft: 6 }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTestPackages;
