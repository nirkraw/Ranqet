import axios from "axios";
const server = "http://localhost:8080";


export const fetchList = (listId) => {
  return axios.get(`${server}/list/${listId}`, {
    "Content-Type": "application/json",
  });
};

export const fetchRankings = (listId, userId) => {
  return axios.get(`${server}/list/${listId}/rankings?userId=${userId}`, {
    "Content-Type": "application/json",
  });
};

export const createList = (data) => {
  return axios.post(`${server}/list/create`, data, {
    "Content-Type": "false", 
    "ProcessData": "false",
  });
};

export const fetchTopList = (userId) => {
    return axios.get(`${server}/lists/all?userId=${userId}`, {
    "Content-Type": "application/json",
  });
}

export const submitOptionChoice = (listId, body) => {
  return axios.post(`${server}/list/${listId}/vote`, body, {
    "Content-Type": "application/json",
  });
}

export const fetchListOptionPair = (listId, userId) => {
  return axios.get(`${server}/list/${listId}/nextPair?userId=${userId}`, {
    "Content-Type": "application/json",
  });
}

export const createUser = (body) => {
  return axios.post(`${server}/user/create`, body, {
    "Content-Type": "application/json",
  });
}

export const loginUser = (body) => {
  return axios.post(`${server}/user/login`, body, {
    "Content-Type": "application/json",
  });
};

export const fetchUser = (userId) => {
  return axios.post(`${server}/user/${userId}`, {
    "Content-Type": "application/json",
  });
};

export const fetchUserLists = (userId) => {
  return axios.post(`${server}/lists/user/${userId}/all`, {
    "Content-Type": "application/json",
  });
};


