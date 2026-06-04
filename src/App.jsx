import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnrollmentPopup from './components/EnrollmentPopup';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import EventsPage from './pages/EventsPage';
import SuccessStoryPage from './pages/SuccessStoryPage';
import JobOpeningPage from './pages/JobOpeningPage';
import JobDetailsPage from './pages/JobDetailsPage';
import PlacementTalksPage from './pages/PlacementTalksPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CohortPage from './pages/CohortPage';
import DashboardPage from "./pages/dashboard/DashboardPage";
import MyProfile from "./pages/dashboard/MyProfile";
import EnrolledCourses from "./pages/dashboard/EnrolledCourses";
import ExploreCourses from "./pages/dashboard/ExploreCourses";
import EnrolledEvents from "./pages/dashboard/EnrolledEvents";
import Settings from "./pages/dashboard/Settings";
import TestSeriesResult from "./pages/dashboard/TestSeriesResult";

// Newly added detailed pages
import AboutPage from './pages/AboutPage';
import AlliedCollegesPage from './pages/AlliedCollegesPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import ExpertDetailsPage from './pages/ExpertDetailsPage';
import StudentTestimonialPage from './pages/StudentTestimonialPage';
import FaqPage from './pages/FaqPage';
import CertificateVerificationPage from './pages/CertificateVerificationPage';


const CourseDetailsWrapper = ({ setCurrentPage }) => {
  const { id } = useParams();
  return <CourseDetailsPage courseId={id} setCurrentPage={setCurrentPage} />;
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.substring(1);
  const currentPage = path.split('/')[0] || 'home';
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const privatePages = ['dashboard', 'my-profile', 'enrolled-courses', 'enrolled-events', 'settings', 'test-series-result'];
  
  const token = localStorage.getItem('token');
  const isDashboard = !!token && privatePages.includes(currentPage);
  const showNavAndFooter = !isDashboard && currentPage !== 'cohort-courses';

  const handleNavigate = (page) => {
    navigate(page === 'home' ? '/' : `/${page}`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (privatePages.includes(currentPage) && !token) {
      navigate('/login', { replace: true });
    }
  }, [currentPage, navigate]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showNavAndFooter && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={handleNavigate} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}
      <main style={{ flex: 1 }}>
        {isDashboard ? (
          <DashboardLayout activeTab={currentPage} setCurrentPage={handleNavigate} theme={theme} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage setCurrentPage={handleNavigate} />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/enrolled-events" element={<EnrolledEvents />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/test-series-result" element={<TestSeriesResult />} />
            </Routes>
          </DashboardLayout>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage setCurrentPage={handleNavigate} />} />
            <Route path="/login" element={<LoginPage setCurrentPage={handleNavigate} />} />
            <Route path="/register" element={<RegisterPage setCurrentPage={handleNavigate} />} />
            <Route path="/courses" element={<CoursesPage setCurrentPage={handleNavigate} />} />
            <Route path="/explore-courses" element={<ExploreCourses setCurrentPage={handleNavigate} />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/success-story" element={<SuccessStoryPage setCurrentPage={handleNavigate} />} />
            <Route path="/job-updates" element={<JobOpeningPage setCurrentPage={handleNavigate} />} />
            <Route path="/job-details/:id" element={<JobDetailsPage setCurrentPage={handleNavigate} />} />
            <Route path="/placement-talks" element={<PlacementTalksPage setCurrentPage={handleNavigate} />} />
            <Route path="/cohort-courses" element={<CohortPage setCurrentPage={handleNavigate} />} />
            <Route path="/course-details/:id" element={<CourseDetailsWrapper setCurrentPage={handleNavigate} />} />
            
            {/* New Routes */}
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/allied-colleges" element={<AlliedCollegesPage />} />
            <Route path="/placement" element={<ClientsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news-details" element={<NewsDetailsPage />} />
            <Route path="/expert-details" element={<ExpertDetailsPage />} />
            <Route path="/student-testimonials" element={<StudentTestimonialPage setCurrentPage={handleNavigate} />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/verify-certificate" element={<CertificateVerificationPage setCurrentPage={handleNavigate} />} />

            <Route path="*" element={<HomePage setCurrentPage={handleNavigate} />} />
          </Routes>
        )}
      </main>
      {showNavAndFooter && <Footer setCurrentPage={handleNavigate} />}
      {showNavAndFooter && <EnrollmentPopup />}
    </div>
  );
};

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
};

export default App;
