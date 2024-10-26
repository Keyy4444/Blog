import React from "react";
import ArticleCard from "../ArticleCard/ArticleCard";

export default function Blog() {
  return (
    <section>
      <div className="container p-16 2xl:p-12 md:p-8 sm:px-5 sm:py-8">
        <div className="grid grid-cols-3 gap-4 gap-x-8 gap-y-8 2xl:grid-cols-2 md:grid-cols-1 sm:gap-y-6">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </div>
    </section>
  );
}
