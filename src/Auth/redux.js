import Expo from 'expo';

const API_ID = '1958175950864388';
const FACEBOOK_URL = 'https://graph.facebook.com';
const INITIAL_STATE = {
  token: null,
  facebookId: null,
  picture: null
};

// Actions
const LOGIN = 'AUTH/LOGIN';
const RESET_STATE = 'AUTH/RESET_STATE';

// Reducer
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      };
    case RESET_STATE:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default: return state;
  }
}

export function login() {
  return async (dispatch) => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(API_ID, {
      permissions: ['public_profile', 'email']
    });

    if (type === 'success') {
      const response = await fetch(
        `${FACEBOOK_URL}/me?access_token=${token}&fields=id,name,picture.type(large)`);

      const info = await response.json();

      dispatch({
        type: LOGIN,
        payload: {
          token,
          facebookId: info.id,
          picture: info.picture
        }
      });
    }
  };
};

export function logout() {
  return async(dispatch, getState) => {
    const { facebookId, token } = getState().auth;
    const response = await fetch(
      `${FACEBOOK_URL}/${facebookId}/permissions?access_token=${token}`,
      {
        method: 'DELETE'
      }
    );

    const responseJson = await response.json();

    if (responseJson.success) {
      dispatch({
        type: RESET_STATE
      });
    }
  };
};
