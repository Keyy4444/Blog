"use client";
import React from "react";
import cn from "classnames";

export default function Header() {
  return (
    <header
      className={cn(
        "w-full fixed z-10 transition-[background] duration-[0.5s] ease-[ease] top-0 background-color: transparent"
      )}
    >
      <div className="container h-[100px] max-w-screen-2xl flex flex-row justify-between items-center">
        <div className="">My blog</div>
        <div>Filter</div>
      </div>
    </header>
  );
}
