import React, { useEffect, useState } from 'react';
import { useToast, registerToast } from '../hooks/useToast';

const icons = {
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.15"/>
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5"/>
      <path d="M7.5 12.5l3 3 6-6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#ef4444" opacity="0.15"/>
      <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.5"/>
      <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" opacity="0.15"/>
      <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="1.5"/>
      <path d="M12 8v1M12 11v5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 21h20L12 3z" fill="#f59e0b" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 9v5M12 16.5v.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

const colors = {
  success: { bar: '#22c55e', text: '#16a34a' },
  error:   { bar: '#ef4444', text: '#dc2626' },
  info:    { bar: '#3b82f6', text: '#2563eb' },
  warning: { bar: '#f59e0b', text: '#d97706' },
};

const ToastItem = ({ toast, onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const color = colors[toast.type] || colors.info;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const leaveTimer = setTimeout(() => setLeaving(true), 3600);
    return () => clearTimeout(leaveTimer);
  }, []);

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(toast.id), 350);
  };

  return (
    <div
      onClick={handleDismiss}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        background: 'var(--bg-primary, #fff)',
        border: '1px solid var(--border-color, #e5e7eb)',
        borderLeft: `4px solid ${color.bar}`,
        borderRadius: '12px',
        padding: '14px 16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        minWidth: '300px',
        maxWidth: '400px',
        cursor: 'pointer',
        transform: visible && !leaving ? 'translateX(0) scale(1)' : 'translateX(120%) scale(0.95)',
        opacity: visible && !leaving ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ flexShrink: 0, marginTop: '1px' }}>{icons[toast.type] || icons.info}</div>
      <div style={{ flex: 1 }}>
        <p style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-primary, #111)',
          lineHeight: '1.4',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          {toast.message}
        </p>
      </div>
      <div style={{
        flexShrink: 0,
        color: 'var(--text-secondary, #9ca3af)',
        fontSize: '16px',
        fontWeight: 300,
        marginTop: '-2px',
        lineHeight: 1,
      }}>×</div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '3px',
        background: color.bar,
        borderRadius: '0 0 0 12px',
        animation: 'toast-progress 4s linear forwards',
        opacity: 0.5,
      }} />
    </div>
  );
};

const ToastContainer = () => {
  const { toasts, show, dismiss } = useToast();

  useEffect(() => {
    registerToast(show);
    // Override window.alert globally so all existing alert() calls use this toast
    window.alert = (msg) => {
      const lower = (msg || '').toLowerCase();
      let type = 'info';
      if (lower.includes('success') || lower.includes('enrolled') || lower.includes('updated') || lower.includes('submitted') || lower.includes('sent') || lower.includes('reset') || lower.includes('download')) type = 'success';
      else if (lower.includes('error') || lower.includes('fail') || lower.includes('invalid') || lower.includes('wrong') || lower.includes('cannot') || lower.includes('could not') || lower.includes('unable')) type = 'error';
      else if (lower.includes('warning') || lower.includes('please') || lower.includes('match') || lower.includes('enter') || lower.includes('select') || lower.includes('expired')) type = 'warning';
      show(msg, type);
    };
  }, [show]);

  return (
    <>
      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{ pointerEvents: 'all' }}>
            <ToastItem toast={toast} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ToastContainer;
