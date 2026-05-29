import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

const LanguageSwitch = ({ language, setLanguage }) => {
  const { i18n } = useTranslation();
  return (
    <StyledWrapper>
      <div className="flip-switch-container" dir="ltr">
        <div className="flip-switch">
          <input 
            type="radio" 
            id="switch-opt-1" 
            name="flip-switch" 
            checked={language === 'en'} 
            onChange={() => {
              setLanguage('en');
              i18n.changeLanguage('en');
            }} 
          />
          <input 
            type="radio" 
            id="switch-opt-2" 
            name="flip-switch" 
            checked={language === 'ar'} 
            onChange={() => {
              setLanguage('ar');
              i18n.changeLanguage('ar');
            }} 
          />
          
          <label htmlFor="switch-opt-1" className="switch-button">
            <span>EN</span>
          </label>

          <label htmlFor="switch-opt-2" className="switch-button">
            <span>AR</span>
          </label>

          <div className="switch-card">
            <div className="card-face card-front" />
            <div className="card-face card-back" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .flip-switch-container {
    --card-width: 35px; 
    --card-height: 28px;
    --switch-bg: rgba(255, 255, 255, 0.1);
    --switch-border-color: rgba(255, 255, 255, 0.2);
    --text-color: #ffffff;
    --inactive-text-color: rgba(255, 255, 255, 0.6);
    --card-bg: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
    --highlight-color: #6366f1;

    display: grid;
    place-content: center;
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .flip-switch {
    display: flex;
    position: relative;
    width: calc(var(--card-width) * 2);
    height: var(--card-height);
    background: var(--switch-bg);
    border-radius: 6px; 
    border: 1px solid var(--switch-border-color);
    box-shadow:
      0 4px 16px 0 rgba(31, 38, 135, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    perspective: 1000px;
  }

  .flip-switch input[type="radio"] {
    display: none;
  }

  .flip-switch .switch-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    color: var(--inactive-text-color);
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
    position: relative;
  }

  .flip-switch .switch-button:hover {
    color: var(--text-color);
  }

  .flip-switch .switch-button span {
    font-size: 12px; /* كبرنا الخط شوية عشان مفيش أيقونات */
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .flip-switch #switch-opt-1:checked ~ [for="switch-opt-1"],
  .flip-switch #switch-opt-2:checked ~ [for="switch-opt-2"] {
    color: var(--text-color);
    text-shadow: 0 0 8px rgba(100, 255, 218, 0.5);
  }

  .flip-switch #switch-opt-1:checked ~ [for="switch-opt-2"],
  .flip-switch #switch-opt-2:checked ~ [for="switch-opt-1"] {
    color: var(--inactive-text-color);
  }

  .flip-switch .switch-card {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--card-width);
    height: var(--card-height);
    z-index: 1;
    transform-style: preserve-3d;
  }

  .flip-switch .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 6px; 
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.15),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .flip-switch .card-back {
    transform: rotateY(180deg);
  }

  .flip-switch #switch-opt-2:checked ~ .switch-card {
    animation: flipRight 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards;
  }

  .flip-switch #switch-opt-1:checked ~ .switch-card {
    animation: flipLeft 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards;
  }

  @keyframes flipRight {
    0% {
      transform: translateX(0%) rotateY(0deg);
    }
    50% {
      transform: translateX(50%) rotateY(90deg) scale(1.05);
    }
    100% {
      transform: translateX(100%) rotateY(180deg) scale(1);
    }
  }

  @keyframes flipLeft {
    0% {
      transform: translateX(100%) rotateY(180deg);
    }
    50% {
      transform: translateX(50%) rotateY(90deg) scale(1.05);
    }
    100% {
      transform: translateX(0%) rotateY(0deg) scale(1);
    }
  }

  .flip-switch #switch-opt-1:checked ~ [for="switch-opt-1"]::after,
  .flip-switch #switch-opt-2:checked ~ [for="switch-opt-2"]::after {
    content: "";
    position: absolute;
    bottom: 2px;
    width: 20px;
    height: 2px;
    background: var(--highlight-color);
    border-radius: 2px;
    animation: glow 1.5s infinite alternate;
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 3px var(--highlight-color);
    }
    to {
      box-shadow:
        0 0 8px var(--highlight-color),
        0 0 12px var(--highlight-color);
    }
  }
`;

export default LanguageSwitch;