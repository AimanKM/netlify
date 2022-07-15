import React, { useState } from 'react';
import { Grid, Typography, Button, IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  gitUsers,
  addUsers,
  uploadUserProfile,
  deleteUser,
} from 'actions/users';
import { Spacer, Card, Dialog, AvatarEditImag } from 'components/atoms';
import { ReactComponent as DeleteIcon } from 'components/atoms/icon/Delete.svg';
import FormAddUser from './FormAddUser';
import styles from './style.module.css';

const Users = () => {
  const queryClient = useQueryClient();
  const [steps, setSteps] = useState(0);
  const [userId, setUserId] = useState(null);

  const { isLoading, status, data } = useQuery('listUsers', gitUsers, {
    onError: () => toast.error('Internal Server Error'),
  });

  const onCloseDialog = () => {
    if (userId) {
      queryClient.invalidateQueries('listUsers', { exact: true });
      setUserId(null);
      return setSteps(0);
    }
    return setSteps(0);
  };

  const onSubmit = useMutation(addUsers, {
    onSuccess: (res) => {
      setUserId(res.data?.userId);
      toast.success(res.data.message);
      setSteps(2);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  const uploadProfile = useMutation(uploadUserProfile, {
    onSuccess: (res) => {
      toast.success(res.data.message);
      onCloseDialog();
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  const onClickDeleteUser = useMutation(deleteUser, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('listUsers', { exact: true });
      toast.success(res.data.message);
    },
    onError: (error) => toast.error(error.response.data.message),
  });

  return (
    <>
      {status === 'error' && (
        <Typography variant="h6">Internal Server Error</Typography>
      )}
      {(status === 'loading' || isLoading) && (
        <Typography variant="h6">loading......</Typography>
      )}
      {status === 'success' && !isLoading && (
        <div className={styles.container}>
          <Spacer height={12} />
          <Button size="small" onClick={() => setSteps(1)} variant="text">
            Add User
          </Button>
          <Spacer height={12} />
          <div
            style={{ overflowY: 'scroll', height: window.innerHeight - 170 }}
          >
            <Grid container spacing={1}>
              {data?.data.users.map((element, key) => (
                <Grid item xs={12} sm={6} md={4} xl={2} key={key}>
                  <Card
                    key={key}
                    src={element?.photoURL}
                    name={element?.display_name}
                    action={
                      <IconButton
                        color="error"
                        aria-label="delete"
                        disabled={onClickDeleteUser.isLoading}
                        onClick={() =>
                          onClickDeleteUser.mutate({
                            userId: element.userId,
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <p>{element?.email}</p>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>

          <Dialog open={!!steps} onClose={onCloseDialog} title="Add User">
            <>
              {steps === 2 && userId ? (
                <AvatarEditImag
                  onUpload={(formData) => {
                    formData.append('userId', userId);
                    uploadProfile.mutate(formData);
                  }}
                />
              ) : (
                <FormAddUser
                  fetching={onSubmit.isLoading}
                  onSubmit={(values) => onSubmit.mutate(values)}
                />
              )}
            </>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Users;
