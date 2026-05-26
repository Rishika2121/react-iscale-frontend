import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Play, CheckCircle, Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import useReveal from '../hooks/useReveal';

const AutoSlider = ({ items, renderItem, speed = 30, direction = 'left', gap = 24 }) => (
  <div style={{ overflow: 'hidden', width: '100%', position: 'relative', padding: '10px 0' }}>
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes scroll-${direction} {
        0% { transform: translateX(${direction === 'left' ? '0' : 'calc(-50% - ' + (gap/2) + 'px)'}); }
        100% { transform: translateX(${direction === 'left' ? 'calc(-50% - ' + (gap/2) + 'px)' : '0'}); }
      }
      .slider-track:hover { animation-play-state: paused !important; }
      
      /* Home Page Responsive Classes */
      .hero-grid {
        display: grid;
        grid-template-columns: 1fr 420px;
        gap: 60px;
        align-items: center;
      }
      .about-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        align-items: center;
      }
      .features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 16px;
      }
      .stats-container {
        display: flex;
        gap: 32px;
        margin-top: 48px;
        flex-wrap: wrap;
      }
      .courses-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
      .success-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 32px;
      }
      .community-stats {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        flex-wrap: wrap;
        gap: 20px;
      }
      .community-stat-item {
        width: 22%;
      }
      .connecting-line {
        position: absolute;
        top: 12px;
        left: 60px;
        right: 60px;
        height: 2px;
        background: var(--red);
        z-index: 1;
      }
      .featured-success-card {
        flex-direction: row;
      }
      .featured-img-container {
        width: 45%;
      }
      
      @media (max-width: 1024px) {
        .hero-grid { grid-template-columns: 1fr 350px; gap: 40px; }
        .courses-grid { grid-template-columns: repeat(2, 1fr); }
        .success-grid { grid-template-columns: 1fr; }
        .community-stat-item { width: 45%; }
        .connecting-line { display: none; }
      }
      
      @media (max-width: 768px) {
        .hero-grid { grid-template-columns: 1fr; text-align: center; }
        .stats-container { justify-content: center; }
        .about-grid { grid-template-columns: 1fr; gap: 40px; }
        .features-grid { grid-template-columns: 1fr; }
        .courses-grid { grid-template-columns: 1fr; }
        .community-stat-item { width: 100%; }
        .featured-success-card { flex-direction: column !important; }
        .featured-img-container { width: 100% !important; height: 300px; }
      }
    `}} />
    <div className="slider-track" style={{
      display: 'flex', gap: gap, width: 'max-content',
      animation: `scroll-${direction} ${speed}s linear infinite`
    }}>
      <div style={{ display: 'flex', gap: gap }}>
        {items.map((item, idx) => renderItem(item, idx))}
      </div>
      <div style={{ display: 'flex', gap: gap }}>
        {items.map((item, idx) => renderItem(item, idx + items.length))}
      </div>
    </div>
  </div>
);

/* ── Hero Section ── */
const Hero = ({ setCurrentPage }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', contact: '', whatsapp: '', gender: 'male', sameWA: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly for the FREE Live Class.');
  };

  return (
    <section style={{ background: 'var(--gradient-hero)', padding: '80px 0 60px', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container hero-grid">
        {/* Left content */}
        <div style={{ animation: 'fadeUp 0.7s ease forwards' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', borderRadius: 100, padding: '8px 18px',
            marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            fontSize: 14, fontWeight: 500
          }}>
            🏆 Upskilling millions for tech readiness
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
            India's Trusted{' '}
            <span style={{ color: 'var(--red)' }}>Upskilling &<br />E-Learning</span>{' '}
            Platform for<br />Future Readiness.
          </h1>

          <p style={{ color: '#555', fontSize: 17, lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
            In India, millions of professionals and college graduates lack affordable access to industry-aligned education. iScale aims to democratize it, blending quality with affordability to create a widespread impact.
          </p>

          <div style={{ display: 'flex', gap: 16 }}>
            <button
              onClick={() => setCurrentPage('courses')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', background: 'var(--red)', color: '#fff',
                borderRadius: 10, fontWeight: 600, fontSize: 16,
                boxShadow: '0 4px 20px rgba(192,0,12,0.35)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(192,0,12,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(192,0,12,0.35)'; }}
            >
              View Courses <ArrowRight size={18} />
            </button>
          </div>

          {/* Stats */}
          <div className="stats-container">
            {[
              { icon: <Users size={20} />, val: '100K+', label: 'Community Members' },
              { icon: <BookOpen size={20} />, val: '50+', label: 'Courses Available' },
              { icon: <Award size={20} />, val: '95%', label: 'Placement Rate' },
            ].map(stat => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ color: 'var(--red)' }}>{stat.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>{stat.val}</div>
                  <div style={{ color: '#777', fontSize: 12 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div 
          className="animate-float"
          style={{
            background: '#fff', borderRadius: 20, padding: 32,
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            animation: 'fadeUp 0.7s 0.2s ease both'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
            Book a <span style={{ color: 'var(--red)' }}>FREE</span> Live class NOW!
          </h3>
          <p style={{ color: '#777', fontSize: 13, marginBottom: 24 }}>Fill your details and select a date for your live class</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['First Name *', 'firstName'], ['Last Name *', 'lastName']].map(([label, key]) => (
              <div key={key}>
                <input
                  placeholder={label}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    width: '100%', padding: '10px 0', border: 'none',
                    borderBottom: '1.5px solid #ddd', fontSize: 14,
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--red)'}
                  onBlur={e => e.target.style.borderColor = '#ddd'}
                />
              </div>
            ))}
          </div>

          {[['Email *', 'email', 'email'], ['Contact Number *', 'contact', 'tel']].map(([label, key, type]) => (
            <input
              key={key}
              type={type}
              placeholder={label}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{
                width: '100%', padding: '12px 0', border: 'none',
                borderBottom: '1.5px solid #ddd', fontSize: 14,
                marginTop: 12, transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'var(--red)'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          ))}

          <div style={{ marginTop: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666', cursor: 'pointer', marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={form.sameWA}
                onChange={e => setForm({ ...form, sameWA: e.target.checked, whatsapp: e.target.checked ? form.contact : '' })}
                style={{ accentColor: 'var(--red)' }}
              />
              Same as my Whatsapp Number
            </label>
            {!form.sameWA && (
              <input
                placeholder="Whatsapp Number *"
                value={form.whatsapp}
                onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                style={{
                  width: '100%', padding: '10px 0', border: 'none',
                  borderBottom: '1.5px solid #ddd', fontSize: 14
                }}
              />
            )}
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 8 }}>Gender *</label>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Male', 'Female', 'Others'].map(g => (
                <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
                  <input
                    type="radio" name="gender" value={g.toLowerCase()}
                    checked={form.gender === g.toLowerCase()}
                    onChange={() => setForm({ ...form, gender: g.toLowerCase() })}
                    style={{ accentColor: 'var(--red)' }}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '100%', marginTop: 24,
              padding: '14px', background: 'linear-gradient(135deg, var(--red), var(--red-dark))',
              color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 4px 20px rgba(192,0,12,0.35)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            GET IT NOW <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── About iScale Learning ── */
const AboutSection = ({ setCurrentPage }) => (
  <section className="reveal" style={{ padding: '50px 0', background: '#fff' }}>
    <div className="container about-grid">
      {/* Video card */}
      <div style={{
        background: '#fff', borderRadius: 24, overflow: 'hidden',
        aspectRatio: '9/16', position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
        border: '8px solid #fff',
        transition: 'transform 0.3s ease',
        height: '600px',
        maxWidth: '340px',
        margin: '0 auto'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <video 
          src="https://www.theiscale.com/myadmin/uploads/docvideo/website_Cover_Video_2_0.mov" 
          autoPlay muted loop playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top', borderRadius: 16 }} 
        ></video>
      </div>

      {/* Content */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, marginBottom: 20, lineHeight: 1.1, color: '#111' }}>
          Know About <span style={{ color: 'var(--red)' }}>iScale</span><br />Learning
        </h2>
        <p style={{ color: '#666', fontSize: 16, lineHeight: 1.75, marginBottom: 40, maxWidth: 540 }}>
          A well-organized and flexible program that takes care of you. You start as a Beginner, Intermediate, or Advanced learner based on your skills.
        </p>
        <div className="features-grid">
          {[
            { 
              color: '#fff9c4', 
              icon: <div style={{ background: '#fbc02d', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Star size={22} fill="currentColor" /></div>, 
              title: 'Realtime Projects', 
              desc: 'Dive into Industry-Oriented Projects, where learning meets real-world impact' 
            },
            { 
              color: '#e3f2fd', 
              icon: <div style={{ background: '#1e88e5', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Play size={22} fill="currentColor" /></div>, 
              title: 'LIVE Class', 
              desc: 'Never face challenges alone, our instant Doubt support is always available.' 
            },
            { 
              color: '#fce4ec', 
              icon: <div style={{ background: '#e91e63', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Play size={22} fill="currentColor" /></div>, 
              title: 'Outcome Driven', 
              desc: 'Elevate your learning journey with Outcome-Driven magic.' 
            },
          ].map(card => (
            <div key={card.title} style={{
              background: card.color, borderRadius: 16, padding: 24,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)'; }}
            >
              {card.icon}
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 10, color: '#111' }}>{card.title}</h4>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{card.desc}</p>
              <button 
                onClick={() => setCurrentPage('about-us')}
                style={{ background: 'none', border: 'none', color: '#111', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginTop: 'auto' }}>
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── Student Testimonials ── */
const testimonialVideos = [
  'Mahendra_short_for_website.mov', 'Yogesh_Short_for_Website.mov', 'Sanjay_Testimonial_Short_for_Website.mov', 
  'Shubham_Testimonial_Short_for_Website.mov', 'Krunal_Short_for_Website.mov', 'Kartik_short_for_Website-1.mov', 
  'Micheal_Shorrt_for_Website.mov', 'Student_Shorts_9.mov', 'Student_Shorts_6.mov', 'Student_Shorts_11.mov', 
  'Student_Shorts_5.mov', 'Student_Shorts_7.mov', 'Student_Shorts_3.mov', 'Student_Shorts_8.mov', 
  'Student_Shorts_4.mov', 'Student_Shorts_1-1.mov', 'Student_Shorts_10.mov', 'Student_Shorts_2.mov'
];

const TestimonialsSection = () => {
  return (
    <section className="reveal" style={{ padding: '50px 0', background: '#f9f9f9', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>THE ISCALE</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>Students Testimonials</h2>

        <AutoSlider 
          items={testimonialVideos} 
          speed={40} 
          gap={16}
          renderItem={(vid, index) => (
            <div key={index} style={{ 
              width: 220, height: 380, borderRadius: 16, overflow: 'hidden', 
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)', background: '#000',
              flexShrink: 0, position: 'relative', border: '4px solid #fff'
            }}>
              <video
                width="100%"
                height="100%"
                autoPlay muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', background: '#000' }}
              >
                <source src={`https://www.theiscale.com/myadmin/uploads/video/${vid}`} type="video/mp4" />
              </video>
            </div>
          )}
        />

      </div>
    </section>
  );
};

