"use client";
import React from "react";
import cn from "classnames";
import Image from "next/image";
import pencil from "../../../public/icons/pencil.svg";
import useScrollDetection from "@/hooks/useScrollDetection";
import SearchBar from "../SearchBar/SearchBar";

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
        <div className="flex flex-row gap-5 items-center justify-center">
          <p>My Blog</p>
          <div className="flex relative w-[30px] h-[30px]">
            <Image src={pencil} alt="Pencil icon" fill />
          </div>
        </div>
        <SearchBar />
      </div>
    </header>
  );
}
