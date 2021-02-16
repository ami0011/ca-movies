import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useLocalStorage from '../../hooks/storageHook';
import MovieCard from './Card';


const data = [
    {
        id: 5,
        name: 'Movie Title',
        banner: 'https://material-ui.com/static/images/grid-list/camera.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isWatched: true,
        rating: 2
    },
    {
        id: 4,
        name: 'Movie Title',
        banner: 'https://material-ui.com/static/images/grid-list/camera.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isWatched: true,
        rating: 3
    },
    {
        id: 3,
        name: 'Movie Title',
        banner: 'https://material-ui.com/static/images/grid-list/camera.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isWatched: false,
        rating: 0
    },
    {
        id: 2,
        name: 'Movie Title',
        banner: 'https://material-ui.com/static/images/grid-list/camera.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isWatched: false,
        rating: 0
    },
    {
        id: 1,
        name: 'Movie Title',
        banner: 'https://material-ui.com/static/images/grid-list/camera.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isWatched: false,
        rating: 0
    },
]


const Movies = () => {
    const [storedMovies, setMovies] = useLocalStorage('storedMovies', data);
    const [updatedState, setUpdated] = useState(storedMovies);
    const setRatings = (rating, itemId) => {
        setMovies([]);
        updatedState.forEach((item) => {
            if (item.id === itemId) {
                item.rating = rating;
            }
        });
        setUpdated(updatedState);
    };

    useEffect(() => {
        setMovies(updatedState);
    }, [setMovies, updatedState]);

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            {updatedState?.map((item) =>
                <MovieCard
                    name={item.name} description={item.description} rating={item.rating}
                    banner={item.banner} id={item.id} isWatched={item.isWatched} key={uuid()}
                    setRating={(rating, itemId) => setRatings(rating, itemId)} />
            )}</Grid>
    );
}


export default Movies;