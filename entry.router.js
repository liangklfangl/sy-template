import React from  'react';
import ReactDOM from 'react-dom';
const ReactRouter = require('react-router') ;
const history = require('history');
let data  = require('./mock/data.json');
import createElement from "./lib/util/createElement";
import Router from "react-router";
//As entry file, we have to know routes meaning which component to instantiate(ReactRouter)!
const routes = require('./routes.js')(data);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;
const basename = '/';
//This function is to be used for server-side rendering. It matches a set of routes to a location,
//without rendering, and calls a callback(error, redirectLocation, renderProps) when it's done.
ReactRouter.match({ routes, location, basename }, () => {
  const router =
    <ReactRouter.Router
      history={ReactRouter.useRouterHistory(history.createHistory)({ basename })}
      //The history the router should listen to. Typically browserHistory or hashHistory.
      routes={routes}
      //alias of children
      createElement={createElement}
      //When the router is ready to render a branch of route components, it will use this function to create the elements.
    />;
  ReactDOM.render(
    router,
    document.getElementById('react-content')
  );
});
