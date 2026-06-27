import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .terms-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .terms-hero {
          text-align: center;
          margin-bottom: 56px;
        }
        .terms-hero h1 {
          font-family: var(--font-display);
          font-size: 42px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
          letter-spacing: -1px;
        }
        .terms-hero p {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .terms-badge {
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
        .terms-section {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 36px;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }
        .terms-section:hover {
          border-color: rgba(239, 68, 68, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        .terms-section h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .terms-section h2 .section-num {
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
        .terms-section p, .terms-section li {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .terms-section ul {
          padding-left: 20px;
          margin-top: 12px;
        }
        .terms-section li {
          margin-bottom: 8px;
        }
        .terms-updated {
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }
        @media (max-width: 768px) {
          .terms-hero h1 { font-size: 28px; }
          .terms-section { padding: 24px; }
        }
      `}} />

      <div className="terms-page">
        <div className="terms-hero">
          <span className="terms-badge">📋 Legal</span>
          <h1>Terms of Service</h1>
          <p>Please read these terms carefully before using the iScale platform. By accessing our services, you agree to these terms.</p>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">1</span> Acceptance of Terms</h2>
          <p>By accessing or using the iScale platform (www.theiscale.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, you should not use our services.</p>
          <ul>
            <li>These terms apply to all users, including students, visitors, and any person accessing the platform.</li>
            <li>We reserve the right to update these terms at any time. Continued use constitutes acceptance of changes.</li>
            <li>You must be at least 16 years old to create an account and use our services.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">2</span> User Accounts</h2>
          <p>To access certain features, you must register for an account:</p>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to provide accurate, current, and complete information during registration.</li>
            <li>You are responsible for all activities that occur under your account.</li>
            <li>iScale reserves the right to suspend or terminate accounts that violate these terms.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">3</span> Course Enrollment & Access</h2>
          <p>When you enroll in a course on iScale:</p>
          <ul>
            <li>You receive a personal, non-transferable license to access the course content.</li>
            <li>Course access duration depends on the specific program you enroll in.</li>
            <li>You may not share, distribute, or resell course materials to third parties.</li>
            <li>iScale may update course content periodically to maintain relevance and quality.</li>
            <li>Completion certificates are issued upon meeting the specified course requirements.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">4</span> Payments & Pricing</h2>
          <p>Regarding payments for our courses and services:</p>
          <ul>
            <li>All prices are listed in Indian Rupees (INR) unless otherwise stated.</li>
            <li>Payment must be completed before accessing paid course content.</li>
            <li>We accept payments through secure payment gateways (UPI, cards, net banking, etc.).</li>
            <li>EMI options may be available for selected courses through partner financing platforms.</li>
            <li>Prices are subject to change, but enrolled courses retain their original pricing.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">5</span> Intellectual Property</h2>
          <p>All content on the iScale platform is protected by intellectual property laws:</p>
          <ul>
            <li>All course materials, videos, quizzes, and resources are the property of iScale or its content creators.</li>
            <li>You may not reproduce, distribute, modify, or create derivative works without written permission.</li>
            <li>The iScale brand, logo, and trademarks may not be used without explicit authorization.</li>
            <li>User-generated content (reviews, feedback) grants iScale a non-exclusive license to use and display.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">6</span> Prohibited Conduct</h2>
          <p>Users must not engage in the following activities:</p>
          <ul>
            <li>Using the platform for any unlawful purpose or in violation of applicable laws.</li>
            <li>Attempting to gain unauthorized access to other users' accounts or platform systems.</li>
            <li>Sharing account credentials or course access with unauthorized individuals.</li>
            <li>Posting misleading, harmful, or offensive content on the platform.</li>
            <li>Using bots, scrapers, or automated tools to access platform content.</li>
            <li>Engaging in academic dishonesty (cheating on quizzes, submitting plagiarized work).</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">7</span> Limitation of Liability</h2>
          <p>iScale provides educational content on an "as-is" basis:</p>
          <ul>
            <li>We do not guarantee specific outcomes such as job placement or salary increases.</li>
            <li>iScale is not liable for any indirect, incidental, or consequential damages arising from platform use.</li>
            <li>Our total liability is limited to the amount paid for the specific course in question.</li>
            <li>We are not responsible for third-party content, links, or services referenced in our courses.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">8</span> Governing Law</h2>
          <p>These Terms of Service are governed by the laws of India. Any disputes arising from the use of our platform shall be subject to the exclusive jurisdiction of the courts located in Noida, Uttar Pradesh, India.</p>
        </div>

        <div className="terms-section">
          <h2><span className="section-num">9</span> Contact</h2>
          <p>For questions or concerns about these Terms of Service, please contact:</p>
          <ul>
            <li><strong>Email:</strong> support@theiscale.com</li>
            <li><strong>Phone:</strong> +91-7880113112</li>
            <li><strong>Address:</strong> 2nd Floor, Startup Incubation Centre, Tech Hub, Sector-62, Noida, UP - 201301</li>
          </ul>
        </div>

        <p className="terms-updated">Last updated: June 2026 · iScale Platform</p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
