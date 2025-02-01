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
          background: rgba(169, 44, 44, 0.29);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .nav-bar-collapsed {
          width: 35%;
          background: rgba(169, 44, 44, 0.29);
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
        className={`flex items-center font-dm-sans my-4 h-16 mx-auto p-4 rounded-full nav-bar ${expanded ? "nav-bar-expanded" : "nav-bar-collapsed"
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
            <div>
              <img className="object-contain h-20 p-4 " src="http://graffwriter.com/graffwriter/images_host2/1737990039jidljfeo.png"></img>
            </div>
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
              Workspaces
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/agent")}
              className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
            >
              Calender
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/goals")}
              className="nav-button text-white hover:text-yellow-300 hover:bg-transparent transition-all duration-300 hover:-translate-y-0.5 text-base font-medium"
            >
              Goals
            </Button>
          </div>

          {/* Search Bar */}
          <div
            className={`flex grow mx-8 ${expanded ? "menu-visible" : "menu-hidden"
              }`}
          >
            {/*<div className="relative w-full">
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
            </div> */}
          </div>

          {/* Login Button */}
          <div className={`${expanded ? "menu-visible" : "menu-hidden"}`}>
            <Button
              onClick={() => navigate("/signin")}
              className="bg-red-600 hover:bg-red-800 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
