import React, { useState, useContext } from "react";
// import { Sidebar } from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { request } from "../../../api/axios";
import { Context } from "../../../context/Context";
export default function ChangePasswordAdmin() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userData } = useContext(Context);
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới không khớp");
      return;
    }
    const data = {
      oldPassword,
      newPassword,
    };
    await request
      .put(`/user/change-password/${userData._id}`, data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className=" mx-auto w-full py-10">
      <ToastContainer />

      <div className=" max-w-4xl divide-x divide-y border bg-white shadow-md md:flex">
        {/* <Sidebar /> */}
        <div className="w-full  p-8 md:px-16">
          <h1 className="text-2xl font-semibold">Đổi mật khẩu</h1>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="mt-6 w-2/3 space-y-4"
          >
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Mật khẩu cũ</label>
              <input
                type="password"
                name="oldPassword"
                value={oldPassword}
                required
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300  px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                required
                pattern=".{6,20}"
                className="block peer w-full rounded-md border border-slate-300  px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
              <p className="hidden pt-1 text-xs font-medium text-pink-500 peer-focus:peer-invalid:block">
                Mật khẩu từ 6 - 20 ký tự
              </p>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium">Nhập lại mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                required
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300  px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-teal-500 px-8 py-2 text-sm  font-semibold text-white shadow-sm hover:bg-teal-600 focus:outline-none"
            >
              Đổi mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
