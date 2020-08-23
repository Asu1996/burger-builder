import React from 'react';

import original from '../../assets/images/original.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} style={ {height:props.height} }>
        <img src={original} alt='Mera Burger'/>
    </div>
);

export default logo;