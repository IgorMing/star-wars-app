import React, { Component } from 'react';
import { Button, Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../Auth/redux';
import AuthenticatedScreen from '../Auth/AuthenticatedScreen';

@AuthenticatedScreen
class Home extends Component {
  render() {
    return (
      <View>
        <Text>This is a loggedIn screen</Text>

        <Button
          onPress={this.props.logout}
          title="Logout"
        />
      </View>
    );
  }
}

export default connect(null, { logout })(Home);
