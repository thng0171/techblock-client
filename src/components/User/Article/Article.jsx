import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { request } from "../../../api/axios";
import { useContext } from "react";
import { Context } from "../../../context/Context";
import { CommentSection } from "./CommentSection";
import { ArticleContent } from "./ArticleContent";
function Breadcrumbs({ cat }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex items-center space-x-2 text-sm font-medium uppercase text-gray-500"
      >
        <li>
          <Link className="block transition-colors  hover:text-gray-700" to="/">
            Home
          </Link>
        </li>
        <li>/</li>

        <li>
          <Link
            to={`/search?cat=${cat}`}
            className="block text-gray-700 transition-colors hover:text-gray-700"
          >
            {cat}
          </Link>
        </li>
      </ol>
    </nav>
  );
}
export default function Article() {
  const [article, setArticle] = useState({});
  const { slug } = useParams();
  const { userData } = useContext(Context);
  // console.log(user);
  useEffect(() => {
    request
      .get("/article/" + slug)
      .then((res) => {
        setArticle(res.data);
        document.title = res.data.title + " - TechBlock";
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(article);
  !article && window.location.replace("/not-found");
  return (
    <article className="relative mx-0 py-8 xl:mx-32">
      <Breadcrumbs cat={article.category} />
      <ArticleContent article={article} user={userData} />
      <CommentSection article={article} user={userData} />
    </article>
  );
}
