import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Play, CheckCircle, Users, BookOpen, Award, TrendingUp, Sparkles, Gift, Layers, Brain, BarChart2, Check, Phone, Clock, Globe, Video, Eye, Calendar, Zap } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import DataAnalyticsImg from '../assets/images/Data_Analytics_paid_compressed.png';
import MandsaurImg from '../assets/images/Mandsaur_University_logo.png';
import DJSanghviImg from '../assets/images/dj_sanghvi_logo.png';
import HRITImg from '../assets/images/HRIT_logo.png';
import MediCapsImg from '../assets/images/medi_caps.png';

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
          <div className="glass-card hover-glow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            borderRadius: 100, padding: '8px 18px',
            marginBottom: 24, border: '1px solid rgba(237, 28, 36, 0.3)',
            boxShadow: '0 4px 20px rgba(237, 28, 36, 0.15)'
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, color: 'var(--text-primary)' }}>
              <span className="text-gradient">iSCALE Upskilling</span>
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(30px, 8vw, 56px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, wordBreak: 'break-word', hyphens: 'auto', color: 'var(--text-primary)' }}>
            <span className="hero-text-gradient">India's Trusted</span>{' '}
            <span className="animated-text-gradient">Upskilling &<br />E-Learning</span>{' '}
            <span className="future-readiness-text">Platform for<br />Future Readiness.</span>
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

const TestimonialVideoCard = ({ item }) => {
  const cardStyle = {
    width: 220, height: 380, borderRadius: 16, overflow: 'hidden', 
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)', background: '#000',
    flexShrink: 0, position: 'relative', border: '3px solid var(--border-color)',
    cursor: 'pointer', display: 'block', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  };
  
  const playBtnStyle = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    background: 'var(--red)', color: '#fff', width: 48, height: 48, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(237, 28, 36, 0.4)'
  };

  if (item.m_st_url) {
    const videoId = getYtVideoId(item.m_st_url);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
    return (
      <a href={item.m_st_url} target="_blank" rel="noopener noreferrer" style={cardStyle} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img src={thumbnailUrl} alt="Student Testimonial Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.35)' }} />
          <div style={playBtnStyle}><Play size={18} fill="#fff" style={{ marginLeft: 2 }} /></div>
        </div>
      </a>
    );
  }

  if (item.m_st_video) {
    const videoSrc = `https://iscale-backend.onrender.com/${item.m_st_video.replace(/\\/g, '/').replace('src/', '')}`;
    return (
      <a href={videoSrc} target="_blank" rel="noopener noreferrer" style={cardStyle} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
          <video src={videoSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.35)' }} />
          <div style={playBtnStyle}><Play size={18} fill="#fff" style={{ marginLeft: 2 }} /></div>
        </div>
      </a>
    );
  }

  return null;
};

