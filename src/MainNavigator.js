import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Home from './Home';

const MainStackNavigator = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home }
}, {
  initialRouteName: 'Login'
});

const MainNavigator = () => <MainStackNavigator />;

export default MainNavigator;
