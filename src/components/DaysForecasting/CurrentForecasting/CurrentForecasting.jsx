import React from 'react' 
import moment from 'moment'
import classes from './CurrentForecasting.module.scss'
const currentForecasting = (props) =>{
    let locRoot = (props.currLoc && props.currLoc.length)?props.currLoc[0]:props.currLoc
    let forecastRoot = props.currForecast
    let btnClass = (locRoot && props.favoriteList && props.favoriteList[locRoot.Key])? 
    `${classes['btn-span']} ${classes['saved']}`:`${classes['btn-span']}`
    
    
    return(
        <div className={classes['current-container']}>
            <p className={classes['degree']}>{forecastRoot && Math.round(forecastRoot.Temperature.Metric.Value)}°</p>
            <div className={classes['btn-content']}
            onClick={props.toggleFavorite}>
                <div className={btnClass}>
                    <button  className={classes['favBtn']}>save</button>
                    <span className="fas fa-heart"></span>
                </div>
                <div className={classes['buttom-content']}>
                    <p className={classes['weather']}>{forecastRoot && forecastRoot.WeatherText}</p>
                    <div className={classes['location']}>
                        <h2>{locRoot && locRoot.LocalizedName}</h2> ,
                        <h3>{locRoot && locRoot.Country.LocalizedName}</h3>
                    </div>
                    <h3 className={classes['date']}>
                    {forecastRoot && moment(forecastRoot.LocalObservationDateTime).format('MMM Do')}
                    </h3>
                </div>
            </div>
        </div>
    )
}
export default currentForecasting