/* ── Latest Job Updates ── */
const updatedJobData = [
  { company: 'm360Research', role: 'Analyst - Reporting, Data Services', salary: 'INR 6,00,000 - 12,00,000 PA', type: 'red' },
  { company: 'SAXO', role: 'Apprentice- Business Analyst', salary: 'INR 25,000 - 35,000 PA', type: 'white', logoBg: '#1e3a8a', logoColor: '#fff' },
  { company: 'H', role: 'Accounts Payable Analyst', salary: 'INR 30,000 - 45,000 PA', type: 'red' },
  { company: 'MANN+HUMMEL', role: 'Specialist - Analytics', salary: 'INR 35,000 - 65,000 PA', type: 'white', logoColor: '#2e7d32' },
  { company: 'WM', role: 'India Junior Analyst, Process', salary: 'INR 3,00,000 - 4,50,000 PA', type: 'red' },
  { company: 'Cushman & Wakefield', role: 'Analyst - CRE Due Diligence', salary: 'INR 6,50,000 - 8,50,000 PA', type: 'white', logoBg: '#1e1b4b', logoColor: '#fff' },
  { company: 'INNOCEAN', role: 'Management Trainee', salary: 'INR 18,000 - 25,000 PA', type: 'red' },
  { company: 'TOOLYT', role: 'Business Analyst - Fresher at Toolyt', salary: 'INR 2,00,000 - 3,50,000 PA', type: 'white', logoBg: '#0f172a', logoColor: '#fff' },
  { company: 'Gallagher', role: 'Business Analyst - Gallagher', salary: 'INR 4,00,000 - 7,50,000 PA', type: 'red' }
];

