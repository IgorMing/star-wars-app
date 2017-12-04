import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { MapView } from 'expo';
import AuthenticatedScreen from '../Auth/AuthenticatedScreen';
import Geolocation from './index';
import { getCharacters } from './People';

@AuthenticatedScreen
@Geolocation
class Map extends Component {
  static propTypes = {
    location: PropTypes.object,
    geocode: PropTypes.object
  };

  static defaultProps = {
    location: {},
    geocode: {}
  };

  state = {
    jedis: [],
    kaminoans: []
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      const { location } = nextProps;

      if (location.coords) {
        getCharacters(location.coords).then((data) => {
          const { jedis, kaminoans } = data;

          this.setState({
            jedis,
            kaminoans
          });
        });
      }
    }
  }

  renderKaminoans() {
    return this.state.kaminoans.map((kaminoan) => {
      const { coords, name } = kaminoan;

      return (
        <MapView.Marker
          key={name}
          coordinate={{
            latitude: parseFloat(coords.latitude),
            longitude: parseFloat(coords.longitude)
          }}
          image={require('../../images/kaminoan.jpg')}
        />
      );
    });
  }

  renderJedis() {
    return this.state.jedis.map((jedi) => {
      const { coords, name } = jedi;

      return (
        <MapView.Marker
          key={name}
          coordinate={{
            latitude: parseFloat(coords.latitude),
            longitude: parseFloat(coords.longitude)
          }}
          image={require('../../images/jedi.png')}
        />
      );
    });
  }

  renderOwnLocalization() {
    const { geocode } = this.props;

    if (!geocode) {
      return null;
    }

    const { city, street } = geocode;

    return <Text>You're located in {street}, {city}</Text>;
  }

  renderMeAsMarker() {
    const { location } = this.props;

    if (!location.coords) {
      return null;
    }

    const { coords: { latitude, longitude } } = location;

    return (
      <MapView.Marker
        coordinate={{
          latitude,
          longitude
        }}
        pinColor="red"
      />
    );
  }

  render() {
    const { location } = this.props;

    if (!location.coords) {
      return null;
    }

    const { coords: { latitude, longitude } } = location;

    return (
      <View style={{ flex: 1 }}>
        {this.renderOwnLocalization()}
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.renderMeAsMarker()}
          {this.renderKaminoans()}
          {this.renderJedis()}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Map);
