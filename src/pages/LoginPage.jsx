import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, ShieldCheck, Mail, Lock, Phone, Key } from 'lucide-react';

const LoginPage = ({ setCurrentPage }) => {
  const [form, setForm] = useState({ credential: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [otpStep, setOtpStep] = useState('phone'); // 'phone', 'register', 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [registerForm, setRegisterForm] = useState({ firstName: '', lastName: '', email: '', password: '', whatsapp: '', gender: 'Male' });

  const normalizeUser = (user) => {
    const name = user?.name || user?.fullName || user?.firstName || user?.fname || user?.first_name || '';
    const emailPrefix = user?.email ? String(user.email).split('@')[0] : 'Profile';
    const firstName = String(user?.firstName || user?.fname || user?.first_name || name || emailPrefix).trim().split(/\s+/)[0];

    return {
      ...user,
      name: name || user?.name || emailPrefix,
      firstName
    };
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!form.credential || !form.password) {
      alert("Please enter your email and password.");
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
        localStorage.setItem("user", JSON.stringify(normalizeUser(data.user)));
        
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

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone })
      });
      const data = await response.json();
      
      if (data.status) {
        setOtpStep('otp');
      } else {
        alert(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error. Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone, otp: otp })
      });
      const data = await response.json();

      if (!data.status) {
        alert(data.message || "Invalid OTP");
        return;
      }

      if (data.type === "login") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(normalizeUser(data.user)));
        
        setPopupMessage("Welcome back!");
        setShowSuccessPopup(true);
        setTimeout(() => {
          setCurrentPage("dashboard");
        }, 1500);
      }

      if (data.type === "register") {
        localStorage.setItem("registerToken", data.token);

        setPopupMessage("OTP Verified! Complete your profile.");
        setShowSuccessPopup(true);
        setTimeout(() => {
          setCurrentPage("register");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dots" style={{ minHeight: '90vh', background: 'var(--gradient-hero)', display: 'flex', alignItems: 'center', padding: '60px 0', color: 'var(--text-primary)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        
        <div className="glass-card" style={{
          width: '100%', maxWidth: 500,
          borderRadius: 24, padding: 48,
          animation: 'fadeUp 0.6s ease forwards',
          boxShadow: 'var(--card-shadow)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', padding: 12, background: 'rgba(37,99,235,0.08)', borderRadius: 16, color: 'var(--red)', marginBottom: 16 }}>
              <ShieldCheck size={32} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Login to access your personalized dashboard.</p>
          </div>

          <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: 12, padding: 4, marginBottom: 24, border: '1px solid var(--border-color)' }}>
            <div 
              onClick={() => { setLoginMethod('email'); setOtpStep('phone'); }}
              style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14, background: loginMethod === 'email' ? 'var(--card-bg)' : 'transparent', color: loginMethod === 'email' ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: loginMethod === 'email' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
              Email & Password
            </div>
            <div 
              onClick={() => { setLoginMethod('phone'); setOtpStep('phone'); }}
              style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14, background: loginMethod === 'phone' ? 'var(--card-bg)' : 'transparent', color: loginMethod === 'phone' ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: loginMethod === 'phone' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
              Phone & OTP
            </div>
          </div>

          {loginMethod === 'email' && (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.credential}
                    onChange={e => setForm({ ...form, credential: e.target.value })}
                    style={{
                      width: '100%', padding: '14px 16px 14px 48px',
                      border: '1.5px solid var(--border-color)', borderRadius: 12,
                      fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    style={{
                      width: '100%', padding: '14px 48px',
                      border: '1.5px solid var(--border-color)', borderRadius: 12,
                      fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                    }}
                  />
                  <div 
                    onClick={() => setShowPass(!showPass)} 
                    style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-shine"
                style={{
                  width: '100%', padding: '16px',
                  background: 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                  color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 16px rgba(37,99,235,0.2)', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Authenticating...' : 'Secure Login'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {loginMethod === 'phone' && otpStep === 'phone' && (
            <form onSubmit={handleSendOTP}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="tel"
                    placeholder="Enter your 10-digit number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '14px 16px 14px 48px',
                      border: '1.5px solid var(--border-color)', borderRadius: 12,
                      fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-shine"
                style={{
                  width: '100%', padding: '16px',
                  background: 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                  color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 16px rgba(37,99,235,0.2)', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {loginMethod === 'phone' && otpStep === 'otp' && (
            <form onSubmit={handleVerifyOTP}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Enter Verification Code *</label>
                <div style={{ position: 'relative' }}>
                  <Key size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Enter the OTP sent to your phone"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '14px 16px 14px 48px',
                      border: '1.5px solid var(--border-color)', borderRadius: 12,
                      fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none',
                      letterSpacing: '2px', fontWeight: 'bold'
                    }}
                  />
                </div>
                <div style={{ marginTop: 12, textAlign: 'right', fontSize: 13 }}>
                   <span style={{ color: 'var(--text-secondary)' }}>Didn't receive code? </span>
                   <span onClick={handleSendOTP} style={{ color: 'var(--blue)', cursor: loading ? 'default' : 'pointer', fontWeight: 600 }}>Resend OTP</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-shine"
                style={{
                  width: '100%', padding: '16px',
                  background: 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                  color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 16px rgba(37,99,235,0.2)', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Verifying...' : 'Verify & Login'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <span 
              onClick={() => setCurrentPage("register")} 
              style={{ color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Register here
            </span>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 40,
            maxWidth: 400, width: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            animation: 'scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <ShieldCheck size={40} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Authentication Successful</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
