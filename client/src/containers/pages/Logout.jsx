import { createAuthAxios } from '../../api/authtoken.api'
import { Cookies } from 'react-cookie'
import { useEffect } from 'react';
import { useAuthStore } from '../../useAuthStore'
import { useNavigate } from 'react-router-dom';

const client = createAuthAxios("https://nahuellupe.pythonanywhere.com/")
const cookies = new Cookies();


const Logout = () => {
    const navigate = useNavigate();
    const authStore = useAuthStore();
    const handleLogout = async () => {
        try {
          await client.post('/core/logout/');
          

          cookies.remove('access');
          cookies.remove('refresh');
          cookies.remove('sessionid')
          cookies.remove('csrftoken')

          authStore.logout();

          setTimeout(() => {
            navigate('/login')
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