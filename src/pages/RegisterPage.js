import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const RegisterPage = ({ setCurrentPage }) => {
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    whatsapp: '',
    gender: 'male',
    sameWA: false,
    agreed: false
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    const {
      firstName,
      lastName,
      email,
      password,
      contact,
      whatsapp,
      agreed,
      gender
    } = form;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !contact ||
      (!form.sameWA && !whatsapp)
    ) {
      alert("Please fill all required fields");
      return;
    }

  if (!agreed) {
    alert("Please accept terms");
    return;
  }

  try {

    setLoading(true);

    const response = await fetch(
      "https://iscale-backend.onrender.com/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          email: email,
         password: form.password,
          contact: contact,
          whatsapp: form.sameWA ? contact : whatsapp,
          gender: gender
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.status) {

      alert("Registration Successful");

      setCurrentPage("login");

    } else {

      alert(data.message || "Registration Failed");

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  } finally {

    setLoading(false);

  }
};
   

  return (
    <div style={{ minHeight: '90vh', background: 'var(--gradient-hero)', display: 'flex', alignItems: 'center', padding: '60px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        {/* Illustration */}
        <div style={{ animation: 'fadeUp 0.6s 0.2s ease both' }}>
          <div style={{
            width: 320, height: 380, margin: '0 auto',
            background: 'linear-gradient(135deg, #ffe5e5, #ffd0d0)',
            borderRadius: 24, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Circle bg */}
            <div style={{
              position: 'absolute', width: 240, height: 240,
              background: 'rgba(192,0,12,0.1)', borderRadius: '50%',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
            }} />

            {/* Floating elements */}
            <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 32 }}>✉️</div>
            <div style={{ position: 'absolute', top: 20, right: 40, fontSize: 28 }}>✉️</div>
            <div style={{ position: 'absolute', bottom: 40, left: 30, fontSize: 24 }}>✉️</div>

            {/* Sign up card */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: 24, width: 200,
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)', position: 'relative', zIndex: 2
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, textAlign: 'center', marginBottom: 16 }}>JOIN US</div>
              <div style={{ color: '#888', fontSize: 11, textAlign: 'center', marginBottom: 16 }}>IT'S FREE!</div>
              <div style={{ background: '#f0f0f0', borderRadius: 6, padding: '8px', marginBottom: 8, fontSize: 11, color: '#aaa' }}>USERNAME</div>
              <div style={{ background: '#f0f0f0', borderRadius: 6, padding: '8px', marginBottom: 16, fontSize: 11, color: '#aaa' }}>PASSWORD</div>
              <button style={{ width: '100%', padding: '10px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 13, border: 'none' }}>
                SIGN UP
              </button>
            </div>

            {/* Floating check */}
            <div style={{
              position: 'absolute', top: 100, right: 20,
              width: 48, height: 48, background: '#222', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Check size={24} color="#fff" />
            </div>

            {/* Person emoji */}
            <div style={{ position: 'absolute', bottom: 0, right: 20, fontSize: 80 }}>👩‍💼</div>
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: '#fff', borderRadius: 24, padding: 40,
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
          animation: 'fadeUp 0.6s ease forwards'
        }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, marginBottom: 28 }}>Register</h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[['First Name *', 'firstName'], ['Last Name *', 'lastName']].map(([label, key]) => (
              <div key={key}>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>{label}</label>
                <input
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, background: 'transparent' }}
                  onFocus={e => e.target.style.borderColor = 'var(--red)'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>
            ))}
          </div>

          
{[
  ['Email address *', 'email', 'email'],
  ['Password *', 'password', 'password'],
  ['Contact Number *', 'contact', 'tel'],
].map(([label, key, type]) => (
  <div key={key} style={{ marginBottom: 16 }}>
    <label
      style={{
        fontSize: 12,
        color: '#888',
        display: 'block',
        marginBottom: 4
      }}
    >
      {label}
    </label>

    <input
      type={type}
      value={form[key]}
      onChange={e =>
        setForm({
          ...form,
          [key]: e.target.value
        })
      }
      style={{
        width: '100%',
        padding: '10px 0',
        border: 'none',
        borderBottom: '1.5px solid #ddd',
        fontSize: 14,
        background: 'transparent'
      }}
      onFocus={e =>
        e.target.style.borderColor = 'var(--red)'
      }
      onBlur={e =>
        e.target.style.borderColor = '#ddd'
      }
    />
  </div>
))}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 10 }}>
              <input type="checkbox" checked={form.sameWA} onChange={e => setForm({ ...form, sameWA: e.target.checked })} style={{ accentColor: 'var(--red)' }} />
              Same as my Whatsapp Number
            </label>
            {!form.sameWA && (
              <>
                <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 4 }}>Whatsapp Number *</label>
                <input
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                  style={{ width: '100%', padding: '10px 0', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, background: 'transparent' }}
                />
              </>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 8 }}>Gender *</label>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Male', 'Female', 'Others'].map(g => (
                <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
                  <input type="radio" name="reg-gender" value={g.toLowerCase()}
                    checked={form.gender === g.toLowerCase()}
                    onChange={() => setForm({ ...form, gender: g.toLowerCase() })}
                    style={{ accentColor: 'var(--red)' }} />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#777', cursor: 'pointer', marginBottom: 24 }}>
            <input type="checkbox" checked={form.agreed} onChange={e => setForm({ ...form, agreed: e.target.checked })} style={{ accentColor: 'var(--red)' }} />
            I agree to the <span style={{ color: 'var(--red)', fontWeight: 600 }}>privacy policy</span> and <span style={{ color: 'var(--red)', fontWeight: 600 }}>terms of service</span>.
          </label>

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, var(--red), var(--red-dark))',
              color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: loading ? 'none' : '0 4px 20px rgba(192,0,12,0.35)',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s'
            }}
          >
            {loading ? <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : <>Register <ArrowRight size={18} /></>}
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#777' }}>
            Already have an account?{' '}
            <button onClick={() => setCurrentPage('login')} style={{ background: 'none', border: 'none', color: 'var(--red)', fontWeight: 700, cursor: 'pointer' }}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
