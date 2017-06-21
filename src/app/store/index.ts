
import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import * as promiseMiddleware from 'redux-promise';
import { logger } from '../middleware';
import rootReducer, { RootState } from '../reducers';

export function configureStore(initialState: any): Store<RootState> {
    const create = window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore;

    const createStoreWithMiddleware = applyMiddleware(thunk, promiseMiddleware, logger)(create);

    const store = createStoreWithMiddleware(rootReducer, initialState) as Store<RootState>;


    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
