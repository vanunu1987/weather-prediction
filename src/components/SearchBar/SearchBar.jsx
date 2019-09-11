import React from 'react' 
import classes from './SearchBar.module.scss'
const searchBar = (props) =>{
    let dropclass = (props.isDropdownState) ? 
    `${classes['drop']} ${classes['open']}`: `${classes['drop']}`
    let dropdown = props.isDropdown && props.currCityList && props.currCityList
    .map(cityObj=><li key={cityObj.Key}
    onClick={()=>props.listClicked(cityObj)}>
    {cityObj.LocalizedName}, {cityObj.Country.LocalizedName}
    </li>)
    return(
        <div className={classes['search-container']}>
            <form onSubmit={props.search}>
                <input className={classes['search-input']} type="text" 
                placeholder="Find out the weather prediction in your desired location"
                onChange={props.inputChange}
                value={props.inputText}/>
            </form>
            <ul className={dropclass}>
                {dropdown}
            </ul>
        </div>
    )
}
export default searchBar 