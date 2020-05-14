import React from 'react'
import brandLogo from '../../assets/27.1 burger-logo.png.png'
import classes from './Logo.module.css'

const logo = (props) => {
  return (
    <div className={classes.Logo}><img src={brandLogo} alt='logo' /></div>
  )
}

export default logo
