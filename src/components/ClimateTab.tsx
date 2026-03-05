import { useState } from "react";
import { motion } from "framer-motion";
import { Power, Wind, ArrowUp, ArrowRight, ArrowDown, Thermometer } from "lucide-react";

const ClimateTab = () => {
  const [isOn, setIsOn] = useState(true);
  const [temperature, setTemperature] = useState(22);
  const [fanSpeed, setFanSpeed] = useState(3);
  const [airDirection, setAirDirection] = useState<"up" | "front" | "down">("front");

  const directions = [
    { key: "up" as const, icon: ArrowUp, label: "Arriba" },
    { key: "front" as const, icon: ArrowRight, label: "Frente" },
    { key: "down" as const, icon: ArrowDown, label: "Abajo" },
  ];

  return (
    <div className="space-y-6">
      {/* Power toggle */}
      <motion.div
        className="ev-card flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <Power className={`w-6 h-6 ${isOn ? "text-success" : "text-muted-foreground"}`} />
          <div>
            <p className="font-semibold text-lg">Aire Acondicionado</p>
            <p className="text-sm text-muted-foreground">
              {isOn ? "Encendido" : "Apagado"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOn(!isOn)}
          className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${
            isOn ? "bg-success" : "bg-secondary"
          }`}
        >
          <motion.div
            className="absolute top-1 w-6 h-6 rounded-full bg-foreground"
            animate={{ left: isOn ? 28 : 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </motion.div>

      {isOn && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Temperature */}
          <motion.div
            className="ev-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Temperatura
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setTemperature(Math.max(16, temperature - 1))}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors active:scale-90"
              >
                −
              </button>
              <div className="text-center">
                <span className="text-5xl font-orbitron font-bold text-primary ev-text-glow">
                  {temperature}
                </span>
                <span className="text-xl text-muted-foreground ml-1">°C</span>
              </div>
              <button
                onClick={() => setTemperature(Math.min(30, temperature + 1))}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors active:scale-90"
              >
                +
              </button>
            </div>
            <input
              type="range"
              min={16}
              max={30}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_hsl(199,89%,48%,0.5)]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>16°C</span>
              <span>30°C</span>
            </div>
          </motion.div>

          {/* Fan speed */}
          <motion.div
            className="ev-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Wind className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Ventilador
              </span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setFanSpeed(speed)}
                  className={`flex-1 h-12 rounded-xl font-orbitron font-bold text-lg transition-all duration-200 active:scale-90 ${
                    fanSpeed >= speed
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(199,89%,48%,0.3)]"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Air direction */}
          <motion.div
            className="ev-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider block mb-4">
              Dirección del aire
            </span>
            <div className="flex gap-3">
              {directions.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setAirDirection(key)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl transition-all duration-200 active:scale-95 ${
                    airDirection === key
                      ? "bg-primary text-primary-foreground ev-glow"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Visual airflow */}
            <div className="mt-4 relative h-16 overflow-hidden rounded-xl bg-secondary/50">
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    style={{
                      top:
                        airDirection === "up"
                          ? `${20 + i * 5}%`
                          : airDirection === "down"
                          ? `${50 + i * 5}%`
                          : `${35 + i * 5}%`,
                      rotate:
                        airDirection === "up"
                          ? "-15deg"
                          : airDirection === "down"
                          ? "15deg"
                          : "0deg",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5 / fanSpeed * 3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Wind className="w-8 h-8 text-primary/30" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ClimateTab;
