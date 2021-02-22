import axios from "axios";
const server = window.location.origin.includes("localhost")
  ? "http://localhost:8080"
  : window.location.origin;

export const fetchListComments = (listId, pageNum) => {
  return axios.get(`${server}/list/${listId}/comments?pageNumber=${pageNum}`, {
    "Content-Type": "application/json",
  });
};

export const createComment = (listId, body) => {
  return axios.post(`${server}/list/${listId}/comment`, body, {
    "Content-Type": "application/json",
  });
};