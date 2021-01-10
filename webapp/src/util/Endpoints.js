import axios from "axios";
const ngrok = "http://5506389ea5a3.ngrok.io";


export const fetchList = (listId) => {
  return axios.get(`${ngrok}/list/${listId}`, {
    "Content-Type": "application/json",
  });
};

export const fetchRankings = (listId, userId) => {
  return axios.get(`${ngrok}/list/${listId}/rankings?userId=${userId}`, {
    "Content-Type": "application/json",
  });
};

export const createList = (data) => {
  return axios.post(`${ngrok}/list/create`, data, {
    "Content-Type": "false", 
    "ProcessData": "false",
  });
};

export const fetchTopLists = () => {
    return axios.get(`${ngrok}/lists/all`, {
    "Content-Type": "application/json",
  });
}

export const submitOptionChoice = (listId, body) => {
  return axios.post(`${ngrok}/list/${listId}/vote`, body, {
    "Content-Type": "application/json",
  });
}

export const fetchListOptionPair = (listId, userId) => {
  return axios.get(`${ngrok}/list/${listId}/nextPair?userId=${userId}`, {
    "Content-Type": "application/json",
  });
}

export const createUser = (body) => {
  return axios.post(`${ngrok}/user/create`, body, {
    "Content-Type": "application/json",
  });
}

export const loginUser = (userId) => {
  return axios.post(`${ngrok}/user/${userId}`, {
    "Content-Type": "application/json",
  });
};


