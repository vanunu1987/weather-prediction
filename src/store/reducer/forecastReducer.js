
import * as actionType from '../action/actionTyps'
import { updateObj } from '../utilty'

const initialState = {
currLocationKey: null,
curr5daysforecast: null,
currForecast: null,
currCityList: null,
isDropdown: false,
isError: false

}

const reducer = (state= initialState, action) =>{

    switch (action.type) {
        case actionType.SET_LOCKEY:
            let { locKey } = action
            return updateObj(state,
                    {currLocationKey: locKey}
             );
        case actionType.SET_5DAYSFORECAST:
            let {daysForecast} = action
            return updateObj(state,
                {curr5daysforecast: daysForecast});
            
        case actionType.SET_FORECAST:
            let {forecast} = action
            return updateObj(state,
                {currForecast: forecast});

        case actionType.SET_CITY_LIST:
            let {cityList} = action
            return updateObj(state,
                {currCityList: cityList});

        case actionType.SET_IS_DROPDOWN:
            let {val} = action
            return updateObj(state,
                {isDropdown: val});

        case actionType.SET_ERROR_HANDLE:
            let {err} = action
            return updateObj(state,
                {isError: err});
    }       
        
            return state 
    
}


export default reducer;

