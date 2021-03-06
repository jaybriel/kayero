import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import bindStoreToMenu from './bindStoreToMenu'

import NotebookReducer from './reducers'
import Notebook from './Notebook'

require('../scss/main.scss')

const store = compose(
    applyMiddleware(thunk)
)(createStore)(NotebookReducer)

bindStoreToMenu(store)

render(
  <Provider store={store}>
    <div>
      <Notebook />
    </div>
  </Provider>,
  document.getElementById('kayero')
)
