import {
	LOGIN_SUCCESS,
	SIGNOUT_SUCCESS,
	SIGNUP_SUCCESS,
	SET_NOTIFY
} from '../../constants/types'

export const signIn = ({email, password}) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase()
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => dispatch({type: LOGIN_SUCCESS}))
			.catch(error => {
				const notify = {
					text: error?.message || 'Unknow error',
					theme: 'error'
				}
				dispatch({type: SET_NOTIFY, notify})
			})
	}
}

export const signOut = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase()
		firebase
			.auth()
			.signOut()
			.then(() => dispatch({type: SIGNOUT_SUCCESS}))
			.catch(error => {
				const notify = {
					text: error?.message || 'Unknow error',
					theme: 'error'
				}
				dispatch({type: SET_NOTIFY, notify})
			})
	}
}

export const signUp = newUser => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firebase = getFirebase()
		const firestore = getFirestore()

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then(response => {
				return firestore
					.collection('users')
					.doc(response.user.uid)
					.set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						initials: newUser.firstName[0] + newUser.lastName[0]
					})
			})
			.then(() => dispatch({type: SIGNUP_SUCCESS}))
			.catch(error => {
				const notify = {
					text: error?.message || 'Unknow error',
					theme: 'error'
				}
				dispatch({type: SET_NOTIFY, notify})
			})
	}
}