const LatestUpdates = ({ setCurrentPage }) => {
  return (
    <section className="reveal" style={{ padding: '50px 0', background: '#f8f9fa' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: '#eef2ff', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>EXPLORE OPPORTUNITIES</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: '#0f172a' }}>Latest Updates</h2>

        <AutoSlider 
          items={updatedJobData} 
          speed={35} 
          direction="right"
          renderItem={(job, i) => (
            <div key={i}
              style={{
                width: 340, height: 220, borderRadius: 12, padding: '32px 24px', 
                background: job.type === 'red' ? 'linear-gradient(135deg, #b91c1c, #7f1d1d)' : '#fff',
                color: job.type === 'red' ? '#fff' : '#0f172a',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                position: 'relative', flexShrink: 0, border: '1px solid #eee'
              }}>
              <div style={{ 
                width: 64, height: 64, background: job.logoBg || '#f1f5f9', borderRadius: 12, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                fontWeight: 800, color: job.logoColor || '#1e293b', fontSize: 24,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                {job.company.charAt(0)}
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>{job.role}</h4>
              <p style={{ fontSize: 13, opacity: 0.9, textAlign: 'center', background: 'rgba(0,0,0,0.05)', padding: '4px 12px', borderRadius: 100 }}>{job.salary}</p>
              {job.type === 'red' && <div style={{ position: 'absolute', top: 16, right: 24, fontSize: 40, color: 'rgba(255,255,255,0.2)', fontFamily: 'serif', lineHeight: 1 }}>"</div>}
            </div>
          )}
        />
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button 
            onClick={() => setCurrentPage('job-updates')}
            style={{ padding: '12px 32px', background: '#eef2ff', color: 'var(--red)', borderRadius: 8, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={e => e.target.style.background = '#e0e7ff'}
            onMouseLeave={e => e.target.style.background = '#eef2ff'}
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── Popular Courses ── */
const coursesData = [
  { tag: 'LIVE', title: 'AI Cohort Course Batch 01', subtitle: 'Complete AI Guide for Everyone', price: '₹4,999', original: '₹14,999', img: 'https://www.theiscale.com/myadmin/uploads/courses/The_Complete_AI_Guide_(7).jpg', color: '#1a1a2e' },
  { tag: 'APP + WEB', title: 'Complete AI Guide', subtitle: 'For Everyone', price: '₹2,999', original: '₹9,999', img: 'https://www.theiscale.com/myadmin/uploads/courses/The_Complete_AI_Guide_(9).jpg', color: '#16213e' },
  { tag: 'POPULAR', title: 'Data Science Masters', subtitle: 'From Beginner to Pro', price: '₹5,999', original: '₹18,999', img: 'https://www.theiscale.com/myadmin/uploads/courses/Data_science_Course_paid_compressed.png', color: '#0f3460' },
  { tag: 'NEW', title: 'Business Analytics', subtitle: 'Complete Course', price: '₹3,499', original: '₹11,999', img: 'https://www.trainings.industrieshelpinghands.com/admin/uploads/courses/Data_Analytics_paid_compressed.png', color: '#533483' },
];

const PopularCourses = ({ setCurrentPage }) => (
  <section className="reveal" style={{ padding: '50px 0', background: '#f4f4f8' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>TOP POPULAR COURSES</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>
        Most Popular <span style={{ color: 'var(--red)' }}>Courses</span>
      </h2>

      <div className="courses-grid">
        {coursesData.map((course, i) => (
          <div key={i} className="premium-card" style={{ borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: 'var(--shadow-card)', cursor: 'pointer' }}
          
          >
            {/* Course image */}
            <div className="premium-card-img-wrap" style={{ background: course.color, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: 20
            }}>
              <span style={{
                position: 'absolute', top: 12, left: 12,
                background: course.tag === 'LIVE' ? '#e50000' : '#333',
                color: '#fff', padding: '3px 10px',
                borderRadius: 100, fontSize: 11, fontWeight: 700
              }}>
                {course.tag === 'LIVE' ? '🔴 LIVE' : course.tag}
              </span>
              <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.4 }} />
              <div style={{ position: 'relative', zIndex: 1, fontSize: 24, fontWeight: 800, color: '#fff', textAlign: 'center', padding: '0 20px' }}>{course.title.split(' ')[0]}</div>
            </div>

            {/* Card content */}
            <div style={{ padding: 16 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4, lineHeight: 1.3 }}>{course.title}</h4>
              <p style={{ color: '#888', fontSize: 12, marginBottom: 12 }}>{course.subtitle}</p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#FFD700" color="#FFD700" />)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--red)' }}>{course.price}</span>
                <span style={{ color: '#aaa', fontSize: 13, textDecoration: 'line-through' }}>{course.original}</span>
              </div>
              <button
                onClick={() => setCurrentPage('courses')}
                style={{
                  marginTop: 14, width: '100%', padding: '10px',
                  background: 'var(--red)', color: '#fff',
                  borderRadius: 8, fontWeight: 600, fontSize: 13,
                  border: 'none', cursor: 'pointer', transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.target.style.background = 'var(--red-dark)'}
                onMouseLeave={e => e.target.style.background = 'var(--red)'}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          onClick={() => setCurrentPage('courses')}
          style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: 'var(--red)', borderRadius: 8, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #e0e7ff, #d8e2ff)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff, #e0e7ff)'; }}
        >
          View All Courses
        </button>
      </div>
    </div>
  </section>
);

/* ── Industry Experts ── */
const experts = [
  { name: 'Prasad Menon', role: 'CHRO', company: 'Amagi, Flipkart', logo: 'https://www.theiscale.com/myadmin/uploads/more/amagi1.png', img: 'https://www.theiscale.com/myadmin/uploads/more/prasad_menon.png', ytLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { name: 'Mr Jaibir Siwach', role: 'CEO & Founder', company: 'Kabira Mobility', logo: 'https://www.theiscale.com/myadmin/uploads/more/kabira.png', img: 'https://www.theiscale.com/myadmin/uploads/more/Jaibir_Siwach_small1.png', ytLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { name: 'Harjeet Khanduja', role: 'Vice President', company: 'Reliance Jio', logo: 'https://www.theiscale.com/myadmin/uploads/more/reliance_jio.png', img: 'https://www.theiscale.com/myadmin/uploads/more/sardar_ji.png', ytLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { name: 'Mr Rahil Gupta', role: 'Co-founder and CTO', company: 'Hop Electric Vehicle', logo: 'https://www.theiscale.com/myadmin/uploads/more/hop_logo.png', img: 'https://www.theiscale.com/myadmin/uploads/more/Rahil_Hop_small1.png', ytLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { name: 'Mr. Dhiraj Shetty', role: 'Sr. G.M. - HR & Operations', company: 'Ultraviolette Automotive', logo: 'https://www.theiscale.com/myadmin/uploads/more/Uktravoillette_logo.png', img: 'https://www.theiscale.com/myadmin/uploads/more/Dhirajshetty_ultravoillette.png', ytLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

const ExpertsSection = ({ setCurrentPage }) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState('');

  const handleOpenVideo = (link) => {
    // Open directly in a new tab to avoid iframe blocking and autoplay issues on the page
    window.open(link, '_blank');
  };

  return (
    <section style={{ padding: '50px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>LEADERS TALK</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 8 }}>Talk With Industry Experts</h2>
        <p style={{ color: '#777', textAlign: 'center', marginBottom: 24, maxWidth: 600, margin: '0 auto 48px' }}>
          Dive into industry-centric learning, shaped by direct input from CEOs and CHROs. Elevate your skills with insights that set you apart.
        </p>

        <AutoSlider 
          items={experts} 
          speed={50} 
          gap={24}
          renderItem={(expert, i) => (
            <div key={i} style={{
              width: 240, border: '1px solid #eee', borderRadius: 16, padding: 20,
              textAlign: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: '#fff', cursor: 'pointer', flexShrink: 0
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `hsl(${i * 60}, 30%, 85%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', margin: '0 auto 12px'
              }}>
                <img src={expert.img} alt={expert.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{expert.name}</div>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 12 }}>{expert.role}</div>
              <div style={{ color: '#555', fontSize: 11, marginBottom: 16, padding: '8px', background: '#f8f8f8', borderRadius: 8 }}>{expert.company}</div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage('placement-talks');
                }}
                style={{
                width: '100%', padding: '8px', background: 'var(--red)',
                color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 12,
                border: 'none', cursor: 'pointer', transition: 'background 0.3s'
              }}
              onMouseEnter={e => e.target.style.background = 'var(--red-dark)'}
              onMouseLeave={e => e.target.style.background = 'var(--red)'}
              >Know More</button>
            </div>
          )}
        />
        
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button 
            onClick={() => setCurrentPage('placement-talks')}
            style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: 'var(--red)', borderRadius: 8, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #e0e7ff, #d8e2ff)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff, #e0e7ff)'; }}
          >
            View All
          </button>
        </div>
      </div>
      
    </section>
  );
};

/* ── Company Logos Marquee ── */
const companies = ['BAXY', 'magenta', 'airblack', 'OSM', 'planetspark', 'OLA ELECTRIC', 'Deloitte', 'Accenture', 'Reliance', 'Flipkart'];

const CompanyMarquee = ({ setCurrentPage }) => (
  <section style={{ padding: '60px 0', background: '#f9f9f9', overflow: 'hidden' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>TOP COMPANIES</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 40 }}>
        For <span style={{ color: 'var(--red)' }}>Placement</span> Opportunities
      </h2>
    </div>
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-flex', gap: 40, animation: 'marquee 20s linear infinite' }}>
        {[...companies, ...companies].map((c, i) => (
          <div key={i} style={{
            padding: '12px 28px', background: '#fff', borderRadius: 12,
            boxShadow: 'var(--shadow-card)', display: 'inline-flex', alignItems: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#333',
            whiteSpace: 'nowrap', minWidth: 140, justifyContent: 'center'
          }}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <button 
        onClick={() => setCurrentPage('placement')}
        style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: 'var(--red)', borderRadius: 8, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #e0e7ff, #d8e2ff)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff, #e0e7ff)'; }}
      >View More</button>
    </div>
  </section>
);

/* ── Interactive Success Stories (Rebuilt from Screenshot) ── */
const rebuiltSuccessStories = [
  { id: 1, type: 'featured', name: 'Manas Jyoti Borah', company: 'The GoodGlamm GROUP', feedback: "A big thank you to 'The iSCALE' for a successful placement. Educator's and Placement team support's a lot!", ytLink: 'https://www.youtube.com/embed/g-mq68g01q4', img: 'https://www.theiscale.com/myadmin/uploads/more/manas.png' },
  { id: 2, type: 'grid', name: 'ADITYA', company: 'Network Tech', role: 'Data Analyst', img: 'https://www.theiscale.com/myadmin/uploads/more/Aditya_student_.jpeg' },
  { id: 3, type: 'grid', name: 'AMIT', company: 'Top MNC', role: 'Data Analyst', img: 'https://www.theiscale.com/myadmin/uploads/more/Amit.jpeg' },
  { id: 4, type: 'grid', name: 'SHUBHAM', company: 'Tech', role: 'Software Engineer', img: 'https://www.theiscale.com/myadmin/uploads/more/shubham1.png' },
  { id: 5, type: 'grid', name: 'AMAN', company: 'Accenture', role: 'Analyst', img: 'https://www.theiscale.com/myadmin/uploads/more/aman.png' },
  { id: 6, type: 'grid', name: 'SURYAKANT', company: 'fiserv', role: 'Developer', img: 'https://www.theiscale.com/myadmin/uploads/more/suryakant.png' },
];

export const SuccessStories = ({ setCurrentPage }) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const featured = rebuiltSuccessStories[0];
  const gridItems = rebuiltSuccessStories.slice(1);

  return (
    <section style={{ padding: '50px 0', background: 'linear-gradient(to bottom right, #f8f9ff, #fff0f5)' }}>
      <div className="container">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, textAlign: 'center', marginBottom: 24, color: '#1e293b' }}>
          Success Stories
        </h2>

        <div className="success-grid">
          {/* Featured Card */}
          <div className="featured-success-card" style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', position: 'relative', display: 'flex' }}>
            <div className="featured-img-container" style={{ background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
               <img src={featured.img} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }} />
            </div>
            <div style={{ padding: 40, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>{featured.company}</div>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{featured.name}</h3>
              <p style={{ color: 'var(--red)', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>@ {featured.company}</p>
              
              <div style={{ color: '#64748b', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>feedback :</div>
              <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>{featured.feedback}</p>
              
              <button 
                onClick={() => setVideoOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                  background: 'linear-gradient(135deg, var(--red), var(--red-dark))', color: '#fff', borderRadius: 100, border: 'none',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer', width: 'fit-content',
                  boxShadow: '0 4px 15px rgba(192,0,12,0.3)', transition: 'all 0.3s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(192,0,12,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(192,0,12,0.3)'; }}
              >
                Youtube <Play size={16} fill="#fff" />
              </button>
            </div>
            {/* Background shape */}
            <div style={{ position: 'absolute', right: -50, top: -50, width: 200, height: 200, borderRadius: '50%', border: '40px solid #fae8e8', opacity: 0.5, zIndex: 0 }} />
          </div>

          {/* Auto Slider for Grid Cards */}
          <div style={{ marginTop: 20 }}>
            <AutoSlider 
              items={gridItems} 
              speed={20}
              gap={24}
              renderItem={(item, idx) => (
                <div key={idx} className="premium-card" style={{ width: 380, height: 420, background: '#fff', borderRadius: 24, padding: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', overflow: 'hidden', flexShrink: 0, border: '1px solid #eee' }}>
                   <div className="premium-card-img-wrap" style={{ width: '100%', height: '70%', background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}>
                     <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }} />
                     <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))' }} />
                   </div>
                   <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                     <div style={{ fontWeight: 900, fontSize: 24, color: '#1e293b', marginBottom: 4 }}>{item.name}</div>
                     <div style={{ fontSize: 18, color: 'var(--red)', fontWeight: 700, marginBottom: 8 }}>{item.company}</div>
                     {item.role && <div style={{ fontSize: 14, color: '#64748b', background: '#f8fafc', padding: '6px 12px', borderRadius: 100, display: 'inline-block' }}>{item.role}</div>}
                   </div>
                </div>
              )}
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button 
            onClick={() => setCurrentPage('success-story')}
            style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: 'var(--red)', borderRadius: 8, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #e0e7ff, #d8e2ff)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff, #e0e7ff)'; }}
          >
            View
          </button>
        </div>
      </div>

      {videoOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setVideoOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 24 }}>✕</button>
          <iframe width="80%" height="80%" src={featured.ytLink} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen style={{ borderRadius: 16 }} />
        </div>
      )}
    </section>
  );
};

/* ── India's Most Loved Learners Community ── */
const communityStats = [
  { val: '2+', label: 'Millions Views', icon: '👨‍🎓' },
  { val: '1.55+', label: 'Lakh Watch Hours', icon: '📺' },
  { val: '50,000+', label: 'Active Learners', icon: '📚' },
  { val: '150+', label: 'Allied Companies', icon: '🤝' },
];

const LearnersCommunity = () => (
  <section style={{ padding: '50px 0', background: '#f8fafc' }}>
    <div className="container">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 30, color: '#1e293b' }}>
        India's Most Loved <br/> Learners Community <span style={{ color: 'var(--red)' }}>❤️</span>
      </h2>

      <div className="community-stats" style={{ position: 'relative' }}>
        {/* Connecting Red Line */}
        <div className="connecting-line" />

        {communityStats.map((stat, idx) => (
          <div key={idx} className="community-stat-item" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Timeline Node */}
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '4px solid var(--red)', background: '#fff', marginBottom: 24, position: 'relative' }}>
               <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', width: 2, height: 40, background: 'var(--red)', zIndex: -1 }} />
            </div>

            {/* Stat Card */}
            <div style={{ background: '#fff', borderRadius: 16, padding: '30px 20px', width: '100%', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderBottom: '4px solid var(--red)', position: 'relative', overflow: 'hidden' }}>
              {/* Top semi-circle design */}
              <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 100, height: 100, borderRadius: '50%', border: '15px solid #fae8e8' }} />
              
              <div style={{ width: 48, height: 48, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px', position: 'relative', zIndex: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#1e293b', marginBottom: 8 }}>{stat.val}</div>
              <div style={{ fontSize: 14, color: '#64748b' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Our Allied Colleges ── */
const alliedColleges = [
  { name: 'Silver Oak University', logo: 'SOU', img: 'https://www.theiscale.com/myadmin/uploads/more/Silver_Oak_University.png' },
  { name: 'Lokmanya Tilak College of Engineering', logo: 'LTCE', img: 'https://www.theiscale.com/myadmin/uploads/more/Lokmanya_Tilak_College_of_Engineering_,_Navi_Mumbai_logo.png' },
  { name: 'Rajkiya Engineering College', logo: 'REC', img: 'https://www.theiscale.com/myadmin/uploads/more/Rajkiya_Engineering_College_Ambedkar_Nagar.png' },
  { name: "MGM's College of Engineering", logo: 'MGM', img: 'https://www.theiscale.com/myadmin/uploads/more/MGMs_College_of_Engineering_and_Technology_logo.png' },
];

const AlliedColleges = ({ setCurrentPage }) => {
  return (
    <section style={{ padding: '50px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ background: '#eef2ff', color: 'var(--red)', padding: '6px 20px', borderRadius: 100, fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>
            ACADEMIC SYNERGY
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 24, color: '#1e293b' }}>
          Our Allied Colleges
        </h2>

        <div style={{ position: 'relative', marginTop: 20, padding: '0 40px' }}>
          {/* Custom Slider Track for Allied Colleges */}
          <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 20, scrollBehavior: 'smooth' }} className="hide-scrollbar">
            {[
              { name: 'MGM\'s College of Engineering and Technology', img: 'https://www.theiscale.com/myadmin/uploads/more/MGMs_College_of_Engineering_and_Technology_logo.png' },
              { name: 'D J Sanghvi College of Engineering, Mumbai', img: 'https://www.theiscale.com/myadmin/uploads/more/dj_sanghvi_logo.png', isRed: true },
              { name: 'HRIT Group of Institutions', img: 'https://www.theiscale.com/myadmin/uploads/more/HRIT_logo.png' },
              { name: 'Silver Oak University', img: 'https://www.theiscale.com/myadmin/uploads/more/Silver_Oak_University.png', isRed: true }
            ].map((college, idx) => (
              <div key={idx} style={{ 
                width: 360, height: 180, borderRadius: 16, 
                background: college.isRed ? 'linear-gradient(135deg, #a91111, #8b0000)' : '#fff', 
                padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                position: 'relative', flexShrink: 0, 
                boxShadow: college.isRed ? '0 15px 30px rgba(139,0,0,0.2)' : '0 10px 20px rgba(0,0,0,0.05)', 
                border: college.isRed ? 'none' : '1px solid #eee',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
              >
                {college.isRed && <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 60, color: 'rgba(255,255,255,0.9)', fontFamily: 'serif', lineHeight: 1 }}>“</div>}
                {college.isRed && <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 60, color: 'rgba(255,255,255,0.9)', fontFamily: 'serif', lineHeight: 1 }}>”</div>}
                
                <div style={{ background: college.isRed ? '#000' : 'transparent', padding: college.isRed ? 8 : 0, borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80 }}>
                  <img src={college.img} alt={college.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, textAlign: 'center', color: college.isRed ? '#1e293b' : '#1e293b', zIndex: 1, position: 'relative' }}>
                  {college.name}
                </div>
              </div>
            ))}
          </div>
          
          <button style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
            <ChevronLeft size={20} color="#333" />
          </button>
          <button style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1px solid #eee', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
            <ChevronRight size={20} color="#333" />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button 
            onClick={() => setCurrentPage('allied-colleges')}
            style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: 'var(--red)', borderRadius: 8, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #e0e7ff, #d8e2ff)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff, #e0e7ff)'; }}
          >
            View All Allied College
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── Latest News & Updates ── */
const newsData = [
  { 
    img: 'https://www.theiscale.com/myadmin/uploads/more/1.jpg', 
    title: 'The iScale received recognition from Indian Startup News', 
    desc: 'Entrackr | The Karo Startup | Read Article', 
    link: '/news-details' 
  },
  { 
    img: 'https://www.theiscale.com/myadmin/uploads/more/WhatsApp_Image_2024-09-08_at_15_24_542.jpeg', 
    title: 'The iScale was recognized by 14th President of India Shri Ram Nath Kovind.', 
    desc: 'Our founders Miss. Swati & Mr. Nishant Dhote', 
    link: '/news-details' 
  },
  { 
    img: 'https://www.theiscale.com/myadmin/uploads/more/WhatsApp_Image_2024-09-08_at_15_50_15.jpeg', 
    title: 'In India Financial Gap Problem is bigger which gives birth to the Skill Gap Problem.', 
    desc: 'Josh Talks Speaker | Founder The iScale', 
    link: '/news-details' 
  },
];

const NewsUpdates = ({ setCurrentPage }) => (
  <section style={{ padding: '60px 0', background: '#fff' }}>
    <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 40, color: '#1a202c' }}>
        Latest <span style={{ color: 'var(--red)' }}>News & Updates</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, justifyContent: 'center' }}>
        {newsData.map((news, idx) => (
          <div key={idx} style={{ 
            background: '#fff', borderRadius: 8, overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
          >
            <div style={{ width: '100%', height: 300, overflow: 'hidden' }}>
              <img src={news.img} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }} />
            </div>
            
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a202c', marginBottom: 12, lineHeight: 1.4 }}>{news.title}</h3>
              <p style={{ color: '#718096', fontSize: 13, marginBottom: 20, flex: 1 }}>{news.desc}</p>
              
              <a href={news.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4a5568', fontWeight: 600, fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                 onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                 onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
              >
                Learn More <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button 
          onClick={() => setCurrentPage('news')}
          style={{ 
            padding: '12px 28px', background: '#e6eafb', color: '#4c63b6', 
            borderRadius: 6, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseEnter={e => e.target.style.background = '#d2d9f7'}
          onMouseLeave={e => e.target.style.background = '#e6eafb'}
        >
          View All News
        </button>
      </div>
    </div>
  </section>
);

/* ── We've been in the news! ── */
const mediaMentions = [
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/test_31.png', title: 'Join our 1,00,000+ subscribers and access 1000+ free educational videos to boost your learning!', link: 'https://www.youtube.com/@theiScale/videos' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/Josh_Talk.png', title: 'Meet Nishant Dhote, the visionary founder behind "The iScale," India\'s leading affordable upskilling tech platform.', link: 'https://www.youtube.com/watch?v=kjT9txv6ULc' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/Haribhoomi1.png', title: 'AI-Driven Platform Personalizes Learning Experience for 1,00,000 Million Students Across Diverse Subjects and Levels', link: 'https://ibb.co/87hNQYM' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/Entrackr1.png', title: 'Startup Offers Courses Bridging the Skill Gap in the EV and IT Sector Through Innovative Training Programs', link: 'https://entrackr.com/2023/02/industries-helping-hands-offers-courses-bridging-the-skill-gap-in-the-ev-and-it-sector/' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/Patrika1.png', title: 'Startup Unveils Breakthrough AI Technology for Real-Time Feedback in Remote Learnin', link: 'https://ibb.co/jJ5cgVc' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/Hitvada.png', title: 'The iScale Startup Recognized By India\'s 14th President for it\'s Innovation Upskilling Impact', link: 'https://ibb.co/tP2T16D' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/Dainik_Bhaskar1.png', title: 'AI Driven Education Platform Receives Top Honors for Innovation in Learning Technology.', link: 'https://ibb.co/PM6Qkgs' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/karo_Startup12.png', title: 'The iScale, Community-Driven Tech Startup, Empowering Over 100,000+ Learners Through Upskilling', link: 'https://thekarostartup.com/iscale-story/' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/Navbharat.png', title: 'AI Startup Revolutionizes Classroom Learning with New Adaptive Tutoring System', link: 'https://ibb.co/TMtGCDK' },
  { img: 'https://www.theiscale.com/myadmin/uploads/stdnews/Hindustan_Times.png', title: 'Sustainable Development Through Upskilling: India\'s Engineering Renaissance Begins', link: 'https://www.hindustantimes.com/' },
];

const InTheNews = () => {
  return (
    <section style={{ padding: '50px 0', background: 'linear-gradient(to bottom, #fff, #f8f9ff)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
            THE MEDIA LOVES US, AND MORE SO, OUR STUDENTS.
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, textAlign: 'center', marginBottom: 30, color: '#0f172a' }}>
          We've been in the news!
        </h2>

        <AutoSlider 
          items={mediaMentions} 
          speed={40} 
          gap={24}
          renderItem={(mention, i) => (
            <div key={i} style={{
              width: 320, minHeight: 180, background: '#fff', borderRadius: 16, padding: '24px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9',
              display: 'flex', flexDirection: 'column', flexShrink: 0,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; }}
            onClick={() => window.open(mention.link, '_blank')}
            >
              <div style={{ marginBottom: 16, height: 40, display: 'flex', alignItems: 'center' }}>
                <img src={mention.img} alt="News Logo" style={{ maxWidth: '60%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.5, marginBottom: 20, flex: 1, fontWeight: 500 }}>
                {mention.title}
              </p>
              
              <a 
                href={mention.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  display: 'inline-block', background: 'var(--red)', color: '#fff', 
                  padding: '6px 16px', borderRadius: 6, fontWeight: 700, fontSize: 12, 
                  textDecoration: 'none', transition: 'background 0.3s', alignSelf: 'flex-start' 
                }}
                onMouseEnter={e => { e.target.style.background = '#991b1b'; e.stopPropagation(); }}
                onMouseLeave={e => { e.target.style.background = 'var(--red)'; e.stopPropagation(); }}
                onClick={(e) => e.stopPropagation()}
              >
                Read More
              </a>
            </div>
          )}
        />
      </div>
    </section>
  );
};

/* ── Talk To Team ── */
const TalkToTeam = ({ setCurrentPage }) => (
  <section style={{ padding: '50px 0', background: '#fff' }}>
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', borderRadius: 24, padding: '40px 60px', border: '1px solid #e2e8f0' }}>
      <div style={{ flex: 1 }}>
        <span style={{ background: '#ffe5e8', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 20, display: 'inline-block' }}>
          GOT MORE QUESTIONS ?
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, color: '#1e293b', marginBottom: 16 }}>
          Talk <span style={{ color: 'var(--red)' }}>to our team directly</span>
        </h2>
        <p style={{ color: '#64748b', fontSize: 16, marginBottom: 32 }}>Contact us and our team will get in touch with you shortly</p>
        
        <button 
          onClick={() => setCurrentPage('contact')}
          style={{ padding: '14px 32px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(237, 28, 36, 0.3)', transition: 'background 0.2s' }}
          onMouseEnter={e => e.target.style.background = 'var(--red-dark)'}
          onMouseLeave={e => e.target.style.background = 'var(--red)'}
        >
          Contact Us
        </button>
      </div>
      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <img src="https://www.theiscale.com/assets/images/cont.jpg" alt="Support Team" style={{ width: 350, height: 350, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
      </div>
    </div>
  </section>
);

/* ── Allied Colleges Section ── */
const alliedCollegesData = [
  { name: 'Mandsaur University', img: 'https://www.theiscale.com/myadmin/uploads/more/Mandsaur_University_logo.png' },
  { name: 'Silver Oak University', img: 'https://www.theiscale.com/myadmin/uploads/more/Silver_Oak_University.png' },
  { name: 'Lokmanya Tilak College of Engineering', img: 'https://www.theiscale.com/myadmin/uploads/more/Lokmanya_Tilak_College_of_Engineering_,_Navi_Mumbai_logo.png' },
  { name: 'Rajkiya Engineering College', img: 'https://www.theiscale.com/myadmin/uploads/more/Rajkiya_Engineering_College_Ambedkar_Nagar.png' },
  { name: 'MGM Group of Institutions', img: 'https://www.theiscale.com/myadmin/uploads/more/MGMs_College_of_Engineering_and_Technology_logo.png' },
  { name: 'D J Sanghvi College', img: 'https://www.theiscale.com/myadmin/uploads/more/dj_sanghvi_logo.png' },
  { name: 'HRIT Group', img: 'https://www.theiscale.com/myadmin/uploads/more/HRIT_logo.png' },
  { name: 'Medi-Caps', img: 'https://www.theiscale.com/myadmin/uploads/more/medi_caps.png' },
];

const AlliedCollegesSection = ({ setCurrentPage }) => (
  <section className="reveal" style={{ padding: '50px 0', background: '#f8fafc' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: '#eef2ff', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>ACADEMIC PARTNERS</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: '#0f172a' }}>Allied Colleges</h2>

      <AutoSlider 
        items={alliedCollegesData} 
        speed={40} 
        direction="left"
        gap={24}
        renderItem={(college, i) => (
          <div key={i}
            style={{
              width: 260, height: 260, borderRadius: 16, padding: '24px', 
              background: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative', flexShrink: 0,
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; }}
          >
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 16 }}>
              <img src={college.img} alt={college.name} style={{ maxWidth: '80%', maxHeight: '100px', objectFit: 'contain' }} />
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1e3a5f', textAlign: 'center', margin: 0 }}>{college.name}</h4>
          </div>
        )}
      />
      
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <button 
          onClick={() => setCurrentPage('allied-colleges')}
          style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', color: 'var(--red)', borderRadius: 8, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #e0e7ff, #d8e2ff)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; e.currentTarget.style.background = 'linear-gradient(135deg, #eef2ff, #e0e7ff)'; }}
        >
          View All Colleges
        </button>
      </div>
    </div>
  </section>
);

/* ── Main Home Page ── */
const HomePage = ({ setCurrentPage }) => {
  useReveal();

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Hero setCurrentPage={setCurrentPage} />
      <AboutSection setCurrentPage={setCurrentPage} />
      <TestimonialsSection />
      <LatestUpdates setCurrentPage={setCurrentPage} />
      <PopularCourses setCurrentPage={setCurrentPage} />
      <ExpertsSection setCurrentPage={setCurrentPage} />
      <CompanyMarquee setCurrentPage={setCurrentPage} />
      <SuccessStories setCurrentPage={setCurrentPage} />
      <LearnersCommunity />
      <AlliedCollegesSection setCurrentPage={setCurrentPage} />
      <NewsUpdates setCurrentPage={setCurrentPage} />
      <InTheNews setCurrentPage={setCurrentPage} />
      <TalkToTeam setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default HomePage;
