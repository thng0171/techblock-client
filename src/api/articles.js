import { request } from "./axios";

//get all articles
export const getArticles = async () => {
  try {
    const res = await request.get("article");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//get trending articles (top 10)
export const getTrendingArticles = async () => {
  try {
    let res = await request.get("article/top", {
      params: {
        limit: 3,
        day: 2,
      },
    });
    if(res.data.length < 3){
      res = await request.get("article");
    }
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//get top articles weekly (top 10)
export const getTopArticles = async () => {
  try {
    const res = await request.get("article/top", {
      params: {
        limit: 10,
        day: 7,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//get article by id
export const getArticleById = async (id) => {
  try {
    const res = await request.get(`article/id/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//create article
export const createArticle = async (article) => {
  try {
    const res = await request.post("article", article);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//update article
export const updateArticle = async (article) => {
  try {
    const res = await request.put(`article/${article.id}`, article);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//delete article
export const deleteArticle = async (id) => {
  try {
    const res = await request.delete(`article/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//file upload for article
