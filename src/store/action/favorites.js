import * as actionTypes from '../action/actionTyps'
import favoritesService from '../../services/favoritesService'
import utilService from '../../services/utilService'

export const setFavoriteCities = (payload)=>{
    let citiesObj = favoritesService.saveFavorite(payload)
    return{
        type: actionTypes.SET_FAVORITE_CITIES,
        citiesObj
    }
}

export const setFavorite = (citiesObj)=>{
    return{
        type: actionTypes.SET_FAVORITE_CITIES,
        citiesObj
    }
}

const setErrorHandle = (err) =>{
    return{
        type: actionTypes.SET_ERROR_HANDLE,
        err
    }
}



//Action 
export const  loadFavorites =  () =>{
    return async (dispatch) =>{
        try {
            let citiesObj = await favoritesService.getFavorites()
            utilService.saveToStorage('favorites',{...citiesObj})
            dispatch(setFavorite(citiesObj))
        }
        catch (error){
            dispatch(setErrorHandle(error))
        }
    }

}
export const  loadDefultFavorites =  () =>{
    return async (dispatch) =>{
        try {
            let citiesObj = await favoritesService.getDefultLoc()
            dispatch(setFavorite(citiesObj))
        }
        catch (error){
            dispatch(setErrorHandle(error))
        }
    }

}
