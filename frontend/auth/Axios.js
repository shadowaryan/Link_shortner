import { useNavigate } from "react-router";
import axios from "axios";

const instance = axios.create({
  baseURL: ('http://localhost:8000') + "/",
});

//request interceptor to add the auth token header to requests
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const accessHeader = `Bearer ${accessToken}`;
    // console.log(`interceptor ${accessHeader}`);
    if (accessToken) {  
      config.headers["Authorization"] = accessHeader
    }
    // console.log(`config ${config}`);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//response interceptor to refresh token on receiving token expired error
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`http://localhost:8000/token/refresh/`, {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            localStorage.setItem("accessToken", res.data.access);
            // localStorage.setItem("refreshToken", res.data.refresh);
            return instance(originalRequest);
          }
        })
        .catch((err) => {
          localStorage.clear();
          // const navigate = useNavigate();
          window.location.href = "/login";
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default instance;