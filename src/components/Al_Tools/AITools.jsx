import "./aiTools.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgV from "../../assets/images/video1.png";
import imgA from "../../assets/images/audio1.png";
import imgT from "../../assets/images/text1.png";
import imgI from "../../assets/images/image1.png";
import imgC from "../../assets/images/code1.png";
import imgAr from "../../assets/images/art1.png";
import Navbar from "../Navber/Navber";
import Footer from "../Footer/Footer";


export default function AITools() {
    const { t } = useTranslation();
    return (
        <>
            <Navbar />
            <section className="tools-hero">
                <div className="tools-title">
                    <h2>{t("aiTools.title")}</h2>
                    <p>{t("aiTools.subtitle")}</p>
                </div>
                <div className="categories-section">
                    {/* Video */}
                    <div className="category">
                        <img src={imgV} alt="video tools" />
                        <div className="about-category">
                            <h3>{t("aiTools.video.title")}</h3>
                            <ul>
                                <li>{t("aiTools.video.items.0")}</li>
                                <li>{t("aiTools.video.items.1")}</li>
                                <li>{t("aiTools.video.items.2")}</li>
                            </ul>
                            <div className="show-category">
                                <Link to="/category/Video">
                                    {t("aiTools.showAll")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Audio */}
                    <div className="category">
                        <img src={imgA} alt="audio tools" />
                        <div className="about-category">
                            <h3>{t("aiTools.audio.title")}</h3>
                            <ul>
                                <li>{t("aiTools.audio.items.0")}</li>
                                <li>{t("aiTools.audio.items.1")}</li>
                                <li>{t("aiTools.audio.items.2")}</li>
                            </ul>
                            <div className="show-category">
                                <Link to="/category/Audio">
                                    {t("aiTools.showAll")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Text */}
                    <div className="category">
                        <img src={imgT} alt="text tools" />
                        <div className="about-category">
                            <h3>{t("aiTools.text.title")}</h3>
                            <ul>
                                <li>{t("aiTools.text.items.0")}</li>
                                <li>{t("aiTools.text.items.1")}</li>
                                <li>{t("aiTools.text.items.2")}</li>
                            </ul>
                            <div className="show-category">
                                <Link to="/category/Text">
                                    {t("aiTools.showAll")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Image */}
                    <div className="category">
                        <img src={imgI} alt="image tools" />
                        <div className="about-category">
                            <h3>{t("aiTools.image.title")}</h3>
                            <ul>
                                <li>{t("aiTools.image.items.0")}</li>
                                <li>{t("aiTools.image.items.1")}</li>
                                <li>{t("aiTools.image.items.2")}</li>
                            </ul>
                            <div className="show-category">
                                <Link to="/category/Image">
                                    {t("aiTools.showAll")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Code */}
                    <div className="category">
                        <img src={imgC} alt="code tools" />
                        <div className="about-category">
                            <h3>{t("aiTools.code.title")}</h3>
                            <ul>
                                <li>{t("aiTools.code.items.0")}</li>
                                <li>{t("aiTools.code.items.1")}</li>
                                <li>{t("aiTools.code.items.2")}</li>
                            </ul>
                            <div className="show-category">
                                <Link to="/category/Code">
                                    {t("aiTools.showAll")}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Art */}
                    <div className="category">
                        <img src={imgAr} alt="art tools" />
                        <div className="about-category">
                            <h3>{t("aiTools.art.title")}</h3>
                            <ul>
                                <li>{t("aiTools.art.items.0")}</li>
                                <li>{t("aiTools.art.items.1")}</li>
                                <li>{t("aiTools.art.items.2")}</li>
                            </ul>
                            <div className="show-category">
                                <Link to="/category/Art">
                                    {t("aiTools.showAll")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}