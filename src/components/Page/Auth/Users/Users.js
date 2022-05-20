import React from 'react';
import { Card } from 'components/molecules';
import { useQuery } from 'react-query';
import { gitUsers } from 'actions/users';
import { toast } from 'react-toastify';

const Users = () => {
  const { status, data } = useQuery('listUsers', gitUsers, {
    onError: () => toast.error('Internal Server Error'),
  });
  return (
    <>
      {status === 'error' && <h3>Internal Server Error</h3>}
      {status === 'loading' && <h3>loading......</h3>}
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
