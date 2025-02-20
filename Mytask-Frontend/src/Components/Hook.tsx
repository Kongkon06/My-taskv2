
export default function Hook({name ,id,fn }: { fn: () => void; name: string ;id : number}) {

  return (
    <div className="flex justify-center items-center font-semibold">
      <div className="relative inline-block text-left font-dm-sans font-semibold">
          {name}
      </div>
    </div>
  );
}
