import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Notification} from '../components';
import * as routes from '../constants/routes';
import * as pages from '../pages';
import {selectors} from '../store';
import {SET_NOTIFY} from '../store/types';
import Main from './Content';
import SideBar from './SideBar';
import style from './style.css';

const privating = true;

export const PagesList = [
    {path: routes.HOME, component: pages.Home, title: 'Главная', privating},
    {path: routes.SETTINGS, component: pages.Settings, title: 'Настройки', privating},
    {path: routes.SIGNIN, component: pages.SignIn, title: 'Вход'},
    {path: routes.SIGNUP, component: pages.SignUp, title: 'Регистрация'},
    {path: routes.STORAGE, component: pages.Storage, title: 'Хранилище', privating}
];

const App = () => {
    const notify = useSelector(selectors.notify);

    const dispatch = useDispatch();
    const resetNotify = useCallback(() => dispatch({type: SET_NOTIFY, payload: null}), []);

    return (
        <div className={style.App}>
            <BrowserRouter>
                <SideBar />
                <Main />
                <Notification {...notify} show={!!notify} setShow={resetNotify} />
            </BrowserRouter>
        </div>
    );
};

export default App;
