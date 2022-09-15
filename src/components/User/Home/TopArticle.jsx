import React from "react";
import { useEffect, useState } from "react";
import { getTopArticles } from "../../../api/articles";
import { Header } from "./Home";
import { ArticleCard2 } from "./ArticleCard2";

export function TopArticle() {
  const [topArticles, setTopArticles] = useState([]);
  useEffect(() => {
    getTopArticles(7,10)
      .then((res) => {
        setTopArticles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="hidden h-fit w-full md:block lg:pl-6 ">
      <Header title={"Nổi bật trong tuần"} />
      <div className="my-3 flex flex-col gap-2  divide-y">
        {topArticles?.slice(0,10).map((article) => (
          <ArticleCard2 key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}
