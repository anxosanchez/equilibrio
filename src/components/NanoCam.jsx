import React, { useEffect, useRef } from 'react';

const NanoCam = ({ tube }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const ratio = tube?.equilibriumRatio || 0;
  const type = tube?.type || "CHROMATE";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    const initParticles = () => {
      particles.current = Array.from({ length: 40 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
        // Cor depende do estado de equilibrio
        species: Math.random() > ratio ? "reactant" : "product"
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background glow based on ratio
      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, canvas.width
      );
      const color1 = type === "CHROMATE" ? "#FFD700" : "#ADD8E6"; // Yellow or Light Blue
      const color2 = type === "CHROMATE" ? "#FF8C00" : "#00008B"; // Orange or Deep Blue
      
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        // Actualizar posición
        p.x += p.vx;
        p.y += p.vy;

        // Rebotes
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Cor baseada na especie do sistema
        let color;
        if (type === "CHROMATE") {
           color = p.species === "reactant" ? "#FFD700" : "#FF8C00";
        } else {
           color = p.species === "reactant" ? "#ADD8E6" : "#00008B";
        }

        // Debuxar partícula con brillo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;

        // Se o ratio cambia, algunhas partículas cambian de especie ao chocar (ou ao azar)
        if (Math.random() < 0.01) {
          p.species = Math.random() < ratio ? "product" : "reactant";
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    initParticles();
    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, [ratio, type]);

  return <canvas ref={canvasRef} width={300} height={200} className="w-full h-full" />;
};

export default NanoCam;
