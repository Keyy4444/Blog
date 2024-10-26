import React, { useRef, useState } from "react";
import cn from "classnames";
import zoom from "../../../public/icons/zoom.svg";
import Image from "next/image";
import useClickOutside from "@/hooks/useClickOutside";

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);
  const searchBarRef = useRef(null);

  useClickOutside(searchBarRef, () => setIsActive(false));

  return (
    <div
      ref={searchBarRef}
      className={cn(
        "flex flex-row gap-2 border-[1px] border-black rounded-3xl px-2.5 py-1.5 w-40 transition-all text-black",
        {
          "bg-gray-200 w-96": isActive,
        }
      )}
    >
      <div className="flex relative w-[30px] h-[30px]">
        <Image src={zoom} alt="Search icon" fill />
      </div>
      <input
        className={cn("w-full bg-inherit text-black focus-visible:outline-0", {
          //   "bg-slate-400": isActive,
        })}
        // id={id}
        // maxLength={length}
        placeholder={!isActive ? "Search" : ""}
        onClick={() => setIsActive(true)}
        // value={value}
        // onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
