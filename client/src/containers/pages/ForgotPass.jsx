import { useForm } from 'react-hook-form'
import { Form, Button } from "react-bootstrap";
import { forgotPass } from '../../api/users.api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import '../../styles/RegisterUser.css'
import { useState } from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function ForgotPass() {
    const { register, handleSubmit, formState: {errors}, setError, clearErrors } = useForm();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const showCustomToast = (message) => {
      toast.success(message, {
          style: {
          background: "var(--dark)",
          color: "#fff"
        }
      });
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            style: {
            background: "var(--dark)",
            color: "#fff"
          }
        });
      };

    {/*Actualizar*/}
    const onSubmit = handleSubmit(async data => {
      if (data.email && data.confirmEmail && data.email !== data.confirmEmail) {
        setError('confirmEmail', {
          type: 'validate',
          message: 'Los emails no coinciden'
        })
        return
      }
      
      try{
        delete data.confirmEmail
        await forgotPass({email: data.email});
        showCustomToast('Se ha enviado un correo a tu email.')
        navigate('/login');
      }catch(error){
        const errorMessage = error.response?.data?.error || 'Error al enviar la solicitud';
        showErrorToast(errorMessage);
        console.log('Error adicional del servidor:', errorMessage);
      }})

      const handleEmailChange = (e) => {
        const lowerCaseEmail = e.target.value.toLowerCase()
        setEmail(lowerCaseEmail)
        clearErrors('email')
      }

    return (
    
      <div className="center" style={{ marginTop: '80px'}}>
        <div className='background-form m-1' style={{borderRadius: '10px'}}>
            <Form className="form" onSubmit={onSubmit}>
            <h4 className="center mb-4">Reestablecer contraseña</h4>

                
                <Form.Group className="group mb-3">
                <Form.Label>Email</Form.Label>
                {errors.email && (
                    <div className="error-message">
                    <span>El email es requerido.</span>
                    </div>
                )}
                    <Form.Control
                    className="simple mb-3"
                    name="email" 
                    type="email"
                    value={email}
                    placeholder="david@example.com"
                    {...register("email", { required: true })}
                    onChange={handleEmailChange}
                    />
                </Form.Group>
                
                
                <Form.Group className="group mb-3">
                <Form.Label>Confirmar Email</Form.Label>
                {errors.confirmEmail && (
                  <div className="error-message">
                    <span>{errors.confirmEmail.message}</span>
                  </div>
                )}
                  <Form.Control
                    className="simple mb-3"
                    name="confirmEmail" 
                    type="email"
                    placeholder="david@example.com"
                    {...register("confirmEmail", { required: true })}
                  />
                </Form.Group>
               
                <Button variant="primary" size="lg" type="submit" className='mb-3 p-2'>Enviar</Button>

                <p><Link className='link' to='/login'><span className='link-dark'><AiOutlineArrowLeft/></span>Regresar a Iniciar sesión</Link></p>
              
                
            </Form>
        </div>
       
       </div>
     
    )
  }