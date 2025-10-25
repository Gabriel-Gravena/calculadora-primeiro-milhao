"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";

type Simulation = {
  id: number;
  calculation_date: string;
  initial_contribution: number;
  monthly_contribution: number;
  monthly_rate: number;
  months_to_reach_goal: number | null;
};

export default function HistoricoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null); // id da simulação a excluir
  const [deleting, setDeleting] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    async function checkAuthAndFetch() {
      const me = await fetch(`${apiUrl}/me`, { credentials: "include" });
      if (!me.ok) {
        router.push("/login");
        return;
      }

      const res = await fetch(`${apiUrl}/simulation/history`, { credentials: "include" });
      if (!res.ok) {
        setSimulations([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setSimulations(data);
      setLoading(false);
    }

    checkAuthAndFetch();
  }, [router, apiUrl]);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);

    const res = await fetch(`${apiUrl}/simulation/${deleteId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setSimulations((prev) => prev.filter((x) => x.id !== deleteId));
      setDeleteId(null);
    } else {
      alert("Erro ao excluir");
    }
    setDeleting(false);
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A1628] text-white py-12 px-6">
        <div className="max-w-6xl mt-4 mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-extrabold">Histórico de Simulações</h1>
            <Button
              onClick={() => router.push("/calculator")}
              className="cursor-pointer bg-linear-to-r from-[#3B82F6] to-[#2563EB]"
            >
              Nova simulação
            </Button>
          </div>

          {loading ? (
            <p className="text-[#CBD5E1]">Carregando...</p>
          ) : simulations.length === 0 ? (
            <div className="bg-[#1E293B]/70 p-6 rounded-2xl border border-[#334155]">
              <p className="text-[#CBD5E1]">Nenhuma simulação salva ainda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-[#1E293B]/70 border border-[#334155] rounded-2xl backdrop-blur-md shadow-2xl">
              <table className="min-w-full text-sm text-[#E2E8F0]">
                <thead>
                  <tr className="text-left bg-[#0F172A]/60 text-[#94A3B8] uppercase text-xs tracking-wider">
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Aporte Inicial</th>
                    <th className="px-4 py-3">Aporte Mensal</th>
                    <th className="px-4 py-3">Taxa (%/mês)</th>
                    <th className="px-4 py-3">Meses p/ meta</th>
                    <th className="px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {simulations.map((s) => (
                    <tr key={s.id} className="border-t border-[#334155]/70 bg-[#1E293B]/30">
                      <td className="px-4 py-3">{new Date(s.calculation_date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">R$ {s.initial_contribution.toLocaleString("pt-BR")}</td>
                      <td className="px-4 py-3">R$ {s.monthly_contribution.toLocaleString("pt-BR")}</td>
                      <td className="px-4 py-3">{s.monthly_rate}%</td>
                      <td className="px-4 py-3">{s.months_to_reach_goal ?? "-"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setDeleteId(s.id)}
                            className="cursor-pointer text-sm bg-red-600/80 hover:bg-red-600"
                          >
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
            <h2 className="text-lg font-bold mb-3">Confirmar exclusão</h2>
            <p className="text-[#CBD5E1] mb-6">
              Tem certeza que deseja excluir esta simulação? Essa ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setDeleteId(null)}
                variant="outline"
                className="bg-[#334155]/40 text-[#CBD5E1] cursor-pointer hover:bg-[#475569]"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className="cursor-pointer bg-red-600 hover:bg-red-700"
              >
                {deleting ? "Excluindo..." : "Excluir"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
