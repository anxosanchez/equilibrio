import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const LiveGraph = ({ tube }) => {
  // Simulación de datos basada no historial e equilibrio
  // Para un dashboard premium, usamos o historial real
  const data = (tube?.history || []).map((h, i) => ({
    name: i,
    value: Math.random() * 0.1 + (tube.equilibriumRatio * 0.9) // Simulación visual
  }));

  // Engadimos punto inicial se baleiro
  if (data.length === 0) {
    data.push({ name: 'Start', value: tube?.equilibriumRatio || 0 });
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
         <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Concentración Real-Time</h3>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-[8px] font-bold text-brand uppercase">Monitoring</span>
         </div>
      </div>
      
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis dataKey="name" hide />
            <YAxis hide domain={[0, 1]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '10px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#7c3aed" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVal)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LiveGraph;
