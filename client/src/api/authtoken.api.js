import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Cookies } from 'react-cookie'

const defaultBaseURL = 'http://127.0.0.1:8000'

export const axi = axios.create({
  baseURL: defaultBaseURL,
});

export const createAuthAxios = (baseURL = defaultBaseURL) => {
  const authAxios = axios.create({
    baseURL,
    withCredentials: true,
  })

  const cookies = new Cookies();

  authAxios.interceptors.request.use(async (config) => {
    const access = cookies.get('access')

    config.headers = {
      'Authorization': `Bearer ${access}`,
    };

    const decoded = jwt_decode(access)

    const exp = new Date(decoded.exp * 1000)
    const now = new Date()
    const five = 1000 * 60 * 5

    if (exp.getTime() - now.getTime() < five) {
      try {
        const refresh = cookies.get('refresh');
        const res = await axi.post('core/api/token/refresh/', { refresh })
        const { access } = res.data
        cookies.set('access', access)
      } catch (error) {
        // Eliminar la cookie "access"
        cookies.remove('access')

        // Eliminar la cookie "refresh"
        cookies.remove('refresh')
        window.location.href = '/login'
      }
    } else {
      return config
    }

    return config
  });

  return authAxios
}