import {PRODUCTS} from '../../constants/collections';
import * as types from '../types';

const notify = error => ({
    text: error?.message || 'Unknown error',
    theme: 'error'
});

const notifyTestMode = {
    text: 'Запись не была совершена, включен тестовый режим',
    theme: 'warning'
};

export const createProduct = ({product, testMode}) => (
    dispatch,
    getState,
    {getFirestore}
) => {
    if (testMode) return dispatch({type: types.SET_NOTIFY, payload: notifyTestMode});
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    dispatch({type: types.START_LOADING});
    firestore
        .collection(PRODUCTS)
        .add({...product, authorId})
        .then(() => {
            dispatch({type: types.ADD_PRODUCT});
            dispatch({type: types.SET_NOTIFY, payload: {text: 'Добавлено!', theme: 'success'}});
            dispatch({type: types.STOP_LOADING});
        })
        .catch(error => {
            dispatch({type: types.SET_NOTIFY, ...notify(error)});
            dispatch({type: types.STOP_LOADING});
        });
};

export const removeProduct = ({id, testMode}) => (dispatch, dummy, {getFirestore}) => {
    if (testMode) return dispatch({type: types.SET_NOTIFY, payload: notifyTestMode});
    const firestore = getFirestore();

    dispatch({type: types.START_LOADING});
    firestore
        .collection(PRODUCTS)
        .doc(id)
        .delete()
        .then(() => {
            dispatch({type: types.REMOVE_PRODUCT});
            dispatch({type: types.SET_NOTIFY, payload: {text: 'Удалено!', theme: 'success'}});
            dispatch({type: types.STOP_LOADING});
        })
        .catch(error => {
            dispatch({type: types.SET_NOTIFY, ...notify(error)});
            dispatch({type: types.STOP_LOADING});
        });
};

export const updateProduct = ({id, product, testMode}) => (
    dispatch,
    dummy,
    {getFirestore}
) => {
    if (testMode) return dispatch({type: types.SET_NOTIFY, payload: notifyTestMode});
    const firestore = getFirestore();

    dispatch({type: types.START_LOADING});
    firestore
        .collection(PRODUCTS)
        .doc(id)
        .update(product)
        .then(() => {
            dispatch({type: types.EDIT_PRODUCT});
            dispatch({type: types.STOP_LOADING});
        })
        .catch(error => {
            dispatch({type: types.SET_NOTIFY, ...notify(error)});
            dispatch({type: types.STOP_LOADING});
        });
};

export const updateProducts = ({products, testMode}) => (dispatch, dummy, {getFirestore}) => {
    if (testMode) return dispatch({type: types.SET_NOTIFY, payload: notifyTestMode});
    const firestore = getFirestore();

    dispatch({type: types.START_LOADING});
    const promises = [];

    products.forEach(product =>
        promises.push(
            firestore.collection(PRODUCTS).doc(product.id).update(product)
        )
    );

    Promise.all(promises)
        .then(() => {
            dispatch({type: types.STOP_LOADING});
            dispatch({type: types.SET_NOTIFY, payload: {text: 'Таблица обновлена!', theme: 'success'}});
        })
        .catch(error => {
            dispatch({type: types.SET_NOTIFY, ...notify(error)});
            dispatch({type: types.STOP_LOADING});
        });
};

export const addProducts = ({products, testMode}) => (
    dispatch,
    getState,
    {getFirestore}
) => {
    if (testMode) return dispatch({type: types.SET_NOTIFY, payload: notifyTestMode});
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    dispatch({type: types.START_LOADING});

    const promises = [];

    products.forEach(product =>
        promises.push(
            firestore.collection(PRODUCTS).add({...product, authorId})
        )
    );

    Promise.all(promises)
        .then(() => {
            dispatch({type: types.STOP_LOADING});
            dispatch({type: types.SET_NOTIFY, payload: {text: 'Товары добавлены', theme: 'success'}});
        })
        .catch(error => {
            dispatch({type: types.SET_NOTIFY, ...notify(error)});
            dispatch({type: types.STOP_LOADING});
        });
};
