import { BlogPost } from "@/types/posts";
import Link from "next/link";
import React from "react";
import pen from "../../../public/icons/pen.svg";
import Image from "next/image";
import parse from "html-react-parser";

interface ArticleCardProps {
  data: BlogPost;
}

export default function ArticleCard({ data }: ArticleCardProps) {
  return (
    <Link
      href={`/${data.slug}`}
      className="shadow-md transition-all duration-300 rounded-2xl hover:shadow-lg"
    >
      <div className="flex flex-col">
        <div className="">
          <div className="h-64 relative rounded-t-2xl">
            {data.bannerImage ? (
              <Image
                src={data.bannerImage}
                alt="Pen icon"
                fill
                className="rounded-t-2xl"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Image
                src={pen}
                alt="Pen icon"
                fill
                className="rounded-t-2xl bg-gray-200"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-8">
          <div className="border-b-[1px] border-black pb-1 pl-2 text-lg font-bold">
            {data.title}
          </div>
          <div
            className="text-justify min-h-[120px]"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
              overflow: "hidden",
            }}
          >
            {parse(data.description)}
          </div>
        </div>
      </div>
    </Link>
  );
}
