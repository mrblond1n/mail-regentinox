import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';
import React from 'react';

const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'right'
};

const PositionedSnackbar = ({
    theme = 'error',
    text = 'Unknown error',
    show,
    setShow
}) => (
    <div>
        <Snackbar
            anchorOrigin={anchorOrigin}
            autoHideDuration={4000}
            open={show}
            onClose={setShow}
        >
            <Alert onClose={setShow} severity={theme}>
                {text}
            </Alert>
        </Snackbar>
    </div>
);

export default React.memo(PositionedSnackbar);
