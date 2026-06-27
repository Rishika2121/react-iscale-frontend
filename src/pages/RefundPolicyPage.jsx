import React from 'react';

const RefundPolicyPage = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .refund-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .refund-hero {
          text-align: center;
          margin-bottom: 56px;
        }
        .refund-hero h1 {
          font-family: var(--font-display);
          font-size: 42px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
          letter-spacing: -1px;
        }
        .refund-hero p {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .refund-badge {
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
        .refund-section {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 36px;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }
        .refund-section:hover {
          border-color: rgba(239, 68, 68, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        }
        .refund-section h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .refund-section h2 .section-num {
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
        .refund-section p, .refund-section li {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
        .refund-section ul {
          padding-left: 20px;
          margin-top: 12px;
        }
        .refund-section li {
          margin-bottom: 8px;
        }
        .refund-highlight {
          background: rgba(239, 68, 68, 0.05);
          border-left: 4px solid var(--red);
          padding: 16px 20px;
          border-radius: 0 12px 12px 0;
          margin-top: 16px;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .refund-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          border-radius: 12px;
          overflow: hidden;
        }
        .refund-table th, .refund-table td {
          padding: 14px 18px;
          text-align: left;
          font-size: 14px;
          border-bottom: 1px solid var(--border-color);
        }
        .refund-table th {
          background: rgba(239, 68, 68, 0.08);
          color: var(--text-primary);
          font-weight: 700;
          font-family: var(--font-display);
        }
        .refund-table td {
          color: var(--text-secondary);
        }
        .refund-updated {
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }
        @media (max-width: 768px) {
          .refund-hero h1 { font-size: 28px; }
          .refund-section { padding: 24px; }
          .refund-table th, .refund-table td { padding: 10px 12px; font-size: 13px; }
        }
      `}} />

      <div className="refund-page">
        <div className="refund-hero">
          <span className="refund-badge">💰 Policy</span>
          <h1>Refund Policy</h1>
          <p>We want you to be satisfied with your learning experience. Read our refund policy to understand when and how you can request a refund.</p>
        </div>

        <div className="refund-section">
          <h2><span className="section-num">1</span> Refund Eligibility</h2>
          <p>You may be eligible for a refund under the following conditions:</p>
          <ul>
            <li>Refund requests must be submitted within <strong>7 days</strong> of course enrollment.</li>
            <li>Less than <strong>20%</strong> of the course content should have been accessed.</li>
            <li>No certificate of completion has been issued for the course.</li>
            <li>The course has not been availed through any promotional or scholarship offer.</li>
          </ul>
          <div className="refund-highlight">
            <strong>Note:</strong> Free courses and trial enrollments are not eligible for refunds as no payment is involved.
          </div>
        </div>

        <div className="refund-section">
          <h2><span className="section-num">2</span> Refund Timeline</h2>
          <p>Here is the refund schedule based on when you request it:</p>
          <table className="refund-table">
            <thead>
              <tr>
                <th>Request Period</th>
                <th>Content Accessed</th>
                <th>Refund Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Within 48 hours</td>
                <td>Less than 10%</td>
                <td>100% refund</td>
              </tr>
              <tr>
                <td>3 – 5 days</td>
                <td>Less than 15%</td>
                <td>75% refund</td>
              </tr>
              <tr>
                <td>5 – 7 days</td>
                <td>Less than 20%</td>
                <td>50% refund</td>
              </tr>
              <tr>
                <td>After 7 days</td>
                <td>Any</td>
                <td>Not eligible</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="refund-section">
          <h2><span className="section-num">3</span> Non-Refundable Items</h2>
          <p>The following are not eligible for refunds:</p>
          <ul>
            <li>Courses purchased during flash sales, special promotions, or with discount coupons exceeding 50% off.</li>
            <li>Scholarship-based enrollments or fully sponsored courses.</li>
            <li>Add-on services such as resume reviews, mock interviews, or mentorship sessions once utilized.</li>
            <li>Test packages, notes, and downloadable materials once accessed.</li>
            <li>Cohort-based courses after the cohort start date.</li>
          </ul>
        </div>

        <div className="refund-section">
          <h2><span className="section-num">4</span> How to Request a Refund</h2>
          <p>Follow these steps to request a refund:</p>
          <ul>
            <li>Send an email to <strong>support@theiscale.com</strong> with subject line "Refund Request – [Your Name]".</li>
            <li>Include your registered email, course name, enrollment date, and reason for refund.</li>
            <li>Our support team will review your request within <strong>3-5 business days</strong>.</li>
            <li>If approved, the refund will be processed to the original payment method within <strong>7-10 business days</strong>.</li>
          </ul>
        </div>

        <div className="refund-section">
          <h2><span className="section-num">5</span> Course Transfer</h2>
          <p>As an alternative to a refund, you may request a course transfer:</p>
          <ul>
            <li>You can transfer your enrollment to a different course of equal or lesser value.</li>
            <li>Course transfers must be requested within 14 days of enrollment.</li>
            <li>Each enrollment is eligible for only one transfer.</li>
            <li>Price differences (if upgrading) must be paid separately.</li>
          </ul>
        </div>

        <div className="refund-section">
          <h2><span className="section-num">6</span> Contact Us</h2>
          <p>For any refund-related queries, reach out to us:</p>
          <ul>
            <li><strong>Email:</strong> support@theiscale.com</li>
            <li><strong>Phone:</strong> +91-7880113112</li>
            <li><strong>Working Hours:</strong> Monday – Saturday, 10:00 AM – 7:00 PM IST</li>
          </ul>
        </div>

        <p className="refund-updated">Last updated: June 2026 · iScale Platform</p>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
