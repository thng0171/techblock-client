import React, { useState, useEffect } from "react";
import { Interweave, Filter } from "interweave";
import { ShareSection } from "./ShareSection";
import { MdBookmark, MdBookmarkBorder, MdModeComment } from "react-icons/md";
import { request } from "../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ArticleContent({ article, user }) {
  class LinkFilter extends Filter {
    attribute(name, value) {
      if (name === "href") {
        return encodeURIComponent(value);
      }

      return value;
    }

    node(name, node) {
      if (name === "a") {
        node.setAttribute("target", "_blank");
      }

      return node;
    }
  }

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (user) {
      user?.savedArticles?.map((savedArticle) => {
        if (savedArticle === article?._id) {
          setIsBookmarked(true);
        }
      }).length === 0 && setIsBookmarked(false);
    }
  }, [article?._id]);
  // console.log(user?.savedArticles);
  const handleBookmark = async () => {
    // handle bookmark toggle logic save and remove bookmark
    if (user) {
      if (isBookmarked) {
        await request
          .put(`user/bookmark/${article?._id}`)
          .then((res) => {
            // console.log(res);
            setIsBookmarked(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await request
          .post("user/bookmark", { article: article?._id })
          .then((res) => {
            // console.log(res);
            setIsBookmarked(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    else{
      toast.warning('Đăng nhập để lưu bài viết');
    }
  };
  return (
    <section className="mt-2 space-y-3 ">
      <ToastContainer limit={1}/>
      <h1 className="text-2xl  font-bold tracking-tight md:text-3xl xl:text-[2.5rem] xl:leading-[1.2]">
        {article?.title}
      </h1>
      {/* author and time */}
      <div className="flex items-center gap-2 text-sm">
        <div className="font-medium uppercase text-primary">
          {article?.author}
        </div>
        <span className="">-</span>
        <div className="">
          {new Date(article?.createdAt).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        {/* comment number*/}
      </div>
      <div className="flex flex-wrap gap-6">
        <ShareSection />
        <a href="#comment" className="inline-flex items-center gap-1">
          <MdModeComment size={22} className="text-gray-500" />
          {article?.comments?.length}{" "}
          <span className="hidden md:inline">Bình luận</span>
        </a>
        {/* save article btn  */}
        {
          <button
            className={
              `inline-flex items-center gap-1 hover:underline ` +
              (isBookmarked ? "text-teal-600" : "")
            }
            onClick={() => {
              handleBookmark(article);
            }}
          >
            {isBookmarked ? (
              <>
                <MdBookmark size={22} />
                <span>Đã lưu bài viết</span>
              </>
            ) : (
              <>
                <MdBookmarkBorder size={22} />
                <span>Lưu bài viết</span>
              </>
            )}
          </button>
        }
      </div>
      <div className="prose   border-b-2 pb-5 prose-a:text-teal-400 prose-a:underline ">
        {article?.content?.map((block, index) => {
          return (
            <Interweave
              filters={[new LinkFilter()]}
              key={index}
              content={block}
            />
          );
        })}
      </div>
    </section>
  );
}
