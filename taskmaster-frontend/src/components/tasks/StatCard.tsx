interface StatProps {
  title: string;
  value: number;
  color: string;
  variant: 'progress' | 'dots' | 'chart' | 'badge';
  percentage?: number;
}

export function StatCard({title, value, color, variant, percentage }: StatProps) {
return (
    <div className="bg-white/50 backdrop-blur-md border border-white p-3 rounded-[24px] flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Icon Section */}
      <div className="w-8 h-8 flex-none rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
        <div className="w-4 h-4 rounded-lg shadow-sm" style={{ backgroundColor: color }} />
      </div>

      {/* Middle Text/Value Section */}
      <div className="flex-1 min-w-0">
        <p className="text-slate-400 font-medium text-[13px] mb-0.5">{title}</p>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-slate-800 leading-none">{value}</span>
          {variant === "progress" && (
             <div className="flex-1 h-1.5 bg-slate-100 rounded-full mt-1">
               <div 
                 className="h-full rounded-full transition-all duration-1000 ease-out" 
                 style={{ width: `${percentage}%`, backgroundColor: color }} 
               />
             </div>
          )}
        </div>
      </div>

      {/* Right Side Visuals matching your screenshot */}
      <div className="flex-none flex items-center justify-center min-w-[40px]">
        {variant === "progress" && (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="20" cy="20" r="16" stroke="#F1F5F9" strokeWidth="3" fill="transparent" />
              <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="3" fill="transparent" 
                strokeDasharray="100.5" strokeDashoffset={100.5 - (100.5 * (percentage || 0)) / 100} strokeLinecap="round" />
            </svg>
            <span className="absolute text-[8px] font-bold" style={{ color }}>{percentage}%</span>
          </div>
        )}
        
        {variant === "dots" && (
          <div className="flex gap-1 items-center opacity-40">
             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          </div>
        )}

        {variant === "badge" && (
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-100" style={{ backgroundColor: color }}>
            {value}
          </div>
        )}

        {variant === "chart" && (
          <div className="flex items-end gap-0.5 h-6 opacity-30">
             <div className="w-1.5 h-2 rounded-t-sm" style={{ backgroundColor: color }} />
             <div className="w-1.5 h-4 rounded-t-sm" style={{ backgroundColor: color }} />
             <div className="w-1.5 h-3 rounded-t-sm" style={{ backgroundColor: color }} />
          </div>
        )}
      </div>
    </div>
  );
}