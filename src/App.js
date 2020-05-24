import React,{Fragment,useEffect} from 'react';
import Layout from './containers/Layouts/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Auth from './containers/Auth/Auth'
import Orders from './containers/Orders/Orders'
import { Route , Switch , withRouter , Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions'


function App(props) {
	useEffect(()=>{
	props.AutoAuthValidate()
	})

	let routes = (
	<Switch>
		<Route path='/auth' component={Auth} />
	    <Route path='/' exact component={BurgerBuilder} />
		<Redirect to='/' />
	</Switch>
	)

	if(props.isAuthenticated)
	{
	routes=(<Switch>
		<Route path='/checkout' component={Checkout} />
		<Route path='/orders' component={Orders} />
		<Route path='/auth' component={Auth} />
		<Route path='/logout' component={Logout} />
	    <Route path='/' exact component={BurgerBuilder} />
		<Redirect to='/' />
	</Switch>)
	}

    return (
<Fragment>
  <Layout>
	{routes}
  </Layout>
</Fragment>
)
}

const mapStateToProps = state =>{
	return{
	      isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		AutoAuthValidate:()=>dispatch(actions.checkauthstatus())
	}		
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
