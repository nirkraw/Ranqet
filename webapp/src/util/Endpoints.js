import axios from "axios";
const server = "https://ranket.herokuapp.com";


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

export const fetchTopLists = () => {
    return axios.get(`${server}/lists/top`, {
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
  return axios.get(`${server}/user/${userId}`, {
    "Content-Type": "application/json",
  });
};

export const fetchUserLists = (userId) => {
  return axios.get(`${server}/lists/user/${userId}/all`, {
    "Content-Type": "application/json",
  });
};

export const uploadImage = (formData) => {
  return axios.post(`${server}/images/upload`, formData, {
    "Content-Type": "application/json",
  });
};

export const fetchCategoryList = (category) => {
  return axios.get(`${server}/lists/top?category=${category}`, {
    "Content-Type": "application/json",
  });
};

export const updateUserAvatar = (userId, url) => {
  return axios.put(`${server}/user/${userId}/avatarUrl`, {avatarUrl: url}, {
    "Content-Type": "application/json",
  });
};


