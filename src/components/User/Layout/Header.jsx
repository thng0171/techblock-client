import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { request } from "../../../api/axios";
import Avatar from "@mui/material/Avatar";

export default function Header() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    request
      .get("/category", {})
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {/* top */}
      <div className="relative inset-x-0 top-0 z-50 m-auto flex h-14 items-center justify-between border-b bg-slate-50  text-slate-900 md:px-10 xl:px-24">
        {/* Logo */}
        <Logo />
        {/* Search and Login   */}
        <Right />
      </div>
      <Category category={category} />
      {/* // Menu */}
    </>
  );
}
function Right() {
  const [SearchBar, setSearchBar] = useState(false);
  const [query, setQuery] = useState("");
  const { userData, dispatch } = useContext(Context);
  const handleSearchBar = () => {
    setSearchBar(!SearchBar);
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/"
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search?key=${query}`;
  };
  return (
    <div className="flex h-full justify-end  divide-x border-x  ">
      <button className="p-4 hover:bg-slate-200" onClick={handleSearchBar}>
        <FaSearch size={20} />
      </button>
      {SearchBar && (
        <div className="absolute inset-x-0 top-full bg-slate-300 p-2 shadow-md md:px-10 xl:px-48">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              autoFocus
              pattern="{3,}"
              placeholder="Tìm kiếm bài viết..."
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border bg-slate-50 px-4  py-2 focus:outline-none  lg:text-lg"
            />
            <button
              type="submit"
              className="whitespace-nowrap bg-teal-600 hover:bg-teal-700 px-2 text-sm font-medium uppercase text-slate-100 lg:px-5 lg:text-base"
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      )}

      {/* // User */}
      <div className="group relative h-full w-full cursor-pointer hover:bg-slate-100">
        <div className="h-full w-full overflow-hidden p-3">
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={
              userData &&
              `${import.meta.env.VITE_IMAGE_URL}/${userData?.profilePicture}`
            }
          />
        </div>

        <div className="absolute right-0 top-full z-20 hidden w-40 flex-col  divide-y whitespace-nowrap border bg-inherit text-sm  shadow-md group-hover:flex">
          {userData ? (
            <>
              {userData?.role === "user" ? (
                <div className="px-4 py-3 ">
                  <div className="whitespace-pre-wrap text-lg  font-medium leading-tight">
                    {userData?.fullname}
                  </div>
                  <a
                    href={"/profile"}
                    className="text-sm text-slate-500 hover:underline"
                  >
                    Trang cá nhân
                  </a>
                </div>
              ) : (
                <a href="/admin" className="px-4 py-3 font-medium ">
                  Trang quản trị
                </a>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-2.5 px-4 hover:text-red-500"
              >
                <BiLogOut size={20} />
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-3 font-medium hover:bg-slate-200"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-4 py-3 font-medium hover:bg-slate-200"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Category({ category }) {
  return (
    <div
      className={`z-20 m-auto flex h-12 w-full items-center gap-6 overflow-x-auto  bg-slate-900 px-5 text-sm  capitalize text-slate-50 shadow  duration-300 md:px-10 lg:justify-center lg:text-base xl:px-24 `}
    >
      {category?.map((category) => (
        <a
          className="whitespace-nowrap duration-200 hover:text-teal-300"
          href={`/search?cat=${category.name}`}
          key={category._id}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <div className="items-center ">
      <a
        href="/"
        className="flex select-none items-center gap-0.5 px-4 font-['Righteous'] text-2xl font-medium uppercase tracking-wide lg:text-[1.75rem]  lg:tracking-wide"
      >
        <span>Tech</span>
        <span className="text-teal-600">Block</span>
      </a>
    </div>
  );
}
