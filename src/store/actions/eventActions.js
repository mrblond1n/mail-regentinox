import {ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT, SET_NOTIFY} from '../types'

const notify = (error) => ({
  text: error?.message || 'Unknow error',
  theme: 'error'
})

export const createProduct = product => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()
    const authorId = getState().firebase.auth.uid
    firestore
        .collection('products')
        .add({...product, authorId})
        .then(() => dispatch({type: ADD_PRODUCT, product}))
        .catch(error => dispatch({type: SET_NOTIFY, ...notify(error)}))
}

export const removeProduct = id => (dispatch, dummy, {getFirestore}) => {
    const firestore = getFirestore()
    firestore
        .collection('products')
        .doc(id)
        .delete()
        .then(() => dispatch({type: REMOVE_PRODUCT}))
        .catch(error => dispatch({type: SET_NOTIFY, ...notify(error)}))
}

export const updateProduct = (id, product) => (dispatch, dummy, {getFirestore}) => {
    const firestore = getFirestore()
    firestore
        .collection('products')
        .doc(id)
        .update(product)
        .then(() => dispatch({type: EDIT_PRODUCT}))
        .catch(error => dispatch({type: SET_NOTIFY, ...notify(error)}))
}

export const overwriteProducts = (products) => (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()
    const authorId = getState().firebase.auth.uid

    products.forEach(product => {
        firestore
        .collection('products')
        .add({...product, authorId})
        .then(() => dispatch({type: ADD_PRODUCT, product}))
        .catch(error => dispatch({type: SET_NOTIFY, ...notify(error)}))
    })   
}
