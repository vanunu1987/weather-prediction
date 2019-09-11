import React from 'react' 
import classes from './DayForecast.module.scss'
import moment from 'moment'

const dayForecast = (props) =>{
    let dayStatus = (props.isDay)? 'Day' : 'Night'
    let root = props.day[dayStatus]
    let icon = (root.Icon < 10) ? '0'+ root.Icon:root.Icon
    let maxTemp = props.day.Temperature.Maximum.Value 
    let minTemp = props.day.Temperature.Minimum.Value 
    let style = {
        'backgroundImage': `url(https://developer.accuweather.com/sites/default/files/${icon}-s.png)`
    }
    return(
    <div className={classes['day-container']}>
            <div style={style} className={classes['icon-img']}></div>
            <h1>{moment(props.day.Date).format('ddd').toUpperCase()}.</h1>
            <p>{Math.round(minTemp)}°/{Math.round(maxTemp)}°</p>
    </div>
    )
}
export default dayForecast 