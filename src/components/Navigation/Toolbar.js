import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from './NavigationItems/NavigationItems'
import Button from '../UI/Button/Button'

const toolbar = (props)=> {
  return (
    <header className={[classes.Toolbar]}>
  <div className={classes.MobileOnly}>
  <Button btnType='Menu' clicked={props.toggle}><i className="fas fa-sliders-h"></i></Button>
  </div>
    <Logo />
    <nav className={classes.DesktopOnly}>
    <NavigationItems />
    </nav>
    </header>
  )
}

export default toolbar
