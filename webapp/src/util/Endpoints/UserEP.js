import axios from "axios";
const server = window.location.origin.includes("localhost")
  ? "http://localhost:8080"
  : window.location.origin;

export const createUser = (name, username, password) => {
  return axios.post(
    `${server}/user/create`,
    { name, username, password },
    {
      "Content-Type": "application/json",
    }
  );
};

export const loginUser = (name, username, password) => {
  return axios.post(
    `${server}/user/login`,
    { name, username, password },
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

export const fetchUserLists = (userId, sessionToken) => {
  return axios.get(
    `${server}/lists/user/${userId}/all?sessionToken=${sessionToken}`,
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
