import React, { useEffect } from 'react';
import './aboutus.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { useTranslation, Trans } from "react-i18next";
import uniLogo from "../../assets/images/university-logo.jpg";
import Doctor from "../../assets/images/Dr.jpeg";
import member1 from '../../assets/images/Basmala.jpeg';
import member2 from '../../assets/images/Dina.jpeg';
import member3 from '../../assets/images/Doaa.jpeg';
import member4 from '../../assets/images/Rahma.jpeg';
import member5 from '../../assets/images/Rawan.jpeg';
import member6 from '../../assets/images/Reda.jpeg';
import member7 from '../../assets/images/Sondos.jpeg';
import member8 from '../../assets/images/SondosT.jpeg';
import member9 from '../../assets/images/Tasneem.jpeg';
import member10 from '../../assets/images/Malak.jpeg';
import member11 from '../../assets/images/Nada.jpeg';


export default function About() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out-cubic',
      once: true,
    });
  }, []);

  const team = [
    { name: 'Dina AbdAllah', role: 'Team Lead & Backend Developer', img: member2, email: 'da1996@fayoum.edu.eg', linkedin: 'https://www.linkedin.com/in/dina-abdallah23' },
    { name: 'Sondos Tarek', role: 'Backend Developer', img: member8, email: 'st1321@fayoum.edu.eg', linkedin: 'https://www.linkedin.com/in/sondos-tarek28'  },
    { name: 'Sondos Gharib', role: 'Backend Developer', img: member7, email: 'sondosgharib22@gmail.com', linkedin: 'https://www.linkedin.com/in/sondos-gharib-2563963a4'  },
    { name: 'Malak Amr', role: 'Backend Developer', img: member10, email: 'ma6754@fayoum.edu.eg', linkedin: 'https://www.linkedin.com/in/mallk-amr-mahmoud-musa-3321693bb/'  },
    { name: 'Nada Ramadan', role: 'Data Base', img: member11, email: 'nr1470@fayoum.edu.eg', linkedin: 'https://www.linkedin.com/in/nada-ramadan-sawi-muhammad-3a00a43bb?utm_source=share_via&utm_content=profile&utm_medium=member_android'  },
    { name: 'Tasneem Ramadan', role: 'Data Base', img: member9, email: 'tr1182@fayoum.edu.eg', linkedin: 'https://www.linkedin.com/in/tasneem-ramadan-mohammad-abo-zeed-778b02407?utm_source=share_via&utm_content=profile&utm_medium=member_android'  },
    { name: 'Doaa Hany', role: 'UI/UX Designer', img: member3, email: 'doaahany751@gmail.com', linkedin: 'https://www.linkedin.com/in/doaa-hany-75606b3bb?utm_source=share_via&utm_content=profile&utm_medium=member_android'  },
    { name: 'Rawan Yasser', role: 'UI/UX Designer', img: member5, email: 'yrawan497@gmail.com', linkedin: 'https://www.linkedin.com/in/rawan-yasser-687061377?utm_source=share_via&utm_content=profile&utm_medium=member_android'  },
    { name: 'Rahma Mahmoud', role: 'Frontend Developer', img: member4, email: 'eng.rahma123salem@gmail.com', linkedin: 'https://www.linkedin.com/in/rahoma-mahmoud-16b9bb3ba?utm_source=share_via&utm_content=profile&utm_medium=member_android'  },
    { name: 'Basmala Mohamed', role: 'Frontend Developer', img: member1, email: 'bm1435@fayoum.edu.eg', linkedin: 'https://www.linkedin.com/in/basmala-mohamed17/' },
    { name: 'Reda Ahmed', role: 'Frontend Developer', img: member6, email: 'ra2521@fayoum.edu.eg', linkedin: 'https://www.linkedin.com/in/reda-ahmed-02729a283'  },
  ];

  return (
    <>
      <Navbar />
      <section className="about-hero" data-aos="fade-down">
        <h1 className={`typing-title ${i18n.language === "ar" ? "ar" : ""}`}>{t("about.title")}</h1>
        <p className="hero-subtitle">
          <Trans
            i18nKey="about.desc"
            components={{ span: <span /> }}
          />      
        </p>
      </section>
      <section className="university-section" data-aos="fade-up">
            <div className="university-container">
                <div className="uni-box">
                    <div className="uni-header">
                        <img src={uniLogo} alt="University Logo" className="uni-logo" />
                        <div>
                          <h2>{t("about.university.name")}</h2>
                          <h3>{t("about.university.faculty")}</h3>
                        </div>
                    </div>
                    <p>{t("about.university.desc")}</p>
                </div>
                <div className="uni-box">
                    <div className="uni-header">
                        <img src={Doctor} alt="imageDr" className="uni-logo imageDr" />
                        <div>
                            <h2>{t("about.supervisor.title")}</h2>
                            <h3>{t("about.supervisor.name")}</h3>
                        </div>
                    </div>
                    <p>{t("about.supervisor.desc")}</p>
                </div>

            </div>
        </section>
      <section className="team-section">
        <div className="team-header">
          <span className="badge">{t("about.team.badge")}</span>
          <h2>{t("about.team.title")}</h2>
        </div>
        <div className="team-grid">
            {team.map((member, idx) => (
            <div
            className="team-card"
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            >
            <div className="image-wrapper">
                <img src={member.img} alt={member.name} />
            </div>
            <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="social-icons">
                    <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-circle"
                        >
                        <FaEnvelope />
                    </a>
                    <a href={member.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="icon-circle">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </div>
  ))}
        </div>
      </section>

      <Footer />
    </>
  );
}