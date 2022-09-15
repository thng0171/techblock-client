import { request } from "./axios";

// create comment
export const createComment = (data) => {
  try {
    const response = request.post("comment", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get all comment
export const getComments = async () => {
  try {
    const res = await request.get("comment");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//get comment by id
export const getCommentById = async (id) => {
  try {
    const res = await request.get(`comment/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//update comment
export const updateComment = async (id, comment) => {
  try {
    const res = await request.put(`comment/${id}`, comment);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//delete comment
export const deleteComment = async (id) => {
  try {
    const res = await request.delete(`comment/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
