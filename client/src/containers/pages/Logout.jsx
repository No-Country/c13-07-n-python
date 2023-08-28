import { createAuthAxios } from '../../api/authtoken.api'
import { Cookies } from 'react-cookie'
import { useEffect } from 'react';
import { useAuth } from '../../AuthContext';

const client = createAuthAxios("http://127.0.0.1:8000/")
const cookies = new Cookies();


const Logout = () => {
    const handleLogout = async () => {
        try {
          await client.post('/core/logout/');
          

          cookies.remove('access');
          cookies.remove('refresh');
          cookies.remove('sessionid')
          cookies.remove('csrftoken')

          setTimeout(() => {
            window.location.href = '/login';
          }, 1000); // Redirigir después de 1 segundo
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        handleLogout();
      }, []);
    
      return null
  };

  export default Logout;