import React, { useState, useEffect } from "react";
import Navbar from "../Navber/Navber";
import Footer from "../Footer/Footer";
import { FaTrophy, FaClock, FaChevronLeft, FaChevronRight, FaListOl, FaQuestionCircle, FaCheckCircle, FaBolt,} from "react-icons/fa";
import "./competitions.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Competitions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("major");
  const [data, setData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchContent();
  }, [activeTab]);

  const fetchContent = async () => {
    setLoading(true);
    setCurrentStep(0);
    setResult(null);
    setAlreadyPlayed(false);
    setData(null);

    try {
      const endpoint =
        activeTab === "major" ? "competitions" : "questions/daily";

      const res = await fetch(
        `https://final-project-tan-alpha.vercel.app/api/${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const responseData = await res.json();

      if (responseData === null) {
        setAlreadyPlayed(true);
        return;
      }

      let normalizedData = null;

      if (activeTab === "major") {
        const comp = Array.isArray(responseData)
          ? responseData[0]
          : responseData;

        if (comp?.questions?.length) {
          normalizedData = comp;
        }
      } else {
        if (responseData?.title) {
          normalizedData = {
            _id: responseData._id,
            questions: [
              {
                questionText: responseData.title,
                options: responseData.options,
              },
            ],
          };
        }
      }

      if (normalizedData?.questions?.length > 0) {
        setData(normalizedData);
        setUserAnswers(Array(normalizedData.questions.length).fill(""));
      } else {
        setAlreadyPlayed(true);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setAlreadyPlayed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (option) => {
    const updated = [...userAnswers];
    updated[currentStep] = option;
    setUserAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentStep < data.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitChallenge = async () => {
    try {
      const submitUrl =
        activeTab === "major"
          ? `https://final-project-tan-alpha.vercel.app/api/competitions/${data._id}/submit`
          : `https://final-project-tan-alpha.vercel.app/api/questions/${data._id}/submit`;

      const res = await fetch(submitUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAnswers: activeTab === "major" ? userAnswers : userAnswers[0],
        }),
      });

      const resultData = await res.json();

      if (res.ok) {
        setResult(resultData);

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              points: resultData.userPoints,
              level: resultData.userLevel,
            })
          );
          window.dispatchEvent(new Event("storage"));
        }
      } else {
        setAlreadyPlayed(true);
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="comp-page">
        <section className="comp-hero">
          <div className="hero-left">
            <span className="hero-badge">⚡ Challenge Zone</span>
            <h1>{t("competitions.competitions_title")}</h1>
            <p>{t("competitions.hero_desc")}</p>
            <button
              className="leaderboard-btn"
              onClick={() => navigate("/leaderboard")}
            >
              <FaListOl />
              {t("competitions.leaderboard_btn")}
            </button>
          </div>

          <div className="hero-stats">
            <div className="mini-card">
              <FaBolt />
              <span>{t("competitions.bonus_xp")}</span>
            </div>
            <div className="mini-card">
              <FaTrophy />
              <span>{t("competitions.weekly_rank")}</span>
            </div>
          </div>
        </section>

        {/* TABS CONTROL */}
        <div className="tabs-box">
          <button
            className={`tab-btn ${activeTab === "major" ? "active" : ""}`}
            onClick={() => setActiveTab("major")}
          >
            <FaTrophy />
            {t("competitions.tab_competitions")}
          </button>

          <button
            className={`tab-btn ${activeTab === "daily" ? "active" : ""}`}
            onClick={() => setActiveTab("daily")}
          >
            <FaQuestionCircle />
            {t("competitions.tab_daily")}
          </button>
        </div>

        {loading ? (
          <div className="loading-box">
            <div className="loader"></div>
            <p>{t("competitions.loading_comp")}</p>
          </div>
        ) : result ? (
          <div className="result-card">
            <FaCheckCircle className="success-icon" />
            <h2>
              {result.message?.includes("اشطر كتكوت") || result.message?.includes("احسنت") || result.message?.includes("صحيحة")
                ? t("competitions.correct_answer_msg") 
                : result.message?.includes("خاطئة") || result.message?.includes("خطأ") || result.message?.includes("خاطئه")
                ? t("competitions.wrong_answer_msg") 
                : result.message || t("competitions.success_default")}
            </h2>
            <div className="stats-grid">
              <div>
                <span>{t("competitions.score")}</span>
                <strong>{result.score}</strong>
              </div>
              <div>
                <span>{t("competitions.total_points")}</span>
                <strong>{result.userPoints}</strong>
              </div>
              <div>
                <span>{t("competitions.current_level")}</span>
                <strong>{result.userLevel}</strong>
              </div>
            </div>
          </div>
        ) : alreadyPlayed ? (
          <div className="result-card">
            <FaClock className="success-icon" style={{ color: "#f39c12" }} />
            {activeTab === "daily" ? (
              <>
                <h2>{t("competitions.daily_done_title")}</h2>
                <p>{t("competitions.daily_done_desc")}</p>
              </>
            ) : (
              <>
                <h2>{t("competitions.major_done_title")}</h2>
                <p>{t("competitions.major_done_desc")}</p>
              </>
            )}
          </div>
        ) : data?.questions ? (
          <div className="quiz-card">
            <div className="progress-head">
              <span>
                {t("competitions.question")} {currentStep + 1} {t("competitions.of")}{" "}
                {data.questions.length}
              </span>
              <div className="progress-bar">
                <div
                  className="fill"
                  style={{
                    width: `${((currentStep + 1) / data.questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <h3 className="question-title fixed-rtl">
              {data.questions[currentStep].questionText}
            </h3>
            <div className="options-list fixed-rtl">
              {data.questions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    userAnswers[currentStep] === option ? "selected" : ""
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="actions">
              {data.questions.length > 1 && (
                <button onClick={prevQuestion} disabled={currentStep === 0}>
                  <FaChevronLeft />
                </button>
              )}
              {currentStep === data.questions.length - 1 ? (
                <button
                  className="submit-btn"
                  disabled={!userAnswers[currentStep]}
                  onClick={submitChallenge}
                >
                  {t("competitions.finish_challenge")}
                </button>
              ) : (
                data.questions.length > 1 && (
                  <button onClick={nextQuestion} disabled={!userAnswers[currentStep]}>
                    <FaChevronRight />
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="result-card">
            <h2>{t("competitions.no_data")}</h2>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Competitions;