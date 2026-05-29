import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import {
  FaCrown,
  FaStar,
  FaMedal,
  FaFire,
} from "react-icons/fa";
import Navbar from "../Navber/Navber";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const Leaderboard = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const API_URL =
    "https://final-project-tan-alpha.vercel.app/api/users/leaderboard";

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard =
    async () => {
      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await fetch(
            API_URL,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (!res.ok) {
          throw new Error(
            t(
              "leaderboard.fetchError"
            )
          );
        }

        const data =
          await res.json();

        setUsers(
          data.top10 || []
        );
      } catch (err) {
        setError(
          err.message
        );
      } finally {
        setLoading(false);
      }
    };

  const sortedUsers = [
    ...users,
  ].sort(
    (a, b) =>
      (b.points || 0) -
      (a.points || 0)
  );

  const topThree =
    sortedUsers.slice(
      0,
      3
    );

  const others =
    sortedUsers.slice(
      3
    );

  const podiumOrder = [
    topThree[1],
    topThree[0],
    topThree[2],
  ].filter(Boolean);

  const getMedal = (
    rank
  ) =>
    rank === 1
      ? "🥇"
      : rank === 2
      ? "🥈"
      : "🥉";

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="leaderboard-page center-box">
          <div className="loader"></div>
          <p>
            {t(
              "leaderboard.loading"
            )}
          </p>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="leaderboard-page">
        {/* HERO */}
        <section className="leaderboard-hero">
          <div>
            <span className="hero-badge">
              <FaFire />
              TOP PLAYERS
            </span>

            <h1>
              <FaCrown />
              {t(
                "leaderboard.title"
              )}
            </h1>

            <p>
              تنافس مع
              أفضل اللاعبين
              واجمع النقاط
              للوصول
              إلى القمة
            </p>
          </div>
        </section>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        {/* TOP 3 */}
        <section className="podium-section">
          {podiumOrder.map(
            (user) => {
              const rank =
                sortedUsers.findIndex(
                  (
                    u
                  ) =>
                    u._id ===
                    user._id
                ) + 1;

              return (
                <div
                  key={
                    user._id
                  }
                  className={`podium-card rank-${rank}`}
                >
                  <div className="avatar-wrapper">
                    <img
                      src={
                        user.profilePic ||
                        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                      }
                      alt={
                        user.username
                      }
                      className="avatar"
                    />

                    <span className="rank-badge">
                      {rank}
                    </span>
                  </div>

                  <h3>
                    {
                      user.username
                    }
                  </h3>

                  <div className="stats-box">
                    <div className="medal-icon">
                      {getMedal(
                        rank
                      )}
                    </div>

                    <h2>
                      {user.points ||
                        0}
                    </h2>

                    <p>
                      XP
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </section>

        {/* TABLE */}
        <section className="ranking-table">
          <div className="table-header">
            <span>
              {t(
                "leaderboard.user"
              )}
            </span>

            <span>
              {t(
                "leaderboard.rank"
              )}
            </span>

            <span>
              {t(
                "leaderboard.points"
              )}
            </span>
          </div>

          <div className="others-list">
            {others.map(
              (
                user,
                index
              ) => (
                <div
                  key={
                    user._id ||
                    index
                  }
                  className="list-row"
                >
                  <div className="user-col">
                    <img
                      src={
                        user.profilePic ||
                        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                      }
                      alt=""
                      className="small-avatar"
                    />

                    <span>
                      {
                        user.username
                      }
                    </span>
                  </div>

                  <span className="rank-num">
                    #
                    {index +
                      4}
                  </span>

                  <span className="reward-val">
                    <FaStar />
                    {user.points ||
                      0}
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        {!users.length && (
          <div className="no-data">
            {t(
              "leaderboard.noData"
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Leaderboard;