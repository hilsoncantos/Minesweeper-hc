import React from 'react';
import ImgFlag from '../../assets/images/icons8-flag-filled-48.png';
import ImgChek from '../../assets/images/icons8-check-box-with-check-48.png';

import classes from './Toolbar.module.css';

const Toolbar = (props) => (
  <div className={classes.Toolbar}>
    <div><p>Let's play Minesweeper!</p></div>
    <div className={classes.Display}>
      <div className={classes.FlagStatus}>
        <img className={classes.Image} src={ImgFlag} alt="flag"/>
        <p>{props.flagCount}</p>
      </div>
      <div>        
        <button className={classes.Buttons} onClick={props.toggle}
                style={{ backgroundColor: props.isActive ? 'buttonface' : 'salmon' }}>
            {props.isActive ? 'Pause' : props.gameCompleted? 'Start Game' : 'Continue'}
          </button>
      </div>
      <div className={classes.Timer}>{props.children}s</div>
      <div>
        <button className={classes.Buttons} onClick={props.reStartClicked}>Restart</button>
      </div>
      <div className={classes.ClearedStatus}>
        <img className={classes.Image} src={ImgChek} alt="check"/>
        <p>{props.clearedCount}</p>
      </div>
    </div>   
  </div>
)

export default Toolbar;