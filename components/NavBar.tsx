"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContexts";
import { Button } from "@/components/ui/button";
import { NavbarLink } from "./NavBarLink";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  if (!isAuthenticated) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-br from-[#0F172A]/90 via-[#1E293B]/90 to-[#0A1628]/90 border-b border-[#334155] backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="hidden md:flex items-center gap-6">
          <NavbarLink href="/calculator" label="Calculadora" />
          <NavbarLink href="/history" label="Histórico" />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
              className="cursor-pointer bg-linear-to-r from-[#3B82F6] to-[#2563EB] text-white font-semibold px-4 py-2 rounded-md"
            >
              Sair
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden cursor-pointer text-[#E2E8F0]"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0F172A]/95 border-t border-[#334155] flex flex-col items-center py-4 gap-3">
          <NavbarLink href="/calculator" label="Calculadora" />
          <NavbarLink href="/history" label="Histórico" />
          <Button
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className="cursor-pointer bg-linear-to-r from-[#3B82F6] to-[#2563EB] text-white font-semibold px-5 py-2"
          >
            Sair
          </Button>
        </div>
      )}
    </nav>
  );
}
