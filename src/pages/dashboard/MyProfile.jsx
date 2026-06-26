import React, { useState, useEffect } from "react";

const styles = `
.save-toast {
  background: rgba(39, 174, 96, 0.15);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 12px;
  padding: 12px 20px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.profile-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

.profile-card {
  padding: 32px;
  background: var(--card-bg);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.profile-card:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  border-color: rgba(255,255,255,0.1);
}

.profile-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.profile-card-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.3px;
}

.profile-fields {
  display: flex;
  flex-direction: column;
}

.profile-field {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 16px;
  align-items: center;
  padding: 20px 16px;
  border-bottom: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.profile-field:last-child {
  border-bottom: none;
}

.profile-field:hover {
  background: rgba(255,255,255,0.03);
  transform: translateX(4px);
}

.field-label {
  font-size: 1.3rem;
  color: var(--text-secondary);
  font-weight: 600;
  letter-spacing: 0.3px;
}

.field-display {
  font-size: 1.4rem;
  color: var(--text-primary);
  font-weight: 700;
}

.field-empty {
  font-size: 1.3rem;
  color: var(--text-muted);
  font-style: italic;
}

.field-input {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 1.3rem;
  outline: none;
  background: var(--bg-secondary);
  transition: all 0.2s;
  color: var(--text-primary);
  font-weight: 600;
}

.field-input:focus {
  background: var(--bg-primary);
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.field-textarea {
  resize: vertical;
  min-height: 120px;
}

.profile-form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.profile-sidebar-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 100px;
}

.avatar-card {
  padding: 36px 24px;
  text-align: center;
  background: var(--card-bg);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.avatar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  border-color: rgba(255,255,255,0.1);
}

.avatar-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--red) 0%, var(--red-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.25);
  transition: transform 0.3s ease;
}

.avatar-card:hover .avatar-circle {
  transform: scale(1.05) rotate(5deg);
}

.avatar-circle span {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  letter-spacing: -1px;
}

.avatar-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.avatar-email {
  font-size: 1.3rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.avatar-upload-btn {
  width: 100%;
  margin-top: 24px;
  background: rgba(255,255,255,0.05);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  font-size: 1.2rem;
  font-weight: 600;
  padding: 12px;
}

.avatar-upload-btn:hover {
  background: #2563eb;
  color: #fff;
  border-color: #2563eb;
}

.account-info-card {
  padding: 28px 24px;
  background: var(--card-bg);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.account-info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  border-color: rgba(255,255,255,0.1);
}

.account-info-card h3 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.account-detail {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-color);
  font-size: 1.3rem;
  transition: all 0.2s;
  font-weight: 600;
}

.account-detail:hover {
  padding-left: 8px;
  padding-right: 8px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
}

.account-detail:last-child {
  border-bottom: none;
}

.acct-label {
  color: var(--text-secondary);
  font-weight: 600;
}

.acct-val {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.acct-active {
  color: #10b981;
  background: #ecfdf5;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
}

.btn-primary,
.btn-outline {
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--red) 0%, var(--red-light) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.35);
  background: linear-gradient(135deg, var(--red-light) 0%, var(--red) 100%);
}

.btn-primary:active {
  transform: translateY(1px);
}

.btn-outline {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: rgba(255,255,255,0.05);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.page-wrapper {
  padding: 0;
  animation: fadeSlideUp 0.4s ease-out;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}

.page-header p {
  color: var(--text-secondary);
  font-size: 1.05rem;
  font-weight: 500;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }

  .profile-sidebar-card {
    position: static;
    order: -1;
  }
}

@media (max-width: 600px) {
  .profile-field {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .profile-card {
    padding: 20px;
  }

  .profile-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
`;

const userData = {
  registrationDate: "12 Jan 2025",
  firstName: "Kratika",
  lastName: "Solanki",
  parentName: "Rajesh Solanki",
  mobileNumber: "9876543210",
  altMobileNumber: "9876543211",
  whatsappNumber: "9876543210",
  email: "kratika@gmail.com",
  dob: "10 Aug 2002",
  gender: "Female",
  state: "Chhattisgarh",
  city: "Raipur",
  pincode: "492001",
  address: "Tikrapara Raipur",
  skillOccupation: "Frontend Developer",
  biography: "Passionate MERN stack learner.",
};

