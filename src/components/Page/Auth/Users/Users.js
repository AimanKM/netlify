import React, { useState } from 'react';
import {
  Grid,
  Button,
  IconButton,
  Skeleton,
  InputBase,
  InputAdornment,
  Pagination,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  gitUsers,
  addUsers,
  uploadUserProfile,
  deleteUser,
} from 'actions/users';
import { Spacer, Card, Dialog, Flex } from 'components/atoms';
import { ReactComponent as DeleteIcon } from 'components/atoms/icon/Delete.svg';
import { ReactComponent as SearchIcon } from 'components/atoms/icon/search.svg';
import InternalServerError from 'components/Page/Public/InternalServerError';
import FormAddUser from './components/FormAddUser';
import EditImagSteps2 from './components/EditImagSteps2';
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
      {status === 'error' && <InternalServerError />}
      <div className={styles.container}>
        <Spacer height={6} />
        <Flex className={styles.search}>
          <InputBase
            fullWidth
            placeholder="Search..."
            className={styles.searchInput}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Flex>
        {status === 'success' && (
          <>
            <Button size="small" onClick={() => setSteps(1)} variant="text">
              Add User
            </Button>
            <Spacer height={6} />
          </>
        )}
        {(status === 'success' || status === 'loading') && (
          <>
            <div
              style={{
                padding: 10,
                overflowY: 'scroll',
                height: window.innerHeight - 225,
              }}
            >
              <Grid container spacing={1}>
                {(status === 'loading' || isLoading) &&
                  Array.from({ length: 9 }).map((_, key) => (
                    <Grid item xs={12} sm={6} md={4} xl={2} key={key}>
                      <Skeleton
                        height={130}
                        animation="wave"
                        variant="rounded"
                      />
                    </Grid>
                  ))}

                {!isLoading &&
                  status === 'success' &&
                  data?.data.users.map((element, key) => (
                    <Grid item xs={12} sm={6} md={4} xl={2} key={key}>
                      <Card
                        key={key}
                        src={element?.photoURL}
                        title={element?.display_name}
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
            {!isLoading && status === 'success' && (
              <>
                <Spacer height={26} />
                <Flex className={styles.pagination}>
                  <Pagination
                    count={10}
                    // size="small"
                    color="primary"
                    // variant="outlined"
                  />
                </Flex>
              </>
            )}
          </>
        )}

        <Dialog open={!!steps} onClose={onCloseDialog} title="Add User">
          <>
            {steps === 2 && userId ? (
              <EditImagSteps2
                fetching={uploadProfile.isLoading}
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
    </>
  );
};

export default Users;
