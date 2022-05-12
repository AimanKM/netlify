import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ApiUtils } from 'utils/apiUtils';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LestCard from 'components/organisms/LestCard';

const Home = () => {
  const [page, setPage] = useState(1);

  function fetchData() {
    return ApiUtils('character', { page: page });
  }

  const { data, status } = useQuery(['characters', page], fetchData);
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
