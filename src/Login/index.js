import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login } from '../Auth/redux';

class Login extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    facebookId: PropTypes.string,
    login: PropTypes.func.isRequired,
    token: PropTypes.string,
    picture: PropTypes.object,
    navigation: PropTypes.object.isRequired
  };

  static defaultProps = {
    facebookId: null,
    token: null,
    picture: null
  };

  componentWillReceiveProps(nextProps) {
    const { facebookId, token, navigation, picture } = nextProps;

    if (this.props.token !== token) {
      if (token && facebookId) {
        navigation.navigate('Home', { picture });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../images/star-wars-logo.png')}
        />

        <Icon.Button name="facebook" style={styles.button} onPress={this.props.login}>
          Connect with Facebook
        </Icon.Button>
      </View>
    );
  }
}

const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
  logo: {
    alignSelf: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998'
  }
});

const mapStateToProps = ({ auth }) => ({
  token: auth.token,
  facebookId: auth.facebookId,
  picture: auth.picture
});

export default connect(mapStateToProps, { login })(Login);
