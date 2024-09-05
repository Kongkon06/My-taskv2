export function Dailytask({name}:{name:string}){
    return <div className="flex justify-center mb-3 font-dm-sans text-lg">
        <div className="w-full h-auto flex justify-between bg-violet-700 rounded-full px-3 py-1 text-white ">
            <input type="checkbox"/>
            <div>{name}</div>
        </div>
    </div>
}