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
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../../api/articles";
import { useNavigate } from "react-router-dom";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState({});
  const [oldContent, setOldContent] = useState({});
  const [coverImage, setCover] = useState("");
  const [oldCoverImage, setOldCoverImage] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getArticleById(id)
      .then((res) => {
        setTitle(res?.title);
        setContent(res?.content);
        setOldCoverImage(res?.coverImage);
        setAuthor(res?.author);
        setCategory(res?.category);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const Editor = () => {
  //     const [editor, setEditor] = useState({});

  useEffect(() => {
    const editor = new EditorJS({
      // Id of Element that should contain the Editor
      holder: "editorjs",
      data: content,
      tools: EDITOR_JS_TOOLS,
      onChange: (api, event) => {
        editor
          .save()
          .then((outputData) => {
            setContent(outputData);
            console.log("Article data: ", outputData);
          })
          .catch((error) => {
            console.log("Saving failed: ", error);
          });
      },
    });
    //   setEditor(editor);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedArticle = {
      title,
      content,
      author,
      category: category,
      coverImage: oldCoverImage,
    };

    //only update coverImage if user upload new one
    if (coverImage) {
      const formData = new FormData();
      const fileName = Date.now() + "-" + coverImage.name;
      formData.append("name", fileName);
      formData.append("files", coverImage);
      updatedArticle.coverImage = fileName;
      updatedArticle.oldCoverImage = oldCoverImage;
      //upload banner
      try {
        await request.post("/upload", formData);
      } catch (error) {
        console.log(error);
      }
    }
    //upload content

    await request
      .put("article/" + id, updatedArticle)
      .then((res) => {
        console.log(res);
        toast.success(res.data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };
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
      <PageHeader
        largeText={"Sửa bài viết"}
        text={
          <button className="hover:underline" onClick={() => navigate(-1)}>
            Quay lại
          </button>
        }
      />

      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col space-y-4"
        encType="multipart/form-data"
      >
        {/* Header */}
        <div className="-mt-9 flex justify-end">
          <Button variant="contained" type="submit" endIcon={<MdSend />}>
            Cập nhật
          </Button>
        </div>
        {/* cover upload */}
        <div className="gap-5">
          <div className="relative flex h-64 w-1/2 items-center justify-center overflow-hidden rounded-md border-2 border-dashed bg-slate-300">
            {coverImage ? (
              <img
                className="z-10 h-full w-full object-cover"
                src={URL.createObjectURL(coverImage)}
                alt=""
              />
            ) : (
              <img
                className="z-10 h-full w-full object-cover"
                src={`${import.meta.env.VITE_IMAGE_URL}${oldCoverImage}`}
                alt=""
              />
            )}
            <div className="">
              <label
                htmlFor="coverImage"
                className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center gap-1 p-2 text-lg font-medium hover:bg-slate-50/40"
              >
                <HiOutlineUpload size={20} />
                Ảnh bìa
              </label>
              <input
                type="file"
                hidden
                id="coverImage"
                name="coverImage"
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
          {/* select category */}
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
        {/* editor */}
        <div
          id="editorjs"
          className="prose -mt-10 w-full  max-w-none rounded-md border bg-white p-4 shadow"
        ></div>
      </form>
    </div>
  );
}
