import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default class Header extends Component {
  static propTypes = {
    leftAction: PropTypes.func,
    rightIcon: PropTypes.string
  };

  static defaultProps = {
    leftAction: () => {},
    rightIcon: ''
  };

  renderLeft() {
    const { leftAction } = this.props;

    if (!leftAction) {
      return null;
    }

    return (
      <View style={styles.headerLeft}>
        <TouchableWithoutFeedback onPress={leftAction}>
          <SimpleLineIcons name="logout" size={20} color="white" />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderRightIcon() {
    const { rightIcon } = this.props;

    if (!rightIcon) {
      return null;
    }

    return (
      <View>
        <Image
          style={styles.picture}
          source={{ uri: rightIcon }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.header}>
        {this.renderLeft()}
        <View style={styles.header__title}>
          <Text style={styles.header__title__text}>Star wars app</Text>
        </View>
        {this.renderRightIcon()}
      </View>
    );
  }
}

const paddingVertical = 10;
const horizontalDistance = 18;
const statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

const styles = StyleSheet.flatten({
  header: {
    paddingTop: statusBarHeight + paddingVertical,
    paddingBottom: paddingVertical,
    paddingLeft: horizontalDistance,
    flexDirection: 'row',
    backgroundColor: '#222'
  },
  header__title: {
    flex: 9,
    justifyContent: 'center',
    marginLeft: horizontalDistance
  },
  header__title__text: {
    color: 'white',
    fontSize: 17
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center'
  },
  picture: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: horizontalDistance
  }
});
