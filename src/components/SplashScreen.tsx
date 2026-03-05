import { motion, AnimatePresence } from "framer-motion";
import { Car } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {}}
    >
      {/* Car animation */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        initial={{ x: "-100vw" }}
        animate={{ x: "100vw" }}
        transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        onAnimationComplete={onComplete}
      >
        <Car className="text-primary w-16 h-16 drop-shadow-[0_0_15px_hsl(199,89%,48%,0.6)]" />
      </motion.div>

      {/* Trail line */}
      <motion.div
        className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(199 89% 48% / 0.6), transparent)",
        }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Welcome text */}
      <motion.div className="relative z-10 text-center">
        <motion.h1
          className="font-orbitron text-5xl md:text-7xl font-bold tracking-widest text-foreground ev-text-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          {"BIENVENIDO".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="mt-4 h-[2px] mx-auto"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(199 89% 48%), transparent)",
          }}
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        />

        <motion.p
          className="mt-3 font-rajdhani text-lg text-muted-foreground tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          SISTEMA DE CONTROL EV
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
