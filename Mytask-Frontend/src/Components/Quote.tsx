export function Quote() {
  return (
    <div className="relative h-screen w-full overflow-hidden font-dm-sans">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://thumbs.dreamstime.com/b/colorful-cyberpunk-marble-abstract-background-liquid-wave-texture-creating-artworks-prints-hypnosis-cyberpunk-liquid-138842330.jpg"
          className="h-full w-full object-cover"
          alt="Background"
        />
        {/* Overlay with blur */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative h-full w-full flex items-center justify-center px-4">
        <div className="max-w-2xl bg-gradient-to-br from-indigo-700/80 to-indigo-900/80 backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <p className="text-2xl md:text-3xl text-white font-bold leading-relaxed">
            "My Tasks is a productivity app that helps you manage todos, subtasks, and daily goals. It lets you track progress and stay organized, making it easier to achieve your tasks efficiently."
          </p>
        </div>
      </div>
    </div>
  );
}