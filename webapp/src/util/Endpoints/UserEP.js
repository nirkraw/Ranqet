import axios from "axios";
const server = window.location.origin.includes("localhost")
  ? "http://localhost:8080"
  : window.location.origin;

export const createUser = (username, password) => {
  return axios.post(
    `${server}/user/create`,
    { username, password },
    {
      "Content-Type": "application/json",
    }
  );
};

export const loginUser = (username, password) => {
  return axios.post(
    `${server}/user/login`,
    { username, password },
    {
      "Content-Type": "application/json",
    }
  );
};

export const fetchUser = (userId) => {
  return axios.get(`${server}/user/${userId}`, {
    "Content-Type": "application/json",
  });
};

export const fetchUserLists = (filter, userId, sessionToken) => {
  return axios.get(
    `${server}/lists/user/${userId}?sessionToken=${sessionToken}&userId=${userId}&filter=${filter}`,
    {
      "Content-Type": "application/json",
    }
  );
};

export const fetchUserPublicList = (userId) => {
  return axios.get(`${server}/lists/user/${userId}/public`, {
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
