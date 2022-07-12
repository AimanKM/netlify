import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { gitUsers, addUsers } from 'actions/users';
import { Spacer, Card, Dialog } from 'components/atoms';
import FormAddUser from './FormAddUser';
import styles from './style.module.css';

const Users = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { isFetching, status, data } = useQuery('listUsers', gitUsers, {
    onError: () => toast.error('Internal Server Error'),
  });

  const onSubmit = useMutation(addUsers, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('listUsers', { exact: true });
      toast.success(res.data.message);
      setOpen(false);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return (
    <>
      {status === 'error' && (
        <Typography variant="h6">Internal Server Error</Typography>
      )}
      {(status === 'loading' || isFetching) && (
        <Typography variant="h6">loading......</Typography>
      )}
      {status === 'success' && !isFetching && (
        <div className={styles.container}>
          <Spacer height={12} />
          <Button size="small" onClick={() => setOpen(true)} variant="text">
            Add User
          </Button>
          <Spacer height={12} />
          <div
            style={{ overflowY: 'scroll', height: window.innerHeight - 170 }}
          >
            <Grid container spacing={1}>
              {data?.data.users.map((element, key) => (
                <Grid item xs={12} sm={6} md={4} xl={2} key={key}>
                  <Card key={key} name={element?.email}>
                    <p>{element?.email}</p>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>

          <Dialog open={open} onClose={() => setOpen(false)} title="Add User">
            <FormAddUser
              fetching={onSubmit.isLoading}
              onSubmit={(values) => onSubmit.mutate(values)}
            />
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Users;
