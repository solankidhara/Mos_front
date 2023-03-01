import axios from "axios";
import { redirect } from "react-router-dom";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.baseURL = "https://mos-backend-app.uw.r.appspot.com/api/v1";
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = config.headers["Content-Type"] ? config.headers["Content-Type"] :"application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === "https://mos-backend-app.uw.r.appspot.com/api/v1/users/token") {
      redirect("/login");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("token");

      return axios
        .post("/users/token", {
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem("token", res.data);
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
