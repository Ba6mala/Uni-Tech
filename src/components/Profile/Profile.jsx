import React, { useState, useEffect } from 'react';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { FaStar, FaUserAstronaut, FaFlag, FaMedal } from 'react-icons/fa';
import './profile.css';
import gamificationBanner from '../../assets/images/bgPro.png';
import level1 from '../../assets/images/level1.png';
import level2 from '../../assets/images/level2.png';
import level3 from '../../assets/images/level3.png';
import level4 from '../../assets/images/level4.png';
import level5 from '../../assets/images/level5.png';

import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const POINTS_PER_LEVEL = 50; 
  const TOTAL_LEVELS = 5;
  const MAX_POINTS = POINTS_PER_LEVEL * TOTAL_LEVELS; 

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

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const storedUser = localStorage.getItem("user");
      let token = "";

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          token = parsed.token || parsed.data?.token || parsed.user?.token;
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      }

      if (!token) {
        setLoading(false);
        return;
      }

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
          
          const updatedUser = {
            username: actualData.username || actualData.name || "User",
            points: actualData.points || 0,
            medals: actualData.medals || [],
            profilePic: actualData.profilePic || getDynamicAvatar(actualData.points)
          };

          setUserData(updatedUser);
          localStorage.setItem("user", JSON.stringify({ ...updatedUser, token }));
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const levels = [
    { name: t("profile.initiate"), icon: levelAvatars.initiate },
    { name: t("profile.explorer"), icon: levelAvatars.explorer },
    { name: t("profile.innovator"), icon: levelAvatars.innovator },
    { name: t("profile.leader"), icon: levelAvatars.leader },
    { name: t("profile.inspider"), icon: levelAvatars.inspider }
  ];

  if (loading) return <div className="loading-container">Loading...</div>;
  if (!userData) return <div className="error-container">Please Login Again</div>;

  const progressPercentage = Math.min((userData.points / MAX_POINTS) * 100, 100);

  const getTranslatedMedal = (medalName) => {
    if (!medalName) return "";

    const match = medalName.match(/\d+/); 
    
    if (match) {
      const quizNumber = match[0]; 
      const translationKey = `medals.quiz_${quizNumber}`; 
      
      const translated = t(translationKey);
      if (translated !== translationKey) {
        return translated;
      }
    }

    return medalName;
  };

  return (
    <>
      <Navbar />
      <div className= "profile-page-wrapper">
        <section className="profile-hero-header">
          <div className="gamification-banner">
            <img src={gamificationBanner} alt="Banner" className="banner-img" />
            <div className="banner-overlay"></div>
          </div>

          <div className="profile-identity-card">
            <div className="avatar-container">
              <img src={userData.profilePic} alt="Profile" />
            </div>
            <div className="user-info-row">
              <h2 className="user-name-text">{userData.username}</h2>
              <div className="user-points-badge">
                <span>{userData.points}</span>
                <FaStar className="gold-star" />
              </div>
            </div>
          </div>
        </section>

        <div className="profile-main-body">
          {/* شريط التقدم */}
          <section className="progress-section-container" style={{ direction: "ltr" }}>
            <p className="percentage-text">
              {userData.points} / {MAX_POINTS} {t("profile.completed")} ({Math.round(progressPercentage)}%)
            </p>
            <div className="progress-track-bar">
              <div
                className="progress-fill-active"
                style={{ width: `${progressPercentage}%` }}
              >
                <FaUserAstronaut className="walking-avatar" />
              </div>
              <FaFlag className="finish-line-flag" />
            </div>
          </section>

          {/* عرض المستويات بناءً على 50 نقطة لكل مستوى */}
          <section className="levels-display-area">
            <h3 className="section-main-title">{t("profile.levels")}</h3>
            <div className="levels-grid-layout">
              {levels.map((lvl, index) => {
                const isUnlocked = userData.points >= (index * POINTS_PER_LEVEL);
                return (
                  <div key={index} className={`level-box-item ${isUnlocked ? 'unlocked' : 'locked'}`}>
                    <div className="level-icon-circle">
                      <img src={lvl.icon} alt={lvl.name} />
                    </div>
                    <p className="level-name-label">{lvl.name}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* الميداليات */}
          <section className="medals-display-area">
            <h3 className="section-main-title">{t("profile.medals")}</h3>
            <div className="medals-container-box">
              {userData.medals && userData.medals.length > 0 ? (
                userData.medals.map((medal, i) => (
                  <div key={i} className="medal-card-item">
                    <div className="medal-icon-wrapper">
                      <FaMedal className="medal-active-icon" style={{ color: '#FFD700', fontSize: '2rem' }} />
                    </div>
                    <p className="medal-text">{getTranslatedMedal(medal)}</p> 
                  </div>
                ))
              ) : (
                <div className="no-medals-placeholder">
                  <FaMedal className="empty-medal-icon" />
                  <p>{t("profile.keepTraining")}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;