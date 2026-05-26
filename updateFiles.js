const fs = require('fs');

const clients = [
  { name: 'PhonePe', desc: 'PhonePe is an Indian digital payments and financial services company headquartered in Bengaluru, Karnataka, India.', logo: 'https://www.theiscale.com/myadmin/uploads/more/phonepay1.png' },
  { name: 'Good Glamm Group', desc: 'The Good Glamm Group is a content-to-commerce company that produces and sells personal care and cosmetic products, with operations in India, Dubai, Singapore, and the USA.', logo: 'https://www.theiscale.com/myadmin/uploads/more/good_glam1.png' },
  { name: 'Cultsports', desc: 'At cult.fit, we make group workouts fun, daily food healthy & tasty, mental fitness easy with yoga & meditation, and medical & lifestyle care hassle-free.', logo: 'https://www.theiscale.com/myadmin/uploads/more/cutsports1.png' },
  { name: 'TATA 1mg', desc: 'Tata 1mg, previously 1mg, is a healthcare platform based in Gurugram, India. It provides services, including e-pharmacy, diagnostics, e-consultation, and health content.', logo: 'https://www.theiscale.com/myadmin/uploads/more/tata1mg1.png' },
  { name: 'Ultravoilette Automotive', desc: 'We live by design, technology and user experience. We are mavericks from across aerospace, automotive engineering and consumer electronics. Our sole mission in life - to redefine mobility.', logo: 'https://www.theiscale.com/myadmin/uploads/more/ultraviolette.png' },
  { name: 'Paisa bazar', desc: 'Paisabazaar aims to make personal finance decisions easy, transparent and convenient for India. Through technology and data innovations, along with a lot of hard work, we intend to make complex decisions simple for you.', logo: 'https://www.theiscale.com/myadmin/uploads/more/paisa_bazar1.png' },
  { name: 'Baxy Mobility', desc: 'BAXY Mobility has been consistently leading India\'s three wheeler industry. A decade ago, BAXY Pvt Ltd ventured into the domain with a goal to redefine quality and economics of three-wheeled vehicles.', logo: 'https://www.theiscale.com/myadmin/uploads/more/Baxy_Group.png' },
  { name: 'Magenta Mobility', desc: 'Integrated electric mobility, EV charging, and technology platform Magenta aims to revolutionize and aggregate the urban freight & transportation segment.', logo: 'https://www.theiscale.com/myadmin/uploads/more/megenta1.png' },
  { name: 'Airblack Technologies Pvt. Ltd.', desc: 'We are entrepreneurs, designers, hackers, artists and engineers on a mission to help people convert their passion to a livelihood.', logo: 'https://www.theiscale.com/myadmin/uploads/more/airblack.png' },
  { name: 'Omega Seiki Mobility', desc: 'Omega Seiki Mobility represents speed, agility & capable leadership. Founded in 2016, and backed by years of capability in creating precision engineering solutions, Omega Seiki Mobility has become sy', logo: 'https://www.theiscale.com/myadmin/uploads/more/omega_seiki_mobiity.png' },
  { name: 'Planet Spark', desc: 'PlanetSpark is on a journey to make the traditional and unorganized tuitions obsolete through its virtual classroom.', logo: 'https://www.theiscale.com/myadmin/uploads/more/planetspark2.png' },
  { name: 'Ola Electric', desc: 'Ola has carved itself a name by being India\'s largest mobility platform and one of the world\'s largest ride-hailing companies.', logo: 'https://www.theiscale.com/myadmin/uploads/more/OLA_Electric.png' }
];

let clientsCode = fs.readFileSync('src/pages/ClientsPage.js', 'utf8');
clientsCode = clientsCode.replace(/const clientsData = \[[\s\S]*?\];/, `const clientsData = ${JSON.stringify(clients, null, 2)};`);
fs.writeFileSync('src/pages/ClientsPage.js', clientsCode);

const newsItems = [
  { id: 1, img: 'https://www.theiscale.com/myadmin/uploads/more/1.jpg', title: 'The iScale received recognition from Indian Startup News', date: 'February 10, 2025', desc: 'Entrackr | The Karo Startup | Read Article' },
  { id: 2, img: 'https://www.theiscale.com/myadmin/uploads/more/WhatsApp_Image_2024-09-08_at_15_24_542.jpeg', title: 'The iScale was recognized by 14th President of India Shri Ram Nath Kovind.', date: 'September 08, 2024', desc: 'Our founders Miss. Swati & Mr. Nishant Dhote' },
  { id: 3, img: 'https://www.theiscale.com/myadmin/uploads/more/WhatsApp_Image_2024-09-08_at_15_50_15.jpeg', title: 'In India Financial Gap Problem is bigger which gives birth to the Skill Gap Problem.', date: 'September 08, 2024', desc: 'Josh Talks Speaker | Founder The iScale' },
  { id: 4, img: 'https://www.theiscale.com/myadmin/uploads/more/w_app_group.png', title: 'Join WhatsApp Group', date: 'April 02, 2024', desc: 'Join our Official WhatsApp Group for daily Jobs Alerts, Pre Placement Talk links & all other information\'s which will definitely skill up your professional career.' },
  { id: 5, img: 'https://www.theiscale.com/myadmin/uploads/more/151.jpg', title: 'Welcome to The iScale: Your Gateway to Affordable Upskilling and Job-Readiness', date: 'February 10, 2025', desc: '"Industries Helping Hands" is now rebranded to "The iScale"' },
  { id: 6, img: 'https://www.theiscale.com/myadmin/uploads/more/Newspaper_headline.jpg', title: 'The iScale is on the Newspapers Headlines', date: 'September 12, 2024', desc: 'News@TheiScale' }
];

