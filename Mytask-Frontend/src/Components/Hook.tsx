import { useState, useRef } from 'react';
import { Dropdown } from './Dropdown';

export default function Hook({ fn,dels, name }: { fn: () => void;dels: () => void; name: string }) {
  const [click, setClick] = useState('');
  const timerRef = useRef<number | null>(null); 
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
    if (timerRef.current !== null) {
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
    if (timerRef.current !== null) { 
      clearTimeout(timerRef.current);
    }
    console.log('TouchEnd');
  }

  function startPress() {
    isLongPress.current = false;
    timerRef.current = window.setTimeout(() => {
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
        {click === 'Longpress' && <Dropdown dels={dels}/>}
      </div>
    </div>
  );
}
