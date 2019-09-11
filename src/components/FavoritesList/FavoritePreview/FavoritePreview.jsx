import React,{Component} from 'react' 
import classes from './FavoritePreview.module.scss'
import { withRouter } from 'react-router-dom'
import moment from 'moment'


class  FavoritePreview  extends Component {

    render(){

        let root = this.props.fav
        let icon = root.currForecast.WeatherIcon
        icon = (icon < 10) ? '0'+ icon: icon
        let style = {
            'backgroundImage': `url(https://developer.accuweather.com/sites/default/files/${icon}-s.png)`
        }
        return(
            <div className={classes['preview-container']}
            onClick={()=>this.props.history.push(`/{"Key":"${root.id}", "Name":"${root.name}"}`)}>
                <h1>{root.name}</h1>
                <p className={classes['date']}>{moment(root.currForecast.LocalObservationDateTime).format('MMM Do, h:mm a')}</p>
                <div style={style} className={classes['icon-img']}></div>
                <p>{Math.round(root.currForecast.Temperature.Metric.Value)}°</p>
                <h2>{root.currForecast.WeatherText}</h2>
            </div>
        )
    }
}
export default withRouter(FavoritePreview) 