import axios from "axios";
const server = window.location.origin.includes("localhost")
  ? "http://localhost:8080"
  : window.location.origin;

export const fetchList = (listId) => {
  return axios.get(`${server}/list/${listId}`, {
    "Content-Type": "application/json",
  });
};

export const createList = (
  title,
  imageUrl,
  description,
  options,
  authorId,
  isUnlisted,
  category
) => {
  return axios.post(
    `${server}/list/create`,
    { title, imageUrl, description, options, authorId, isUnlisted, category },
    {
      "Content-Type": "false",
      ProcessData: "false",
    }
  );
};

export const fetchTopLists = () => {
  return axios.get(`${server}/lists/top`, {
    "Content-Type": "application/json",
  });
};

export const fetchNewLists = () => {
  return axios.get(`${server}/lists/new`, {
    "Content-Type": "application/json",
  });
};

export const fetchCategoryList = (category) => {
  return axios.get(`${server}/lists/top?category=${category}`, {
    "Content-Type": "application/json",
  });
};

export const deleteList = (userId, listId, sessionToken) => {
  return axios.delete(
    `${server}/list/${listId}?userId=${userId}&sessionToken=${sessionToken}`,
    {
      "Content-Type": "application/json",
    }
  );
};

export const uploadImage = (formData) => {
  return axios.post(`${server}/images/upload`, formData, {
    "Content-Type": "application/json",
  });
};

export const searchForLists = (searchString) => {
  return axios.get(`${server}/lists/search?query=${searchString}`, {
    "Content-Type": "application/json",
  });
};
