import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import SignupCardContainer from '@/components/organism/Auth/SignupCardContainer';
import { Auth } from '@/pages/Auth/Auth.jsx';
import NotFound from '@/pages/NotFound/NotFound';

import SigninCard from './components/organism/Auth/SigninCard';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>

        <Routes>
          <Route path="/" element={<div>Home Page go to /auth</div>}></Route>
          <Route path="/auth/signup" element={<Auth><SignupCardContainer /></Auth>}></Route>
          <Route path="/auth/signin" element={<Auth><SigninCard /></Auth>}></Route>

          <Route path='/*' element={<NotFound></NotFound>} />
        </Routes>

      </QueryClientProvider>
    </>
  );
}

export default App;
