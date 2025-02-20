import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Buttons/Button.tsx";
import { User } from "lucide-react"

const GradientCard = () => (
  <svg
    className="absolute top-0 left-0 w-full blur-xl bg-white/30"
    style={{ height: '150%' }}
    preserveAspectRatio="xMidYMin slice"
    viewBox="0 0 283 290"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20C0 8.9543 8.9543 0 20 0H151H216H249.5H263C274.046 0 283 8.95431 283 20V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z"
      fill="url(#paint0_linear_98_2)"
    />
    <g clipPath="url(#paint1_angular_98_2_clip_path)">
      <g transform="matrix(-0.1225 0.178 -0.178 -0.1225 122.5 112)">
        <foreignObject x="-1085.33" y="-1085.33" width="2170.67" height="2170.67">
          <div
            style={{
              background:
                "conic-gradient(from 90deg, rgba(166, 20, 44, 0.3158) 0deg, rgba(190, 22, 22, 0.2) 12.8811deg, rgba(19, 0, 127, 1) 61.2748deg, rgba(0, 0, 0, 1) 186.719deg, rgba(28, 2, 173, 1) 283.916deg, rgba(166, 20, 44, 0.3158) 360deg)",
              height: "100%",
              width: "100%",
              opacity: 1,
            }}
          />
        </foreignObject>
      </g>
    </g>
    <path
      d="M0 20C0 8.9543 8.9543 0 20 0H110.52C127.089 0 136.472 18.9917 126.405 32.1515L113.28 49.3104C100.44 66.0956 119.02 88.7324 137.986 79.4115L266 16.5C273.235 11.6055 283 16.789 283 25.5244V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z"
    />
    <defs>
      <clipPath id="paint1_angular_98_2_clip_path">
        <path d="M0 20C0 8.9543 8.9543 0 20 0H110.52C127.089 0 136.472 18.9917 126.405 32.1515L113.28 49.3104C100.44 66.0956 119.02 88.7324 137.986 79.4115L266 16.5V16.5C273.235 11.6055 283 16.789 283 25.5244V270C283 281.046 274.046 290 263 290H20C8.95431 290 0 281.046 0 270V20Z" />
      </clipPath>
      <linearGradient id="paint0_linear_98_2" x1="150" y1="118.5" x2="422" y2="-179" gradientUnits="userSpaceOnUse">
        <stop stopColor="#000FB9" />
        <stop offset="0.295" stopColor="#D1466D" />
        <stop offset="0.640786" stopColor="#FF0048" />
      </linearGradient>
    </defs>
  </svg>
);

export const Appbar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setExpanded(true);
  }, [timeoutId]);

  const handleMouseLeave = useCallback(() => {
    const id = setTimeout(() => {
      setExpanded(false);
    }, 4000);
    setTimeoutId(id);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div
      className="fixed left-0 right-0 z-40 flex justify-center bg-transparent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        .nav-bar {
          backdrop-filter: blur(16px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
        }

        .nav-bar-expanded {
          width: 85%;
          max-width: 500px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-bar-collapsed {
          width: 35%;
          max-width: 400px;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .menu-hidden {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .menu-visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: auto;
        }

        .logo-container {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 1;
        }

        .nav-button {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .nav-button::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #FCD34D, #F59E0B);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-button:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .login-button {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 1;
        }

        .login-button:hover {
          transform: translateY(-2px) scale(1.05);
          filter: brightness(1.1);
        }

        .gradient-card-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
      `}</style>

      <nav
        className={`flex items-center font-dm-sans my-4 h-16 mx-auto p-4 rounded-full nav-bar ${
          expanded ? "nav-bar-expanded" : "nav-bar-collapsed"
        }`}
      >
        <div className="gradient-card-container">
          <GradientCard />
        </div>
        
        <div
          className={`container relative flex items-center justify-center`}
        >
          {/* Logo */}
          <div
            role="button"
            onClick={() => navigate("/")}
            className={`logo-container ${expanded ? "relative" : "absolute"}`}
          >
            <div className="text-3xl text-white font-kubo">
              My-Tasks
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className={`md:flex items-center ${
              expanded ? "menu-visible" : "menu-hidden"
            }`}
          >
            <Button
              variant="ghost"
              onClick={() => alert("Feature Comming Soon")}
              className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
            >
              Teams
            </Button>
            <Button
              variant="ghost"
              onClick={() => alert("Feature Comming Soon")}
              className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
            >
              Workspaces
            </Button>
          </div>

          {/* Login Button */}
          <div className={`${expanded ? "menu-visible" : "menu-hidden"}`}>
            <Button
              onClick={() => navigate("/signin")}
              className="login-button text-white p-2 rounded-xl font-medium hover:bg-white/10"
            >
              <User/>
              </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};