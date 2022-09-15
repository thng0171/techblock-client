import React from "react";
// import { FaCommentAlt } from "react-icons/fa";
import dayjs from "dayjs";

export function ArticleCard2({ article }) {
  return (
    <a
      href={`/article/` + article.slug}
      className="py-2  duration-200 hover:opacity-80"
    >
      {/* <div className="aspect-square flex-1  overflow-hidden">
              <img
                className="h-full w-full object-cover "
                src={article.coverImage || "images/noimage.png"}
                alt=""
              />
            </div> */}
      <div>
        <div className="inline-flex items-center gap-1 text-xs text-slate-500">
          {/* time */}
          <div className="text-xs font-medium uppercase tracking-wide text-teal-600">
            {article.category}
          </div>
          <div>-</div>
          <div>{dayjs(article?.createdAt).fromNow()}</div>
          {/* comment number with icon */}
          {/* {article.comments && (
            <div className="flex items-center gap-1 ">
              <FaCommentAlt size={12} /> {article.comments?.length}
            </div>
          )} */}
        </div>
        <div className="text-sm font-medium lg:font-medium tracking-tight lg:text-base lg:leading-snug ">
          {article.title}
        </div>
      </div>
    </a>
  );
}
