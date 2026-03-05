import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Clock, Route, Zap, ChevronRight } from "lucide-react";

interface RouteOption {
  name: string;
  time: string;
  distance: string;
}

const generateTripData = () => {
  const available = Math.floor(Math.random() * 200) + 150;
  const traveled = Math.floor(Math.random() * 100) + 10;
  const hours = Math.floor(Math.random() * 3) + 1;
  const mins = Math.floor(Math.random() * 50) + 5;

  const routes: RouteOption[] = [
    { name: "Ruta Rápida", time: `${hours}h ${mins}min`, distance: `${available - Math.floor(Math.random() * 30)} km` },
    { name: "Ruta Ecológica", time: `${hours}h ${mins + 15}min`, distance: `${available - Math.floor(Math.random() * 20)} km` },
    { name: "Ruta Escénica", time: `${hours + 1}h ${Math.floor(Math.random() * 30)}min`, distance: `${available + Math.floor(Math.random() * 40)} km` },
  ];

  return { available, traveled, time: `${hours}h ${mins}min`, routes };
};

const TripTab = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tripData, setTripData] = useState<ReturnType<typeof generateTripData> | null>(null);

  const handleCalculate = useCallback(() => {
    if (origin.trim() && destination.trim()) {
      setTripData(generateTripData());
    }
  }, [origin, destination]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <motion.div
        className="ev-card space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
            <input
              type="text"
              placeholder="Origen"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground font-rajdhani text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
            <input
              type="text"
              placeholder="Destino"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground font-rajdhani text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!origin.trim() || !destination.trim()}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-orbitron font-bold uppercase tracking-wider text-sm transition-all hover:shadow-[0_0_20px_hsl(199,89%,48%,0.4)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Calcular Ruta
        </button>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {tripData && (
          <motion.div
            key={JSON.stringify(tripData)}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Zap, label: "Km disponibles", value: `${tripData.available}`, color: "text-success" },
                { icon: Route, label: "Km recorridos", value: `${tripData.traveled}`, color: "text-primary" },
                { icon: Clock, label: "Tiempo est.", value: tripData.time, color: "text-warning" },
              ].map(({ icon: Icon, label, value, color }, i) => (
                <motion.div
                  key={label}
                  className="ev-card text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
                  <p className={`text-2xl font-orbitron font-bold ${color}`}>{value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Routes */}
            <div>
              <h3 className="font-orbitron text-xs uppercase tracking-[0.2em] text-primary mb-3">
                Mejores Rutas
              </h3>
              <div className="space-y-2">
                {tripData.routes.map((route, i) => (
                  <motion.div
                    key={route.name}
                    className="ev-card flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-orbitron font-bold ${
                        i === 0 ? "bg-success/20 text-success" : "bg-secondary text-muted-foreground"
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{route.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {route.time} · {route.distance}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripTab;
