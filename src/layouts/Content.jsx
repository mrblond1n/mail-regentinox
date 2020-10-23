import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {PagesList} from '.';
import {PrivateRoute} from '../utils/guard';
import style from './style.css';

export default function Main() {
    return (
        <main className={style.main}>
            <Switch>
                {PagesList.map(({privating, path, component}) =>
                    privating ? (
                        <PrivateRoute exact path={path} component={component} key={path} />
                    ) : (
                        <Route exact path={path} component={component} key={path} />
                    )
                )}
            </Switch>
        </main>
    );
}