const fieldGroups = [
  {
    fields: [
      { label: "Registration Date", key: "registrationDate", editable: false },
      { label: "First Name", key: "firstName", editable: true },
      { label: "Last Name", key: "lastName", editable: true },
      { label: "Parent Name", key: "parentName", editable: true },
      { label: "Mobile Number", key: "mobileNumber", editable: true },
      { label: "Alt Mobile Number", key: "altMobileNumber", editable: true },
      { label: "Whatsapp Number", key: "whatsappNumber", editable: true },
      { label: "Email", key: "email", editable: true },
      { label: "Dob", key: "dob", editable: true },
      {
        label: "Gender",
        key: "gender",
        editable: true,
        type: "select",
        options: ["Male", "Female", "Other"],
      },
      { label: "State", key: "state", editable: true },
      { label: "City", key: "city", editable: true },
      { label: "Pincode", key: "pincode", editable: true },
      { label: "Address", key: "address", editable: true },
      { label: "Skill/Occupation", key: "skillOccupation", editable: true },
      {
        label: "Biography",
        key: "biography",
        editable: true,
        type: "textarea",
      },
    ],
  },
];

const MyProfile = () => {
  const formatDate = (dateString) => {
    if (!dateString || dateString === "-") return "-";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
  };
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Password Update State
  const [passData, setPassData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passMsg, setPassMsg] = useState('');
  const [passStatus, setPassStatus] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('https://iscale-backend.onrender.com/api/myprofile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return;
        }

        const result = await res.json();
        if (result.status && result.data) {
          setFormData(result.data);
          // Also merge into global userData if needed for sidebar
          Object.assign(userData, result.data);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Construct the backend payload according to the update-profile structure
      const payload = {
        ...formData,
        c_first_name: formData.firstName,
        c_last_name: formData.lastName,
        c_email: formData.email,
        c_contact: formData.mobileNumber,
        c_alt_contact: formData.altMobileNumber,
        c_whatsapp: formData.whatsappNumber,
        c_gender: formData.gender,
        c_dob: formData.dob,
        c_bio: formData.biography,
        m_occupation: formData.occupation || formData.skillOccupation,
        c_guardian: formData.parentName,
        c_current_address1: formData.address,
        c_current_state: formData.state,
        c_current_city: formData.city,
        c_current_pincode: formData.pincode
      };

      const res = await fetch('https://iscale-backend.onrender.com/api/update-profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const result = await res.json();
      if (result.status) {
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        
        // Update localStorage and trigger global dashboard update
        const storedUserStr = localStorage.getItem('user');
        if (storedUserStr) {
          try {
            const storedUser = JSON.parse(storedUserStr);
            const newName = formData.firstName || formData.fname || formData.c_first_name || formData.name;
            const updatedUser = { ...storedUser, ...formData, name: newName, firstName: newName };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.dispatchEvent(new Event('profileUpdated'));
          } catch (e) {}
        }
      } else {
        alert(result.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Update profile error:', err);
      alert('An error occurred while updating profile.');
    }
  };

  const handlePasswordSave = async () => {
    if(!passData.currentPassword || !passData.newPassword || !passData.confirmPassword) {
      setPassMsg('Please fill all password fields');
      setPassStatus('error');
      return;
    }
    if(passData.newPassword !== passData.confirmPassword) {
      setPassMsg('New passwords do not match');
      setPassStatus('error');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://iscale-backend.onrender.com/api/update-profile/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passData)
      });
      const result = await res.json();
      setPassStatus(result.status ? 'success' : 'error');
      setPassMsg(result.message || (result.status ? 'Password updated successfully' : 'Failed to update password'));
      if(result.status) {
        setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
      setTimeout(() => setPassMsg(''), 3000);
    } catch(err) {
      setPassStatus('error');
      setPassMsg('Error updating password');
      setTimeout(() => setPassMsg(''), 3000);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="page-wrapper">
        <div className="page-header">
          <h1 className="animated-text-gradient" style={{ display: 'inline-block' }}>My Profile</h1>
          <p>Manage your personal information</p>
        </div>

        {saved && (
          <div className="save-toast">
            ✅ Profile updated successfully!
          </div>
        )}

        <div className="profile-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="profile-card">
              <div className="profile-card-header">
                <h2 className="animated-text-gradient" style={{ display: 'inline-block' }}>Personal Information</h2>

              <button
                className={
                  editing ? "btn-primary" : "btn-outline"
                }
                onClick={
                  editing
                    ? handleSave
                    : () => setEditing(true)
                }
              >
                {editing
                  ? "💾 Save Changes"
                  : "✏️ Edit Profile"}
              </button>
            </div>

            <div className="profile-fields">
              {fieldGroups[0].fields.map((field) => (
                <div
                  className="profile-field"
                  key={field.key}
                >
                  <label className="field-label">
                    {field.label}
                  </label>

                  <div className="field-value">
                    {editing && field.editable ? (
                      field.type === "select" ? (
                        <select
                          value={
                            formData[field.key] || ""
                          }
                          onChange={(e) =>
                            handleChange(
                              field.key,
                              e.target.value
                            )
                          }
                          className="field-input"
                        >
                          {field.options.map((o) => (
                            <option
                              key={o}
                              value={o}
                            >
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : field.type ===
                        "textarea" ? (
                        <textarea
                          value={
                            formData[field.key] || ""
                          }
                          onChange={(e) =>
                            handleChange(
                              field.key,
                              e.target.value
                            )
                          }
                          className="field-input field-textarea"
                          rows={3}
                        />
                      ) : (
                        <input
                          type="text"
                          value={
                            formData[field.key] || ""
                          }
                          onChange={(e) =>
                            handleChange(
                              field.key,
                              e.target.value
                            )
                          }
                          className="field-input"
                        />
                      )
                    ) : (
                      <span className="field-display">
                        {field.key === 'registrationDate' || field.key === 'createdAt' 
                          ? formatDate(formData[field.key]) 
                          : formData[field.key] || "-"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {editing && (
              <div className="profile-form-actions">
                <button
                  className="btn-primary"
                  onClick={handleSave}
                >
                  💾 Save Changes
                </button>

                <button
                  className="btn-outline"
                  onClick={() => {
                    setEditing(false);
                    setFormData({ ...userData });
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            </div>

            {/* Password Update Section */}
            <div className="profile-card">
              <div className="profile-card-header">
                <h2>Security & Password</h2>
              </div>
              <div className="profile-fields" style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label className="field-label">Current Password</label>
                  <input 
                    type="password" 
                    className="field-input" 
                    placeholder="Enter current password"
                    value={passData.currentPassword}
                    onChange={(e) => setPassData({...passData, currentPassword: e.target.value})}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label className="field-label">New Password</label>
                    <input 
                      type="password" 
                      className="field-input" 
                      placeholder="Enter new password"
                      value={passData.newPassword}
                      onChange={(e) => setPassData({...passData, newPassword: e.target.value})}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label className="field-label">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="field-input" 
                      placeholder="Confirm new password"
                      value={passData.confirmPassword}
                      onChange={(e) => setPassData({...passData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
                {passMsg && (
                  <div style={{ color: passStatus === 'success' ? '#10b981' : '#ef4444', fontSize: '1.2rem', fontWeight: '600', marginTop: '8px' }}>
                    {passMsg}
                  </div>
                )}
                <div style={{ marginTop: '16px' }}>
                  <button className="btn-primary" onClick={handlePasswordSave} style={{ padding: '12px 24px', width: 'auto', fontSize: '1.2rem' }}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-sidebar-card">
            <div className="avatar-card">
              <div className="avatar-circle">
                <span>
                  {userData.firstName.charAt(0)}
                  {userData.lastName.charAt(0)}
                </span>
              </div>

              <div className="avatar-name">
                {userData.firstName}{" "}
                {userData.lastName}
              </div>

              <div className="avatar-email">
                {userData.email}
              </div>

              <button className="btn-outline avatar-upload-btn">
                📷 Change Photo
              </button>
            </div>

            <div className="account-info-card">
              <h3>Account Details</h3>

              <div className="account-detail">
                <span className="acct-label">
                  Member Since
                </span>

                <span className="acct-val">
                  {formatDate(userData.registrationDate || userData.createdAt)}
                </span>
              </div>

              <div className="account-detail">
                <span className="acct-label">
                  Account Status
                </span>

                <span className="acct-val acct-active">
                  ✓ Active
                </span>
              </div>

              <div className="account-detail">
                <span className="acct-label">
                  Courses Enrolled
                </span>

                <span className="acct-val">3</span>
              </div>

              <div className="account-detail">
                <span className="acct-label">
                  Certificates
                </span>

                <span className="acct-val">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
