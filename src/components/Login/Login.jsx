import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../../assets/images/login1.jpeg";
import img2 from "../../assets/images/login2.jpeg";
import img3 from "../../assets/images/login3.jpeg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import i18n from "../../i18n"; 
import { useTranslation } from "react-i18next";
import "./login.css";

export default function Login() {
  const { t } = useTranslation();
  const images = [img1, img2, img3];
  const [index, setIndex] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("login.fillError"));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://final-project-tan-alpha.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("login.loginError"));
      }

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage"))

      i18n.changeLanguage(data.user?.language || "en");
      document.body.className = data.user?.theme || "light";

      navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="box-images">
        <img key={activeImage} src={activeImage} className="main-img slide" />
        <div className="bars">
          {images.map((_, i) => (
            <span
              key={i}
              className={`bar ${activeImage === images[i] ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>
      <form className="form" onSubmit={handleLogin}>
        <h3>{t("login.title")}</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex-column">
          <label>{t("login.email")}</label>
        </div>
        <div className="inputForm">
          <MdEmail className="icon-in" />
          <input
            placeholder={t("login.emailPlaceholder")}
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-column">
          <label>{t("login.password")}</label>
        </div>
        <div className="inputForm">
          <FaLock className="icon-in" />
          <input
            placeholder={t("login.passwordPlaceholder")}
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button-submit" type="submit" disabled={loading}>
          {loading ? t("login.loginLoading") : t("login.loginBtn")}
        </button>
        <div className="flex-row">
          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "https://final-project-tan-alpha.vercel.app/api/auth/google")
            }
            className="btn google"
          >
            <FcGoogle size={20} /> {t("login.google")}
          </button>
        </div>
        <p className="p">
          {t("login.noAccount")}{" "}
          <Link className="span" to="/signup">
            {t("login.signup")}
          </Link>
        </p>
      </form>
    </section>
  );
}