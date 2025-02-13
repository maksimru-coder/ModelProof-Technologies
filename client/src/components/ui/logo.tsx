
import { motion } from "framer-motion";

export function Logo() {
  return (
    <motion.svg
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      width="100%"
      height="100%"
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 md:h-[40px]"
    >
      <g className="text-primary">
        <path
          d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20z"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <circle
          cx="20"
          cy="20"
          r="2"
          fill="currentColor"
          className="animate-pulse"
        />
        <circle
          cx="30"
          cy="20"
          r="2"
          fill="currentColor"
          className="animate-pulse delay-100"
        />
        <circle
          cx="10"
          cy="20"
          r="2"
          fill="currentColor"
          className="animate-pulse delay-200"
        />
        <path
          stroke="currentColor"
          strokeWidth="1"
          d="M10 20h20"
        />
      </g>
      <text x="50" y="27" fill="currentColor" className="text-xl font-bold">
        ModelProof
      </text>
    </motion.svg>
  </motion.svg>
  );
}
