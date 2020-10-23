import {Button, TextField} from '@material-ui/core';
import React, {useState} from 'react';
import style from './style.css';

const index = ({fields, onSubmit}) => {
    const [data, setData] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(data);
    };

    const handleChangeInput = e => {
        setData({...data, [e.target.name]: e.target.value});
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className={style.form}>
                {fields.map(({name, type, placeholder}) => (
                    <TextField
                        key={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        onChange={handleChangeInput}
                    />
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    className={style.button}
                    type="submit"
                >
                    Отправить
                </Button>
            </form>
        </React.Fragment>
    );
};

export default index;
