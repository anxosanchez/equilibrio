import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRANSLATIONS } from '../lib/translations';

const NanoCam = ({ tube, language }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const ratio = tube?.equilibriumRatio || 0;
  const type = tube?.type || "CHROMATE";
  const [subtitle, setSubtitle] = useState("");
  const t = TRANSLATIONS[language];

  // Lóxica de subtítulos pedagóxicos
  useEffect(() => {
    if (!tube) {
      setSubtitle(t.hud.no_signal);
      return;
    }

    if (type === "CHROMATE") {
      if (ratio < 0.3) setSubtitle(t.hud.chromate_reactant);
      else if (ratio > 0.7) setSubtitle(t.hud.chromate_product);
      else setSubtitle(t.hud.chromate_eq);
    } else {
      if (ratio < 0.3) setSubtitle(t.hud.copper_reactant);
      else if (ratio > 0.7) setSubtitle(t.hud.copper_product);
      else setSubtitle(t.hud.copper_eq);
    }
  }, [ratio, type, tube, language, t]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    const initParticles = () => {
      particles.current = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1,
        species: Math.random() > ratio ? "reactant" : "product"
      }));
    };

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.4)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        let color;
        if (type === "CHROMATE") {
           color = p.species === "reactant" ? "#FFD700" : "#FF8C00";
        } else {
           color = p.species === "reactant" ? "#ADD8E6" : "#4F46E5";
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;

        if (Math.random() < 0.02) {
          p.species = Math.random() < ratio ? "product" : "reactant";
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    initParticles();
    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, [ratio, type]);

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      <canvas ref={canvasRef} width={400} height={200} className="w-full h-full" />
      
      {/* HUD overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
         <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{t.hud.active}</span>
         </div>
         <AnimatePresence mode='wait'>
           <motion.p 
             key={subtitle}
             initial={{ opacity: 0, y: 5 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -5 }}
             className="text-[10px] text-white font-bold leading-tight"
           >
             {subtitle}
           </motion.p>
         </AnimatePresence>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};

export default NanoCam;
