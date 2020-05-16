import React from 'react';
import useContextMenu from '../hooks/useContextMenu';

import classes from './ClickMenu.module.css';

const ClickMenu = (props) => {
  const { xPos, yPos, menu } = useContextMenu(props.outerRef);

  if (menu) {
    return (
      <ul 
        className={classes.ClickMenu}
        style={{ top: yPos, left: xPos,
                  display: props.isOpened ? 'none' : 'block' }}>
        <li
          id={'flagId' + props.id} 
          onClick={props.flagClicked}
          >{props.flagStatus ? 'Unflag' : 'Flag' }</li>
      </ul>
    );
  }
  return <></>;
}

export default ClickMenu;

// reference:
// https://dev.to/rafi993/implementing-context-menu-using-react-hooks-34ke