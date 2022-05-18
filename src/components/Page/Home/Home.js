import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ApiUtils } from 'utils/apiUtils';
// import auth from 'utils/firebase';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LestCard from 'components/organisms/LestCard';
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
    <React.Fragment>
      <LestCard data={data?.data?.results} />
      <br />
      <Stack>
        <Pagination
          count={data?.data?.info.pages}
          onChange={(_, e) => setPage(e)}
          color="primary"
          page={page}
        />
      </Stack>
    </React.Fragment>
  );
};

export default Home;
