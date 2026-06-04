import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Play, CheckCircle, Users, BookOpen, Award, TrendingUp, Sparkles, Gift, Layers, Brain, BarChart2, Check, Phone, Clock, Globe, Video } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import DataAnalyticsImg from '../assets/Data_Analytics_paid_compressed.png';
import MandsaurImg from '../assets/Mandsaur_University_logo.png';
import DJSanghviImg from '../assets/dj_sanghvi_logo.png';
import HRITImg from '../assets/HRIT_logo.png';
import MediCapsImg from '../assets/medi_caps.png';

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

const marketingSlides = [
  {
    id: 1,
    badge: 'NEW BATCH ARRIVING',
    title: 'Super Cohort 2.0',
    desc: 'Our flagship Data Science & Generative AI program is starting soon. Complete training with live mentor support and placement guarantees.',
    highlight: '20% Early Bird Discount',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #311015 100%)'
  },
  {
    id: 2,
    badge: 'PLACEMENT RECORDS',
    title: 'Industry Placements',
    desc: 'iScale alumni are coding at top-tier companies including Google, Amazon, Microsoft, and tech startups. Average hike of 150%.',
    highlight: '500+ Hiring MNC Partners',
    gradient: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)'
  },
  {
    id: 3,
    badge: 'ONLINE SANDBOX',
    title: 'Interactive Cloud Labs',
    desc: 'Practice coding right inside your browser! Built-in terminals and templates for Python, SQL, Jupyter Notebooks, and Power BI.',
    highlight: '100% Practical Exercises',
    gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)'
  },
  {
    id: 4,
    badge: 'DOUBT RESOLUTION',
    title: '24/7 Mentorship Support',
    desc: 'Connect immediately with technical experts and TAs via live voice rooms and custom collaborative screen-sharing.',
    highlight: 'Live 1-on-1 Assistance',
    gradient: 'linear-gradient(135deg, #451a03 0%, #3f160a 100%)'
  }
];

const MarketingCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % marketingSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % marketingSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? marketingSlides.length - 1 : prev - 1));

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 360, margin: '0 auto', animation: 'fadeUp 0.6s ease both' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweepGlare {
          0% { transform: rotate(35deg) translateY(-300%); }
          30% { transform: rotate(35deg) translateY(300%); }
          100% { transform: rotate(35deg) translateY(300%); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1.08); filter: blur(80px); }
        }
      `}} />

      {/* Dynamic Pulsing Back Glow (Enhanced Lighting) */}
      <div style={{
        position: 'absolute', top: '5%', left: '0%', width: '100%', height: '90%',
        background: marketingSlides[currentSlide].gradient, filter: 'blur(70px)',
        zIndex: 0, animation: 'pulseGlow 3s ease-in-out infinite', transition: 'background 0.6s ease',
        borderRadius: '50%'
      }} />

      {/* 3D Device Casing (Now Floating) */}
      <div className="animate-float" style={{
        position: 'relative',
        width: '100%',
        height: 560,
        borderRadius: 48,
        background: 'linear-gradient(145deg, #2b3044 0%, #0f121a 100%)', // Brighter metallic bezel
        padding: 12, // Bezel width
        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.9), inset 0 3px 6px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.05)',
        zIndex: 1
      }}>
        
        {/* Hardware Buttons (Volume & Power) */}
        <div style={{ position: 'absolute', top: 120, left: -4, width: 4, height: 40, background: '#1f2235', borderRadius: '4px 0 0 4px', boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', top: 170, left: -4, width: 4, height: 40, background: '#1f2235', borderRadius: '4px 0 0 4px', boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', top: 140, right: -4, width: 4, height: 60, background: '#1f2235', borderRadius: '0 4px 4px 0', boxShadow: 'inset -1px 0 2px rgba(255,255,255,0.1)' }} />

        {/* Device Screen */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: 36,
          overflow: 'hidden',
          background: '#000',
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.15), inset 0 20px 40px rgba(255,255,255,0.05)', // Stronger inner light
        }}>

          {/* Sweeping Glass Glare */}
          <div style={{
            position: 'absolute', top: -100, left: -200, width: '250%', height: '250%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none', zIndex: 25,
            animation: 'sweepGlare 8s infinite cubic-bezier(0.4, 0, 0.2, 1)'
          }} />

          {/* Dynamic Island / Notch */}
          <div style={{
            position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 26, background: '#000', borderRadius: 20, zIndex: 30,
            boxShadow: 'inset 0 -1px 1px rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12
          }}>
             <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a0d16', border: '1px solid #1a1a2e', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 2, left: 2, width: 3, height: 3, background: 'rgba(255,255,255,0.5)', borderRadius: '50%' }} />
             </div>
             <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e', opacity: 0.8 }} />
          </div>
      {/* Slide Track */}
      <div style={{
        display: 'flex',
        width: '400%',
        height: '100%',
        transform: `translateX(-${currentSlide * 25}%)`,
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {marketingSlides.map((slide) => (
          <div key={slide.id} style={{
            width: '25%',
            height: '100%',
            background: slide.gradient,
            padding: '40px 32px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            textAlign: 'left',
            color: '#fff'
          }}>
            {/* Soft decorative background shape */}
            <div style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-20%',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              filter: 'blur(40px)',
              animation: 'pulseGlow 6s infinite alternate'
            }} />

            <div style={{
              display: 'inline-block',
              alignSelf: 'flex-start',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: 100,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1.5,
              marginBottom: 20,
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {slide.badge}
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 16,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              background: 'linear-gradient(180deg, #fff, rgba(255,255,255,0.8))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {slide.title}
            </h2>

            <p style={{
              fontSize: 14,
              lineHeight: 1.6,
              opacity: 0.85,
              marginBottom: 32
            }}>
              {slide.desc}
            </p>

            <div style={{
              alignSelf: 'flex-start',
              background: 'rgba(255,255,255,0.15)',
              padding: '10px 20px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {slide.highlight}
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Left Arrow */}
          <button onClick={prevSlide} style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer', zIndex: 10, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}>
            <ChevronLeft size={24} />
          </button>

          {/* Navigation Right Arrow */}
          <button onClick={nextSlide} style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer', zIndex: 10, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}>
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators / Dots */}
          <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 10, zIndex: 10 }}>
            {marketingSlides.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)} style={{ width: currentSlide === idx ? 28 : 10, height: 10, borderRadius: 5, background: currentSlide === idx ? '#fff' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', padding: 0 }} />
            ))}
          </div>
          
          {/* Device Home Bar */}
          <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 140, height: 6, background: 'rgba(255,255,255,0.8)', borderRadius: 3, zIndex: 20, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />

        </div>
      </div>
    </div>
  );
};

/* ── Hero Section ── */
const Hero = ({ setCurrentPage }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', contact: '', whatsapp: '', gender: 'male', sameWA: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly for the FREE Live Class.');
  };
  return (
    <section style={{ background: 'var(--gradient-hero)', padding: '80px 0 60px', minHeight: '85vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div className="abstract-grid" />
        <div className="abstract-lines" />
        <div className="bg-shape" style={{ width: 500, height: 500, background: 'var(--glow-primary)', top: '-10%', left: '-5%', animationDelay: '0s' }} />
        <div className="bg-shape" style={{ width: 400, height: 400, background: 'var(--glow-secondary)', bottom: '10%', right: '-5%', animationDelay: '2s', animationName: 'float-medium' }} />
      </div>
      <div className="container mobile-col" style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 60, alignItems: 'center' }}>
        {/* Left content */}
        <div style={{ flex: 1, animation: 'fadeUp 0.7s ease forwards', width: '100%' }}>
          <div className="glass-card" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            borderRadius: 100, padding: '8px 18px',
            marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)'
          }}>
            <Award size={16} color="var(--red)" /> Upskilling millions for tech readiness
          </div>

          <h1 style={{ fontSize: 'clamp(30px, 8vw, 56px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, wordBreak: 'break-word', hyphens: 'auto' }}>
            India's Trusted{' '}
            <span className="animated-text-gradient">Upskilling &<br />E-Learning</span>{' '}
            Platform for<br />Future Readiness.
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 36, maxWidth: 520 }}>
            In India, millions of professionals and college graduates lack affordable access to industry-aligned education. iScale aims to democratize it, blending quality with affordability to create a widespread impact.
          </p>

          <div style={{ display: 'flex', gap: 16 }}>
            <button
              className="btn-shine"
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

        {/* Right form replaced by marketing slides carousel */}
        <div style={{ width: '100%', maxWidth: 420, animation: 'fadeUp 0.7s 0.2s ease both' }}>
          <MarketingCarousel />
        </div>
      </div>
    </section>
  );
};

/* ── About iScale Learning ── */
const AboutSection = ({ setCurrentPage }) => (
  <section className="reveal" style={{ padding: '50px 0', background: 'var(--bg-primary)' }}>
    <div className="container about-grid">
      {/* Video card */}
      <div className="glow-border animate-float" style={{
        background: 'var(--bg-primary)', borderRadius: 24, overflow: 'hidden',
        aspectRatio: '9/16', position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
        border: '8px solid var(--card-bg)',
        height: '600px',
        maxWidth: '340px',
        margin: '0 auto'
      }}>
        <video 
          src="https://www.theiscale.com/myadmin/uploads/docvideo/website_Cover_Video_2_0.mov" 
          autoPlay muted loop playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top', borderRadius: 16 }} 
        ></video>
      </div>

      {/* Content */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, marginBottom: 20, lineHeight: 1.1, color: 'var(--text-primary)' }}>
          Know About <span style={{ color: 'var(--red)' }}>iScale</span><br />Learning
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.75, marginBottom: 40, maxWidth: 540 }}>
          A well-organized and flexible program that takes care of you. You start as a Beginner, Intermediate, or Advanced learner based on your skills.
        </p>
        <div className="features-grid">
          {[
            { 
              accent: '#fbc02d', 
              icon: <div style={{ background: '#fbc02d', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Star size={22} fill="currentColor" /></div>, 
              title: 'Realtime Projects', 
              desc: 'Dive into Industry-Oriented Projects, where learning meets real-world impact' 
            },
            { 
              accent: '#1e88e5', 
              icon: <div style={{ background: '#1e88e5', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Play size={22} fill="currentColor" /></div>, 
              title: 'LIVE Class', 
              desc: 'Never face challenges alone, our instant Doubt support is always available.' 
            },
            { 
              accent: '#e91e63', 
              icon: <div style={{ background: '#e91e63', color: '#fff', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Play size={22} fill="currentColor" /></div>, 
              title: 'Outcome Driven', 
              desc: 'Elevate your learning journey with Outcome-Driven magic.' 
            },
          ].map(card => (
            <div key={card.title} className="hover-glow glow-border" style={{
              background: 'var(--card-bg)', borderRadius: 16, padding: 24,
              display: 'flex', flexDirection: 'column',
              boxShadow: 'var(--card-shadow)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}>
              {card.icon}
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 10, color: 'var(--text-primary)' }}>{card.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{card.desc}</p>
              <button 
                onClick={() => setCurrentPage('about-us')}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0, marginTop: 'auto' }}>
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const getYtVideoId = (url) => {
  if (!url) return '';
  if (url.includes('/shorts/')) {
    return url.split('/shorts/')[1]?.split('?')[0];
  }
  if (url.includes('watch?v=')) {
    return url.split('watch?v=')[1]?.split('&')[0];
  }
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1]?.split('?')[0];
  }
  if (url.includes('/embed/')) {
    return url.split('/embed/')[1]?.split('?')[0];
  }
  return '';
};

/* ── Student Testimonials ── */
const testimonialVideos = [
  { video: 'abhinandan_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/HCQZefa6sZ0' },
  { video: 'isha_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/g-mq68g01q4' },
  { video: 'Abhishek_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/Tsz599KMhFg' },
  { video: 'aditya_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/RUNeRI_RJTk' },
  { video: 'Shiva_Prasad_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/fyDH1A9PM6E' },
  { video: 'rohit_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/ydsy68hZZ9s' },
  { video: 'Risabh_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/QhV3XV3H3bI' },
  { video: 'swapnil_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/wUl57Dnug10' },
  { video: 'Amit_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/9K24kWRTXUM' },
  { video: 'Satish_Narwade_short_for_Website.mov', ytLink: 'https://www.youtube.com/shorts/ys_HeTrwuVo' },
  { video: 'mayur_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/aWNs5K5__r4' },
  { video: 'Raj_Rajak_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/pt3vt-V8S6M' },
  { video: 'Abkash_Short_for_Website.mov', ytLink: 'https://www.youtube.com/shorts/tZh1PFRdp68' },
  { video: 'gaurav_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/WA8sdZPhF8Q' },
  { video: 'mayurash_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/Np4YMar2ikQ' },
  { video: 'Laxmi_Nayak_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/CBajJDIhVPE' },
  { video: 'Munna_Short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/kYp4oCNLNwU' },
  { video: 'Rukhsar_Shor_for_Website.mov', ytLink: 'https://www.youtube.com/shorts/e6ISquijgnI' },
  { video: 'Amit_Short_for_Website.mov', ytLink: 'https://www.youtube.com/shorts/N8bbojrdvwA' },
  { video: 'Yuvraj_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/GEsRrHmtt0k' },
  { video: 'Mahendra_short_for_website.mov', ytLink: 'https://www.youtube.com/shorts/ify7LBNBttU' },
  { video: 'Yogesh_Short_for_Website.mov', ytLink: 'https://www.youtube.com/shorts/AO9p-55o2UM' },
  { video: 'Sanjay_Testimonial_Short_for_Website.mov', ytLink: 'https://www.youtube.com/shorts/xmh3TnoOr3o' },
  { video: 'Shubham_Testimonial_Short_for_Website.mov', ytLink: 'https://www.youtube.com/shorts/gQsslKsEr-Q' },
  { video: 'Krunal_Short_for_Website.mov', ytLink: 'https://www.youtube.com/shorts/Y1TduDsF844' },
  { video: 'Kartik_short_for_Website-1.mov', ytLink: 'https://www.youtube.com/shorts/F95x1cB6aaA' },
  { video: 'Micheal_Shorrt_for_Website.mov', ytLink: 'https://www.youtube.com/watch?v=mneeIHg0L6M' },
  { video: 'Student_Shorts_9.mov', ytLink: 'https://www.youtube.com/watch?v=vu2TvJXMXCY' },
  { video: 'Student_Shorts_6.mov', ytLink: 'https://www.youtube.com/watch?v=pVz7InS29Qw' },
  { video: 'Student_Shorts_11.mov', ytLink: 'https://www.youtube.com/watch?v=kXDIOvTXLQE' },
  { video: 'Student_Shorts_5.mov', ytLink: 'https://www.youtube.com/watch?v=6Bwd5RRLJps' },
  { video: 'Student_Shorts_7.mov', ytLink: 'https://www.youtube.com/watch?v=d-mpauGxxBg' },
  { video: 'Student_Shorts_3.mov', ytLink: 'https://www.youtube.com/shorts/T1EXdCBLUok' },
  { video: 'Student_Shorts_8.mov', ytLink: 'https://www.youtube.com/watch?v=ROgY3-4RDfQ' },
  { video: 'Student_Shorts_4.mov', ytLink: 'https://www.youtube.com/watch?v=8-kAhYnd7xk' },
  { video: 'Student_Shorts_1-1.mov', ytLink: 'https://www.youtube.com/shorts/_fDE0Z-Go9A' },
  { video: 'Student_Shorts_10.mov', ytLink: 'https://www.youtube.com/watch?v=fTJtzMPAMhI' },
  { video: 'Student_Shorts_2.mov', ytLink: 'https://www.youtube.com/shorts/17OxKf3TDLE' }
];

const TestimonialVideoCard = ({ item }) => {
  const videoId = getYtVideoId(item.ytLink);
 const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
 
 
 return (
    <a 
      href={item.ytLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        width: 220, 
        height: 380, 
        borderRadius: 16, 
        overflow: 'hidden', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)', 
        background: '#000',
        flexShrink: 0, 
        position: 'relative', 
        border: '3px solid var(--border-color)',
        cursor: 'pointer',
        display: 'block',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img 
          src={thumbnailUrl} 
          alt="Student Testimonial Preview" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.35)' }} />
        
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'var(--red)', color: '#fff', width: 48, height: 48, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(237, 28, 36, 0.4)'
        }}>
          <Play size={18} fill="#fff" style={{ marginLeft: 2 }} />
        </div>
      </div>
    </a>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="reveal" style={{ padding: '50px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', overflow: 'hidden', color: 'var(--text-primary)' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>THE ISCALE</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: 'var(--text-primary)' }}>Students Testimonials</h2>

        <AutoSlider 
          items={testimonialVideos} 
          speed={40} 
          gap={16}
          renderItem={(item, index) => (
            <TestimonialVideoCard key={index} item={item} />
          )}
        />

      </div>
    </section>
  );
};


/* ── Latest Job Updates ── */
const LatestUpdates = ({ setCurrentPage }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://iscale-backend.onrender.com/api/comp-requirement/user-get-all-jobs?page=1&limit=100', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          setJobs(data.data.slice(0, 9));
        }
      } catch (err) {
        console.error('Jobs API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="reveal" style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <div className="abstract-grid" />
        <div className="abstract-lines" />
        <div className="bg-shape" style={{ width: 400, height: 400, background: 'var(--glow-primary)', bottom: '-20%', right: '-10%', animationDelay: '-2s' }} />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>EXPLORE OPPORTUNITIES</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: 'var(--text-primary)' }}>Latest Updates</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading...</div>
        ) : jobs.length > 0 ? (
          <AutoSlider 
            items={jobs} 
            speed={35} 
            direction="right"
            renderItem={(job, i) => {
              const isRed = i % 2 === 0;
              return (
                <div key={i}
                  onClick={() => setCurrentPage(`job-details/${job._id}`)}
                  className="premium-card hover-glow"
                  style={{
                    width: 340, maxWidth: '90vw', height: 220, borderRadius: 12, padding: '32px 24px', 
                    background: isRed ? 'linear-gradient(135deg, #b91c1c, #7f1d1d)' : 'var(--card-bg)',
                    color: isRed ? '#fff' : 'var(--text-primary)',
                    boxShadow: 'var(--card-shadow)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', flexShrink: 0, border: '1px solid var(--border-color)', cursor: 'pointer'
                  }}>
                  {job.company_logo ? (
                    <img src={job.company_logo} alt={job.company_name} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'contain', marginBottom: 16, background: 'var(--bg-primary)' }} />
                  ) : (
                    <div style={{ 
                      width: 64, height: 64, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                      fontWeight: 800, color: 'var(--text-primary)', fontSize: 24,
                      boxShadow: 'var(--card-shadow)'
                    }}>
                      {job.company_name ? job.company_name.charAt(0) : 'J'}
                    </div>
                  )}
                  <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{job.job_title}</h4>
                  <p style={{ fontSize: 13, opacity: 0.9, textAlign: 'center', background: isRed ? 'rgba(0,0,0,0.2)' : 'var(--bg-secondary)', padding: '4px 12px', borderRadius: 100, border: isRed ? 'none' : '1px solid var(--border-color)' }}>₹{job.salary?.min} - ₹{job.salary?.max}</p>
                  {isRed && <div style={{ position: 'absolute', top: 16, right: 24, fontSize: 40, color: 'rgba(255,255,255,0.2)', fontFamily: 'serif', lineHeight: 1 }}>"</div>}
                </div>
              );
            }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>No jobs found.</div>
        )}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button 
            onClick={() => setCurrentPage('job-updates')}
            style={{ padding: '12px 32px', background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', borderRadius: 8, fontWeight: 700, fontSize: 15, border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.3s' }}
            onMouseEnter={e => e.target.style.background = 'rgba(237, 28, 36, 0.15)'}
            onMouseLeave={e => e.target.style.background = 'rgba(237, 28, 36, 0.08)'}
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

// Courses API integration
const PopularCourses = ({ setCurrentPage }) => {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses?page=1&limit=100', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        const data = await response.json();
        
        if (data && Array.isArray(data.data)) {
          const defaultColors = [
            'linear-gradient(135deg, #1e3a8a 0%, #0d1b3e 100%)',
            'linear-gradient(135deg, #065f46 0%, #022c22 100%)',
            'linear-gradient(135deg, #5b21b6 0%, #2e1065 100%)',
            'linear-gradient(135deg, #881337 0%, #4c0519 100%)'
          ];

          const mapped = data.data.slice(0, 4).map((c, i) => {
            const price = c.offer_price !== 'N/A' && c.offer_price ? parseInt(c.offer_price) : (c.course_type === 'Free' ? 0 : null);
            const originalPrice = c.price !== 'N/A' && c.price ? parseInt(c.price) : null;
            let imgUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.title)}&background=random`;
            if (c.banner && c.banner !== 'N/A') {
              const cleanedPath = c.banner.replace(/\\/g, '/');
              imgUrl = cleanedPath.startsWith('http') ? cleanedPath : `https://iscale-backend.onrender.com/${cleanedPath.replace(/^src\//, '')}`;
            }

            let discountStr = '';
            if (originalPrice > 0 && price > 0 && originalPrice > price) {
              discountStr = `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;
            }

            return {
              id: c._id,
              tag: c.course_type === 'Paid' ? 'PREMIUM' : 'FREE',
              title: c.title,
              subtitle: c.subtitle || '',
              price: price > 0 ? `₹${price.toLocaleString()}` : (c.course_type === 'Free' ? 'FREE' : ''),
              original: (originalPrice > price) ? `₹${originalPrice.toLocaleString()}` : '',
              discount: discountStr,
              duration: c.duration || '',
              language: c.language || '',
              lectures: c.lectures || '',
              rating: c.rating || 0,
              students: c.students || 0,
              features: c.features || [],
              skills: c.skills || [],
              img: imgUrl,
              color: defaultColors[i % defaultColors.length]
            };
          });
          setCoursesData(mapped);
        }
      } catch (err) {
        console.error('HomePage Courses API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
  <section className="reveal" style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>EXPLORE UP-TO-DATE PROGRAMS</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 12, color: 'var(--text-primary)' }}>
        Most Popular <span style={{ color: 'var(--red)' }}>Courses</span>
      </h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
        Learn from top industry veterans, build practical experience through real-world projects, and jumpstart your technical career.
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0', width: '100%' }}>Loading Popular Courses...</div>
      ) : (
        <>
          <div className="courses-grid">
        {coursesData.map((course, i) => (
          <div 
            key={i} 
            onClick={() => setCurrentPage(`course-details/${course.id}`)}
            className="premium-card hover-glow glow-border" 
            style={{ 
              borderRadius: 16, 
              overflow: 'hidden', 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border-color)', 
              boxShadow: 'var(--card-shadow)', 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            {/* Header / Thumbnail Area */}
            <div>
              <div className="premium-card-img-wrap" style={{ background: course.color, height: 145, position: 'relative', overflow: 'hidden' }}>
                {/* Course Tag */}
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  background: course.tag.includes('LIVE') ? '#ef4444' : 'var(--red)',
                  color: '#fff', padding: '3px 8px',
                  borderRadius: 100, fontSize: 9, fontWeight: 800,
                  letterSpacing: 0.5, boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  zIndex: 2
                }}>
                  {course.tag}
                </span>

                {/* Duration Badge */}
                <span style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                  color: '#fff', padding: '3px 8px',
                  borderRadius: 6, fontSize: 9, fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 4,
                  zIndex: 2
                }}>
                  <Clock size={11} /> {course.duration}
                </span>

                {/* Main banner image with clean graphic overlay */}
                <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', zIndex: 1 }} />
              </div>

              {/* Metadata Details section */}
              <div style={{ padding: '16px 16px 0 16px' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Globe size={12} color="var(--red)" /> {course.language}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <BookOpen size={12} color="var(--red)" /> {course.lectures}
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 6, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                  {course.title}
                </h4>
                {course.subtitle && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 12, lineHeight: 1.4, height: 34, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {course.subtitle}
                  </p>
                )}

                {/* Rating Bar */}
                {course.rating > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, fontSize: 11, fontWeight: 700 }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} fill="#FFD700" color="#FFD700" />)}
                    </div>
                    <span style={{ color: 'var(--text-primary)' }}>{course.rating}</span>
                    {course.students > 0 && <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({course.students})</span>}
                  </div>
                )}

                {/* Checklist Features */}
                {course.features && course.features.length > 0 && (
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '8px 10px', 
                    marginBottom: 16, 
                    padding: '10px 12px', 
                    background: 'var(--bg-primary)', 
                    borderRadius: 12, 
                    border: '1px solid var(--border-color)' 
                  }}>
                    {course.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)' }}>
                        <CheckCircle size={12} color="#22c55e" style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={feat}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Skills Covered pills */}
                {course.skills && course.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
                    {course.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        style={{ 
                          fontSize: 9, 
                          fontWeight: 700, 
                          color: 'var(--red)', 
                          background: 'rgba(237, 28, 36, 0.04)', 
                          padding: '3px 8px', 
                          borderRadius: 6, 
                          border: '1px solid rgba(237, 28, 36, 0.08)' 
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom pricing and action button */}
            <div style={{ padding: '0 16px 16px 16px' }}>
              <div style={{ height: 1, background: 'var(--border-color)', margin: '12px 0' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>Pricing starts at</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 19, color: 'var(--red)' }}>{course.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12, textDecoration: 'line-through' }}>{course.original}</span>
                  </div>
                </div>
                {/* Discount Percentage Badge */}
                <span style={{
                  background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e',
                  fontSize: 10, fontWeight: 800, padding: '3px 8px',
                  borderRadius: 100, border: '1px solid rgba(34, 197, 94, 0.15)'
                }}>
                  {course.discount}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button
                  className="btn-shine"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPage(`course-details/${course.id}`);
                  }}
                  style={{
                    width: '100%', padding: '10px',
                    background: 'var(--red)', color: '#fff',
                    borderRadius: 8, fontWeight: 700, fontSize: 13,
                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    boxShadow: '0 4px 12px rgba(237, 28, 36, 0.12)'
                  }}
                >
                  Enroll Now <ArrowRight size={14} />
                </button>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPage(`course-details/${course.id}`);
                  }}
                  style={{
                    textAlign: 'center', 
                    fontSize: 12, 
                    fontWeight: 700, 
                    color: 'var(--text-secondary)', 
                    padding: '4px 0', 
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--red)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                  Explore Detailed Curriculum
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <button
          onClick={() => setCurrentPage('courses')}
          style={{ padding: '14px 36px', background: 'rgba(237, 28, 36, 0.06)', color: 'var(--red)', borderRadius: 10, fontWeight: 700, fontSize: 15, border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.3s', boxShadow: 'var(--card-shadow)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.12)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.06)'; }}
        >
          View All Programs
        </button>
      </div>
      </>
      )}
    </div>
  </section>
  );
};

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
    <section style={{ padding: '50px 0', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>LEADERS TALK</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 8, color: 'var(--text-primary)' }}>Talk With Industry Experts</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 24, maxWidth: 600, margin: '0 auto 48px' }}>
          Dive into industry-centric learning, shaped by direct input from CEOs and CHROs. Elevate your skills with insights that set you apart.
        </p>

        <AutoSlider 
          items={experts} 
          speed={50} 
          gap={24}
          renderItem={(expert, i) => (
            <div key={i} className="premium-card hover-glow" style={{
              width: 240, maxWidth: '85vw', border: '1px solid var(--border-color)', borderRadius: 16, padding: 20,
              textAlign: 'center', background: 'var(--card-bg)', cursor: 'pointer', flexShrink: 0, color: 'var(--text-primary)'
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `hsl(${i * 60}, 20%, var(--bg-hsl-lightness, 85%))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', margin: '0 auto 12px'
              }}>
                <img src={expert.img} alt={expert.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 4, color: 'var(--text-primary)' }}>{expert.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: 12 }}>{expert.role}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginBottom: 16, padding: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 8 }}>{expert.company}</div>
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
            style={{ padding: '12px 32px', background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', border: '1px solid var(--border-color)', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.3s', boxShadow: 'var(--card-shadow)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.08)'; }}
          >
            View All
          </button>
        </div>
      </div>
      
    </section>
  );
};

