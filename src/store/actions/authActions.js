import {USERS} from '../../constants/collections';
import * as types from '../types';

const notify = error => ({
    text: error?.message || 'Unknow error',
    theme: 'error'
});

export const signIn = ({email, password}) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => dispatch({type: types.LOGIN_SUCCESS}))
        .catch(error => dispatch({type: types.SET_NOTIFY, payload: notify(error)}));
};

export const signOut = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase
        .auth()
        .signOut()
        .then(() => dispatch({type: types.SIGNOUT_SUCCESS}))
        .catch(error => dispatch({type: types.SET_NOTIFY, payload: notify(error)}));
};

export const signUp = newUser => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(response =>
            firestore
                .collection(USERS)
                .doc(response.user.uid)
                .set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0] + newUser.lastName[0]
                })
        )
        .then(() => dispatch({type: SIGNUP_SUCCESS}))
        .catch(error => dispatch({type: types.SET_NOTIFY, payload: notify(error)}));
};
