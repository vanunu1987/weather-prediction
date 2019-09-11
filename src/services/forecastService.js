

import * as axiosService from './axiosService'

const API_KEY = 'f56D3EJFDnDKCgvnf4Y4PFosNhGusQa7'

const getLocKey = async (key) => {
    let res = await axiosService.forecastAxios
    .get(`locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${key}`)
    return res.data
}
const get5DaysForecast = async (key) => {
    let res = await axiosService.forecastAxios
    .get(`forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=true`)
    return res.data
}
const getCurrentForecast = async (key) => {
    let res = await axiosService.forecastAxios
    .get(`currentconditions/v1/${key}?apikey=${API_KEY}`)
    return res.data[0]
}

const getCityObj = cityArr =>{
  return  cityArr.map(obj=>{
        return{
            'key': obj.Key,
            'city': obj.LocalizedName,
            'country': obj.Country.LocalizedName
        }
    })
}


export default {
    getLocKey,
    get5DaysForecast,
    getCurrentForecast,
    getCityObj
}