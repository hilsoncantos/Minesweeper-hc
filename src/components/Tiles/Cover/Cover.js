import React from 'react';

import classes from './Cover.module.css';

const Cover = (props) => (
  <div
    className={classes.Cover}
    id={'coverId' + props.id}
    onClick={props.clicked}
    style={{
      opacity: props.show ? '1' : '0'      
    }}
    >
    <div>
      {props.children}
    </div>
  </div>
)

export default Cover;