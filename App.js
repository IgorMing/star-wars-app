import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';

import MainNavigator from './src/MainNavigator';
import reducers from './src/Reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD-LpiVapT0m8nyB06zgEUTT12XVpPMpr4',
      authDomain: 'star-wars-83ba3.firebaseapp.com',
      databaseURL: 'https://star-wars-83ba3.firebaseio.com',
      projectId: 'star-wars-83ba3',
      storageBucket: 'star-wars-83ba3.appspot.com',
      messagingSenderId: '786507169730'
    });
  }

  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
