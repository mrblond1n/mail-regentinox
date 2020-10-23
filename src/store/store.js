import firebase from 'firebase/app';
import {getFirebase} from 'react-redux-firebase';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    createFirestoreInstance,
    getFirestore,
    reduxFirestore
} from 'redux-firestore';
import thunk from 'redux-thunk';
import fbConfig from '../config/fbConfig';
import rootReducer from './reducers/rootReducer';

const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
        reduxFirestore(fbConfig, {
            useFirestoreForProfile: true,
            userProfile: 'users',
            attachAuthIsReady: true
        })
    )
);

export const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
    userProfile: 'users', // where profiles are stored in database
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions'
};
