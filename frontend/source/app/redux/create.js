import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from '@Redux/reducer';


const initStore = (initialState) => {
  const middlewares = [thunk];

  const logger = createLogger({
    collapsed: true,
//    diff: true,
    // predicate: (getState, action) => // false,
    //   (
    //     !/etlms\/vmouse\/SEND_DEBOUNCED_VMOUSE/.test(action.type) &&
    //     !/etlms\/timer\/SESSION_TIMER/.test(action.type)
    //   ),
  });

  if (DEBUG) {
    middlewares.push(logger);
  }

  const finalCreateStore = applyMiddleware(...middlewares)(createStore);
  const store = finalCreateStore(reducer, initialState);

  return store;
};

export default initStore;
