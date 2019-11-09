import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import countReducer from '../src/store/reducers/counter'
import resultReducer from '../src/store/reducers/result'
// import reducer from './store/reducer'

// const store = createStore(reducer)

const logger = store => {
    return next => {
        return action => {
            console.log('[MIDDLEWARE] DISPATCHING', action)
            const result = next(action)
            console.log('MIDDLEWARRE next state', store.getState())
            return result
        }
    }
}

const rootReducer = combineReducers({
    ctr: countReducer,
    res: resultReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
