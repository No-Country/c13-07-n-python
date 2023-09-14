import { createAuthAxios } from "./authtoken.api"
import axios from "axios"
const direccionamineto = "https://de08-2800-810-42a-22b1-4024-b2d2-e19b-bf69.ngrok-free.app/core/"

const ecommerceUsers = createAuthAxios(direccionamineto)

const guessUser = axios.create({
  baseURL: direccionamineto,
});

/*get usuarios*/
export const getCustomer = (id) => {
  return  ecommerceUsers.get(`/get-user/${id}/`) }

export const getStaff = (id) => {
  return  ecommerceUsers.get(`/get-staff/${id}/`) }

/*put de usuarios */
export const updateUser = (id, user) => {
  return ecommerceUsers.put(`/update-user/${id}/`, user)}

/* Obtener rol */
export const getRol = (id) => {
  return ecommerceUsers.get(`/get-rol/${id}/`)}

/*post de usuarios */
export const registerUser = (user) => {
  return guessUser.post('/register-user/', user)}

export const verifyUser = (id, token, verificationCode) => {
  return guessUser.post(`/verify-user/${id}/${token}/`, {verification_code: verificationCode})}

/*enviar mail de alta */
export const sendMail = (email) => {
  return guessUser.post('/send-email/', email)
}

/* Reestablecer clave */
export const forgotPass = (email) => {
  return guessUser.post(`/password-reset/`, email)
}

export const resetPass = (id, token, new_password) => {
  return guessUser.post(`/password-reset/confirm/${id}/${token}/`, new_password)
}

export const performApiRequest = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args)
    return response.data
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}