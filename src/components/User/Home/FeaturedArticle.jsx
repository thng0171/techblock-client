import React, { useState, useEffect } from "react";
import { getTopArticles } from "../../../api/articles";
export function FeaturedArticle() {
  const [trendingArticles, setTrendingArticles] = useState([]);

  useEffect(() => {
    getTopArticles(2,3)
      .then((res) => {
        setTrendingArticles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="flex h-full w-full flex-col  gap-4 py-4 md:flex-row">
      <div className="flex-[5] overflow-hidden">
        <Article3 article={trendingArticles?.[0]} size={"xl"} />
      </div>
      <div className="flex flex-[3] flex-col gap-4  overflow-hidden">
        {trendingArticles?.slice(1, 3).map((article) => (
          <Article3 article={article} key={article._id} />
        ))}
      </div>
    </section>
  );
  function Article3({ article, size, desc }) {
    return (
      <div
        className={`relative h-full  w-auto space-y-2 overflow-hidden duration-200 hover:opacity-80`}
        key={article?._id}
      >
        <a
          href={`/article/${article?.slug}`}
        >
        {/* banner */}
        <div className="relative aspect-video h-full w-full">
          <img
            className=" h-full w-full object-cover"
            src={`${import.meta.env.VITE_IMAGE_URL}${article?.coverImage}`}
            alt=""
          />
        </div>
        {/* info   */}

        <div className={`absolute bottom-0 z-20 space-y-1 ${size === "xl" ? "lg:p-5 p-3" : 'lg:p-4 p-3'} text-slate-50`}>
          <div
            className={`inline-flex items-center gap-0.5 text-xs text-slate-300 ${
              size === "xl" && "lg:text-sm"
            }`}
          >
            <div className="bg-slate-100 px-2 py-0.5 font-bold uppercase tracking-wide text-slate-900">
              {article?.category}
            </div>
            {/* <div className="">
                  {dayjs(article?.createdAt).format("DD/MM/YYYY")}
                </div> */}
          </div>
          {/* title */}
          <h1
            className={`${
              size === "xl" ? "md:text-xl lg:text-4xl" : "lg:text-xl "
            } font-semibold pt-1 leading-snug tracking-tight  md:leading-snug  md:tracking-tight`}
          >
            {article?.title}
          </h1>
          {/* {desc && (
                  <p className="hidden pt-2 text-xs text-slate-400 duration-200 md:line-clamp-3 lg:text-sm ">
                    {article?.content}
                  </p>
                )} */}
        </div>
        {/* overlay */}
        <div className="absolute inset-0 z-0 space-y-1 bg-gradient-to-t from-slate-900 to-transparent p-4"></div>
          </a>      
      </div>
    );
  }
}
