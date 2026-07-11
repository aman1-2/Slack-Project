import './App.css';

import { Route, Routes } from 'react-router-dom';

import SigninCard from '@/components/organism/Auth/SigninCard';
import { SignupCard } from '@/components/organism/Auth/SignupCard';
import { Auth } from '@/pages/Auth/Auth.jsx';
import NotFound from '@/pages/NotFound/NotFound';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home Page go to /auth</div>}></Route>
        <Route path="/auth/signup" element={<Auth><SignupCard /></Auth>}></Route>
        <Route path="/auth/signin" element={<Auth><SigninCard /></Auth>}></Route>

        <Route path='/*' element={<NotFound></NotFound>} />
      </Routes>
    </>
  );
}

export default App;
