import React from 'react';
import { db } from 'utils/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
// import LestCard from 'components/organisms/LestCard';

const Users = () => {
  // query(collection(db, 'Article')).then((e) =>console.log('e', e));
  const citiesRef = collection(db, 'users');
  const q = query(citiesRef);
  getDocs(q).then(({docs}) => console.log('docs',docs));
 
  // const [page, setPage] = useState(1);

  // const { data, status } = useQuery(['characters', page], fetchData);
  // return ( <LestCard data={data?.data?.results} />);
  return <div>Users</div>;
};

export default Users;
