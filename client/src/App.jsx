import './styles/index.css'
import { useAuthStore } from './useAuthStore'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom' 
import { Toaster } from 'react-hot-toast'
/*        Global          */
// import Error404 from '../src/containers/errors/Error404'
// import Footer from './layouts/Footer'
import Login from './containers/pages/Login'
import RegisterUser from './containers/pages/RegisterUser'
import NavBarMenuGuest from './layouts/NavBarMenuGuest'
/*        Registered          */
import VerifyUser from './containers/pages/VerifyUser'
import ChangePass from './containers/pages/ChangePass'
import ForgotPass from './containers/pages/ForgotPass'
/*        Authenticated          */
import Logout from './containers/pages/Logout'
// import MyProfile from './containers/pages/MyProfile'
/*        Customers          */
import NavBarMenuCustomer from './layouts/NavBarMenuCustomer'
/*        Staff         */
import NavBarMenuStaff from './layouts/NavBarMenuStaff'
import { Cookies } from "react-cookie"
import jwt_decode from 'jwt-decode'
import { useState, useEffect } from 'react'
import { performApiRequest, getRol } from './api/users.api'

function App() {
  const cookies = new Cookies();
  const accessToken = cookies.get('access');
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const authStore = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const userId = decodedToken?.user_id;

      const fetchUserRole = async () => {
        try {
          const response = await performApiRequest(() => getRol(userId));
          const { message, error } = response;

          if (message) {
            setUserRole(message);

          } else {
            // Manejar el error
            console.error(error);
          }
        } catch (error) {
          // Manejar el error
          console.error(error);
          setIsLoggedIn(false)
        }
      };

      fetchUserRole();
    }
  }, [accessToken]);

  // Función auxiliar para comprobar si el usuario está autenticado
  const isAuthenticated = () => {
    return accessToken != null;
  };

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [accessToken]);

  return (
    <BrowserRouter>
        {isLoggedIn ? null : <NavBarMenuGuest isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path='/login' element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/registrarme/" element={<RegisterUser />} />
        <Route path="/verificar-cuenta/:id/:token" element={<VerifyUser />} />
        <Route path="/olvide-clave/" element={<ForgotPass />} />
        <Route path="/reestablecer-clave/:id/:token" element={<ChangePass />} />
        {/* Rutas protegidas */}
        {isAuthenticated() ? (
              <>
                {/* Rutas para el rol de Customer */}
                {userRole === 'Customer' && (
                  <Route path="/home" element={<NavBarMenuCustomer />}>
                    {/* <Route path="mi-perfil" element={<MyProfile />} /> */}
                    {/* <Route path="*" element={<Error404 />} /> */}
                  </Route>
                )}

                {/* Rutas para el rol de Staff */}
                {/* STAFF */}
                {userRole === 'Staff' && (
                  <Route path="/home" element={<NavBarMenuStaff />}>
                    {/* <Route path="mi-perfil" element={<MyProfile />} /> */}
                    {/* <Route path="*" element={<Error404 />} /> */}
                  </Route>
                )}
                {/* <Route path="/editar-perfil" element={<UpdateUser />} /> */}
                <Route path="/logout" element={<Logout />} />
              </>
            ) : (
              // Redireccionar a /login si no está autenticado
              <Route path="*" element={<Navigate to="/login" />} />
              )}
      </Routes>

      <Toaster />
      {/* <Footer></Footer> */}
    </BrowserRouter>  
  )
}

export default App;
