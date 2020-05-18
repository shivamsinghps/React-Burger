import React,{Fragment} from 'react';
import Layout from './containers/Layouts/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import {Route,Switch} from 'react-router-dom'

function App() {
    return (
<Fragment>
  <Layout>
  <Switch>
    <Route path='/checkout' component={Checkout} />
    <Route path='/orders' component={Orders} />
    <Route path='/' exact component={BurgerBuilder} />
  </Switch>
  </Layout>
</Fragment>
)
}

export default App;
