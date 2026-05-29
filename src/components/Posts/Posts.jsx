import React, { useState, useEffect } from 'react';
import Navbar from '../Navber/Navber';
import Footer from '../Footer/Footer';
import { FaCopy, FaUserCircle } from "react-icons/fa";
import './posts.css';
import Like from "./Like";
import { useTranslation } from "react-i18next";

const Posts = () => {
  const { t } = useTranslation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [expandedPosts, setExpandedPosts] = useState({});

  // ✅ جلب البوستات
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://final-project-tan-alpha.vercel.app/api/posts",
        {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await response.json();

      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ أول تحميل فقط
  useEffect(() => {
    fetchPosts();

    const interval = setInterval(() => {
      const currentLang = localStorage.getItem("lang") || "en";
      const currentTheme = localStorage.getItem("theme") || "light";

      setLang((prev) => (prev !== currentLang ? currentLang : prev));
      setTheme((prev) => (prev !== currentTheme ? currentTheme : prev));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // ✅ اللايك
  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("يجب تسجيل الدخول أولاً!");
      return;
    }

    // تحديث فوري
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked
                ? Math.max(0, (post.likesCount || 0) - 1)
                : (post.likesCount || 0) + 1,
            }
          : post
      )
    );

    try {
      const response = await fetch(
        `https://final-project-tan-alpha.vercel.app/api/posts/${postId}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchPosts(); // مزامنة مع السيرفر
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Like error:", error.message);
    }
  };

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const formatContent = (text) => {
    if (!text) return null;

    const fixedText = text.split("\\n").join("\n");
    const parts = fixedText.split("```");

    return parts.map((part, index) => {
      if (!part.trim()) return null;

      if (index % 2 === 0) {
        return (
          <p key={index} dir="auto" className="posts-normal-text">
            {part}
          </p>
        );
      }

      const firstNewLineIndex = part.indexOf("\n");
      let language = "code";
      let codeContent = part;

      if (firstNewLineIndex !== -1) {
        language =
          part.substring(0, firstNewLineIndex).trim() || "code";
        codeContent = part.substring(firstNewLineIndex + 1);
      }

      if (!codeContent.trim()) return null;

      return (
        <div key={index} dir="ltr" className="vscode-container">
          <div className="vscode-header">
            <div className="mac-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <span className="language-text">{language}</span>
          </div>

          <pre className="vscode-pre">
            <code className="vscode-code">
              {codeContent.trim()}
            </code>
          </pre>
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="posts-loading">
        {t("posts.loading")}
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className={`posts-page-wrapper ${theme}`}
        style={{
          direction: lang === "ar" ? "rtl" : "ltr",
        }}
      >
        <div className="posts-container">
          {posts.map((post) => (
            <article key={post._id} className="posts-card">

              {/* Header */}
              <div className="posts-author-row">
                <div className="posts-author-info">
                  <FaUserCircle
                    size={45}
                    className="author-icon-theme"
                  />

                  <span className="posts-author-name">
                    UniTech Member
                  </span>
                </div>

                <span className="posts-date">
                  {new Date(post.createdAt).toLocaleDateString(
                    lang === "ar" ? "ar-EG" : "en-US"
                  )}
                </span>
              </div>

              {/* Body */}
              <div className="posts-body">
                {post.modules?.map((module, i) => (
                  <div
                    key={i}
                    className="posts-module-wrapper"
                  >
                    {module.type === "image" && (
                      <img
                        src={module.content}
                        alt="Post"
                        className="posts-image"
                      />
                    )}

                    {module.type === "text" && (
                      <div className="posts-text-content">
                        {expandedPosts[post._id]
                          ? formatContent(module.content)
                          : formatContent(
                              module.content.substring(
                                0,
                                150
                              ) +
                                (module.content.length > 150
                                  ? "..."
                                  : "")
                            )}

                        {module.content.length > 150 && (
                          <button
                            className="read-more-btn"
                            onClick={() =>
                              toggleExpand(post._id)
                            }
                          >
                            {expandedPosts[post._id]
                              ? t("posts.less")
                              : t("posts.readMore")}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="posts-card-footer">
                <div className="posts-actions">

                  {/* Like */}
                  <div
                    className={`posts-like-section ${
                      post.isLiked ? "active" : ""
                    }`}
                    onClick={() =>
                      handleLike(post._id)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <Like
                      isLiked={post.isLiked}
                      size={22}
                      className="heart-icon"
                    />

                    <span
                      className="like-count"
                      style={{
                        color: post.isLiked
                          ? "#a855f7"
                          : "var(--text-sub)",
                      }}
                    >
                      {post.likesCount || 0}
                    </span>
                  </div>

                  {/* Copy ID */}
                  <FaCopy
                    className="posts-icon-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        post._id
                      );
                      alert(t("posts.copied"));
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Posts;