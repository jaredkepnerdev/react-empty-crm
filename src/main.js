import React from 'react';
import ReactDom from 'react-dom';

import { extend as helperExtend } from './utils/helper'; 
helperExtend();

import RootApp from './App.js';

//setup router
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDom.render(
    <RootApp />,
    document.getElementById('app')
);