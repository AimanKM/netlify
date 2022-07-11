import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router } from 'react-router-dom';
import RootRouter from './routes/rootRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" />
      <QueryClientProvider client={queryClient}>
        <Router>
          <RootRouter />
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
