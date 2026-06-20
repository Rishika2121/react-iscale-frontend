import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

const RegisterPage = ({ setCurrentPage }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const registerToken = localStorage.getItem("registerToken");
    if (!registerToken) {
      setCurrentPage("login");
    }
  }, [setCurrentPage]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerToken = localStorage.getItem("registerToken");

    if (!registerToken) {
      alert("Session expired, please login again");
      setCurrentPage("login");
      return;
    }

    try {
      setLoading(true);

      const nameParts = form.name.trim().split(" ");
      const fname = nameParts[0] || "";
      const lname = nameParts.slice(1).join(" ") || "";

      const res = await fetch(
        "https://iscale-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${registerToken}`,
          },
          body: JSON.stringify({
            fname,
            lname,
            email: form.email,
            password: form.password,
            gender: "other",
            c_current_state: "000000000000000000000000",
            c_current_city: "000000000000000000000000",
            c_user_refer_by: "000000000000000000000000",
          }),
        }
      );

      const data = await res.json();

      if (data.status && data.token) {
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        localStorage.removeItem("registerToken");

        setPopupMessage("Account created successfully!");
        setShowSuccessPopup(true);

        setTimeout(() => {
          setCurrentPage("dashboard");
        }, 2000);
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
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
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Create Account</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              Register to start your learning journey.
            </p>
          </div>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%', padding: '14px 16px 14px 48px',
                    border: '1.5px solid var(--border-color)', borderRadius: 12,
                    fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: '100%', padding: '14px 16px 14px 48px',
                    border: '1.5px solid var(--border-color)', borderRadius: 12,
                    fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 600 }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Create a password"
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
              {loading ? 'Registering...' : 'Register'} <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <span 
              onClick={() => setCurrentPage("login")} 
              style={{ color: 'var(--blue)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Login here
            </span>
          </div>
        </div>
      </div>

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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Registration Successful</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
