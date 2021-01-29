import axios from "axios";
const instance = axios.create();
// Add a request interceptor

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.testheader = "Test Header";
    config.headers.authorization = "Test Token";
    //console.log("Header Caught : " + JSON.stringify(config.headers));
    return config;
  },
  function (error) {
    // Do something with request error
    error = "error adding header";
    return Promise.reject(error);
  }
);

export default instance;

// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
