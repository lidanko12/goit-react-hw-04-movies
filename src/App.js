// import  { useState,useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Load from './components/Loader/Loader';
// import HomeView from './components/views/HomeView/HomeView';
// import PageNotFindView from './components/views/PageNotFindView';
// import DetailFilmView from './components/views/DetailFilmView/DetailFilmView';
// import FilmView from './components/views/FilmView';
// import MovieDetailsPage from './components/MovieDetailsPage'
// import HomePage from './components/HomePage/HomePage';
const HomeView = lazy(() => import('./components/views/HomeView' /* webpackChunkName: "home-view" */))
const DetailFilmView = lazy(() => import('./components/views/DetailFilmView/' /* webpackChunkName: "detail-page" */))
const FilmView = lazy(() => import('./components/views/FilmView' /* webpackChunkName: "home-view" */))
const PageNotFindView = lazy(() => import('./components/views/PageNotFindView' /* webpackChunkName: "Page-not-find-view" */))




export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback = {<Load/>}>
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
          <Route path='/movies/:movieId'>
          <DetailFilmView />
        </Route>
        <Route path="/movies" exact>
            <FilmView />
        </Route> 
        <Route path="/">
          <PageNotFindView />
        </Route>
        </Switch>
        </Suspense>
    </>
  );
}
