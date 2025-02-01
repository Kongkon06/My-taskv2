import { useRecoilValue } from "recoil";
import { Appbar } from "../Components/Appbar";
import { childatom, todoatom } from "../Atoms/Atoms";
import { NewSidebar } from "../Components/NewSidebar";
import { NewAppbar } from "../Components/NewAppbar";
import CarouselCustomNavigation from "../Components/HeroSlider";
export function Completed() {
  const todo = useRecoilValue(todoatom);
  const child = useRecoilValue(childatom);
  const com = todo.filter((task) => task.status === true);

  return <div className="bg-indigo-950 h-screen">
    <NewAppbar/>
    <div className="x-4 py-8 h-full flex">
      <div className="w-1/5 h-full bg-red-300 mr-8">
        <NewSidebar />
      </div>
      <div className="bg-indigo-950 grid grid-cols-5 grid-rows-7 gap-4 w-4/5 h-full font-dm-sans">
        <div className="col-span-2 row-span-3 flex justify-center rounded-lg text-2xl font-semibold bg-slate-300 p-4" >
          Task Streak
        </div>
        <div className="col-span-3 row-span-4 bg-slate-300 rounded-lg p-4" >
          <div className="flex justify-between items-center">
            Hero Slider
            <div className="px-4 py-2 text-slate-200 bg-slate-900">Goal</div>
          </div>
          <CarouselCustomNavigation/>
        </div>
        <div className="col-span-2 row-span-4 bg-red-300 p-4 rounded-lg" >
          Todays Progress</div>
        <div className="col-span-3 row-span-3 bg-red-300 p-4 rounded-lg" >
        </div>
      </div>

    </div>
  </div>
}

