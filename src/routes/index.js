import React, { useEffect, useState } from 'react';
import Discover from './Discover';
import { useDiscover } from '../contexts/DiscoverContext';
import { CircularProgress, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export default function Routes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {
    getAccessToken,
  } = useDiscover();
  useEffect(() => {
    getAccessToken(setLoading, setError);
    // eslint-disable-next-line
  }, [])

  return (<>
    {error && <Alert severity="error" onClose={() => { setError('') }}>{error}</Alert>}
    { loading ?
      <Grid container justify="center" style={{ height: "100%" }} alignContent="center">
        <CircularProgress size={60} thickness={4.5} />
      </Grid> :
      <Discover error={error} />}
  </>
  );
}
