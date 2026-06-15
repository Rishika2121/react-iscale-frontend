import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, ShieldCheck, Mail, Phone, Lock, Edit2, ArrowLeft, Check, Sparkles, BookOpen, Layers, Award } from 'lucide-react';
import MockOTPNotification from '../components/MockOTPNotification';

const AuthPage = ({ setCurrentPage }) => {
  // 'check' | 'login_selection' | 'login_password' | 'login_otp' | 'register_otp' | 'register_profile' | 'register_survey'
  // 'forgot_password_email' | 'forgot_password_otp' | 'forgot_password_reset'
  const [authMode, setAuthMode] = useState('check');
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  
  // OTP States
  const [showNotification, setShowNotification] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('123456');
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Registration States
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'male',
    agreed: true
  });
  const [survey, setSurvey] = useState({
    objective: '',
    experience: ''
  });

  const handleCheckUser = () => {
    if (!identifier) {
      alert("Please enter your Mobile Number or Email Address");
      return;
    }
    setLoading(true);
    // Simulate Check for now since no check API
    setTimeout(() => {
      setLoading(false);
      if (identifier.endsWith('1')) {
        setAuthMode('login_selection');
      } else {
        setAuthMode('register_otp');
        triggerOtpSend();
      }
    }, 800);
  };

  const triggerOtpSend = () => {
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setShowNotification(true);
    }, 1000);
  };

  const handleVerifyOtp = async (nextState) => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    setVerifyingOtp(true);
    
    // Mock check for testing
    if (otp === generatedOtp || otp === '123456') {
      setVerifyingOtp(false);
      setShowNotification(false);
      if (nextState === 'success') handleSuccess("Welcome back! Verified via secure OTP...");
      else setAuthMode(nextState);
      return;
    }

    // Real API Check
    try {
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, otp })
      });
      const data = await response.json();
      if (data.status || data.success) {
        setShowNotification(false);
        if (nextState === 'success') {
          if (data.token) localStorage.setItem("token", data.token);
          if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
          handleSuccess("Welcome back! Verified via secure OTP...");
        } else {
          setAuthMode(nextState);
        }
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error. Unable to verify OTP.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handlePasswordLogin = async () => {
    if (!password) {
      alert("Please enter your password.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password })
      });
      const data = await response.json();
      if (data.status || data.token) {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        handleSuccess("Welcome back! Preparing your customized dashboard...");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error. Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fname: regForm.firstName,
          lname: regForm.lastName,
          email: regForm.email,
          password: password,
          contact: Number(identifier.replace(/\D/g, '')) || 0,
          whatsapp: Number(identifier.replace(/\D/g, '')) || 0,
          gender: regForm.gender,
          c_current_state: "000000000000000000000000",
          c_current_city: "000000000000000000000000",
          c_user_refer_by: "000000000000000000000000"
        })
      });
      const data = await response.json();
      if (data.status || data.token) {
        localStorage.setItem("user_survey", JSON.stringify(survey));
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        handleSuccess("Your account has been created successfully. Redirecting you to dashboard...");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error. Unable to register.");
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD FLOW ---
  const handleSendForgotOtp = async () => {
    const emailToUse = forgotEmail || identifier;
    if (!emailToUse) {
      alert("Please enter your email.");
      return;
    }
    setSendingOtp(true);
    try {
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/send-forgot-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToUse })
      });
      const data = await response.json();
      if (data.status || data.success) {
        setAuthMode("forgot_password_otp");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyForgotOtp = async () => {
    if (!forgotOtp) return alert("Enter OTP");
    setVerifyingOtp(true);
    try {
      const emailToUse = forgotEmail || identifier;
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/verify-forgot-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToUse, otp: forgotOtp })
      });
      const data = await response.json();
      if (data.status || data.success) {
        setAuthMode("forgot_password_reset");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword) return alert("Enter new password");
    setLoading(true);
    try {
      const emailToUse = forgotEmail || identifier;
      const response = await fetch("https://iscale-backend.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToUse, otp: forgotOtp, newPassword })
      });
      const data = await response.json();
      if (data.status || data.success) {
        alert("Password reset successfully! Please login with your new password.");
        setAuthMode("login_password");
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (msg) => {
    setPopupMessage(msg);
    setShowSuccessPopup(true);
    setTimeout(() => {
      const redirect = localStorage.getItem("redirectAfterLogin");
      if (redirect) {
        localStorage.removeItem("redirectAfterLogin");
        setCurrentPage(redirect);
      } else {
        setCurrentPage("dashboard");
      }
    }, 2200);
  };

  return (
    <div className="bg-dots" style={{ minHeight: "90vh", background: "var(--gradient-hero)", display: "flex", alignItems: "center", padding: "60px 0", color: "var(--text-primary)" }}>
      <MockOTPNotification 
        isVisible={showNotification} 
        contact={identifier} 
        otp={generatedOtp} 
        onClose={() => setShowNotification(false)} 
      />
      <div className="container mobile-col" style={{ display: "flex", gap: 60, alignItems: "center", justifyContent: "center" }}>
        
        {/* Form panel */}
        <div className="glass-card" style={{ flex: 1.2, width: "100%", maxWidth: 500, borderRadius: 24, padding: 48, animation: "fadeUp 0.6s ease forwards", boxShadow: "var(--card-shadow)" }}>
          
          {authMode === "check" && (
            <div style={{ animation: "fadeUp 0.3s ease both" }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)" }}>Get Started</h1>
              <p style={{ color: "var(--text-secondary)", marginBottom: 36, fontSize: 14 }}>
                Enter your mobile number or email to login or create an account.
                <br/><span style={{fontSize: 12, color: "var(--text-muted)"}}>(Demo Check: End with "1" to simulate existing user)</span>
              </p>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, fontWeight: 500 }}>Mobile Number or Email *</label>
                <div style={{ position: "relative" }}>
                  <input type="text" placeholder="Enter your identifier" value={identifier} onChange={e => setIdentifier(e.target.value)} style={{ width: "100%", padding: "14px 16px", border: "1.5px solid var(--border-color)", borderRadius: 12, fontSize: 15, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} onKeyDown={e => e.key === "Enter" && handleCheckUser()} />
                </div>
              </div>

              <button className="btn-shine" onClick={handleCheckUser} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "var(--border-color)" : "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: loading ? "none" : "0 4px 16px rgba(37,99,235,0.2)", cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Checking..." : "Continue"} <ArrowRight size={18} />
              </button>
            </div>
          )}

          {authMode === "login_selection" && (
            <div style={{ animation: "fadeUp 0.3s ease both" }}>
              <button onClick={() => setAuthMode("check")} style={{ background: "none", border: "none", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", marginBottom: 20 }}><ArrowLeft size={14} /> Back</button>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)" }}>Welcome Back!</h1>
              <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: 14 }}>Account found for <strong>{identifier}</strong>. How would you like to login?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button className="btn-shine" onClick={() => setAuthMode("login_password")} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(37,99,235,0.2)", cursor: "pointer" }}>Login with Password <Lock size={18} /></button>
                <button onClick={() => { setAuthMode("login_otp"); triggerOtpSend(); }} style={{ width: "100%", padding: "16px", background: "transparent", border: "1.5px solid var(--border-color)", color: "var(--text-primary)", borderRadius: 12, fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", transition: "all 0.2s" }}>Login via OTP</button>
              </div>
            </div>
          )}

          {authMode === "login_password" && (
            <div style={{ animation: "fadeUp 0.3s ease both" }}>
              <button onClick={() => setAuthMode("login_selection")} style={{ background: "none", border: "none", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", marginBottom: 20 }}><ArrowLeft size={14} /> Back</button>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)" }}>Enter Password</h1>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, fontWeight: 500 }}>Password *</label>
                <div style={{ position: "relative" }}>
                  <input type={showPass ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "14px 44px 14px 16px", border: "1.5px solid var(--border-color)", borderRadius: 12, fontSize: 15, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} onKeyDown={e => e.key === "Enter" && handlePasswordLogin()} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 8 }}>
                  <button onClick={() => { setForgotEmail(identifier); setAuthMode("forgot_password_email"); }} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Forgot Password?</button>
                </div>
              </div>
              <button className="btn-shine" onClick={handlePasswordLogin} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "var(--border-color)" : "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", cursor: loading ? "not-allowed" : "pointer" }}>{loading ? "Logging in..." : "Log In"}</button>
            </div>
          )}

          {/* FORGOT PASSWORD FLOW */}
          {authMode === "forgot_password_email" && (
            <div style={{ animation: "fadeUp 0.3s ease both" }}>
              <button onClick={() => setAuthMode("login_password")} style={{ background: "none", border: "none", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", marginBottom: 20 }}><ArrowLeft size={14} /> Back</button>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)" }}>Reset Password</h1>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, fontWeight: 500 }}>Email Address *</label>
                <input type="text" placeholder="Enter your email" value={forgotEmail || identifier} onChange={e => setForgotEmail(e.target.value)} style={{ width: "100%", padding: "14px 16px", border: "1.5px solid var(--border-color)", borderRadius: 12, fontSize: 15, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} />
              </div>
              <button className="btn-shine" onClick={handleSendForgotOtp} disabled={sendingOtp} style={{ width: "100%", padding: "16px", background: sendingOtp ? "var(--border-color)" : "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", cursor: sendingOtp ? "not-allowed" : "pointer" }}>{sendingOtp ? "Sending OTP..." : "Send Reset OTP"}</button>
            </div>
          )}

          {authMode === "forgot_password_otp" && (
            <div style={{ animation: "fadeUp 0.3s ease both" }}>
              <button onClick={() => setAuthMode("forgot_password_email")} style={{ background: "none", border: "none", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", marginBottom: 20 }}><ArrowLeft size={14} /> Back</button>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)" }}>Verify Reset OTP</h1>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, fontWeight: 500 }}>Enter OTP sent to email</label>
                <input type="text" maxLength={6} placeholder="OTP" value={forgotOtp} onChange={e => setForgotOtp(e.target.value.replace(/\D/g, ''))} style={{ width: "100%", padding: "14px 16px", letterSpacing: 8, textAlign: "center", border: "1.5px solid var(--red)", borderRadius: 12, fontSize: 18, fontWeight: 800, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} />
              </div>
              <button className="btn-shine" onClick={handleVerifyForgotOtp} disabled={verifyingOtp} style={{ width: "100%", padding: "16px", background: verifyingOtp ? "var(--border-color)" : "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", cursor: verifyingOtp ? "not-allowed" : "pointer" }}>{verifyingOtp ? "Verifying..." : "Verify OTP"}</button>
            </div>
          )}

          {authMode === "forgot_password_reset" && (
            <div style={{ animation: "fadeUp 0.3s ease both" }}>
              <button onClick={() => setAuthMode("forgot_password_otp")} style={{ background: "none", border: "none", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", marginBottom: 20 }}><ArrowLeft size={14} /> Back</button>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)" }}>Create New Password</h1>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, fontWeight: 500 }}>New Password *</label>
                <div style={{ position: "relative" }}>
                  <input type={showPass ? "text" : "password"} placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{ width: "100%", padding: "14px 44px 14px 16px", border: "1.5px solid var(--border-color)", borderRadius: 12, fontSize: 15, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
              </div>
              <button className="btn-shine" onClick={handleResetPassword} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "var(--border-color)" : "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", cursor: loading ? "not-allowed" : "pointer" }}>{loading ? "Resetting..." : "Reset Password"}</button>
            </div>
          )}

          {(authMode === "login_otp" || authMode === "register_otp") && (
            <div style={{ animation: "fadeUp 0.3s ease both" }}>
              <button onClick={() => setAuthMode(authMode === "login_otp" ? "login_selection" : "check")} style={{ background: "none", border: "none", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", marginBottom: 20 }}><ArrowLeft size={14} /> Back</button>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)" }}>Verify OTP</h1>
              <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: 14 }}>{authMode === "register_otp" ? "Looks like you are new here! " : ""}We sent a secure code to <strong>{identifier}</strong>.</p>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, fontWeight: 500 }}>Enter 6-Digit OTP *</label>
                <input type="text" maxLength={6} placeholder="Enter verification code" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} style={{ width: "100%", padding: "14px 16px", letterSpacing: 8, textAlign: "center", border: "1.5px solid var(--red)", borderRadius: 12, fontSize: 18, fontWeight: 800, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} onKeyDown={e => e.key === "Enter" && handleVerifyOtp(authMode === "login_otp" ? "success" : "register_profile")} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 12 }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>Check your simulated notification</span>
                  <button onClick={triggerOtpSend} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontWeight: 700 }}>Resend OTP</button>
                </div>
              </div>
              <button className="btn-shine" onClick={() => handleVerifyOtp(authMode === "login_otp" ? "success" : "register_profile")} disabled={verifyingOtp} style={{ width: "100%", padding: "16px", background: verifyingOtp ? "var(--border-color)" : "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "none", cursor: verifyingOtp ? "not-allowed" : "pointer" }}>{verifyingOtp ? "Verifying..." : "Verify OTP"}</button>
            </div>
          )}

          {authMode === "register_profile" && (
            <div style={{ animation: "fadeUp 0.3s ease both" }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800, marginBottom: 6 }}>Create Profile</h1>
              <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: 14 }}>Let's fill in your basic information to set up the account.</p>
              <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}><label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>First Name *</label><input placeholder="John" value={regForm.firstName} onChange={e => setRegForm({ ...regForm, firstName: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid var(--border-color)", borderRadius: 10, fontSize: 14, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} /></div>
                <div style={{ flex: 1 }}><label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Last Name *</label><input placeholder="Doe" value={regForm.lastName} onChange={e => setRegForm({ ...regForm, lastName: e.target.value })} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid var(--border-color)", borderRadius: 10, fontSize: 14, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} /></div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Email Address *</label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input type="email" placeholder="john@example.com" value={regForm.email} onChange={e => setRegForm({ ...regForm, email: e.target.value })} style={{ width: "100%", padding: "12px 14px 12px 38px", border: "1.5px solid var(--border-color)", borderRadius: 10, fontSize: 14, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>Create Password *</label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input type={showPass ? "text" : "password"} placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "12px 14px 12px 38px", border: "1.5px solid var(--border-color)", borderRadius: 10, fontSize: 14, background: "var(--bg-secondary)", color: "var(--text-primary)", outline: "none" }} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>Gender *</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {['Male', 'Female', 'Others'].map(g => (
                    <button key={g} onClick={() => setRegForm({ ...regForm, gender: g.toLowerCase() })} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "1.5px solid " + (regForm.gender === g.toLowerCase() ? "var(--red)" : "var(--border-color)"), background: regForm.gender === g.toLowerCase() ? "rgba(37,99,235,0.04)" : "transparent", color: regForm.gender === g.toLowerCase() ? "var(--red)" : "var(--text-primary)", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>{g}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => setAuthMode("register_survey")} disabled={!regForm.firstName || !regForm.lastName || !regForm.email || !password} style={{ width: "100%", padding: "16px", background: (!regForm.firstName || !regForm.lastName || !regForm.email || !password) ? "var(--border-color)" : "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, cursor: (!regForm.firstName || !regForm.lastName || !regForm.email || !password) ? "not-allowed" : "pointer" }}>Next Step</button>
            </div>
          )}

          {authMode === "register_survey" && (
            <div style={{ animation: "fadeUp 0.5s ease both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--red)", marginBottom: 8 }}><Sparkles size={20} /><span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}>Tailor Your Journey</span></div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Quick Career Survey</h1>
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>1. Primary career objective?</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { key: 'job', label: 'Secure Placement', desc: 'Looking for jobs', icon: Award },
                    { key: 'switch', label: 'Career Switch', desc: 'From non-tech', icon: Layers },
                    { key: 'upskill', label: 'Upskill', desc: 'Learn latest tools', icon: Sparkles },
                    { key: 'learn', label: 'Academic Prep', desc: 'College practice', icon: BookOpen }
                  ].map((obj) => {
                    const Icon = obj.icon; const isActive = survey.objective === obj.key;
                    return (
                      <div key={obj.key} onClick={() => setSurvey({ ...survey, objective: obj.key })} style={{ border: "1.5px solid " + (isActive ? "var(--red)" : "var(--border-color)"), borderRadius: 14, padding: "12px", cursor: "pointer", background: isActive ? "rgba(37,99,235,0.03)" : "var(--bg-secondary)", display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
                        {isActive && <div style={{ position: "absolute", top: 10, right: 10, background: "var(--red)", color: "#fff", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={10} strokeWidth={3} /></div>}
                        <div style={{ color: isActive ? "var(--red)" : "var(--text-muted)" }}><Icon size={18} /></div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)" }}>{obj.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ marginBottom: 30 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>2. Coding experience?</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { key: 'beginner', title: 'Beginner', desc: 'No programming background' },
                    { key: 'intermediate', title: 'Intermediate', desc: 'Basic Python / SQL' },
                    { key: 'pro', title: 'Professional', desc: 'Work actively as developer' }
                  ].map((exp) => {
                    const isActive = survey.experience === exp.key;
                    return (
                      <div key={exp.key} onClick={() => setSurvey({ ...survey, experience: exp.key })} style={{ border: "1.5px solid " + (isActive ? "var(--red)" : "var(--border-color)"), borderRadius: 12, padding: "14px 18px", cursor: "pointer", background: isActive ? "rgba(37,99,235,0.03)" : "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ textAlign: "left" }}><span style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)", display: "block" }}>{exp.title}</span></div>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid " + (isActive ? "var(--red)" : "var(--border-color)"), background: isActive ? "var(--red)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {isActive && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--card-bg)" }} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <button onClick={() => setAuthMode("register_profile")} style={{ flex: 1, padding: "14px", background: "transparent", border: "1.5px solid var(--border-color)", borderRadius: 12, color: "var(--text-primary)", fontWeight: 700, cursor: "pointer" }}>Back</button>
                <button onClick={handleFinalRegister} disabled={loading || !survey.objective || !survey.experience} style={{ flex: 2, padding: "14px", background: (!survey.objective || !survey.experience || loading) ? "var(--border-color)" : "linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: (!survey.objective || !survey.experience || loading) ? "not-allowed" : "pointer" }}>
                  {loading ? "Registering..." : "Complete Registration"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, width: "100%", textAlign: "center", animation: "fadeUp 0.6s 0.2s ease both", maxWidth: 440 }}>
          <div style={{ width: 260, height: 260, margin: "0 auto 32px", background: "var(--gradient-pink)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", border: "1px solid var(--border-color)" }}>
            <div style={{ position: "relative", textAlign: "center" }}>
              <div style={{ fontSize: 72 }}>🔐</div>
              <div style={{ position: "absolute", top: -20, right: -40, background: "var(--red)", borderRadius: 12, padding: "6px 12px", boxShadow: "0 4px 16px rgba(192,0,12,0.3)", color: "#fff", fontSize: 11, fontWeight: 800 }}>SECURE</div>
            </div>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 12, color: "var(--text-primary)" }}>Welcome to <span className="text-gradient">iScale</span></h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.6, maxWidth: 360, margin: "0 auto" }}>Access your courses, check placement analytics, and start coding where you left off.</p>
        </div>
      </div>

      {showSuccessPopup && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}>
          <div style={{ background: "var(--card-bg)", border: "1.5px solid var(--border-color)", borderRadius: 24, padding: 40, width: "100%", maxWidth: 400, textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.3)", animation: "fadeUp 0.4s both" }}>
            <div style={{ width: 72, height: 72, background: "rgba(34, 197, 94, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e", margin: "0 auto 20px" }}><Check size={36} strokeWidth={3} /></div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>Success!</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
