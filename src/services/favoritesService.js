

import utilService from './utilService'
import forecastService from '../services/forecastService'

const saveFavorite = (payload)=>{
    if (payload.currLoc.length) payload.currLoc = payload.currLoc[0]
    let favoritesCities = (!utilService.loadFromStorage('favorites'))?{}:utilService.loadFromStorage('favorites')
    let val= (favoritesCities[payload.currLoc.Key]) ? false :
    {id:payload.currLoc.Key,name:payload.currLoc.LocalizedName,currForecast:payload.cityObj}
    favoritesCities = {...favoritesCities,[payload.currLoc.Key]: val}
    utilService.saveToStorage('favorites',favoritesCities)
    return favoritesCities
}


const getFavorites = async() =>{
  let citiesObj =  utilService.loadFromStorage('favorites')
  if (!citiesObj) return null
  citiesObj = await Promise.all(Object.keys(citiesObj).map(async city=>{
    let currForecast = await forecastService.getCurrentForecast(citiesObj[city].id)
    return  { [city]:
            {...citiesObj[city],
            currForecast}
        }
    }))
    citiesObj = Object.assign({}, ...citiesObj.map(item =>{
    let key = Object.keys(item).join()
   return ({[item[key]['id']]: item[key]})
   }))
  return citiesObj
}

const getDefultLoc = async ()=>{
    let payload = {}
        payload.cityObj = await forecastService.getCurrentForecast("215854")
        payload.currLoc = await forecastService.getLocKey("tel aviv")
        let favoritesCities = saveFavorite(payload)
        return favoritesCities
}          
export default {
    saveFavorite,
    getFavorites,
    getDefultLoc
}