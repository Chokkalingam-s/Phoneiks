import React, { useContext } from "react";
import HomeCarousel from "../components/Carousel.jsx";
import translations from "../HomeContentTranslations";
import { AppContext } from "../context/AppContext.jsx";

export default function Home() {
  const { language } = useContext(AppContext);
  const t = translations[language] || translations.en;

  return (
    <div>
      <HomeCarousel />

      {/* Landing Page Feature Sections */}
      <section className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutText}</p>
            <ul>
              {t.aboutList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <img
              src="/src/assets/about.png"
              alt="Phoeniks About"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <div className="row text-center">
          {t.features.map((feature, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
