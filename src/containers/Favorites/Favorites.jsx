import React,{Component} from 'react'
import { connect } from 'react-redux';
import * as favoritesAction from '../../store/action/favorites'
import FavoritesList from '../../components/FavoritesList/FavoritesList'
import classes from './Favorites.module.scss'


class Favorites extends Component {
    state = {  
        favoriteCities: null
    }

    async componentDidMount(){
        await this.props.onFavoritesLoad()
        let {favoriteCities} = this.props
        if (!favoriteCities) this.props.onFavoritesLoadDefult()
    }

    render() { 
        return (
            <div className={classes['favorite-container']} >
                <div className={classes['title']}>
                    <h1>My Favorites Places</h1>
                </div>
                <div className={classes['content-container']}>
                <FavoritesList favoriteList={this.props.favoriteCities}/>
                </div>

            </div>
          )
    }
}



const mapStateToProps = state => {
    return {
        favoriteCities: state.favorite.favoriteCities,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFavoritesLoad: ()=> dispatch(favoritesAction.loadFavorites()),
        onFavoritesLoadDefult: ()=> dispatch(favoritesAction.loadDefultFavorites()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites) ;