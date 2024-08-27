import { useState,useRef } from 'react';
import { Dropdown } from './Dropdown';

export default function Hook({fn,name}:{fn:()=>void,name:string}) {
    const [click, setClick] = useState("");
    const timerRef = useRef<NodeJS.Timeout>();
    const isLongPress = useRef(false);
    function handleOnClick(){
        if(isLongPress.current){
            console.log('It is longpress')
            return
        }
        fn()
        setClick('click');
    }
      
    function handleOnMouseUp(){
        clearTimeout(timerRef.current)
       console.log("OnMouseUp")
    }
    function handleOnMouseDown(){
        startPress();
       console.log("OnMouseDown")
    }
    
    function handleOnTouchStart(){
        startPress()
       console.log("TouchStart")
    }
    function handleOnTouchEnd(){
        clearTimeout(timerRef.current)
       console.log("TouchEnd")
    }
    function startPress(){
        isLongPress.current = false;
        timerRef.current = setTimeout(()=>{
            setClick("Longpress")
            isLongPress.current = true
        },500);
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
      {click ==='Longpress' && <Dropdown/>}
    </div>
    </div>
  );
}
