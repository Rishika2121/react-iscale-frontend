import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Mail, Lock, User, Sparkles, BookOpen, Layers, Award, Phone } from 'lucide-react';
import MockOTPNotification from '../components/MockOTPNotification';



const RegisterPage = ({ setCurrentPage }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    contact: '',
    otp: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: 'male',
    agreed: true
  });
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState({
    objective: '',
    experience: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('123456');


  // OTP flow simulation
  const handleSendOtp = () => {
    if (!form.contact || form.contact.length < 5) {
      alert("Please enter a valid mobile number or email address");
      return;
    }
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      setOtpSent(true);
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setShowNotification(true);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (form.otp !== generatedOtp && form.otp !== '123456') {
      alert("Invalid OTP! Please check your simulated notification.");
      return;
    }
    setVerifyingOtp(true);
    setTimeout(() => {
      setVerifyingOtp(false);
      setShowNotification(false);
      setStep(2);
    }, 800);
  };

  // Registration Submit
  const handleRegister = async () => {
    if (!form.agreed) {
      alert("Please accept privacy policy and terms");
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
            fname: form.firstName,
            lname: form.lastName,
            email: form.email,
            password: form.password,
            contact: Number(form.contact.replace(/\D/g, '')) || 0,
            whatsapp: Number(form.contact.replace(/\D/g, '')) || 0,
            gender: form.gender,
            c_current_state: "000000000000000000000000",
            c_current_city: "000000000000000000000000",
            c_user_refer_by: "000000000000000000000000"
          }),
        }
      );

      const data = await response.json();
      console.log("Registration Response:", data);

      if (data.status) {
        // Mock saving survey data on successfully registered user
        localStorage.setItem("user_survey", JSON.stringify(survey));
        setPopupMessage("Your account has been created successfully. Redirecting you to login...");
        setShowSuccessPopup(true);
        setTimeout(() => {
          setCurrentPage("login");
        }, 2200);
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error. Unable to register.");
    } finally {
      setLoading(false);
    }
  };

  const isStep2Valid = form.firstName && form.lastName && form.email && form.password && form.agreed;

  return (
    <div className="bg-dots" style={{ minHeight: '90vh', background: 'var(--gradient-hero)', display: 'flex', alignItems: 'center', padding: '40px 0', color: 'var(--text-primary)' }}>
      <MockOTPNotification 
        isVisible={showNotification} 
        contact={form.contact} 
        otp={generatedOtp} 
        onClose={() => setShowNotification(false)} 
      />
      <div className="container mobile-col" style={{ display: 'flex', gap: 60, alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Left Side Info Panel */}
        <div style={{ flex: 1, width: '100%', animation: 'fadeUp 0.6s 0.2s ease both', maxWidth: 460 }}>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 24,
            padding: 32,
            position: 'relative',
            boxShadow: 'var(--card-shadow)',
            overflow: 'hidden'
          }}>
            {/* Design circle bg */}
            <div style={{
              position: 'absolute', width: 200, height: 200,
              background: 'rgba(37, 99, 235, 0.04)', borderRadius: '50%',
              top: '-50px', right: '-50px', pointerEvents: 'none'
            }} />

            <div style={{ display: 'inline-flex', padding: 8, background: 'rgba(37,99,235,0.08)', borderRadius: 12, color: 'var(--red)', marginBottom: 20 }}>
              <ShieldCheck size={28} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
              Secure & <span className="text-gradient">Fast</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, marginBottom: 30 }}>
              Set up your profile in 3 simple steps to access live mentorship, certification pathways, and jobs dashboard.
            </p>

            {/* Stepper Progress Visualizer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { s: 1, label: 'Verification', desc: 'Secure Mobile OTP auth' },
                { s: 2, label: 'Profile Setup', desc: 'Personal details & password' },
                { s: 3, label: 'Goal Survey', desc: 'Customize your learning track' }
              ].map((stepObj) => (
                <div key={stepObj.s} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: step === stepObj.s ? 'var(--red)' : step > stepObj.s ? 'rgba(37,99,235,0.1)' : 'var(--bg-secondary)',
                    border: '1px solid ' + (step >= stepObj.s ? 'var(--red)' : 'var(--border-color)'),
                    color: step === stepObj.s ? '#fff' : step > stepObj.s ? 'var(--red)' : 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800
                  }}>
                    {step > stepObj.s ? <Check size={14} /> : stepObj.s}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: step >= stepObj.s ? 'var(--text-primary)' : 'var(--text-muted)' }}>{stepObj.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stepObj.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Wizard Card */}
        <div className="glass-card" style={{
          flex: 1.2, width: '100%', maxWidth: 540,
          borderRadius: 24, padding: 40,
          boxShadow: 'var(--card-shadow)',
          animation: 'fadeUp 0.5s ease forwards'
        }}>
          
          {/* STEP 1: MOBILE & OTP */}
          {step === 1 && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 6 }}>Get Started</h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 14 }}>Enter your mobile number to authenticate with a secure OTP.</p>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>Mobile Number *</label>
                <div style={{ position: 'relative', display: 'flex', gap: 10 }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Phone size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      value={form.contact}
                      onChange={e => setForm({ ...form, contact: e.target.value })}
                      style={{
                        width: '100%', padding: '14px 16px 14px 44px',
                        border: '1.5px solid var(--border-color)', borderRadius: 12,
                        fontSize: 15, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                      }}
                    />
                  </div>
                  {!otpSent && (
                    <button
                      onClick={handleSendOtp}
                      disabled={sendingOtp}
                      style={{
                        padding: '0 20px', background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 12,
                        fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s'
                      }}
                    >
                      {sendingOtp ? 'Sending...' : 'Send OTP'}
                    </button>
                  )}
                </div>
              </div>

              {otpSent && (
                <div style={{ animation: 'fadeUp 0.3s ease both', marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 500 }}>Enter 6-Digit OTP *</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter verification code"
                    value={form.otp}
                    onChange={e => setForm({ ...form, otp: e.target.value.replace(/\D/g, '') })}
                    style={{
                      width: '100%', padding: '14px 16px', letterSpacing: 8, textAlign: 'center',
                      border: '1.5px solid var(--red)', borderRadius: 12, fontSize: 18, fontWeight: 800,
                      background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12 }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Check your simulated notification</span>
                    <button onClick={handleSendOtp} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 700 }}>Resend OTP</button>
                  </div>
                </div>
              )}

              {otpSent && (
                <button
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp}
                  style={{
                    width: '100%', padding: '16px', background: 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                    color: '#fff', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 16px rgba(37,99,235,0.2)'
                  }}
                >
                  {verifyingOtp ? 'Verifying...' : 'Verify OTP & Next'} <ArrowRight size={18} />
                </button>
              )}
            </div>
          )}

          {/* STEP 2: PROFILE DETAILS */}
          {step === 2 && (
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, marginBottom: 6 }}>Create Profile</h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>Let's fill in your basic information to set up the account.</p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>First Name *</label>
                  <input
                    placeholder="John"
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--border-color)', borderRadius: 10, fontSize: 14, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Last Name *</label>
                  <input
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--border-color)', borderRadius: 10, fontSize: 14, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px 12px 38px', border: '1.5px solid var(--border-color)', borderRadius: 10, fontSize: 14, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Create Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    placeholder="Min 6 characters"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px 12px 38px', border: '1.5px solid var(--border-color)', borderRadius: 10, fontSize: 14, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>Gender *</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['Male', 'Female', 'Others'].map(g => (
                    <button
                      key={g}
                      onClick={() => setForm({ ...form, gender: g.toLowerCase() })}
                      style={{
                        flex: 1, padding: '10px', borderRadius: 8, border: '1.5px solid ' + (form.gender === g.toLowerCase() ? 'var(--red)' : 'var(--border-color)'),
                        background: form.gender === g.toLowerCase() ? 'rgba(37,99,235,0.04)' : 'transparent',
                        color: form.gender === g.toLowerCase() ? 'var(--red)' : 'var(--text-primary)', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer', marginBottom: 24 }}>
                <input type="checkbox" checked={form.agreed} onChange={e => setForm({ ...form, agreed: e.target.checked })} style={{ accentColor: 'var(--red)' }} />
                I agree to the <span style={{ color: 'var(--red)', fontWeight: 600 }}>Privacy Policy</span> and <span style={{ color: 'var(--red)', fontWeight: 600 }}>Terms of Service</span>.
              </label>

              <div style={{ display: 'flex', gap: 16 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1, padding: '14px', background: 'transparent', border: '1.5px solid var(--border-color)',
                    borderRadius: 12, color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!isStep2Valid}
                  style={{
                    flex: 1.5, padding: '14px',
                    background: isStep2Valid ? 'var(--red)' : 'var(--border-color)',
                    color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: isStep2Valid ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                  }}
                >
                  Next Step <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SURVEY (CRAZY DESIGN SURVEY PAGE) */}
          {step === 3 && (
            <div style={{ animation: 'fadeUp 0.5s ease both' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--red)', marginBottom: 8 }}>
                <Sparkles size={20} />
                <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>Tailor Your Journey</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Quick Career Survey</h1>

              {/* Goal Objective Question */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>1. What is your primary career objective?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { key: 'job', label: 'Secure Placement', desc: 'Looking for jobs / tech roles', icon: Award },
                    { key: 'switch', label: 'Career Switch', desc: 'Transition from non-tech', icon: Layers },
                    { key: 'upskill', label: 'Upskill / Promotion', desc: 'Learn latest AI & data tools', icon: Sparkles },
                    { key: 'learn', label: 'Academic Prep', desc: 'College placement practice', icon: BookOpen }
                  ].map((obj) => {
                    const Icon = obj.icon;
                    const isActive = survey.objective === obj.key;
                    return (
                      <div
                        key={obj.key}
                        onClick={() => setSurvey({ ...survey, objective: obj.key })}
                        style={{
                          border: '1.5px solid ' + (isActive ? 'var(--red)' : 'var(--border-color)'),
                          borderRadius: 14, padding: '16px 14px', cursor: 'pointer',
                          background: isActive ? 'rgba(37,99,235,0.03)' : 'var(--bg-secondary)',
                          transition: 'all 0.25s ease',
                          display: 'flex', flexDirection: 'column', gap: 6, position: 'relative'
                        }}
                      >
                        {isActive && (
                          <div style={{ position: 'absolute', top: 10, right: 10, background: 'var(--red)', color: '#fff', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                        <div style={{ color: isActive ? 'var(--red)' : 'var(--text-muted)', display: 'flex' }}>
                          <Icon size={18} />
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>{obj.label}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.2 }}>{obj.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coding Background Question */}
              <div style={{ marginBottom: 30 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>2. What is your coding experience?</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { key: 'beginner', title: 'Beginner', desc: 'No programming or technology background' },
                    { key: 'intermediate', title: 'Intermediate', desc: 'Understand basics of Python / SQL / scripting' },
                    { key: 'pro', title: 'Professional', desc: 'Work actively as developer / database engineer' }
                  ].map((exp) => {
                    const isActive = survey.experience === exp.key;
                    return (
                      <div
                        key={exp.key}
                        onClick={() => setSurvey({ ...survey, experience: exp.key })}
                        style={{
                          border: '1.5px solid ' + (isActive ? 'var(--red)' : 'var(--border-color)'),
                          borderRadius: 12, padding: '14px 18px', cursor: 'pointer',
                          background: isActive ? 'rgba(37,99,235,0.03)' : 'var(--bg-secondary)',
                          transition: 'all 0.25s ease',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ textAlign: 'left' }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>{exp.title}</span>
                          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{exp.desc}</span>
                        </div>
                        <div style={{
                          width: 16, height: 16, borderRadius: '50%',
                          border: '1.5px solid ' + (isActive ? 'var(--red)' : 'var(--border-color)'),
                          background: isActive ? 'var(--red)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--card-bg)' }} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation CTAs */}
              <div style={{ display: 'flex', gap: 16 }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1, padding: '14px', background: 'transparent', border: '1.5px solid var(--border-color)',
                    borderRadius: 12, color: 'var(--text-primary)', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleRegister}
                  disabled={loading || !survey.objective || !survey.experience}
                  style={{
                    flex: 2, padding: '14px',
                    background: (!survey.objective || !survey.experience || loading) ? 'var(--border-color)' : 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                    color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15,
                    cursor: (!survey.objective || !survey.experience || loading) ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: (!survey.objective || !survey.experience || loading) ? 'none' : '0 4px 16px rgba(37,99,235,0.25)'
                  }}
                >
                  {loading ? 'Registering...' : 'Complete Registration'} <Check size={18} />
                </button>
              </div>
            </div>
          )}

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <button onClick={() => setCurrentPage('login')} style={{ background: 'none', border: 'none', color: 'var(--red)', fontWeight: 700, cursor: 'pointer' }}>
              Login
            </button>
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
              <Check size={36} strokeWidth={3} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>Registration Successful!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>{popupMessage}</p>
            <button
              onClick={() => setCurrentPage("login")}
              style={{
                width: '100%', padding: '14px', background: '#22c55e', color: '#fff',
                border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)', transition: 'all 0.2s'
              }}
            >
              Proceed to Login
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default RegisterPage;
