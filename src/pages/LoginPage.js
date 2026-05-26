import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ setCurrentPage }) => {
  const [form, setForm] = useState({ credential: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleLogin = async () => {

  if (!form.credential || !form.password) {
    alert("Please fill in all fields.");
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

    console.log(data);

    if (data.status) {

      // Save token
      localStorage.setItem("token", data.token);

      // Save user data
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login Successful");

      // Redirect after login
      setCurrentPage("dashboard");

    } else {

      alert(data.message || "Login Failed");

    }

  } catch (error) {

    console.log(error);

    // Fallback/Mock login for demo/testing when API fails or is offline
   alert("Server Error");
console.log(error);

  } finally {

    setLoading(false);

  }
};
    

  return (
    <div style={{ minHeight: '90vh', background: 'var(--gradient-hero)', display: 'flex', alignItems: 'center', padding: '60px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        {/* Form */}
        <div style={{
          background: '#fff', borderRadius: 24, padding: 48,
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
          animation: 'fadeUp 0.6s ease forwards'
        }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Login</h1>
          <p style={{ color: '#888', marginBottom: 36, fontSize: 14 }}>Welcome back! Please enter your details.</p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 500 }}>Mobile Number or email *</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Enter your email or mobile"
                value={form.credential}
                onChange={e => setForm({ ...form, credential: e.target.value })}
                style={{
                  width: '100%', padding: '12px 0',
                  border: 'none', borderBottom: '2px solid #ddd',
                  fontSize: 15, transition: 'border-color 0.2s', background: 'transparent'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 500 }}>Password *</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{
                  width: '100%', padding: '12px 0',
                  border: 'none', borderBottom: '2px solid #ddd',
                  fontSize: 15, transition: 'border-color 0.2s', background: 'transparent'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#888'
                }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 8 }}>
            <div>
              <button style={{ background: 'none', border: 'none', color: '#555', fontSize: 13, cursor: 'pointer', display: 'block', marginBottom: 4 }}
                onClick={() => alert('Password reset feature requires backend.')}>
                Lost Your password?
              </button>
              <button style={{ background: 'none', border: 'none', color: '#555', fontSize: 13, cursor: 'pointer' }}
                onClick={() => alert('Email recovery feature requires backend.')}>
                Lost Your Email?
              </button>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 13, color: '#555' }}>Don't Have an account? </span>
              <button
                onClick={() => setCurrentPage('register')}
                style={{ background: 'none', border: 'none', color: 'var(--red)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >Register Now</button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', padding: '16px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, var(--red), var(--red-dark))',
              color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: loading ? 'none' : '0 4px 20px rgba(192,0,12,0.35)',
              transition: 'all 0.3s', cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            ) : (
              <>Log In <ArrowRight size={18} /></>
            )}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#eee' }} />
            <span style={{ color: '#aaa', fontSize: 13 }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: '#eee' }} />
          </div>

          <button style={{
            width: '100%', padding: '12px', border: '1.5px solid #ddd',
            borderRadius: 12, background: '#fff', fontWeight: 600, fontSize: 14,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
          }}
          onClick={() => alert('Google login requires backend OAuth setup.')}>
            <span style={{ fontSize: 20 }}>G</span> Continue with Google
          </button>
        </div>

        {/* Illustration */}
        <div style={{ textAlign: 'center', animation: 'fadeUp 0.6s 0.2s ease both' }}>
          <div style={{
            width: 300, height: 300, margin: '0 auto 32px',
            background: 'linear-gradient(135deg, #fff5f5, #ffe5e8)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Sign-in illustration */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ fontSize: 80 }}>🔐</div>
              <div style={{
                position: 'absolute', top: -20, right: -40,
                background: 'var(--red)', borderRadius: 12, padding: '8px 12px',
                boxShadow: '0 4px 16px rgba(192,0,12,0.3)'
              }}>
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>SIGN IN</div>
              </div>
              <div style={{
                position: 'absolute', bottom: -20, left: -40,
                background: '#fff', borderRadius: 12, padding: '8px 12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}>
                <div style={{ color: '#333', fontSize: 11, fontWeight: 600 }}>🔑 Secure Login</div>
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            Welcome Back to <span style={{ color: 'var(--red)' }}>iScale</span>
          </h2>
          <p style={{ color: '#666', fontSize: 15, lineHeight: 1.7, maxWidth: 360, margin: '0 auto' }}>
            Continue your learning journey. Access your courses, track progress, and connect with mentors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
