import * as types from '../types';

const notify = error => ({
    text: error?.message || 'Unknow error',
    theme: 'error'
});

export const createProduct = product => (
    dispatch,
    getState,
    {getFirestore}
) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    firestore
        .collection('products')
        .add({...product, authorId})
        .then(() => dispatch({type: types.ADD_PRODUCT, product}))
        .catch(error => dispatch({type: types.SET_NOTIFY, ...notify(error)}));
};

export const removeProduct = id => (dispatch, dummy, {getFirestore}) => {
    const firestore = getFirestore();

    firestore
        .collection('products')
        .doc(id)
        .delete()
        .then(() => dispatch({type: types.REMOVE_PRODUCT}))
        .catch(error => dispatch({type: types.SET_NOTIFY, ...notify(error)}));
};

export const updateProduct = (id, product) => (
    dispatch,
    dummy,
    {getFirestore}
) => {
    const firestore = getFirestore();

    dispatch({type: types.START_LOADING});
    firestore
        .collection('products')
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

export const updateProducts = products => (dispatch, dummy, {getFirestore}) => {
    if (!products) return;
    const firestore = getFirestore();

    dispatch({type: types.START_LOADING});
    const promises = [];

    products.forEach(product =>
        promises.push(
            firestore.collection('products').doc(product.id).update(product)
        )
    );

    Promise.all(promises)
        .then(() => dispatch({type: types.STOP_LOADING}))
        .catch(error => {
            dispatch({type: types.SET_NOTIFY, ...notify(error)});
            dispatch({type: types.STOP_LOADING});
        });
};

export const overwriteProducts = products => (
    dispatch,
    getState,
    {getFirestore}
) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    products.forEach(product => {
        firestore
            .collection('products')
            .add({...product, authorId})
            .then(() => dispatch({type: types.ADD_PRODUCT, product}))
            .catch(error =>
                dispatch({type: types.SET_NOTIFY, ...notify(error)})
            );
    });
};
