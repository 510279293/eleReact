import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './pages/index.js';
import registerServiceWorker from './registerServiceWorker';
const requireAll = requireContext => requireContext.keys().map(requireContext)
const reqSvg = require.context('./assets/svg', true, /\.svg$/)
requireAll(reqSvg)
console.log(reqSvg)
const render = Component => (
  ReactDOM.render((
    <BrowserRouter>
       <Component />
    </BrowserRouter>
  ), document.getElementById('root'))
)

render(App)

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
