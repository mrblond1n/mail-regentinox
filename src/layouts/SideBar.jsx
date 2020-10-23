import {Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {PagesList} from '.';
import style from './style.css';
import {authSelector} from '../store/selector';
import {signOut} from '../store/actions/authActions';

export const SideBar = () => {
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const links = PagesList.filter(page => {
        if (auth) return page.privating && page;
        
        return !page.privating && page;
    });

    const handleExit = () => dispatch(signOut());

    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                {links.map(({path, title}) => (
                    <ListItem
                        button
                        key={path}
                        component={NavLink}
                        to={path}
                        className={style.link}
                        exact
                    >
                        <ListItemText primary={title} />
                    </ListItem>
                ))}
                {auth && (
                    <ListItem button>
                        <ListItemText primary="Выход" onClick={handleExit} />
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default SideBar;
