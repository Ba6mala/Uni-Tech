import React, { useState } from "react";
import "./contact.css";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import Navbar from "../Navber/Navber";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSent(false), 3000);
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <div className="clean-contact">
        <div className="contact-wrapper">
          <div className="contact-left">
            <h1>{t("contact.title")}</h1>
            <p>{t("contact.desc")}</p>
            <div className="info-container">
              <div className="info-item">
                <FiPhone />
                <span>+20 100 000 585</span>
              </div>
              <div className="info-item">
                <FiMail />
                <span>unitech2026@gmail.com</span>
              </div>
              <div className="info-item">
                <FiMapPin />
                <span>Egypt, Al Fayoum</span>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <h2>{t("contact.sendMessage")}</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.fullName")}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder={t("contact.email")}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <textarea
                  name="message"
                  placeholder={t("contact.message")}
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={10}
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading
                  ? t("contact.sending")
                  : sent
                  ? t("contact.sent")
                  : t("contact.sendMessage")}

                {!loading && !sent && <FiSend />}
              </button>

              {sent && <p className="success">{t("contact.success")}</p>}
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;