let newsCode = fs.readFileSync('src/pages/NewsPage.js', 'utf8');
newsCode = newsCode.replace(/const newsItems = \[[\s\S]*?\];/, `const newsItems = ${JSON.stringify(newsItems, null, 2)};`);
fs.writeFileSync('src/pages/NewsPage.js', newsCode);

const alliedImages = [
  'Mandsaur_University.png', 'Silver_Oak_University.png', 'Lokmanya_Tilak_College_of_Engineering_,_Navi_Mumbai_logo.png',
  'Rajkiya_Engineering_College_Ambedkar_Nagar.png', 'MGMs_College_of_Engineering_and_Technology_logo.png',
  'D_J_Sanghvi_College_of_Engineering,_Mumbai.png', 'HRIT_Group_of_Institutions.png', 'medicaps_logo.png',
  'Adamas_University.png', 'mvsr.jpg', 'VIT_nagpur_logo.png', 'IPS_Academy.png', 'ISBM_College_of_Engineering_Pune_logo.png',
  'C__S__Institute_of_Technology,_Deori.png', 'MIT_pune_logo.png', 'Samrat_Ashok_Technological_Institute.png',
  'Rajiv_Gandhi_College_of_Engineering_Research,_Nagpur.png', 'iit_dhanbad.png', 'Techno_India_and_Assam_Downtown_University.png',
  'IMS_Engineering_College,_Ghaziabad.png', 'Institute_of_Engineering_Technology.png', 'Malwa_Institute_of_Technologyy.png',
  'Joginpally_BR_Engineering_College.png', 'Megha_Omega_Group_Of_Institutions.png', 'Deccan_group_of_Institutions.png',
  'BVBs_Sardar_Patel_College_of_Engineering_logo.png', 'Aliah_University_Logo.png', 'BIET_Jhansi.png',
  'C_K_Pithawala_College_of_Engineering_Technology.png', 'ACHARYA_INSTITUTE_OF_TECHNOLOGY.png', 'B_M__INSTITUTE_OF_ENGINEERING_TECHNOLOGY.png',
  'Raja_Balwant_Singh_Management_Technical_Campus.png', 'Yadavindra_College_of_Engineering,_Talwandi_Sabo.png',
  'Patel_Group_of_Institutions.png', 'RBMI.png', 'DAYANANDA_SAGAR_INSTITUTIONS.png', 'Chhatrapati_shivaji_institute_of_technology.png',
  'CT_Group_of_Institute.png', 'iNurture_Education_-_Placement_partner_Assam_Downtown_University.png', 'RITEE_Group_Of_Institutes.png',
  'School_of_Computer_Science_and_IT,_DAVV.png', 'The_Neotia_University.png', 'DPG_INSTITUTE_OF_TECHNOLOGY_AND_MANAGEMENT.png',
  'Priyadarshini_J_L_College_Of_Engineering_Nagpur.png', 'Neelam_College_Of_Engg__Technology.png', 'Krishna_Group_of_Institutions,_Kanpur.png',
  'Vadodara_institute_of_engineering2.png', 'Chaitanya_Bharathi_Institute_of_Technology.png',
  'Vivekananda_College_of_Technology_and_Management_nada_pul_sarsol_Aligarh.png', 'Saraswati_College_of_Engineering.png',
  'Gandhinagar_Institute_of_Technology.png', 'Indraprastha_Institute_of_Management_Technology,_Saharanpur.png', 'bit_bhilai.png',
  'Rajarshi_sxh.png', '02.png'
];

const alliedColleges = alliedImages.map(img => {
   // Format the name nicely from the filename
   let name = img.replace(/_[a-z0-9]+_/gi, ' ').replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace(/logo/gi, "").trim();
   return {
      name: name,
      img: 'https://www.theiscale.com/myadmin/uploads/more/' + img
   };
});

let alliedCode = fs.readFileSync('src/pages/AlliedCollegesPage.js', 'utf8');
alliedCode = alliedCode.replace(/const colleges = \[[\s\S]*?\];/, `const colleges = ${JSON.stringify(alliedColleges, null, 2)};`);

// Also revert the UI to use the image!
alliedCode = alliedCode.replace(/{college\.img \? \([\s\S]*?\) : \([\s\S]*?\)}/g, 
`{college.img && (
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, width: '100%' }}>
    <img src={college.img} alt={college.name} style={{ maxWidth: '90%', maxHeight: 90, objectFit: 'contain' }} />
  </div>
)}
<h3 style={{ fontSize: 13, fontWeight: 700, color: '#222', marginTop: 'auto', lineHeight: 1.4, padding: '0 10px' }}>
  {college.name}
</h3>`);

fs.writeFileSync('src/pages/AlliedCollegesPage.js', alliedCode);
console.log("Files updated!");
