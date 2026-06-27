import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, ShieldCheck, Mail, Lock, Phone, Key } from 'lucide-react';

const LoginPage = ({ setCurrentPage }) => {
  const [form, setForm] = useState({ credential: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [loginMethod, setLoginMethod] = useState('email'); 
  const [otpStep, setOtpStep] = useState('phone'); 
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  // Forgot Password States
  const [forgotStep, setForgotStep] = useState(null); // 'email', 'otp', 'reset'
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');

  const cleanPhone = (p) => String(p || "").replace(/\D/g, "").slice(-10);

  const normalizeUser = (user) => {
    if (!user) return { name: 'Profile', firstName: 'Profile' };
    const name = user.name || user.fullName || user.firstName || user.fname || user.first_name || '';
    const emailPrefix = user.email ? String(user.email).split('@')[0] : 'Profile';
    const firstName = String(user.firstName || user.fname || user.first_name || name || emailPrefix).trim().split(/\s+/)[0];

    return {
      ...user,
      name: name || user.name || emailPrefix,
      firstName
    };
  };

  const fetchAndStoreEnrolledCourses = async (token) => {
    try {
      const [premiumRes, freeRes] = await Promise.all([
        fetch('https://iscale-backend.onrender.com/api/enrolled-courses/premium-courses', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('https://iscale-backend.onrender.com/api/enrolled-courses/free-courses', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      let combined = [];
      if (premiumRes.ok) {
        const data = await premiumRes.json();
        if (data.status && Array.isArray(data.data)) {
          combined = [...combined, ...data.data];
        }
      }
      if (freeRes.ok) {
        const data = await freeRes.json();
        if (data.status && Array.isArray(data.data)) {
          combined = [...combined, ...data.data];
        }
      }
      const normalizeCourse = (apiCourse) => {
        const cObj = apiCourse.course_id || apiCourse;
        return {
          id: cObj._id || cObj.id || apiCourse._id,
          title: cObj.title || apiCourse.title || 'Enrolled Course',
          category: cObj.category || apiCourse.category || 'Course',
          img: cObj.thumbnail || cObj.banner || apiCourse.thumbnail || apiCourse.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
          progress: apiCourse.progress || cObj.progress || 0,
          date: apiCourse.createdAt || new Date().toISOString()
        };
      };
      
      const normalized = combined.map(normalizeCourse);
      
      localStorage.setItem('enrolled_courses', JSON.stringify(normalized));
      const ids = normalized.map(c => c.id).filter(Boolean);
      localStorage.setItem('enrolled_course_ids', JSON.stringify(ids));
    } catch (e) {
      console.error("Failed to fetch enrolled courses", e);
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!form.credential || !form.password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.credential, password: form.password })
      });

      const data = await response.json();
      if (data.status) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(normalizeUser(data.user)));
        
        await fetchAndStoreEnrolledCourses(data.token);
        
        setPopupMessage(`Welcome back! Preparing your customized dashboard...`);
        setShowSuccessPopup(true);
        setTimeout(() => setCurrentPage("dashboard"), 2200);
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      alert("Server Error. Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    const mobileNum = cleanPhone(phone);
    
    if (mobileNum.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setOtp(""); 

    try {
      setLoading(true);
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: Number(mobileNum) })
      });
      const data = await response.json();
      
      if (data.status) {
        setOtpStep('otp');
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      alert("Server Error. Unable to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD API HANDLERS ---
  const getIdentifierPayload = () => {
    const isPhone = /^\d{10}$/.test(forgotEmail.replace(/\D/g, ''));
    if (isPhone) {
      return { mobile: Number(forgotEmail.replace(/\D/g, '')) };
    }
    return { email: forgotEmail.trim() };
  };

  const handleSendForgotOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return alert("Please enter your email or phone");
    try {
      setLoading(true);
      const res = await fetch("https://iscale-backend.onrender.com/api/auth/send-forgot-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getIdentifierPayload())
      });
      const data = await res.json();
      if (data.status || res.ok) {
        setForgotStep('otp');
        alert("OTP Sent! Check your email or phone.");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyForgotOtp = async (e) => {
    e.preventDefault();
    if (!forgotOtp) return alert("Enter OTP");
    try {
      setLoading(true);
      const payload = { ...getIdentifierPayload(), otp: forgotOtp };
      const res = await fetch("https://iscale-backend.onrender.com/api/auth/verify-forgot-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status || res.ok) {
        setResetToken(data.token || data.resetToken || '');
        setForgotStep('reset');
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) return alert("Passwords must match");
    try {
      setLoading(true);
      const payload = { 
        ...getIdentifierPayload(), 
        otp: forgotOtp, 
        newPassword: newPassword, 
        password: newPassword,
        confirmPassword: confirmPassword,
        passwordConfirm: confirmPassword,
        confirm_password: confirmPassword,
        password_confirmation: confirmPassword,
        token: resetToken,
        resetToken: resetToken
      };
      
      const headers = { "Content-Type": "application/json" };
      if (resetToken) {
        headers["Authorization"] = `Bearer ${resetToken}`;
      }

      const res = await fetch("https://iscale-backend.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status || res.ok) {
        alert("Password reset successfully! You can now log in.");
        setForgotStep(null);
        setForgotEmail('');
        setForgotOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setResetToken('');
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (err) {
      alert("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    const mobileNum = cleanPhone(phone);
    const otpValue = String(otp).trim();

    if (otpValue.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: Number(mobileNum), otp: otpValue })
      });
      const data = await response.json();

      if (!data.status) {
        alert(data.message || "Invalid OTP");
        return;
      }

      const flowType = data.type || data.action;
      const authToken = data.token || data.registerToken;

      if (flowType === "login") {
        localStorage.setItem("token", authToken);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(normalizeUser(data.user)));
        }
        await fetchAndStoreEnrolledCourses(authToken);
        setPopupMessage("Welcome back!");
        setShowSuccessPopup(true);
        setTimeout(() => setCurrentPage("dashboard"), 1500);
      } 
      else if (flowType === "register") {
        localStorage.setItem("registerToken", authToken);
        setPopupMessage("OTP Verified! Complete your profile.");
        setShowSuccessPopup(true);
        setTimeout(() => setCurrentPage("register"), 1500);
      } 
      else {
        localStorage.setItem("token", authToken);
        await fetchAndStoreEnrolledCourses(authToken);
        setPopupMessage("Login Successful!");
        setShowSuccessPopup(true);
        setTimeout(() => setCurrentPage("dashboard"), 1500);
      }

    } catch (error) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const isOtpReady = String(otp).trim().length === 6;

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
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>
              {forgotStep ? 'Reset Password' : 'Welcome Back'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              {forgotStep ? 'Follow the steps to recover your account.' : 'Login to access your personalized dashboard.'}
            </p>
          </div>

          {!forgotStep && (
            <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: 12, padding: 4, marginBottom: 24, border: '1px solid var(--border-color)' }}>
              <div 
                onClick={() => { setLoginMethod('email'); setOtpStep('phone'); }}
                style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14, background: loginMethod === 'email' ? 'var(--card-bg)' : 'transparent', color: loginMethod === 'email' ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: loginMethod === 'email' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
                Login with Pass
              </div>
              <div 
                onClick={() => { setLoginMethod('phone'); setOtpStep('phone'); }}
                style={{ flex: 1, textAlign: 'center', padding: '12px 0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14, background: loginMethod === 'phone' ? 'var(--card-bg)' : 'transparent', color: loginMethod === 'phone' ? 'var(--text-primary)' : 'var(--text-secondary)', boxShadow: loginMethod === 'phone' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
                Login with OTP
              </div>
            </div>
          )}

          {!forgotStep && loginMethod === 'email' && (
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
                    style={{ width: '100%', padding: '14px 16px 14px 48px', border: '1.5px solid var(--border-color)', borderRadius: 12, fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
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
                    style={{ width: '100%', padding: '14px 48px', border: '1.5px solid var(--border-color)', borderRadius: 12, fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                  <div onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <span onClick={() => setForgotStep('email')} style={{ fontSize: 13, color: 'var(--red)', cursor: 'pointer', fontWeight: 600 }}>Forgot Password?</span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-shine" style={{ width: '100%', padding: '16px', background: 'var(--primary-gradient)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(37,99,235,0.2)', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Authenticating...' : 'Secure Login'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {!forgotStep && loginMethod === 'phone' && otpStep === 'phone' && (
            <form onSubmit={handleSendOTP}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="tel"
                    placeholder="Enter your 10-digit number"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    style={{ width: '100%', padding: '14px 16px 14px 48px', border: '1.5px solid var(--border-color)', borderRadius: 12, fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-shine" style={{ width: '100%', padding: '16px', background: 'var(--primary-gradient)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(37,99,235,0.2)', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Sending OTP...' : 'Send OTP'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {!forgotStep && loginMethod === 'phone' && otpStep === 'otp' && (
            <form onSubmit={handleVerifyOTP}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Enter Verification Code *</label>
                <div style={{ position: 'relative' }}>
                  <Key size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter the OTP sent to your phone"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    style={{ width: '100%', padding: '14px 16px 14px 48px', border: '1.5px solid var(--border-color)', borderRadius: 12, fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', letterSpacing: '2px', fontWeight: 'bold' }}
                  />
                </div>
                <div style={{ marginTop: 12, textAlign: 'right', fontSize: 13 }}>
                   <span style={{ color: 'var(--text-secondary)' }}>Didn't receive code? </span>
                   <span onClick={handleSendOTP} style={{ color: 'var(--blue)', cursor: loading ? 'default' : 'pointer', fontWeight: 600 }}>Resend OTP</span>
                </div>
              </div>
              <button type="submit" disabled={loading || !isOtpReady} className="btn-shine" style={{ width: '100%', padding: '16px', background: 'var(--primary-gradient)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(37,99,235,0.2)', cursor: loading || !isOtpReady ? 'not-allowed' : 'pointer', opacity: loading || !isOtpReady ? 0.7 : 1 }}>
                {loading ? 'Verifying...' : 'Verify & Login'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD VIEWS */}
          {forgotStep === 'email' && (
            <form onSubmit={handleSendForgotOtp}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Email or Phone *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" placeholder="Enter your email or phone" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required style={{ width: '100%', padding: '14px 16px 14px 48px', border: '1.5px solid var(--border-color)', borderRadius: 12, fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-shine" style={{ width: '100%', padding: '16px', background: 'var(--primary-gradient)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Sending OTP...' : 'Send Reset OTP'} <ArrowRight size={18} />
              </button>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <span onClick={() => setForgotStep(null)} style={{ fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}>Back to Login</span>
              </div>
            </form>
          )}

          {forgotStep === 'otp' && (
            <form onSubmit={handleVerifyForgotOtp}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Enter OTP Sent to {forgotEmail} *</label>
                <div style={{ position: 'relative' }}>
                  <Key size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" placeholder="Enter 6-digit OTP" value={forgotOtp} onChange={e => setForgotOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} required style={{ width: '100%', padding: '14px 16px 14px 48px', border: '1.5px solid var(--border-color)', borderRadius: 12, fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', letterSpacing: 4, fontWeight: 700 }} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-shine" style={{ width: '100%', padding: '16px', background: 'var(--primary-gradient)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Verifying...' : 'Verify OTP'} <ArrowRight size={18} />
              </button>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <span onClick={() => setForgotStep('email')} style={{ fontSize: 14, color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}>Back</span>
              </div>
            </form>
          )}

          {forgotStep === 'reset' && (
            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>New Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type={showPass ? "text" : "password"} placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required style={{ width: '100%', padding: '14px 48px', border: '1.5px solid var(--border-color)', borderRadius: 12, fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} />
                  <div onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Confirm New Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type={showPass ? "text" : "password"} placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '14px 48px', border: '1.5px solid var(--border-color)', borderRadius: 12, fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-shine" style={{ width: '100%', padding: '16px', background: 'var(--primary-gradient)', color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Resetting...' : 'Create New Password'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {!forgotStep && (
            <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
              Don't have an account?{' '}
              <span 
                onClick={() => { setLoginMethod('phone'); setOtpStep('phone'); }} 
                style={{ color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Register using Phone
              </span>
            </div>
          )}
        </div>
      </div>

      {showSuccessPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 24, padding: 40, maxWidth: 400, width: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
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