import './styles/index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Cookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { useState, useEffect, useCallback } from 'react';
import { performApiRequest, getRol } from './api/users.api';

import Login from './containers/pages/Login';
import RegisterUser from './containers/pages/RegisterUser';
import NavBarMenuGuest from './layouts/NavBarMenuGuest';
import VerifyUser from './containers/pages/VerifyUser';
import ChangePass from './containers/pages/ChangePass';
import ForgotPass from './containers/pages/ForgotPass';
import Logout from './containers/pages/Logout';
import MyProfile from './containers/pages/MyProfile';
import NavBarMenuCustomer from './layouts/NavBarMenuCustomer';
import HomeCustomer from './containers/pages/HomeCustomer';
import Categorias from './containers/pages/Categorias';


export default function App() {
  const cookies = new Cookies();
  const accessToken = cookies.get('access');
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = useCallback(() => {
    return accessToken != null;
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const userId = decodedToken?.user_id;

      const fetchUserRole = async () => {
        try {
          const response = await performApiRequest(() => getRol(userId));
          const { role, error } = response;

          if (role) {
            setUserRole(role);
          } else {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
          setIsLoggedIn(false);
        }
      };

      fetchUserRole();
    }
  }, [accessToken]);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [accessToken, isAuthenticated]);

  return (
    <BrowserRouter>
      {isLoggedIn ? <NavBarMenuCustomer /> : <NavBarMenuGuest isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/registrarme/" element={<RegisterUser />} />
        <Route path="/verificar-cuenta/:id/:token" element={<VerifyUser />} />
        <Route path="/olvide-clave/" element={<ForgotPass />} />
        <Route path="/reestablecer-clave/:id/:token" element={<ChangePass />} />

        <Route path="/" element={<HomeCustomer />} />
        <Route path="/categorias" element={<Categorias />} />

        {isAuthenticated() && (
          <>
            {userRole === 'Customer' && <Route path="/ver-perfil" element={<MyProfile />} />}
            <Route path="/logout" element={<Logout />} />
          </>
        )}

        {!isAuthenticated() && <Route path="/" element={<Navigate to="/login" />} />}
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
export default App;
