import axios from "axios";
const server = window.location.origin.includes("localhost")
  ? "http://localhost:8080"
  : window.location.origin;



export const createUser = (body) => {
  return axios.post(`${server}/user/create`, body, {
    "Content-Type": "application/json",
  });
};

export const loginUser = (body) => {
  return axios.post(`${server}/user/login`, body, {
    "Content-Type": "application/json",
  });
};

export const fetchUser = (userId) => {
  return axios.get(`${server}/user/${userId}`, {
    "Content-Type": "application/json",
  });
};

export const fetchUserLists = (userId) => {
  return axios.get(`${server}/lists/user/${userId}/all`, {
    "Content-Type": "application/json",
  });
};

export const updateUserAvatar = (userId, url) => {
  return axios.put(
    `${server}/user/${userId}/avatarUrl`,
    { avatarUrl: url },
    {
      "Content-Type": "application/json",
    }
  );
};
