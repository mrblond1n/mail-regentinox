import {firebaseReducer} from 'react-redux-firebase';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import appReducer from './appReducer';
import authReducer from './authReducer';
import eventsReducer from './eventReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    events: eventsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    app: appReducer
});

export default rootReducer;
