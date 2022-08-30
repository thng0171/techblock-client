import { request } from "./axios";

//create a new category
export const createCategory = async (category) => {
  try {
    const response = await request.post("category", category);
    return response.data;
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
};

//get all category
export const getCategory = async () => {
  try {
    const res = await request.get("category");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//get category by id
export const getCategoryById = async (id) => {
  try {
    const res = await request.get(`category/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//update category
export const updateCategory = async (id, category) => {
  try {
    const res = await request.put(`category/${id}`, category);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//delete category
export const deleteCategory = async (id) => {
  try {
    const res = await request.delete(`category/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
