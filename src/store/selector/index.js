export const authSelector = state => state.firebase.auth.uid
export const isAuth = state => firebaseSelector(state).auth

const firebaseSelector = state => state.firebase;