const CompanyMarquee = ({ setCurrentPage }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/client/public-get-client-images?page=1&limit=100', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            return {
               name: item.name || item.c_client_name || 'Client',
               logo: getImageUrl(item.logo || item.image || item.c_client_logo)
            };
          });
          setCompanies(mapped);
        } else {
          setCompanies([]);
        }
      })
      .catch(() => setCompanies([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', overflow: 'hidden', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>TOP COMPANIES</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 40, color: 'var(--text-primary)' }}>
          For <span style={{ color: 'var(--red)' }}>Placement</span> Opportunities
        </h2>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>Loading partners...</div>
      ) : companies.length > 0 ? (
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'inline-flex', gap: 40, animation: 'marquee 20s linear infinite' }}>
            {[...companies, ...companies, ...companies].map((c, i) => (
              <div key={i} style={{
                padding: '12px 28px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 12,
                boxShadow: 'var(--card-shadow)', display: 'inline-flex', alignItems: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--text-primary)',
                whiteSpace: 'nowrap', minWidth: 140, justifyContent: 'center', minHeight: 60
              }}>
                {c.logo ? <img src={c.logo} alt={c.name} style={{ maxHeight: 30, maxWidth: 100, objectFit: 'contain' }} /> : c.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-secondary)' }}>
          (No client images available from API yet)
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button 
          onClick={() => setCurrentPage('placement')}
          style={{ padding: '12px 32px', background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', border: '1px solid var(--border-color)', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.3s', boxShadow: 'var(--card-shadow)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.08)'; }}
        >View All Our Clients</button>
      </div>
    </section>
  );
};

/* ── Interactive Success Stories (Rebuilt from Screenshot) ── */
const SuccessStoryGridCard = ({ item }) => {
  return (
    <a 
      href={item.ytLink}
      target="_blank"
      rel="noopener noreferrer"
      className="premium-card hover-glow" 
      style={{ 
        width: 380, maxWidth: '90vw', height: 420, 
        background: 'var(--bg-primary)', borderRadius: 24, 
        padding: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        textAlign: 'center', overflow: 'hidden', flexShrink: 0, 
        border: '1px solid var(--border-color)',
        cursor: item.ytLink ? 'pointer' : 'default',
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      <div className="premium-card-img-wrap" style={{ width: '100%', height: '70%', background: '#f1f5f9', overflow: 'hidden', position: 'relative' }}>
        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))' }} />
        
        {item.ytLink && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'var(--red)', color: '#fff', width: 56, height: 56, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(237, 28, 36, 0.5)'
          }}>
            <Play size={22} fill="#fff" style={{ marginLeft: 3 }} />
          </div>
        )}
      </div>
      <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontWeight: 900, fontSize: 24, color: 'var(--text-primary)', marginBottom: 4 }}>{item.name}</div>
        <div style={{ fontSize: 18, color: 'var(--red)', fontWeight: 700, marginBottom: 8 }}>{item.company}</div>
        {item.role && <div style={{ fontSize: 14, color: 'var(--text-secondary)', background: '#f8fafc', padding: '6px 12px', borderRadius: 100, display: 'inline-block' }}>{item.role}</div>}
      </div>
    </a>
  );
};

