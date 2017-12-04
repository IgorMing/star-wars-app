import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import _first from 'lodash/first';

export default function Geolocation(WrappedComponent) {
  return class WrapperComponent extends Component {
    state = {
      geocode: null,
      location: {}
    };

    componentWillMount() {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        return this.setState({
          errorMessage: 'Please, try it on your device!'
        });
      }

      return this.getLocationAsync();
    }

    async getLocationAsync() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        });
      }

      const location = await Location.getCurrentPositionAsync({});

      this.setState({ location });

      const { coords: { latitude, longitude } } = location;
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      this.setState({ geocode: _first(geocode) });
    }

    render() {
      const { geocode, location } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          location={location}
          geocode={geocode}
        />
      );
    }
  };
}
