import React, { useState } from "react";
import {
  MdArticle,
  MdCategory,
  MdComment,
  MdGroup,
  MdVisibility,
} from "react-icons/md";
import { request } from "../../../api/axios";

export default function Widget({ type }) {
  const [valueCount, setValueCount] = useState(0);
  let data;
  //switch type of widget to render
  switch (type) {
    case "pageviews":
      data = {
        title: "Lượt truy cập",
        icon: <MdVisibility />,
        bgColor: "bg-blue-50",
        textColor: "text-blue-500",
      };
      break;
    case "article":
      request
        .get("article/count")
        .then((res) => setValueCount(res.data))
        .catch((err) => err);
      data = {
        title: "Bài viết",
        icon: <MdArticle />,
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-500",
      };
      break;
    case "user":
      request
        .get("user/count")
        .then((res) => setValueCount(res.data))
        .catch((err) => err);
      data = {
        title: "Thành viên",
        icon: <MdGroup />,
        bgColor: "bg-orange-50",
        textColor: "text-orange-500",
      };
      break;
    case "comment":
      request
        .get("comment/count")
        .then((res) => setValueCount(res.data))
        .catch((err) => err);
      data = {
        title: "Bình luận",
        icon: <MdComment />,
        bgColor: "bg-violet-50",
        textColor: "text-violet-500",
      };
      break;
    case "category":
      request
        .get("category/count")
        .then((res) => setValueCount(res.data))
        .catch((err) => err);
      data = {
        title: "Danh mục",
        icon: <MdCategory />,
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-500",
      };
      break;
    default:
      break;
  }
  return (
    <div className="relative grid w-full grid-cols-3 items-center  rounded-lg bg-white p-6 py-8 shadow-lg">
      <div
        className={`flex aspect-square items-center justify-center rounded-full text-[1.75rem] ${data.bgColor} ${data.textColor}`}
      >
        {data.icon}
      </div>
      <div className="col-span-2 px-4">
        <div className="text-2xl font-bold tracking-tight">
          {Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(valueCount)}
        </div>
        <div className="font-medium leading-tight text-slate-500">
          {data.title}
        </div>
      </div>
      {/* <NavLink
        to={""}
        className="absolute bottom-2 right-3 text-sm font-medium text-gray-500 underline decoration-gray-400 decoration-2 underline-offset-2"
      >
        View all
      </NavLink> */}
    </div>
  );
}
