import React,{ Component , Fragment } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {
  state ={
    showSideDrawer:false
  }

  SideDrawerHandler = () =>{
    this.setState({showSideDrawer:false})
  }

  ToggleHandler = () =>{
    this.setState((prevState) =>{return{ showSideDrawer:!prevState.showSideDrawer}})
  }

  render(){
  return (
    <Fragment>
        <div className={classes.Content}>
        <Toolbar 
		toggle={this.ToggleHandler}
		isAuth={this.props.isAuthenticated}
		/>
        <SideDrawer 
		closed={this.SideDrawerHandler} 
		show={this.state.showSideDrawer}
		isAuth={this.props.isAuthenticated}
		/>
        </div>
        <main>{this.props.children}</main>
    </Fragment>
  )
}
}

const mapStateToProps = state =>{
	return{
		isAuthenticated : state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout)
