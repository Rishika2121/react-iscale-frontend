import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';

const Accordion = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const displayItems = showMore ? items : items.slice(0, 3);

  return (
    <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: 16 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 18, fontWeight: 800, color: 'var(--text-primary)'
        }}
      >
        {title}
        {isOpen ? <ChevronUp size={20} color="var(--red)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
      </button>
      {isOpen && (
        <div style={{ paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {displayItems.map((item, idx) => (
            <div key={idx} style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderRadius: 8, color: 'var(--text-primary)', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 12 }}>
              <FileText size={18} color="var(--red)" />
              <div dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
          {items.length > 3 && (
            <button onClick={() => setShowMore(!showMore)} style={{ color: 'var(--red)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignSelf: 'flex-start', marginTop: 8 }}>
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const FaqPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faqLoading, setFaqLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses');
        const data = await response.json();
        if (data.status && Array.isArray(data.data) && data.data.length > 0) {
          setCourses(data.data);
          setSelectedCourseId(data.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchFaqs = async () => {
      if (!selectedCourseId) return;
      setFaqLoading(true);
      try {
        const response = await fetch(`https://iscale-backend.onrender.com/api/faq/public-get-faqs/${selectedCourseId}`);
        const data = await response.json();
        if (data.status && Array.isArray(data.data)) {
          setFaqs(data.data.map(f => ({ q: f.title, a: f.description })));
        } else {
          setFaqs([]);
        }
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
        setFaqs([]);
      } finally {
        setFaqLoading(false);
      }
    };
    fetchFaqs();
  }, [selectedCourseId]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading FAQs...</h2>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: 'var(--font-body)', paddingBottom: 100, color: 'var(--text-primary)' }}>
      <section style={{ background: 'var(--gradient-hero)', padding: '60px 0', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>Frequently Asked Questions</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>Find answers to common questions about our courses and programs.</p>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container mobile-col" style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          
          {/* Sidebar - Course Tabs */}
          <div style={{ width: '300px', flexShrink: 0, background: 'var(--card-bg)', borderRadius: 16, padding: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: 'var(--text-primary)' }}>Select Course</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {courses.map(course => (
                <button
                  key={course._id}
                  onClick={() => setSelectedCourseId(course._id)}
                  style={{
                    padding: '12px 16px', textAlign: 'left', borderRadius: 8,
                    background: selectedCourseId === course._id ? 'var(--red)' : 'var(--bg-secondary)',
                    color: selectedCourseId === course._id ? '#fff' : 'var(--text-secondary)',
                    fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                    fontSize: 14
                  }}
                >
                  {course.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content - FAQs */}
          <div style={{ flex: 1, background: 'var(--card-bg)', borderRadius: 16, padding: 40, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}>
            {faqLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading FAQs...</div>
            ) : faqs.length > 0 ? (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: 'var(--text-primary)' }}>
                  {courses.find(c => c._id === selectedCourseId)?.title} FAQs
                </h2>
                {faqs.map((faq, idx) => (
                  <Accordion key={idx} title={faq.q} items={[faq.a]} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <h3>No FAQs available for this course.</h3>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default FaqPage;
