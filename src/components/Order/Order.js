import React from 'react'

import classes from './Order.module.csss'

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: aaalu (2)</p>
        <p>Price: <strong>69.69</strong></p>
    </div>
);

export default order;