import { useState, useRef } from 'react';
import { Dropdown } from './Dropdown';

export default function Hook({ fn, del, name }: { fn: () => void;del: () => void; name: string }) {
  const [click, setClick] = useState('');
  const timerRef = useRef<number | null>(null); // Use 'number' for browser environment
  const isLongPress = useRef(false);

  function handleOnClick() {
    if (isLongPress.current) {
      console.log('It is longpress');
      return;
    }
    fn();
    setClick('click');
  }

  function handleOnMouseUp() {
    if (timerRef.current !== null) { // Type guard to check if timerRef.current is not null
      clearTimeout(timerRef.current);
    }
    console.log('OnMouseUp');
  }

  function handleOnMouseDown() {
    startPress();
    console.log('OnMouseDown');
  }

  function handleOnTouchStart() {
    startPress();
    console.log('TouchStart');
  }

  function handleOnTouchEnd() {
    if (timerRef.current !== null) { // Type guard to check if timerRef.current is not null
      clearTimeout(timerRef.current);
    }
    console.log('TouchEnd');
  }

  function startPress() {
    isLongPress.current = false;
    timerRef.current = window.setTimeout(() => { // Use window.setTimeout for browser
      setClick('Longpress');
      isLongPress.current = true;
    }, 500);
  }

  return (
    <div className="flex justify-center items-center font-semibold">
      <div className="relative inline-block text-left font-dm-sans font-semibold">
        <button
          onClick={handleOnClick}
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
          onTouchStart={handleOnTouchStart}
          onTouchEnd={handleOnTouchEnd}
        >
          {name}
        </button>
        {click === 'Longpress' && <Dropdown del={del}/>}
      </div>
    </div>
  );
}
