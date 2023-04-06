import axios from "axios";

const BASE_URL = "http://localhost:8080/api/places/";

export async function getAllPlace() {
  await axios.get(BASE_URL);
}
export async function getPlaceById(id) {
  await axios.get(BASE_URL + id);
}
export async function getPlaceBySearch(info) {
  await axios.get(BASE_URL + queryString);
}
export async function login({ username, password }) {
  await axios.post(BASE_URL, { username, password });
}
