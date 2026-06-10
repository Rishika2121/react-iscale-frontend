import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import DataAnalyticsImg from '../assets/images/Data_Analytics_paid_compressed.png';

const mockStudents = [
  { name: 'Aman Sharma', city: 'Delhi' },
  { name: 'Neha Gupta', city: 'Mumbai' },
  { name: 'Karan Malhotra', city: 'Bangalore' },
  { name: 'Sneha Patel', city: 'Pune' },
  { name: 'Rahul Joshi', city: 'Jaipur' },
  { name: 'Priya Iyer', city: 'Chennai' },
  { name: 'Vikram Singh', city: 'Hyderabad' },
  { name: 'Anjali Verma', city: 'Indore' },
  { name: 'Nikhil Saxena', city: 'Bhopal' },
  { name: 'Pooja Nair', city: 'Kochi' },
  { name: 'Rohan Deshmukh', city: 'Nagpur' },
  { name: 'Divya Reddy', city: 'Visakhapatnam' }
];


const mockCourses = [
  { title: 'Data Science with Generative AI', img: 'https://www.theiscale.com/myadmin/uploads/courses/Data_science_Course_paid_compressed.png' },
  { title: 'AI Cohort Course Batch 01', img: 'https://www.theiscale.com/myadmin/uploads/courses/The_Complete_AI_Guide_(7).jpg' },
  { title: 'AI For Everyone : Complete Guide', img: 'https://www.theiscale.com/myadmin/uploads/courses/The_Complete_AI_Guide_(9).jpg' },
  { title: 'Master Of Data Analytics Program', img: DataAnalyticsImg },
  { title: 'Advance Python with AI Tools', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80' }
];

const mockTimes = [
  'just enrolled',
  'joined 2 minutes ago',
  'purchased 5 minutes ago',
  'enrolled 1 minute ago',
  'just purchased',
  'joined 4 minutes ago'
];

const EnrollmentPopup = () => {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Wait initially before showing the first popup
    const startTimer = setTimeout(() => {
      triggerNotification();
    }, 4000);

    const interval = setInterval(() => {
      triggerNotification();
    }, 10000); // Trigger every 10 seconds

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  const triggerNotification = () => {
    const student = mockStudents[Math.floor(Math.random() * mockStudents.length)];
    const course = mockCourses[Math.floor(Math.random() * mockCourses.length)];
    const time = mockTimes[Math.floor(Math.random() * mockTimes.length)];

    setNotification({ student, course, time });
    setVisible(true);
    setAnimationClass('slide-in');

    // Hide after 5 seconds
    setTimeout(() => {
      setAnimationClass('slide-out');
      // Set visible false after animation completes (300ms)
      setTimeout(() => {
        setVisible(false);
        setNotification(null);
      }, 300);
    }, 5000);
  };

  if (!visible || !notification) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes popupSlideOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
        }
        .enroll-popup-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 9999;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          border-radius: 16px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 380px;
          pointer-events: auto;
          transition: all 0.3s ease;
        }
        [data-theme='dark'] .enroll-popup-container {
          background: rgba(15, 17, 26, 0.85);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .enroll-popup-container.slide-in {
          animation: popupSlideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .enroll-popup-container.slide-out {
          animation: popupSlideOut 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .enroll-popup-img {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        [data-theme='dark'] .enroll-popup-img {
          border-color: rgba(255, 255, 255, 0.05);
        }
        .enroll-popup-pulse {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 10px;
          height: 10px;
          background-color: #22c55e;
          border-radius: 50%;
        }
        .enroll-popup-pulse::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #22c55e;
          border-radius: 50%;
          animation: popupPulse 1.5s infinite ease-in-out;
        }
        @keyframes popupPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @media (max-width: 600px) {
          .enroll-popup-container {
            bottom: 16px;
            left: 16px;
            right: 16px;
            max-width: calc(100vw - 32px);
            padding: 10px 12px;
          }
          .enroll-popup-img {
            width: 44px;
            height: 44px;
          }
        }
      `}} />
      
      <div className={`enroll-popup-container ${animationClass}`}>
        <div style={{ position: 'relative', display: 'flex', flexShrink: 0 }}>
          <img 
            src={notification.course.img} 
            alt={notification.course.title} 
            className="enroll-popup-img"
          />
          <div className="enroll-popup-pulse" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {notification.student.name} <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>from</span> {notification.student.city}
          </p>
          <p style={{ margin: '2px 0 0 0', fontSize: 11, fontWeight: 600, color: 'var(--red)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Enrolled in {notification.course.title}
          </p>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
            <Zap size={10} color="#eab308" /> {notification.time}
          </span>
        </div>
      </div>
    </>
  );
};

export default EnrollmentPopup;
