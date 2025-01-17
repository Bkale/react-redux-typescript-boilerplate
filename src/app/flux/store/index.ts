import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'app/middleware';
import { RootState, rootReducer } from 'app/flux/reducers';

export function configureStore(initialState?: RootState): Store<RootState> {
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, initialState as any, middleware) as Store<
    RootState
  >;

  if (module.hot) {
    module.hot.accept('app/flux/reducers', () => {
      const nextReducer = require('app/flux/reducers');
      store.replaceReducer(nextReducer);
    });
    
  }

  return store;
}
