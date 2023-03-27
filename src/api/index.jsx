import axios from "axios";

const BASE_URL = "http://localhost:8080/api/places/";

export async function getAllPlace() {
  await axios.get(BASE_URL);
}
export async function getPlaceById(id) {
  await axios.get(BASE_URL + id);
}
