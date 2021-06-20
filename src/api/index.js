import axios from "axios";
import base64 from "base-64";
import utf8 from "utf8";

const authAPI = axios.create({ baseURL: process.env.REACT_APP_AUTH_URL });

authAPI.interceptors.request.use((req) => {
  const bytes = utf8.encode(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );
  req.headers.Authorization = `Basic ${base64.encode(bytes)}`;
  return req;
});

const dataAPI = axios.create({ baseURL: process.env.REACT_APP_DATA_URL });

dataAPI.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return req;
});

export const authorize = () =>
  authAPI.post("/token", "grant_type=client_credentials");
export const fetchNewReleases = () => dataAPI.get(`/new-releases`);
export const fetchCategories = () => dataAPI.get(`/categories`);
export const fetchFeaturedPlaylists = () => dataAPI.get(`/featured-playlists`);
