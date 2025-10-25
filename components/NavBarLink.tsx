"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinkProps {
  href: string;
  label: string;
}

export function NavbarLink({ href, label }: NavbarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 ${
        isActive ? "text-[#10B981]" : "text-[#E2E8F0] hover:text-white"
      }`}
    >
      {label}
      {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#10B981] rounded-full"></span>}
    </Link>
  );
}
