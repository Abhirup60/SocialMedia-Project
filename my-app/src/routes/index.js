import React, { Component } from 'react';
import Home from '../modules/Home/Home';
import Form from '../modules/Authorization';
import { Route, Routes as Router } from 'react-router-dom';
import Createpost from '../modules/CreatePost/Createpost';
import Profile from '../modules/Profile/Profile';

const Routes = () => {
    const routes = [
        {
            id: 1,
            name: 'home',
            path: '/',
            Component: <Home />
        },
        {
            id: 2,
            name: 'sign in',
            path: '/account/signin',
            Component: <Form isSignPage={true} />
        },
        {
            id: 3,
            name: 'sign up',
            path: '/account/signup',
            Component: <Form isSignPage={false} />
        },
        {
            id:4,
            name: 'Create post',
            path: '/new-post',
            Component: <Createpost/>
        },
        {
            id:5,
            name: 'My Profile',
            path: '/profile',
            Component: <Profile/>
        }
    ];

    return (
        <Router>
            {routes.map(({ id, path, Component }) => (
                <Route key={id} path={path} element={Component} />
            ))}
        </Router>
    );
};

export default Routes;
