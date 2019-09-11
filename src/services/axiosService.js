import Axios from 'axios'


export const forecastAxios = Axios.create({
    baseURL:'https://dataservice.accuweather.com/'
})

forecastAxios.interceptors.response.use(res => res,error => {
    console.log('error : ',error);
    throw new Error(error)
})