const TestimonialsSection = ({ setCurrentPage }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/stdtestimonials/user-get-stdtestimonials')
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || result || [];
        if (Array.isArray(arr) && arr.length > 0) {
          let validItems = arr.filter(item => item.m_st_url || item.m_st_video);
          if (validItems.length > 0) {
            let repeated = [...validItems];
            // Ensure there are enough items to fill the screen for the infinite slider
            while (repeated.length < 12) {
              repeated = [...repeated, ...validItems];
            }
            setVideos(repeated);
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="reveal" style={{ padding: '50px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', overflow: 'hidden', color: 'var(--text-primary)' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>THE ISCALE</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: 'var(--text-primary)' }}>Students Testimonials</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>Loading Testimonials...</div>
        ) : videos.length > 0 ? (
          <AutoSlider 
            items={videos} 
            speed={120} 
            gap={16}
            renderItem={(item, index) => (
              <TestimonialVideoCard key={index} item={item} />
            )}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>No testimonials available right now. Check back later!</div>
        )}

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button 
            onClick={() => setCurrentPage('student-testimonials')}
            className="hover-glow"
            style={{
              padding: '14px 36px', background: 'rgba(237, 28, 36, 0.06)', color: 'var(--red)', 
              borderRadius: 10, fontWeight: 700, fontSize: 15, border: '1px solid var(--border-color)', 
              cursor: 'pointer', transition: 'all 0.3s', boxShadow: 'var(--card-shadow)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(237, 28, 36, 0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(237, 28, 36, 0.06)'; e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
          >
            View All Testimonials
          </button>
        </div>

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
        const response = await fetch('https://iscale-backend.onrender.com/api/comp-requirement/user-get-all-jobs?page=1&limit=1000');
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
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 24, color: 'var(--text-primary)' }}>Latest <span className="animated-text-gradient">Updates</span></h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading...</div>
        ) : jobs.length > 0 ? (
          <AutoSlider 
            items={jobs} 
            speed={60} 
            direction="right"
            renderItem={(job, i) => {
              const isRed = i % 2 === 0;
              return (
                <div key={i}
                  onClick={() => setCurrentPage(`job-details/${job._id}`)}
                  className="premium-card hover-glow"
                  style={{
                    width: 340, maxWidth: '90vw', minHeight: 240, height: 'auto', borderRadius: 12, padding: '32px 24px', 
                    background: isRed ? 'linear-gradient(135deg, #b91c1c, #7f1d1d)' : '#0f0f0f',
                    color: '#ffffff',
                    boxShadow: 'var(--card-shadow)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', flexShrink: 0, border: '1px solid var(--border-color)', cursor: 'pointer'
                  }}>
                  {job.company_logo ? (
                    <img 
                      src={job.company_logo.startsWith('http') ? job.company_logo : `https://iscale-backend.onrender.com/${job.company_logo.replace(/\\/g, '/').replace(/^src\//, '')}`} 
                      alt={job.company_name} 
                      style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'contain', marginBottom: 16, background: 'var(--bg-primary)' }} 
                      onError={(e) => {
                        if (!e.target.dataset.error) {
                          e.target.dataset.error = true;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name || 'Company')}&background=random`;
                        }
                      }}
                    />
                  ) : (
                    <div style={{ 
                      width: 64, height: 64, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                      fontWeight: 800, color: 'var(--text-primary)', fontSize: 24,
                      boxShadow: 'var(--card-shadow)'
                    }}>
                      {job.company_name ? job.company_name.charAt(0).toUpperCase() : 'J'}
                    </div>
                  )}
                  <h4 style={{ 
                    fontSize: 18, fontWeight: 800, marginBottom: 4, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    ...(isRed ? {} : { background: 'linear-gradient(90deg, #ff4d4d, #f9cb28)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' })
                  }}>{job.job_title}</h4>
                  <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 12, textAlign: 'center' }}>{job.company_name}</div>
                  <p style={{ 
                    fontSize: 13, textAlign: 'center', padding: '4px 14px', borderRadius: 100,
                    ...(isRed ? { opacity: 0.9, background: 'rgba(0,0,0,0.2)', border: 'none' } : { background: 'rgba(237, 28, 36, 0.1)', color: 'var(--red)', border: '1px solid rgba(237, 28, 36, 0.2)', fontWeight: 700 })
                  }}>₹{job.salary?.min} - ₹{job.salary?.max}</p>
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
        const response = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses?page=1&limit=1000');
        const data = await response.json();
        const arr = data.data?.docs || data.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const defaultColors = [
            'linear-gradient(135deg, #1e3a8a 0%, #0d1b3e 100%)',
            'linear-gradient(135deg, #065f46 0%, #022c22 100%)',
            'linear-gradient(135deg, #5b21b6 0%, #2e1065 100%)',
            'linear-gradient(135deg, #881337 0%, #4c0519 100%)'
          ];

          const mapped = arr.slice(0, 4).map((c, i) => {
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
              price: price > 0 ? `₹ ${price.toLocaleString()}` : (c.course_type === 'Free' ? 'FREE' : ''),
              original: (originalPrice > price) ? `₹ ${originalPrice.toLocaleString()}` : '',
              duration: c.duration || '365 Days',
              views: c.views || 0,
              category: c.category || 'Course',
              img: imgUrl
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
            {coursesData.map((course, i) => {
              const colors = [
                'linear-gradient(135deg, #1e3a8a 0%, #0d1b3e 100%)',
                'linear-gradient(135deg, #065f46 0%, #022c22 100%)',
                'linear-gradient(135deg, #5b21b6 0%, #2e1065 100%)',
                'linear-gradient(135deg, #881337 0%, #4c0519 100%)',
                'linear-gradient(135deg, #7c2d12 0%, #431407 100%)'
              ];
              const cardColor = colors[i % colors.length];
              return (
              <div 
                key={i} 
                onClick={() => setCurrentPage(`course-details/${course.id}`)}
                className="hover-glow" 
                style={{ 
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: 'var(--card-bg)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderTop: `6px solid transparent`,
                  borderImage: `${cardColor} 1`,
                  borderImageSlice: '1 0 0 0',
                  boxShadow: 'var(--card-shadow)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  color: 'var(--text-primary)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)'; }}
              >
                <div style={{ padding: '16px 16px 0 16px', flex: 1 }}>
                  <div style={{ borderRadius: 12, overflow: 'hidden', height: 160, marginBottom: 16, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: cardColor, opacity: 0.1, zIndex: 1 }}></div>
                    <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 0 }} />
                  </div>
                  
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, marginBottom: 12, lineHeight: 1.3, color: '#0f172a' }}>
                    {course.title}
                  </h4>

                  <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 13, color: '#64748b', fontWeight: 500 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Eye size={14} color="#94a3b8" /> {course.views}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={14} color="#94a3b8" /> {course.duration}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 16 }}>
                    <Zap size={14} color="#94a3b8" /> Category : {course.category}
                  </div>
                </div>

                <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid rgba(0,0,0,0.04)', marginTop: 'auto' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#0f172a' }}>
                    {course.price}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: cardColor, padding: '8px 16px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    Learn More <ArrowRight size={14} />
                  </span>
                </div>
              </div>
              );
            })}
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
const ExpertsSection = ({ setCurrentPage }) => {
  const [expertsList, setExpertsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/ppt/public-get-ppts')
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map(item => {
            const getImageUrl = (url) => {
              if (!url || url === 'N/A') return '';
              const cleaned = String(url).replace(/\\/g, '/');
              return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
            };
            return {
              name: item.m_pre_name || item.name || 'Expert',
              role: item.m_pre_designation || item.role || '',
              company: item.m_pre_company || item.company || '',
              logo: getImageUrl(item.m_pre_company_img || item.m_pre_company_logo || item.image2),
              img: getImageUrl(item.m_pre_image || item.image1),
              ytLink: item.m_pre_video_link || item.videoUrl || item.url || item.link || '#'
            };
          });
          
          let repeated = [...mapped];
          // Ensure there are enough items for the infinite AutoSlider
          while (repeated.length > 0 && repeated.length < 12) {
            repeated = [...repeated, ...mapped];
          }
          
          setExpertsList(repeated);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px 0' }}>Loading experts...</div>;
  }

  if (expertsList.length === 0) return null;

  return (
    <section style={{ padding: '50px 0', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>LEADERS TALK</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 8, color: 'var(--text-primary)' }}>Talk With <span className="animated-text-gradient">Industry Experts</span></h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 24, maxWidth: 600, margin: '0 auto 48px' }}>
          Dive into industry-centric learning, shaped by direct input from CEOs and CHROs. Elevate your skills with insights that set you apart.
        </p>

        <AutoSlider 
          items={expertsList} 
          speed={120} 
          gap={24}
          renderItem={(expert, i) => (
            <div key={i} className="premium-card hover-glow" onClick={() => expert.ytLink && expert.ytLink !== '#' && window.open(expert.ytLink, '_blank')} style={{
              width: 260, maxWidth: '85vw', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: '32px 20px',
              textAlign: 'center', background: 'var(--card-bg)', cursor: 'pointer', flexShrink: 0, color: 'var(--text-primary)',
              boxShadow: 'var(--card-shadow)', position: 'relative', overflow: 'hidden'
            }}>
              {/* Vibrant Instagram-style Gradient Ring */}
              <div style={{
                width: 96, height: 96, borderRadius: '50%',
                background: `linear-gradient(135deg, hsl(${i * 45}, 90%, 65%), hsl(${(i * 45) + 60}, 90%, 55%))`,
                padding: 4, margin: '0 auto 20px',
                boxShadow: `0 10px 24px hsla(${i * 45}, 90%, 60%, 0.3)`
              }}>
                {/* Inner white/dark ring */}
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-primary)', padding: 3 }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#f8f9fa' }}>
                    <img src={expert.img} alt={expert.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 6, color: 'var(--text-primary)' }}>{expert.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16, height: 34, overflow: 'hidden', opacity: 0.9 }}>{expert.role}</div>
              {expert.logo && (
                <div style={{ height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px' }}>
                  <img src={expert.logo} alt={expert.company} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
              )}
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
    fetch('https://iscale-backend.onrender.com/api/client/public-get-all-client?page=1&limit=1000')
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
               name: item.m_client_name || item.clientName || item.name || item.c_client_name || 'Partner Client',
               desc: item.m_client_description || item.description || item.desc || item.c_client_description || '',
               logo: getImageUrl(item.m_client_logo || item.logo || item.image || item.c_client_logo) || 'https://www.theiscale.com/myadmin/uploads/more/phonepay1.png'
            };
          });
          let repeated = [...mapped]; while (repeated.length > 0 && repeated.length < 20) { repeated = [...repeated, ...mapped]; } setCompanies(repeated);
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
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '4px 16px', borderRadius: 100, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>TOP RECRUITERS</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 40, color: 'var(--text-primary)' }}>
          For <span className="animated-text-gradient">Placement</span> Opportunities
        </h2>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>Loading partners...</div>
      ) : companies.length > 0 ? (
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
          <div style={{ display: 'inline-flex', gap: 32, animation: 'marquee 50s linear infinite', padding: '10px 0' }}>
            {[...companies, ...companies, ...companies].map((c, i) => (
              <div key={i} className="hover-glow" style={{
                padding: '16px 32px', background: 'var(--card-bg)', 
                border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16,
                boxShadow: `0 8px 24px hsla(${i * 30}, 80%, 50%, 0.1)`, 
                borderTop: `2px solid hsl(${i * 30}, 80%, 50%)`,
                display: 'inline-flex', alignItems: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--text-primary)',
                whiteSpace: 'nowrap', minWidth: 160, justifyContent: 'center', minHeight: 70, cursor: 'default'
              }}>
                {c.logo ? <img src={c.logo} alt={c.name} style={{ maxHeight: 36, maxWidth: 120, objectFit: 'contain' }} /> : c.name}
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
        background: 'var(--card-bg)', borderRadius: 24, 
        padding: 0, boxShadow: 'var(--card-shadow)', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        textAlign: 'center', overflow: 'hidden', flexShrink: 0, 
        border: '1px solid var(--border-color)',
        cursor: item.ytLink ? 'pointer' : 'default',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative'
      }}
    >
      {item.package && item.package !== 'N/A' && (
        <div style={{ 
          position: 'absolute', top: 16, right: 16, 
          background: 'linear-gradient(135deg, #10b981, #059669)', 
          color: '#fff', fontSize: 12, fontWeight: 800, 
          padding: '6px 14px', borderRadius: 100, 
          boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)',
          zIndex: 4
        }}>
          {item.package}
        </div>
      )}

      <div className="premium-card-img-wrap" style={{ width: '100%', height: '70%', background: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {item.img ? (
          <>
            <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top center' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', background: 'linear-gradient(to top, var(--card-bg), transparent)' }} />
          </>
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e293b, #0f172a)' }} />
        )}
        
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
        {item.role && <div style={{ fontSize: 14, color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: 100, display: 'inline-block', border: '1px solid var(--border-color)', fontWeight: 500 }}>{item.role}</div>}
      </div>
    </a>
  );
};

export const SuccessStories = ({ setCurrentPage }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/success-story/public-all-ss?page=1&limit=1000')
      .then(res => res.json())
      .then(result => {
        const arr = result.data?.docs || result.data || [];
        
        const getEmbedUrl = (url) => {
          if (!url) return '';
          let videoId = '';
          if (url.includes('youtube.com/embed/')) return url;
          if (url.includes('watch?v=')) {
            const parts = url.split('watch?v=')[1];
            if (parts) videoId = parts.split('&')[0];
          } else if (url.includes('youtu.be/')) {
            const parts = url.split('youtu.be/')[1];
            if (parts) videoId = parts.split('?')[0];
          } else if (url.includes('/shorts/')) {
            const parts = url.split('/shorts/')[1];
            if (parts) videoId = parts.split('?')[0];
          }
          return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        };

        const getImageUrl = (url, name) => {
          if (!url || url === 'N/A') {
            return null;
          }
          const cleaned = String(url).replace(/\\/g, '/');
          return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
        };

        if (Array.isArray(arr) && arr.length > 0) {
          const mapped = arr.map((item, idx) => {
            const rawVideoUrl = item.m_ss_youtube_url || item.m_ss_video || item.videoUrl || item.url || item.video || item.c_ss_video_url || item.c_ss_link || '';
            const videoUrl = getEmbedUrl(rawVideoUrl);
            const studentName = item.m_ss_name || item.name || item.studentName || item.c_ss_name || item.c_ss_student_name || 'Student';

            return {
              id: item._id || idx,
              type: idx === 0 ? 'featured' : 'grid',
              name: studentName,
              company: item.m_ss_placed || item.company || item.companyName || item.c_ss_company || 'Partner Company',
              role: item.m_ss_designation || item.role || item.c_ss_role || 'Placed Student',
              package: item.m_ss_package || item.package || item.c_ss_package || 'N/A',
              feedback: item.m_ss_feedback || item.feedback || item.c_ss_feedback || 'Grateful for the support from the placement team!',
              ytLink: videoUrl,
              img: getImageUrl(item.m_ss_image || item.image || item.c_ss_image, studentName)
            };
          });
          setStories(mapped);
        }
      })
      .catch((err) => {
        console.error("HomePage SuccessStories Fetch Error:", err);
        setStories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || stories.length === 0) return null; // Hide if no data

  const featured = stories[0];
  const gridItems = stories.slice(1);

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Glow Orbs */}
      <div className="bg-shape" style={{ top: '-10%', left: '-10%', width: 400, height: 400, background: 'rgba(237, 28, 36, 0.05)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div className="bg-shape" style={{ bottom: '-10%', right: '-10%', width: 500, height: 500, background: 'rgba(124, 58, 237, 0.05)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />

      <div className="container">
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, display: 'inline-block', marginBottom: 16 }}>
            OUR PROUD ALUMNI
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 12 }}>
            Alumni <span className="animated-text-gradient">Success Stories</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 650, margin: '0 auto' }}>
            Hear directly from our graduates who successfully transitioned into their dream technical roles at top-tier companies.
          </p>
        </div>

        <div className="success-grid">
          {/* Featured Card */}
          <div className="featured-success-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--card-shadow)', position: 'relative', display: 'flex', zIndex: 1 }}>
            <a href={featured.ytLink} target="_blank" rel="noopener noreferrer"
               className="featured-img-container" 
               style={{ 
                 background: 'var(--bg-secondary)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 overflow: 'hidden',
                 cursor: featured.ytLink ? 'pointer' : 'default',
                 position: 'relative',
                 width: '50%',
                 minHeight: 350
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
              
              {featured.package && featured.package !== 'N/A' && (
                <div style={{ fontSize: 18, color: '#10b981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                  <span>Package:</span>
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '4px 12px', borderRadius: 8 }}>{featured.package}</span>
                </div>
              )}

              <div style={{ color: 'var(--text-secondary)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>feedback :</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 32 }}>"{featured.feedback}"</p>
              
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
            <div style={{ position: 'absolute', right: -50, top: -50, width: 200, height: 200, borderRadius: '50%', border: '40px solid var(--border-color)', opacity: 0.2, zIndex: 0 }} />
          </div>

          {/* Auto Slider for Grid Cards */}
          {gridItems.length > 0 && (
            <div style={{ marginTop: 32, position: 'relative', zIndex: 1 }}>
              <AutoSlider 
                items={gridItems} 
                speed={45}
                gap={24}
                renderItem={(item, idx) => (
                  <SuccessStoryGridCard key={idx} item={item} />
                )}
              />
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, position: 'relative', zIndex: 1 }}>
          <button 
            onClick={() => setCurrentPage('success-story')}
            style={{ 
              padding: '14px 40px', 
              background: 'var(--red)', 
              color: '#fff', 
              borderRadius: 10, 
              fontWeight: 700, 
              fontSize: 15, 
              border: 'none', 
              cursor: 'pointer', 
              transition: 'all 0.3s', 
              boxShadow: '0 4px 15px rgba(237, 28, 36, 0.3)' 
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(237, 28, 36, 0.5)'; e.currentTarget.style.background = 'var(--red-dark)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(237, 28, 36, 0.3)'; e.currentTarget.style.background = 'var(--red)'; }}
          >
            Explore All Success Stories
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

/* ── Latest News & Updates ── */
const NewsUpdates = ({ setCurrentPage }) => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/news&updates/public-all-news&updates?page=1&limit=1000')
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
            
            let dateStr = "Recent";
            if (item.m_news_added_on || item.createdAt || item.date || item.m_news_date) {
              const d = new Date(item.m_news_added_on || item.createdAt || item.date || item.m_news_date);
              dateStr = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
            }

            return {
              title: item.m_news_title || item.title || 'News Update',
              date: dateStr,
              desc: item.m_news_intro || item.m_news_description || item.desc || item.description || 'Read more about this latest update.',
              link: item.link || item.url || item.m_news_link || `/news-details/${item._id}`,
              img: getImageUrl(item.m_news_image || item.image || item.img || item.m_news_images)
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

  const handleLinkClick = (e, link) => {
    if (link.startsWith('/')) {
      e.preventDefault();
      // Remove leading slash for setCurrentPage
      setCurrentPage(link.substring(1));
    }
  };

  return (
  <section style={{ padding: '80px 0', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
    <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, textAlign: 'center', marginBottom: 48, color: 'var(--text-primary)' }}>
        Latest <span style={{ background: 'linear-gradient(135deg, var(--red) 0%, #ff4d54 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>News & Updates</span>
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>Loading news updates...</div>
      ) : newsList.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, justifyContent: 'center' }}>
          {newsList.slice(0, 3).map((news, idx) => {
            const colors = ['#1e3a8a', '#065f46', '#5b21b6'];
            const accent = colors[idx % colors.length];
            return (
            <div key={idx} className="news-card-interactive colorful-glow-border" style={{ 
              background: 'var(--card-bg)', border: '1px solid rgba(255,255,255,0.05)', borderBottom: `6px solid ${accent}`, borderRadius: 16, overflow: 'visible',
              boxShadow: 'var(--card-shadow)', display: 'flex', flexDirection: 'column', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)'; }}
            >
              <div className="news-card-image-wrap" style={{ width: '100%', height: 240, overflow: 'hidden', background: 'var(--bg-secondary)', position: 'relative', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                {news.img ? (
                  <img src={news.img} alt={news.title} className="news-card-image" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.5s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(237, 28, 36, 0.05), rgba(59, 130, 246, 0.05))', color: 'var(--text-muted)' }}>
                    <Calendar size={36} strokeWidth={1.5} />
                  </div>
                )}
              </div>
              
              <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span className="news-tag-badge" style={{ background: accent, color: '#fff', padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Update</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} /> {news.date}
                  </span>
                </div>
                
                <h3 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '44px' }}>{news.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20, flex: 1, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{news.desc}</p>
                
                <a href={news.link} onClick={(e) => handleLinkClick(e, news.link)} target={news.link.startsWith('http') ? "_blank" : "_self"} rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: accent, fontWeight: 800, fontSize: 14, textDecoration: 'none', transition: 'gap 0.2s', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.05)' }}
                   onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                   onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
          No news updates available.
        </div>
      )}
      
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <button 
          onClick={() => setCurrentPage('news')}
          style={{ 
            padding: '14px 36px', background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', border: '1px solid var(--border-color)', 
            borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(237, 28, 36, 0.08)'; e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.transform = 'none'; }}
        >
          View All News & Updates
        </button>
      </div>
    </div>
  </section>
  );
};


const InTheNews = () => {
  const [mentions, setMentions] = useState([]);

  useEffect(() => {
    fetch('https://iscale-backend.onrender.com/api/news/public-all-news?page=1&limit=1000')
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
            
            let dateStr = "";
            if (item.m_snews_added_on || item.createdAt) {
              const d = new Date(item.m_snews_added_on || item.createdAt);
              dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }

            return {
              title: item.m_snews_des || item.m_snews_title || 'Media Announcement',
              link: item.m_snews_url || '',
              date: dateStr,
              img: getImageUrl(item.m_snews_image || item.image)
            };
          });
          setMentions(mapped);
        }
      })
      .catch(() => {});
  }, []);

  if (mentions.length === 0) return null;

  return (
    <section style={{ padding: '80px 0', background: 'var(--gradient-hero)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
            THE MEDIA LOVES US, AND MORE SO, OUR STUDENTS.
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 40 }}>
          <span style={{ background: 'linear-gradient(135deg, #ed1c24 0%, #ff007f 35%, #7f00ff 70%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
            We've been in the news!
          </span>
        </h2>

        <AutoSlider 
          items={mentions} 
          speed={80} 
          gap={24}
          renderItem={(mention, i) => (
            <div key={i} className="news-card-interactive colorful-glow-border" style={{
              width: 320, minHeight: 200, background: 'var(--card-bg)', borderRadius: 16, padding: '28px 24px',
              boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)',
              display: 'flex', flexDirection: 'column', flexShrink: 0,
              cursor: mention.link ? 'pointer' : 'default'
            }}
            onClick={() => mention.link && window.open(mention.link, '_blank')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ height: 36, display: 'flex', alignItems: 'center', filter: 'brightness(var(--theme-logo-brightness, 1))' }}>
                  {mention.img ? (
                    <img src={mention.img} alt="News Logo" style={{ maxWidth: '70%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)' }}>Media Mention</span>
                  )}
                </div>
                {mention.date && (
                  <span style={{ color: 'var(--text-muted)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={10} /> {mention.date}
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5, marginBottom: 20, flex: 1, fontWeight: 500, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {mention.title}
              </p>
              
              {mention.link && (
                <a 
                  href={mention.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    display: 'inline-block', background: 'var(--red)', color: '#fff', 
                    padding: '8px 18px', borderRadius: 8, fontWeight: 700, fontSize: 12, 
                    textDecoration: 'none', transition: 'all 0.3s', alignSelf: 'flex-start' 
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-dark)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.transform = 'none'; }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Read More
                </a>
              )}
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
    fetch('https://iscale-backend.onrender.com/api/allied/public-all-allied?page=1&limit=1000')
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
              img: getImageUrl(item.m_allied_image || item.m_allied_logo || item.image || item.logo)
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
  <section className="reveal" style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <span style={{ background: 'rgba(237, 28, 36, 0.08)', color: 'var(--red)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>ACADEMIC PARTNERS</span>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, textAlign: 'center', marginBottom: 40, color: 'var(--text-primary)' }}>
        Our <span className="animated-text-gradient">Allied Colleges</span>
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>Loading allied colleges...</div>
      ) : colleges.length > 0 ? (
      <AutoSlider 
        items={colleges} 
        speed={80} 
        direction="left"
        gap={32}
        renderItem={(college, i) => (
          <div key={i} className="premium-card hover-glow"
            style={{
              width: 280, height: 280, borderRadius: 24, padding: '24px', 
              background: `linear-gradient(135deg, hsla(${i * 45}, 80%, 20%, 0.8), hsla(${i * 45 + 30}, 80%, 10%, 0.9))`,
              boxShadow: `0 12px 32px hsla(${i * 45}, 80%, 50%, 0.15)`, 
              border: `1px solid hsla(${i * 45}, 80%, 50%, 0.3)`,
              borderTop: `2px solid hsl(${i * 45}, 80%, 50%)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative', flexShrink: 0, cursor: 'pointer', overflow: 'hidden'
            }}
          >
            {/* Glowing orb background effect inside card */}
            <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: `radial-gradient(circle, hsla(${i * 45}, 80%, 50%, 0.1) 0%, transparent 50%)`, pointerEvents: 'none' }} />
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 16, background: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', padding: 20, boxShadow: 'inset 0 0 20px rgba(255,255,255,0.02)' }}>
              <img src={college.img} alt={college.name} style={{ maxWidth: '100%', maxHeight: '110px', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }} />
            </div>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: '#fff', textAlign: 'center', margin: 0, zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{college.name}</h4>
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
        // Do not pre-populate with any dummy data, wait for actual API/backend enrollments.
        // setEnrolledCourses([]);
      }
    }
  }, [isLoggedIn]);

  return (
    <div style={{ overflowX: 'hidden', position: 'relative' }}>
      {/* Ambient Background Glows */}
      <div style={{ position: 'absolute', top: '5%', left: '-10%', width: '50vw', height: '50vw', minWidth: 600, minHeight: 600, background: 'radial-gradient(circle, rgba(237,28,36,0.06) 0%, rgba(237,28,36,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '25%', right: '-15%', width: '60vw', height: '60vw', minWidth: 800, minHeight: 800, background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(59,130,246,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '55%', left: '-5%', width: '55vw', height: '55vw', minWidth: 700, minHeight: 700, background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, rgba(16,185,129,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '80%', right: '-5%', width: '50vw', height: '50vw', minWidth: 600, minHeight: 600, background: 'radial-gradient(circle, rgba(217,70,239,0.04) 0%, rgba(217,70,239,0) 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none', borderRadius: '50%' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero setCurrentPage={setCurrentPage} />
        
        {isLoggedIn && enrolledCourses.length > 0 && (
          <EnrolledCoursesSection enrolledCourses={enrolledCourses} userName={userName} setCurrentPage={setCurrentPage} />
        )}

        <AboutSection setCurrentPage={setCurrentPage} />
        <PopularCourses setCurrentPage={setCurrentPage} />
        <TestimonialsSection setCurrentPage={setCurrentPage} />
        <LatestUpdates setCurrentPage={setCurrentPage} />
        <ExpertsSection setCurrentPage={setCurrentPage} />
        <CompanyMarquee setCurrentPage={setCurrentPage} />
        <SuccessStories setCurrentPage={setCurrentPage} />
        <LearnersCommunity />
        <AlliedCollegesSection setCurrentPage={setCurrentPage} />
        <NewsUpdates setCurrentPage={setCurrentPage} />
        <InTheNews setCurrentPage={setCurrentPage} />
        <TalkToTeam setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default HomePage;





