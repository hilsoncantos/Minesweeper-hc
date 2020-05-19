import React from 'react';

import classes from './Cover.module.css';

const Cover = (props) => (
  <div
    className={classes.Cover}
    id={'coverId' + props.id}
    onClick={props.clicked}
    style={{
      opacity: props.show ? '1' : '0',
      backgroundColor: props.shade ? '#4fdf4f' : '#20ac20' 
    }}
    >
    <div>
      {props.children}
    </div>
  </div>
)

export default Cover;