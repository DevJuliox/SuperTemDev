import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import TemContainer from './components/TemContainer/TemContainer';
import Modal from './components/Modal/Modal'


const Root = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  return(
    <Switch location={background || location}>
      <Route exact path="/:temName" component={Modal} />
      <Route exact path='/' component={TemContainer} />
    </Switch>
  );
}

export default Root;