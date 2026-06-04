import React, { useState, useEffect } from 'react';
import './navber.css';
import { useNavigate } from "react-router-dom";
import Switch from './Switch';
import Checkbox from './Checkbox';
import LanguageSwitch from './LanguageSwitch';
import logoImg from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import level1 from '../../assets/images/level1.png';
import level2 from '../../assets/images/level2.png';
import level3 from '../../assets/images/level3.png';
import level4 from '../../assets/images/level4.png';
import level5 from '../../assets/images/level5.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  const levelAvatars = {
    initiate: level1,
    explorer: level2,
    innovator: level3,
    leader: level4,
    inspider: level5
  };

  const getDynamicAvatar = (points) => {
    const p = points || 0;
    if (p >= 200) return levelAvatars.inspider;
    if (p >= 150) return levelAvatars.leader;
    if (p >= 100) return levelAvatars.innovator;
    if (p >= 50) return levelAvatars.explorer;
    return levelAvatars.initiate;
  };

  const fetchNavbarProfile = async (token) => {
    try {
      const response = await fetch(
        "https://final-project-tan-alpha.vercel.app/api/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.ok) {
        const actualData = await response.json();
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        
        // 💡 التعديل السحري: دمج كائن الـ user القديم بالكامل مع البيانات الجديدة دون مسح أي حقول فرعية تهم الصفحات الأخرى
        const updatedUser = {
          ...storedUser, // الإبقاء على كافة البيانات المرجوعة من الساين أب أو الجوجل
          ...(actualData.user || actualData), // دمج بيانات البروفايل المسترجعة سواء كانت داخل حقل user أو مباشرة
          username: actualData.username || actualData.name || actualData.user?.username || storedUser.username || "User",
          points: actualData.points || actualData.user?.points || 0,
          profilePic: actualData.profilePic || actualData.user?.profilePic || getDynamicAvatar(actualData.points || actualData.user?.points),
          token: token
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Error fetching navbar user data:", err);
    }
  };

  useEffect(() => {
    const handleUserUpdate = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token"); 

      if (storedUser) {
        const token = storedUser.token || storedUser.data?.token || storedUser.user?.token || storedToken;
        if (token) {
          fetchNavbarProfile(token);
        } else {
          setUser(storedUser);
        }
      } else if (storedToken) {
        fetchNavbarProfile(storedToken);
      } else {
        setUser(null);
      }
    };

    handleUserUpdate();

    window.addEventListener("storage", handleUserUpdate);
    window.addEventListener("userUpdated", handleUserUpdate); 
    return () => {
      window.removeEventListener("storage", handleUserUpdate);
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, i18n.language]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    navigate("/login");
  };

  const handleNavigation = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo">
          <img src={logoImg} alt='Logo' className='logo-img' />
        </Link>
        <Link to="/" className="logo">Uni Tech</Link>
      </div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li onClick={() => navigate("/")}>{t("navbar.home")}</li>
        <li onClick={() => handleNavigation("/competitions")}>{t("navbar.competitions")}</li>
        <li onClick={() => handleNavigation("/posts")}>{t("navbar.posts")}</li>
        <li onClick={() => handleNavigation("/aiTools")}>{t("navbar.ai")}</li>
        <li onClick={() => navigate("/about")}>{t("navbar.about")}</li>
        <li onClick={() => navigate("/contact")}>{t("navbar.contact")}</li>

        <div className="mobile-controls">
          <Switch dark={dark} toggleTheme={() => setDark(!dark)} />
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
      </ul>

      <div className="nav-right">
        {user ? (
          <div className="profile-container">
            <img
              src={
                user?.profilePic && !user?.profilePic.includes("level") 
                  ? user.profilePic 
                  : getDynamicAvatar(user?.points)
              }
              alt="profile"
              className="profile-img"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="dropdown">
                <p onClick={() => navigate("/profile")}>{t("navbar.profile")}</p>
                <p onClick={handleLogout}>{t("navbar.logout")}</p>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            {t("navbar.login")}
          </button>
        )}

        <div className="desktop-controls">
          <Switch dark={dark} toggleTheme={() => setDark(!dark)} />
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>

        <Checkbox className="menu-btn" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      </div>
    </nav>
  );
};

export default Navbar;