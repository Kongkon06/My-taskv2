import { useEffect } from "react";
import { Dailytask } from "../Components/Dailytask";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { dailyatom, parentid } from "../Atoms/Atoms";
import { DATABASE_URL } from "../config";
export function Dailypage() {
  const userid = useRecoilValue(parentid)
  const [daily, setdaily] = useRecoilState(dailyatom)
  useEffect(() => {
    axios.post(`${DATABASE_URL}/api/v2/Daily`, {
      userId: userid
    }).then((res) => {
      setdaily(res.data);
    });
  }, [dailyatom])
  return <div className="w-full h-auto border-2  ">
    <div>
      {daily.map((task) => (
        <Dailytask key={task.id} id={task.id} name={task.title} completions={task.completions} />
      ))}
    </div>
  </div>
}
