import React, {useState} from 'react' 
import { NavLink } from 'react-router-dom'
import classes from './Header.module.scss'
import Backdrop from '../../components/UI/Backdrop/Backdrop'

const Header = (props) =>{
    const [isBtnOpen,setBtn] = useState(false)
    let navClass = (isBtnOpen)? 
    `${classes['nav-container']} ${classes['open']}` : `${classes['nav-container']}`
    return(
        <div className={classes['header-container']}>
            <h1>W.Prediction</h1>
            <div className={navClass}>
                <NavLink  exact to="/">MAIN</NavLink> 
                <NavLink exact to="/favorites">MY-FAVORITES</NavLink>
            </div>
            <button className={`fas fa-bars ${classes['hamburger-btn']}`}
            onClick={()=>setBtn(!isBtnOpen)}></button>
            <Backdrop show={isBtnOpen} clicked={()=>setBtn(!isBtnOpen)} />
        </div>
    )
}

export default Header 




