import React, { useRef } from 'react';
import Cover from '../../components/Tiles/Cover/Cover';
import Bottom from '../../components/Tiles/Bottom/Bottom';
import ClickMenu from '../../shared/ClickMenu';
import ImgFlag from '../../assets/images/icons8-flag-filled-48.png';
import ImgBomb from '../../assets/images/icons8-bomb-48.png';

import classes from './GameTile.module.css';

const GameTile = (props) => {

  const outerRef = useRef(null);

  const coverChild = (props.coverShow && props.flagged) ?
    <img className={classes.Image} src={ImgFlag} alt="flag"/> :
    <div className={classes.InitialDiv}/>;
  
  const bottomChild = props.hasbomb ? 
    <img className={classes.Image} src={ImgBomb} alt="bomb"/> :
    props.adjacent ?
    <div className={classes.InitialDiv}>{props.adjacent}</div> :
    <div className={classes.InitialDiv}/>;


  return (
    <div  className={classes.GameTile}
    style={{ pointerEvents: props.isActive ? 'auto' : 'none' }}
    >
      <ClickMenu 
        id={props.id}
        flagStatus={props.flagged}
        flagClicked={props.flagClicked}
        isOpened={!props.coverShow}
        outerRef={outerRef} />
      <div ref={outerRef} className={classes.Container}>
        <Cover 
          id={props.id}
          show={props.coverShow} 
          clicked={props.clicked}
          shade={props.shade}>
            {coverChild}
        </Cover>
        <Bottom
          id={props.id}
          adjacent={props.adjacent}
          shade={props.shade}>
            {bottomChild}
          </Bottom>
      </div>
    </div>
  )
}

export default GameTile;
