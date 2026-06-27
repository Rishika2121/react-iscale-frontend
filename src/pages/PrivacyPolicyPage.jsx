import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .policy-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .policy-hero {
          text-align: center;
          margin-bottom: 56px;
        }
        .policy-hero h1 {
          font-family: var(--font-display);
          font-size: 42px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
          letter-spacing: -1px;
        }
        .policy-hero p {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .policy-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: var(--red);
          font-size: 13px;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 100px;
          margin-bottom: 24px;
          font-family: var(--font-body);
        }
        .policy-section {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 36px;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }
        .policy-section:hover {
          border-color: rgba(239, 68, 68, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        .policy-section h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .policy-section h2 .section-num {
          background: linear-gradient(135deg, var(--red), #f97316);
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .policy-section p, .policy-section li {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .policy-section ul {
          padding-left: 20px;
          margin-top: 12px;
        }
        .policy-section li {
          margin-bottom: 8px;
        }
        .policy-updated {
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }
        @media (max-width: 768px) {
          .policy-hero h1 { font-size: 28px; }
          .policy-section { padding: 24px; }
        }
      `}} />

      <div className="policy-page">
        <div className="policy-hero">
          <span className="policy-badge">🔒 Legal</span>
          <h1>Privacy Policy</h1>
          <p>Your privacy matters to us. This policy describes how iScale collects, uses, and protects your personal information.</p>
        </div>

        <div className="policy-section">
          <h2><span className="section-num">1</span> Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, phone number, and profile details when you create an account.</li>
            <li><strong>Payment Information:</strong> Billing address and payment method details processed through secure payment gateways.</li>
            <li><strong>Course Data:</strong> Your course progress, quiz scores, assignments, and certificates earned.</li>
            <li><strong>Communication Data:</strong> Messages, feedback, and support tickets you submit.</li>
            <li><strong>Device Information:</strong> Browser type, IP address, device identifiers, and operating system details.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2><span className="section-num">2</span> How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our educational platform and services.</li>
            <li>To process your course enrollments, payments, and certifications.</li>
            <li>To personalize your learning experience and recommend relevant courses.</li>
            <li>To communicate with you about updates, new courses, and promotional offers.</li>
            <li>To improve our platform through analytics and usage patterns.</li>
            <li>To ensure the security and integrity of our services.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2><span className="section-num">3</span> Data Sharing & Disclosure</h2>
          <p>We do not sell or rent your personal information. We may share your data with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party vendors who assist in platform operations (hosting, payments, analytics).</li>
            <li><strong>Placement Partners:</strong> Hiring companies with your explicit consent for job placement services.</li>
            <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights.</li>
            <li><strong>Certificate Verification:</strong> Limited data shared for verifying the authenticity of issued certificates.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2><span className="section-num">4</span> Data Security</h2>
          <p>We implement industry-standard security measures to protect your information:</p>
          <ul>
            <li>SSL/TLS encryption for all data transmission.</li>
            <li>Secure, encrypted storage for sensitive data like passwords and payment details.</li>
            <li>Regular security audits and vulnerability assessments.</li>
            <li>Access controls and authentication for internal systems.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2><span className="section-num">5</span> Cookies & Tracking</h2>
          <p>We use cookies and similar technologies to enhance your experience:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for platform functionality (login sessions, preferences).</li>
            <li><strong>Analytics Cookies:</strong> Help us understand usage patterns and improve our services.</li>
            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertising (opt-out available).</li>
          </ul>
          <p style={{ marginTop: 12 }}>You can manage cookie preferences through your browser settings.</p>
        </div>

        <div className="policy-section">
          <h2><span className="section-num">6</span> Your Rights</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the data we hold about you.</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information.</li>
            <li><strong>Deletion:</strong> Request deletion of your account and associated data.</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
            <li><strong>Portability:</strong> Request your data in a portable format.</li>
          </ul>
          <p style={{ marginTop: 12 }}>To exercise any of these rights, please contact us at <strong>support@theiscale.com</strong>.</p>
        </div>

        <div className="policy-section">
          <h2><span className="section-num">7</span> Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please reach out to us:</p>
          <ul>
            <li><strong>Email:</strong> support@theiscale.com</li>
            <li><strong>Phone:</strong> +91-7880113112</li>
            <li><strong>Address:</strong> 2nd Floor, Startup Incubation Centre, Tech Hub, Sector-62, Noida, UP - 201301</li>
          </ul>
        </div>

        <p className="policy-updated">Last updated: June 2026 · iScale Platform</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
