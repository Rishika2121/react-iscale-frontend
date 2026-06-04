import React, { useState } from "react";

const styles = `
.save-toast {
  background: #e8f8f0;
  color: #27ae60;
  border: 1px solid #c3e6cb;
  border-radius: 12px;
  padding: 12px 20px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 30px rgba(39, 174, 96, 0.15);
}

.profile-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  align-items: start;
}

.profile-card {
  padding: 32px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 25px rgba(0,0,0,0.03);
  transition: all 0.3s ease;
}

.profile-card:hover {
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
}

.profile-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
}

.profile-card-header h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

.profile-fields {
  display: flex;
  flex-direction: column;
}

.profile-field {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  align-items: center;
  padding: 16px 12px;
  border-bottom: 1px dashed #f1f5f9;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.profile-field:last-child {
  border-bottom: none;
}

.profile-field:hover {
  background: #f8fafc;
  transform: translateX(4px);
}

.field-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.field-display {
  font-size: 0.9rem;
  color: #1e293b;
  font-weight: 600;
}

.field-empty {
  color: #94a3b8;
  font-style: italic;
}

.field-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  outline: none;
  background: #f8fafc;
  transition: all 0.2s;
  color: #0f172a;
  font-weight: 500;
}

.field-input:focus {
  background: #ffffff;
  border-color: #ED1C24;
  box-shadow: 0 0 0 4px rgba(237, 28, 36, 0.1);
}

.field-textarea {
  resize: vertical;
  min-height: 80px;
}

.profile-form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.profile-sidebar-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 100px;
}

.avatar-card {
  padding: 32px 24px;
  text-align: center;
  background: linear-gradient(145deg, #ffffff, #fafafa);
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 25px rgba(0,0,0,0.04);
  transition: all 0.3s ease;
}

.avatar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
}

.avatar-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ED1C24, #b91c1c);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 20px rgba(237, 28, 36, 0.25);
  transition: transform 0.3s ease;
}

.avatar-card:hover .avatar-circle {
  transform: scale(1.05) rotate(5deg);
}

.avatar-circle span {
  font-size: 2.2rem;
  font-weight: 800;
  color: white;
  letter-spacing: -1px;
}

.avatar-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
}

.avatar-email {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 4px;
  font-weight: 500;
}

.avatar-upload-btn {
  width: 100%;
  margin-top: 20px;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.avatar-upload-btn:hover {
  background: #ED1C24;
  color: #fff;
  border-color: #ED1C24;
}

.account-info-card {
  padding: 24px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 25px rgba(0,0,0,0.03);
  transition: all 0.3s ease;
}

.account-info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.06);
}

.account-info-card h3 {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 20px;
}

.account-detail {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px dashed #f1f5f9;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.account-detail:hover {
  padding-left: 6px;
  padding-right: 6px;
  background: #f8fafc;
  border-radius: 6px;
}

.account-detail:last-child {
  border-bottom: none;
}

.acct-label {
  color: #64748b;
  font-weight: 600;
}

.acct-val {
  font-weight: 700;
  color: #1e293b;
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
  background: linear-gradient(135deg, #ED1C24, #c50e15);
  color: white;
  box-shadow: 0 4px 15px rgba(237, 28, 36, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(237, 28, 36, 0.35);
  background: linear-gradient(135deg, #f72a32, #d1131a);
}

.btn-primary:active {
  transform: translateY(1px);
}

.btn-outline {
  background: white;
  border: 1px solid #e2e8f0;
  color: #475569;
}

.btn-outline:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #0f172a;
}

.page-wrapper {
  padding: 0; /* Padding is handled by layout now */
  animation: fadeSlideUp 0.4s ease-out;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}

.page-header p {
  color: #64748b;
  font-size: 1rem;
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
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [saved, setSaved] = useState(false);

  const handleChange = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSave = () => {
    setEditing(false);
    setSaved(true);

    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="page-wrapper">
        <div className="page-header">
          <h1>My Profile</h1>
          <p>Manage your personal information</p>
        </div>

        {saved && (
          <div className="save-toast">
            ✅ Profile updated successfully!
          </div>
        )}

        <div className="profile-layout">
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Personal Information</h2>

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
                        {formData[field.key] || "—"}
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
                  {userData.registrationDate}
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
