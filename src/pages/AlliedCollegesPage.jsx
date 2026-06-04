import React, { useEffect } from 'react';

const colleges = [
  {
    "name": "Mandsaur University",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Mandsaur_University.png"
  },
  {
    "name": "Silver University",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Silver_Oak_University.png"
  },
  {
    "name": "Lokmanya College Engineering , Mumbai",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Lokmanya_Tilak_College_of_Engineering_,_Navi_Mumbai_logo.png"
  },
  {
    "name": "Rajkiya College Nagar",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Rajkiya_Engineering_College_Ambedkar_Nagar.png"
  },
  {
    "name": "MGMs of and",
    "img": "https://www.theiscale.com/myadmin/uploads/more/MGMs_College_of_Engineering_and_Technology_logo.png"
  },
  {
    "name": "D Sanghvi of Engineering, Mumbai",
    "img": "https://www.theiscale.com/myadmin/uploads/more/D_J_Sanghvi_College_of_Engineering,_Mumbai.png"
  },
  {
    "name": "HRIT of Institutions",
    "img": "https://www.theiscale.com/myadmin/uploads/more/HRIT_Group_of_Institutions.png"
  },
  {
    "name": "medicaps",
    "img": "https://www.theiscale.com/myadmin/uploads/more/medicaps_logo.png"
  },
  {
    "name": "Adamas University",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Adamas_University.png"
  },
  {
    "name": "mvsr",
    "img": "https://www.theiscale.com/myadmin/uploads/more/mvsr.jpg"
  },
  {
    "name": "VIT",
    "img": "https://www.theiscale.com/myadmin/uploads/more/VIT_nagpur_logo.png"
  },
  {
    "name": "IPS Academy",
    "img": "https://www.theiscale.com/myadmin/uploads/more/IPS_Academy.png"
  },
  {
    "name": "ISBM of Pune",
    "img": "https://www.theiscale.com/myadmin/uploads/more/ISBM_College_of_Engineering_Pune_logo.png"
  },
  {
    "name": "C   of Technology, Deori",
    "img": "https://www.theiscale.com/myadmin/uploads/more/C__S__Institute_of_Technology,_Deori.png"
  },
  {
    "name": "MIT",
    "img": "https://www.theiscale.com/myadmin/uploads/more/MIT_pune_logo.png"
  },
  {
    "name": "Samrat Technological Institute",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Samrat_Ashok_Technological_Institute.png"
  },
  {
    "name": "Rajiv College Engineering Research, Nagpur",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Rajiv_Gandhi_College_of_Engineering_Research,_Nagpur.png"
  },
  {
    "name": "iit dhanbad",
    "img": "https://www.theiscale.com/myadmin/uploads/more/iit_dhanbad.png"
  },
  {
    "name": "Techno and Downtown University",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Techno_India_and_Assam_Downtown_University.png"
  },
  {
    "name": "IMS College, Ghaziabad",
    "img": "https://www.theiscale.com/myadmin/uploads/more/IMS_Engineering_College,_Ghaziabad.png"
  },
  {
    "name": "Institute Engineering Technology",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Institute_of_Engineering_Technology.png"
  },
  {
    "name": "Malwa of Technologyy",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Malwa_Institute_of_Technologyy.png"
  },
  {
    "name": "Joginpally Engineering College",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Joginpally_BR_Engineering_College.png"
  },
  {
    "name": "Megha Group Institutions",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Megha_Omega_Group_Of_Institutions.png"
  },
  {
    "name": "Deccan of Institutions",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Deccan_group_of_Institutions.png"
  },
  {
    "name": "BVBs Patel of",
    "img": "https://www.theiscale.com/myadmin/uploads/more/BVBs_Sardar_Patel_College_of_Engineering_logo.png"
  },
  {
    "name": "Aliah",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Aliah_University_Logo.png"
  },
  {
    "name": "BIET Jhansi",
    "img": "https://www.theiscale.com/myadmin/uploads/more/BIET_Jhansi.png"
  },
  {
    "name": "C Pithawala of Technology",
    "img": "https://www.theiscale.com/myadmin/uploads/more/C_K_Pithawala_College_of_Engineering_Technology.png"
  },
  {
    "name": "ACHARYA OF TECHNOLOGY",
    "img": "https://www.theiscale.com/myadmin/uploads/more/ACHARYA_INSTITUTE_OF_TECHNOLOGY.png"
  },
  {
    "name": "B  OF TECHNOLOGY",
    "img": "https://www.theiscale.com/myadmin/uploads/more/B_M__INSTITUTE_OF_ENGINEERING_TECHNOLOGY.png"
  },
  {
    "name": "Raja Singh Technical Campus",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Raja_Balwant_Singh_Management_Technical_Campus.png"
  },
  {
    "name": "Yadavindra of Engineering, Sabo",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Yadavindra_College_of_Engineering,_Talwandi_Sabo.png"
  },
  {
    "name": "Patel of Institutions",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Patel_Group_of_Institutions.png"
  },
  {
    "name": "RBMI",
    "img": "https://www.theiscale.com/myadmin/uploads/more/RBMI.png"
  },
  {
    "name": "DAYANANDA INSTITUTIONS",
    "img": "https://www.theiscale.com/myadmin/uploads/more/DAYANANDA_SAGAR_INSTITUTIONS.png"
  },
  {
    "name": "Chhatrapati institute technology",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Chhatrapati_shivaji_institute_of_technology.png"
  },
  {
    "name": "CT of Institute",
    "img": "https://www.theiscale.com/myadmin/uploads/more/CT_Group_of_Institute.png"
  },
  {
    "name": "iNurture - partner Downtown University",
    "img": "https://www.theiscale.com/myadmin/uploads/more/iNurture_Education_-_Placement_partner_Assam_Downtown_University.png"
  },
  {
    "name": "RITEE Of Institutes",
    "img": "https://www.theiscale.com/myadmin/uploads/more/RITEE_Group_Of_Institutes.png"
  },
  {
    "name": "School Computer and IT, DAVV",
    "img": "https://www.theiscale.com/myadmin/uploads/more/School_of_Computer_Science_and_IT,_DAVV.png"
  },
  {
    "name": "The University",
    "img": "https://www.theiscale.com/myadmin/uploads/more/The_Neotia_University.png"
  },
  {
    "name": "DPG OF AND MANAGEMENT",
    "img": "https://www.theiscale.com/myadmin/uploads/more/DPG_INSTITUTE_OF_TECHNOLOGY_AND_MANAGEMENT.png"
  },
  {
    "name": "Priyadarshini L Of Nagpur",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Priyadarshini_J_L_College_Of_Engineering_Nagpur.png"
  },
  {
    "name": "Neelam Of  Technology",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Neelam_College_Of_Engg__Technology.png"
  },
  {
    "name": "Krishna of Institutions, Kanpur",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Krishna_Group_of_Institutions,_Kanpur.png"
  },
  {
    "name": "Vadodara of engineering2",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Vadodara_institute_of_engineering2.png"
  },
  {
    "name": "Chaitanya Institute Technology",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Chaitanya_Bharathi_Institute_of_Technology.png"
  },
  {
    "name": "Vivekananda of and nada sarsol Aligarh",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Vivekananda_College_of_Technology_and_Management_nada_pul_sarsol_Aligarh.png"
  },
  {
    "name": "Saraswati of Engineering",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Saraswati_College_of_Engineering.png"
  },
  {
    "name": "Gandhinagar of Technology",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Gandhinagar_Institute_of_Technology.png"
  },
  {
    "name": "Indraprastha of Technology, Saharanpur",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Indraprastha_Institute_of_Management_Technology,_Saharanpur.png"
  },
  {
    "name": "bit bhilai",
    "img": "https://www.theiscale.com/myadmin/uploads/more/bit_bhilai.png"
  },
  {
    "name": "Rajarshi sxh",
    "img": "https://www.theiscale.com/myadmin/uploads/more/Rajarshi_sxh.png"
  },
  {
    "name": "02",
    "img": "https://www.theiscale.com/myadmin/uploads/more/02.png"
  }
];

const AlliedCollegesPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  return (
    <div className="bg-dots" style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingBottom: 80, color: 'var(--text-primary)' }}>
      {/* Header Banner */}
      <div style={{ 
        height: 240, 
        background: 'var(--gradient-hero)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Banner" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }}
        />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Allied Colleges</h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>
             Home <span style={{ margin: '0 6px' }}>›</span> Allied Colleges
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {colleges.map((college, idx) => (
            <div key={idx} className="premium-card hover-glow" style={{
              background: 'var(--card-bg)', borderRadius: 12, padding: '24px 16px 16px', 
              textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--card-shadow)', border: '1px solid var(--border-color)',
              cursor: 'pointer', height: 200
            }}>
              {college.img && (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, width: '100%', filter: 'brightness(var(--theme-logo-brightness, 1))' }}>
                  <img src={college.img} alt={college.name} style={{ maxWidth: '90%', maxHeight: 90, objectFit: 'contain' }} />
                </div>
              )}
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 'auto', lineHeight: 1.4, padding: '0 10px' }}>
                {college.name}
              </h3>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default AlliedCollegesPage;
