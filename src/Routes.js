import React from 'react';
import { Route, Switch } from 'react-router';
import Movies from './app/movie/Movies';
import MovieDetail from './app/movie/Movies-Details';

const ReactRouter = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={() => <Movies />} />
                <Route path="/:id" component={() => <MovieDetail/>} />
            </Switch>
        </>

    )
}
export default ReactRouter;