import React from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleNavigation = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Uni Tech</h2>
          <p>{t("footer.desc")}</p>
        </div>

        <div className="footer-links">
          <h4>{t("footer.quickLinks")}</h4>
          <ul>
            <li onClick={() => navigate("/")}>
              {t("navbar.home")}
            </li>

            <li onClick={() => handleNavigation("/competitions")}>
              {t("navbar.competitions")}
            </li>

            <li onClick={() => handleNavigation("/posts")}>
              {t("navbar.posts")}
            </li>

            <li onClick={() => handleNavigation("/aiTools")}>
              {t("navbar.ai")}
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>{t("footer.follow")}</h4>
          <div className="icons">
            <a href="https://www.facebook.com/share/1DrfDvmgoP/"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Uni Tech. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}