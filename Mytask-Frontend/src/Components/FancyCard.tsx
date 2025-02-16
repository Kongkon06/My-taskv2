const GradientCard = () => {
  return (
    <div className="relative w-64 h-64 rounded-3xl overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-800" />
      
      {/* Top curved gradient overlay */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle at bottom left, transparent 60%, #ff1a8c 100%)',
          transform: 'rotate(-45deg)',
          opacity: 0.6,
        }}
      />
      
      {/* Dark overlay for depth */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.2) 100%)',
        }}
      />
    </div>
  );
};

export default GradientCard;