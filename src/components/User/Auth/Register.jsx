import React, { useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../../../api/axios";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");

  // @TODO handle error
  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); //ngắn không cho form submit
    await request // gửi request tao user
      .post("/auth/register/", {
        username,
        password,
        email,
        fullname,
      })
      .then((res) => {
        console.log(res);
        toast.success("Đăng ký thành công", { autoClose: 3000 });
        setTimeout(() => {
          res.data && window.location.replace("/login?success=true");
        }, 1500);
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center py-10 ">
      <ToastContainer limit={3} />
      <div className="relative w-full max-w-sm space-y-4 border-t-4 border-slate-700 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-800">Đăng ký tài khoản</h1>

        <form autoComplete="off"  onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="username"
              className="select-none px-0.5 text-sm font-medium "
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              required
              className="peer block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              placeholder="Nhập Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
              pattern="^[a-zA-Z0-9_]{3,20}$"
            />
            <p className="hidden text-xs text-pink-500 peer-focus:peer-invalid:inline ">
              Tên đăng nhập không hợp lệ
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="fullname"
              className="select-none px-0.5 text-sm font-medium  "
            >
              Họ tên
            </label>
            <input
              type="text"
              id="fullname"
              required
              className="peer block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              placeholder="Nhập họ tên"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="select-none px-0.5 text-sm font-medium  "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              inputMode="email"
              required
              className="peer block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              placeholder="Nhập email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="select-none px-0.5 text-sm font-medium"
            >
              Mật khẩu
            </label>
            <div className="peer relative">
              <input
                type={passwordType}
                id="password"
                required
                className="peer block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                placeholder="••••••••••"
                pattern=".{6,20}"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/3 right-3 inline-block -translate-y-1/2 font-medium text-slate-600"
                onClick={showPassword}
              >
                {passwordType === "password" ? <HiEye /> : <HiEyeOff />}
              </button>
              <p className="invisible pt-1 text-xs font-medium text-pink-500 peer-focus:peer-invalid:visible">
                Mật khẩu từ 6 - 20 ký tự
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center gap-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-700 hover:bg-slate-800 duration-200 px-5 py-3 font-medium uppercase tracking-wide text-white shadow-sm "
            >
              Đăng ký
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <span>Bạn có tài khoản? </span>
          <Link to="/login" className="font-medium text-teal-500">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
