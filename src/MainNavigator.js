import React from 'react';
import { StackNavigator } from 'react-navigation';

import Example from './Example';

const MainStackNavigator = StackNavigator({
  Example: { screen: Example }
});

const MainNavigator = () => <MainStackNavigator />;

export default MainNavigator;