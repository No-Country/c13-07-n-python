import { useState} from 'react'
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {verifyUser} from '../../api/users.api'
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast'
import '../../styles/RegisterUser.css'

export default function VerifyUser() {
    const { register, handleSubmit, formState: {errors}, setValue, reset, setError, clearErrors } = useForm()
    const [codeError, setCodeError] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    const showCustomToast = (message) => {
      toast.success(message, {
          style: {
          background: "var(--dark)",
          color: "#fff"
        }
      })
    }

    const onSubmit = handleSubmit(async (data) => {

      try {

        if (!data.verification_code) {
            setError('verification_code', {
                type: 'validate',
                message: 'Debe ingresar el código.'
            })
        return
        }
        await verifyUser(params.id, params.token, {verification_code: parseInt(data.verification_code)})
        showCustomToast('Cuenta verificada exitosamente!')
        
        navigate('/login')
      } catch (error) {
        if (error.response && error.response.data) {
          const responseData = error.response.data;
          if(responseData){
            setCodeError(responseData.error)
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

    const handleCodeChange = (e) => {
        clearErrors('code');
        setCodeError(null);
    
        const input = e.target.value;
        const numbersOnly = input.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
        const truncated = numbersOnly.slice(0, 4); // Limita a 4 dígitos
        setValue("verification_code", truncated); // Actualiza el valor en el formulario
    }
  
    const handleFormReset = () => {
      reset()
      clearErrors()
      setCodeError(null)
    }
  
    return (
      <div className="center">
       <div className='background-form m-1' style={{borderRadius: '10px'}}>
        <Form className="container mb-3" onSubmit={onSubmit} onReset={handleFormReset}>
          <h3 className='center p-2 m-4'>Verifica tu cuenta</h3>
    
            <Form.Group className="group mb-3" controlId="formBasicEmail">
              <Form.Label>Ingresa el código:</Form.Label>
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
    
            <Button variant="primary" size="lg" type="submit" className='mb-3 p-2'>Verificar</Button>
            <p>¿Ya tenes una cuenta verificada? <Link className='link-dark' to='/login'>Inicia sesión</Link></p>
            
        </Form>
        </div>
      </div>
    )
  }