import axios from "axios";

//const API_URL = "http://localhost:8080";
const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create();

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

export function refreshToken(values) {
  //axios.defaults.withCredentials = true;
  instance.defaults.withCredentials = true;
  // let payload = { username: values.username, password: values.password };
  return instance.request({
    method: "POST",
    // data: payload,
    url: `${API_URL}/refreshtoken`,
  });
  //return { status: 200 };
}

export function cancelToken(values) {
  //axios.defaults.withCredentials = true;
  instance.defaults.withCredentials = true;
  // let payload = { username: values.username, password: values.password };
  return instance.request({
    method: "POST",
    // data: payload,
    url: `${API_URL}/canceltoken`,
  });
  //return { status: 200 };
}

////////////////////
export function getPortfolio(username) {
  instance.defaults.withCredentials = true;
  const url = `${API_URL}/portfolio/${username}`;
  return instance
    .get(url)
    .then((response) => {
      console.log("Get User details Successful : " + JSON.stringify(response));
      return response.data;
    })
    .catch((err) =>
      console.log("Get User details didnt work" + JSON.stringify(err))
    );
}
