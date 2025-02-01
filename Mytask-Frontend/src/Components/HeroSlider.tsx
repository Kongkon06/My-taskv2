import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GitHubContributions from './GitContri';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sample carousel items - replace with your own content
  const items = [
    {
      component: <GitHubContributions />,
      color: "bg-blue-500"
    },
    {
      component:<div>Slide 2</div>,
      color: "bg-green-500"
    },
    {
      component: <div>SLide 3</div>,
      color: "bg-purple-500"
    }
  ];

  const slideVariants = {
    enter: (direction : any) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction : any) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset : any, velocity : any) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection : any) => {
    const newIndex = (currentIndex + newDirection + items.length) % items.length;
    setCurrentIndex(newIndex);
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    paginate(1);
  };

  const handlePrev = () => {
    setDirection(-1);
    paginate(-1);
  };

  return (
    <div className="relative w-full mx-auto h-96">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className={`absolute inset-0 flex items-center justify-center ${items[currentIndex].color}`}
          >
            <div className="text-white text-center w-full h-full p-4">
             {items[currentIndex].component}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
        onClick={handlePrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
        onClick={handleNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;