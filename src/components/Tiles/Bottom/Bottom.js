import React from 'react';

import classes from './Bottom.module.css';

const Bottom = (props) => (
  <div 
    className={classes.Bottom}
    id={'bottomId' + props.id}
    adjacent={props.adjacent}
    >
    <div>
    {props.children}
    </div>
  </div>
)
 export default Bottom;
