import React from 'react';
import { useEffect } from 'react';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import './home.css';
import img1 from "../../assets/images/Futuristic office with holographic teamwork visuals.png";
import img2 from "../../assets/images/login2.jpeg";
import img3 from "../../assets/images/login3.jpeg";
import img4 from "../../assets/images/imgPost.png";
import Spline from '@splinetool/react-spline';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";


export default function Home() {
  const { t, i18n } = useTranslation();
  const pages = [
    { img: img3, title: t("pages.competitions.title"), desc: t("pages.competitions.desc"), route: "/competitions" },
    { img: img4, title: t("pages.posts.title"), desc: t("pages.posts.desc"), route: "/posts" },
    { img: img2, title: t("pages.ai.title"), desc: t("pages.ai.desc"), route: "/aiTools" },
    { img: img1, title: t("pages.about.title"), desc: t("pages.about.desc"), route: "/about" },
  ];
  const navigate = useNavigate();
    useEffect(() => {
    AOS.init({
      duration: 1200, 
      easing: 'ease-in-out-cubic', 
      once: false, 
    });
  }, []);

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const handleNavigate = (path) => {
    if (isLoggedIn()) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <main className="home">
        <Navbar />
        <section className="hero">
          <div className="hero-text">
            <h1 data-aos="fade-down" data-aos-delay="200">
              <Trans
                i18nKey="heroTitle"
                components={{ span: <span /> }}
              />
            </h1>
            <p className="subtitle" data-aos="fade-up" data-aos-delay="400">
              {t("subtitle")}
            </p>
            <p className="desc" data-aos="fade-up" data-aos-delay="600">
              {t("desc")}
            </p>
            <div className="buttons" data-aos="zoom-in" data-aos-delay="800">
              <button className="primary" onClick={() => handleNavigate("/posts")}>{t("getStarted")}</button>
              <button className="secondary" onClick={() => handleNavigate("/about")}>{t("learnMore")}</button>
            </div>
          </div>
          <div className="hero-robot" data-aos="fade-left" data-aos-delay="1000">
            <Spline scene="https://prod.spline.design/t5zJ6bbmapnVFp1M/scene.splinecode" />
          </div>
        </section>
      </main>
      <section className="what-we-do" data-aos="fade-up" data-aos-duration="1200">
        <h2 className={`typing-title ${i18n.language === "ar" ? "ar" : ""}`} data-aos="fade-up">{t("whatWeDo")}</h2>
        <p className="section-subtitle">
          {t("whatWeDoDesc")}
        </p>
        <div className="services">
          <div className="service-card">
            <div className="icon">🤖</div>
            <h3>{t("services.aiLearning.title")}</h3>
            <p>{t("services.aiLearning.desc")}</p>
          </div>
          <div className="service-card">
            <div className="icon">🏆</div>
            <h3>{t("services.competitions.title")}</h3>
            <p>{t("services.competitions.desc")}</p>
          </div>
          <div className="service-card">
            <div className="icon">🧠</div>
            <h3>{t("services.knowledge.title")}</h3>
            <p>{t("services.knowledge.desc")}</p>
          </div>
          <div className="service-card">
            <div className="icon">⚡</div>
            <h3>{t("services.tools.title")}</h3>
            <p>{t("services.tools.desc")}</p>
          </div>
        </div>
      </section>
      <section className='about-pages'>
        {pages.map((page, idx) => (
          <div 
            className={`page-card ${idx % 2 !== 0 ? 'reverse' : ''}`} 
            key={idx}
            data-aos="fade-up" 
            data-aos-delay={idx * 100} 
          >
            <div className='card-image' data-aos="zoom-in" data-aos-delay="300">
              <img src={page.img} alt={page.title} />
            </div>
            
            <div className='card-content' data-aos="fade-left" data-aos-delay="500">
              <h3 className='card-title'>{page.title}</h3>
              <p className='card-description'>{page.desc}</p>
              <button className="card-btn" onClick={() => handleNavigate(page.route)}>
                {t("readMore")} <FaArrowRight className="arrow-icon" />
              </button>
            </div>
          </div>
        ))}
      </section>
      <section className="ready" data-aos="zoom-in">
        <div className="card">
          <div className='border-layer'></div>
          <div className="card-text">
            <h1>{t("ready")}</h1>
            <button onClick={() => handleNavigate("/competitions")}>{t("start")}</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}