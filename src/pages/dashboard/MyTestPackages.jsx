import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ArrowRight, CheckCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ── API endpoints ────────────────────────────────────────────────────────────
// Try endpoints in order until one returns actual test package data.
// test-category/test-package-dropdown → returns master test packages (what enroll needs)
// Fallback: test-category/dropdown-packages, test-category/get-packages-dropdown
const BASE = 'https://iscale-backend.onrender.com/api';
const PACKAGE_DROPDOWN_URLS = [
  `${BASE}/test-category/test-package-dropdown`,
  `${BASE}/test-category/dropdown-packages`,
  `${BASE}/test-category/get-packages-dropdown`,
  `${BASE}/test-category/test-category-dropdown`,
];
const ENROLL_URL = `${BASE}/enrolled-test-packages/enroll`;

const MyTestPackages = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [availablePackages, setAvailablePackages] = useState([]); // for enroll dropdown
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  const resolveEntity = (value) => {
    if (!value) return null;
    if (typeof value === 'string') return { _id: value };
    if (typeof value === 'object') return value;
    return null;
  };

  const resolveEntityId = (value) => {
    if (!value) return undefined;
    if (typeof value === 'string') return value;
    return value._id || value.id;
  };

  useEffect(() => {
    fetchAvailablePackages();
    fetchMyPackages();
  }, []);

  // Fetch the list of test packages the user can enroll in.
  // Tries multiple known endpoints in order — stops at the first that returns data.
  const fetchAvailablePackages = async () => {
    const token = localStorage.getItem('token');
    if (!token) { setAvailablePackages([]); return; }

    for (const url of PACKAGE_DROPDOWN_URLS) {
      try {
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) continue;
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : [];
        if (list.length > 0) {
          setAvailablePackages(list);
          return;
        }
      } catch (_) { /* try next */ }
    }

    setAvailablePackages([]);
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
    if (!selectedPackageId) {
      alert('Please select a test package first.');
      return;
    }

    // Check if already enrolled in this test package
    const isAlreadyEnrolled = packages.some(pkg => {
      const displayPkg = resolveEntity(pkg.test_package_id) || resolveEntity(pkg.packageId) || resolveEntity(pkg.testId) || resolveEntity(pkg);
      const enrolledId = resolveEntityId(displayPkg);
      return enrolledId === selectedPackageId;
    });

    if (isAlreadyEnrolled) {
      alert('You are already enrolled in this test package.');
      return;
    }

    try {
      setEnrolling(true);
      const token = localStorage.getItem('token');

      // The enrolled-test-packages schema stores test_package_id.
      // Send the primary field name plus common aliases so the backend finds the right one.
      const body = {
        test_package_id:  selectedPackageId,
        testPackageId:    selectedPackageId,
        package_id:       selectedPackageId,
        id:               selectedPackageId,
      };

      const res = await fetch(ENROLL_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (data.status) {
        alert('Enrolled successfully!');
        setSelectedPackageId('');
        fetchMyPackages(); // Refresh the enrolled list
      } else {
        // Show helpful message
        const msg = data.message || 'Enrollment failed. The selected item may not be a valid test package.';
        alert(msg);
        console.error('Enroll response:', data);
      }
    } catch (err) {
      alert('A network error occurred. Please try again.');
      console.error(err);
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
            value={selectedPackageId}
            onChange={(e) => setSelectedPackageId(e.target.value)}
            required
          >
            <option value="">-- Select a Test Package --</option>
            {availablePackages
              .filter(pkg => {
                const optionPackage = resolveEntity(pkg);
                const optionId = resolveEntityId(optionPackage);
                if (!optionId) return false;
                // Exclude if already enrolled
                return !packages.some(p => {
                  const displayPkg = resolveEntity(p.test_package_id) || resolveEntity(p.packageId) || resolveEntity(p.testId) || resolveEntity(p);
                  const enrolledId = resolveEntityId(displayPkg);
                  return enrolledId === optionId;
                });
              })
              .map(pkg => {
                const optionPackage = resolveEntity(pkg);
                const optionId = resolveEntityId(optionPackage);
                return (
                  <option key={optionId} value={optionId}>
                    {optionPackage?.m_test_category_title || optionPackage?.m_test_package_title || optionPackage?.m_package_title || optionPackage?.title || optionPackage?.name || 'Test Package'}
                  </option>
                );
              })}
          </select>
          <button type="submit" className="enroll-btn" disabled={enrolling || !selectedPackageId}>
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
            const displayPkg = resolveEntity(pkg.test_package_id) || resolveEntity(pkg.packageId) || resolveEntity(pkg.testId) || resolveEntity(pkg);
            const enrollmentId = pkg._id || pkg.id || resolveEntityId(displayPkg) || idx;
            return (
              <div key={enrollmentId} className="pkg-card" onClick={() => enrollmentId && handleNavigate(enrollmentId)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    {displayPkg?.m_package_title || displayPkg?.m_test_category_title || displayPkg?.m_test_package_title || displayPkg?.title || displayPkg?.name || `Test Package ${idx + 1}`}
                  </h3>
                  <div style={{ background: '#ecfdf5', color: '#10b981', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                    Enrolled
                  </div>
                </div>
                
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {displayPkg?.description || displayPkg?.short_description || 'Click to view full details and start testing your knowledge.'}
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
