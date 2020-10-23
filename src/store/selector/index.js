export const authSelector = state => state.firebase.auth.uid;
export const isAuth = state => firebaseSelector(state).auth;

export const products = state => firestoreSelector(state).ordered.products;

const firebaseSelector = state => state.firebase;
const firestoreSelector = state => state.firestore;
