import React from 'react' 
import DayForecast from './DayForecast/DayForecast'
import classes from './DaysForecasting.module.scss'
const daysForecasting = (props) =>{
    let dayForecasting = props.daysToForecast.map(day=><li key={day.Date}>
        <DayForecast day={day} isDay={props.currForecast && props.currForecast.IsDayTime}/>
    </li>)
    return(
        <div className={classes['days-container']}>
            <ul>
                {dayForecasting}
            </ul>
    
        </div>
    )
}
export default daysForecasting 