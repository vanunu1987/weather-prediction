import React,{Component} from 'react'
import { connect } from 'react-redux';
import * as forecastActions  from '../../store/action/forecast'
import * as favoritesActions  from '../../store/action/favorites'
import utilService from '../../services/utilService'
import DaysForecasting from '../../components/DaysForecasting/DaysForecasting'
import CurrentForecast from '../../components/DaysForecasting/CurrentForecasting/CurrentForecasting'
import SearchBar from '../../components/SearchBar/SearchBar'
import classes from './Main.module.scss'


class Main extends Component {
    state = { 
        defultLoc: {key:"215854",name:'tel aviv'},
        inputText:'',
     }

     async componentDidMount(){
        await this.intLoad()
        let {favoriteCities} = this.props
        let { curLocation } = this.props
        let keyParm = this.props.match.params.key
        if (!favoriteCities) await this.props.onFavoritesDefultLoad()
        let cityObj = keyParm && favoriteCities[keyParm]
        let parmObj = cityObj && {Key:cityObj.id, name:cityObj.name}
        if (!curLocation) await this.props.onForecastLoad(this.state.defultLoc) 
        else if (keyParm) this.props.onLocationByKey(parmObj)
     }
    
     intLoad = async () =>{
        let loadLocation = utilService.loadFromStorage('currLoc')
        await this.props.onSetCurrLoc(loadLocation)
        let loadFavorites = utilService.loadFromStorage('favorites')
        await this.props.onSetFavoriteCity(loadFavorites)
        let loadForecast = utilService.loadFromStorage('currForecast')
        await this.props.onSetCurrforecast(loadForecast)
        let loadDaysForecast = utilService.loadFromStorage('daysForecast')
        await this.props.onSetDaysforecast(loadDaysForecast)
     }

     handleChange = (ev) =>{
        let inputText = ev.target.value
        inputText = inputText.replace(/[^A-Za-z\s]/ig, '')
        this.setState({inputText})
        
     }

     handleSearch = async (ev) =>{
        ev.preventDefault()
        if (this.props.isDropdown && !this.state.inputText) return
        await this.props.onForecastLoad({key:null,name:this.state.inputText})
        this.setState({inputText:''})
        setTimeout(()=>{
            this.setState({isDropdown:true})
        },100)

     }

     handleListClicked = (cityObj)=>{
        let obj = {Key:cityObj.Key, name:cityObj.LocalizedName}
        this.props.onDropdownChange(false)
        this.props.onLocationByKey(obj)

     }
     handleSaveToFavorite =()=>{
         let payload = {}
        payload.cityObj = this.props.currForecast
        payload.currLoc = this.props.curLocation
        this.props.onFavoriteCity(payload)

    }

    render() { 
        let daysForecast = (this.props.curr5daysforecast) ? this.props.curr5daysforecast.DailyForecasts:[]
        return ( 
          <div className={classes['main-container']}>
            <div className={classes['main-layout']}>
              <SearchBar inputChange={this.handleChange}
              inputText={this.state.inputText}
              search={this.handleSearch}
              isDropdown={this.props.isDropdown}
              currCityList={this.props.curLocation}
              listClicked={this.handleListClicked}/>
              <div className={classes['content-container']}>
                <CurrentForecast currForecast={this.props.currForecast}
                currLoc={this.props.curLocation}
                toggleFavorite={this.handleSaveToFavorite}
                favoriteList={this.props.favoriteCities}/>
                <DaysForecasting daysToForecast={daysForecast}
                currForecast={this.props.currForecast}/>
              </div>
            </div>
          </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        curLocation: state.forecast.currLocationKey,
        curr5daysforecast: state.forecast.curr5daysforecast,
        currForecast: state.forecast.currForecast,
        isDropdown: state.forecast.isDropdown,
        currCityList: state.forecast.currCityList,
        favoriteCities: state.favorite.favoriteCities
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLocationByKey: (cityObj)=> dispatch(forecastActions.getForecastByKey(cityObj)),
        onForecastLoad: (location)=> dispatch(forecastActions.getForecast(location)),
        onDropdownChange: (val)=> dispatch(forecastActions.setIsDropdown(val)),
        onCityListChange: (cities)=> dispatch(forecastActions.setCityList(cities)),
        onSetCurrLoc: (corLoc)=> dispatch(forecastActions.setLocKey(corLoc)),
        onSetCurrforecast: (curForecast)=> dispatch(forecastActions.setForecast(curForecast)),
        onSetDaysforecast: (daysForecast)=> dispatch(forecastActions.set5DaysForecast(daysForecast)),
        onFavoriteCity: (citiesObj)=>dispatch(favoritesActions.setFavoriteCities(citiesObj)),
        onSetFavoriteCity: (citiesObj)=>dispatch(favoritesActions.setFavorite(citiesObj)),
        onFavoritesLoad: ()=> dispatch(favoritesActions.loadFavorites()),
        onFavoritesDefultLoad: ()=> dispatch(favoritesActions.loadDefultFavorites()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main) ;