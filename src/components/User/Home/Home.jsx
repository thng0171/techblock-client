import React from "react";
import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import dayjs from "dayjs";
import locale_vi from "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import { getArticles } from "../../../api/articles";
import { FeaturedArticle } from "./FeaturedArticle";
import { TopArticle } from "./TopArticle";
import { ArticleCard } from "./ArticleCard";
dayjs.extend(relativeTime);
dayjs.locale(locale_vi);

export default function Home() {
  return (
    <>
      <main className="">
        <FeaturedArticle />
        <section className="grid gap-4 py-6 md:grid-cols-3">
          <div className="md:col-span-2 ">
            <LastestArticles />
          </div>
          <TopArticle />
        </section>
      </main>
    </>
  );
}
function LastestArticles() {
  const [lastestArticle, setLastestArticle] = useState([]);
  const [loadMore, setLoadMore] = useState(15);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(loadMore);
    getArticles()
      .then((res) => {
        setLastestArticle(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //  load more 10 article  when scroll to bottom
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !loading
      ) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setLoadMore(loadMore + 15);
        }, 500);
      }
    });
  }, []);

  return (
    <>
      <Header title={"Mới nhất"} />
      <div className="my-3 grid  divide-y md:grid-rows-1 ">
        {lastestArticle?.slice(0, loadMore).map((article) => (
          <ArticleCard key={article._id} relativeTime article={article} />
        ))}
        {/* loading  */}
        {lastestArticle?.length > loadMore && loading && (
          <div className="flex items-center justify-center">
            <ImSpinner8 size={26} className=" animate-spin" />
          </div>
        )}
      </div>
    </>
  );
}

export function Header({ title }) {
  return (
    <div className="border-t-2 border-slate-900">
      <div className="inline-block bg-slate-900 px-3 py-1 font-semibold uppercase text-slate-50">
        {title}
      </div>
    </div>
  );
}
