import React, { useState, useEffect } from 'react';
import { Play, Download, Eye, Calendar, Globe, ChevronDown, ChevronUp, ChevronRight, FileText, CheckCircle, XCircle, CreditCard, Video, ArrowRight, User, BookOpen, Award, Sparkles, Star, Search, Lock, Check, ShieldCheck, Printer, PlayCircle, Heart } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

const coursesDatabase = {
  'data-science-with-generative-ai-course': {
    id: 'data-science-with-generative-ai-course',
    title: 'Data Science With Generative AI Course',
    description: "The iScale's Full Stack Data Science With Generative AI Course is an Job-Oriented course designed to equip aspiring data scientists with the latest and most wanted data skills. Become a Certified Data Scientist with The iScale Skills and utilize the Power of Generative AI with machine learning, NLP, etc. Learn top-in-demand skills from the best in the industry. Transform your career in a high-demand data science field.",
    views: 28574,
    lastUpdated: '10 May, 2026',
    language: 'Hinglish',
    thumbnail: 'https://www.theiscale.com/myadmin/uploads/courses/Data_science_Course_paid_compressed.png',
    overviewHtml: `
      <p style="color: #64748b; font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
        The iScale's Full Stack Data Science With Generative AI Course is an Job-Oriented course designed to equip aspiring data scientists with the latest and most wanted data skills. Become a Certified Data Scientist with The iScale Skills and utilize the Power of Generative AI with machine learning, NLP, etc. Learn top-in-demand skills from the best in the industry. Transform your career in a high-demand data science field.
      </p>
      <p style="color: #64748b; font-size: 16px; line-height: 1.8; margin-bottom: 32px;">
        <strong>The iScale's</strong> programs in <strong>Full Stack Data Science With Generative AI program</strong> is designed for aspiring Data Scientists. With a job-oriented approach, learners master industry-demanded tools, work on real-world projects, and receive personalized mentorship to students. From resume building to exclusive job portals and mock interviews, we provide comprehensive career support.
      </p>
      <h3 style="text-align: center; color: #cbd5e1; font-size: 32px; font-weight: 800; font-family: var(--font-display); letter-spacing: 1px; text-transform: uppercase;">
        Take the leap to success with The iScale!
      </h3>
    `,
    curriculum: [
  { title: 'Curriculum Python', modules: ['Lecture Video'] },
  { title: 'M 1 : Python Basics Unit 01 - 06', modules: ['Lecture Video'] },
  { title: 'M 1 : Python Foundation Unit 07- 11', modules: ['Lecture Video'] },
  { title: 'M 1 : Python Advanced Unit 12 - 14', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 1', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 2', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 3', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 4', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 5', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- Covid-19 Impact Analysis', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- Google Image Scrapping', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- WhatsApp Chat Analysis', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- Movie Recommendation', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- Price Comparison', modules: ['Lecture Video'] },
  { title: 'Module 3 : Statistics Unit 01 - 03', modules: ['Lecture Video'] },
  { title: 'Module 3 : Statistics Unit 04 - 06', modules: ['Lecture Video'] },
  { title: 'Module 3 Statistics Unit 07 - 09', modules: ['Lecture Video'] },
  { title: 'Module 4 : Feature Engineering', modules: ['Lecture Video'] },
  { title: 'Modue 5 : Exploratory Data Analysis : Unit 01', modules: ['Lecture Video'] },
  { title: 'Modue 5 : Exploratory Data Analysis : Unit 02', modules: ['Lecture Video'] },
  { title: 'Modue 6 : Machine Learning Part 1 : Regression', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 1 : Project', modules: ['Lecture Video'] },
  { title: 'Modue 6 : Machine Learning Part 2 : Logistic Regression', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 2 : Project', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 3 : Decision Tree', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 4 : Support Vector Machines', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 5 : Naive Bayes', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 5 : Project', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 6 : ET & its Types', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 7 : Boosting', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 8 : KNN Algorithm', modules: ['Lecture Video'] },
  { title: 'Machine Learning II : PCA', modules: ['Lecture Video'] },
  { title: 'Machine Learning II : Clustering Algorithms', modules: ['Lecture Video'] },
  { title: 'Machine Learning II : Anomaly Detection', modules: ['Lecture Video'] },
  { title: 'Machine Learning II : Time Series', modules: ['Lecture Video'] },
  { title: 'Deep Learning : Lecture 1 to 10', modules: ['Lecture Video'] },
  { title: 'Deep Learning : Lecture 11 to 17', modules: ['Lecture Video'] },
  { title: 'Module 9 - NLP', modules: ['Lecture Video'] },
  { title: 'NLP : Part 2', modules: ['Lecture Video'] },
  { title: 'NLP : Projects', modules: ['Lecture Video'] },
  { title: 'Computer Vision', modules: ['Lecture Video'] },
  { title: 'Computer Vision : Project 1', modules: ['Lecture Video'] },
  { title: 'Computer Vision : Project 2', modules: ['Lecture Video'] },
  { title: 'Computer Vision : Project 3', modules: ['Lecture Video'] },
  { title: 'Module 12 AGENTIC AI', modules: ['Lecture Video'] },
  { title: 'Module 12 : AGENTIC AI Project', modules: ['Lecture Video'] },
  { title: 'Module- GENERATIVE AI', modules: ['Lecture Video'] },
  { title: 'MODULE 11 : SQL | Notes & Study Material', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 01 - 04', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 05 - 08', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 09 - 14', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 15 - 18', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 19', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 20', modules: ['Lecture Video'] },
  { title: 'SQL Project - Music Store Data', modules: ['Lecture Video'] },
  { title: 'UPDATED POWER BI LECTURES', modules: ['Lecture Video'] },
  { title: 'MODULE 12 : Power BI | Notes & Study Material', modules: ['Lecture Video'] },
  { title: 'Power BI : Unit 01 - 07', modules: ['Lecture Video'] },
  { title: 'Power BI : Unit 08 - 12', modules: ['Lecture Video'] },
  { title: 'Power BI : Project 1', modules: ['Lecture Video'] },
  { title: 'Project - Real Estate', modules: ['Lecture Video'] },
  { title: 'Power BI : Project 2', modules: ['Lecture Video'] },
  { title: 'DAX FUNCTIONS & POWER QUERY', modules: ['Lecture Video'] },
  { title: 'MODULE 13 : Advance Excel | Notes & Study Material', modules: ['Lecture Video'] },
  { title: 'Basic Excel', modules: ['Lecture Video'] },
  { title: 'Intermediate Excel', modules: ['Lecture Video'] },
  { title: 'Moderate Excel', modules: ['Lecture Video'] },
  { title: 'Advance Excel', modules: ['Lecture Video'] },
  { title: 'Project- Analysis the Online Store Annual Report', modules: ['Lecture Video'] },
  { title: 'MODULE 14 : Tableau | Notes & Study Material', modules: ['Lecture Video'] },
  { title: 'Tableau : Unit 01', modules: ['Lecture Video'] },
  { title: 'Tableau : Unit 02', modules: ['Lecture Video'] },
  { title: 'Tableau : Unit 03', modules: ['Lecture Video'] },
  { title: 'Tableau : Unit 04', modules: ['Lecture Video'] },
  { title: 'Tableau Capstone Project - 01', modules: ['Lecture Video'] },
  { title: 'Tableau Capstone Project - 02 & 03', modules: ['Lecture Video'] },
  { title: 'SPECIAL VIRTUAL CLASS', modules: ['Lecture Video'] },
  { title: '20+ AI Tools Lectures', modules: ['Lecture Video'] }
]
,
    details: [
      {
        title: 'Resume Building',
        desc: 'Craft a winning resume highlighting your skills and experience, opening doors to top job opportunities in data analytics.',
        img: 'https://www.theiscale.com/myadmin/uploads/course_features/DS_-_resume_building.jpg'
      },
      {
        title: 'Exclusive Job Portal',
        desc: 'Access unique job opportunities with organizations seeking skilled data analysts, offering potential salary hikes and career growth.',
        img: 'https://www.theiscale.com/myadmin/uploads/course_features/job_potal_ds_(2).png'
      },
      {
        title: 'Mock Interviews',
        desc: 'Practice and polish your interview skills, boosting confidence and readiness to ace job interviews in the competitive data analytics industry.',
        img: 'https://www.theiscale.com/myadmin/uploads/course_features/Mock_interview_ds_(1).png'
      },
      {
        title: 'LinkedIn Profile Building',
        desc: 'Create a professional online presence, attracting recruiters and enhancing your visibility for lucrative job offers in data analytics.',
        img: 'https://www.theiscale.com/myadmin/uploads/course_features/linked_da_(1)1.png'
      },
      {
        title: 'Portfolio',
        desc: 'Showcase Your Projects And Skills Via Portfolio Which Will Make You Stand Out To Potential Employers Seeking Practical Expertise.',
        img: 'https://www.theiscale.com/myadmin/uploads/course_features/Portfoli_ds_(1).png'
      }
    ],
    highlights: [
      { title: '365 Days Course Duration', img: 'https://www.theiscale.com/myadmin/uploads/course_training/21.png' },
      { title: 'Live & Scheduled Classes', img: 'https://www.theiscale.com/myadmin/uploads/course_training/31.png' },
      { title: 'Business Case Study', img: 'https://www.theiscale.com/myadmin/uploads/course_training/5.png' },
      { title: 'Doubt Assistance', img: 'https://www.theiscale.com/myadmin/uploads/course_training/71.png' },
      { title: 'LMS Access', img: 'https://www.theiscale.com/myadmin/uploads/course_training/101.png' },
      { title: 'Industry-Oriented Curriculum', img: 'https://www.theiscale.com/myadmin/uploads/course_training/1.png' },
      { title: 'Placement Updates', img: 'https://www.theiscale.com/myadmin/uploads/course_training/41.png' },
      { title: 'Certificate of Training', img: 'https://www.theiscale.com/myadmin/uploads/course_training/61.png' },
      { title: 'Soft Skills Guidance', img: 'https://www.theiscale.com/myadmin/uploads/course_training/8.png' },
      { title: 'Hands-on Projects', img: 'https://www.theiscale.com/myadmin/uploads/course_training/91.png' }
    ],
    certificateText: 'Earn an ISO-certified certificate from The iScale, your gateway to industry-oriented online courses. Our certificates are recognized by leading industries, validating your proficiency in cutting-edge skills. Enhance your career prospects with credentials that reflect real-world expertise. Join The iScale today and unlock opportunities in the competitive professional landscape.',
    certificateImg: 'https://www.theiscale.com/assets/images/Sample%20Certificate.png',
    videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU',
    fees: {
      basic: { price: '₹19,999', original: '₹25,999', link: '#' },
      premium: { price: '₹29,999', original: '₹35,999', link: '#' },
      pro: { price: '₹39,999', original: '₹49,999', link: '#' },
      features: [
        { name: 'LMS Software Access (Web + Android)', basic: true, premium: true, pro: true },
        { name: 'Recorded Lectures with Notes', basic: true, premium: true, pro: true },
        { name: 'LIVE Doubt Classes (4 Days/Week)', basic: false, premium: true, pro: true },
        { name: '1:1 Doubt Assistance (Email/Call/Msg)', basic: false, premium: true, pro: true },
        { name: '1 Doubt Support Per Week - Saturday', basic: true, premium: true, pro: true },
        { name: 'Data Story Telling', basic: true, premium: true, pro: true },
        { name: 'Monthly LIVE Test', basic: true, premium: true, pro: true },
        { name: 'Placement Preparation Module', basic: true, premium: true, pro: true },
        { name: 'Resume & Portfolio Building', basic: true, premium: true, pro: true },
        { name: 'AI Mock Interview', basic: true, premium: true, pro: true },
        { name: 'Progress Interview', basic: false, premium: true, pro: true },
        { name: 'Job Portal Access', basic: false, premium: true, pro: true },
        { name: 'Course Duration', basic: '6 Months', premium: '6 Months', pro: '12 Months' },
        { name: '1:1 Portfolio Assistance', basic: false, premium: false, pro: true },
        { name: '1:1 Mock Interview (2 Tech + 2 HR)', basic: false, premium: false, pro: true },
        { name: '1:1 Dedicated Job Assistance', basic: false, premium: false, pro: true },
        { name: 'Course Completion Certificate', basic: true, premium: true, pro: true },
        { name: 'Academic Internship Certificate', basic: false, premium: false, pro: true },
        { name: 'Free Master of Data Analytics Course', basic: true, premium: true, pro: true },
        { name: 'Master of Data Analytics Certificate', basic: false, premium: false, pro: true }
      ]
    },
    tools: [
      { name: 'Python', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a11.png' },
      { name: 'Matplotlib', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a21.jpg' },
      { name: 'NumPy', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a31.png' },
      { name: 'Pandas', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a51.png' },
      { name: 'Xampp', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a121.png' },
      { name: 'MySQL', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a131.png' },
      { name: 'Power BI', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a71.jpg' },
      { name: 'SciPy', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a81.png' },
      { name: 'TensorFlow', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a141.png' },
      { name: 'Anaconda', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a91.png' },
      { name: 'Flask', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a23.png' },
      { name: 'Excel', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a61.jpg' },
      { name: 'Jupyter', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a101.png' },
      { name: 'OpenCV', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a24.png' },
      { name: 'Scikit-Learn', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a41.png' },
      { name: 'GENSIM', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a27.png' },
      { name: 'PyCharm', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a111.png' },
      { name: 'PostgreSQL', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a28.png' },
      { name: 'Power Query', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a29.png' },
      { name: 'DAX', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a30.png' },
      { name: 'Plotly', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a32.png' },
      { name: 'PyTorch', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a25.png' },
      { name: 'Seaborn', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a34.png' },
      { name: 'Streamlit', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a35.png' },
      { name: 'Tableau', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a36.png' },
      { name: 'Keras', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a26.png' },
      { name: 'BeautifulSoup', img: 'https://www.theiscale.com/myadmin/uploads/course_tool/a38.png' }
    ],
    instructors: [
      { name: 'Swati Mam', role: 'Mentor', img: 'https://www.theiscale.com/myadmin/uploads/courses/swati2.png' },
      { name: 'Nishant Sir', role: 'Mentor', img: 'https://www.theiscale.com/myadmin/uploads/courses/nikki_(1).png' },
      { name: 'Bijay Sir', role: 'Mentor', img: 'https://www.theiscale.com/myadmin/uploads/courses/Bijay_(1).png' },
      { name: 'Sweta', role: 'Mentor', img: 'https://www.theiscale.com/myadmin/uploads/courses/Sweta_(1).png' }
    ]
  },
  'master-of-data-analytics-program': {
    id: 'master-of-data-analytics-program',
    title: 'Master Of Data Analytics Program',
    description: "Accelerate your path to success with The iScale's Master of Data Analytics course - where job readiness meets cutting-edge skills! The iScale is the gateway to lucrative job opportunities in the digital age.",
    views: 28749,
    lastUpdated: '10 May, 2026',
    language: 'Hinglish',
    category: 'Data Analyst Courses',
    videoUrl: 'https://www.youtube.com/embed/HpgZ5GP4yHM',
    thumbnail: 'https://www.theiscale.com/myadmin/uploads/courses/Data_science_Course_paid_compressed.png',
    overviewHtml: `
      <p style="color: #64748b; font-size: 16px; line-height: 1.8; margin-bottom: 24px;">
        Accelerate your path to success with The iScale's Master of Data Analytics course - where job readiness meets cutting-edge skills!
      </p>
    `
  },
  'ai-engineer-advance-program': {
    id: 'ai-engineer-advance-program',
    title: 'AI Engineer Advance Program',
    description: "Master the principles of Artificial Intelligence and deep learning in this advanced program. Build complex neural networks and real-world AI applications.",
    views: 15432,
    lastUpdated: '12 May, 2026',
    language: 'English',
    category: 'AI Courses',
    thumbnail: 'https://www.theiscale.com/myadmin/uploads/courses/Your_paragraph_text_(10).jpg',
    videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU',
    overviewHtml: '<p style="color: #64748b; font-size: 16px;">This program covers advanced AI topics including computer vision, NLP, and reinforcement learning.</p>',
    curriculum: [
  { title: 'Curriculum Python', modules: ['Lecture Video'] },
  { title: 'M 1 : Python Basics Unit 01 - 06', modules: ['Lecture Video'] },
  { title: 'M 1 : Python Foundation Unit 07- 11', modules: ['Lecture Video'] },
  { title: 'M 1 : Python Advanced Unit 12 - 14', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 1', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 2', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 3', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 4', modules: ['Lecture Video'] },
  { title: 'MODULE 2 : Python Libraries Level 5', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- Covid-19 Impact Analysis', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- Google Image Scrapping', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- WhatsApp Chat Analysis', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- Movie Recommendation', modules: ['Lecture Video'] },
  { title: 'M-2 : Project- Price Comparison', modules: ['Lecture Video'] },
  { title: 'Module 3 : Statistics Unit 01 - 03', modules: ['Lecture Video'] },
  { title: 'Module 3 : Statistics Unit 04 - 06', modules: ['Lecture Video'] },
  { title: 'Module 3 Statistics Unit 07 - 09', modules: ['Lecture Video'] },
  { title: 'Module 4 : Feature Engineering', modules: ['Lecture Video'] },
  { title: 'Modue 5 : Exploratory Data Analysis : Unit 01', modules: ['Lecture Video'] },
  { title: 'Modue 5 : Exploratory Data Analysis : Unit 02', modules: ['Lecture Video'] },
  { title: 'Modue 6 : Machine Learning Part 1 : Regression', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 1 : Project', modules: ['Lecture Video'] },
  { title: 'Modue 6 : Machine Learning Part 2 : Logistic Regression', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 2 : Project', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 3 : Decision Tree', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 4 : Support Vector Machines', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 5 : Naive Bayes', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 5 : Project', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 6 : ET & its Types', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 7 : Boosting', modules: ['Lecture Video'] },
  { title: 'Machine Learning Part 8 : KNN Algorithm', modules: ['Lecture Video'] },
  { title: 'Machine Learning II : PCA', modules: ['Lecture Video'] },
  { title: 'Machine Learning II : Clustering Algorithms', modules: ['Lecture Video'] },
  { title: 'Machine Learning II : Anomaly Detection', modules: ['Lecture Video'] },
  { title: 'Machine Learning II : Time Series', modules: ['Lecture Video'] },
  { title: 'Deep Learning : Lecture 1 to 10', modules: ['Lecture Video'] },
  { title: 'Deep Learning : Lecture 11 to 17', modules: ['Lecture Video'] },
  { title: 'Module 9 - NLP', modules: ['Lecture Video'] },
  { title: 'NLP : Part 2', modules: ['Lecture Video'] },
  { title: 'NLP : Projects', modules: ['Lecture Video'] },
  { title: 'Computer Vision', modules: ['Lecture Video'] },
  { title: 'Computer Vision : Project 1', modules: ['Lecture Video'] },
  { title: 'Computer Vision : Project 2', modules: ['Lecture Video'] },
  { title: 'Computer Vision : Project 3', modules: ['Lecture Video'] },
  { title: 'Module 12 AGENTIC AI', modules: ['Lecture Video'] },
  { title: 'Module 12 : AGENTIC AI Project', modules: ['Lecture Video'] },
  { title: 'Module- GENERATIVE AI', modules: ['Lecture Video'] },
  { title: 'MODULE 11 : SQL | Notes & Study Material', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 01 - 04', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 05 - 08', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 09 - 14', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 15 - 18', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 19', modules: ['Lecture Video'] },
  { title: 'SQL : Unit 20', modules: ['Lecture Video'] },
  { title: 'SQL Project - Music Store Data', modules: ['Lecture Video'] },
  { title: 'UPDATED POWER BI LECTURES', modules: ['Lecture Video'] },
  { title: 'MODULE 12 : Power BI | Notes & Study Material', modules: ['Lecture Video'] },
  { title: 'Power BI : Unit 01 - 07', modules: ['Lecture Video'] },
  { title: 'Power BI : Unit 08 - 12', modules: ['Lecture Video'] },
  { title: 'Power BI : Project 1', modules: ['Lecture Video'] },
  { title: 'Project - Real Estate', modules: ['Lecture Video'] },
  { title: 'Power BI : Project 2', modules: ['Lecture Video'] },
  { title: 'DAX FUNCTIONS & POWER QUERY', modules: ['Lecture Video'] },
  { title: 'MODULE 13 : Advance Excel | Notes & Study Material', modules: ['Lecture Video'] },
  { title: 'Basic Excel', modules: ['Lecture Video'] },
  { title: 'Intermediate Excel', modules: ['Lecture Video'] },
  { title: 'Moderate Excel', modules: ['Lecture Video'] },
  { title: 'Advance Excel', modules: ['Lecture Video'] },
  { title: 'Project- Analysis the Online Store Annual Report', modules: ['Lecture Video'] },
  { title: 'MODULE 14 : Tableau | Notes & Study Material', modules: ['Lecture Video'] },
  { title: 'Tableau : Unit 01', modules: ['Lecture Video'] },
  { title: 'Tableau : Unit 02', modules: ['Lecture Video'] },
  { title: 'Tableau : Unit 03', modules: ['Lecture Video'] },
  { title: 'Tableau : Unit 04', modules: ['Lecture Video'] },
  { title: 'Tableau Capstone Project - 01', modules: ['Lecture Video'] },
  { title: 'Tableau Capstone Project - 02 & 03', modules: ['Lecture Video'] },
  { title: 'SPECIAL VIRTUAL CLASS', modules: ['Lecture Video'] },
  { title: '20+ AI Tools Lectures', modules: ['Lecture Video'] }
]
,
    details: [
      { title: 'Resume Building', desc: 'Craft a winning resume highlighting your AI skills.', img: 'https://www.theiscale.com/myadmin/uploads/course_features/DS_-_resume_building.jpg' },
      { title: 'Projects & Portfolios', desc: 'Build an impressive portfolio with 15+ real-world industry case studies.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80' }
    ]
  },

  'advance-python-with-ai-tools': {
    id: 'advance-python-with-ai-tools',
    title: 'Advance Python with AI Tools',
    description: "This Advanced Python Course with AI Integration is designed to transform you from a learner into an AI-driven architect. In 2026, Python is no longer just about scripts; it is the backbone of autonomous agents, real-time data intelligence, and generative media.",
    views: 765,
    lastUpdated: '18 Apr, 2026',
    language: 'English',
    category: 'Foundation Courses',
    videoUrl: 'https://www.youtube.com/embed/QXeEoD0pB3E',
    cssThumbnailConfig: {
      badge: 'APP + WEB COURSE',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'ADVANCE', style: { color: '#fbbf24', fontSize: 44, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'PYTHON', style: { color: '#fbbf24', fontSize: 44, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'WITH AI TOOLS', style: { color: '#cbd5e1', fontSize: 24, fontWeight: 800, lineHeight: 1.2, marginTop: 8, letterSpacing: 1 } }
      ]
    }
  },
  'power-bi-tableau-for-data-visualization': {
    id: 'power-bi-tableau-for-data-visualization',
    title: 'Power BI & Tableau For Data Visualization',
    description: "Master industry-leading data visualization tools. Turn complex data into clear, actionable insights with Power BI and Tableau.",
    views: 163,
    lastUpdated: '18 Apr, 2026',
    language: 'English',
    category: 'Foundation Courses',
    videoUrl: 'https://www.youtube.com/embed/TmhQCQr_DCA',
    cssThumbnailConfig: {
      badge: 'APP + WEB COURSE',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'POWER BI', style: { color: '#fbbf24', fontSize: 38, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: '& TABLEAU', style: { color: '#fbbf24', fontSize: 38, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'FOR DATA VISUALIZATION', style: { color: '#cbd5e1', fontSize: 18, fontWeight: 800, lineHeight: 1.2, marginTop: 8, letterSpacing: 1 } }
      ]
    }
  },
  'ai-powered-excel-full-course': {
    id: 'ai-powered-excel-full-course',
    title: 'AI Powered Excel Full Course',
    description: "Become industry-ready with The iScale's AI Powered Excel Full Course. This practical and career-focused program helps learners master Advanced Excel, AI-integrated workflows, business reporting, and data analysis techniques used by top companies.",
    views: 158,
    lastUpdated: '13 May, 2026',
    language: 'English',
    category: 'Foundation Courses',
    videoUrl: 'https://www.youtube.com/embed/Vl0H-qT87tE',
    cssThumbnailConfig: {
      badge: 'APP + WEB COURSE',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'ADVANCE', style: { color: '#fbbf24', fontSize: 38, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'EXCEL', style: { color: '#fbbf24', fontSize: 38, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'MASTER CLASS', style: { color: '#fbbf24', fontSize: 38, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'WITH AI', style: { color: '#cbd5e1', fontSize: 24, fontWeight: 800, lineHeight: 1.2, marginTop: 8, letterSpacing: 1 } }
      ]
    }
  },
  'ai-cohort-course': {
    id: 'ai-cohort-course',
    title: 'AI Cohort Course',
    description: "Unlock the power of Artificial Intelligence with our intensive 45-Days AI Cohort Batch. This program is meticulously designed to fast-track your journey into the world of AI, providing you with high-demand skills through a curriculum of 30+ comprehensive lectures.",
    views: 693,
    lastUpdated: '19 May, 2026',
    language: 'English',
    category: 'Foundation Courses',
    videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4',
    cssThumbnailConfig: {
      badge: '🔴 LIVE',
      bgImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'AI COHORT', style: { color: '#fbbf24', fontSize: 38, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'COURSE', style: { color: '#fbbf24', fontSize: 38, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'BATCH 01', style: { color: '#cbd5e1', fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginTop: 8, letterSpacing: 1 } },
        { text: '📅 05th May 2026', style: { color: '#94a3b8', fontSize: 14, fontWeight: 600, lineHeight: 1.2, marginTop: 4 } }
      ]
    }
  },
  'ai-for-everyone-complete-guide': {
    id: 'ai-for-everyone-complete-guide',
    title: 'AI For Everyone : Complete Guide',
    description: "Master the Complete AI Ecosystem. 15+ Modules | 50+ Tools | 75+ Hours | This hands-on course covers image, video, and website creation alongside no-code product development. Learn to build advanced workflow pipelines and end-to-end AI-powered systems using MCP and multi-modal agents.",
    views: 1278,
    lastUpdated: '21 May, 2026',
    language: 'Hinglish',
    category: 'Cohort Courses',
    videoUrl: 'https://www.youtube.com/embed/S2Y2IPwD77Q',
    cssThumbnailConfig: {
      bgImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'AI COHORT 1.0', style: { color: '#d8b4fe', fontSize: 44, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1, textShadow: '0 2px 10px rgba(168, 85, 247, 0.5)' } },
        { text: 'FOR EVERYONE: COMPLETE GUIDE', style: { color: '#cbd5e1', fontSize: 16, fontWeight: 700, lineHeight: 1.2, marginTop: 8, letterSpacing: 1 } },
        { text: 'WITH 🔴 LIVE', style: { color: '#fff', fontSize: 18, fontWeight: 800, lineHeight: 1.2, marginTop: 12 } },
        { text: 'MARATHON CLASS', style: { color: '#cbd5e1', fontSize: 18, fontWeight: 800, lineHeight: 1.2, marginTop: 2 } }
      ]
    }
  },
  'free-data-science-course': {
    id: 'free-data-science-course',
    title: 'Free Data Science Course',
    description: "Embark a data science journey by learning statistics, ML, & data analysis with hands-on Python, SQL, Power BI related Projects.",
    views: 45739,
    lastUpdated: '18 Apr, 2026',
    language: 'English',
    category: 'Free Category',
    videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30',
    cssThumbnailConfig: {
      badge: 'Free YouTube',
      bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'DATA', style: { color: '#fbbf24', fontSize: 48, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'SCIENCE', style: { color: '#fbbf24', fontSize: 48, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } }
      ]
    }
  },
  'free-data-analytics-course': {
    id: 'free-data-analytics-course',
    title: 'Free Data Analytics Course',
    description: "Join our Free Data Analytics Course! Gain Python skills, explore libraries, tackle industry projects, and prepare for interviews in 30 days",
    views: 337047,
    lastUpdated: '24 Dec, 2025',
    language: 'English',
    category: 'Free Category',
    videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw',
    cssThumbnailConfig: {
      badge: 'Free YouTube',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      lines: [
        { text: 'DATA', style: { color: '#fbbf24', fontSize: 48, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } },
        { text: 'ANALYTICS', style: { color: '#fbbf24', fontSize: 48, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)', letterSpacing: -1 } }
      ]
    }
  }
};

const courseLecturesDb = {
  'data-science-with-generative-ai-course': [
    { id: 'ds-1', title: 'Lecture 1: Introduction to Data Science & GenAI', duration: '15 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-2', title: 'Lecture 2: Python Foundations for Data Science', duration: '25 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-3', title: 'Lecture 3: Data Analysis with Pandas & NumPy', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-4', title: 'Lecture 4: Data Visualization with Matplotlib & Power BI', duration: '20 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-5', title: 'Lecture 5: Statistics & Machine Learning Basics', duration: '45 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-6', title: 'Lecture 6: Supervised vs Unsupervised Learning', duration: '35 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-7', title: 'Lecture 7: Deep Learning & Neural Networks', duration: '40 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-8', title: 'Lecture 8: Intro to Generative AI & LLMs', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-9', title: 'Lecture 9: Building AI Agents & Prompt Engineering', duration: '50 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'ds-10', title: 'Lecture 10: Capstone Project Showcase & Wrap-up', duration: '25 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' }
  ],
  'ai-cohort-course': [
    { id: 'ai-1', title: 'Lecture 1: Introduction to AI & Prompt Engineering', duration: '15 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4' },
    { id: 'ai-2', title: 'Lecture 2: Midjourney Mastery & Creative Prompts', duration: '20 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4' },
    { id: 'ai-3', title: 'Lecture 3: Large Language Models (LLMs) Overview', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4' },
    { id: 'ai-4', title: 'Lecture 4: Custom GPTs & No-Code AI tools', duration: '25 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4' },
    { id: 'ai-5', title: 'Lecture 5: AI-powered Workflows & Automation', duration: '35 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4' },
    { id: 'ai-6', title: 'Lecture 6: Fine-Tuning & Prompt Pipelines', duration: '40 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4' },
    { id: 'ai-7', title: 'Lecture 7: Agentic AI & Multi-Modal Frameworks', duration: '45 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4' },
    { id: 'ai-8', title: 'Lecture 8: Building AI Products & Final Launch', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/2eWuYf-aZE4' }
  ],
  'ai-engineer-advance-program': [
    { id: 'aie-1', title: 'Lecture 1: Introduction to Advanced AI Principles', duration: '15 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU' },
    { id: 'aie-2', title: 'Lecture 2: Neural Networks & Deep Learning Foundations', duration: '25 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU' },
    { id: 'aie-3', title: 'Lecture 3: Computer Vision & Object Detection', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU' },
    { id: 'aie-4', title: 'Lecture 4: Natural Language Processing (NLP) & Transformers', duration: '20 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU' },
    { id: 'aie-5', title: 'Lecture 5: Reinforcement Learning & Q-Learning', duration: '45 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU' },
    { id: 'aie-6', title: 'Lecture 6: Multi-Modal Agentic Workflows', duration: '35 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU' },
    { id: 'aie-7', title: 'Lecture 7: Fine-Tuning LLMs & Production Deployment', duration: '40 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU' },
    { id: 'aie-8', title: 'Lecture 8: Capstone AI Engineering Project', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/N7b7uMIeigU' }
  ],
  'advance-python-with-ai-tools': [
    { id: 'pyt-1', title: 'Lecture 1: Python Basics & Modern Setup', duration: '20 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/QXeEoD0pB3E' },
    { id: 'pyt-2', title: 'Lecture 2: Advanced Data Structures & Memory Mgmt', duration: '30 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/QXeEoD0pB3E' },
    { id: 'pyt-3', title: 'Lecture 3: OOP & Meta-Programming in Python', duration: '25 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/QXeEoD0pB3E' },
    { id: 'pyt-4', title: 'Lecture 4: Python Libraries for AI & Machine Learning', duration: '35 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/QXeEoD0pB3E' },
    { id: 'pyt-5', title: 'Lecture 5: Developing Custom AI APIs in Python', duration: '40 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/QXeEoD0pB3E' },
    { id: 'pyt-6', title: 'Lecture 6: Integrating Claude/OpenAI APIs & Multi-Agent SDKs', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/QXeEoD0pB3E' },
    { id: 'pyt-7', title: 'Lecture 7: Deploying Serverless Python AI Functions', duration: '45 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/QXeEoD0pB3E' }
  ],
  'power-bi-tableau-for-data-visualization': [
    { id: 'pbt-1', title: 'Lecture 1: Visualization Principles & Storytelling', duration: '20 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/TmhQCQr_DCA' },
    { id: 'pbt-2', title: 'Lecture 2: Power BI Desktop: Connectors & Modeling', duration: '30 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/TmhQCQr_DCA' },
    { id: 'pbt-3', title: 'Lecture 3: DAX Calculations & Advanced Logic', duration: '35 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/TmhQCQr_DCA' },
    { id: 'pbt-4', title: 'Lecture 4: Tableau Foundations & Desktop Interface', duration: '40 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/TmhQCQr_DCA' },
    { id: 'pbt-5', title: 'Lecture 5: Calculated Fields & Parameters in Tableau', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/TmhQCQr_DCA' },
    { id: 'pbt-6', title: 'Lecture 6: Designing Interactive Visual Dashboards', duration: '45 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/TmhQCQr_DCA' }
  ],
  'ai-powered-excel-full-course': [
    { id: 'exc-1', title: 'Lecture 1: Excel Essentials & Powerful Functions', duration: '20 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/Vl0H-qT87tE' },
    { id: 'exc-2', title: 'Lecture 2: Data Cleansing & Modeling with Power Query', duration: '30 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/Vl0H-qT87tE' },
    { id: 'exc-3', title: 'Lecture 3: Pivot Tables & Advanced Visual Reports', duration: '35 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/Vl0H-qT87tE' },
    { id: 'exc-4', title: 'Lecture 4: Copilot & AI Integration in Excel Worksheets', duration: '40 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/Vl0H-qT87tE' },
    { id: 'exc-5', title: 'Lecture 5: VBA Programming & Macro Automation', duration: '45 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/Vl0H-qT87tE' }
  ],
  'master-of-data-analytics-program': [
    { id: 'mda-1', title: 'Lecture 1: Data Analytics Foundations', duration: '20 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'mda-2', title: 'Lecture 2: Advanced SQL Queries & Data Modeling', duration: '30 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'mda-3', title: 'Lecture 3: Excel for Analysts & Pivot Tables', duration: '25 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'mda-4', title: 'Lecture 4: Power BI Dashboards & DAX Functions', duration: '35 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'mda-5', title: 'Lecture 5: Tableau Visualization Best Practices', duration: '40 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'mda-6', title: 'Lecture 6: Python for Data Analysis', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'mda-7', title: 'Lecture 7: Predictive Analytics & Forecasting', duration: '45 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'mda-8', title: 'Lecture 8: Capstone Analytics Project Delivery', duration: '50 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' }
  ],
  'ai-for-everyone-complete-guide': [
    { id: 'afe-1', title: 'Lecture 1: Introduction to the AI Ecosystem', duration: '15 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/S2Y2IPwD77Q' },
    { id: 'afe-2', title: 'Lecture 2: Using ChatGPT & Claude for Daily Productivity', duration: '20 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/S2Y2IPwD77Q' },
    { id: 'afe-3', title: 'Lecture 3: Image Generation with Midjourney & DALL-E', duration: '25 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/S2Y2IPwD77Q' },
    { id: 'afe-4', title: 'Lecture 4: Video Generation Tools (Runway, Sora, Pika)', duration: '30 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/S2Y2IPwD77Q' },
    { id: 'afe-5', title: 'Lecture 5: Building Websites using No-Code AI tools', duration: '35 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/S2Y2IPwD77Q' },
    { id: 'afe-6', title: 'Lecture 6: AI Agents, MCP and Automation Pipelines', duration: '45 mins', isFree: false, videoUrl: 'https://www.youtube.com/embed/S2Y2IPwD77Q' }
  ],
  'free-data-science-course': [
    { id: 'fds-1', title: 'Lecture 1: Introduction to Data Science', duration: '20 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'fds-2', title: 'Lecture 2: Python basics & programming constructs', duration: '30 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'fds-3', title: 'Lecture 3: Pandas and Numpy libraries', duration: '25 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'fds-4', title: 'Lecture 4: Statistics for Data Science', duration: '35 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
    { id: 'fds-5', title: 'Lecture 5: Machine learning overview', duration: '45 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' }
  ],
  'free-data-analytics-course': [
    { id: 'fda-1', title: 'Lecture 1: Python for Data Analysis', duration: '20 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'fda-2', title: 'Lecture 2: SQL and Relational Databases', duration: '30 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'fda-3', title: 'Lecture 3: Data Visualization using Power BI', duration: '35 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' },
    { id: 'fda-4', title: 'Lecture 4: Tableau Basics for Data Storytelling', duration: '40 mins', isFree: true, videoUrl: 'https://www.youtube.com/embed/vK1E-mG0lXw' }
  ]
};

const TabButton = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 24px',
      background: active ? 'var(--red)' : 'var(--bg-secondary)',
      color: active ? '#fff' : 'var(--text-secondary)',
      border: 'none',
      borderRadius: 100,
      fontWeight: 700,
      fontSize: 15,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
      boxShadow: active ? '0 4px 15px rgba(37, 99, 235, 0.3)' : 'none'
    }}
  >
    {label}
  </button>
);

const Accordion = ({ title, items, onPlay, completedLectures, isEnrolled, isCohort }) => {
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
        {isOpen ? <ChevronUp size={20} color="var(--red)" /> : <ChevronDown size={20} color="#64748b" />}
      </button>
      {isOpen && (
        <div style={{ paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {displayItems.map((item, idx) => {
            const isPlayable = isEnrolled || item.isFree || (isCohort && idx < items.length / 2);
            const isCompleted = item.isCompleted || (item.id && completedLectures?.includes(item.id));
            return (
              <div key={idx} style={{ padding: '16px 24px', background: 'var(--bg-secondary)', borderRadius: 8, color: 'var(--text-primary)', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FileText size={18} color="var(--red)" />
                  <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', opacity: isCompleted ? 0.6 : 1 }}>{item.title || item}</span>
                </div>
                {item.videoUrl && !item.isDummy ? (
                  isPlayable ? (
                    <button 
                      onClick={() => onPlay(item)}
                      style={{ background: 'var(--red)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <PlayCircle size={14} /> Play
                    </button>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13, fontWeight: 700 }}>
                      <Lock size={14} /> Locked
                    </span>
                  )
                ) : null}
              </div>
            );
          })}
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

const DualPaneCurriculum = ({ curriculumData, onPlay, completedLectures, isEnrolled, isCohort }) => {
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  useEffect(() => {
    setActiveSubjectIndex(0);
    setActiveTopicIndex(0);
  }, [curriculumData]);

  if (!curriculumData || curriculumData.length === 0) return null;

  const activeSubject = curriculumData[activeSubjectIndex];
  const activeTopic = activeSubject?.modules?.[activeTopicIndex];

  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden', background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)', marginTop: 24 }}>
      
      {/* Top Subjects Tabs */}
      {curriculumData.length > 1 && (
        <div className="custom-scrollbar" style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
          {curriculumData.map((subj, idx) => {
            const isActive = activeSubjectIndex === idx;
            return (
              <button 
                key={idx}
                onClick={() => { setActiveSubjectIndex(idx); setActiveTopicIndex(0); }}
                style={{ 
                  padding: '16px 24px', 
                  whiteSpace: 'nowrap', 
                  background: isActive ? 'var(--red)' : 'transparent', 
                  color: isActive ? '#fff' : 'var(--text-primary)', 
                  border: 'none', 
                  borderRight: '1px solid var(--border-color)',
                  fontWeight: isActive ? 800 : 600, 
                  cursor: 'pointer', 
                  transition: 'all 0.2s',
                  fontSize: 15
                }}
              >
                {subj.title}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ display: 'flex', minHeight: 450 }}>
        
        {/* Left Pane: Modules */}
        <div style={{ width: '35%', borderRight: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column' }}>
          <div className="custom-scrollbar" style={{ overflowY: 'auto', flex: 1, maxHeight: 600 }}>
            {activeSubject?.modules?.map((topic, idx) => {
              const isActive = activeTopicIndex === idx;
              return (
                <button 
                  key={idx}
                  onClick={() => setActiveTopicIndex(idx)}
                  style={{ 
                    width: '100%', 
                    textAlign: 'left', 
                    padding: '20px 24px', 
                    borderBottom: '1px solid var(--border-color)', 
                    background: isActive ? 'var(--card-bg)' : 'transparent', 
                    borderLeft: isActive ? '4px solid var(--red)' : '4px solid transparent', 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginRight: isActive ? '-1px' : 0, // Cover the right border
                    position: 'relative',
                    zIndex: isActive ? 2 : 1
                  }}
                >
                  <div>
                    <div style={{ color: isActive ? 'var(--red)' : 'var(--text-secondary)', fontSize: 13, marginBottom: 6, fontWeight: 700 }}>
                      Module {idx + 1}
                    </div>
                    <div style={{ fontWeight: 700, color: isActive ? 'var(--red)' : 'var(--text-primary)', fontSize: 16, lineHeight: 1.4 }}>
                      {topic.title}
                    </div>
                  </div>
                  <ChevronRight size={18} color={isActive ? "var(--red)" : "var(--text-muted)"} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Lectures */}
        <div className="custom-scrollbar" style={{ width: '65%', padding: '32px', background: 'var(--card-bg)', overflowY: 'auto', maxHeight: 600 }}>
          {activeTopic ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* If there are subtopics, map them as lectures */}
              {activeTopic.subtopics && activeTopic.subtopics.length > 0 ? (
                activeTopic.subtopics.map((st, idx) => {
                  return (
                    <div key={idx} style={{ padding: '20px 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 600 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Lecture {idx + 1} :</span> {st.title}
                      </div>
                      <Lock size={18} color="var(--text-muted)" style={{ opacity: 0.6 }} />
                    </div>
                  );
                })
              ) : (
                /* Fallback if no subtopics exist but the topic itself is playable */
                <div style={{ padding: '20px 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Lecture 1 :</span> {activeTopic.title}
                  </div>
                  {activeTopic.videoUrl && !activeTopic.isDummy ? (
                    (isEnrolled || activeTopic.isFree || isCohort) ? (
                      <button onClick={() => onPlay(activeTopic)} style={{ background: 'var(--red)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <PlayCircle size={14} /> Play
                      </button>
                    ) : (
                      <Lock size={18} color="var(--text-muted)" style={{ opacity: 0.6 }} />
                    )
                  ) : (
                    <Lock size={18} color="var(--text-muted)" style={{ opacity: 0.6 }} />
                  )}
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontWeight: 600 }}>
              No modules available for this subject.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const CourseDetailsPage = ({ courseId, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [overviewShowMore, setOverviewShowMore] = useState(false);
  const [faqShowMore, setFaqShowMore] = useState(false);
  const [curriculumShowMore, setCurriculumShowMore] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [curriculumData, setCurriculumData] = useState([]);

  const [features, setFeatures] = useState([]);
  const [featuresLoading, setFeaturesLoading] = useState(false);

  const [trainingHighlights, setTrainingHighlights] = useState([]);
  const [toolsList, setToolsList] = useState([]);
  const [instructorsList, setInstructorsList] = useState([]);
  const [faqsList, setFaqsList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    const resolveSlugAndFetch = async () => {
      setLoading(true);
      let realCourseId = courseId;
      let matchedCourse = null;

      try {
        const allRes = await fetch('https://iscale-backend.onrender.com/api/course/public-all-courses?page=1&limit=1000');
        const allData = await allRes.json();
        if (allData.status && Array.isArray(allData.data)) {
          matchedCourse = allData.data.find(c => c.slug === courseId || c._id === courseId);
          if (matchedCourse) {
            realCourseId = matchedCourse._id;
            setApiData(matchedCourse);
          }
        }
      } catch (err) {
        console.error("Resolve slug error:", err);
      }

      if (!matchedCourse && !/^[0-9a-fA-F]{24}$/.test(realCourseId)) {
        if (coursesDatabase[realCourseId]) {
          matchedCourse = coursesDatabase[realCourseId];
          setApiData(matchedCourse);
          setCurriculumData((matchedCourse.curriculum || []).map((subj, i) => ({
            id: `subj-${i}`,
            title: subj.title,
            modules: (subj.modules || []).map((m, j) => ({
              id: `mod-${i}-${j}`,
              title: typeof m === 'string' ? m : m.title,
              isDummy: false,
              videoUrl: null
            }))
          })));
          setFeatures(matchedCourse.details || []);
          setTrainingHighlights(matchedCourse.highlights || []);
          setLoading(false);
          setSubjectsLoading(false);
          setFeaturesLoading(false);
          return;
        } else {
          setFetchError("Course not found");
          setLoading(false);
          return;
        }
      }

      if (!matchedCourse) {
        try {
          const res = await fetch(`https://iscale-backend.onrender.com/api/course/public-course/${realCourseId}`);
          if (res.ok) {
            const result = await res.json();
            if (result.status && result.data) {
              setApiData(result.data);
            }
          }
        } catch (err) {
          console.error("Fetch course details error:", err);
        }
      }
      setLoading(false);

      setSubjectsLoading(true);
      try {
        const res = await fetch(`https://iscale-backend.onrender.com/api/subject/public-get-subjects/${realCourseId}`);
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          setSubjects(result.data);
          
          const subjectsWithTopics = await Promise.all(result.data.map(async (subj) => {
            const subjectId = subj._id || subj.id;
            let modules = [];
            
            if (subj.lectures && Array.isArray(subj.lectures) && subj.lectures.length > 0) {
              modules = subj.lectures.map(l => ({
                id: l._id || l.id,
                title: l.title || l.m_topic_title || 'Topic',
                videoUrl: l.video || l.video_link || l.ml_video_id || l.url || l.link || null,
                isDummy: false,
                isFree: l.isFree || l.is_free || false
              }));
            } else if (subjectId && /^[0-9a-fA-F]{24}$/.test(subjectId)) {
              try {
                const token = localStorage.getItem('token');
                const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
                const currentlyEnrolled = enrolled.some(c => c.id === realCourseId);
                
                let topicRes;
                let fetchSuccess = false;
                
                if (token) {
                  try {
                    topicRes = await fetch(`https://iscale-backend.onrender.com/api/lecture-progress/lectures/${subjectId}`, {
                      headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (topicRes.ok) {
                      fetchSuccess = true;
                    }
                  } catch (e) {
                    // Ignore and let it fall back
                  }
                }
                
                if (!fetchSuccess) {
                  topicRes = await fetch(`https://iscale-backend.onrender.com/api/topics/public/${subjectId}?page=1&limit=1000`);
                }

                if (topicRes.ok) {
                  const topicData = await topicRes.json();
                  const topicsArr = topicData.data?.docs || topicData.data || [];
                  if (Array.isArray(topicsArr) && topicsArr.length > 0) {
                    modules = topicsArr.map(t => {
                      const mappedSubtopics = (t.subtopics || t.sub_topics || t.subTopics || []).map(st => ({
                        id: st._id || st.id,
                        title: st.title || st.name || 'Subtopic',
                        units: (st.units || []).map(u => ({
                          id: u._id || u.id,
                          title: u.title || u.name || 'Unit',
                          videoUrl: u.video || u.videoUrl || u.video_link || null
                        }))
                      }));
                      return {
                        id: t._id,
                        title: t.title || t.ml_title || t.m_topic_title || t.name || 'Topic',
                        videoUrl: t.video || t.video_link || t.ml_video_id || t.url || t.link || null,
                        isDummy: false,
                        isFree: t.is_free || t.isFree || false,
                        isCompleted: t.is_completed || t.isCompleted || false,
                        subtopics: mappedSubtopics
                      };
                    });
                  }
                }
              } catch (e) {
                console.error("Topics fetch error:", e);
              }
            }
            
            return {
              title: subj.m_subject_title || subj.title || 'Untitled Subject',
              modules: modules
            };
          }));
          setCurriculumData(subjectsWithTopics);
        } else {
          setSubjects([]);
          setCurriculumData([]);
        }
      } catch (err) {
        console.error("Subjects fetch error:", err);
        setSubjects([]);
        setCurriculumData([]);
      } finally {
        setSubjectsLoading(false);
      }

      setFeaturesLoading(true);
      try {
        const res = await fetch(`https://iscale-backend.onrender.com/api/features/public-get-all-features/${realCourseId}`);
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          setFeatures(result.data);
        } else {
          setFeatures([]);
        }
      } catch (err) {
        setFeatures([]);
      } finally {
        setFeaturesLoading(false);
      }

      try {
        const res = await fetch(`https://iscale-backend.onrender.com/api/training/public-get-th/${realCourseId}`);
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          setTrainingHighlights(result.data);
        } else {
          setTrainingHighlights([]);
        }
      } catch (err) {
        setTrainingHighlights([]);
      }

      try {
        const res = await fetch(`https://iscale-backend.onrender.com/api/tools/public-get-tools/${realCourseId}`);
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          setToolsList(result.data);
        } else {
          setToolsList([]);
        }
      } catch (err) {
        setToolsList([]);
      }

      try {
        const res = await fetch(`https://iscale-backend.onrender.com/api/instructors/public-get-all-instructors`);
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          setInstructorsList(result.data);
        } else {
          setInstructorsList([]);
        }
      } catch (err) {
        setInstructorsList([]);
      }

      try {
        const res = await fetch(`https://iscale-backend.onrender.com/api/faq/public-get-faqs/${realCourseId}`);
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          setFaqsList(result.data);
        } else {
          setFaqsList([]);
        }
      } catch (err) {
        setFaqsList([]);
      }

      setReviewsLoading(true);
      try {
        const res = await fetch(`https://iscale-backend.onrender.com/api/user-reviews/all-reviews?page=1&limit=1000`);
        const result = await res.json();
        if (result.status && Array.isArray(result.data)) {
          setReviewsList(result.data);
        } else {
          setReviewsList([]);
        }
      } catch (err) {
        setReviewsList([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    resolveSlugAndFetch();
  }, [courseId]);



const getImageUrl = (url) => {
  if (!url || url === 'N/A') return '';
  const cleaned = url.replace(/\\/g, '/');
  return cleaned.startsWith('http') ? cleaned : `https://iscale-backend.onrender.com/${cleaned.replace(/^src\//, '')}`;
};

const data = {
  id: apiData?._id || apiData?.id || courseId,
  title: apiData?.title || '',
  description: apiData?.description || '',
  category: apiData?.category || '',
  thumbnail: apiData?.thumbnail || getImageUrl(apiData?.banner) || `https://ui-avatars.com/api/?name=${encodeURIComponent(apiData?.title || 'Course')}&background=random&size=800`,
  videoUrl: apiData?.video || apiData?.video_link || apiData?.videoUrl,
  views: apiData?.views || 0,
  lastUpdated: apiData?.lastUpdated || (apiData?.updated_at ? new Date(apiData.updated_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : ''),
  language: apiData?.language || 'Hinglish',
};

const allLecturesList = curriculumData.flatMap(subj => subj.modules).filter(m => !m.isDummy);
// Only use real API-fetched lectures — no dummy/static fallback
const currentLectures = allLecturesList;

const [activeCohortLecture, setActiveCohortLecture] = useState(null);
const [isPlayingLecture, setIsPlayingLecture] = useState(false);

const [playlistSearch, setPlaylistSearch] = useState('');
const [isBwTheme, setIsBwTheme] = useState(false);
const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

// Enrollment state
const [isEnrolled, setIsEnrolled] = useState(false);

// Track completed lectures list
const [completedLectures, setCompletedLectures] = useState([]);

const [studentName, setStudentName] = useState(() => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const u = JSON.parse(userStr);
      if (u && u.name) return u.name;
    }
  } catch(e) {}
return 'Ridhi Mishra';
});

  // Check if this course is enrolled — reads from simple persistent ID list
  const checkEnrolledLocally = (id) => {
    try {
      const ids = JSON.parse(localStorage.getItem('enrolled_course_ids') || '[]');
      return ids.includes(id);
    } catch (e) { return false; }
  };

  // Save enrollment permanently to localStorage
  const saveEnrolledLocally = (id) => {
    try {
      const ids = JSON.parse(localStorage.getItem('enrolled_course_ids') || '[]');
      if (!ids.includes(id)) {
        ids.push(id);
        localStorage.setItem('enrolled_course_ids', JSON.stringify(ids));
      }
    } catch (e) {}
  };

  useEffect(() => {
    const id = apiData?._id || courseId;
    if (id && checkEnrolledLocally(id)) {
      setIsEnrolled(true);
    }

    const checkDbEnrollment = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const [premiumRes, freeRes] = await Promise.all([
          fetch('https://iscale-backend.onrender.com/api/enrolled-courses/premium-courses', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('https://iscale-backend.onrender.com/api/enrolled-courses/free-courses', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        let combined = [];
        if (premiumRes.ok) {
          const resData = await premiumRes.json();
          if (resData.status && Array.isArray(resData.data)) {
            combined = [...combined, ...resData.data];
          }
        }
        if (freeRes.ok) {
          const resData = await freeRes.json();
          if (resData.status && Array.isArray(resData.data)) {
            combined = [...combined, ...resData.data];
          }
        }
        
        const normalizeCourse = (apiCourse) => {
          const cObj = apiCourse.course_id || apiCourse;
          return {
            id: cObj._id || cObj.id || apiCourse._id,
            title: cObj.title || apiCourse.title || 'Enrolled Course',
            category: cObj.category || apiCourse.category || 'Course',
            img: cObj.thumbnail || cObj.banner || apiCourse.thumbnail || apiCourse.img || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
            progress: apiCourse.progress || cObj.progress || 0,
            date: apiCourse.createdAt || new Date().toISOString()
          };
        };
        
        const normalized = combined.map(normalizeCourse);
        
        localStorage.setItem('enrolled_courses', JSON.stringify(normalized));
        const ids = normalized.map(c => c.id).filter(Boolean);
        localStorage.setItem('enrolled_course_ids', JSON.stringify(ids));
        
        if (id && ids.includes(id)) {
          setIsEnrolled(true);
        }
      } catch (e) {
        console.error("Failed to fetch enrolled courses", e);
      }
    };
    
    checkDbEnrollment();
  }, [apiData?._id, courseId]);

useEffect(() => {
  if (curriculumData && curriculumData.length > 0) {
    try {
      const allLecturesList = curriculumData.flatMap(subj => subj.modules).filter(m => !m.isDummy);
      const apiCompleted = allLecturesList.filter(l => l.isCompleted).map(l => l.id);
      setCompletedLectures([...new Set(apiCompleted)]);
    } catch (e) {
      setCompletedLectures([]);
    }
  } else {
    setCompletedLectures([]);
  }
  setPlaylistSearch('');
}, [data.id, curriculumData]);

useEffect(() => {
  if (currentLectures && currentLectures.length > 0) {
    setActiveCohortLecture(currentLectures[0]);
  } else {
    setActiveCohortLecture(null);
  }
}, [curriculumData, data.id]);

if (loading) {
  return <div>Loading Course...</div>;
}

if (fetchError) {
  return <div>{fetchError}</div>;
}

const isCertUnlocked = isEnrolled && currentLectures.length > 0 && currentLectures.every(l => completedLectures.includes(l.id));

  const getVerificationId = () => {
    let code = 'UPS';
    if (data.id === 'data-science-with-generative-ai-course') code = 'DAT';
    else if (data.id === 'master-of-data-analytics-program') code = 'MAS';
    else if (data.id === 'ai-engineer-advance-program') code = 'AIE';
    else if (data.id === 'advance-python-with-ai-tools') code = 'PYT';
    else if (data.id === 'power-bi-tableau-for-data-visualization') code = 'PBT';
    else if (data.id === 'ai-powered-excel-full-course') code = 'EXC';
    else if (data.id === 'ai-cohort-course') code = 'AIC';
    else if (data.id === 'ai-for-everyone-complete-guide') code = 'AFE';
    else if (data.id === 'free-data-science-course') code = 'FDS';
    else if (data.id === 'free-data-analytics-course') code = 'FDA';
    
    // stable 4-digit code based on the course ID length
    const hash = ((data.id.length * 7) + 123) % 9000 + 1000;
    return `ISC-${code}-${hash}`;
  };

  const handleToggleComplete = (lectureId) => {
    setCompletedLectures(prev => {
      const next = prev.includes(lectureId) 
        ? prev.filter(id => id !== lectureId) 
        : [...prev, lectureId];
      
      localStorage.setItem(`completed_lectures_${data.id}`, JSON.stringify(next));

      // Calculate new progress percentage
      const percent = currentLectures.length > 0 
        ? Math.round((next.length / currentLectures.length) * 100) 
        : 0;

      // Update enrollment progress in enrolled_courses localStorage
      try {
        const enrolled = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
        const updated = enrolled.map(c => {
          if (c.id === data.id) {
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

  const handleEnrollClick = async () => {
    if (isEnrolled) {
      // Already enrolled — scroll to curriculum
      const element = document.getElementById('coursecontent');
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('redirectAfterLogin', `course-details/${courseId}`);
      if (setCurrentPage) setCurrentPage('login');
      else window.location.href = '/login';
      return;
    }

    // ── FREE COURSE: enroll directly, no Razorpay ──
    const isFree = apiData?.course_type === 1 || apiData?.price === 0 || apiData?.price === 'N/A' || !apiData?.price;
    const realCourseId = apiData?._id || courseId;

    if (isFree) {
      try {
        const res = await fetch('https://iscale-backend.onrender.com/api/enroll-course/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ course_id: realCourseId })
        });
        const json = await res.json();
        // Accept any 2xx response or status:true or any message containing 'enroll'
        const ok = res.ok || json?.status === true ||
          (typeof json?.message === 'string' && json.message.toLowerCase().includes('enroll'));
        if (ok) {
          saveEnrolledLocally(realCourseId);
          setIsEnrolled(true);
          const enrolledList = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
          if (!enrolledList.some(c => c.id === data.id || c._id === data.id)) {
            enrolledList.push({ id: data.id, title: data.title, date: new Date().toISOString() });
            localStorage.setItem('enrolled_courses', JSON.stringify(enrolledList));
          }
        } else {
          alert('Could not enroll: ' + (json?.message || 'Please try again'));
        }
      } catch (err) {
        alert('Network error, please try again.');
      }
      return;
    }

    // ── PAID COURSE: open Razorpay ──
    try {

      // Extract real course price from DB (apiData)
      let actualPriceInINR = 0;
      if (apiData?.offer_price && apiData.offer_price !== 'N/A' && apiData.offer_price != 0) {
        actualPriceInINR = parseInt(String(apiData.offer_price).replace(/,/g, ''));
      } else if (apiData?.price && apiData.price !== 'N/A' && apiData.price != 0) {
        actualPriceInINR = parseInt(String(apiData.price).replace(/,/g, ''));
      }
      if (!actualPriceInINR || isNaN(actualPriceInINR) || actualPriceInINR <= 0) {
        actualPriceInINR = 500; // Absolute fallback just in case DB price is missing
      }
      // Razorpay expects the amount in PAISE (multiply INR by 100)
      const computedAmountInPaise = actualPriceInINR * 100;

      const userStr = localStorage.getItem('user');
      const userObj = userStr ? JSON.parse(userStr) : {};
      
      const options = {
        key: "rzp_live_2NpvqTEtpK89Xv", // Restored your Live Key!
        amount: computedAmountInPaise, 
        currency: "INR",
        name: "iSCALE",
        description: "Course Enrollment",
        handler: async function (response) {
            try {
              // 1. PAYMENT SUCCESSFUL! Now officially save it to the Backend Database!
              const enrollRes = await fetch('https://iscale-backend.onrender.com/api/enroll-course/enroll', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ course_id: apiData?._id || courseId })
              });
              
              const enrollData = await enrollRes.json();
              
              if (enrollRes.ok || enrollData.status) {
                // 2. Backend successfully registered the purchase!
                setIsEnrolled(true);
                
                // 3. Save locally to reflect immediately before they visit Home
                const enrolledList = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
                if (!enrolledList.some(c => c.id === data.id || c._id === data.id)) {
                  enrolledList.push({ id: data.id, title: data.title, date: new Date().toISOString() });
                  localStorage.setItem('enrolled_courses', JSON.stringify(enrolledList));
                }
                saveEnrolledLocally(apiData?._id || courseId);
                
                alert(`Successfully enrolled and saved to database! All lectures are now unlocked.`);
              } else {
                alert("Payment succeeded, but backend failed to save enrollment: " + (enrollData.message || "Error"));
              }
              
            } catch (err) {
              console.error(err);
              alert('Error connecting to backend database after payment.');
            }
        },
        prefill: {
          name: userObj.name || userObj.m_name || "Student",
          email: userObj.email || userObj.m_email || "test@iscale.com",
          contact: userObj.phone || userObj.m_phone || "9999999999"
        },
        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert(response.error.description || 'Payment Failed');
      });
      rzp.open();

    } catch (e) {
      console.error(e);
      alert('Error enrolling. Please try again later.');
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add to wishlist.');
        return;
      }
      
      const res = await fetch('https://iscale-backend.onrender.com/api/user-wishlist/course/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ course_id: apiData?._id || courseId })
      });
      const data = await res.json();
      if (data.status) {
        alert('Added to Wishlist!');
      } else {
        alert(data.message || 'Failed to add to wishlist.');
      }
    } catch (e) {
      alert('Error connecting to server.');
    }
  };

  // Optional: fallback arrays if data doesn't exist for the other courses yet
  // (Curriculum is now fetched dynamically with topics)
  const faqs = faqsList && faqsList.length > 0
    ? faqsList.map(f => ({ q: f.title, a: f.description }))
    : [];
  const certText = data.certificateText || 'Complete all lectures and projects to unlock your official verified certificate.';
  const certImg = data.certificateImg || '';
  const videoUrl = data.videoUrl || '';
  // Normalize common video URLs to embeddable player URLs (YouTube / Vimeo / MP4 uploads)
  const getEmbedUrl = (url) => {
    if (!url) return '';
    const trimmed = String(url).trim();
    // If it is a YouTube video ID (no spaces, length 11)
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return `https://www.youtube.com/embed/${trimmed}`;
    }
    // If it is a relative path (e.g. src/uploads/video/...) or direct backend url, resolve it via getImageUrl
    if (trimmed.startsWith('src/') || trimmed.startsWith('uploads/')) {
      return getImageUrl(trimmed);
    }
    try {
      const u = new URL(trimmed);
      const host = u.hostname.replace('www.', '').toLowerCase();

      if (host.includes('youtube.com')) {
        const v = u.searchParams.get('v');
        if (v) return `https://www.youtube.com/embed/${v}`;
        // fallback: convert /watch to /embed
        return trimmed.replace('/watch', '/embed');
      }

      if (host === 'youtu.be') {
        const id = u.pathname.replace('/', '');
        return `https://www.youtube.com/embed/${id}`;
      }

      if (host.includes('vimeo.com')) {
        const parts = u.pathname.split('/');
        const id = parts.pop() || parts.pop();
        return `https://player.vimeo.com/video/${id}`;
      }

      return trimmed;
    } catch (e) {
      return trimmed;
    }
  };

  // In case activeCohortLecture is set, we use its videoUrl, else default preview
  const embedUrl = getEmbedUrl((activeCohortLecture && activeCohortLecture.videoUrl) ? activeCohortLecture.videoUrl : videoUrl);
  const dummyFeesData = {
    basic: { price: "6999" },
    premium: { price: "34999" },
    pro: { price: "39999" },
    features: [
      { name: "Extended Access - Access to recorded content for 24 months", basic: true, premium: true, pro: true },
      { name: "Delivery Mode - Recorded Lectures – Learn at your own pace with full access to pre-recorded modules.", basic: true, premium: false, pro: false },
      { name: "Delivery mode - Virtual Live", basic: false, premium: true, pro: false },
      { name: "Live Lectures - Weekend Live Sessions | Sat & Sun", basic: false, premium: false, pro: true },
      { name: "Certification - PW Skills Certificate.", basic: true, premium: false, pro: false },
      { name: "Certification - PW Skills and NSDC", basic: false, premium: true, pro: true },
      { name: "Doubt Session", basic: false, premium: true, pro: true }
    ]
  };

  const feesData = (apiData?.fees && apiData.fees.features && apiData.fees.basic) 
    ? JSON.parse(JSON.stringify(apiData.fees)) 
    : dummyFeesData;
  const dynamicOfferPrice = (apiData?.offer_price && apiData.offer_price !== 'N/A' && apiData.offer_price !== 0) 
    ? `₹${parseInt(apiData.offer_price).toLocaleString()}` 
    : (apiData?.price && apiData.price !== 'N/A' && apiData.price !== 0 ? `₹${parseInt(apiData.price).toLocaleString()}` : null);
  if (dynamicOfferPrice && feesData && feesData.premium) {
    feesData.premium.price = dynamicOfferPrice;
  }
  const toolsData = toolsList && toolsList.length > 0
    ? toolsList.map(t => ({ name: t.c_tool_title || t.title || t.m_tool_title || t.name || 'Tool', img: getImageUrl(t.c_tool_img || t.image || t.m_tool_image || t.icon) }))
    : [];
  const defaultProjects = [
    {
      title: 'Enterprise Capstone Project',
      desc: 'Develop a highly scalable, industry-standard solution from scratch. Build, test, and deploy a complete ecosystem that solves real business challenges.',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'End-to-End Architecture',
      desc: 'Gain hands-on expertise by structuring robust architectures. Transition seamlessly from development to live production environments like a pro.',
      img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Live Industry Case Studies',
      desc: 'Analyze actual production datasets. Implement strategic problem-solving techniques identical to those used by top tech companies globally.',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const details = features && features.length > 0
    ? features.map(f => ({
        title: f.m_feature_title || f.title || 'Feature',
        desc: f.m_feature_desc || f.desc || '',
        img: getImageUrl(f.m_feature_image || f.img)
      }))
    : defaultProjects;
  const highlights = trainingHighlights && trainingHighlights.length > 0 
    ? trainingHighlights.map(th => ({ title: th.title || th.m_feature_title || 'Highlight', img: getImageUrl(th.icon || th.m_feature_image) }))
    : [];
  // Exact ObjectIDs from the user's screenshot
  const screenshotFallbackIds = [
    '6a0c08970db957f72cd43582',
    '6a0c31e30db957f72cd43584',
    '6a0c3a3d0db957f72cd43586',
    '6a0c3af10db957f72cd43588'
  ];

  const assignedInstructorsRaw = apiData?.m_course_trainee || apiData?.m_course_trainer || apiData?.instructors;
  const assignedInstructors = assignedInstructorsRaw || [];

  const instructorsData = instructorsList && instructorsList.length > 0
    ? instructorsList.map(i => ({
          name: i.m_instructor_name || i.name || 'Instructor',
          bio: i.m_instructor_bio || i.bio || i.role || '',
          experience: i.m_instructor_experience || i.experience || '',
          skills: Array.isArray(i.m_instructor_skills) ? i.m_instructor_skills : (Array.isArray(i.skills) ? i.skills : []),
          rating: i.m_instructor_rating || i.rating || 0,
          reviews: i.m_instructor_reviews || i.reviews || 0,
          totalCourses: i.m_instructor_total_courses || i.totalCourses || 0,
          linkedin: i.m_linkedin_profile || i.linkedin || '',
          img: i.m_instructor_profile || i.img
                 ? getImageUrl(i.m_instructor_profile || i.img)
                 : `https://ui-avatars.com/api/?name=${encodeURIComponent(i.m_instructor_name || i.name || 'I')}&background=2563eb&color=fff&bold=true&size=200`
        }))
    : [];
  const reviewsData = reviewsList && reviewsList.length > 0
    ? reviewsList.map(r => ({
        name: r.m_review_name || r.name || r.user_name || 'Student',
        role: r.m_review_designation || r.designation || r.role || r.user_designation || 'Student',
        text: r.m_review_description || r.description || r.review || r.text || r.user_review || '',
        rating: r.m_review_rating || r.rating || 5,
        img: r.m_review_image || r.image || r.avatar || r.user_image || null,
        companyImg: r.m_company_image || r.company_logo || null,
        company: r.m_company_name || r.company || ''
      }))
    : [];

  const tabsConfig = [
    { label: 'Curriculum', id: 'coursecontent' },
    { label: 'Highlights', id: 'highlights' },
    { label: 'Projects', id: 'details' },
    { label: 'Tools', id: 'tools' },
    { label: 'Certificate', id: 'certificate' },
    { label: 'Fees Structure', id: 'fees' },
    { label: 'Instructor', id: 'instructor' },
    { label: 'Testimonials', id: 'review' },
    { label: 'FAQ', id: 'faq' }
  ];


  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', fontFamily: 'var(--font-body)', paddingBottom: 100 }}>
      {videoOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '80%', maxWidth: 1000, position: 'relative' }}>
            <button onClick={() => setVideoOpen(false)} style={{ position: 'absolute', top: -40, right: -40, background: 'none', border: 'none', color: '#fff', fontSize: 40, cursor: 'pointer' }}>&times;</button>
            <div style={{ paddingBottom: '56.25%', position: 'relative', height: 0, overflow: 'hidden' }}>
              {embedUrl ? (
                (embedUrl.endsWith('.mp4') || embedUrl.endsWith('.webm') || embedUrl.includes('/uploads/')) ? (
                  <video
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#000' }}
                    src={embedUrl}
                    controls
                    autoPlay
                  />
                ) : embedUrl.includes('http') || embedUrl.includes('youtube.com') || embedUrl.includes('vimeo.com') ? (
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={embedUrl + (embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1')}
                    title="Course Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <VideoPlayer videoId={embedUrl} />
                  </div>
                )
              ) : (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Video unavailable</div>
              )}
            </div>
            {/* Mark Complete functionality inside the modal if it's a real lecture */}
            {activeCohortLecture && activeCohortLecture.id && (
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem('token');
                      const res = await fetch('https://iscale-backend.onrender.com/api/lecture-progress/mark-complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify({ lecture_id: activeCohortLecture.id })
                      });
                      const rData = await res.json();
                      if (rData.status) {
                        const newCompleted = [...completedLectures, activeCohortLecture.id];
                        setCompletedLectures(newCompleted);
                        localStorage.setItem(`completed_lectures_${data.id}`, JSON.stringify(newCompleted));
                        alert('Lecture marked as completed!');
                        // Also automatically update enrolled course progress if possible
                        try {
                          const token = localStorage.getItem('token');
                          if (token) {
                            // Hit the debug or progress endpoint quietly to sync if needed,
                            // though just modifying state is fine since backend is marked.
                          }
                        } catch(e){}
                      } else {
                        alert(rData.message || 'Error marking lecture complete');
                      }
                    } catch(err) {
                      alert('Failed to connect to server');
                    }
                  }}
                  style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <Check size={18} /> Mark as Complete
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section style={{ 
        background: 'var(--gradient-hero)', 
        padding: '20px 0 40px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container mobile-col" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          
          {/* Left Content */}
          <div style={{ flex: 1 }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
              <span style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>Home</span> 
              <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span className="animated-text-gradient">{data.category || 'Data Science Courses'}</span>
            </div>
            
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
              <span className="animated-text-gradient">{data.title}</span>
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.6, marginBottom: 20, maxWidth: 600 }}>
              {data.description}
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 16px', borderRadius: 100, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  Popular <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>({data.views} No Of Views)</span>
                </div>
              </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 24, color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Calendar size={16} /> Last updated {data.lastUpdated}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Globe size={16} /> {data.language}</div>
            </div>

            {/* Course Highlight Chips to fill space */}
            <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {[
                { icon: <ShieldCheck size={18} />, text: "100% Job Assistance" },
                { icon: <Award size={18} />, text: "Verified Certificate" },
                { icon: <CheckCircle size={18} />, text: "Real-world Projects" },
                { icon: <User size={18} />, text: "1-on-1 Mentorship" },
                { icon: <Video size={18} />, text: "Lifetime Access" }
              ].map((f, i) => (
                <div key={i} style={{ 
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', 
                  borderRadius: 100, fontSize: 13, fontWeight: 700, 
                  background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  animation: `fadeUp 0.6s ${0.2 + (i*0.05)}s ease both`
                }}>
                  <div style={{ color: 'var(--red)', display: 'flex' }}>{f.icon}</div>
                  <span style={{ color: 'var(--text-primary)' }}>{f.text}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Content - Video Thumbnail */}
          <div style={{ width: '100%', maxWidth: 500 }}>
            <div 
              onClick={() => setVideoOpen(true)}
              style={{ 
                position: 'relative', borderRadius: 16, overflow: 'hidden', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: 20,
                cursor: 'pointer', background: '#000'
              }}
            >
              {data.cssThumbnailConfig ? (
                <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(to right, #1a0b16, #000)', position: 'relative', display: 'flex' }}>
                  {data.cssThumbnailConfig.badge && (
                    <div style={{ position: 'absolute', top: 12, left: 16, background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 4, zIndex: 10 }}>
                      {data.cssThumbnailConfig.badge}
                    </div>
                  )}
                  <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1, marginTop: data.cssThumbnailConfig.badge ? 20 : 0 }}>
                    {data.cssThumbnailConfig.lines.map((line, idx) => (
                      <div key={idx} style={{...line.style, fontSize: `clamp(20px, 6vw, ${line.style.fontSize || 32}px)`}}>{line.text}</div>
                    ))}
                  </div>
                  <div style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '100%', background: `url(${data.cssThumbnailConfig.bgImage}) center/cover`, opacity: 0.6, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
                </div>
              ) : data.id === 'master-of-data-analytics-program' ? (
                <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(to right, #450a0a, #000)', position: 'relative', display: 'flex' }}>
                  <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
                    <div style={{ color: '#fff', fontSize: 26, fontWeight: 900, lineHeight: 1.1, fontFamily: 'var(--font-display)' }}>MASTER OF</div>
                    <div style={{ color: '#fbbf24', fontSize: 44, fontWeight: 900, lineHeight: 1.1, marginTop: 4, fontFamily: 'var(--font-display)', letterSpacing: -1 }}>DATA<br/>ANALYTICS</div>
                    <div style={{ color: '#cbd5e1', fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginTop: 8, letterSpacing: 2 }}>PROGRAM</div>
                  </div>
                  <div style={{ position: 'absolute', right: 0, top: 0, width: '60%', height: '100%', background: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80) center/cover', opacity: 0.6, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
                </div>
              ) : (
                <img src={data.thumbnail} alt={data.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
              )}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -20 }}>
                  <div style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)' }} />
                  <div style={{ position: 'absolute', width: 110, height: 110, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.6)' }} />
                  <div style={{ position: 'relative', width: 80, height: 80, background: 'var(--card-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                    <Play size={32} color="var(--red)" fill="var(--red)" style={{ marginLeft: 4 }} />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 70, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 20 }}>
                <div style={{ color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                  <Eye size={18} /> Preview this course
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                const el = document.getElementById('coursecontent');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              style={{ width: '100%', padding: '16px', background: '#0f172a', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}
            >
              <BookOpen size={20} /> View Course Curriculum
            </button>
            {isEnrolled ? (
              <button 
                onClick={() => {
                  const el = document.getElementById('coursecontent');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                style={{ width: '100%', padding: '16px', background: '#22c55e', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)' }}
              >
                Already Enrolled - Resume <Check size={18} />
              </button>
            ) : (
              <button 
                onClick={handleEnrollClick}
                className="btn-shine"
                style={{ width: '100%', padding: '16px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)' }}
              >
                Enroll Now <ArrowRight size={20} />
              </button>
            )}
            <button 
              onClick={handleAddToWishlist}
              style={{ width: '100%', padding: '16px', marginTop: '12px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}
            >
              <Heart size={20} color="#ec4899" /> Add to Wishlist
            </button>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <div style={{ position: 'sticky', top: 70, background: 'var(--nav-bg)', backdropFilter: 'blur(10px)', zIndex: 50, borderBottom: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '20px 0', scrollbarWidth: 'none' }}>
            {tabsConfig.map(tab => (
              <TabButton 
                key={tab.id} 
                active={activeTab === tab.id} 
                label={tab.label} 
                onClick={() => {
                  setActiveTab(tab.id);
                  const element = document.getElementById(tab.id);
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 150;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }} 
              />
            ))}
            
            <div style={{ marginLeft: 'auto', paddingLeft: 20 }}>
              <button 
                onClick={handleEnrollClick}
                className="btn-shine"
                style={{ padding: '10px 24px', background: isEnrolled ? '#22c55e' : 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', boxShadow: isEnrolled ? '0 4px 15px rgba(34, 197, 94, 0.3)' : '0 4px 15px rgba(37, 99, 235, 0.3)' }}
              >
                {isEnrolled ? (
                  <>Resume Course <Check size={16} /></>
                ) : (
                  <>Enroll Now <ArrowRight size={16} /></>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Content Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
          
          {/* Overview Removed */}

          {/* Course Content - Curriculum — all data from API backend, no dummy/static fallback */}
          <div id="coursecontent" style={{ background: 'var(--card-bg)', padding: 48, borderRadius: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', borderTop: '6px solid var(--red)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>What You Will Learn</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', marginTop: 6, marginBottom: 0 }}>Course <span className="animated-text-gradient">Curriculum</span></h2>
              </div>
              {curriculumData.length > 0 && (
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, background: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: 20, border: '1px solid var(--border-color)' }}>
                  {curriculumData.length} {curriculumData.length === 1 ? 'Module' : 'Modules'} &nbsp;&bull;&nbsp; {allLecturesList.length} {allLecturesList.length === 1 ? 'Lecture' : 'Lectures'}
                </div>
              )}
            </div>
            <div>
              {/* Loading state */}
              {subjectsLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 140, gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid var(--border-color)', borderTopColor: 'var(--red)', animation: 'spin 0.8s linear infinite' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: 15, fontWeight: 600 }}>Loading curriculum...</span>
                </div>
              )}

              {/* Curriculum from API */}
              {!subjectsLoading && curriculumData.length > 0 && (
                <>
                  <DualPaneCurriculum
                    curriculumData={curriculumData}
                    completedLectures={completedLectures}
                    isEnrolled={isEnrolled}
                    isCohort={apiData?.category?.toLowerCase().includes('cohort') || apiData?.title?.toLowerCase().includes('cohort') || courseId.includes('cohort')}
                    onPlay={(lecture) => {
                      setActiveCohortLecture(lecture);
                      setVideoOpen(true);
                    }}
                  />
                  {/* Download Syllabus Button */}
                  <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--border-color)' }}>
                    <button
                      onClick={() => alert('Syllabus PDF download not yet configured by admin.')}
                      style={{ background: 'var(--red)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)' }}
                    >
                      <Download size={20} />
                      Download Complete Syllabus
                    </button>
                  </div>
                </>
              )}

              {/* Empty state — API returned no curriculum */}
              {!subjectsLoading && curriculumData.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                  <div style={{ fontSize: 44, marginBottom: 14 }}>📚</div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Curriculum Coming Soon</p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8, opacity: 0.8 }}>The course curriculum will be published here shortly.</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <button 
                onClick={handleEnrollClick}
                className="btn-shine"
                style={{ padding: '16px 40px', background: isEnrolled ? '#22c55e' : 'var(--red)', color: '#fff', borderRadius: 12, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all 0.3s', boxShadow: isEnrolled ? '0 4px 20px rgba(34, 197, 94, 0.4)' : '0 4px 20px rgba(37, 99, 235, 0.4)' }}
              >
                {isEnrolled ? (
                  <>Start Learning Now <Check size={20} /></>
                ) : (
                  <>Enroll to Access Full Curriculum <ArrowRight size={20} /></>
                )}
              </button>
            </div>

          </div>

          <div id="highlights" style={{ background: 'var(--card-bg)', padding: 48, borderRadius: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', marginBottom: 60 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 40 }}>Highlights</h2>
            {highlights && highlights.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px 64px' }}>
                {highlights.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 54, height: 54, borderRadius: '50%', border: '2px solid var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 10 }}>
                      {h.img ? (
                        <img src={h.img} alt={h.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                      ) : null}
                      <CheckCircle className="fallback-icon" style={{ display: h.img ? 'none' : 'block' }} size={24} color="var(--text-primary)" />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)' }}>{h.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>No highlights added for this course yet.</p>
            )}
          </div>

          {/* Projects & Portfolios / Case Studies */}
          <div id="details" style={{ background: 'var(--card-bg)', padding: 48, borderRadius: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ color: 'var(--red)', fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>Hands-On Experience</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', marginTop: 8 }}>Projects & <span className="animated-text-gradient">Portfolios</span></h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 450, margin: 0, fontWeight: 500 }}>
                Build 15+ production-grade projects. Deploy them to live servers and build an impressive portfolio to showcase to hiring managers.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
              {details.map((proj, idx) => {
                const colors = ['#1e3a8a', '#065f46', '#5b21b6', '#881337', '#7c2d12'];
                const accent = colors[idx % colors.length];
                return (
                <div key={idx} className="hover-glow" style={{ background: 'var(--bg-secondary)', padding: 0, borderRadius: 24, border: '1px solid var(--border-color)', borderBottom: `6px solid ${accent}`, display: 'flex', flexDirection: 'column', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', cursor: 'pointer', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  {proj.img && (
                    <div style={{ width: '100%', height: 200, overflow: 'hidden', position: 'relative' }}>
                      <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.1)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                      <div style={{ position: 'absolute', top: 16, left: 16, background: accent, backdropFilter: 'blur(8px)', color: '#fff', padding: '6px 14px', borderRadius: 100, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, border: '1px solid rgba(255,255,255,0.2)' }}>
                        Project {idx + 1}
                      </div>
                    </div>
                  )}
                  <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                    {!proj.img && (
                      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: accent, color: '#fff', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>
                        Project {idx + 1}
                      </div>
                    )}
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>{proj.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, margin: 0, opacity: 0.9 }}>{proj.desc}</p>
                    <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', color: accent, fontWeight: 700, fontSize: 14, gap: 6 }}>
                      Explore Project <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          {/* Tools */}
          {toolsData && toolsData.length > 0 && (
            <div id="tools" style={{ background: 'var(--card-bg)', padding: 48, borderRadius: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 40 }}><span className="animated-text-gradient">Tools</span> Covered</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'flex-start' }}>
                {toolsData.map((tool, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, background: 'var(--bg-secondary)', padding: '16px 24px', borderRadius: 12, border: '1px solid var(--border-color)', minWidth: 100, textAlign: 'center' }}>
                    <img src={tool.img} alt={tool.name} style={{ height: 40, width: 40, objectFit: 'contain' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights Removed */}

          {/* Certificate */}
          <div id="certificate" style={{ background: 'var(--card-bg)', padding: 48, borderRadius: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>Certificate of <span className="animated-text-gradient">Completion</span></h2>
              {isCertUnlocked ? (
                <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} /> Unlocked
                </span>
              ) : (
                <span style={{ background: 'rgba(148, 163, 184, 0.1)', color: 'var(--text-secondary)', padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Lock size={14} /> Locked (Progress: {currentLectures.length > 0 ? Math.round((completedLectures.length / currentLectures.length) * 100) : 0}%)
                </span>
              )}
            </div>

            {isCertUnlocked ? (
              <div>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.04)',
                  border: '1.5px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 32,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  color: '#15803d',
                  textAlign: 'left'
                }}>
                  <Sparkles size={28} />
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Congratulations, you have unlocked your certificate!</h3>
                    <p style={{ fontSize: 13, margin: '4px 0 0 0', opacity: 0.9 }}>Confirm your legal name below to generate your official, shareable credentials.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'flex-start' }}>
                  
                  {/* Name Input & Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
                      <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>Student Name on Certificate</label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => {
                          setStudentName(e.target.value);
                          try {
                            const userStr = localStorage.getItem('user');
                            if (userStr) {
                              const u = JSON.parse(userStr);
                              u.name = e.target.value;
                              localStorage.setItem('user', JSON.stringify(u));
                            }
                          } catch (e) {}
                        }}
                        style={{
                          padding: '12px 16px',
                          border: '1.5px solid var(--border-color)',
                          borderRadius: 10,
                          fontSize: 15,
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          outline: 'none'
                        }}
                        placeholder="Enter your name"
                      />
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Make sure this matches your government ID exactly for official verification.</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid var(--border-color)', paddingTop: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Certificate Status</span>
                        <span style={{ fontWeight: 700, color: '#22c55e' }}>VERIFIED SECURE</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Verification ID</span>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{getVerificationId()}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          const printWindow = window.open('', '_blank');
                          printWindow.document.write(`
                            <!DOCTYPE html>
                            <html>
                              <head>
                                <title>Verified Certificate - ${studentName}</title>
                                <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@700;800&family=Inter:wght@500;600;700&display=swap" rel="stylesheet">
                                <style>
                                  body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0; }
                                  .certificate-container { position: relative; width: 1000px; height: 707px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); background: #ffffff; border: 15px double #ca8a04; box-sizing: border-box; padding: 30px; text-align: center; font-family: 'Inter', sans-serif; }
                                  .cert-border { border: 2px solid #ca8a04; height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; padding: 30px; position: relative; border-radius: 4px; }
                                  .cert-title { font-family: 'Poppins', sans-serif; font-size: 38px; color: #ca8a04; font-weight: 800; letter-spacing: 3px; margin: 0 0 5px 0; }
                                  .cert-subtitle { font-size: 13px; text-transform: uppercase; color: #78350f; letter-spacing: 5px; font-weight: 700; margin-bottom: 30px; }
                                  .cert-present { font-size: 15px; color: #475569; font-style: italic; margin-bottom: 8px; }
                                  .cert-name { font-family: 'Great Vibes', cursive; font-size: 58px; color: #0f172a; font-weight: bold; margin: 5px 0 15px 0; }
                                  .cert-reason { font-size: 13px; color: #475569; max-width: 620px; line-height: 1.6; margin: 0 auto 20px auto; }
                                  .cert-course { font-family: 'Poppins', sans-serif; font-size: 24px; color: #0284c7; font-weight: 700; text-transform: uppercase; margin-bottom: 35px; }
                                  .cert-meta-row { display: flex; width: 85%; justify-content: space-between; align-items: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px; }
                                  .cert-meta-col { display: flex; flex-direction: column; align-items: center; flex: 1; }
                                  .cert-meta-val { font-size: 13px; font-weight: 700; color: #0f172a; height: 30px; display: flex; align-items: flex-end; }
                                  .cert-meta-line { width: 80%; height: 1px; background: #cbd5e1; margin: 5px 0; }
                                  .cert-meta-label { font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 600; }
                                  .cert-verification-footer { margin-top: 25px; font-size: 9px; color: #94a3b8; font-weight: 500; }
                                  @media print {
                                    body { background: none; }
                                    .certificate-container { box-shadow: none; border: 15px double #0ea5e9 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                                    @page { size: landscape; margin: 0; }
                                  }
                                </style>
                              </head>
                              <body>
                                <div class="certificate-container">
                                  <div class="cert-border" style="border: 2px solid #0ea5e9;">
                                    <div class="cert-title" style="color: #0ea5e9;">iSCALE LEARNING</div>
                                    <div class="cert-subtitle">Certificate of Completion</div>
                                    <div class="cert-present">This is proudly presented to</div>
                                    <div class="cert-name">${studentName}</div>
                                    <div class="cert-reason">for successfully finishing all learning modules, capstone assignments, and industry-oriented practical tasks for</div>
                                    <div class="cert-course">${data.title}</div>
                                    
                                    <div class="cert-meta-row">
                                      <div class="cert-meta-col">
                                        <div class="cert-meta-val">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                        <div class="cert-meta-line"></div>
                                        <div class="cert-meta-label">Date of Completion</div>
                                      </div>
                                      
                                      <div class="cert-meta-col" style="margin-top: -30px; margin-bottom: -15px;">
                                        <svg width="90" height="90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M40 70 L30 95 L50 88 L70 95 L60 70" fill="#0284c7" opacity="0.85" />
                                          <path d="M50 70 L42 95 L50 90 L58 95 L50 70" fill="#0ea5e9" />
                                          <path d="M50 10 L54 22 L66 18 L64 30 L75 30 L70 41 L79 47 L70 55 L75 66 L64 66 L66 78 L54 74 L50 86 L46 74 L34 78 L36 66 L25 66 L30 55 L21 47 L30 41 L25 30 L36 30 L34 18 L46 22 Z" fill="url(#blueGrad)" />
                                          <circle cx="50" cy="48" r="28" fill="url(#blueGradSec)" stroke="#0284c7" stroke-width="1.5" />
                                          <circle cx="50" cy="48" r="24" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 2" opacity="0.8" />
                                          <polygon points="50,38 52,43 57,43 53,46 55,51 50,48 45,51 47,46 43,43 48,43" fill="#0f172a" />
                                          <text x="50" y="60" font-family="'Inter', sans-serif" font-size="6" font-weight="bold" fill="#0f172a" text-anchor="middle">I-SCALE</text>
                                          <defs>
                                            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                              <stop offset="0%" stop-color="#bae6fd" />
                                              <stop offset="50%" stop-color="#0ea5e9" />
                                              <stop offset="100%" stop-color="#0284c7" />
                                            </linearGradient>
                                            <linearGradient id="blueGradSec" x1="0%" y1="100%" x2="100%" y2="0%">
                                              <stop offset="0%" stop-color="#0ea5e9" />
                                              <stop offset="50%" stop-color="#e0f2fe" />
                                              <stop offset="100%" stop-color="#0ea5e9" />
                                            </linearGradient>
                                          </defs>
                                        </svg>
                                          <text x="50" y="67" font-family="'Inter', sans-serif" font-size="5" font-weight="bold" fill="#b45309" text-anchor="middle">OFFICIAL SEAL</text>
                                          <defs>
                                            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                              <stop offset="0%" stop-color="#fef08a" />
                                              <stop offset="50%" stop-color="#ca8a04" />
                                              <stop offset="100%" stop-color="#854d0e" />
                                            </linearGradient>
                                            <linearGradient id="goldGradSec" x1="0%" y1="100%" x2="100%" y2="0%">
                                              <stop offset="0%" stop-color="#ca8a04" />
                                              <stop offset="50%" stop-color="#fef08a" />
                                              <stop offset="100%" stop-color="#ca8a04" />
                                            </linearGradient>
                                          </defs>
                                        </svg>
                                      </div>
                                      
                                      <div class="cert-meta-col">
                                        <div class="cert-meta-val" style="font-family: 'Great Vibes', cursive; font-size: 26px; border-bottom: none; height: auto;">iScale Learning</div>
                                        <div class="cert-meta-line"></div>
                                        <div class="cert-meta-label">Director Signature</div>
                                      </div>
                                    </div>
                                    <div class="cert-verification-footer">Official Verification ID: ${getVerificationId()} | Verify securely at iscale-learning.com/verify</div>
                                  </div>
                                </div>
                                <script>window.onload = function() { window.print(); }</script>
                              </body>
                            </html>
                          `);
                          printWindow.document.close();
                        }}
                        style={{
                          background: 'var(--red)',
                          color: '#fff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: 8,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: 14
                        }}
                      >
                        <Printer size={16} /> Print Certificate
                      </button>

                      <button
                        onClick={() => {
                          window.location.href = `/verify-certificate?id=${getVerificationId()}`;
                        }}
                        style={{
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          border: '1.5px solid var(--border-color)',
                          padding: '12px 24px',
                          borderRadius: 8,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: 14
                        }}
                      >
                        <ShieldCheck size={16} color="#d97706" /> Verify Online
                      </button>
                    </div>
                  </div>

                  {/* HTML Preview representation of Certificate */}
                  <div style={{
                    border: '8px double #ca8a04',
                    background: 'var(--card-bg)',
                    borderRadius: 16,
                    padding: '24px 20px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 320,
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: 420,
                    margin: '0 auto'
                  }}>
                    {/* Inner gold frame line */}
                    <div style={{
                      border: '1px solid #ca8a04',
                      padding: '16px 12px',
                      width: '100%',
                      height: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: 8
                    }}>
                      <h4 style={{ fontFamily: 'var(--font-display)', color: '#ca8a04', fontSize: 14, fontWeight: 800, letterSpacing: 1.5, margin: '0 0 2px 0' }}>iSCALE LEARNING</h4>
                      <span style={{ fontSize: 8, letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', color: '#78350f', marginBottom: 10 }}>Certificate of Completion</span>
                      <span style={{ fontSize: 9, fontStyle: 'italic', color: '#64748b' }}>This is proudly presented to</span>
                      <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 28, color: '#0f172a', margin: '2px 0 6px 0', fontWeight: 'bold' }}>{studentName}</h2>
                      <p style={{ fontSize: 8, color: '#64748b', maxWidth: 280, margin: '0 auto 6px auto', lineHeight: 1.3 }}>
                        for successfully finishing all learning modules and industry-oriented practical tasks for
                      </p>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#b45309', textTransform: 'uppercase', marginBottom: 12 }}><span className="animated-text-gradient">{data.title}</span></div>
                      
                      {/* Compact Footer: 3 Columns (Date, Seal, Signature) */}
                      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: 8, marginTop: 'auto' }}>
                        {/* Date */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: '#0f172a' }}>
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span style={{ fontSize: 6, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>Date</span>
                        </div>

                        {/* Gold Seal SVG */}
                        <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center', marginTop: -15, marginBottom: -10 }}>
                          <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40 70 L30 95 L50 88 L70 95 L60 70" fill="#b45309" opacity="0.85" />
                            <path d="M50 70 L42 95 L50 90 L58 95 L50 70" fill="#d97706" />
                            <path d="M50 10 L54 22 L66 18 L64 30 L75 30 L70 41 L79 47 L70 55 L75 66 L64 66 L66 78 L54 74 L50 86 L46 74 L34 78 L36 66 L25 66 L30 55 L21 47 L30 41 L25 30 L36 30 L34 18 L46 22 Z" fill="url(#previewGoldGrad)" />
                            <circle cx="50" cy="48" r="28" fill="url(#previewGoldGradSec)" stroke="#9a7b56" stroke-width="1.5" />
                            <polygon points="50,38 52,43 57,43 53,46 55,51 50,48 45,51 47,46 43,43 48,43" fill="#78350f" />
                            <defs>
                              <linearGradient id="previewGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#fef08a" />
                                <stop offset="50%" stop-color="#ca8a04" />
                                <stop offset="100%" stop-color="#854d0e" />
                              </linearGradient>
                              <linearGradient id="previewGoldGradSec" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#ca8a04" />
                                <stop offset="50%" stop-color="#fef08a" />
                                <stop offset="100%" stop-color="#ca8a04" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>

                        {/* Signature */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <div style={{ height: 16, display: 'flex', alignItems: 'flex-end' }}>
                            <svg width="50" height="18" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 35 Q30 10 50 35 T90 20 T130 38 M30 30 L120 30" stroke="#1e40af" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
                              <path d="M45 20 Q60 5 70 25 T100 20" stroke="#1e40af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" />
                            </svg>
                          </div>
                          <span style={{ fontSize: 6, color: '#94a3b8', textTransform: 'uppercase', marginTop: 2 }}>Director Signature</span>
                        </div>
                      </div>

                      {/* Small Footer ID */}
                      <span style={{ fontSize: 7, color: '#94a3b8', marginTop: 10 }}>ID: {getVerificationId()}</span>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              /* Locked Screen */
              <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', textAlign: 'left' }}>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>{certText}</p>
                  
                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    padding: 20,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <Lock size={20} style={{ color: 'var(--red)' }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Complete 100% of the lectures in the playlist player above to unlock and claim your verified certificate.
                    </span>
                  </div>
                </div>
                <div style={{ width: 340, position: 'relative', margin: '0 auto' }}>
                  <img src={certImg} alt="Certificate" style={{ width: '100%', borderRadius: 8, filter: 'blur(3px) grayscale(100%)', opacity: 0.6, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.4)',
                    borderRadius: 8
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'var(--card-bg)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)'
                    }}>
                      <Lock size={20} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 8, background: 'var(--card-bg)', padding: '4px 8px', borderRadius: 4 }}>Locked</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fees Structure */}
          {feesData && feesData.features && feesData.basic && (
            <div id="fees" style={{ marginBottom: 60, background: 'var(--card-bg)', borderRadius: 16, border: '1px solid var(--border-color)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'stretch' }}>
                {/* Basic Card */}
                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', position: 'relative', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ marginBottom: 24, marginTop: 8 }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><polygon points="12 2 22 20 2 20" /></svg>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Basic</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 24 }}>₹</span> {String(feesData.basic.price).replace(/[^0-9]/g, '')}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>Enroll Now!</div>
                  <button onClick={handleEnrollClick} style={{ background: '#fef2f2', border: 'none', color: '#f47b6a', padding: '14px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 32, transition: 'all 0.2s' }}>Buy now</button>
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {feesData.features.filter(f => typeof f.basic === 'boolean' ? f.basic : true).map((feat, idx) => {
                      const title = feat.name.includes('-') ? feat.name.split('-')[0].trim() : feat.name;
                      const subtext = feat.name.includes('-') ? feat.name.split('-').slice(1).join('-').trim() : (typeof feat.basic !== 'boolean' ? feat.basic : '');
                      return (
                        <div key={idx} style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
                          {subtext && <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{subtext}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Premium Card */}
                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', position: 'relative', borderRight: '1px solid var(--border-color)' }}>
                  <div style={{ marginBottom: 24, marginTop: 8 }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#60a5fa" stroke="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Premium</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 24 }}>₹</span> {String(feesData.premium.price).replace(/[^0-9]/g, '')}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>Enroll now</div>
                  <button onClick={handleEnrollClick} style={{ background: '#fef2f2', border: 'none', color: '#f47b6a', padding: '14px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 32, transition: 'all 0.2s' }}>Buy now</button>
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {feesData.features.filter(f => typeof f.premium === 'boolean' ? f.premium : true).map((feat, idx) => {
                      const title = feat.name.includes('-') ? feat.name.split('-')[0].trim() : feat.name;
                      const subtext = feat.name.includes('-') ? feat.name.split('-').slice(1).join('-').trim() : (typeof feat.premium !== 'boolean' ? feat.premium : '');
                      return (
                        <div key={idx} style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
                          {subtext && <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{subtext}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pro Card */}
                <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ marginBottom: 24, marginTop: 8 }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#4ade80" stroke="none"><polygon points="12 2 22 12 12 22 2 12" /></svg>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Pro</div>
                    <div style={{ background: '#b894ff', color: '#fff', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>Recommended</div>
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 24 }}>₹</span> {String(feesData.pro.price).replace(/[^0-9]/g, '')}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>Enroll now</div>
                  <button onClick={handleEnrollClick} style={{ background: '#ef7b66', border: 'none', color: '#fff', padding: '14px 24px', borderRadius: 6, fontWeight: 600, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 32, transition: 'all 0.2s' }}>Buy now</button>
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {feesData.features.filter(f => typeof f.pro === 'boolean' ? f.pro : true).map((feat, idx) => {
                      const title = feat.name.includes('-') ? feat.name.split('-')[0].trim() : feat.name;
                      const subtext = feat.name.includes('-') ? feat.name.split('-').slice(1).join('-').trim() : (typeof feat.pro !== 'boolean' ? feat.pro : '');
                      return (
                        <div key={idx} style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
                          {subtext && <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{subtext}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructor — all data from API, no static/dummy */}
          {instructorsData && instructorsData.length > 0 && (
            <div id="instructor" style={{ background: 'var(--card-bg)', borderRadius: 24, padding: 40, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', borderTop: '6px solid #3b82f6', marginBottom: 40 }}>
              <div style={{ marginBottom: 32 }}>
                <span style={{ color: 'var(--red)', fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>Meet the Experts</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: 'var(--text-primary)', marginTop: 6, marginBottom: 0 }}>Your <span className="animated-text-gradient">Instructors</span></h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 20 }}>
                {instructorsData.map((inst, idx) => (
                  <div key={idx} className="hover-glow" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 24, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', boxShadow: 'var(--card-shadow)', position: 'relative', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                    
                    {/* Avatar */}
                    <div style={{ width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--border-color)', background: 'var(--card-bg)', flexShrink: 0, marginTop: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                      <img
                        src={inst.img}
                        alt={inst.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(inst.name)}&background=2563eb&color=fff&bold=true&size=200`; }}
                      />
                    </div>

                    {/* Name */}
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3, fontFamily: 'var(--font-display)' }}>{inst.name}</h3>

                    {/* Experience badge */}
                    {inst.experience && (
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--red)', background: 'rgba(37,99,235,0.08)', padding: '4px 14px', borderRadius: 100, border: '1px solid rgba(37,99,235,0.15)' }}>{inst.experience}</span>
                    )}

                    {/* Bio */}
                    {inst.bio && (
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', opacity: 0.9 }}>{inst.bio}</p>
                    )}

                    {/* Skills */}
                    {inst.skills && inst.skills.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 4 }}>
                        {inst.skills.map((sk, si) => (
                          <span key={si} style={{ fontSize: 12, fontWeight: 700, background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '4px 12px', borderRadius: 100, textTransform: 'capitalize' }}>{sk}</span>
                        ))}
                      </div>
                    )}

                    {/* Stats row */}
                    {(inst.rating > 0 || inst.reviews > 0 || inst.totalCourses > 0) && (
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--border-color)', width: '100%' }}>
                        {inst.rating > 0 && (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 16, fontWeight: 900, color: '#f59e0b' }}>⭐ {Number(inst.rating).toFixed(1)}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 700 }}>Rating</div>
                          </div>
                        )}
                        {inst.reviews > 0 && (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--text-primary)' }}>{inst.reviews}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 700 }}>Reviews</div>
                          </div>
                        )}
                        {inst.totalCourses > 0 && (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--text-primary)' }}>{inst.totalCourses}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 700 }}>Courses</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* LinkedIn */}
                    {inst.linkedin && (
                      <a
                        href={inst.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 800, color: '#0077b5', textDecoration: 'none', padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(0,119,181,0.2)', background: 'rgba(0,119,181,0.06)', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,119,181,0.12)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,119,181,0.06)'}
                      >
                        <i className="fab fa-linkedin-in" style={{ fontSize: 14 }}></i> LinkedIn
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ section placed after Instructor */}
          <div id="faq" style={{ background: 'var(--card-bg)', padding: 48, borderRadius: 24, boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)', borderTop: '6px solid #10b981', marginTop: 40 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 32 }}><span className="animated-text-gradient">FAQ's</span></h2>
            <div>
              {faqs && faqs.length > 0 ? (
                faqs.slice(0, faqShowMore ? faqs.length : 3).map((faq, idx) => (
                  <Accordion key={idx} title={faq.q} items={[faq.a]} />
                ))
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>No FAQs available for this course yet.</p>
              )}
            </div>
            {faqs && faqs.length > 3 && (
              <button onClick={() => setFaqShowMore(!faqShowMore)} style={{ color: 'var(--red)', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, marginTop: 16 }}>
                {faqShowMore ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Fees Section */}




      {/* Reviews / Testimonials Section — data is always fetched from API, no dummy/static fallback */}
      <section id="review" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: 'var(--red)', fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>What Our Students Say</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', marginTop: 8, marginBottom: 0 }}>Student <span className="animated-text-gradient">Testimonials</span></h2>
          </div>

          {/* Loading state */}
          {reviewsLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160, gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '3px solid var(--border-color)',
                borderTopColor: 'var(--red)',
                animation: 'spin 0.8s linear infinite'
              }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: 15, fontWeight: 600 }}>Loading testimonials...</span>
            </div>
          )}

          {/* Reviews grid — only real API data, zero dummy/static reviews */}
          {!reviewsLoading && reviewsData.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
              {reviewsData.map((rev, idx) => {
                const colors = ['#1e3a8a', '#065f46', '#5b21b6', '#881337', '#7c2d12'];
                const accent = colors[idx % colors.length];
                return (
                  <div key={idx} style={{
                    background: 'var(--card-bg)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderTop: `6px solid ${accent}`,
                    borderRadius: 20,
                    padding: 32,
                    boxShadow: 'var(--card-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'default'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)'; }}
                  >
                    {/* Stars */}
                    <div style={{ display: 'flex', gap: 4 }}>
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          size={16}
                          fill={si < (rev.rating || 5) ? '#f59e0b' : 'none'}
                        color={si < (rev.rating || 5) ? '#f59e0b' : '#cbd5e1'}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  {rev.text && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  )}

                  {/* Reviewer Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
                    {rev.img ? (
                      <img
                        src={rev.img.startsWith('http') ? rev.img : `https://iscale-backend.onrender.com/${rev.img.replace(/^\//, '')}`}
                        alt={rev.name}
                        style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)', flexShrink: 0 }}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--red), #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 20, flexShrink: 0 }}>
                        {(rev.name || 'S').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rev.name}</div>
                      {(rev.role || rev.company) && (
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {rev.role}{rev.role && rev.company ? ' · ' : ''}{rev.company}
                        </div>
                      )}
                    </div>
                    {rev.companyImg && (
                      <img
                        src={rev.companyImg.startsWith('http') ? rev.companyImg : `https://iscale-backend.onrender.com/${rev.companyImg.replace(/^\//, '')}`}
                        alt={rev.company}
                        style={{ height: 32, maxWidth: 80, objectFit: 'contain', opacity: 0.8, flexShrink: 0 }}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    )}
                  </div>
                </div>
              );
              })}
            </div>
          )}

          {/* Empty state when API returns no reviews */}
          {!reviewsLoading && reviewsData.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
              <p style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>No testimonials yet for this course.</p>
              <p style={{ fontSize: 14, marginTop: 8, opacity: 0.7 }}>Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>

      {/* Foundation Course: Single Price Card */}
      {apiData && (apiData.price || apiData.offer_price) && (
        <section id="foundation" style={{ padding: '60px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{ color: 'var(--red)', fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>Foundation Course</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', marginTop: 8 }}>Begin Your <span className="animated-text-gradient">Journey</span></h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: 'var(--card-bg)', border: '1.5px solid var(--border-color)', borderRadius: 24, padding: 40, maxWidth: 500, width: '100%', boxShadow: 'var(--card-shadow)', textAlign: 'left' }}>
                <div style={{ display: 'inline-flex', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>
                  Foundation Program
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 12 }}><span className="animated-text-gradient">{data.title}</span></h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>Get lifetime access to high-quality recorded video lectures, self-assessment tests, complete code notebooks, and direct mentor query support.</p>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24, borderTop: '1px solid var(--border-color)', paddingTop: 20 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)' }}>{dynamicOfferPrice || (apiData?.price ? `₹${parseInt(apiData.price).toLocaleString()}` : '₹1,199')}</span>
                  {apiData?.price && apiData?.offer_price && apiData.price !== apiData.offer_price && (
                    <span style={{ fontSize: 18, color: '#94a3b8', textDecoration: 'line-through' }}>₹{parseInt(apiData.price).toLocaleString()}</span>
                  )}
                </div>

                <ul style={{ padding: 0, margin: '0 0 32px 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['LMS Software Access (Web + Android)', 'Recorded Lectures with Notes & Materials', 'Lifetime Access & Free Updates', 'ISO 9001:2015 Verified Certificate', 'Dedicated Email Doubt Support'].map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <CheckCircle size={16} color="#22c55e" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button onClick={handleEnrollClick} style={{ width: '100%', background: 'var(--red)', color: '#fff', border: 'none', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)' }}>
                  Enroll & Start Learning <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default CourseDetailsPage;
