import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Award, 
  Printer, 
  AlertCircle, 
  Calendar, 
  User, 
  BookOpen, 
  CheckCircle,
  FileCheck,
  ArrowLeft
} from 'lucide-react';

const MOCK_CERTIFICATES = {
  'ISC-DAT-9942': {
    studentName: 'Ridhi Mishra',
    courseName: 'Data Science with Generative AI',
    date: 'May 28, 2026',
    grade: 'A+',
    duration: '6 Months',
    status: 'Verified'
  },
  'ISC-AI-5512': {
    studentName: 'Abhishek Kumar',
    courseName: 'AI Cohort Course Batch 01',
    date: 'June 01, 2026',
    grade: 'A',
    duration: '45 Days',
    status: 'Verified'
  },
  'ISC-MAS-3321': {
    studentName: 'Siddharth Sen',
    courseName: 'Master Of Data Analytics Program',
    date: 'April 15, 2026',
    grade: 'A+',
    duration: '3 Months',
    status: 'Verified'
  }
};

const CertificateVerificationPage = ({ setCurrentPage }) => {
  const location = useLocation();
  const [certId, setCertId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if query param exists (e.g. ?id=ISC-DAT-9942)
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id') || params.get('certificateId');
    if (idParam) {
      setCertId(idParam);
      handleVerify(idParam);
    }
  }, [location]);

  const handleVerify = (idToVerify) => {
    const targetId = (idToVerify || certId).trim().toUpperCase();
    if (!targetId) {
      alert('Please enter a Certificate ID to verify.');
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setSearchResult(null);

    // Simulate network lookup delay for realistic experience
    setTimeout(() => {
      // 1. Look in hardcoded mock database
      let match = MOCK_CERTIFICATES[targetId];

      // 2. If not found, dynamically check if it fits the ISC pattern to verify frontend-generated IDs
      if (!match && targetId.startsWith('ISC-')) {
        const parts = targetId.split('-');
        if (parts.length >= 3) {
          const courseCode = parts[1];
          let courseName = 'Advanced Upskilling Course';
          if (courseCode === 'DAT' || courseCode === 'DSC') courseName = 'Data Science with Generative AI';
          else if (courseCode === 'MAS') courseName = 'Master of Data Analytics Program';
          else if (courseCode === 'AIE') courseName = 'AI Engineer Advance Program';
          else if (courseCode === 'PYT') courseName = 'Advance Python With AI Tools';
          else if (courseCode === 'PBT') courseName = 'Power BI & Tableau for Data Visualization';
          else if (courseCode === 'EXC') courseName = 'AI-Powered Excel Full Course';
          else if (courseCode === 'AIC' || courseCode === 'AI' || courseCode === 'COH') courseName = 'AI Cohort Course';
          else if (courseCode === 'AFE') courseName = 'AI for Everyone: Complete Guide';
          else if (courseCode === 'FDS') courseName = 'Free Data Science Course';
          else if (courseCode === 'FDA') courseName = 'Free Data Analytics Course';

          // Get username from local storage if available
          let storedUser = { name: 'Ridhi Mishra' };
          try {
            const userStr = localStorage.getItem('user');
            if (userStr) storedUser = JSON.parse(userStr);
          } catch(e) {}

          match = {
            studentName: storedUser.name || 'Ridhi Mishra',
            courseName: courseName,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            grade: 'A+',
            duration: 'Self-Paced / Cohort',
            status: 'Verified'
          };
        }
      }

      setSearchResult(match || null);
      setLoading(false);
    }, 1200);
  };

  const handlePrint = () => {
    if (!searchResult) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Verified Certificate - ${searchResult.studentName}</title>
          <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@700;800&family=Inter:wght@500;600;700&display=swap" rel="stylesheet">
          <style>
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
            .certificate-container { position: relative; width: 1000px; height: 707px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); background: #ffffff; border: 15px double #d4af37; box-sizing: border-box; padding: 30px; text-align: center; font-family: 'Inter', sans-serif; }
            .cert-border { border: 2px solid #ca8a04; height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; padding: 30px; position: relative; border-radius: 4px; }
            .cert-title { font-family: 'Poppins', sans-serif; font-size: 38px; color: #ca8a04; font-weight: 800; letter-spacing: 3px; margin: 0 0 5px 0; }
            .cert-subtitle { font-size: 13px; text-transform: uppercase; color: #78350f; letter-spacing: 5px; font-weight: 700; margin-bottom: 30px; }
            .cert-present { font-size: 15px; color: #475569; font-style: italic; margin-bottom: 8px; }
            .cert-name { font-family: 'Great Vibes', cursive; font-size: 58px; color: #0f172a; font-weight: bold; margin: 5px 0 15px 0; }
            .cert-reason { font-size: 13px; color: #475569; max-width: 620px; line-height: 1.6; margin: 0 auto 20px auto; }
            .cert-course { font-family: 'Poppins', sans-serif; font-size: 24px; color: #b45309; font-weight: 700; text-transform: uppercase; margin-bottom: 35px; }
            .cert-meta-row { display: flex; width: 85%; justify-content: space-between; align-items: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
            .cert-meta-col { display: flex; flex-direction: column; align-items: center; flex: 1; }
            .cert-meta-val { font-size: 13px; font-weight: 700; color: #0f172a; height: 30px; display: flex; align-items: flex-end; }
            .cert-meta-line { width: 80%; height: 1px; background: #cbd5e1; margin: 5px 0; }
            .cert-meta-label { font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 600; }
            .cert-verification-footer { margin-top: 25px; font-size: 9px; color: #94a3b8; font-weight: 500; }
            @media print {
              body { background: none; }
              .certificate-container { box-shadow: none; border: 15px double #d4af37 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              @page { size: landscape; margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="cert-border">
              <div class="cert-title">iSCALE LEARNING</div>
              <div class="cert-subtitle">Certificate of Completion</div>
              <div class="cert-present">This is proudly presented to</div>
              <div class="cert-name">${searchResult.studentName}</div>
              <div class="cert-reason">for successfully finishing all learning modules, capstone assignments, and industry-oriented practical tasks for</div>
              <div class="cert-course">${searchResult.courseName}</div>
              
              <div class="cert-meta-row">
                <div class="cert-meta-col">
                  <div class="cert-meta-val">${searchResult.date}</div>
                  <div class="cert-meta-line"></div>
                  <div class="cert-meta-label">Date of Completion</div>
                </div>
                
                <div class="cert-meta-col" style="margin-top: -30px; margin-bottom: -15px;">
                  <!-- SVG Gold Medallion Seal -->
                  <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 70 L30 95 L50 88 L70 95 L60 70" fill="#b45309" opacity="0.85" />
                    <path d="M50 70 L42 95 L50 90 L58 95 L50 70" fill="#d97706" />
                    <path d="M50 10 L54 22 L66 18 L64 30 L75 30 L70 41 L79 47 L70 55 L75 66 L64 66 L66 78 L54 74 L50 86 L46 74 L34 78 L36 66 L25 66 L30 55 L21 47 L30 41 L25 30 L36 30 L34 18 L46 22 Z" fill="url(#goldGrad)" />
                    <circle cx="50" cy="48" r="28" fill="url(#goldGradSec)" stroke="#9a7b56" stroke-width="1.5" />
                    <circle cx="50" cy="48" r="24" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity="0.8" />
                    <polygon points="50,38 52,43 57,43 53,46 55,51 50,48 45,51 47,46 43,43 48,43" fill="#78350f" />
                    <text x="50" y="60" font-family="'Inter', sans-serif" font-size="6" font-weight="bold" fill="#78350f" text-anchor="middle">iSCALE</text>
                    <text x="50" y="67" font-family="'Inter', sans-serif" font-size="5" font-weight="bold" fill="#b45309" text-anchor="middle">OFFICIAL SEAL</text>
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#fef08a" />
                        <stop offset="50%" stop-color="#ca8a04" />
                        <stop offset="100%" stop-color="#854d0e" />
                      </linearGradient>
                      <linearGradient id="goldGradSec" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#ca8a04" />
                        <stop offset="50%" stop-color="#fef08a" />
                        <stop offset="100%" stop-color="#ca8a04" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <div class="cert-meta-col">
                  <div class="cert-meta-val">
                    <svg width="100" height="32" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 35 Q30 10 50 35 T90 20 T130 38 M30 30 L120 30" stroke="#1e40af" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
                      <path d="M45 20 Q60 5 70 25 T100 20" stroke="#1e40af" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" />
                    </svg>
                  </div>
                  <div class="cert-meta-line"></div>
                  <div class="cert-meta-label">Director, iSCALE Learning</div>
                </div>
              </div>
              
              <div class="cert-verification-footer">
                Verification ID: <span style="font-weight: 700; color: #475569;">${certId.toUpperCase()}</span> &bull; Verified Online at: <span style="font-weight: 700; color: #475569;">iscale-learning.com/verify</span>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div style={{
      minHeight: '90vh',
      background: 'var(--bg-gradient)',
      color: 'var(--text-primary)',
      fontFamily: "'Inter', sans-serif",
      padding: '60px 0',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
        
        {/* Back Link */}
        <button 
          onClick={() => setCurrentPage ? setCurrentPage('home') : window.history.back()}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 14,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            marginBottom: 32,
            padding: 0
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#2563eb'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Verification Card Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(37, 99, 235, 0.08)',
            color: '#2563eb',
            marginBottom: 16,
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.15)'
          }}>
            <ShieldCheck size={36} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12 }}>
            Certificate <span className="animated-text-gradient">Verification</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
            Verify the authenticity of credential certificates issued by iScale Upskilling Platform.
          </p>
        </div>

        {/* Search Panel */}
        <div className="glass-card" style={{
          padding: '32px 24px',
          borderRadius: 20,
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)',
          marginBottom: 32
        }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g. ISC-DAT-9942)"
                value={certId}
                onChange={e => setCertId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  background: 'var(--bg-secondary)',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: 12,
                  color: 'var(--text-primary)',
                  fontSize: 15,
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onKeyDown={e => e.key === 'Enter' && handleVerify()}
              />
              <Search size={18} style={{ position: 'absolute', left: 16, top: '55%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
            
            <button
              onClick={() => handleVerify()}
              disabled={loading}
              className="btn-shine"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #b5151b 100%)',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                minWidth: 140,
                justifyContent: 'center'
              }}
            >
              {loading ? (
                <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              ) : (
                'Verify Secure'
              )}
            </button>
          </div>
        </div>

        {/* Results Presentation */}
        {hasSearched && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ width: 44, height: 44, border: '3px solid rgba(37,99,235,0.1)', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Securing verification records...</p>
              </div>
            ) : searchResult ? (
              /* Verification Success Panel */
              <div className="glass-card" style={{
                borderRadius: 24,
                border: '1.5px solid #22c55e',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.08)'
              }}>
                {/* Banner Status */}
                <div style={{
                  background: 'rgba(34, 197, 94, 0.08)',
                  padding: '24px 32px',
                  borderBottom: '1.5px solid rgba(34, 197, 94, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: '#22c55e',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                  }}>
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: 1 }}>AUTHENTIC CREDENTIAL</span>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>Verification Successful</h3>
                  </div>
                </div>

                {/* Details list */}
                <div style={{ padding: '32px 32px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <User size={18} style={{ color: '#2563eb', marginTop: 3 }} />
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Student Name</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{searchResult.studentName}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <BookOpen size={18} style={{ color: '#2563eb', marginTop: 3 }} />
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Course Program</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{searchResult.courseName}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <Calendar size={18} style={{ color: '#2563eb', marginTop: 3 }} />
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Date of Issue</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{searchResult.date}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <Award size={18} style={{ color: '#2563eb', marginTop: 3 }} />
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Academic Grade</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{searchResult.grade}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 1, background: 'var(--border-color)', margin: '12px 0' }} />

                  {/* HTML/CSS Certificate representation */}
                  <div style={{
                    border: '8px double #d4af37',
                    background: 'var(--card-bg)',
                    borderRadius: 16,
                    padding: '24px 20px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 320,
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: 420,
                    margin: '0 auto'
                  }}>
                    {/* Inner gold frame line */}
                    <div style={{
                      border: '1px solid #ca8a04',
                      padding: '16px 12px',
                      width: '100%',
                      height: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: 8
                    }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', color: '#ca8a04', fontSize: 14, fontWeight: 800, letterSpacing: 1.5, margin: '0 0 2px 0' }}>iSCALE LEARNING</h4>
                      <span style={{ fontSize: 8, letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', color: '#78350f', marginBottom: 10 }}>Certificate of Completion</span>
                      <span style={{ fontSize: 9, fontStyle: 'italic', color: '#64748b' }}>This is proudly presented to</span>
                      <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 28, color: '#0f172a', margin: '2px 0 6px 0', fontWeight: 'bold' }}>{searchResult.studentName}</h2>
                      <p style={{ fontSize: 8, color: '#64748b', maxWidth: 280, margin: '0 auto 6px auto', lineHeight: 1.3 }}>
                        for successfully finishing all learning modules and industry-oriented practical tasks for
                      </p>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', marginBottom: 12 }}>{searchResult.courseName}</div>
                      
                      {/* Compact Footer: 3 Columns (Date, Seal, Signature) */}
                      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 8, marginTop: 'auto' }}>
                        {/* Date */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: '#334155' }}>
                            {searchResult.date}
                          </span>
                          <span style={{ fontSize: 6, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>Date</span>
                        </div>

                        {/* Gold Seal SVG */}
                        <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center', marginTop: -15, marginBottom: -10 }}>
                          <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40 70 L30 95 L50 88 L70 95 L60 70" fill="#b45309" opacity="0.85" />
                            <path d="M50 70 L42 95 L50 90 L58 95 L50 70" fill="#d97706" />
                            <path d="M50 10 L54 22 L66 18 L64 30 L75 30 L70 41 L79 47 L70 55 L75 66 L64 66 L66 78 L54 74 L50 86 L46 74 L34 78 L36 66 L25 66 L30 55 L21 47 L30 41 L25 30 L36 30 L34 18 L46 22 Z" fill="url(#verifyGoldGrad)" />
                            <circle cx="50" cy="48" r="28" fill="url(#verifyGoldGradSec)" stroke="#9a7b56" stroke-width="1.5" />
                            <polygon points="50,38 52,43 57,43 53,46 55,51 50,48 45,51 47,46 43,43 48,43" fill="#78350f" />
                            <defs>
                              <linearGradient id="verifyGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#fef08a" />
                                <stop offset="50%" stop-color="#ca8a04" />
                                <stop offset="100%" stop-color="#854d0e" />
                              </linearGradient>
                              <linearGradient id="verifyGoldGradSec" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#ca8a04" />
                                <stop offset="50%" stop-color="#fef08a" />
                                <stop offset="100%" stop-color="#ca8a04" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>

                        {/* Signature */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <div style={{ height: 16, display: 'flex', alignItems: 'flex-end' }}>
                            <svg width="50" height="18" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 35 Q30 10 50 35 T90 20 T130 38 M30 30 L120 30" stroke="#1e40af" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
                              <path d="M45 20 Q60 5 70 25 T100 20" stroke="#1e40af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" />
                            </svg>
                          </div>
                          <span style={{ fontSize: 6, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>Director Signature</span>
                        </div>
                      </div>

                      {/* Small Footer ID */}
                      <span style={{ fontSize: 7, color: '#94a3b8', marginTop: 10 }}>ID: {certId.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Print Action */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <button
                      onClick={handlePrint}
                      style={{
                        background: 'var(--text-primary)',
                        color: 'var(--bg-primary)',
                        padding: '12px 24px',
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        boxShadow: 'var(--card-shadow)'
                      }}
                    >
                      <Printer size={16} /> Print Official Copy
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Verification Failure Panel */
              <div className="glass-card" style={{
                borderRadius: 24,
                border: '1.5px solid #ef4444',
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(239, 68, 68, 0.05)'
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                }}>
                  <AlertCircle size={28} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Credential Record Not Found</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, maxWidth: 440, margin: '0 auto 24px' }}>
                  We were unable to locate any verification record for Certificate ID "{certId.toUpperCase()}". Please verify the code and check for spelling errors.
                </p>
                <div style={{
                  fontSize: 12,
                  background: 'var(--bg-secondary)',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 10,
                  display: 'inline-block',
                  color: 'var(--text-muted)'
                }}>
                  Note: Sample verifiable IDs include: <strong>ISC-DAT-9942</strong> or <strong>ISC-AI-5512</strong>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CertificateVerificationPage;
