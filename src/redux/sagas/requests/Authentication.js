import axios from "axios";

const API_URL = "http://localhost:8080";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

/*export function authenticateUser(values) {
  let payload = { username: values.username, password: values.password };
  //axios.defaults.withCredentials = true;
  return axios.request({
    method: "POST",
    data: payload,
    url: `${API_URL}/authenticate`,
  });
  //return { status: 200 };
}*/

export function authenticateUser(values) {
  let payload = { username: values.username, password: values.password };
  instance.defaults.withCredentials = true;
  return instance.request({
    method: "POST",
    data: payload,
    url: `${API_URL}/authenticate`,
  });
  //return { status: 200 };
}

export function refreshToken() {
  //axios.defaults.withCredentials = true;
  return axios.request({
    method: "POST",
    url: `${API_URL}/refreshtoken`,
  });
  //return { status: 200 };
}

export function cancelToken() {
  //axios.defaults.withCredentials = true;
  return axios.request({
    method: "POST",
    url: `${API_URL}/canceltoken`,
  });
  //return { status: 200 };
}
