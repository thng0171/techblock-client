import { request } from "./axios";

//create a new user
export const createUser = async (user) => {
  try {
    const response = await request.post("/auth/register", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//get all users
export const getUsers = async () => {
  try {
    const res = await request.get("/user");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

//get user by id
export const getUserById = async (id) => {
  try {
    const res = await request.get(`/user/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//update user
export const updateUser = async (id, user) => {
  try {
    const res = await request.put(`/user/${id}`, user);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//delete user
export const deleteUser = async (id ) => {
  try {
    const res = await request.post(`/user/delete/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
