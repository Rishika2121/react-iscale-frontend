import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './SuccessStory.css';

const SuccessStoryPage = ({ setCurrentPage }) => {
  useReveal();

  const [stories] = useState([
    {
        "videoId": "https://www.youtube.com/embed/Akc6JJH8lwo?si=FUJxhk4sV99kfqEq",
        "name": "Manas Jyoti Borah",
        "company": "The GoodGlamm",
        "package": "N/A"
    },
    {
        "videoId": "https://www.youtube.com/embed/t5lPpOPgxvs?si=5SLcqzd1OIOpn15v",
        "name": "Aditya Singh",
        "company": "Network Zone",
        "package": "Non-disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/gtms_G5MLrs?si=gNStgMf7re1tLWdf",
        "name": "Amit Jaiswal",
        "company": "INFOCRATS",
        "package": "Non-disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/LIzTbS9-x_w?si=GuAVcVRaL1zRPmuj",
        "name": "Shubham",
        "company": "Data Cult",
        "package": "N/A"
    },
    {
        "videoId": "https://www.youtube.com/embed/vwfwW_xlrYc?si=Vf_NN7HaXZCtVbGy",
        "name": "Mr. Aman Dewangan",
        "company": "Accenture",
        "package": "N/A"
    },
    {
        "videoId": "https://www.youtube.com/embed/7VRhjPYJjZI?si=3sY4dJZ_snKMky_8",
        "name": "Suryakant",
        "company": "",
        "package": "N/A"
    },
    {
        "videoId": "https://www.youtube.com/embed/oGIrMe1WBC0?si=EDnuILdt7yeTDlRX",
        "name": "Vidhik Ku Singh",
        "company": "",
        "package": "N/A"
    },
    {
        "videoId": "https://www.youtube.com/embed/kXDIOvTXLQE?si=KJD0gGgi1ytT6WC_",
        "name": "Siya",
        "company": "Caterpillar",
        "package": "9.8 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/K0-A3hW0Vkk?si=9yvInMKcUOM8m8_c",
        "name": "Abhinandan kohle",
        "company": "",
        "package": "4.2 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/aD-AKOz1pc8",
        "name": "Mr Nishant Ku. Jain",
        "company": "WALMART",
        "package": "Not Disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/-x-AiOHs0HU",
        "name": "Ms Jahnavi Angati",
        "company": "IBM",
        "package": "12 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/d-mpauGxxBg?si=QMu3-pS7g1J4uxM0",
        "name": "Venus",
        "company": "Maersk",
        "package": "14.5 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/Dkn02GfZXNs?si=n105ib3DZI40N32X",
        "name": "Bhoopendra",
        "company": "HDFC Bank",
        "package": "7 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/fTJtzMPAMhI?si=nvunleLHc2Ahe4aZ",
        "name": "Shreya",
        "company": "Deloitte",
        "package": "7.6 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/y3NPEpeTGCA?si=gzD88HTfDGudVlVg",
        "name": "Riya Garg",
        "company": "Student",
        "package": "Non Disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/-jnR04sQITQ?si=rBsqZintUBEhAz-i",
        "name": "Nishita",
        "company": "",
        "package": "Non-disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/OCvrZ1sBmq4?si=m0gW-1gcwOVG7PkH",
        "name": "Hussain",
        "company": "Not Disclosed",
        "package": "4.3 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/EoMLOLCl-v8?si=bwwGgEuFUYmDjjB0",
        "name": "Mr Kritik",
        "company": "",
        "package": "N/A"
    },
    {
        "videoId": "https://www.youtube.com/embed/pVz7InS29Qw?si=NrU_SQ9oINj6bPRu",
        "name": "Ankush",
        "company": "Tiger Analytics",
        "package": "14 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/vu2TvJXMXCY?si=TQKd7wHS9pvSomDn",
        "name": "Kishan",
        "company": "Itron",
        "package": "13.7"
    },
    {
        "videoId": "https://www.youtube.com/embed/ROgY3-4RDfQ?si=ZudIDmw24YHIE3GL",
        "name": "Ms Shaima",
        "company": "",
        "package": "Non-disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/XQSmxvdj0J4",
        "name": "Mr Rahil Mirza",
        "company": "Hexaware Technology",
        "package": "Not Disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/mneeIHg0L6M?si=II0uYabqAaMUv3lo",
        "name": "Mr Pawan",
        "company": "",
        "package": "N/A"
    },
    {
        "videoId": "https://www.youtube.com/embed/TGpOL6BG-PU",
        "name": "Ms Pushpanjali Rajput",
        "company": "TCS",
        "package": "Not Disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/Z9joX0GtiA8",
        "name": "Mr Anindya Mitra",
        "company": "Tech Mahindra",
        "package": "6 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/SfJg2du-ALY",
        "name": "Mr Roshan Baghwar",
        "company": "SWIGGY",
        "package": "30 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/x2NrEoApTxE?si=p2UNrkfJPfivVaL-",
        "name": "Mr Ashish Kumar",
        "company": "",
        "package": "N/A"
    },
    {
        "videoId": "https://www.youtube.com/embed/18VzAWIaAEU?si=-M93g07nsnoJNF8u",
        "name": "Ms Poonam Kalamkar",
        "company": "Microsoft",
        "package": "21 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/UHyKoPTHOow",
        "name": "Mr Vamsy Vrishank",
        "company": "PAYPAL",
        "package": "Not Disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/tX-VjkhoSuU",
        "name": "Mr Abhishek Kumar Rai",
        "company": "INFOSYS",
        "package": "Not Disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/F1huDnWIzIs",
        "name": "Mr Abhishek Jain",
        "company": "AMDOCS",
        "package": "4.0 LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/3xW0P7frIMk",
        "name": "Mr Harshit Singh",
        "company": "AMAZON",
        "package": "Not Disclosed"
    },
    {
        "videoId": "https://www.youtube.com/embed/FhmnResJ26c",
        "name": "Mr Hemant Manjhi",
        "company": "Capgemini",
        "package": "8+ LPA"
    },
    {
        "videoId": "https://www.youtube.com/embed/OpxtGxhDCzc",
        "name": "Ranjeet Kumar",
        "company": "Learning Experience",
        "package": "-"
    }
]);

  return (
    <div className="success-page-container">
      {/* Banner Section */}
      <section className="success-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#555' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span>›</span>
            <span>Success Story</span>
          </div>
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>Success Story</h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container">
        <div className="success-grid">
          {stories.map((story, index) => (
            <div key={index} className="success-card reveal" style={{ transitionDelay: `${(index % 8) * 50}ms` }}>
              <div className="video-container">
                <iframe src={story.videoId} webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen title={story.name}></iframe>
              </div>
              <div className="success-card-content">
                <div className="student-meta">
                  <img src="https://ui-avatars.com/api/?name=User&background=random&color=fff" alt="" className="student-avatar" />
                  <div className="student-info">
                    <h5 className="student-name">{story.name}</h5>
                    <div className="student-details">
                      Placed at: {story.company} <br />
                      Package: <strong>{story.package}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SuccessStoryPage;
