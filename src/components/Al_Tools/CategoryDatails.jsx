import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navber/Navber";
import Footer from "../Footer/Footer";
import "./categoryDetails.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function CategoryDetails() {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const [groupedTools, setGroupedTools] = useState({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://final-project-tan-alpha.vercel.app/api/tools",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        let allTools = [];

        data.forEach((section) => {
          section.categories.forEach((cat) => {
            if (cat.tools) {
              allTools = [...allTools, ...cat.tools];
            }
          });
        });

        const filtered = allTools.filter(
          (tool) =>
            tool.section
              ?.toLowerCase()
              .includes(categoryName?.toLowerCase()) ||
            tool.category
              ?.toLowerCase()
              .includes(categoryName?.toLowerCase())
        );

        const grouped = {};

        filtered.forEach((tool) => {
          const key = tool.category || t("categoryDetails.other");

          if (!grouped[key]) grouped[key] = [];

          grouped[key].push(tool);
        });

        setGroupedTools(grouped);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName, t]);

  const handleToolClick = async (toolId, toolLink) => {
    const token = localStorage.getItem("token");
    window.open(toolLink, "_blank", "noopener,noreferrer");

    if (token) {
      try {
        const response = await fetch(
          `https://final-project-tan-alpha.vercel.app/api/tools/${toolId}/view`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.status === 200 && data.userPoints) {
          Swal.fire({
            toast: true,
            position: i18n.language === "ar" ? "top-start" : "top-end",
            icon: "success",
            title: t("Swal2.pointsEarned"),
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            background: document.body.classList.contains("dark")
              ? "#111827"
              : "#ffffff",
            color: document.body.classList.contains("dark")
              ? "#ffffff"
              : "#111827",
          });
        } else if (data.message?.includes("قبل كده")) {
          console.log("Repeated visit, no points.");
        }
      } catch (error) {
        console.error("Error updating points:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <main
        className="tools-page"
        style={{
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
      >
        {/* HERO */}
        <section className="hero">
          <div className="hero-inner">
            <span className="hero-tag">
              {t("categoryDetails.heroTag")}
            </span>
            <h1>
              {categoryName} <br />
              <span>{t("categoryDetails.heroTitle")}</span>
            </h1>
            <p>{t("categoryDetails.heroDescription")}</p>
            <div className="hero-buttons">
              <Link to="/aiTools" className="btn-primary">
                {t("categoryDetails.exploreTools")}
              </Link>
              <a href="#categories" className="btn-outline">
                {t("categoryDetails.viewCategories")}
              </a>
            </div>
          </div>
        </section>
        {loading ? (
          <div className="loading-box">
            <div className="loader"></div>
            <p>{t("categoryDetails.loadingTools")}</p>
          </div>
        ) : (
          Object.keys(groupedTools).map((group) => (
            <section
              key={group}
              className="tools-section"
              id="categories"
            >
              <div className="section-title">
                <h2>{group}</h2>
                <span>
                  {groupedTools[group].length}{" "}
                  {t("categoryDetails.toolsCount")}
                </span>
              </div>
              <div className="tools-grid">
                {groupedTools[group].map((tool) => (
                  <div key={tool._id} className="tool-card">
                    <div className="img-box">
                      <img
                        src={tool.image || "/fallback.png"}
                        alt={tool.name}
                      />
                    </div>
                    <div className="tool-content">
                      <h3>{tool.name}</h3>
                      <p>
                        {i18n.language === "ar"
                          ? tool.descriptionAr || tool.description
                          : tool.description}
                      </p>
                      <button
                        onClick={() =>
                          handleToolClick(tool._id, tool.link)
                        }
                        className="visit-btn"
                      >
                        {t("categoryDetails.visitTool")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}