export const SuccessStories = ({ setCurrentPage }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/success-story/public-all-ss?page=1&limit=100&search=shreya', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map((item, idx) => {
            let videoUrl = item.videoUrl || item.url || item.c_ss_video_url || item.c_ss_link || '';
            if (videoUrl.includes('watch?v=')) videoUrl = videoUrl.replace('watch?v=', 'embed/');
            if (videoUrl.includes('youtu.be/')) videoUrl = videoUrl.replace('youtu.be/', 'youtube.com/embed/');
            if (videoUrl.includes('/shorts/')) videoUrl = videoUrl.replace('/shorts/', '/embed/');

            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return 'https://ui-avatars.com/api/?name=User&background=random';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };

            return {
              id: item._id || idx,
              type: idx === 0 ? 'featured' : 'grid',
              name: item.name || item.studentName || item.c_ss_name || item.c_ss_student_name || 'Student',
              company: item.company || item.companyName || item.c_ss_company || 'Partner Company',
              role: item.role || item.c_ss_role || 'Placed Student',
              feedback: item.feedback || item.c_ss_feedback || 'Grateful for the support from the placement team!',
              ytLink: videoUrl,
              img: getImageUrl(item.image || item.c_ss_image)
            };
          });
          setStories(mapped);
        }
      })
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || stories.length === 0) return null; // Hide if no data

  const featured = stories[0];
  const gridItems = stories.slice(1);

  return (
    <section style={{ padding: '50px 0', background: 'var(--gradient-pink)' }}>
      <div className="container">
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, textAlign: 'center', marginBottom: 24, color: 'var(--text-primary)' }}>
          Success Stories
        </h2>

        <div className="success-grid">
          {/* Featured Card */}
          <div className="featured-success-card" style={{ background: 'var(--bg-primary)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', position: 'relative', display: 'flex' }}>
            <a href={featured.ytLink} target="_blank" rel="noopener noreferrer"
               className="featured-img-container" 
               style={{ 
                 background: '#e2e8f0', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 overflow: 'hidden',
                 cursor: featured.ytLink ? 'pointer' : 'default',
                 position: 'relative',
                 width: '50%',
                 height: '100%'
               }}
            >
               <img src={featured.img} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }} />
               {featured.ytLink && (
                 <div style={{
                   position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                   background: 'var(--red)', color: '#fff', width: 64, height: 64, borderRadius: '50%',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(237, 28, 36, 0.6)'
                 }}>
                   <Play size={24} fill="#fff" style={{ marginLeft: 4 }} />
                 </div>
               )}
            </a>
            <div style={{ padding: 40, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{featured.company}</div>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{featured.name}</h3>
              <p style={{ color: 'var(--red)', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>@ {featured.company}</p>
              
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>feedback :</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>{featured.feedback}</p>
              
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div 
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                    background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', borderRadius: 100,
                    fontWeight: 700, fontSize: 13, width: 'fit-content', letterSpacing: 0.5
                  }}
                >
                  Verified Alumni Story
                </div>
                {featured.ytLink && (
                  <a
                    href={featured.ytLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                      background: 'var(--red)', color: '#fff', borderRadius: 100, border: 'none',
                      fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.3s',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
                  >
                    Play Video <Play size={12} fill="#fff" />
                  </a>
                )}
              </div>
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
                <SuccessStoryGridCard key={idx} item={item} />
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
  <section style={{ padding: '50px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
    <div className="container">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 30, color: 'var(--text-primary)' }}>
        India's Most Loved <br/> Learners Community <span style={{ color: 'var(--red)' }}>❤️</span>
      </h2>

      <div className="community-stats" style={{ position: 'relative' }}>
        {/* Connecting Red Line */}
        <div className="connecting-line" />

        {communityStats.map((stat, idx) => (
          <div key={idx} className="community-stat-item" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Timeline Node */}
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '4px solid var(--red)', background: 'var(--bg-primary)', marginBottom: 24, position: 'relative' }}>
               <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', width: 2, height: 40, background: 'var(--red)', zIndex: -1 }} />
            </div>

            {/* Stat Card */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 16, padding: '30px 20px', width: '100%', textAlign: 'center', boxShadow: 'var(--card-shadow)', borderBottom: '4px solid var(--red)', position: 'relative', overflow: 'hidden' }}>
              {/* Top semi-circle design */}
              <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 100, height: 100, borderRadius: '50%', border: '15px solid rgba(237, 28, 36, 0.05)' }} />
              
              <div style={{ width: 48, height: 48, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px', position: 'relative', zIndex: 3, boxShadow: 'var(--card-shadow)' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>{stat.val}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{stat.label}</div>
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
    <section style={{ padding: '50px 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 20px', borderRadius: 100, fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>
            ACADEMIC SYNERGY
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 24, color: 'var(--text-primary)' }}>
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
              <div key={idx} className="premium-card hover-glow" style={{ 
                width: 360, height: 180, borderRadius: 16, 
                background: college.isRed ? 'linear-gradient(135deg, #a91111, #8b0000)' : 'var(--card-bg)', 
                padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                position: 'relative', flexShrink: 0, 
                boxShadow: college.isRed ? '0 15px 30px rgba(139,0,0,0.2)' : 'var(--card-shadow)', 
                border: college.isRed ? 'none' : '1px solid var(--border-color)',
                cursor: 'pointer'
              }}>
                {college.isRed && <div style={{ position: 'absolute', top: 20, left: 20, fontSize: 60, color: 'rgba(255,255,255,0.2)', fontFamily: 'serif', lineHeight: 1 }}>“</div>}
                {college.isRed && <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 60, color: 'rgba(255,255,255,0.2)', fontFamily: 'serif', lineHeight: 1 }}>”</div>}
                
                <div style={{ background: college.isRed ? '#000' : 'transparent', padding: college.isRed ? 8 : 0, borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, filter: 'brightness(var(--theme-logo-brightness, 1))' }}>
                  <img src={college.img} alt={college.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, textAlign: 'center', color: college.isRed ? '#fff' : 'var(--text-primary)', zIndex: 1, position: 'relative' }}>
                  {college.name}
                </div>
              </div>
            ))}
          </div>
          
          <button style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
            <ChevronLeft size={20} color="var(--text-primary)" />
          </button>
          <button style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
            <ChevronRight size={20} color="var(--text-primary)" />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button 
            onClick={() => setCurrentPage('allied-colleges')}
            style={{ padding: '12px 32px', background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', border: '1px solid var(--border-color)', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.3s', boxShadow: 'var(--card-shadow)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.08)'; }}
          >
            View All Allied College
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── Latest News & Updates ── */
const NewsUpdates = ({ setCurrentPage }) => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/news&updates/public-all-news&updates?page=1&limit=100', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return 'https://images.unsplash.com/photo-1593642532744-d377abf07dc6?auto=format&fit=crop&w=800&q=80';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            return {
              title: item.title || item.m_news_title || 'News Update',
              desc: item.desc || item.description || item.m_news_desc || 'Read more about this latest update.',
              link: item.link || item.url || item.m_news_link || '/news-details',
              img: getImageUrl(item.image || item.img || item.m_news_image)
            };
          });
          setNewsList(mapped);
        } else {
          setNewsList([]);
        }
      })
      .catch(() => setNewsList([]))
      .finally(() => setLoading(false));
  }, []);

  return (
  <section style={{ padding: '60px 0', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
    <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 40, color: 'var(--text-primary)' }}>
        Latest <span style={{ color: 'var(--red)' }}>News & Updates</span>
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>Loading news...</div>
      ) : newsList.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, justifyContent: 'center' }}>
          {newsList.map((news, idx) => (
            <div key={idx} className="premium-card hover-glow" style={{ 
              background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden',
              boxShadow: 'var(--card-shadow)', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ width: '100%', height: 300, overflow: 'hidden' }}>
                <img src={news.img} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>
              
              <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.4 }}>{news.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 20, flex: 1 }}>{news.desc}</p>
                
                <a href={news.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontWeight: 600, fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                   onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                   onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  Learn More <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-secondary)' }}>
          No news available yet.
        </div>
      )}
      
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button 
          onClick={() => setCurrentPage('news')}
          style={{ 
            padding: '12px 28px', background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', border: '1px solid var(--border-color)', 
            borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(237, 28, 36, 0.15)'}
          onMouseLeave={e => e.target.style.background = 'rgba(237, 28, 36, 0.08)'}
        >
          View All News
        </button>
      </div>
    </div>
  </section>
  );
};

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
    <section style={{ padding: '50px 0', background: 'var(--gradient-hero)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
            THE MEDIA LOVES US, AND MORE SO, OUR STUDENTS.
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, textAlign: 'center', marginBottom: 30, color: 'var(--text-primary)' }}>
          We've been in the news!
        </h2>

        <AutoSlider 
          items={mediaMentions} 
          speed={40} 
          gap={24}
          renderItem={(mention, i) => (
            <div key={i} className="premium-card hover-glow" style={{
              width: 320, minHeight: 180, background: 'var(--card-bg)', borderRadius: 16, padding: '24px',
              boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)',
              display: 'flex', flexDirection: 'column', flexShrink: 0,
              cursor: 'pointer'
            }}
            onClick={() => window.open(mention.link, '_blank')}
            >
              <div style={{ marginBottom: 16, height: 40, display: 'flex', alignItems: 'center', filter: 'brightness(var(--theme-logo-brightness, 1))' }}>
                <img src={mention.img} alt="News Logo" style={{ maxWidth: '60%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5, marginBottom: 20, flex: 1, fontWeight: 500 }}>
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
  <section style={{ padding: '50px 0', background: 'var(--bg-primary)' }}>
    <div className="container mobile-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card-bg)', borderRadius: 24, padding: '40px 60px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)', gap: 30 }}>
      <div style={{ flex: 1 }}>
        <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 20, display: 'inline-block' }}>
          GOT MORE QUESTIONS ?
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
          Talk <span style={{ color: 'var(--red)' }}>to our team directly</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 32 }}>Contact us and our team will get in touch with you shortly</p>
        
        <button 
          onClick={() => setCurrentPage('contact')}
          style={{ padding: '14px 32px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(237, 28, 36, 0.3)', transition: 'background 0.2s' }}
          onMouseEnter={e => e.target.style.background = 'var(--red-dark)'}
          onMouseLeave={e => e.target.style.background = 'var(--red)'}
        >
          Contact Us
        </button>
      </div>
      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <img src="https://www.theiscale.com/assets/images/cont.jpg" alt="Support Team" style={{ width: 350, height: 350, maxWidth: '100%', borderRadius: '50%', objectFit: 'cover', boxShadow: 'var(--card-shadow)' }} />
      </div>
    </div>
  </section>
);

