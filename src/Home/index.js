import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../Auth/redux';
import AuthenticatedScreen from '../Auth/AuthenticatedScreen';
import Map from '../Geolocation/Map';

@AuthenticatedScreen
class Home extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Map />
      </View>
    );
  }
}

export default connect(null, { logout })(Home);
