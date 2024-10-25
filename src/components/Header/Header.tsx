"use client";
import React from "react";
import cn from "classnames";
import Image from "next/image";
import pencil from "../../../public/icons/pencil.svg";

export default function Header() {
  return (
    <header
      className={cn(
        "w-full fixed z-10 transition-[background] duration-[0.5s] ease-[ease] top-0 background-color: transparent"
      )}
    >
      <div className="container h-[100px] max-w-screen-2xl flex flex-row justify-between items-center">
        <div className="flex flex-row gap-5 items-center justify-center">
          <p>My Blog</p>
          <div className="flex relative w-[30px] h-[30px]">
            <Image src={pencil} alt="Pencil icon" fill />
          </div>
        </div>
        <div>Filter</div>
      </div>
    </header>
  );
}
