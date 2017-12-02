import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

export default function AuthenticatedScreen(WrappedComponent) {
  class WrapperComponent extends Component {
    componentWillReceiveProps(nextProps) {
      console.log('---->', this.props, '---', nextProps);
      if (this.props.token !== nextProps.token) {
        if (!nextProps.token) {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })]
          });

          this.props.navigation.dispatch(resetAction);
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

  return connect(mapStateToProps)(WrapperComponent);
}
