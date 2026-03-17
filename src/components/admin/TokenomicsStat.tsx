import { motion } from "motion/react";

// Parent variant (controls the whole group)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,          // ← this creates the nice cascade
      delayChildren: 0.1,             // optional small delay before first child starts
    },
  },
};

// Each stat item variant
const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],     // nice modern easing
    },
  },
};

const stats = [
  { value: "50%", label: "MINING REWARDS" },
  { value: "20%", label: "COMMUNITY REWARDS" },
  { value: "10%", label: "TEAM" },
  { value: "15%", label: "FOUNDATION" },
  { value: "5%",  label: "LAUNCH LIQUIDITY" },
];

export default function TokenomicsStats() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12 justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="flex flex-col md:items-start md:text-left"
        >
          <span className="font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
            {stat.value}
          </span>
          <span className="text-base md:text-xl text-muted-foreground mt-1 font-medium">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}