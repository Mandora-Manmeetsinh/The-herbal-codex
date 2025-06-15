
import { useState } from "react";

const glowingPlant =
  "/plants/lavender.png"; // Use a real plant image for fun!

const MiniGame = () => {
  const [score, setScore] = useState(0);
  const [animate, setAnimate] = useState(false);

  function handlePlantClick() {
    setScore((prev) => prev + 1);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 700);
  }

  return (
    <section className="relative flex flex-col items-center justify-center my-16 pt-10 pb-16 bg-gradient-to-br from-herb-green-light/30 to-herb-cream/80 rounded-3xl shadow-2xl overflow-hidden mx-2 sm:mx-0">
      <h2 className="text-2xl md:text-4xl font-bold text-herb-green-dark mb-2 animate-glow">
        🌱 Plant Clicker Mini-Game
      </h2>
      <div className="mb-4 text-lg text-gray-700 animate-shimmer">
        Click the glowing plant and see your score soar!
      </div>
      <div className="relative mb-8">
        <button
          onClick={handlePlantClick}
          className={`outline-none border-none bg-transparent transition-transform duration-300 ${
            animate ? "animate-pop-scale" : "hover:scale-110"
          }`}
          aria-label="Click the glowing plant"
        >
          <img
            src={glowingPlant}
            alt="Glowing Plant"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-xl border-4 border-herb-green-dark animate-pulse-glow"
            style={{ boxShadow: "0 0 40px 12px #92ffb8, 0 0 0 0 #2d6a4f" }}
          />
          {/* Sparkle burst on click */}
          {animate && (
            <span className="absolute z-10 left-1/2 top-1/2 animate-burst pointer-events-none">
              <svg width={120} height={120} fill="none" viewBox="0 0 120 120">
                <circle cx={60} cy={60} r={24} fill="#fff176" fillOpacity={0.4} />
                <circle cx={60} cy={60} r={40} fill="#baffc9" fillOpacity={0.2} />
                <g>
                  {Array(12)
                    .fill(0)
                    .map((_, i) => (
                      <rect
                        key={i}
                        x="58"
                        y="10"
                        width="4"
                        height="20"
                        rx="2"
                        fill="#FFD700"
                        opacity={0.7}
                        transform={`rotate(${i * 30} 60 60)`}
                      />
                    ))}
                </g>
              </svg>
            </span>
          )}
        </button>
      </div>
      <div className="text-xl md:text-2xl font-bold text-herb-green-dark shadow py-2 px-6 rounded-2xl bg-white bg-opacity-80 animate-fade-in">
        Score: <span className="text-herb-gold">{score}</span>
      </div>
    </section>
  );
};

export default MiniGame;
