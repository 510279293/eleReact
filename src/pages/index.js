import React, {Component, Fragment} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import asyncLoad from 'components/async-loade.js'
import Loading from './common-components/lazy-loading/index.js'
const Home = asyncLoad(() => import('./home/index.js'), <Loading />)
export default () => (
  <Fragment>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Fragment>
)