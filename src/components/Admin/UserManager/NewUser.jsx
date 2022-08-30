import React, { useState } from "react";
import PageHeader from "../Layout/PageHeader";
import { Button } from "@mui/material";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "../../../api/axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
export default function NewUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      email,
      role,
      fullname,
    };
    if (role === "admin") {
      await request
        .post("auth/register/admin", newUser)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } else {
      await request
        .post("auth/register", newUser)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <div className="p-8 lg:px-16">
      <ToastContainer />
      {/* //form  */}
      <PageHeader
        largeText={"Thêm người dùng"}
        text={
          <button className="hover:underline" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        }
      />
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className=" flex flex-col space-y-8"
        encType="multipart/form-data"
      >
        {/* Header */}
        <div className="-mt-9 flex justify-end">
          <Button variant="contained" type="submit" endIcon={<MdSend />}>
            Tạo
          </Button>
        </div>
        {/* cover upload */}
        {/* user info */}
        <div className="flex flex-col space-y-4">
          <TextField
            className="bg-white"
            required
            label="Tên đăng nhập"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="bg-white"
            required
            type="password"
            label="Mật khẩu"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            className="bg-white"
            required
            type={"email"}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="bg-white"
            required
            label="Họ tên"
            variant="outlined"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <FormControl variant="outlined" className="w-full bg-white">
            <InputLabel id="select-outlined-label">Chọn quyền</InputLabel>
            <Select
              labelId="select-outlined-label"
              id="select-outlined"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Chọn quyền"
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>
    </div>
  );
}
