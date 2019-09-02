import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./redux/store/store";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL=''//;

const app =(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);


ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
