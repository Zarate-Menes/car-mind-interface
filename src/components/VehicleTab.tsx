import { motion } from "framer-motion";
import { Battery, Gauge, Thermometer, Droplets, Snowflake } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const StatusCard = ({
  icon: Icon,
  label,
  value,
  unit,
  status,
  subtitle,
  index,
  progress,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit?: string;
  status: "ok" | "warn" | "danger";
  subtitle?: string;
  index: number;
  progress?: number;
}) => {
  const statusColor =
    status === "ok"
      ? "text-success"
      : status === "warn"
      ? "text-warning"
      : "text-destructive";

  const progressColor =
    status === "ok"
      ? "bg-success"
      : status === "warn"
      ? "bg-warning"
      : "bg-destructive";

  return (
    <motion.div
      className="ev-card flex flex-col gap-3"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileTap={{ scale: 0.97 }}
    >
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-lg bg-secondary ${statusColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold font-orbitron ${statusColor}`}>
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground">{unit}</span>
        )}
      </div>

      {progress !== undefined && (
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${progressColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      )}

      {subtitle && (
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      )}
    </motion.div>
  );
};

const VehicleTab = () => {
  return (
    <div className="space-y-6">
      {/* Energy */}
      <div>
        <h3 className="font-orbitron text-xs uppercase tracking-[0.2em] text-primary mb-3">
          Energía
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatusCard
            icon={Battery}
            label="Batería"
            value={78}
            unit="%"
            status="ok"
            progress={78}
            subtitle="Autonomía: ~310 km"
            index={0}
          />
        </div>
      </div>

      {/* Security */}
      <div>
        <h3 className="font-orbitron text-xs uppercase tracking-[0.2em] text-primary mb-3">
          Seguridad
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatusCard
            icon={Gauge}
            label="Presión de llantas"
            value={32}
            unit="PSI"
            status="ok"
            subtitle="Rango recomendado: 30–35 PSI"
            index={1}
          />
          <StatusCard
            icon={Thermometer}
            label="Temp. del sistema"
            value={90}
            unit="°C"
            status="warn"
            subtitle="Límite: 110°C"
            index={2}
          />
        </div>
      </div>

      {/* Fluids */}
      <div>
        <h3 className="font-orbitron text-xs uppercase tracking-[0.2em] text-primary mb-3">
          Fluidos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatusCard
            icon={Droplets}
            label="Nivel de aceite"
            value={85}
            unit="%"
            status="ok"
            progress={85}
            index={3}
          />
          <StatusCard
            icon={Snowflake}
            label="Anticongelante"
            value="Normal"
            status="ok"
            subtitle="Nivel óptimo"
            index={4}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleTab;
