import React, { useContext, useState } from "react";
import {
  authorize,
  fetchNewReleases,
  fetchCategories,
  fetchFeaturedPlaylists,
} from "../api/index.js";

const DiscoverContext = React.createContext();

export const useDiscover = () => useContext(DiscoverContext);

export const DiscoverProvider = ({ children }) => {
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAccessToken = async (setLoading, setError) => {
    try {
      const {
        data: { access_token },
      } = await authorize();
      localStorage.setItem("accessToken", access_token);
      setLoading(false);
    } catch (error) {
      setError(String(error));
      setLoading(false);
    }
  };

  const getNewReleases = async () => {
    try {
      const {
        data: {
          albums: { items },
        },
      } = await fetchNewReleases();
      setNewReleases(items);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getCategories = async () => {
    try {
      const {
        data: {
          categories: { items },
        },
      } = await fetchCategories();
      setCategories(items);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getPlaylists = async () => {
    try {
      const {
        data: {
          playlists: { items },
        },
      } = await fetchFeaturedPlaylists();
      setPlaylists(items);
    } catch (error) {
      throw new Error(error);
    }
  };

  const value = {
    newReleases,
    categories,
    playlists,
    getAccessToken,
    getNewReleases,
    getCategories,
    getPlaylists,
  };

  return (
    <DiscoverContext.Provider value={value}>
      {children}
    </DiscoverContext.Provider>
  );
};
