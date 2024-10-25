import React from "react";

export default function HeroSection() {
  return (
    <section
      className={"pt-[100px] min-h-96 flex flex-col justify-center"}
      style={{
        background:
          "linear-gradient(270deg, rgba(239, 234, 229, 1), rgba(218, 238, 235, 1))",
      }}
    >
      <div className="container">
        <div className="flex flex-col gap-6 items-end h-full pr-48 text-end lg:pr-32 md:pr-12 sm:pr-2">
          <div className="text-4xl font-semibold text-transform: capitalize italic sm:text-3xl">
            This is my blog
          </div>
          <div className="text-xl font-light italic text-end sm:text-lg">
            Some great and not so great articles
          </div>
        </div>
      </div>
    </section>
  );
}
