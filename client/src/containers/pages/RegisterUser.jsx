import { useEffect, useState} from 'react'
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {registerUser, sendMail} from '../../api/users.api'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import '../../styles/RegisterUser.css'
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { MdEmail } from "react-icons/md"

export default function RegisterUser() {
    const { register, handleSubmit, formState: {errors}, setValue, reset, setError, clearErrors } = useForm()
    const [emailError, setEmailError] = useState(null)
    const navigate = useNavigate()
    const [showPwd, setShowPwd] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);

    const showCustomToast = (message) => {
      toast.success(message, {
          style: {
          background: "var(--dark)",
          color: "#fff"
        }
      })
    }

    {/*Enviar mail*/}
    const sendMailUser = async ({ email }) => {
      try {
        const formData = new FormData();
        formData.append('email', email);

        await sendMail(formData);
      } catch (error) {
        console.log("Error al enviar: ",error)
      }
    }

    {/*Crear*/}
    const onSubmit = handleSubmit(async (data) => {
      if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
        setError('confirmPassword', {
          type: 'validate',
          message: 'Las contraseñas no coinciden'
        })
        return
      }

      try {

        if (!data.password) {
            setError('password', {
                type: 'validate',
                message: 'Debe ingresar una contraseña.'
            })
        return
        }
        delete data.confirmPassword
        await registerUser({ ...data})
        showCustomToast('Registro exitoso!')
        sendMailUser({email: data.email})
        
        navigate('/login')
      } catch (error) {
        if (error.response && error.response.data) {
          const responseData = error.response.data;
          if (responseData.errors) {
            const errorForm = responseData.errors;
            if (errorForm.email) {
              setEmailError("El Email ya está registrado");
            }
          } else {
            // Manejo del error general sin errores específicos
            console.log('Error adicional del servidor:', responseData);
          }
        } else {
          console.log('Error al enviar la solicitud: ', error);
        }        
        console.log('Error al enviar la solicitud: ', error)
      }
    })

    const handleEmailChange = () => {
      clearErrors('email')
      setEmailError(null)
    }
  
    const handleFormReset = () => {
      reset()
      clearErrors()
      setEmailError(null)
    }
  
    return (
      <div className="center">
       <div className='background-form m-1' style={{borderRadius: '10px'}}>
        <Form className="container mb-3" onSubmit={onSubmit} onReset={handleFormReset}>
          <h3 className='center p-2 m-4'>Registrate</h3>
            
            {errors.name && (
                <div className="error-message">
                <span>El nombre es requerido.</span>
                </div>
            )}
            <Form.Group className="group mb-3">
              <Form.Label>Nombre</Form.Label>
                <Form.Control className="simple"
                type="text"
                placeholder="Nombre"
                {...register("name", { required: true })}
                />
            </Form.Group>
    
            {errors.last_name && (
                <div className="error-message">
                <span>El apelllido es requerido.</span>
                </div>
            )}
            <Form.Group className="group mb-3">
              <Form.Label>Apellido</Form.Label>
                <Form.Control className="simple"
                type="text"
                placeholder="Apellido"
                {...register("last_name", { required: true })}
                />
            </Form.Group>
    
            {errors.email && (
                <div className="error-message">
                <span>El email es requerido.</span>
                </div>
            )}
            {emailError && (
                <div className="error-message">
                <span>{emailError}</span>
                </div>
            )}
            <Form.Group className="group mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="simple"
                type="email"
                placeholder="david@example.com"
                {...register("email")}
                onChange={handleEmailChange}
              />
              <div className="pwd-icon">
                <MdEmail />
              </div>
            </Form.Group>

            <Form.Group className="group mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                className="simple custom-input"
                type="date"
                placeholder="dd / mm / aaaa"
                {...register("birthday")}
                onChange={handleEmailChange}
              />
            </Form.Group>

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
              {...register("password")}
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
    
            <Button variant="primary" size="lg" type="submit" className='mb-3 p-2'>Registrate</Button>
            <p>¿Ya tenes una cuenta? <Link className='link-dark' to='/login'>Inicia sesión</Link></p>
            
        </Form>
        </div>
      </div>
    )
  }