const AlliedCollegesSection = ({ setCurrentPage }) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/allied/public-all-allied?page=1&limit=100', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = url.replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            return {
              name: item.m_allied_title || item.name || 'Allied College',
              img: getImageUrl(item.m_allied_logo || item.image || item.logo)
            };
          });
          setColleges(mapped);
        } else {
          setColleges([]);
        }
      })
      .catch(() => setColleges([]))
      .finally(() => setLoading(false));
  }, []);

  return (
  <section className="reveal" style={{ padding: '50px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>ACADEMIC PARTNERS</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: 'var(--text-primary)' }}>Allied Colleges</h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>Loading allied colleges...</div>
      ) : colleges.length > 0 ? (
      <AutoSlider 
        items={colleges} 
        speed={40} 
        direction="left"
        gap={24}
        renderItem={(college, i) => (
          <div key={i} className="premium-card hover-glow"
            style={{
              width: 260, height: 260, borderRadius: 16, padding: '24px', 
              background: 'var(--card-bg)',
              boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative', flexShrink: 0, cursor: 'pointer'
            }}
          >
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 16, filter: 'brightness(var(--theme-logo-brightness, 1))' }}>
              <img src={college.img} alt={college.name} style={{ maxWidth: '80%', maxHeight: '100px', objectFit: 'contain' }} />
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center', margin: 0 }}>{college.name}</h4>
          </div>
        )}
      />
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-secondary)' }}>
          No allied colleges available yet.
        </div>
      )}
      
      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <button 
          onClick={() => setCurrentPage('allied-colleges')}
          style={{ padding: '12px 32px', background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', border: '1px solid var(--border-color)', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.3s', boxShadow: 'var(--card-shadow)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.08)'; }}
        >
          View All Colleges
        </button>
      </div>
    </div>
  </section>
  );
};

