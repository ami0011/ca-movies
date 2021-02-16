import { Button } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RatingDialog from '../shared/RatingDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    image: {
        width: 500,
        height: 'auto',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const MovieDetail = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [watched, setWatched] = useState(true);
    const [movie, setMovie] = useState({});
    const [open, setOpen] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);

    useEffect(() => {
        const storageData = localStorage.getItem('storedMovies');
        const [filteredData] = JSON.parse(storageData).filter((item) => item.id === Number(id));
        setTimeout(() => {
            setWatched(!!filteredData.isWatched);
            setMovie(filteredData);
            setCurrentRating(filteredData.rating);
        }, 1000);

    }, [id, movie.rating]);

    const handleOpenDialog = () => {
        setWatched(true)
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setWatched(true)
        setOpen(false);
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={movie.banner || ''} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="h3" color={"secondary"} gutterBottom>
                                    {movie.name}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    {movie.description}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Full resolution 1920x1080 • JPEG
                                </Typography>
                                <Rating name="read-only" value={currentRating} readOnly />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={handleOpenDialog}>Edit Rating</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <RatingDialog isOpen={watched ? open : true} itemId={Number(id)} initialRating={currentRating} setRating={(e) => setCurrentRating(e)}
                    handleClose={handleCloseDialog} />
            </Paper>
        </Container>
    )
}

export default MovieDetail;