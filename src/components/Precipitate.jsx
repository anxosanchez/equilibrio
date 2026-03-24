import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Precipitate = ({ intensity }) => {
  const particles = useMemo(() => {
    return Array.from({ length: Math.floor(intensity * 15) }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 20 + 70,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }));
  }, [intensity]);

  return (
    <div className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ 
             opacity: [0.4, 0.8, 0.4],
             y: [0, -5, 0],
             x: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay 
          }}
          style={{
            left: `${p.x}%`,
            bottom: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: '#00BFFF', // Azul de precipitado Cu(OH)2
            filter: 'blur(0.5px)',
            boxShadow: '0 0 4px rgba(0,191,255,0.5)'
          }}
          className="absolute rounded-sm"
        />
      ))}
    </div>
  );
};

export default Precipitate;