/* Portfolio section removed from HomePage, kept on CourseDetailsPage */

/* ── Main Home Page ── */
const EnrolledCoursesSection = ({ enrolledCourses, userName, setCurrentPage }) => {
  return (
    <section className="reveal active bg-dots" style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>WELCOME BACK</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', marginTop: 8 }}>
              Resume Learning, <span style={{ color: 'var(--red)' }}>{userName}</span>
            </h2>
          </div>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            style={{ padding: '12px 24px', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', border: 'none' }}
          >
            Go to Student Dashboard
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 24 }}>
          {enrolledCourses.map(course => (
            <div 
              key={course.id}
              onClick={() => setCurrentPage(`course-details/${course.id}`)}
              className="premium-card hover-glow glow-border"
              style={{
                background: 'var(--card-bg)',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <img src={course.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: 12, right: 12, background: 'var(--red)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '4px 8px', borderRadius: 4 }}>
                  ENROLLED
                </span>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: 1 }}>{course.category}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0 16px', lineHeight: 1.3 }}>{course.title}</h3>
                  
                  {/* Progress bar */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>
                      <span>Syllabus Progress</span>
                      <span style={{ color: 'var(--red)' }}>{course.progress || 0}%</span>
                    </div>
                    <div style={{ width: '100%', height: 6, background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress || 0}%`, height: '100%', background: 'linear-gradient(90deg, var(--red), #ff4d54)', borderRadius: 3 }} />
                    </div>
                  </div>
                </div>

                <button
                  className="btn-shine"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPage(`course-details/${course.id}`);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(135deg, var(--red) 0%, var(--red-dark) 100%)',
                    color: '#fff',
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 13,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: '0 4px 14px rgba(237, 28, 36, 0.2)'
                  }}
                >
                  Resume Learning <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Left Bottom Dynamic Course Enroll Popup
const DynamicEnrollPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  const notifications = [
    { name: "Rahul S.", course: "Data Science with Generative AI", time: "2 mins ago", img: "https://www.theiscale.com/myadmin/uploads/courses/Data_science_Course_paid_compressed.png" },
    { name: "Priya M.", course: "AI Cohort Course Batch 01", time: "5 mins ago", img: "https://www.theiscale.com/myadmin/uploads/courses/The_Complete_AI_Guide_(7).jpg" },
    { name: "Amit K.", course: "Master Of Data Analytics Program", time: "12 mins ago", img: DataAnalyticsImg },
    { name: "Sneha R.", course: "AI Engineer Advance Program", time: "Just now", img: "https://www.theiscale.com/myadmin/uploads/courses/Your_paragraph_text_(10).jpg" },
    { name: "Vikram P.", course: "Data Science with Generative AI", time: "18 mins ago", img: "https://www.theiscale.com/myadmin/uploads/courses/Data_science_Course_paid_compressed.png" }
  ];

  useEffect(() => {
    let index = 0;
    
    // Initial delay before showing first popup
    const initialDelay = setTimeout(() => {
      setCurrentNotification(notifications[index]);
      setIsVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => setIsVisible(false), 5000);
    }, 3000);

    // Then cycle every 15 seconds
    const interval = setInterval(() => {
      index = (index + 1) % notifications.length;
      setCurrentNotification(notifications[index]);
      setIsVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => setIsVisible(false), 5000);
    }, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 24,
      background: 'var(--card-bg)',
      borderRadius: 12,
      padding: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      border: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      zIndex: 9999,
      transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-120%) scale(0.9)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      maxWidth: 340,
      pointerEvents: 'none' // So it doesn't block clicks underneath
    }}>
      <div style={{ position: 'absolute', top: -6, right: -6, background: '#22c55e', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 100, boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)' }}>
        NEW ENROLLMENT
      </div>
      <img src={currentNotification.img} alt="Course" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
          {currentNotification.name} <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>enrolled in</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--red)', lineHeight: 1.2, marginBottom: 4 }}>
          {currentNotification.course}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <CheckCircle size={12} color="#22c55e" /> Verified • {currentNotification.time}
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ setCurrentPage }) => {
  useReveal();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userName, setUserName] = useState('Learner');
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn) {
      // Get User Name
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const u = JSON.parse(userStr);
          if (u && u.name) {
            setUserName(u.name.split(' ')[0]);
          }
        }
      } catch (e) {}

      // Get Enrolled Courses from local storage
      const stored = localStorage.getItem('enrolled_courses');
      if (stored) {
        setEnrolledCourses(JSON.parse(stored));
      } else {
        // Pre-populate with default course if none exists
        const defaultList = [
          { 
            id: 'ai-engineer-advance-program', 
            title: 'AI Engineer Advance Program', 
            category: 'AI Courses', 
            progress: 10, 
            bgGradient: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
            img: 'https://www.theiscale.com/myadmin/uploads/courses/Your_paragraph_text_(10).jpg'
          }
        ];
        localStorage.setItem('enrolled_courses', JSON.stringify(defaultList));
        setEnrolledCourses(defaultList);
      }
    }
  }, [isLoggedIn]);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Hero setCurrentPage={setCurrentPage} />
      
      {isLoggedIn && enrolledCourses.length > 0 && (
        <EnrolledCoursesSection enrolledCourses={enrolledCourses} userName={userName} setCurrentPage={setCurrentPage} />
      )}

      <AboutSection setCurrentPage={setCurrentPage} />
      <PopularCourses setCurrentPage={setCurrentPage} />
      <TestimonialsSection />
      <LatestUpdates setCurrentPage={setCurrentPage} />
      <ExpertsSection setCurrentPage={setCurrentPage} />
      <CompanyMarquee setCurrentPage={setCurrentPage} />
      <SuccessStories setCurrentPage={setCurrentPage} />
      <LearnersCommunity />
      <AlliedCollegesSection setCurrentPage={setCurrentPage} />
      <NewsUpdates setCurrentPage={setCurrentPage} />
      <InTheNews setCurrentPage={setCurrentPage} />
      <TalkToTeam setCurrentPage={setCurrentPage} />
      <DynamicEnrollPopup />
    </div>
  );
};

export default HomePage;

