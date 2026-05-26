import React, { useState, useEffect } from 'react';

const TestSeriesResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Simulation
    setTimeout(() => {
      setResults([
        { id: 'tr-1', testName: 'Aptitude & Logical Reasoning - Test 1', score: '42/50', accuracy: '84%', rank: '12/480', date: '12-05-2026', status: 'Passed' },
        { id: 'tr-2', testName: 'JavaScript Concepts & DOM Test', score: '22/30', accuracy: '73.3%', rank: '45/310', date: '18-05-2026', status: 'Passed' },
        { id: 'tr-3', testName: 'CSS Grid & Responsive Design Quiz', score: '18/20', accuracy: '90%', rank: '8/290', date: '21-05-2026', status: 'Passed' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div style={{ padding: '40px 32px' }}>Loading Test Results...</div>;

  return (
    <div className="test-container">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .test-container {
          animation: fadeSlideUp 0.4s ease-out;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 20px 0;
        }
        .table-row {
          transition: all 0.2s ease;
        }
        .table-row:hover {
          background-color: #f8fafc;
          transform: scale(1.002);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          z-index: 10;
          position: relative;
        }
        @media (max-width: 768px) {
          .test-container {
            padding: 0;
          }
        }
      `}</style>
        <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 8 }}>Test Series Results</h1>
        <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>Track your performance and improve your All India Rank.</p>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 25px rgba(0,0,0,0.03)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>Test Name</th>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>Date</th>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>Score</th>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>Accuracy</th>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>All India Rank</th>
                <th style={{ padding: '20px 24px', fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={result.id} className="table-row" style={{ borderBottom: idx < results.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td style={{ padding: '24px 24px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{result.testName}</td>
                  <td style={{ padding: '24px 24px', fontSize: 14, color: '#64748b', fontWeight: 500 }}>{result.date}</td>
                  <td style={{ padding: '24px 24px', fontSize: 16, fontWeight: 800, color: '#ED1C24' }}>{result.score}</td>
                  <td style={{ padding: '24px 24px', fontSize: 14, color: '#475569', fontWeight: 600 }}>{result.accuracy}</td>
                  <td style={{ padding: '24px 24px', fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{result.rank}</td>
                  <td style={{ padding: '24px 24px' }}>
                    <span style={{ background: '#ecfdf5', color: '#10b981', fontSize: 13, fontWeight: 700, padding: '6px 12px', borderRadius: 9999 }}>
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestSeriesResult;
