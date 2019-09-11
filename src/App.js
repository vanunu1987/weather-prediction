import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css';

import Main from './containers/Main/Main'
import Favorites from './containers/Favorites/Favorites'
import Header from './components/Header/Header'
import Toast from './components/UI/Toast/Toast'
import classes from './App.module.scss'


const App = (props)=> {
  let errorToast = (props.isError)? <Toast err={props.isError} />:''
  let imgClass = (props.currForecast && props.currForecast.IsDayTime)?
   `${classes['App']}`: `${classes['App']} ${classes['night']}`
  
  return (
    <div className={imgClass}>
      <BrowserRouter>
      <Header/>
      {errorToast}
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/favorites" component={Favorites}/>
          <Route path="/:key" component={Main}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

const mapStateToProps = state => {
  return {
    isError: state.forecast.isError,
    currForecast: state.forecast.currForecast,
  }
}

export default connect(mapStateToProps,null)(App) ;
