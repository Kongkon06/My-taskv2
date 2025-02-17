import type React from "react";
import { Home, Calendar, List, BarChart2, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const GradientBackground = () => (
  <svg
    className="absolute top-0 left-0 w-full"
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

const SidebarItem: React.FC<{
  icon: React.ElementType;
  label: string;
  active?: boolean;
  fn?: () => void
}> = ({
  icon: Icon,
  label,
  active,
  fn
}) => (
  <Button
    onClick={fn}
    variant={active ? "secondary" : "ghost"}
    className={`w-full justify-start transition-colors ${
      active ? 'bg-white/10' : 'hover:bg-white/5'
    }`}
  >
    <Icon className="mr-2 h-4 w-4 text-white" />
    <span className="text-white">{label}</span>
  </Button>
);

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-64 overflow-hidden">
      <GradientBackground />
      <div className="relative z-10 p-4 space-y-4 bg-black/30 backdrop-blur-xl border-r border-purple-800 h-full">
        <div className="font-bold text-2xl mb-6 text-white font-kubo">My Tasks</div>
        <nav className="space-y-2">
          <SidebarItem
            icon={Home}
            label="Dashboard"
            active
            fn={() => navigate('/')}
          />
          <SidebarItem
            icon={Calendar}
            label="Calendar"
            fn={() => navigate('/calendar')}
          />
          <SidebarItem
            icon={List}
            label="Tasks"
            fn={() => navigate('/goals')}
          />
          <SidebarItem
            icon={BarChart2}
            label="Analytics"
            fn={() => navigate('/completed')}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;