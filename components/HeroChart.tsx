"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const data = [
    { name: "Ano 1", value: 52000, label: "2025", aporte: 30000 },
    { name: "Ano 2", value: 125000, label: "2026", aporte: 60000 },
    { name: "Ano 3", value: 235000, label: "2027", aporte: 90000 },
    { name: "Ano 4", value: 395000, label: "2028", aporte: 120000 },
    { name: "Ano 5", value: 610000, label: "2029", aporte: 150000 },
    { name: "Ano 6", value: 820000, label: "2030", aporte: 180000 },
    { name: "Ano 7", value: 1047832, label: "2031", aporte: 210000 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const rendimento = payload[0].value - payload[0].payload.aporte;
        const percentual = ((rendimento / payload[0].payload.aporte) * 100).toFixed(1);

        return (
            <div className="bg-white/95 px-5 py-4 rounded-2xl shadow-xl border border-[#6d997a]/40 backdrop-blur-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#3B82F6]">
                    <div className="w-2 h-2 rounded-full bg-[#6d997a] animate-pulse"></div>
                    <p className="text-sm font-black text-[#42282c] uppercase tracking-wide">
                        {payload[0].payload.label}
                    </p>
                </div>

                <div className="space-y-2">
                    <div>
                        <p className="text-sm lg:text-xl text-[#42282c]/60 font-bold mb-1">
                            Patrimônio Total
                        </p>
                        <p className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-[#6d997a] to-[#6ca19e] bg-clip-text text-transparent">
                            R$ {payload[0].value.toLocaleString("pt-BR")}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                            <p className="text-xs text-[#42282c]/60 font-semibold mb-1">
                                Aporte
                            </p>
                            <p className="text-sm font-bold text-[#84abaa]">
                                R$ {payload[0].payload.aporte.toLocaleString("pt-BR")}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-[#42282c]/60 font-semibold mb-1">
                                Rendimento
                            </p>
                            <p className="text-sm font-bold text-[#6d997a]">+{percentual}%</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const CustomDot = (props: any) => {
    const { cx, cy } = props;
    return (
        <g>
            <circle cx={cx} cy={cy} r={12} fill="#6d997a" opacity={0.15} className="animate-ping" />
            <circle cx={cx} cy={cy} r={7} fill="#6d997a" opacity={0.4} />
            <circle
                cx={cx}
                cy={cy}
                r={5}
                fill="#6d997a"
                stroke="#ffffff"
                strokeWidth={3}
                filter="drop-shadow(0 2px 4px rgba(109, 153, 122, 0.4))"
            />
        </g>
    );
};

export function HeroChart() {
    return (
        <div className="w-full h-[500px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#0A1628] shadow-inner transition-all duration-500">


            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-80px] right-[-80px] w-64 h-64 bg-[#6d997a]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-[#6ca19e]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="hidden lg:block absolute top-6 left-6 z-10 px-5 py-3 bg-[#0F172A]/70 backdrop-blur-md rounded-2xl border border-[#3B82F6]/30 shadow-md">

                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                    <p className="text-sm font-black text-[#10B981]">
                        Primeiro <span className="text-[#10B981] text-base">Milhão</span>
                    </p>
                </div>
                <p className="text-xs text-[#10B981]/60 font-semibold mt-1">em apenas 7 anos</p>
            </div>

            <div className=" absolute top-6 right-6 z-10 px-4 py-3 bg-[#1E293B]/70 backdrop-blur-md rounded-2xl border border-[#10B981]/30 shadow-md">

                <p className="text-xs text-[#10B981]/60 font-bold mb-1 uppercase tracking-wide">
                    Meta alcançada
                </p>
                <p className="text-1xl lg:text-2xl font-black bg-gradient-to-r from-[#6d997a] via-[#84abaa] to-[#6ca19e] bg-clip-text text-transparent">
                    R$ 1.047.832
                </p>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 60, right: 30, bottom: 30, left: 30 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6} /> 
                            <stop offset="40%" stopColor="#10B981" stopOpacity={0.5} /> 
                            <stop offset="100%" stopColor="#0F172A" stopOpacity={0.2} /> 
                        </linearGradient>

                        <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="50%" stopColor="#10B981" /> 
                            <stop offset="100%" stopColor="#D4AF37" /> 
                        </linearGradient>

                        <filter id="shadow">
                            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#6d997a" floodOpacity="0.4" />
                        </filter>
                    </defs>

                    <CartesianGrid strokeDasharray="5 5" stroke="#42282c" strokeOpacity={0.1} vertical={false} />
                    <XAxis
                        dataKey="label"
                        stroke="#42282c"
                        strokeOpacity={0.3}
                        tick={{ fill: "#10B981", fontSize: 13, fontWeight: 600 }}
                        tickLine={false}
                        axisLine={{ strokeOpacity: 0.2 }}
                        tickMargin={12}
                    />
                    <YAxis
                        stroke="#42282c"
                        strokeOpacity={0.3}
                        tick={{ fill: "#10B981", fontSize: 13, fontWeight: 600 }}
                        tickLine={false}
                        axisLine={{ strokeOpacity: 0.2 }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        width={60}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="url(#strokeGradient)"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        filter="url(#shadow)"
                        dot={<CustomDot />}
                        activeDot={{
                            r: 10,
                            fill: "#6d997a",
                            stroke: "#ffffff",
                            strokeWidth: 3,
                            filter: "drop-shadow(0 4px 8px rgba(109,153,122,0.4))",
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>

            <div className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl border border-[#84abaa]/30 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#6d997a] via-[#84abaa] to-[#6ca19e]"></div>
                    <span className="text-sm font-black text-[#10B981]">Crescimento Patrimonial</span>
                </div>
                <div className="flex items-center gap-2 pl-6 border-l border-[#ded1b6]">
                    <div className="w-3 h-3 rounded-full bg-[#6d997a] border-2 border-white shadow-sm"></div>
                    <span className="text-xs font-bold text-[#42282c]/70">Marcos Anuais</span>
                </div>
            </div>
        </div>
    );
}
