import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      
      window.dispatchEvent(new Event("storage"));

      window.location.href = "/"; 
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#121212", color: "#fff" }}>
      <h2>جاري تسجيل الدخول من Google...</h2>
    </div>
  );
}