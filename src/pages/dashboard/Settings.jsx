import React, { useState, useEffect } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  
  // Real State ready for API Integration
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    altMobileNumber: "",
    whatsappNumber: "",
    email: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    pincode: "",
    skill: "",
    parentName: "",
    displayName: "",
    address: "",
    bio: ""
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: ""
  });

  useEffect(() => {
    // API Simulation: Fetch user data
    // fetch('/api/user/settings').then(res => res.json()).then(data => setFormData(data))
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setFormData(prev => ({
          ...prev,
          firstName: user.name ? user.name.split(' ')[0] : '',
          lastName: user.name ? user.name.split(' ')[1] || '' : '',
          email: user.email || ''
        }));
      } catch (e) {}
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Simulate API Call
    // fetch('/api/user/settings', { method: 'PUT', body: JSON.stringify(formData) })
    alert("Profile info updated successfully!");
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <div style={{ animation: 'fadeSlideUp 0.4s ease-out', maxWidth: 1000, margin: '0 auto', width: '100%' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .settings-container {
          animation: fadeSlideUp 0.4s ease-out;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
          padding: 20px;
        }
        .settings-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          outline: none;
          font-size: 14px;
          color: #0f172a;
          transition: all 0.3s ease;
        }
        .settings-input:focus {
          background: #ffffff;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        .settings-btn {
          padding: 14px 28px;
          background: linear-gradient(135deg, #2563eb, #c50e15);
          color: #fff;
          border-radius: 12px;
          border: none;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
          width: 100%;
        }
        .settings-btn:hover {
          background: linear-gradient(135deg, #f72a32, #d1131a);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.35);
        }
        .settings-tab {
          background: none;
          border: none;
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        }
        .settings-tab:hover {
          color: #0f172a !important;
          background: #f8fafc;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .settings-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 8px;
          letter-spacing: 0.3px;
        }
        .settings-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #f1f5f9;
          padding: 40px;
          box-shadow: 0 4px 25px rgba(0,0,0,0.02);
        }
        .settings-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px 32px;
        }
        @media (max-width: 768px) {
          .settings-container {
            padding: 0;
          }
          .settings-card {
            padding: 16px;
          }
          .settings-form-grid {
            grid-template-columns: 1fr;
          }
          .settings-btn {
            width: 100%;
          }
          .gender-options {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
      
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: 8 }}>
          Account <span className="animated-text-gradient">Settings</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500 }}>Manage your account preferences and personal information.</p>
      </div>
      
      <div className="settings-card">
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", marginBottom: 40, gap: 8 }}>
          <button 
            className="settings-tab"
            onClick={() => setActiveTab("Profile")}
            style={{ 
              color: activeTab === "Profile" ? "#2563eb" : "#64748b",
              borderBottomColor: activeTab === "Profile" ? "#2563eb" : "transparent",
            }}
          >
            Profile
          </button>
          <button 
            className="settings-tab"
            onClick={() => setActiveTab("Password")}
            style={{ 
              color: activeTab === "Password" ? "#2563eb" : "#64748b",
              borderBottomColor: activeTab === "Password" ? "#2563eb" : "transparent",
            }}
          >
            Password
          </button>
        </div>

        {activeTab === "Profile" && (
          <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="settings-form-grid">
              
              {/* Row 1 */}
              <div>
                <label className="settings-label">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="settings-input" />
              </div>
              <div>
                <label className="settings-label">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="settings-input" />
              </div>

              {/* Row 2 */}
              <div>
                <label className="settings-label">Upload Profile Picture</label>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "11px 16px", background: "#f8fafc", display: "flex", alignItems: "center" }}>
                  <input type="file" style={{ fontSize: 13, width: '100%' }} />
                </div>
              </div>
              <div>
                <label className="settings-label">Mobile Number</label>
                <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className="settings-input" />
              </div>

              {/* Row 3 */}
              <div>
                <label className="settings-label">Alt. Mobile Number</label>
                <input type="text" name="altMobileNumber" value={formData.altMobileNumber} onChange={handleInputChange} className="settings-input" />
              </div>
              <div>
                <label className="settings-label">Whatsapp Number</label>
                <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} className="settings-input" />
              </div>

              {/* Row 4 */}
              <div>
                <label className="settings-label">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="settings-input" />
              </div>
              <div>
                <label className="settings-label">DOB</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="settings-input" style={{ color: "#475569" }} />
              </div>

              {/* Row 5 */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="settings-label">Gender</label>
                <div className="gender-options" style={{ display: "flex", gap: 30, padding: '8px 0' }}>
                  <label style={{ fontSize: 14, color: "#1e293b", display: "flex", alignItems: "center", gap: 8, fontWeight: 500, cursor: 'pointer' }}>
                    <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleInputChange} style={{ accentColor: '#2563eb', width: 16, height: 16 }} /> Male
                  </label>
                  <label style={{ fontSize: 14, color: "#1e293b", display: "flex", alignItems: "center", gap: 8, fontWeight: 500, cursor: 'pointer' }}>
                    <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleInputChange} style={{ accentColor: '#2563eb', width: 16, height: 16 }} /> Female
                  </label>
                  <label style={{ fontSize: 14, color: "#1e293b", display: "flex", alignItems: "center", gap: 8, fontWeight: 500, cursor: 'pointer' }}>
                    <input type="radio" name="gender" value="Others" checked={formData.gender === "Others"} onChange={handleInputChange} style={{ accentColor: '#2563eb', width: 16, height: 16 }} /> Others
                  </label>
                </div>
              </div>

              {/* Row 6 */}
              <div>
                <label className="settings-label">State</label>
                <select name="state" value={formData.state} onChange={handleInputChange} className="settings-input">
                  <option value="">Select State</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>
              <div>
                <label className="settings-label">City</label>
                <select name="city" value={formData.city} onChange={handleInputChange} className="settings-input">
                  <option value="">Select City</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>

              {/* Row 7 */}
              <div>
                <label className="settings-label">Pincode</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="settings-input" />
              </div>
              <div>
                <label className="settings-label">Skill/Occupation</label>
                <input type="text" name="skill" value={formData.skill} onChange={handleInputChange} className="settings-input" />
              </div>

              {/* Row 8 */}
              <div>
                <label className="settings-label">Parent Name</label>
                <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} className="settings-input" />
              </div>
              <div>
                <label className="settings-label">Display Name Publicly As</label>
                <input type="text" name="displayName" value={formData.displayName} onChange={handleInputChange} className="settings-input" />
              </div>

              {/* Row 9 */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="settings-label">Complete Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="settings-input" style={{ resize: "vertical" }} />
              </div>

              {/* Row 10 */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="settings-label">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={3} className="settings-input" style={{ resize: "vertical" }} />
              </div>

            </div>
            
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
              <button type="submit" className="settings-btn">
                Update Info
              </button>
            </div>
          </form>
        )}

        {activeTab === "Password" && (
          <form onSubmit={handleSavePassword} style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 500 }}>
            <div>
              <label className="settings-label">Current Password</label>
              <input type="password" value={passwords.current} onChange={e => setPasswords(p => ({...p, current: e.target.value}))} className="settings-input" />
            </div>
            <div>
              <label className="settings-label">New Password</label>
              <input type="password" value={passwords.newPass} onChange={e => setPasswords(p => ({...p, newPass: e.target.value}))} className="settings-input" />
            </div>
            <div>
              <label className="settings-label">Confirm New Password</label>
              <input type="password" value={passwords.confirm} onChange={e => setPasswords(p => ({...p, confirm: e.target.value}))} className="settings-input" />
            </div>
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
              <button type="submit" className="settings-btn">
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
