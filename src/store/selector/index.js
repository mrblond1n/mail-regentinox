export const authSelector = state => firebaseSelector(state).auth.uid;
export const isAuth = state => firebaseSelector(state).auth;

export const products = state => firestoreSelector(state).ordered.products;

export const isLoading = state => appSelector(state).isLoading;

const appSelector = state => state.app;
const firebaseSelector = state => state.firebase;
const firestoreSelector = state => state.firestore;
