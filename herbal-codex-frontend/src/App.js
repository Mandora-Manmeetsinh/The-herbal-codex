function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-700 flex flex-col justify-center items-center text-center">
      {/* Title Section */}
      <div className="text-white drop-shadow-lg">
        <h1 className="text-6xl font-extrabold mb-4">
          <span className="text-green-100">🌿 The Herbal Codex 🌿</span>
        </h1>
        <p className="text-2xl font-medium italic">
          Explore the Magic of Herbs
        </p>
      </div>

      {/* Button Section */}
      <div className="mt-10">
        <button className="px-8 py-4 bg-green-800 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-green-900 hover:scale-105 transform transition-all duration-300">
          Start Exploring
        </button>
      </div>

      {/* Footer Section */}
      <footer className="absolute bottom-4 text-green-100 text-sm">
        © 2025 The Herbal Codex
      </footer>
    </div>
  );
}

export default App;
