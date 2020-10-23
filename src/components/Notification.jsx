import React, {useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars() {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const notify = useSelector(state => state.app.notify);

    useEffect(() => notify !== null ? setOpen(true) : setOpen(false), [notify]);

    const handleClose = async (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notify?.theme}>
                    {notify?.text}
                </Alert>
            </Snackbar>
        </div>
    );
}
