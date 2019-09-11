import forecastService from '../../services/forecastService'
import * as actionTypes from '../action/actionTyps'

// Action creator

const setForecast = (forecast)=>{
    return {
        type: actionTypes.SET_FORECAST,
        forecast
    }
}
const set5DaysForecast = (daysForecast)=>{
    return {
        type: actionTypes.SET_5DAYSFORECAST,
        daysForecast
    }
}
const setLocKey = (locKey)=>{
    return {
        type: actionTypes.SET_LOCKEY,
        locKey
    }
}

export const setCityList = (cityList)=>{
    return{
        type: actionTypes.SET_CITY_LIST,
        cityList
    }
}

export const setIsDropdown = (val)=>{
    return{
        type: actionTypes.SET_IS_DROPDOWN,
        val
    }
}

export const setErrorHandle = (err) =>{
    return{
        type: actionTypes.SET_ERROR_HANDLE,
        err
    }
}




//Action


  export const  getForecast =  location =>{
        return async (dispatch) =>{
            try {
                let locationArr = await forecastService.getLocKey(location.name)
                dispatch(setLocKey(locationArr))
                if (locationArr.length>1){
                    dispatch(setIsDropdown(true))
                }else {
                    location.key= locationArr[0].Key
                    let daysForecast = await forecastService.get5DaysForecast(location.key)
                    dispatch(set5DaysForecast(daysForecast))
                    let currForecast = await forecastService.getCurrentForecast(location.key)
                    dispatch(setForecast(currForecast))
                }
            }
            catch (error){
                dispatch(setErrorHandle(error))
            }
        }

}
  export const  getForecastByKey =  cityObj =>{
        return async (dispatch) =>{
            try {
                    let daysForecast = await forecastService.get5DaysForecast(cityObj.Key)
                    dispatch(set5DaysForecast(daysForecast))
                    let currForecast = await forecastService.getCurrentForecast(cityObj.Key)
                    dispatch(setForecast(currForecast))
                    let locationArr = await forecastService.getLocKey(cityObj.name)
                    dispatch(setLocKey(locationArr))
            }
            catch (error){
                dispatch(setErrorHandle(error))
            }
        }

}
export const  getLocKey =  locName =>{
        return async (dispatch) =>{
            try {
                let locKey = await forecastService.getLocKey(locName)
                dispatch(setLocKey(locKey))
            }
            catch (error){
                dispatch(setErrorHandle(error))
            }
        }

}
export const  getCurrForecastByKey =  cityObj =>{
        return async (dispatch) =>{
            try {
                let currForecast = await forecastService.getCurrentForecast(cityObj.id)
                dispatch(setForecast(currForecast))
            }
            catch (error){
                dispatch(setErrorHandle(error))
            }
        }

}




