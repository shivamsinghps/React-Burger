import React,{ Component , Fragment } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

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
        <Toolbar toggle={this.ToggleHandler}/>
        <SideDrawer closed={this.SideDrawerHandler} show={this.state.showSideDrawer}/>
        </div>
        <main>{this.props.children}</main>
    </Fragment>
  )
}
}

export default Layout
