import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import RootRouter from './routes/rootRouter';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <RootRouter />
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
