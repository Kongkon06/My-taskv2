import React, { useState } from 'react';

// Define types for props
interface LongPressButtonProps {
  onLongPress: () => void;
}

// Define LongPressButton component with types
const LongPressButton: React.FC<LongPressButtonProps> = ({ onLongPress }) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPressing, setIsPressing] = useState(false);
  const pressDuration = 500; // Time in milliseconds to consider as a long press

  const handleMouseDown = () => {
    setIsPressing(true);
    const timer = setTimeout(() => {
      setIsPressing(false);
      onLongPress();
    }, pressDuration);
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    setIsPressing(false);
    if (pressTimer) {
      clearTimeout(pressTimer);
    }
  };

  const handleMouseLeave = () => {
    setIsPressing(false);
    if (pressTimer) {
      clearTimeout(pressTimer);
    }
  };

  const handleTouchStart = () => {
    setIsPressing(true);
    const timer = setTimeout(() => {
      setIsPressing(false);
      onLongPress();
    }, pressDuration);
    setPressTimer(timer);
  };

  const handleTouchEnd = () => {
    setIsPressing(false);
    if (pressTimer) {
      clearTimeout(pressTimer);
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`p-2 rounded ${isPressing ? 'bg-blue-600' : 'bg-blue-400'}`}
    >
      {isPressing ? 'Long Pressing...' : 'Press Me'}
    </button>
  );
};

// Main Example component
export default function Example() {
  const handleLongPress = () => {
    alert('Long Press Detected!');
  };

  return (
    <div className="App">
      <LongPressButton onLongPress={handleLongPress} />
    </div>
  );
}
