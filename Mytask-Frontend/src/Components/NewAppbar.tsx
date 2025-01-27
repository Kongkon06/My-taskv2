import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "./Buttons/Button.tsx";
import { Input } from "./ui/input.tsx";

export const NewAppbar = () => {
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
      className="fixed top-0 left-0 right-0 z-40 flex justify-center bg-transparent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        .nav-bar {
          backdrop-filter: blur(12px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-bar-expanded {
          width: 85%;
          background: linear-gradient(135deg, rgba(155, 135, 245, 0.95), rgba(249, 115, 22, 0.95));
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .nav-bar-collapsed {
          width: 35%;
          background: linear-gradient(135deg, rgba(155, 135, 245, 0.85), rgba(249, 115, 22, 0.85));
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .menu-hidden {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .menu-visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: auto;
        }

        .logo-container {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-hidden {
          opacity: 0;
        }

        .logo-visible {
          opacity: 1;
        }

        .nav-button {
          position: relative;
          overflow: hidden;
        }

        .nav-button::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #FCD34D;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .nav-button:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>

      <nav
        className={`flex items-center font-dm-sans my-4 h-16 mx-auto p-4 rounded-2xl nav-bar ${expanded ? "nav-bar-expanded" : "nav-bar-collapsed"
          }`}
      >
        <div
          className={`container relative flex items-center ${expanded ? "justify-between" : "justify-center"
            }`}
        >
          {/* Logo */}
          <div
            role="button"
            onClick={() => navigate("/")}
            className={`logo-container ${expanded ? "relative" : "absolute"}`}
          >
            <svg
              width="501"
              className="h-8 hover:scale-105 transition-transform duration-300"
              viewBox="0 0 501 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M140.285 28.2023L175 13.5C175 13.5 174.143 43.5 176.5 54.5C178.857 65.5 187.286 68.9804 196.5 71.5C208.227 74.7071 222.5 72 221.5 53C220.5 34 191 33 191 33V2L244.785 1.83956C244.785 1.83956 249 69 236 91C223 113 182.423 110.333 182.423 110.333C182.423 110.333 184.902 96.1372 172.508 85.4907C160.115 74.8442 140.285 78.393 140.285 78.393V28.2023Z"
                fill="currentColor"
                className="text-white"
              />
              <path
                d="M453.5 28C439.624 28 428.491 39.1327 428 53C427.802 58.588 428.595 66.2227 431.5 71C436.589 79.3684 444.775 82.1599 454.5 81C463.809 79.8899 474 67 474 67L500.5 79.5C500.5 79.5 483.953 102.385 468 107.5C452.327 112.526 436.084 109 426 104C411.89 97.0036 403.966 88.5 398.5 74.5C394.401 64 393.036 39.9543 404.5 23.5C418.036 4.07218 437.523 -1.57893 461 1.50004C491.5 5.5 500.5 31 500.5 31L472.5 43C472.5 43 465.5 28 453.5 28Z"
                fill="currentColor"
                className="text-white"
              />
              <path
                d="M0 2H44.5L62.5 51.5L80.5 2H125C125 2 125 90 126 98.5C127 107 134 107 130 107.5C126 108 92.5 107 92.5 107V44.5L70.5 108H55L41.5 70L32 44.5V108H0V2Z"
                fill="currentColor"
                className="text-white"
              />
              <path
                d="M255 31.9999C255 31.9999 261 5.50008 284.5 2.50001C308 -0.500049 308.928 -0.0108733 322 3.99999C327.5 5.68749 342.5 15.9999 342.5 15.9999L325 38L306.5 28.9999C306.5 28.9999 295.255 23.9273 290.5 27.9999C289.017 29.2702 287.659 30.0538 287.5 31.9999C287.264 34.8931 293 37 293 37L312 40C312 40 323.5 41.9999 334 49C344.5 56 345.038 62.2931 345.5 72.5C345.93 82.0001 343.463 88.092 337.5 95.5C329.778 105.093 309 109 309 109C309 109 299.5 111.5 277 107C254.5 102.5 252 91 252 91L267.5 69.5C267.5 69.5 277.723 77.7822 285.5 80.5C293.663 83.3526 298.92 84.0725 307.5 83C311.5 82.5 314 79.7304 314 76C314 70.5 289 72.5 271 63.5C253 54.5 255 31.9999 255 31.9999Z"
                fill="currentColor"
                className="text-white"
              />
              <rect
                x="354"
                y="2"
                width="34"
                height="108"
                fill="currentColor"
                className="text-white"
              />
            </svg>
          </div>

          {/* Navigation Links */}
          <div
            className={`md:flex items-center space-x-8 ${expanded ? "menu-visible" : "menu-hidden"
              }`}
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/brands")}
              className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
            >
              Brands
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/categories")}
              className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
            >
              Categories
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/agent")}
              className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
            >
              Offline Buy
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/cart")}
              className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
            >
              Cart
            </Button>
          </div>

          {/* Search Bar */}
          <div
            className={`flex grow mx-8 ${expanded ? "menu-visible" : "menu-hidden"
              }`}
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                onKeyDown={(e: any) => {
                  if (e.key == "Enter") {
                    navigate('/products/guitar')
                  }
                }}
                type="search"
                placeholder="Search musical instruments..."
                className="w-full pl-10 bg-white/90 border-none rounded-xl focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
              />
            </div>
          </div>

          {/* Login Button */}
          <div className={`${expanded ? "menu-visible" : "menu-hidden"}`}>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
