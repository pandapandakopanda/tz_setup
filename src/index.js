import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import store from './core/store'

const container = document.createElement('div')
container.id = 'root'
document.body.appendChild(container)

ReactDOM.render(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>, 
  container
)