import React, { useState } from "react";
import PageHeader from "../Layout/PageHeader";
import { Button } from "@mui/material";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "../../../api/axios";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
export default function NewCategory() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = {
      name: category,
    };

    await request
      .post("category", newCategory)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data?.message);
      });
  };
  return (
    <div className="p-8">
      <ToastContainer />
      <PageHeader
        largeText={"Thêm mới"}
        text={
          <button className="hover:underline" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        }
      />
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="-mt-9 flex justify-end">
          <Button variant="contained" type="submit" endIcon={<MdSend />}>
            Tạo
          </Button>
        </div>
        <FormControl className="w-full">
          <TextField
            required
            id="outlined-name"
            label="Tên thể loại"
            className="bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormControl>
      </form>
    </div>
  );
}
