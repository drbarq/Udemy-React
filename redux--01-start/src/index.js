import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

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

const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
