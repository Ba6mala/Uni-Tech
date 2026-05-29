import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import Posts from "./components/Posts/Posts";
import Contact from "./components/Contact/Contact";
import AITools from "./components/Al_Tools/AITools";
import CategoryDetails from "./components/Al_Tools/CategoryDatails";
import Profile from "./components/Profile/Profile";
import Competitions from "./components/Competitions/Competitions";
import Leaderboard from "./components/Competitions/Leaderboard";
import LoginSuccess from "./components/Login/LoginSuccess";
import "./i18n";
import "./index.css";

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children;
}

function App() {
  const { i18n } = useTranslation();

  const applySettings = (lang, theme) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    localStorage.setItem("lang", lang);
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme || "dark");
    localStorage.setItem("theme", theme || "dark");
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    const savedTheme = localStorage.getItem("theme");
    const token = localStorage.getItem("token"); // جلب التوكن أولاً

    const fetchPreferences = async () => {
      // ✋ شرط ذكي: لو مفيش توكن، حط الإعدادات الافتراضية واقفل الدالة فوراً من غير ما تكلم السيرفر
      if (!token) {
        applySettings(savedLang || "en", savedTheme || "dark");
        return;
      }

      try {
        const res = await fetch(
          "https://final-project-tan-alpha.vercel.app/api/users/preferences",
          {
            headers: {
              Authorization: `Bearer ${token}`, // استخدام المتغير هنا
            },
          }
        );

        // تأكدي إن الرد سليم قبل تحويله لـ JSON لضمان عدم حدوث شاشة بيضاء
        if (!res.ok) {
          throw new Error("Failed to fetch preferences");
        }

        const data = await res.json();

        const lang = data?.language || savedLang || "en";
        const theme = data?.theme || savedTheme || "dark";

        applySettings(lang, theme);
      } catch (err) {
        console.log(err);
        applySettings(savedLang || "en", savedTheme || "dark");
      }
    };

    fetchPreferences();
  }, []);

  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/posts" element={
          <ProtectedRoute> <Posts /></ProtectedRoute>
        } />
        <Route path="/aiTools" element={<ProtectedRoute> <AITools /> </ProtectedRoute>} />
        <Route path="/category/:categoryName" element={<ProtectedRoute> <CategoryDetails /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/competitions" element={<ProtectedRoute> <Competitions /> </ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute> <Leaderboard /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;