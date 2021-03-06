import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
			return { ...state, errorMessage: action.payload };
		case 'signup':
			return { errorMessage: '', token: action.payload };
		case 'signin':
			return { errorMessage: '', token: action.payload };
		case 'clear_error_message':
			return { ...state, errorMessage: '' };
		case 'signout':
			return { token: null, errorMessage: '' };
		case 'fetch_name':
			return action.payload; 
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
	  dispatch({ type: 'signin', payload: token });
	  navigate('TrackList');
	} else {
	  navigate('Signup');
	}
  };

const clearErrorMessage = dispatch => () => {
	dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async ({ email, password, first_name, last_name }) => {
    try{
        const response = await trackerApi.post('/signup', { email, password, first_name, last_name });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signup', payload: response.data.token });

        navigate('TrackList');
    } catch (err) {
        dispatch({ 
            type: 'add_error', 
            payload: 'Something went wrong with sign up' 
        });
    }
};


const signin = (dispatch) => async ({ email, password }) => {
	try{
		const response = await trackerApi.post('/signin', { email, password });
		await AsyncStorage.setItem('token', response.data.token);
		dispatch({ type: 'signin', payload: response.data.token })

		navigate('TrackList');
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: 'Invalid email or password!'
		});
	}
};

const signout = (dispatch) => async () => {
	try {
		await AsyncStorage.removeItem('token');
		dispatch({ type: 'signout' })

		navigate('loginFlow');
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: 'Invalid email or password!'
		});
	}
};


export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, tryLocalSignin },
	{ token: null, errorMessage: '' }
  );