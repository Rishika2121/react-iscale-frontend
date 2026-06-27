import React from 'react';
import { Youtube, MessageSquare, Users, BookOpen, ArrowRight } from 'lucide-react';

const CommunityPage = () => {
  const communities = [
    {
      icon: <Youtube size={28} />,
      title: 'YouTube Channel',
      description: 'Watch free tutorials, placement talks, expert interviews, and course previews on our official YouTube channel.',
      link: 'https://youtube.com',
      buttonText: 'Subscribe Now',
      color: '#FF0000',
      bgColor: 'rgba(255, 0, 0, 0.08)',
      borderColor: 'rgba(255, 0, 0, 0.15)',
      members: '50K+ Subscribers'
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'WhatsApp Community',
      description: 'Join our WhatsApp groups for real-time updates, peer discussions, doubt resolution, and networking with fellow learners.',
      link: 'https://whatsapp.com',
      buttonText: 'Join Group',
      color: '#25D366',
      bgColor: 'rgba(37, 211, 102, 0.08)',
      borderColor: 'rgba(37, 211, 102, 0.15)',
      members: '10K+ Members'
    },
    {
      icon: <Users size={28} />,
      title: 'LinkedIn Network',
      description: 'Connect with industry professionals, alumni, and mentors. Stay updated with job postings and industry trends.',
      link: 'https://linkedin.com',
      buttonText: 'Connect',
      color: '#0A66C2',
      bgColor: 'rgba(10, 102, 194, 0.08)',
      borderColor: 'rgba(10, 102, 194, 0.15)',
      members: '25K+ Followers'
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
      title: 'Instagram',
      description: 'Follow us for daily tech tips, student success stories, behind-the-scenes content, and motivational posts.',
      link: 'https://instagram.com',
      buttonText: 'Follow Us',
      color: '#E4405F',
      bgColor: 'rgba(228, 64, 95, 0.08)',
      borderColor: 'rgba(228, 64, 95, 0.15)',
      members: '15K+ Followers'
    },
    {
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
      title: 'Twitter / X',
      description: 'Get the latest tech news, platform updates, and participate in Twitter Spaces with industry leaders.',
      link: 'https://twitter.com',
      buttonText: 'Follow',
      color: '#1DA1F2',
      bgColor: 'rgba(29, 161, 242, 0.08)',
      borderColor: 'rgba(29, 161, 242, 0.15)',
      members: '8K+ Followers'
    },
    {
      icon: <BookOpen size={28} />,
      title: 'Discussion Forum',
      description: 'Ask questions, share knowledge, participate in coding challenges, and collaborate with fellow learners on our forum.',
      link: '#',
      buttonText: 'Coming Soon',
      color: 'var(--red)',
      bgColor: 'rgba(239, 68, 68, 0.08)',
      borderColor: 'rgba(239, 68, 68, 0.15)',
      members: 'Launching Soon'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .community-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .community-hero {
          text-align: center;
          margin-bottom: 64px;
        }
        .community-hero h1 {
          font-family: var(--font-display);
          font-size: 42px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
          letter-spacing: -1px;
        }
        .community-hero p {
          font-size: 16px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .community-badge {
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
        .community-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .community-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .community-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .community-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }
        .community-card:hover::before {
          opacity: 1;
        }
        .community-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: transform 0.3s ease;
        }
        .community-card:hover .community-icon {
          transform: scale(1.1);
        }
        .community-card h3 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }
        .community-card p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .community-members {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .community-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          border: 2px solid;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          font-family: var(--font-body);
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }
        .community-btn:hover {
          transform: translateX(4px);
        }
        .community-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }
        .stat-card {
          text-align: center;
          padding: 32px 20px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
        }
        .stat-card .stat-value {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--red), #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        .stat-card .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
        }
        @media (max-width: 1024px) {
          .community-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .community-hero h1 { font-size: 28px; }
          .community-grid { grid-template-columns: 1fr; }
          .community-stats { grid-template-columns: 1fr; gap: 16px; }
          .stat-card .stat-value { font-size: 28px; }
        }
      `}} />

      <div className="community-page">
        <div className="community-hero">
          <span className="community-badge">🌐 Community</span>
          <h1>Join Our Community</h1>
          <p>Be part of a thriving community of learners, developers, and industry professionals. Learn, grow, and succeed together.</p>
        </div>

        {/* Stats */}
        <div className="community-stats">
          <div className="stat-card">
            <div className="stat-value">1L+</div>
            <div className="stat-label">Community Members</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">50+</div>
            <div className="stat-label">Expert Mentors</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">500+</div>
            <div className="stat-label">Companies Hiring</div>
          </div>
        </div>

        {/* Community Cards */}
        <div className="community-grid">
          {communities.map((community, index) => (
            <div 
              key={index} 
              className="community-card"
              style={{ '--card-color': community.color }}
            >
              <style dangerouslySetInnerHTML={{ __html: `
                .community-card:nth-child(${index + 1})::before {
                  background: ${community.color};
                }
              `}} />
              <div 
                className="community-icon" 
                style={{ background: community.bgColor, color: community.color, border: `1px solid ${community.borderColor}` }}
              >
                {community.icon}
              </div>
              <h3>{community.title}</h3>
              <p>{community.description}</p>
              <div className="community-members">{community.members}</div>
              <button 
                className="community-btn" 
                style={{ borderColor: community.color, color: community.color }}
                onClick={() => {
                  if (community.link !== '#') window.open(community.link, '_blank');
                }}
              >
                {community.buttonText} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
