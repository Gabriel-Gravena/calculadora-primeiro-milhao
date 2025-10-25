"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContexts";
import { useEffect } from "react";

interface AuthFormProps {
  mode: "signup" | "login";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated, setAuthenticated } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function checkSession() {
      try {
        if(mode === "signup"){
          return;
        }

        const res = await fetch(`${apiUrl}/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const user = await res.json();
          if (user) {
            setAuthenticated(true);
            router.push("/calculator");
          }
        }
      } catch (err) {
        router.push("/login")
      }
    }
    checkSession();
  }, [router, setAuthenticated, mode, apiUrl]);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      router.push("/calculator");
    } else {
      router.push("/login");
    }
  };

  const isSignup = mode === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isSignup
        ? `${apiUrl}/signup`
        : `${apiUrl}/signin`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Erro ao processar requisição");
      }

      setAuthenticated(true);

      router.push("/calculator");
    } catch (err) {
      const errorMessage = (err as Error).message;
      if (errorMessage !== "Erro no servidor") {
        setError(errorMessage);
      } else {
        setError("Erro no servidor, tente novamente");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A1628]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E293B]/70 backdrop-blur-md mx-5 lg:mx-0 border border-[#334155] shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-white text-center">
          {isSignup ? "Crie sua conta" : "Bem-vindo de volta"}
        </h1>

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] text-white border border-[#334155] focus:ring-2 focus:ring-[#3B82F6] focus:outline-none transition"
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-xl bg-[#0F172A] text-white border border-[#334155] focus:ring-2 focus:ring-[#3B82F6] focus:outline-none transition"
        />

        {error && (
          <p className="text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-bold py-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
        >
          {loading
            ? "Carregando..."
            : isSignup
              ? "Cadastrar e simular"
              : "Entrar na conta"}
        </Button>

        <p className="text-sm text-[#CBD5E1] text-center">
          {isSignup ? "Já tem uma conta?" : "Ainda não possui conta?"}{" "}
          <span
            onClick={isSignup ? handleLoginClick : () => router.push("/signup")}
            className="text-[#3B82F6] font-bold cursor-pointer hover:underline"
          >
            {isSignup ? "Entrar" : "Criar agora"}
          </span>
        </p>
      </form>
    </div>
  );
}