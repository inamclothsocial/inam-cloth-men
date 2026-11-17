import React from 'react';
import { motion } from 'framer-motion';

export default function NavActiveIndicator({ activeMetrics }) {
  if (!activeMetrics.isReady || !activeMetrics.containerWidth) return null;

  const { left, width, containerWidth } = activeMetrics;
  const yTop = 3;
  const yBottom = 40;
  const rTop = 10;
  const rBottom = 7;
  const x0 = left;
  const x1 = left + width;
  const W = containerWidth;

  const pathD = `M 0,${yBottom} L ${Math.max(0, x0 - rBottom)},${yBottom} Q ${x0},${yBottom} ${x0},${yBottom - rBottom} L ${x0},${yTop + rTop} Q ${x0},${yTop} ${x0 + rTop},${yTop} L ${x1 - rTop},${yTop} Q ${x1},${yTop} ${x1},${yTop + rTop} L ${x1},${yBottom - rBottom} Q ${x1},${yBottom} ${Math.min(W, x1 + rBottom)},${yBottom} L ${W},${yBottom}`;

  const transitionConfig = {
    type: 'spring',
    stiffness: 360,
    damping: 32,
    mass: 0.8,
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
      {/* Background Soft Glow / Tint inside active tab */}
      <motion.div
        className="absolute top-[3px] bottom-[2px] rounded-t-xl bg-gradient-to-b from-[#CAB27E]/[0.09] to-transparent"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          left: left,
          width: width,
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.4 },
          left: transitionConfig,
          width: transitionConfig,
        }}
      />

      {/* Connected Line SVG with curved top and curved bottom corners */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox={`0 0 ${W} 44`}
        preserveAspectRatio="none"
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke="#CAB27E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, d: pathD }}
          transition={{
            pathLength: { duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.4, delay: 0.2 },
            d: transitionConfig,
          }}
        />
      </svg>
    </div>
  );
}
