import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { request } from "../../../api/axios";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [passwordType, setPasswordType] = useState("password");
  const { dispatch, isFetching } = useContext(Context);
  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    // dispatch({ type: "LOGIN_START" }); // start fetching
    await request
      .post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        // success fetching and set username data to context
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        toast.success("Đăng nhập thành công", { autoClose: 2000 });
        setTimeout(() => {
        }, 2000);
        console.log(res.data)
        res.data.userData.role === "admin"
          ? window.location.href = "/admin"
          : window.location.href = "/"
      })
      .catch((error) => {
        // error fetching
        toast.error(error.response.data.message);
        // setTimeout(() => {
        //   dispatch({ type: "LOGIN_FAILURE" });
        // }, 2000);
      });
  };

  return (
    <div className="flex  py-12 items-center justify-center gap-4">
      <ToastContainer />
      <div className="w-full max-w-sm space-y-4 border-t-4 border-slate-700 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-800">Đăng nhập</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="username"
              className="select-none text-sm font-medium "
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              required
              autoFocus
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Tên đăng nhập"
              ref={userRef}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="select-none text-sm font-medium "
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={passwordType}
                id="password"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="•••••••••••"
                ref={passwordRef}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 inline-block -translate-y-1/2 text-slate-600 "
                onClick={showPassword}
              >
                {passwordType === "password" ? <HiEye /> : <HiEyeOff />}
              </button>
            </div>
            <div className="">
              <Link
                to="/"
                className="text-sm text-slate-600 hover:text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isFetching}
              className="flex w-full justify-center rounded-md bg-slate-700 duration-200 hover:bg-slate-800 px-5 disabled:bg-slate-800 py-3 font-medium uppercase text-white shadow-sm disabled:cursor-not-allowed "
            >
              Đăng nhập
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <span>Bạn chưa có tài khoản? </span>
          <Link to="/register" className="font-medium text-teal-500">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
