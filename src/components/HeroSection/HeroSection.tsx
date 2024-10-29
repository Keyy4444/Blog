import Image from "next/image";
import React from "react";
import cn from "classnames";

interface HeroSectionProps {
  title: string;
  description: string;
  img?: string;
}

export default function HeroSection({
  title,
  description,
  img,
}: HeroSectionProps) {
  return (
    <section
      className={
        "pt-[80px] min-h-96 flex flex-col justify-center lg:min-h-64 lg:pb-4"
      }
      style={{
        background:
          "linear-gradient(270deg, rgba(239, 234, 229, 1), rgba(218, 238, 235, 1))",
      }}
    >
      <div className="container">
        <div
          className={cn(
            "flex flex-row gap-8 justify-end items-center md:flex-col-reverse",
            {
              "justify-between": img,
            }
          )}
        >
          {img && (
            <div className="relative flex shrink-0 grow-0 w-full max-w-[450px] h-[256px] rounded-2xl object-contain xl:h-[200px] xl:w-[360px] lg:h-[150px] lg:w-[263px] md:h-[250px] md:w-full md:shrink sm:h-[150px] sm:w-[263px]">
              <Image
                src={img}
                alt={`${title} post image`}
                fill
                className="rounded-2xl md:shrink"
              />
            </div>
          )}
          <div
            className={
              "flex flex-col gap-6 items-end h-full text-end md:text-start md:items-start md:self-start"
            }
          >
            <div className="text-4xl font-semibold text-transform: capitalize italic sm:text-3xl">
              {title}
            </div>
            <div className="flex flex-wrap text-xl font-light italic text-end md:text-start sm:text-lg">
              {description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
