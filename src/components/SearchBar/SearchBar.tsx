import React, { useRef, useState } from "react";
import cn from "classnames";
import zoom from "../../../public/icons/zoom.svg";
import Image from "next/image";
import useClickOutside from "@/hooks/useClickOutside";

interface searchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: searchBarProps) {
  const [isActive, setIsActive] = useState(false);
  const searchBarRef = useRef(null);

  useClickOutside(searchBarRef, () => setIsActive(false));

  return (
    <div
      ref={searchBarRef}
      className={cn(
        "flex flex-row gap-2 border-[1px] border-black rounded-3xl px-2.5 py-1.5 w-1/5 transition-all duration-500 text-black lg:w-full",
        {
          "w-1/2 lg:w-full": isActive,
        }
      )}
    >
      <div className="flex relative w-[30px] h-[30px]">
        <Image src={zoom} alt="Search icon" fill />
      </div>
      <input
        className="w-full bg-inherit text-black focus-visible:outline-0"
        placeholder={!isActive ? "Search by title" : ""}
        onClick={() => setIsActive(true)}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
