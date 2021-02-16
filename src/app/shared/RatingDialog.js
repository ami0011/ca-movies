import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import { uniqueId } from 'lodash';
import React from 'react';
import useLocalStorage from '../../hooks/storageHook';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        justify: "center"
    },
    dialog: {
        width: 400
    },
}));

export default function RatingDialog({ isOpen, itemId, initialRating, handleClose, setRating }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(initialRating);
    const [localData, setLocalData] = useLocalStorage('storedMovies', []);


    const handleSetRating = (rating) => {
        setValue(rating);
        setRating(rating)
    }

    const handleClickSave = () => {
        const data = localStorage.getItem('storedMovies');
        const JsonData = JSON.parse(data);
        JsonData?.forEach((item) => {
            if (item.id === itemId) {
                item.rating = value;
                item.isWatched = true
            }
        });
        setLocalData(JsonData);
        handleClose();
    };

    return (
        <div>
            <Dialog className={classes.root}
                fullWidth={true}
                maxWidth={'sm'}
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Rate this Movie"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Rating name={uniqueId('name-')}
                            value={value}
                            onChange={(event, newValue) => {
                                handleSetRating(newValue);
                            }} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClickSave} color="primary" autoFocus>
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}