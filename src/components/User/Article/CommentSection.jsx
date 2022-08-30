import React, { useEffect, useState } from "react";
import { request } from "../../../api/axios";
import Avatar from "@mui/material/Avatar";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";

export function CommentSection({ article, user }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loadMore, setLoadMore] = useState(5);
  useEffect(() => {
    request
      .get(`/comment/${article._id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [article._id, newComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      content: newComment,
      article: article._id,
    };
    console.log(data);
    await request
      .post("/comment", data)
      .then((res) => {
        console.log(res);
        setComments([res.data.comment, ...comments]);
      })
      .catch((err) => {
        console.log(err);
      });
    setNewComment("");
  };

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
    <section id="comment" className="w-full max-w-xl space-y-2 py-5">
      <h1 className="text-lg font-medium">
        Bình luận ({comments?.length || 0})
      </h1>
      {/* comment input with send btn if user is not logged in can make comment */}
      <div className="">
        <textarea
          name=""
          id=""
          disabled={!user}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user ? "Để lại bình luận" : "Đăng nhập để bình luận"}
          className="w-full resize-none rounded-md border bg-white p-3 focus:outline-teal-300"
          rows="3"
          required
        ></textarea>
        <div className="mt-1 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!user || newComment <= 0}
            className=" rounded-md bg-teal-500 py-2 px-5 font-medium text-white disabled:bg-teal-500/70"
          >
            Gửi
          </button>
        </div>
      </div>
      <div className="space-y-4 py-4 ">
        {comments?.length > 0 &&
          comments
            ?.slice(0, loadMore)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment, index) => (
              <div
                key={index}
                className="group  flex w-full  items-start gap-3"
              >
                <div className="flex items-center">
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={`${import.meta.env.VITE_IMAGE_URL}${
                      comment?.user?.profilePicture
                    }`}
                  />
                </div>
                <div className="overflow-auto  rounded-md bg-white px-3 py-2 shadow-md">
                  <div className="flex  items-center gap-1 text-sm">
                    <div className="font-semibold">
                      {comment?.user?.fullname || "[deleted]"}
                    </div>
                    <div className="text-gray-500">·</div>
                    <div
                      title={dayjs(comment?.createdAt).format(
                        "dddd, D/MM/YYYY, HH:mm"
                      )}
                      className="text-gray-500 "
                    >
                      {/* {new Date(comment?.createdAt).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })} */}
                      {dayjs(comment?.createdAt).fromNow()}
                    </div>
                    {/* <div className="hidden absolute -top-2 right-0 whitespace-nowrap z-20 peer-hover:block">
                    {dayjs(comment?.createdAt).format("dddd, D/MM/YYYY, h:mm A")
                    }
                    </div> */}
                  </div>
                  <div className="mt-1 break-words">{comment?.content}</div>
                </div>

                {/* delete  at the end  */}

                {user && user?.username === comment?.user?.username && (
                  <button
                    onClick={() => handleDelete(comment?._id)}
                    className=" self-center rounded-full p-2 duration-150 hover:bg-slate-200 "
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            ))}
        <div className="flex justify-center">
          {comments?.length > loadMore && (
            <button
              onClick={() => setLoadMore(loadMore + 5)}
              className="text-teal-600 hover:underline"
            >
              Xem thêm bình luận
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
