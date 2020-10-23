import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import * as routes from '../constants/routes';
import * as pages from '../pages';
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

const App = () => (
    <div className={style.App}>
        <BrowserRouter>
            <SideBar />
            <Main />
        </BrowserRouter>
    </div>
);

export default App;
