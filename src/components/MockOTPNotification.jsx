import React, { useEffect } from 'react';
import { MessageSquare, Mail, X } from 'lucide-react';

const MockOTPNotification = ({ isVisible, contact, otp, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 6000); // Auto dismiss after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const isEmail = contact.includes('@');

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10000,
      width: '90%',
      maxWidth: 400,
      animation: 'slideDownFade 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    }}>
      <style>{`
        @keyframes slideDownFade {
          0% { transform: translate(-50%, -100%); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
      
      <div className="glass-card" style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        padding: '16px 20px',
        borderRadius: 20,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        border: '1px solid var(--border-color)',
        background: 'var(--card-bg)' // Fallback if glass-card doesn't apply perfectly
      }}>
        <div style={{
          background: isEmail ? '#e8f0fe' : '#e6f4ea',
          color: isEmail ? '#1a73e8' : '#137333',
          padding: 10,
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isEmail ? <Mail size={24} /> : <MessageSquare size={24} />}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>
              {isEmail ? 'New Email from iScale' : 'New Message'}
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Just now</span>
          </div>
          
          <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.4 }}>
            Your iScale verification code is <strong style={{ fontSize: 16, letterSpacing: 1 }}>{otp}</strong>. Do not share this code with anyone.
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default MockOTPNotification;
