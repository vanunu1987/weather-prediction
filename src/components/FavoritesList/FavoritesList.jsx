import React,{useState} from 'react' 
import classes from './FavoritesList.module.scss'
import FavoritePreview from './FavoritePreview/FavoritePreview'

const FavoritesList = (props) =>{
    const [page,setPage] = useState(1)
    
    let favoritePreview = props.favoriteList && Object.values(props.favoriteList) 
    .filter((favorite,idx)=>idx<page*3 && idx>=(page*3)-3)
    .map(favorite=> favorite && <li key={favorite.id}>
    <FavoritePreview  fav={favorite}/>
    </li>)
    let btnRightClass = (favoritePreview && favoritePreview.length<3 )?true: false
    return(
        <div className={classes['list-container']}>
                <button disabled={page<=1} className="fas fa-chevron-left"
                    onClick={()=>setPage(page-1)}></button>
               <ul>
                    {favoritePreview}
               </ul> 
                    <button disabled={btnRightClass} className="fas fa-chevron-right"
                    onClick={()=>setPage(page+1)}></button>
        </div>
)
}
export default FavoritesList 