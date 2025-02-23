import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader} from './ui/card';
import { GradientCard } from './FancyCard';
import { useRecoilValue } from 'recoil';
import { dailyatom } from '@/Atoms/Atoms';

const FluidProgressCircle = ({ progress = 62.5, total = 8, completed = 5 }) => {
  // Convert progress to normalized value
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const daily = useRecoilValue(dailyatom);
  return (
    daily.length != 0 ? <Card className='w-full relative overflow-hidden border-none max-w-sm mx-auto bg-slate-900'>\
    <div className='absolute inset-0'>
      <GradientCard/>
    </div>
        <CardContent className='flex relative flex-col items-center'>
        <CardHeader className=' text-white p-4'>Total Task completed today</CardHeader>
    <div className="w-56 h-56 relative">
      {/* Container */}
      <div className="absolute inset-0 bg-white rounded-full border overflow-hidden">
        {/* SVG for water animation */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="waterGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(110, 56, 248)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(124, 14, 233)" stopOpacity="0.9" />
            </linearGradient>
            <clipPath id="circleClip">
              <circle cx="50" cy="50" r="46" />
            </clipPath>
          </defs>

          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="white"
            stroke="#e2e8f0"
            strokeWidth="2"
          />

          {/* Water container */}
          <g clipPath="url(#circleClip)">
            {/* Animated wave */}
            <motion.g
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <motion.path
                d="M 0 100 
                   Q 20 95, 50 100 
                   T 100 100
                   V 100 
                   H 0 
                   Z"
                fill="url(#waterGradient)"
                animate={{
                  d: [
                    "M 0 100 Q 20 95, 50 100 T 100 100 V 100 H 0 Z",
                    "M 0 100 Q 30 110, 50 100 T 100 100 V 100 H 0 Z",
                    "M 0 100 Q 20 95, 50 100 T 100 100 V 100 H 0 Z",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                style={{
                  translateY: `${100 - normalizedProgress}%`,
                }}
              />
            </motion.g>

            {/* Water fill */}
            <motion.rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="url(#waterGradient)"
              initial={{ y: 100 }}
              animate={{ y: 100 - normalizedProgress }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </g>
        </svg>

        {/* Centered text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-800">
            {completed}/{total}
          </span>
          <span className="text-sm text-gray-900 mt-1">
            {normalizedProgress.toFixed(1)}% completed
          </span>
        </div>
      </div>
    </div>
    </CardContent>
    </Card>:<div></div>
  );
};

export default FluidProgressCircle;
