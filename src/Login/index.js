import React, { Component } from 'react';
import { Alert, Button, Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';
import { login } from '../Auth/redux';

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token) {
      if (nextProps.token && nextProps.facebookId) {
        this.props.navigation.navigate('Home');
      }
    }
  }

  render() {
    return (
      <View>
        <Text>Login screen</Text>

        <Button
          style={{ backgroundColor: 'blue', color: 'white' }}
          onPress={this.props.login}
          title="Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.flatten({});

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
  facebookId: auth.facebookId
});

export default connect(mapStateToProps, { login })(Login);
