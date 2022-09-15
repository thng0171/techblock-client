import React, { useEffect, useState } from "react";
import { EDITOR_JS_TOOLS } from "./tools";
import EditorJS from "@editorjs/editorjs";
import PageHeader from "../Layout/PageHeader";
import { HiOutlineUpload } from "react-icons/hi";
import { Button } from "@mui/material";
import { MdSend } from "react-icons/md";
import { getCategory } from "../../../api/category";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "../../../api/axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCover] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  // EditorJS instance
  useEffect(() => {
    const editor = new EditorJS({
      // Id of Element that should contain the Editor
      holder: "editorjs",
      data: {},
      tools: EDITOR_JS_TOOLS,
      placeholder: "Nội dung bài viết",
      onChange: (api, event) => {
        editor
          .save()
          .then((outputData) => {
            setContent(outputData);
            // console.log("Article data: ", outputData);
          })
          .catch((error) => {
            console.log("Saving failed: ", error);
          });
      },
    });
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = {
      title,
      content,
      category,
      author,
      coverImage,
    };
    if (coverImage) {
      const formData = new FormData();
      const fileName = Date.now() + "-" + coverImage.name;
      formData.append("name", fileName);
      formData.append("files", coverImage);
      newArticle.coverImage = fileName;
      //upload banner
      try {
        await request.post("/upload", formData);
      } catch (error) {
        console.log(error);
      }
    }
    //upload content

    await request
      .post("article", newArticle)
      .then((res) => {
        console.log(res);
        toast.success(res.data?.message);
        setTimeout(() => {
          navigate(0);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };

  // Get all category
  useEffect(() => {
    getCategory()
      .then((res) => {
        setAllCategory(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-8 lg:px-16">
      {/* create article form */}
      <ToastContainer />
      <PageHeader
        largeText={"Thêm bài viết"}
        text={
          <button className="hover:underline" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        }
      />
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col space-y-4"
        encType="multipart/form-data"
      >
        {/* Header */}
        <div className="-mt-9 flex justify-end space-x-2">
          <Button variant="contained" type="submit" endIcon={<MdSend />}>
            Đăng tải
          </Button>
        </div>
        {/* cover upload */}
        <div className="gap-5">
          <div className="relative flex aspect-video h-60 w-auto items-center justify-center overflow-hidden rounded-md border-2 border-dashed bg-slate-300">
            {coverImage && (
              <img
                className="absolute inset-0 z-10  h-full w-full bg-cover"
                src={URL.createObjectURL(coverImage)}
                alt=""
              />
            )}
            <div className="">
              <label
                htmlFor="upload"
                className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center gap-1 p-2 text-lg font-medium hover:bg-slate-50/40"
              >
                <HiOutlineUpload size={20} />
                Ảnh bìa
              </label>
              <input
                type="file"
                id="upload"
                required
                // hidden
                name="coverImage"
                className="opacity-0"
                accept="image/*"
                onChange={(e) => setCover(e.target.files[0])} //get cover from file array
              />
            </div>
          </div>
        </div>
        {/* title */}
        <FormControl>
          <TextField
            required
            id="outlined-name"
            label="Tiêu đề bài viết"
            className="bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        {/* cat */}
        <FormControl>
          <InputLabel id="category">Danh mục</InputLabel>
          <Select
            labelId="category"
            className="bg-white capitalize"
            id="demo-multiple-chip"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          >
            {allCategory.map((name) => (
              <MenuItem key={name.id} value={name.name}>
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* author */}
        <FormControl>
          <TextField
            className="bg-white"
            id="outlined-name"
            label="Tác giả"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </FormControl>

        <div
          id="editorjs"
          className="prose w-full max-w-none  rounded-md border bg-white p-4 shadow"
        ></div>
      </form>
    </div>
  );
}
