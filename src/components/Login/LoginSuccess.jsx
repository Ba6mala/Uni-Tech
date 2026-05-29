import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. لقط التوكن من الرابط فوق تلقائياً
    const token = searchParams.get("token");

    if (token) {
      // 2. حفظ التوكن في المتصفح فوراً
      localStorage.setItem("token", token);
      
      // 3. عمل تنبيه للموقع إن التوكن وصل عشان الـ App يقرأ التفضيلات
      window.dispatchEvent(new Event("storage"));

      // 4. توجيه الطالب فوراً للصفحة الرئيسية وهو مسجل دخول بنجاح!
      navigate("/");
    } else {
      // لو حصلت مشكلة ومفيش توكن، يرجعه لصفحة اللوجين
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#121212", color: "#fff" }}>
      <h2>جاري تسجيل الدخول من Google...</h2>
    </div>
  );
}