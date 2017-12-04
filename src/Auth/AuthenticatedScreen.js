import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Header from '../components/Header';
import { logout } from './redux';

function resetAuth(dispatch = () => {}) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })]
  });

  dispatch(resetAction);
}

export default function AuthenticatedScreen(WrappedComponent) {
  class WrapperComponent extends Component {
    static navigationOptions = ({ navigation }) => ({
      header:
        <Header
          leftAction={() => resetAuth(navigation.dispatch)}
          rightIcon={navigation.state.params.picture.data.url}
        />
    });

    static propTypes = {
      token: PropTypes.string,
      navigation: PropTypes.object
    };

    static defaultProps = {
      token: null,
      navigation: {}
    };

    componentWillReceiveProps(nextProps) {
      if (this.props.token !== nextProps.token) {
        if (!nextProps.token) {
          resetAuth(nextProps.navigation.dispatch);
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  const mapStateToProps = ({ auth }) => ({
    token: auth.token
  });

  return connect(mapStateToProps, { logout })(WrapperComponent);
}
