import React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { gitUsers } from 'actions/users';
import { Card } from 'components/molecules';

const Users = () => {
  const { status, data } = useQuery('listUsers', gitUsers, {
    onError: () => toast.error('Internal Server Error'),
  });
  return (
    <>
      {status === 'error' && <Typography variant="h6">Internal Server Error</Typography>}
      {status === 'loading' && <Typography variant="h6">loading......</Typography>}
      {status === 'success' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data?.data.users.map((element, key) => {
            return (
              <Card key={key} name={element.email}>
                <p>{element.name}</p>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Users;
