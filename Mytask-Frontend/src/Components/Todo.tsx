import { useEffect, useState } from "react";

const GradientCard = () => (
  <svg 
    className="absolute w-full" 
    style={{ 
      height: '150%',
      minHeight: '400px'
    }} 
    preserveAspectRatio="xMidYMin slice" 
    viewBox="0 0 283 290" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* SVG content remains the same */}
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

export const Todo = ({ name, fn, status }: {
  id: number;
  name: string;
  fn: () => void;
  status: boolean;
}) => {
  const [isCom, setIsCom] = useState(status);

  useEffect(() => {
    setIsCom(status);
  }, [status]);

  return (
    <div className="relative h-56 overflow-hidden rounded-3xl">
      <GradientCard />
      <button
        onClick={() => {
          setIsCom(!isCom);
          fn();
        }}
        className="absolute inset-0 w-full h-full p-4 z-10"
      >
        <div className="h-full flex items-center justify-center">
          <span className="text-xl font-kubo text-white text-center hover:opacity-80 transition-opacity duration-200">
            {name}
          </span>
        </div>
      </button>
    </div>
  );
};