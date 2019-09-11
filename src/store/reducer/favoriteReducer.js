import * as actionType from '../action/actionTyps'
import { updateObj } from '../utilty'


const initialState = {
favoriteCities: null

}

const reducer = (state= initialState, action) =>{

    switch (action.type) {
        case actionType.SET_FAVORITE_CITIES:
            let { citiesObj } = action
            return updateObj(state,
                    {favoriteCities: citiesObj}
             );
    }
    return state
}

export default reducer;
            