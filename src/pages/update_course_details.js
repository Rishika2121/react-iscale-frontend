const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'CourseDetailsPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the dummy data bases
const dbStart = content.indexOf('const coursesDatabase = {');
const dbEnd = content.indexOf('const TabButton = ({ active, label, onClick })');

if (dbStart !== -1 && dbEnd !== -1) {
    content = content.substring(0, dbStart) + content.substring(dbEnd);
}

// 2. Replace the component logic before return
const componentStart = content.indexOf('const CourseDetailsPage = ({ courseId, setCurrentPage }) => {');
const returnStart = content.indexOf('  return (', componentStart);

const newLogic = `const CourseDetailsPage = ({ courseId, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [videoOpen, setVideoOpen] = useState(false);
  const [overviewShowMore, setOverviewShowMore] = useState(false);
  const [faqShowMore, setFaqShowMore] = useState(false);
  const [curriculumShowMore, setCurriculumShowMore] = useState(false);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Player state declarations
  const [currentLectures, setCurrentLectures] = useState([]);
  const [activeCohortLecture, setActiveCohortLecture] = useState(null);
  const [isPlayingLecture, setIsPlayingLecture] = useState(false);

  const [playlistSearch, setPlaylistSearch] = useState('');
  const [isBwTheme, setIsBwTheme] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Enrollment state
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedLectures, setCompletedLectures] = useState([]);

  const [studentName, setStudentName] = useState(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const u = JSON.parse(userStr);
        if (u && u.name) return u.name;
      }
    } catch(e) {}
    return 'Student';
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`https://iscale-backend.onrender.com/api/course/public-course/\${courseId}\`);
        const json = await response.json();
        
        if (json && json.data) {
          const c = json.data;
          
          let imgUrl = \`https://ui-avatars.com/api/?name=\${encodeURIComponent(c.title)}&background=random\`;
          if (c.banner && c.banner !== 'N/A') {
            const cleanedPath = c.banner.replace(/\\\\/g, '/');
            imgUrl = cleanedPath.startsWith('http') ? cleanedPath : \`https://iscale-backend.onrender.com/\${cleanedPath.replace(/^src\\//, '')}\`;
          }

          setData({
            id: c.slug || c._id,
            title: c.title,
            description: c.description || '',
            overviewHtml: c.description ? \`<p style="color: #64748b; font-size: 16px;">\${c.description}</p>\` : '',
            price: c.price !== 'N/A' && c.price ? \`₹\${parseInt(c.price).toLocaleString()}\` : 'FREE',
            original: c.price !== 'N/A' && c.price ? \`₹\${parseInt(c.price).toLocaleString()}\` : '',
            thumbnail: imgUrl,
            category: c.category || '',
            views: c.views || 0,
            language: c.language || 'English',
            lastUpdated: c.updated_at ? new Date(c.updated_at).toLocaleDateString() : '',
            videoUrl: c.video_link || ''
          });
          
          // Fallbacks for lectures
          setCurrentLectures([]);
        }
      } catch (err) {
        console.error('Course API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    if (currentLectures && currentLectures.length > 0) {
      setActiveCohortLecture(currentLectures[0]);
    } else {
      setActiveCohortLecture(null);
    }
    if (data) {
      try {
        const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
        setIsEnrolled(enrolled.some(c => c.id === data.id));
      } catch (e) {
        setIsEnrolled(false);
      }
      try {
        const stored = localStorage.getItem(\`completed_lectures_\${data.id}\`);
        setCompletedLectures(stored ? JSON.parse(stored) : []);
      } catch (e) {
        setCompletedLectures([]);
      }
    }
    setPlaylistSearch('');
  }, [data, currentLectures]);

  const isCertUnlocked = isEnrolled && currentLectures.length > 0 && completedLectures.length === currentLectures.length;

  const getVerificationId = () => {
    if (!data) return 'ISC-UNK-0000';
    let code = 'UPS';
    const hash = ((data.id.length * 7) + 123) % 9000 + 1000;
    return \`ISC-\${code}-\${hash}\`;
  };

  const handleToggleComplete = (lectureId) => {
    setCompletedLectures(prev => {
      const next = prev.includes(lectureId) 
        ? prev.filter(id => id !== lectureId) 
        : [...prev, lectureId];
      
      if (data) localStorage.setItem(\`completed_lectures_\${data.id}\`, JSON.stringify(next));

      const percent = currentLectures.length > 0 
        ? Math.round((next.length / currentLectures.length) * 100) 
        : 0;

      try {
        const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
        const updated = enrolled.map(c => {
          if (data && c.id === data.id) {
            return { ...c, progress: percent };
          }
          return c;
        });
        localStorage.setItem('enrolled_courses', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }

      return next;
    });
  };

  const handleEnrollClick = () => {
    if (!data) return;
    setIsEnrolled(true);

    try {
      const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
      if (!enrolled.some(c => c.id === data.id)) {
        const newCourse = {
          id: data.id,
          title: data.title,
          category: data.category || 'Data Science',
          progress: currentLectures.length > 0 
            ? Math.round((completedLectures.length / currentLectures.length) * 100) 
            : 0,
          bgGradient: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
          img: data.thumbnail
        };
        enrolled.push(newCourse);
        localStorage.setItem('enrolled_courses', JSON.stringify(enrolled));
      }
    } catch (e) {
      console.error(e);
    }
    
    alert(\`Successfully enrolled in "\${data.title}"!\`);
  };

  const curriculum = data?.curriculum || [];
  const details = data?.details || [];
  const highlights = data?.highlights || [];
  const faqs = data?.faqs || [];
  const certText = data?.certificateText || '';
  const certImg = data?.certificateImg || '';
  const videoUrl = data?.videoUrl || '';
  const feesData = data?.fees || null;
  const toolsData = data?.tools || [];
  const instructorsData = data?.instructors || [];
  const reviewsData = data?.reviews || [];

  const tabs = ['Overview', 'Course Content', 'Details', 'Highlights', 'Certificate', 'FAQ\\'s', 'Fees', 'Tools', 'Instructor', 'Review'];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const element = document.getElementById(tab.replace(/['\\s]/g, '').toLowerCase());
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'var(--text-primary)' }}>Loading Course Details...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--text-primary)' }}>Course Not Found</h2>
        <button onClick={() => setCurrentPage('courses')} style={{ marginTop: 20, padding: '10px 20px', background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Back to Courses</button>
      </div>
    );
  }

`;

if (componentStart !== -1 && returnStart !== -1) {
    content = content.substring(0, componentStart) + newLogic + content.substring(returnStart);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated CourseDetailsPage.jsx');
