import React, { useEffect } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { useDiscover } from '../../../contexts/DiscoverContext';

const Discover = ({ error }) => {
  const {
    newReleases,
    playlists,
    categories,
    getNewReleases,
    getPlaylists,
    getCategories
  } = useDiscover();

  const fetchData = () => {
    if (!error) {
      getNewReleases();
      getCategories();
      getPlaylists();
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
    </div>
  );
}

export default Discover;