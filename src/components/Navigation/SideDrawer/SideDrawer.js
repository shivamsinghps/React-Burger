import React,{Fragment} from 'react'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (props)=> {
  let sidemotion = [classes.SideDrawer,classes.Close]
  if(props.show)
  {
    sidemotion = [classes.SideDrawer,classes.Open]
  }
  return (
    <Fragment>
    <Backdrop show={props.show} modalclosed={props.closed} />
    <div className={sidemotion.join(' ')} onClick={props.closed}>
    <div className={classes.Logo}><Logo /></div>
    <nav>
      <NavigationItems isAuthenticated={props.Auth}/>
    </nav>
    </div>
    </Fragment>
  )
}

export default sideDrawer
