import { isJedi } from './helper';

const COORDINATE_LENGTH_AFTER_COMMA = 7;
const DISNTANCE_FROM_ME = 0.08;

export async function getCharacters(coords) {
  const response = await fetch('https://swapi.co/api/people/?page=1');
  const responseJson = await response.json();
  const characters = responseJson.results;
  const jedis = [];
  const kaminoans = [];

  characters.forEach((character) => {
    character.coords = generateRandomCoordinate(coords);

    isJedi(character.name) ?
      jedis.push(character) :
      kaminoans.push(character);
  });

  return {
    jedis,
    kaminoans
  };
}

function generateRandomCoordinate({ latitude, longitude }) {
  const newLatitude = getRandomArbitrary(
    latitude - DISNTANCE_FROM_ME, latitude + DISNTANCE_FROM_ME
  );
  const newLongitude = getRandomArbitrary(
    longitude - DISNTANCE_FROM_ME, longitude + DISNTANCE_FROM_ME
  );

  return {
    latitude: newLatitude.toFixed(COORDINATE_LENGTH_AFTER_COMMA),
    longitude: newLongitude.toFixed(COORDINATE_LENGTH_AFTER_COMMA)
  };
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
