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
  category,
  listImgId
) => {
  return axios.post(
    `${server}/list/create`,
    {
      title,
      imageUrl,
      description,
      options,
      authorId,
      isUnlisted,
      category,
      imageId: listImgId,
    },
    {
      "Content-Type": "false",
      ProcessData: "false",
    }
  );
};

export const fetchCategoryList = (category, userId, sessionToken) => {
  if (!userId) userId = "";
  if (!sessionToken) sessionToken = "";
  return axios.get(
    `${server}/lists?category=${category}&userId=${userId}&sessionToken=${sessionToken}`,
    {
      "Content-Type": "application/json",
    }
  );
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

export const searchForLists = (searchString, sessionToken, userId) => {
  return axios.get(
    `${server}/lists/search?query=${searchString}&sessionToken=${sessionToken}&userId=${userId}`,
    {
      "Content-Type": "application/json",
    }
  );
};


export const addListVisit = (listId) => {
  return axios.post(`${server}/events/list/${listId}/visited`, {
    "Content-Type": "application/json",
  });
};
