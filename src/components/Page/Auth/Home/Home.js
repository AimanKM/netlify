import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ApiUtils } from 'utils/apiUtils';
import { Stack, Pagination, Grid } from '@mui/material';
import { Card } from 'components/molecules';
import { Spacer } from 'components/atoms';
import styles from './style.module.css';
// import auth from 'utils/firebase';
// import axios from 'axios';

const Home = () => {
  const [page, setPage] = useState(1);
  // const [accessToken, setAccessToken] = useState('');

  function fetchData() {
    return ApiUtils('character', { page: page });
  }

  const { data, status } = useQuery(['characters', page], fetchData);
  // auth.currentUser
  //   .getIdToken()
  //   .then((accessToken) => setAccessToken(accessToken));

  // React.useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/api/users', {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Access-Token': accessToken,
  //       },
  //     })
  //     .then((response) => {
  //       console.log('response', response);
  //     });
  // }, [accessToken]);
  return status === 'loading' ? (
    <div>
      <h3>loading......</h3>
    </div>
  ) : (
    <div className={styles.container}>
      <Grid
        container
        spacing={2}
      >
        {data?.data?.results.map((item, key) => (
          <Grid item xs={12} sm={6} md={4} xl={2} key={key}>
            <Card key={key} name="sss">
              <p>{item?.name}</p>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Spacer height={16} />
      <Stack>
        <Pagination
          count={data?.data?.info.pages}
          onChange={(_, e) => setPage(e)}
          color="primary"
          page={page}
        />
      </Stack>
    </div>
  );
};

export default Home;
