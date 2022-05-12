import React from 'react';
import PropTypes from 'prop-types';
// import { useQuery, useQueryClient } from 'react-query';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { supabase } from 'utils/supabase';
import MastarTemplates from 'components/Templates/MastarTemplates';
import LandingPage from 'components/Page/LandingPage';
import Home from 'components/Page/home';
import Signup from '../LandingPage/Signup';

const PublicPage = () => {
  // const qc = useQueryClient();
  const user = supabase.auth.user();
  // const [loading, setLoading] = useState(false);

  // function getProfile() {

  //   supabase
  //     .from('profiles')
  //     .select('*')
  //     .eq('id', user.id)
  //     .single()
  //     .then(({ data, error, status }) => {
  //       if (data) {
  //           qc.setQueryData('user', {
  //       ...user,
  //       ...data,
  //     });
  //       }
  //       if (error && status !== 406) {
  //         throw error;
  //       }
  //     });
  // }
  
  // console.log('data', data);
  

  return (
    <div>
      {user ? (
        <MastarTemplates>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/" />
          </Switch>
        </MastarTemplates>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

PublicPage.propTypes = {
  children: PropTypes.node,
};

export default withRouter(PublicPage);
