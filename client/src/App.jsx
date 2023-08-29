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

function App() {
  const authStore = useAuthStore();

  // Función auxiliar para comprobar si el usuario está autenticado
  const isAuthenticated = () => {
    return authStore.accessToken != null;
  };

  return (
    <BrowserRouter>
        {authStore.isLoggedIn ? null : <NavBarMenuGuest isLoggedIn={authStore.isLoggedIn} />}
      <Routes>
        <Route path='/login' element={authStore.isLoggedIn ? (
          authStore.userRole === 'Customer' ? <Navigate to="/home-customer" /> : <Navigate to="/home-staff" />
        ) : (
          <Login />
        )} />
        <Route path="/registrarme/" element={<RegisterUser />} />
        <Route path="/verificar-cuenta/:id/:token" element={<VerifyUser />} />
        <Route path="/olvide-clave/" element={<ForgotPass />} />
        <Route path="/reestablecer-clave/:id/:token" element={<ChangePass />} />
        {/* Rutas protegidas */}
        {isAuthenticated() ? (
              <>
                {/* Rutas para el rol de Customer */}
                {authStore.userRole === 'Customer' && (
                  <Route path="/home-customer" element={<NavBarMenuCustomer />}>
                    {/* <Route path="mi-perfil" element={<MyProfile />} /> */}
                    {/* <Route path="*" element={<Error404 />} /> */}
                  </Route>
                )}

                {/* Rutas para el rol de Staff */}
                {/* STAFF */}
                {authStore.userRole === 'Staff' && (
                  <Route path="/home-staff" element={<NavBarMenuStaff />}>
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
