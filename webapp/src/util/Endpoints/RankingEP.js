import axios from "axios";
const server = window.location.origin.includes("localhost")
  ? "http://localhost:8080"
  : window.location.origin;

export const fetchPersonalRankings = (listId, userId) => {
  return axios.get(
    `${server}/list/${listId}/rankings/personal?userId=${userId}`,
    {
      "Content-Type": "application/json",
    }
  );
};

export const fetchGlobalRankings = (listId) => {
  return axios.get(`${server}/list/${listId}/rankings/global`, {
    "Content-Type": "application/json",
  });
};
