import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { request } from "../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../../context/Context";
import { Sidebar } from "./Sidebar";
import { deleteUser } from "../../../api/users";

export default function EditInfo() {
  const { userData, dispatch } = useContext(Context);
  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [fullname, setFullName] = useState(userData?.fullname);
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [changed, setChanged] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault(); //ngắn không cho form submit

    const updatedUser = {};
    // if fullname changed,  update fullname
    if(fullname !== userData?.fullname){
      updatedUser.fullname = fullname
    }
    // if username changed, update username
    if (username !== userData?.username) {
      updatedUser.username = username;
    }
    // if email changed,  update email
    if (email !== userData?.email) {
      updatedUser.email = email;
    }
    if (profilePicture) {
      const formData = new FormData();
      const fileName = Date.now() + "-" + profilePicture.name;
      formData.append("name", fileName);
      formData.append("files", profilePicture);
      updatedUser.profilePicture = fileName;
      updatedUser.oldProfilePic = userData?.profilePicture;
      //upload banner
      try {
        await request.post("/upload", formData);
      } catch (error) {
        console.log(error);
      }
    }
    //upload content
    // console.log(updatedUser);
    await request
      .put(`user/${userData?._id}`, updatedUser)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        toast.error(
          error?.response?.data?.message ||
            "Có lỗi xảy ra vui lòng thử lại sau",
          { autoClose: 3000 }
        );
      });
  };
  const handleDeleteAcc = async (e) => {
    // e.preventDefault();
    window.confirm("Bạn có chắc chắn muốn xoá tài khoản của mình không?") &&
      // console.log(userData._id, password)
      (await request
        .post(`/user/delete/${userData._id}`, { password })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            window.alert(
              "Đã xoá tài khoản bây giờ bạn sẽ được đăng xuất khỏi hệ thống"
            );
            dispatch({ type: "LOGOUT" });
            window.location.href = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
        }));
  };
  return (
    <div className=" mx-auto w-full py-10">
      <ToastContainer />

      <div className=" max-w-4xl divide-x divide-y border bg-white shadow-md md:flex  ">
        <Sidebar />
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
            onChange={(e) =>setChanged(true)}
            className="mt-6 space-y-4"
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
              disabled={!changed}
              className="flex justify-center disabled:bg-teal-400  rounded-md bg-teal-500 px-8 py-2 text-sm font-medium tracking-wide text-white shadow-sm hover:bg-teal-600 "
            >
              Cập nhật thông tin
            </button>
          </form>
          {/* <div className="">Xoá tài khoản của bạn</div> */}
          <div className="mt-20">
            <h1 className=" text-2xl font-semibold">Xoá tài khoản</h1>
            <p className="mt-2 font-medium text-rose-600">
              Đây là hành động không thể hoàn tác bạn có chắc muốn xoá tài khoản
            </p>
            <div className="mt-2 flex flex-col space-y-1">
              <label
                htmlFor="pass"
                className="select-none px-0.5 text-sm font-medium "
              >
                Nhập mật khẩu
              </label>
              <input
                type="password"
                id="pass"
                required
                value={password}
                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleDeleteAcc}
              disabled={password.length <= 0}
              className="mt-4 flex justify-center rounded-md bg-rose-500 px-8 py-2 text-sm font-medium tracking-wide text-white shadow-sm hover:bg-rose-600  disabled:bg-rose-400 "
            >
              Xoá tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
