
import React from 'react' 
import * as forecastActions from '../../../store/action/forecast'
import { connect } from 'react-redux';
import classes from './Toast.module.scss'
const toast = (props) =>{
    
    let errMsg = props.err.toString().substring(13,props.length);

    setInterval(()=>{
        props.onCloseToast(false)
    },4000)
    
    return (
        <div className={classes['toast-container']}>
            <h1>somting went worng, {errMsg}</h1>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        onCloseToast: (val)=> dispatch(forecastActions.setErrorHandle(val)),
        
    }
}

export default connect(null,mapDispatchToProps)(toast)