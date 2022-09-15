import React from "react";
import dayjs from "dayjs";

export function ArticleCard({ article, relativeTime }) {
  return (
    <a
      href={`/article/${article.slug}`}
      className="grid grid-cols-3 gap-3 py-2 duration-200 hover:opacity-80 lg:gap-4 lg:py-3  "
    >
      {/* image */}
      <div className="aspect-[1.618] overflow-hidden">
        <img
          className=" h-full w-full object-cover "
          src={`${import.meta.env.VITE_IMAGE_URL}${article.coverImage}`}
          alt=""
        />
      </div>
      {/* info */}
      <div className="col-span-2 md:space-y-1">
        {/* cat and time */}
        <div className="flex items-center gap-1 text-xs text-slate-500 lg:text-sm">
          <div className="font-semibold uppercase text-teal-500">
            {article.category}
          </div>
          <span>-</span>
          <div className="">
            {relativeTime
              ? dayjs(article?.createdAt).fromNow()
              : dayjs(article?.createdAt).format("DD/MM/YYYY")}
          </div>
        </div>
        {/* title */}
        <div className="text-[0.9rem] font-semibold leading-tight md:text-base lg:text-lg lg:leading-tight lg:tracking-tight">
          {article.title}
        </div>
      </div>
    </a>
  );
}
