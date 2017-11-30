import React, { Component } from 'react';
import Expo from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import * as actions from './redux';
import { Spinner } from '../components';

class Example extends Component {
  componentDidMount() {
    this.props.getMessage();
  }

  async logIn() {
    const API_ID = '1958175950864388';
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(API_ID, {
      permissions: ['public_profile', 'email']
    });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);

      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  async logOut() {
    await Expo.Facebook.logOut(() => Alert.alert('logged out!', 'yeahhhh!'));
  }

  render() {
    const { example } = this.props;

    if (example.loading) {
      return <Spinner />;
    }

    return (
      <View style={styles.container}>
        <Text>{example.message}</Text>
        <Button
          onPress={this.logIn}
          title="Login"
        />
        <Button
          onPress={this.logOut}
          title="Logout"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

Example.propTypes = {
  example: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  getAnotherMessage: PropTypes.func.isRequired
};

const mapStateToProps = ({ example }) => ({ example });
const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
