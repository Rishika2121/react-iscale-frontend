import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, ShieldCheck, Mail, Phone, Lock, Edit2, ArrowLeft, Check } from 'lucide-react';
import MockOTPNotification from '../components/MockOTPNotification';


const LoginPage = ({ setCurrentPage }) => {
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({ credential: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  
  // OTP States
  const [showNotification, setShowNotification] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('123456');
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const handleNextPage = () => {
    if (!form.credential) {
      alert("Please enter your Mobile Number or Email Address");
      return;
    }
    setPage(2);
  };

  const handleSendOtp = () => {
    if (!form.credential) {
      alert("Please enter your Mobile Number or Email Address");
      return;
    }
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setShowNotification(true);
      setPage(3); // OTP Page
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp !== generatedOtp && otp !== '123456') {
      alert("Invalid OTP! Please check your simulated notification.");
      return;
    }
    setVerifyingOtp(true);
    setTimeout(() => {
      setVerifyingOtp(false);
      setShowNotification(false);
      handleMockOtpLoginSuccess();
    }, 800);
  };

  const handleMockOtpLoginSuccess = () => {
    setPopupMessage(`Welcome back! Verified via secure OTP...`);
    setShowSuccessPopup(true);
    setTimeout(() => {
      const redirect = localStorage.getItem('redirectAfterLogin');
      if (redirect) {
        localStorage.removeItem('redirectAfterLogin');
        setCurrentPage(redirect);
      } else {
        setCurrentPage("dashboard");
      }
    }, 2200);
  };

  const handleLogin = async () => {
    if (!form.password) {
      alert("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://iscale-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: form.credential,
            password: form.password
          })
        }
      );

      const data = await response.json();
      console.log("Login Response:", data);

      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setPopupMessage(`Welcome back! Preparing your customized dashboard...`);
        setShowSuccessPopup(true);
        setTimeout(() => {
          const redirect = localStorage.getItem('redirectAfterLogin');
          if (redirect) {
            localStorage.removeItem('redirectAfterLogin');
            setCurrentPage(redirect);
          } else {
            setCurrentPage("dashboard");
          }
        }, 2200);
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error. Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dots" style={{ minHeight: '90vh', background: 'var(--gradient-hero)', display: 'flex', alignItems: 'center', padding: '60px 0', color: 'var(--text-primary)' }}>
      <MockOTPNotification 
        isVisible={showNotification} 
        contact={form.credential} 
        otp={generatedOtp} 
        onClose={() => setShowNotification(false)} 
      />
      <div className="container mobile-col" style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Form panel */}
        <div className="glass-card" style={{
          flex: 1.2, width: '100%', maxWidth: 500,
          borderRadius: 24, padding: 48,
          animation: 'fadeUp 0.6s ease forwards',
          boxShadow: 'var(--card-shadow)'
        }}>
          
          {/* PAGE 1: CREDENTIAL INPUT */}
          {page === 1 && (
            <div style={{ animation: 'fadeUp 0.3s ease both' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Login</h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 36, fontSize: 14 }}>Welcome back! Enter your identifier to begin.</p>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>Mobile Number or Email *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={form.credential}
                    onChange={e => setForm({ ...form, credential: e.target.value })}
                    style={{
                      width: '100%', padding: '14px 16px',
                      border: '1.5px solid var(--border-color)', borderRadius: 12,
                      fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                    }}
                    onKeyDown={e => e.key === 'Enter' && handleNextPage()}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 8 }}>
                  <button 
                    onClick={() => alert('Email recovery helper: Please contact system administrator.')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Forgot Email?
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  className="btn-shine"
                  onClick={handleNextPage}
                  style={{
                    flex: 1, padding: '16px',
                    background: 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                    color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 4px 16px rgba(37,99,235,0.2)', cursor: 'pointer'
                  }}
                >
                  Password <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  style={{
                    flex: 1, padding: '16px',
                    background: 'transparent', border: '1.5px solid var(--border-color)',
                    color: 'var(--text-primary)', borderRadius: 12, fontWeight: 700, fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {sendingOtp ? 'Sending...' : 'Login via OTP'}
                </button>
              </div>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '30px 0 20px' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Or sign in with</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
              </div>

              {/* Social Login Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button 
                  onClick={() => alert('Google authentication integration setup required.')}
                  style={{
                    width: '100%', padding: '12px', border: '1.5px solid var(--border-color)',
                    borderRadius: 12, background: 'var(--card-bg)', color: 'var(--text-primary)', fontWeight: 600, fontSize: 14,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontWeight: 800, color: '#4285F4' }}>G</span> Continue with Google
                </button>
                <button 
                  onClick={() => alert('Microsoft Outlook authentication integration setup required.')}
                  style={{
                    width: '100%', padding: '12px', border: '1.5px solid var(--border-color)',
                    borderRadius: 12, background: 'var(--card-bg)', color: 'var(--text-primary)', fontWeight: 600, fontSize: 14,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontWeight: 800, color: '#0078d4' }}>O</span> Continue with Outlook
                </button>
              </div>
            </div>
          )}

          {/* PAGE 2: PASSWORD INPUT */}
          {page === 2 && (
            <div style={{ animation: 'fadeUp 0.3s ease both' }}>
              <button 
                onClick={() => setPage(1)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', marginBottom: 20 }}
              >
                <ArrowLeft size={14} /> Back to identifier
              </button>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Enter Password</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border-color)', marginBottom: 24 }}>
                <div style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {form.credential}
                </div>
                <button 
                  onClick={() => setPage(1)} 
                  style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', display: 'flex' }}
                  title="Edit details"
                >
                  <Edit2 size={13} />
                </button>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    style={{
                      width: '100%', padding: '14px 44px 14px 16px',
                      border: '1.5px solid var(--border-color)', borderRadius: 12,
                      fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                    }}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex'
                    }}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 8 }}>
                  <button 
                    onClick={() => alert('Password reset helper: Please contact system administrator.')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <button
                className="btn-shine"
                onClick={handleLogin}
                disabled={loading}
                style={{
                  width: '100%', padding: '16px',
                  background: loading ? 'var(--border-color)' : 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                  color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(37,99,235,0.2)', cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                ) : (
                  <>Log In <ArrowRight size={18} /></>
                )}
              </button>
            </div>
          )}

          {/* PAGE 3: OTP VERIFICATION */}
          {page === 3 && (
            <div style={{ animation: 'fadeUp 0.3s ease both' }}>
              <button 
                onClick={() => setPage(1)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', marginBottom: 20 }}
              >
                <ArrowLeft size={14} /> Back to identifier
              </button>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Verify OTP</h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>
                We sent a secure code to <strong>{form.credential}</strong>.
              </p>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>Enter 6-Digit OTP *</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter verification code"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '100%', padding: '14px 16px', letterSpacing: 8, textAlign: 'center',
                    border: '1.5px solid var(--red)', borderRadius: 12, fontSize: 18, fontWeight: 800,
                    background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                  }}
                  onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12 }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Check your simulated notification</span>
                  <button onClick={handleSendOtp} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 700 }}>Resend OTP</button>
                </div>
              </div>

              <button
                className="btn-shine"
                onClick={handleVerifyOtp}
                disabled={verifyingOtp}
                style={{
                  width: '100%', padding: '16px',
                  background: verifyingOtp ? 'var(--border-color)' : 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                  color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: verifyingOtp ? 'none' : '0 4px 16px rgba(37,99,235,0.2)', cursor: verifyingOtp ? 'not-allowed' : 'pointer'
                }}
              >
                {verifyingOtp ? (
                  <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                ) : (
                  <>Verify & Log In <Check size={18} /></>
                )}
              </button>
            </div>
          )}

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <button onClick={() => setCurrentPage('register')} style={{ background: 'none', border: 'none', color: 'var(--red)', fontWeight: 700, cursor: 'pointer' }}>
              Register Now
            </button>
          </p>
        </div>

        {/* Illustration Panel */}
        <div style={{ flex: 1, width: '100%', textAlign: 'center', animation: 'fadeUp 0.6s 0.2s ease both', maxWidth: 440 }}>
          <div style={{
            width: 260, height: 260, margin: '0 auto 32px',
            background: 'var(--gradient-pink)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            border: '1px solid var(--border-color)'
          }}>
            {/* Sign-in illustration */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ fontSize: 72 }}>🔐</div>
              <div style={{
                position: 'absolute', top: -20, right: -40,
                background: 'var(--red)', borderRadius: 12, padding: '6px 12px',
                boxShadow: '0 4px 16px rgba(192,0,12,0.3)', color: '#fff', fontSize: 11, fontWeight: 800
              }}>
                SIGN IN
              </div>
              <div style={{
                position: 'absolute', bottom: -20, left: -40,
                background: 'var(--card-bg)', borderRadius: 12, padding: '8px 12px',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ color: 'var(--text-primary)', fontSize: 11, fontWeight: 600 }}>🔑 Secure Login</div>
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 12, color: 'var(--text-primary)' }}>
            Welcome Back to <span className="text-gradient">iScale</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, maxWidth: 360, margin: '0 auto' }}>
            Access your courses, check placement analytics, and start coding where you left off.
          </p>
        </div>
      </div>

      {showSuccessPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: 20
        }}>
          <style>{`
            @keyframes fadeScaleUp {
              from { opacity: 0; transform: scale(0.9); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
          <div style={{
            background: 'var(--card-bg)',
            border: '1.5px solid var(--border-color)',
            borderRadius: 24, padding: 40, width: '100%', maxWidth: 400,
            textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            animation: 'fadeScaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
            position: 'relative'
          }}>
            <div style={{
              width: 72, height: 72, background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#22c55e', margin: '0 auto 20px',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)'
            }}>
              <Check size={36} strokeWidth={3} style={{ color: '#22c55e' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Login Successful!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>{popupMessage}</p>
            <button
              onClick={() => setCurrentPage("dashboard")}
              style={{
                width: '100%', padding: '14px', background: '#22c55e', color: '#fff',
                border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)', transition: 'all 0.2s'
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;
