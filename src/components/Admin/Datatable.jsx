import React, { useEffect, useRef, useState } from "react";
import Header from "./Layout/PageHeader";
import { DataGrid } from "@mui/x-data-grid";
import { getArticles, deleteArticle } from "../../api/articles";
import { deleteCategory, getCategory } from "../../api/category";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { deleteUser, getUserById, getUsers } from "../../api/users";
import { deleteComment, getComments } from "../../api/comments";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, useParams } from "react-router-dom";
export default function Datatable({ page }) {
  const [data, setData] = useState([]);
  let columns;
  let actions;
  let title;
  //handle delete
  const handleDelete = (id) => {
    let action;
    switch (page) {
      case "articles":
        action = deleteArticle(id);
        break;
      case "category":
        action = deleteCategory(id);
        break;
      case "users":
        action = deleteUser(id);
        break;
      case "comments":
        action = deleteComment(id);
        break;
      default:
        action = null;
    }

    window.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?") &&
      action
        .then((res) => {
          toast.success(res.message, { autoClose: 2000 })
          setData(data.filter((item) => item._id !== id))
        })
        .catch((err) => {
          toast.error(err?.respone?.data?.message);
        });
  };

  // get data from api
  switch (page) {
    case "articles":
      title = "Bài viết";
      actions = getArticles();
      columns = [
        {
          field: "title",
          headerName: "Tiêu đề bài viết",
          minWidth: 300,
          flex: 1,
        },
        { field: "author", headerName: "Tác giả", width: 100 },
        { field: "category", headerName: "Thể loại", width: 130 },
        {
          field: "createdAt",
          headerName: "Ngày tạo",
          width: 140,
          type: "date",
          valueGetter: ({ value }) =>
            value &&
            new Date(value).toLocaleDateString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }),
        },
        {
          field: "views",
          type: "number",
          headerName: "Lượt xem",
          width: 100,
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Tuỳ chọn",
          width: 150,
          getActions: (params) => [
            <>
              <Stack spacing={1} direction="row">
                <Link to={"edit/" + params.id}>
                  <Button size="small" color="info" variant="outlined">
                    Sửa
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    handleDelete(params.id);
                  }}
                  size="small"
                  color="error"
                  variant="outlined"
                >
                  Xoá
                </Button>
              </Stack>
            </>,
          ],
        },
      ];
      break;
    case "category":
      title = "Thể loại";
      actions = getCategory();
      columns = [
        {
          field: "name",
          headerName: "Tên thể loại",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "createdAt",
          headerName: "Ngày tạo",
          width: 140,
          type: "date",
          valueGetter: ({ value }) =>
            value &&
            new Date(value).toLocaleDateString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }),
        },
        {
          field: "updatedAt",
          headerName: "Cập nhật lần cuối",
          width: 140,
          type: "date",
          valueGetter: ({ value }) =>
            value &&
            new Date(value).toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }),
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Tuỳ chọn",
          width: 300,
          getActions: (params) => [
            <>
              <Stack spacing={1} direction="row">
                <Button
                  onClick={() => handleDelete(params.id)}
                  size="small"
                  color="error"
                  variant="outlined"
                >
                  Xoá
                </Button>
              </Stack>
            </>,
          ],
        },
      ];
      break;
    case "users":
      title = "Người dùng";
      actions = getUsers();
      columns = [
        {
          field: "username",
          headerName: "Username",
          minWidth: 125,
          flex: 1,
        },
        {
          field: "fullname",
          headerName: "Họ tên",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "role",
          headerName: "Vai trò",
        },
        {
          field: "createdAt",
          headerName: "Ngày tạo",
          width: 140,
          type: "date",
          valueGetter: ({ value }) =>
            value &&
            new Date(value).toLocaleDateString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }),
        },
        {
          field: "updatedAt",
          headerName: "Cập nhật lần cuối",
          width: 140,
          type: "date",
          valueGetter: ({ value }) =>
            value &&
            new Date(value).toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }),
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Tuỳ chọn",
          width: 150,
          getActions: (params) => [
            <>
              <Stack spacing={1} direction="row">
                {/* <Link to={"edit/" + params.id}>
                  <Button size="small" color="info" variant="outlined">
                    Sửa
                  </Button>
                </Link> */}
                <Button
                  onClick={() => handleDelete(params.id)}
                  size="small"
                  color="error"
                  variant="outlined"
                >
                  Xoá
                </Button>
              </Stack>
            </>,
          ],
        },
      ];
      break;
    case "comments":
      title = "Bình luận";
      actions = getComments();
      columns = [
        {
          field: "content",
          headerName: "Nội dung",
          flex: 1,
        },
        {
          field: "createdAt",
          headerName: "Ngày tạo",
          width: 130,
          type: "date",
          valueGetter: ({ value }) =>
            value &&
            new Date(value).toLocaleDateString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }),
        },
        {
          field: "user",
          headerName: "Người dùng",
          valueGetter: ({ value }) => value?.username,
          minWidth: 120,
        },
        {
          field: "article",
          headerName: "Bài viết",
          valueGetter: ({ value }) => value?.title,
          minWidth: 160,
          flex: 1,
        },
        {
          field: "actions",
          type: "actions",
          headerName: "Tuỳ chọn",
          width: 150,
          getActions: (params) => [
            <>
              <Stack spacing={1} direction="row">
                {/* <Link to={"edit/" + params.id}>
                  <Button size="small" color="info" variant="outlined">
                    Sửa
                  </Button>
                </Link> */}
                <Button
                  onClick={() => handleDelete(params.id)}
                  size="small"
                  color="error"
                  variant="outlined"
                >
                  Xoá
                </Button>
              </Stack>
            </>,
          ],
        },
      ];
      break;
    default:
      break;
  }

  useEffect(() => {
    document.title = "Trang quản trị - TechBlock";
    actions
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
    // console log data array length
    // console.log(data.length);
  }, [page]);

  return (
    <div className="min-h-screen space-y-6 p-8">
      <div className="flex items-end justify-between">
        <Header text="Quản lý" largeText={title} />
        <ToastContainer limit={3} />
        {/* add new button with icon */}
        <div className="">
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              size="medium"
              color="error"
              startIcon={<MdDelete />}
            >
              Delete
            </Button>

            {page !== "comments" && (
              <Link to={"new"}>
                <Button
                  size="medium"
                  variant="contained"
                  startIcon={<MdAddCircle />}
                >
                  Thêm mới
                </Button>
              </Link>
            )}
          </Stack>
        </div>
      </div>
      <div className="w-auto bg-white">
        <DataGrid
          className="p-2"
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 25]}
          checkboxSelection
          getRowId={(row) => row._id}
          autoHeight
          loading={!data.length}
        />
      </div>
    </div>
  );
}
