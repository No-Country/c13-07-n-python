import {useState } from 'react';
import {useForm} from 'react-hook-form'
import { Form, Button } from "react-bootstrap";
import {resetPass} from '../../api/users.api'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import '../../styles/RegisterUser.css'
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function ChangePass() {
    const { register, handleSubmit, formState: {errors}, setValue, setError, clearErrors } = useForm();
    const params = useParams()
    const navigate = useNavigate();
    const [codeError, setCodeError] = useState(null)
    const [showPwd, setShowPwd] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);

    const showCustomToast = (message) => {
      toast.success(message, {
          style: {
          background: "var(--dark)",
          color: "#fff"
        }
      });
    };

    {/*Actualizar*/}
    const onSubmit = handleSubmit(async data => {
      if (data.new_password && data.confirmPassword && data.new_password !== data.confirmPassword) {
        setError('confirmPassword', {
          type: 'validate',
          message: 'Las contraseñas no coinciden'
        })
        return
      }
      
      try{
          delete data.confirmPassword
          await resetPass(params.id, params.token, {new_password: data.new_password, verification_code: parseInt(data.verification_code)});
          showCustomToast('Contraseña actualizada.')
          navigate('/login', { replace: true });
      }catch(error){
        if (error.response && error.response.data) {
          const errorMessage = error.response.data;
          if(errorMessage){
            setCodeError(errorMessage.error)
          } else {
            // Manejo del error general sin errores específicos
            console.log('Error adicional del servidor:', errorMessage);
          }
        }
        console.log('Error al enviar la solicitud: ', error)
      }})

    const handleCodeChange = (e) => {
        clearErrors('code');
        setCodeError(null);

        const input = e.target.value;
        const numbersOnly = input.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
        const truncated = numbersOnly.slice(0, 4); // Limita a 4 dígitos
        setValue("verification_code", truncated); // Actualiza el valor en el formulario
    }

return (
    <div className="center">
        <div className='background-form m-1' style={{borderRadius: '10px'}}>
        <Form className="container mb-3" onSubmit={onSubmit}>
        <h4 className='center p-2 m-4'>Cambiar contraseña</h4>

            {errors.password && (
                <div className="error-message">
                <span>{errors.password.message}</span>
                </div>
            )}
            <Form.Group className="group mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control className="simple"
            type={showPwd ? "text" : "password"}
            placeholder="*********"
            {...register("new_password")}
            />
            <div className="pwd-icon" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? <VscEyeClosed/> : <VscEye/> }
            </div>
            </Form.Group>

            {errors.confirmPassword && (
                <div className="error-message">
                <span>{errors.confirmPassword.message}</span>
                </div>
            )}
            <Form.Group className="group mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control className="simple"
            type={showPwd2 ? "text" : "password"}
            placeholder="*********"
            {...register("confirmPassword")}
            />
            <div className="pwd-icon" onClick={() => setShowPwd2(!showPwd2)}>
                { showPwd2 ? <VscEyeClosed/> : <VscEye/> }
            </div>
            </Form.Group>

            <Form.Group className="group mb-3" controlId="formBasicEmail">
              <Form.Label>Ingresa el código de verificación:</Form.Label>
              <Form.Control
                className="simplev"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="4"
                placeholder="0000"
                {...register("verification_code", { required: true })}
                onChange={handleCodeChange}
              />
            </Form.Group>
            {errors.verification_code && (
                <div className="error-message">
                <span>Debe ingresar el código.</span>
                </div>
            )}
            {codeError && (
                <div className="error-message">
                <span>{codeError}</span>
                </div>
            )}
    
            <Button variant="primary" size="lg" type="submit" className='mb-3 p-2'>Cambiar contraseña</Button>

            <p><Link className='link' to='/login'><span className='link-dark'><AiOutlineArrowLeft/></span>Regresar a Iniciar sesión</Link></p>
            
        </Form>
        </div>
    </div>
    )
}