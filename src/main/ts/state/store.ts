import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from './reducer';
import { thunk } from './middleware';

// export default createStore(pickDirReducer, compose(applyMiddleware(logger, thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f));
export default createStore(reducer, applyMiddleware(thunk));
