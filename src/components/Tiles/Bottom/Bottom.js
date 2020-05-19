import React from 'react';

import classes from './Bottom.module.css';

const Bottom = (props) => (
  <div 
    className={classes.Bottom}
    id={'bottomId' + props.id}
    adjacent={props.adjacent}
    style={{
      backgroundColor: props.shade ? '#c09f6398' : '#b68a3a98' 
    }}
    >
    <div>
    {props.children}
    </div>
  </div>
)
 export default Bottom;
