import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/Context";
import Avatar from "@mui/material/Avatar";
import { request } from "../../../api/axios";
import { ArticleCard } from "../Home/ArticleCard";
import { Link } from "react-router-dom";

function UserInfo({ user }) {
  return (
    <div className="flex justify-center gap-4 md:gap-6">
      <div className="">
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={`${import.meta.env.VITE_IMAGE_URL}/${user?.profilePicture}`}
        />
      </div>
      <div className="">
        <div className="text-3xl font-medium">{user?.fullname}</div>
        <div className="text-slate-600 ">@{user?.username}</div>
        <div className="mt-4">
          Tham gia ngày:{" "}
          {new Date(user?.createdAt).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        <Link to={`edit`} className="">
          <div className="mt-2 border bg-white px-2 py-1 font-medium shadow">
            Chỉnh sửa thông tin
          </div>
        </Link>
      </div>
    </div>
  );
}
function UserComments({ userId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    request
      .get(`comment?user=${userId}`)
      .then((res) => {
        // console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);
  const handleDelete = async (id) => {
    window.confirm("Bạn có muốn xoá bình luận này?") &&
      (await request
        .delete(`/comment/${id}`)
        .then((res) => {
          console.log(res);
          setComments(comments.filter((comment) => comment._id !== id));
        })
        .catch((err) => {
          console.log(err);
        }));
  };
  return (
    <div className="">
      <h1 className="text-2xl font-semibold">
        Bình luận của tôi ({comments?.length})
      </h1>
      <div className="mt-3 max-h-screen w-full space-y-2 divide-y overflow-y-auto rounded-md border bg-white p-5 shadow-md">
        {comments?.map((comment, index) => (
          <div
            key={index}
            className="group flex w-full items-start gap-3 overflow-auto py-2"
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={`${import.meta.env.VITE_IMAGE_URL}/${
                comment.user.profilePicture
              }`}
            />
            <div className="w-full">
              <div className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="mt-1">{comment.content}</div>
              <div className="mt-3">
                <a
                  className="hover:underline"
                  target="_blank"
                  href={`/article/${comment.article.slug}`}
                >
                  <div className="font-semibold">{comment.article.title}</div>
                </a>
              </div>
            </div>
            {/* delete menu at the end  */}
            <button
              onClick={() => handleDelete(comment._id)}
              className=" text-sm font-medium text-rose-500 hover:underline "
            >
              Xoá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavedArticles({ articles }) {
  const [savedArticles, setSavedArticles] = useState([]);
  useEffect(() => {
    articles?.map((article) => {
      request
        .get(`article/id/${article}`)
        .then((res) => {
          setSavedArticles((savedArticles) => [...savedArticles, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [articles]);
  // console.log(savedArticles);
  const handleDelete = async (id) => {
    console.log(id);
    window.confirm("Bạn có muốn bỏ lưu bài viết này?") &&
      (await request
        .put(`/user/bookmark/${id}`)
        .then((res) => {
          console.log(res);
          // toast.success("Dã bỏ lưu bài viết này");
          setSavedArticles(
            savedArticles.filter((article) => article._id !== id)
          );
        })
        .catch((err) => {
          console.log(err);
        }));
  };
  return (
    <div className="">
      <h1 className="text-2xl font-semibold">
        Bài viết đã lưu ({savedArticles?.length})
      </h1>
      <div className="mt-3 max-h-screen w-full divide-y overflow-y-auto rounded-md border bg-white p-5 shadow-md">
        {savedArticles?.length > 0 &&
          savedArticles.reverse().map((article, index) => (
            <div
              key={index}
              className="group flex w-full items-start gap-3 py-1"
            >
              <ArticleCard article={article} />
              <button
                onClick={() => handleDelete(article._id)}
                className=" text-sm font-medium text-rose-500 hover:underline  "
              >
                Xoá
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
export default function Profile() {
  const { userData } = useContext(Context);
  // const [userInfo, setUserInfo] = useState({});

  // console.log(userData);

  // console.log(user.savedArticles);
  return (
    <div className="mb-16 py-10 ">
      <UserInfo user={userData} />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <SavedArticles articles={userData?.savedArticles} />
        <UserComments userId={userData?._id} />
      </div>
    </div>
  );
}
