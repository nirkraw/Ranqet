import axios from "axios";
const server = window.location.origin.includes("localhost")
  ? "http://localhost:8080"
  : window.location.origin;

export const submitOptionChoice = (
  listId,
  userId,
  winningOptionId,
  losingOptionId
) => {
  return axios.post(
    `${server}/list/${listId}/vote`,
    {
      userId,
      winningOptionId,
      losingOptionId,
    },
    {
      "Content-Type": "application/json",
    }
  );
};

export const fetchListOptionPair = (listId, userId) => {
  return axios.get(`${server}/list/${listId}/nextPair?userId=${userId}`, {
    "Content-Type": "application/json",
  });
};
