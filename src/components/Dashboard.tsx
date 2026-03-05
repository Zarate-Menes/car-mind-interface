import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Snowflake, Map, CircleDot } from "lucide-react";
import VehicleTab from "./VehicleTab";
import ClimateTab from "./ClimateTab";
import TripTab from "./TripTab";

const tabs = [
  { key: "vehicle", label: "VEHÍCULO", icon: Car },
  { key: "climate", label: "CLIMA", icon: Snowflake },
  { key: "trip", label: "VIAJE", icon: Map },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("vehicle");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        className="px-6 pt-6 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-orbitron text-xl font-bold tracking-[0.3em] text-primary ev-text-glow">
          EV DASHBOARD
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <CircleDot className="w-3 h-3 text-success animate-pulse-glow" />
          <span className="text-xs text-success font-medium uppercase tracking-wider">
            Operación normal
          </span>
        </div>
      </motion.header>

      {/* Tabs */}
      <motion.nav
        className="px-6 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-1 bg-secondary/50 rounded-2xl p-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === key
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === key && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-xl ev-glow"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Content */}
      <main className="flex-1 px-6 pb-6 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "vehicle" && <VehicleTab />}
          {activeTab === "climate" && <ClimateTab />}
          {activeTab === "trip" && <TripTab />}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
