import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import countReducer from '../src/store/reducers/counter'
import resultReducer from '../src/store/reducers/result'
// import reducer from './store/reducer'

// const store = createStore(reducer)

const rootReducer = combineReducers({
    ctr: countReducer,
    res: resultReducer
})

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
