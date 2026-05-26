import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';
import './PlacementTalks.css';

const PlacementTalksPage = ({ setCurrentPage }) => {
  useReveal();

  const [talks] = useState([
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Untitled-1.png",
        "name": "Ashay Krishna",
        "role": "Director of Engg",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Logo-microsoft-transparent-background-PNG-removebg-preview.png",
        "company": "Microsoft",
        "link": "https://youtu.be/hDm1e5i2DqA"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Shweta_Shandilya-Edit.jpg",
        "name": "Shweta Shandilya",
        "role": "Executive Director",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/IBM-removebg-preview.png",
        "company": "IBM",
        "link": "https://youtu.be/xksTGfO7WII"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/uday_smaall.png",
        "name": "Mr. Uday Narang",
        "role": "Chairman",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/osm.png",
        "company": "Omega Seiki Mobility",
        "link": "https://www.youtube.com/watch?v=m62w5xf6TO4&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=8"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/prasad_menon.png",
        "name": "Prasad Menon",
        "role": "CHRO",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/amagi1.png",
        "company": "Amagi, Flipkart",
        "link": "https://www.youtube.com/embed/hTT9LkdBmsY?si=HSDMxKXvv7hhr2p5"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Jaibir_Siwach_small1.png",
        "name": "Mr Jaibir Siwach",
        "role": "CEO & Founder",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/kabira.png",
        "company": "Kabira Mobility",
        "link": "https://www.youtube.com/watch?v=iBIcCGpSpeM&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=14"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/sardar_ji.png",
        "name": "Harjeet Khanduja",
        "role": "Vice President",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/reliance_jio.png",
        "company": "Reliance Jio",
        "link": "https://www.youtube.com/embed/eMLOufATomo?si=NWplf5Vb3eppeYTC"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Rahil_Hop_small1.png",
        "name": "Mr Rahil Gupta",
        "role": "Co-founder and CTO",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/hop_logo.png",
        "company": "Hop Electric Vehicle",
        "link": "https://www.youtube.com/watch?v=K8ZzPq1EjM8&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=11"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Dhirajshetty_ultravoillette.png",
        "name": "Mr. Dhiraj Shetty",
        "role": "Sr. G.M. - HR & Operations",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Uktravoillette_logo.png",
        "company": "Ultraviolette Automotive",
        "link": "https://www.youtube.com/watch?v=T3rqWq7Dqr0&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=2"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/greata.png",
        "name": "Raj mehta",
        "role": "Founder",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/gret.png",
        "company": "Greta Electric",
        "link": "https://www.youtube.com/watch?v=LcbshLJHZsQ&list=PLxzTa0VPR9rzM9ihMbryO_xMIGy572q_M&index=8"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/revamp_moto.png",
        "name": "Mr Pushkaraj Salunke",
        "role": "Founder and CTO",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/revamp.png",
        "company": "Revamp Motto",
        "link": "https://www.youtube.com/watch?v=ui5mSY2hHXw&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=16"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Jainendra_anand_Small.png",
        "name": "Mr Janender Anand",
        "role": "Group CEO of Baxy Group",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Founders_talk_Company_logo_baxy.png",
        "company": "Baxy Group",
        "link": "https://www.youtube.com/watch?v=FD8roZZIWAc&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=7"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Ankit_Acharya_Bounce.png",
        "name": "Mr. Ankit Acharya",
        "role": "Leader - PR & Communications",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Ankit_Acharya_Bounce_logo.png",
        "company": "Bounce & Bounce Infinity",
        "link": "https://www.youtube.com/watch?v=4H9mekLftRE&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=5"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Chandan_Sathees_zitto.png",
        "name": "Mr. Chandan Sathees",
        "role": "CEO",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/zitto_logo.png",
        "company": "Zitto Motors",
        "link": "https://www.youtube.com/watch?v=peALSbwkoxs&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=10&t=232s"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/neha_mehtaoben.png",
        "name": "Neha Mehta",
        "role": "PR & Corporate Communications",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/neha_mehta_oben.png",
        "company": "Oben Electric",
        "link": "https://www.youtube.com/watch?v=3cSqXI3SPxA&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=6"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Pragya_vegh.png",
        "name": "Ms Pragya Goyal",
        "role": "Founder & CEO",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/vegh.png",
        "company": "Verge Motors",
        "link": "https://www.youtube.com/watch?v=L25_7r7-m3o&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=3"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/shrikant_reddy_hala_small.png",
        "name": "Mr. Shrikanth Reddy",
        "role": "Founder & CEO",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/hala.png",
        "company": "Hala Mobility",
        "link": "https://www.youtube.com/watch?v=6tDDKAdO6PQ&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=16&t=585s"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Rohini_Mellam.png",
        "name": "Rohini Mellam",
        "role": "H.R. Executive",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Rohini_Mellam_imapct_guru_logo1.png",
        "company": "Impact Guru Technology Ventures Pvt Ltd",
        "link": "https://www.youtube.com/watch?v=-1nKdKEBohw&list=PLxzTa0VPR9rzM9ihMbryO_xMIGy572q_M&index=1"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/hyder_ali_eblu.png",
        "name": "Mr. Hyder Ali Khan",
        "role": "CEO",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/hyder_ali_eblu_logo.png",
        "company": "Eblu EV | Godawari",
        "link": "https://www.youtube.com/watch?v=pi3OInLpfc0&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=11&t=35s"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Significant_infotech_a.png",
        "name": "Ekta Parmar",
        "role": "H.R Executive",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Significant_infotech.png",
        "company": "Significant Infotech Pvt. Ltd.",
        "link": "https://www.youtube.com/watch?v=U_oknU82ch0&list=PLxzTa0VPR9rzM9ihMbryO_xMIGy572q_M&index=7"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Walkover.png",
        "name": "Shubhangi Shekhar",
        "role": "H.R Executive",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/walkover_logo.png",
        "company": "Walkover Technologies Pvt. Ltd.",
        "link": "https://youtu.be/aAoy9FPUyzs"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Okinawa.png",
        "name": "Mr. Ashwani Jaiswal",
        "role": "VP",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Okinawa_logo.png",
        "company": "Okinawa Autotech",
        "link": "https://www.youtube.com/watch?v=ydJnz_SsJYQ&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=4&t=108s"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/kustard.png",
        "name": "Mr. Javed Khatri",
        "role": "Founder",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/kustard_logo.png",
        "company": "Kustard",
        "link": "https://www.youtube.com/watch?v=Pg5k_OHiL90&list=PLxzTa0VPR9rw3_AtieBgdLSbtfATUBP2A&index=14&t=970s"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Ampere_Electric_Vehicle.png",
        "name": "Mr. Kavin Thangasamy",
        "role": "Human Resources Administrator",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Ampere_Electric_Vehicle_logo.png",
        "company": "Ampere Electric Vehicles",
        "link": "https://youtu.be/z7SEqomYpLg"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Dr__Jerwin_Prabhu_bharti_Robotic_Systems_India_Pvt__Ltd.png",
        "name": "Dr. Jerwin Prabu",
        "role": "Head of Technology",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Dr__Jerwin_Prabhu_bharti_Robotic_Systems_India_Pvt__Ltd_logo.png",
        "company": "Bharati Robotic Systems India Pvt Ltd",
        "link": "https://youtu.be/8T8ZRtrPw6M"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Kaushik_Raj.png",
        "name": "Kaushik Raj",
        "role": "H.R. Manager",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Kaushik_Raj_intellipaat.png",
        "company": "Intellipaat Software Solution PVT LTD",
        "link": "https://www.youtube.com/watch?v=0yN-Q763QGc&list=PLxzTa0VPR9rzM9ihMbryO_xMIGy572q_M&index=10"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Nisheva_Technology.png",
        "name": "Mr. Aashish Kulkarni",
        "role": "H.R Executive",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Nisheva_Technology_logo.png",
        "company": "Niseva Technologies Pvt. Ltd.",
        "link": "https://www.youtube.com/watch?v=BxE6JiN5PNc&list=PLxzTa0VPR9rzM9ihMbryO_xMIGy572q_M&index=5"
    },
    {
        "image1": "https://www.theiscale.com/myadmin/uploads/more/Jyoti_Kaur_Anviam_Solution_Pvt_Ltd.png",
        "name": "Jyoti Kaur",
        "role": "H.R. Executive",
        "image2": "https://www.theiscale.com/myadmin/uploads/more/Jyoti_Kaur_Anviam_Solution_Pvt_Ltd_logo.png",
        "company": "Anviam Solutions Pvt Ltd",
        "link": "https://www.youtube.com/watch?v=pn0gAWqO12s&list=PLxzTa0VPR9rzM9ihMbryO_xMIGy572q_M&index=5"
    }
]);

  return (
    <div className="placement-page-container">
      {/* Banner Section */}
      <section className="placement-banner">
        <div className="container">
          <div className="breadcrumb-nav reveal">
            <span style={{ cursor: 'pointer', margin: 0, color: '#555' }} onClick={() => setCurrentPage('home')}>Home</span>
            <span>›</span>
            <span>Pre-Placement Talks</span>
          </div>
          <h1 className="page-title reveal" style={{ transitionDelay: '100ms' }}>Pre-Placement Talks</h1>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container">
        <h3 className="page-subtitle reveal">Pre Placement <span>Talks</span> with the <span>Company's HR</span></h3>
        
        <div className="placement-grid">
          {talks.map((talk, index) => (
            <div key={index} className="placement-card reveal" style={{ transitionDelay: `${(index % 8) * 50}ms` }}>
              <img loading="lazy" src={talk.image1} alt={talk.name} className="placement-avatar" />
              <h5 className="placement-name">{talk.name}</h5>
              <p className="placement-role">{talk.role}</p>
              
              <img loading="lazy" src="https://www.theiscale.com/assets/images/down.png" alt="arrow down" className="placement-divider" />
              
              <img loading="lazy" src={talk.image2} alt={talk.company} className="placement-company-logo" />
              <p className="placement-company-name">{talk.company}</p>
              
              <a target="_blank" rel="noreferrer" className="placement-btn" href={talk.link}>
                Know More
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlacementTalksPage;
