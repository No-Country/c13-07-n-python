import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Login.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { performApiRequest, getRol } from '../../api/users.api'
import { Cookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { MdEmail } from "react-icons/md"
import '../../styles/RegisterUser.css'
import { useAuthStore } from '../../useAuthStore'

const cookies = new Cookies();

const client = axios.create(
  {
    baseURL: "http://127.0.0.1:8000"
  });

  const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const authStore = useAuthStore();
  
    const handleEmailChange = (e) => {
      const lowercaseEmail = e.target.value.toLowerCase()
      setEmail(lowercaseEmail);
      setError('')
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setError('')
    };
  
    const submitLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await client.post('/core/login/', {
          email: email,
          password: password
        });
        const { access, 'refresh-token': refreshToken } = response.data;
  
        cookies.set('access', access)
        cookies.set('refresh', refreshToken)
  
        // Restablecer los campos de correo electrónico y contraseña
        setEmail('');
        setPassword('');
        setError('');
  
        const decodedToken = jwt_decode(access);
        const userId = decodedToken.user_id;

        const rolResponse = await performApiRequest(getRol, userId);
        const rol = rolResponse.message;

        authStore.login(access, refreshToken);
        authStore.setUserRole(rol);

        navigate('/', {replace: true})
  
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError('Error en la solicitud');
        }
        console.error(error);
      }
    };

  return  (
   
    <div className="center">
      
        <div className='background-form m-1' style={{borderRadius: '10px'}}>
          <Form onSubmit={submitLogin}>
            <h3 className='center p-2 m-4'> Inicia sesión </h3>
              
            <Form.Group className="group mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
                <Form.Control className='simple' type="email" placeholder="david@example.com" 
                value={email} onChange={handleEmailChange}/>
                <div className="pwd-icon">
                  <MdEmail />
              </div>
            </Form.Group>
            <Form.Group className="group mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
                <Form.Control className='simple' type={showPwd ? "text" : "password"} placeholder="*********" 
                value={password} onChange={handlePasswordChange} />
                <div className="pwd-icon" onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? <VscEyeClosed/> : <VscEye/> }
                </div>
            </Form.Group>

            <div className="forgot-password-link">
              <Link to="/olvide-clave">¿Olvidaste tu contraseña?</Link>
            </div>

            {error && <p className="error-message">{error}</p>} 
            <Button variant="primary" size="lg" type="submit" className='mb-3 p-2'>
              Iniciar sesión
            </Button>

            <p>¿No tenés una cuenta? <Link className='link-dark' to='/registrarme'>Registrate</Link></p>
            
          </Form>  

        </div>    
    </div>
       
    )
     }
export default Login;