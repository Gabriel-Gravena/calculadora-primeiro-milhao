'use client';

import { Button } from "./ui/button";
import { HeroChart } from "./HeroChart";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import { useAuth } from '../contexts/AuthContexts';
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter()

    const handleLoginClick = () => {
        console.log("entrou na handle")
        if (isAuthenticated) {
            router.push('/calculator');
        } else {
            router.push('/login');
        }
    };


    return (
        <section className="min-h-screen flex items-center bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0A1628] relative overflow-hidden">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-20 py-16 md:py-2 flex flex-col justify-center">
                <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-10 xl:gap-16">
                    
                    <div className="space-y-6 mt-14 lg:mt-0 text-center xl:text-left order-2 xl:order-1">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-extrabold text-white tracking-tight">
                            Visualize seu caminho
                            <span className="block mt-2 bg-linear-to-r from-[#3B82F6] via-[#10B981] to-[#D4AF37] bg-clip-text text-transparent">
                                para o primeiro milhão
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-[#CBD5E1] font-medium max-w-2xl mx-auto xl:mx-0 leading-relaxed">
                            Simule seus investimentos, projete seu crescimento e transforme pequenos aportes em uma fortuna com o poder dos juros compostos.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-3 xl:gap-4 pt-3">
                            <Button 
                                size="lg" 
                                className="group  cursor-pointer bg-linear-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-bold px-6 lg:px-8 py-5 lg:py-6 text-sm lg:text-base shadow-lg hover:shadow-[#3B82F6]/40 transition-all duration-300 hover:scale-[1.03]"
                                onClick={() => router.push("/signup")}
                            >
                                <span className="flex items-center gap-2">
                                    Começar Simulação Gratuita
                                    <ArrowRight className="w-4 lg:w-5 h-4 lg:h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>

                            <Button 
                                size="lg"
                                className="border-2  cursor-pointer border-[#475569] text-[#E2E8F0] hover:bg-[#334155]/60 hover:border-[#64748B] backdrop-blur-sm font-bold px-6 lg:px-8 py-5 lg:py-6 text-sm lg:text-base transition-all duration-300 hover:scale-[1.03]"
                                onClick={ handleLoginClick }
                            >
                                Já tenho uma conta
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#334155] max-w-md mx-auto xl:mx-0">
                            {[
                                { icon: Users, color: "#10B981", label: "Usuários Ativos", value: "10k+" },
                                { icon: TrendingUp, color: "#10B981", label: "Projetado", value: "R$2B+" },
                            ].map((item, i) => (
                                <div key={i} className="space-y-1 group cursor-default">
                                    <div className="flex justify-center xl:justify-start">
                                        <item.icon className={`w-4 h-4`} style={{ color: item.color }} />
                                    </div>
                                    <p className="text-2xl xl:text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-[#3B82F6] via-[#10B981] to-[#D4AF37] group-hover:scale-110 transition-transform">
                                        {item.value}
                                    </p>
                                    <p className="text-xs sm:text-sm text-[#94A3B8] font-semibold">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1  xl:h-max xl:order-2 flex justify-center xl:justify-end">
                        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                            <div className="bg-linear-to-br  from-[#1E293B]/60 to-[#0F172A]/60 backdrop-blur-sm rounded-2xl xl:rounded-3xl p-4 sm:p-6 border border-[#334155] shadow-2xl shadow-[#3B82F6]/15">
                                <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-[#3B82F6]/20">
                                    <HeroChart />
                                </div>
                            </div>

                            <div className="absolute  -bottom-10 left-1/2 -translate-x-1/2 bg-linear-to-br from-[#1E293B] to-[#0F172A] backdrop-blur-md rounded-2xl px-6 py-3 border border-[#334155] shadow-2xl">
                                <div className=" flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-[#10B981]" strokeWidth={2.5} />
                                    <p className="text-sm font-black text-white">
                                        Taxa média <span className="text-[#10B981]">+12.8% a.a.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
