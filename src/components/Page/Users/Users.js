import React from 'react';
import { db } from 'utils/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { Card } from 'components/molecules';
import { useQuery } from 'react-query';

const Users = () => {
  const citiesRef = collection(db, 'users');
  const qu = query(citiesRef);

  const emulateFetch = () => {
    return new Promise((resolve) => {
      getDocs(qu).then((element) => resolve(element));
    }).catch((erorr) => {
      return new Error(erorr);
    });
  };

  const { status, data } = useQuery(['listUsers'], emulateFetch);
  return (
    <>
      {status === 'loading' && <h3>loading......</h3>}
      {status === 'success' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data?.docs.map((element, key) => {
            const docSnap = element.data();
            return (
              <Card key={key} name={docSnap.email}>
                <p>{docSnap.name}</p>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Users;
