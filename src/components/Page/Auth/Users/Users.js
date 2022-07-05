import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { gitUsers } from 'actions/users';
import { Spacer, Card, Dialog } from 'components/atoms';
import FormAddUser from './FormAddUser';
import styles from './style.module.css';

const Users = () => {
  const [open, setOpen] = useState(false);
  const { status, data } = useQuery('listUsers', gitUsers, {
    onError: () => toast.error('Internal Server Error'),
  });

  return (
    <>
      {status === 'error' && (
        <Typography variant="h6">Internal Server Error</Typography>
      )}
      {status === 'loading' && (
        <Typography variant="h6">loading......</Typography>
      )}
      {status === 'success' && (
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
            <FormAddUser onSubmit={(first) => console.log('first', first)} />
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Users;
