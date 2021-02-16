import { Chip, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        maxWidth: 400,
        flexGrow: 1,
    },
    media: {
        height: 140,
    },
    link: {
        textDecoration: 'none'
    },
    watch: {
        marginLeft: 'auto',
    }
}));

const MovieCard = ({ name, description, rating, banner, id, isWatched, setRating }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} key={uuid()}>
            <Link to={`/${id}`} className={classes.link}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={banner}
                        title="Movie Banner"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" color="secondary">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Rating readOnly
                        name={uniqueId('name-')}
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue, id);
                        }}
                    />
                    <Chip label={isWatched ? "Watched" : "Not Watched"} variant="outlined" className={classes.watch} />
                </Grid>

            </CardActions>
        </Card>
    );
};

MovieCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    banner: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    isWatched: PropTypes.bool.isRequired,
    setRating: PropTypes.func.isRequired
};

export default MovieCard;