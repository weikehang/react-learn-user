import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from './connected-react-router';
import {Route} from 'react-router-dom';
import Home from './componnets/Home';
import Counter4 from './componnets/Counter4';
import store from './store';
import history from './history';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/counter" component={Counter4}/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

