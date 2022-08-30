import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { request } from "../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../../context/Context";
// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "./Sidebar";

export default function InfoAdmin() {
  const { userData, dispatch } = useContext(Context);
  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [fullname, setFullName] = useState(userData?.fullname);
  const [profilePicture, setProfilePicture] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); //ngắn không cho form submit
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      fullname,
    };
     // if username changed, update username
     if (username !== userData?.username) {
      updatedUser.username = username;
    }
    // if email changed,  update email
    if (email !== userData?.email) {
      updatedUser.email = email;
    }
    console.log(updatedUser);
    if (profilePicture) {
      const formData = new FormData();
      const fileName = Date.now() + "-" + profilePicture.name;
      formData.append("name", fileName);
      formData.append("files", profilePicture);
      updatedUser.profilePicture = fileName;
      //upload banner
      try {
        await request.post("/upload", formData);
      } catch (error) {
        console.log(error);
      }
    }
    //upload content
    await request
      .put(`user/${userData?._id}`, updatedUser)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data.user });
        setTimeout(() => {
          toast.success(res.data.message);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
        dispatch({ type: "UPDATE_FAILURE" });
      });
  };

  return (
    <div className=" mx-auto w-full">
      <ToastContainer />

      <div className=" max-w-4xl divide-x divide-y border bg-white shadow-md md:flex  ">
        {/* <Sidebar /> */}
        <div className="w-full p-8 md:px-16">
          {/* <button
            className="text-sm text-slate-500 hover:underline"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button> */}
          <h1 className="text-2xl font-semibold">Thông tin cá nhân</h1>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="mt-6 w-2/3 space-y-4"
          >
            <div className="flex flex-col space-y-1">
              <div className="">
                {profilePicture ? (
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={URL.createObjectURL(profilePicture)}
                  />
                ) : (
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={`${import.meta.env.VITE_IMAGE_URL}/${
                      userData?.profilePicture
                    }`}
                  />
                )}
              </div>
              <div className="">
                <label
                  htmlFor="upload"
                  className="cursor-pointer  font-medium text-sky-600 hover:underline"
                >
                  Thay đổi ảnh đại diện
                </label>
                <input
                  type="file"
                  id="upload"
                  name="profilePicture"
                  hidden
                  accept="image/*"
                  onChange={(e) => setProfilePicture(e.target.files[0])} //get cover from file array
                />
              </div>
            </div>
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
                value={username}
                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                placeholder="Nhập Tên đăng nhập"
                onChange={(e) => setUsername(e.target.value)}
              />
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
                value={fullname}
                required
                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
                value={email}
                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="flex justify-center rounded-md bg-teal-500 px-8 py-2 text-sm font-medium tracking-wide text-white shadow-sm hover:bg-teal-600 "
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
