"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Loader2, CheckCircle2, XCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface SimulationData {
  month: number;
  periodo: string;
  aporteMensal: number;
  aporteAcumulado: number;
  rendimentoMes: number;
  rendimentoAcumulado: number;
  total: number;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

export default function CalculadoraPage() {
  const router = useRouter();

  const [initial, setInitial] = useState<number>(0);
  const [monthly, setMonthly] = useState<number>(0);
  const [rate, setRate] = useState<number>(0.12);
  const [data, setData] = useState<SimulationData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [monthsToGoal, setMonthsToGoal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch(`${apiUrl}/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        router.push("/login");
      }
    }
    checkAuth();
  }, [router, apiUrl]);

  useEffect(() => {
    const savedState = localStorage.getItem("calculadora_state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setInitial(parsed.initial || 0);
        setMonthly(parsed.monthly || 0);
        setRate(parsed.rate || 0.12);
        setData(parsed.data || []);
        setTotal(parsed.total || 0);
        setMonthsToGoal(parsed.monthsToGoal || 0);
      } catch (error) {
        console.error("Erro ao carregar estado salvo:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const stateToSave = {
        initial,
        monthly,
        rate,
        data,
        total,
        monthsToGoal,
      };
      localStorage.setItem("calculadora_state", JSON.stringify(stateToSave));
    }
  }, [initial, monthly, rate, data, total, monthsToGoal]);

  function calcularInvestimento() {
    if (monthly <= 0 || rate <= 0) {
      exibirToast("error", "Preencha todos os campos corretamente.");
      return;
    }

    setLoading(true);

    const META = 1000000;
    const taxaDecimal = rate / 100;

    let montante = initial;
    let rendimentoAcumulado = 0;
    const historico: SimulationData[] = [];
    let mes = 0;

    while (montante < META) {
      mes++;

      const rendimentoMes = montante * taxaDecimal;
      rendimentoAcumulado += rendimentoMes;
      montante += rendimentoMes + monthly;

      const aporteAcumulado = initial + monthly * mes;

      historico.push({
        month: mes,
        periodo: `Mês ${mes.toString().padStart(2, "0")} / Ano ${Math.ceil(mes / 12)
          .toString()
          .padStart(2, "0")}`,
        aporteMensal: monthly,
        aporteAcumulado: parseFloat(aporteAcumulado.toFixed(2)),
        rendimentoMes: parseFloat(rendimentoMes.toFixed(2)),
        rendimentoAcumulado: parseFloat(rendimentoAcumulado.toFixed(2)),
        total: parseFloat(montante.toFixed(2)),
      });

      if (mes > 1000) break;
    }

    setTotal(montante);
    setData(historico);
    setMonthsToGoal(mes);
    setLoading(false);
  }

  async function salvarSimulacao() {
    if (data.length === 0) {
      exibirToast("error", "Calcule primeiro antes de salvar!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/simulation`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initial_contribution: initial,
          monthly_contribution: monthly,
          monthly_rate: rate,
          months_to_reach_goal: monthsToGoal
        }),
      });

      if (response.ok) {
        exibirToast("success", "Simulação salva com sucesso!");
      } else {
        exibirToast("error", "Erro ao salvar simulação.");
      }
    } catch (error) {
      exibirToast("error", "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  function exibirToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  function limparCalculadora() {
    setInitial(0);
    setMonthly(0);
    setRate(0.12);
    setData([]);
    setTotal(0);
    setMonthsToGoal(0);
    localStorage.removeItem("calculadora_state");
    exibirToast("success", "Calculadora limpa com sucesso!");
  }

  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0A1628] text-white px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            <div className="space-y-4 w-full md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Calcule seu{" "}
                <span className="bg-linear-to-r from-[#3B82F6] via-[#10B981] to-[#D4AF37] bg-clip-text text-transparent">
                  primeiro milhão
                </span>
              </h1>
              <p className="text-[#CBD5E1] text-base md:text-lg font-medium leading-relaxed">
                Insira os valores abaixo e descubra em quanto tempo você atingirá R$ 1.000.000,00 
                com o poder dos juros compostos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Aporte Inicial (R$)", value: initial, setter: setInitial },
                  { label: "Aporte Mensal (R$)", value: monthly, setter: setMonthly },
                  { label: "Taxa de Juros (% ao mês)", value: rate, setter: setRate, step: 0.01 },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm text-[#94A3B8] font-semibold mb-1">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      step={field.step || 1}
                      value={field.value}
                      onChange={(e) => field.setter(Number(e.target.value))}
                      className="w-full p-3 rounded-lg bg-[#1E293B] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={calcularInvestimento}
                  disabled={loading}
                  className="cursor-pointer bg-linear-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-bold px-6 py-5 text-sm lg:text-base shadow-lg hover:shadow-[#3B82F6]/40 transition-all duration-300 hover:scale-[1.03]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Calculando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Calcular <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>

                <Button
                  onClick={salvarSimulacao}
                  disabled={loading}
                  className="border-2 cursor-pointer border-[#475569] text-[#E2E8F0] hover:bg-[#334155]/60 hover:border-[#64748B] backdrop-blur-sm font-bold px-6 py-5 text-sm lg:text-base transition-all duration-300 hover:scale-[1.03]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Salvando...
                    </span>
                  ) : (
                    "Salvar Simulação"
                  )}
                </Button>

                {data.length > 0 && (
                  <Button
                    onClick={limparCalculadora}
                    className="border-2 cursor-pointer border-[#ef4444]/50 text-[#ef4444] hover:bg-[#ef4444]/10 hover:border-[#ef4444] backdrop-blur-sm font-bold px-6 py-5 text-sm lg:text-base transition-all duration-300 hover:scale-[1.03]"
                  >
                    Limpar
                  </Button>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-[#1E293B]/60 border border-[#334155] rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <CartesianGrid strokeDasharray="5 5" stroke="#334155" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#3B82F6"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-[#94A3B8] text-sm">
                  Preencha os campos e clique em Calcular para ver o gráfico.
                </div>
              )}
            </div>
          </div>

          {data.length > 0 && (
            <div className="bg-[#1E293B]/70 border border-[#334155] rounded-2xl backdrop-blur-md shadow-2xl">
              <div className="px-6 py-4 border-b border-[#334155]">
                <h3 className="text-lg font-semibold text-[#E2E8F0]">
                  Detalhamento Mês a Mês
                  <span className="text-sm text-[#94A3B8] ml-2">
                    ({data.length} meses simulados)
                  </span>
                </h3>
              </div>
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="min-w-full text-sm text-[#E2E8F0]">
                  <thead className="sticky top-0 bg-[#0F172A]/90 backdrop-blur-sm">
                    <tr className="text-left text-[#94A3B8] uppercase text-xs tracking-wider">
                      <th className="px-4 py-3">Mês/Ano</th>
                      <th className="px-4 py-3">Aporte do Mês (R$)</th>
                      <th className="px-4 py-3">Aporte Acumulado (R$)</th>
                      <th className="px-4 py-3">Rendimento do Mês (R$)</th>
                      <th className="px-4 py-3">Rendimento Acumulado (R$)</th>
                      <th className="px-4 py-3">Total Acumulado (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr
                        key={item.month}
                        className="border-t border-[#334155]/70 hover:bg-[#334155]/20 transition"
                      >
                        <td className="px-4 py-3">{item.periodo}</td>
                        <td className="px-4 py-3">
                          R$ {item.aporteMensal.toLocaleString("pt-BR")}
                        </td>
                        <td className="px-4 py-3">
                          R$ {item.aporteAcumulado.toLocaleString("pt-BR")}
                        </td>
                        <td className="px-4 py-3">
                          R$ {item.rendimentoMes.toLocaleString("pt-BR")}
                        </td>
                        <td className="px-4 py-3">
                          R$ {item.rendimentoAcumulado.toLocaleString("pt-BR")}
                        </td>
                        <td className="px-4 py-3">
                          R$ {item.total.toLocaleString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {total > 0 && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-center gap-3 text-2xl font-extrabold text-[#10B981]">
                <TrendingUp className="w-6 h-6" />
                Total final: R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-center text-[#CBD5E1] text-lg">
                Meta de <span className="font-bold text-[#10B981]">R$ 1.000.000,00</span> atingida em{" "}
                <span className="font-bold text-[#3B82F6]">{monthsToGoal} meses</span> 
                {" "}({Math.floor(monthsToGoal / 12)} anos e {monthsToGoal % 12} meses)
              </div>
            </div>
          )}
        </div>
      </main>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-2xl backdrop-blur-md border ${
            toast.type === "success"
              ? "bg-[#10B981]/10 border-[#10B981]/40 text-[#10B981]"
              : "bg-[#ef4444]/10 border-[#ef4444]/40 text-[#ef4444]"
          } transition-all duration-800`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          {toast.message}
        </div>
      )}
    </>
  );
}
