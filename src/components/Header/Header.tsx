"use client";
import React from "react";
import cn from "classnames";
import useScrollDetection from "@/hooks/useScrollDetection";
import Link from "next/link";

export default function Header() {
  const isScrolled = useScrollDetection(0);
  return (
    <header
      className={cn(
        "w-full fixed z-10 transition-[background] duration-[0.5s] ease-[ease] top-0 background-color: transparent",
        { "bg-biege": isScrolled }
      )}
    >
      <div className="container h-[80px] max-w-screen-2xl flex flex-row justify-between items-center">
        <nav className="flex flex-row gap-5 items-center justify-center">
          <Link href="/" className="text-lg font-semibold">
            Home
          </Link>
          <Link href="/admin/" className="text-lg font-semibold">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
