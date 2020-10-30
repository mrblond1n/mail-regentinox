export const authSelector = state => firebaseSelector(state).auth.uid;
export const isAuth = state => firebaseSelector(state).auth;
export const profile = state => firestoreSelector(state).profile;

export const products = state => firestoreSelector(state).ordered.products;

export const isLoading = state => appSelector(state).isLoading;
export const notify = state => appSelector(state).notify;

const appSelector = state => state.app;
const firebaseSelector = state => state.firebase;
const firestoreSelector = state => state.firestore;
