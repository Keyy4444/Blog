import Link from "next/link";
import React from "react";

export default function ArticleCard() {
  return (
    <Link
      href="/"
      className="shadow-md transition-all duration-300 rounded-2xl hover:shadow-lg"
    >
      <div className="flex flex-col">
        <div className="h-64 bg-red-400 rounded-t-2xl"></div>
        <div className="flex flex-col gap-4 p-8">
          <div className="border-b-[1px] border-black pb-1 pl-2 text-lg font-bold">
            Title
          </div>
          <div className="text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
            ducimus eaque minima natus assumenda deserunt possimus inventore
            architecto. Modi aut consequatur expedita vero aperiam laborum
            cupiditate id earum in quod.
          </div>
        </div>
      </div>
    </Link>
  );
}
