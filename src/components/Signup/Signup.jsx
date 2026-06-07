import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../assets/images/login1.jpeg";
import img2 from "../../assets/images/login2.jpeg";
import img3 from "../../assets/images/login3.jpeg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2"; 
import "./signup.css";

export default function Signup() {
  const { t } = useTranslation();
  const images = [img1, img2, img3];
  const [index, setIndex] = useState(0);
  const [username, setName] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const activeImage = images[index];
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!username || !year || !email || !password || !confirmPassword) {
      setError(t("signup.errors.required"));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("signup.errors.passwordMatch"));
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("https://final-project-tan-alpha.vercel.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, year, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("signup.errors.failed"));
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("storage"));

      const isArabic = i18n.language === "ar";
      
      await Swal.fire({
        title: isArabic ? "تهانينا! 🎉" : "Congratulations! 🎉",
        text: isArabic 
          ? "تم إنشاء حسابك بنجاح. برجاء تسجيل الدخول ." 
          : "Account created successfully! Please login.",
        icon: "success",
        confirmButtonText: isArabic ? "الانتقال لتسجيل الدخول" : "Go to Login",
        confirmButtonColor: "#6366f1",
        background: document.body.className === "dark" ? "#1e1e2f" : "#fff", 
        color: document.body.className === "dark" ? "#fff" : "#000",
      });
      
      navigate("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup">
      <div className="box-images">
        <img key={activeImage} src={activeImage} className="main-img slide" alt="Signup Visual" />
        <div className="bars">
          {images.map((_, i) => (
            <span
              key={i}
              className={`bar ${activeImage === images[i] ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>
      <form className="form" onSubmit={handleSignup}>
        <h3>{t("signup.title")}</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <div className="flex-column">
          <label>{t("signup.name")}</label>
        </div>
        <div className="inputForm">
          <FaUser className="icon-in" />
          <input
            placeholder={t("signup.namePlaceholder")}
            className="input"
            type="text"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="flex-column">
          <label>{t("signup.year")}</label>
        </div>
        <div className="inputForm">
          <FaUser className="icon-in" />
          <select
            className="input"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">{t("signup.yearPlaceholder")}</option>
            <option value="1">{t("signup.year1")}</option>
            <option value="2">{t("signup.year2")}</option>
            <option value="3">{t("signup.year3")}</option>
            <option value="4">{t("signup.year4")}</option>
          </select>
        </div>
        
        <div className="flex-column">
          <label>{t("signup.email")}</label>
        </div>
        <div className="inputForm">
          <MdEmail className="icon-in" />
          <input
            placeholder={t("signup.emailPlaceholder")}
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="flex-row">
          <div className="flex-column">
            <label>{t("signup.password")}</label>
            <div className="inputForm">
              <FaLock className="icon-in" />
              <input
                placeholder={t("signup.passwordPlaceholder")}
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-column">
            <label>{t("signup.confirmPassword")}</label>
            <div className="inputForm">
              <FaLock className="icon-in" />
              <input
                placeholder={t("signup.confirmPasswordPlaceholder")}
                className="input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <button className="button-submit" type="submit" disabled={loading}>
          {loading ? t("signup.loading") : t("signup.button")}
        </button>
        
        <div className="flex-row">
          <button
            type="button"
            className="btn google"
            onClick={() =>
              (window.location.href =
                "https://final-project-tan-alpha.vercel.app/api/auth/google")
            }
          >
            <FcGoogle size={20} /> {t("login.google")}
          </button>
        </div>
        
        <p className="p">
          {t("signup.haveAccount")} <Link className="span" to="/login">{t("signup.login")}</Link>
        </p>
      </form>
    </section>
  );
}