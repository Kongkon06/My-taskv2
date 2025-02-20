
export default function Hook({name }: {name: string ;}) {
  return (
    <div className="flex justify-center items-center font-semibold">
      <div className="relative inline-block text-left font-dm-sans font-semibold">
          {name}
      </div>
    </div>
  );
}
