import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

import Modal from '../../components/UI/Modal/Modal';
import Toolbar from '../../components/Toolbar/Toolbar';
import GameTile from '../GameTile/GameTile';
import Footer from '../../components/Footer/Footer';

import classes from './Main.module.css';

const Main = () => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const maxRow = 16;
  const maxCol = 16;
  const bombsCount = 40;
  
  const dispatch =  useDispatch();
  const tilesWithBomb = useSelector(state => { return state.tilesWithBomb; });
  const tilesWithFlag = useSelector(state => { return state.tilesWithFlag; });
  const tilesOpened = useSelector(state => { return state.tilesOpened; });
  
  const onTileFlagged = tileId => dispatch(actions.flagTile(tileId));
  const onTileOpened = tileId => dispatch(actions.openTile(tileId));
  const onUnFlagTile = tileId => dispatch(actions.unFlagTile(tileId));
  const onHideBomb = tileId => dispatch(actions.hideBomb(tileId));
  const onGameRestart = () => dispatch(actions.gameRestart());

  const toggleStart = () => {
    if (!isActive && (seconds === 0) && (tilesWithBomb.length === 0)) {
      hideBombs();
    }
    setGameCompleted(false);
    setIsActive(!isActive);
  }

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const bombClicked = (tileId) => {
    setIsActive(!isActive);
    onTileOpened(tileId);
    setModalIsShown(true);
  }

  console.log(tilesOpened);

  const clickedHandler = (tileId) => {
    if ((tilesWithFlag.indexOf(tileId) > -1)) {
      return;
    } else if ((tilesWithBomb.indexOf(tileId) > -1)) {
      bombClicked(tileId);
    } else if (((tilesOpened.length - 1) === (maxRow * maxCol - tilesWithBomb.length)) && !(tilesWithBomb.indexOf(tileId) > -1)) {
      onTileOpened(tileId);
      setGameWon(true);
    } else if (!(tilesOpened.indexOf(tileId) > -1)) {
      onTileOpened(tileId);
      openAround(tileId);
    }
  };

  const openAround = (tileId) => {
    if ((tileId % maxRow) === 0 ) {               // right edge tile
      if ( ((tileId - maxRow - 1) > 0) && !(tilesWithBomb.indexOf(tileId - maxRow - 1) > -1) && !(tilesWithFlag.indexOf(tileId - maxRow - 1) > -1)  && !(tilesOpened.indexOf(tileId - maxRow - 1) > -1) ) { onTileOpened(tileId - maxRow - 1) }         // top-left
      if ( ((tileId - maxRow) > 0) && !(tilesWithBomb.indexOf(tileId - maxRow) > -1) && !(tilesWithFlag.indexOf(tileId - maxRow) > -1) && !(tilesOpened.indexOf(tileId - maxRow) > -1) ) { onTileOpened(tileId - maxRow) }                     // top
      if ( ((tileId + maxRow) > 0) && !(tilesWithBomb.indexOf(tileId + maxRow) > -1) && !(tilesWithFlag.indexOf(tileId + maxRow) > -1) && !(tilesOpened.indexOf(tileId + maxRow) > -1) ) { onTileOpened(tileId + maxRow) }                     // bottom
      if ( ((tileId + maxRow - 1) > 0) && !(tilesWithBomb.indexOf(tileId + maxRow - 1) > -1) && !(tilesWithFlag.indexOf(tileId + maxRow - 1) > -1) && !(tilesOpened.indexOf(tileId + maxRow - 1) > -1) ) { onTileOpened(tileId + maxRow - 1) }         // bottom-left
      if ( ((tileId - 1) > 0) && !(tilesWithBomb.indexOf(tileId - 1) > -1) && !(tilesWithFlag.indexOf(tileId - 1) > -1) && !(tilesOpened.indexOf(tileId - 1) > -1) ) { onTileOpened(tileId - 1) }                                    // left
    } else if (((tileId - 1) % maxRow) === 0) {   // left edge tile   
      if ( ((tileId - maxRow) > 0) && !(tilesWithBomb.indexOf(tileId - maxRow) > -1) && !(tilesWithFlag.indexOf(tileId - maxRow) > -1) && !(tilesOpened.indexOf(tileId - maxRow) > -1) ) { onTileOpened(tileId - maxRow) }                     // top
      if ( ((tileId - maxRow + 1) > 0) && !(tilesWithBomb.indexOf(tileId - maxRow + 1) > -1) && !(tilesWithFlag.indexOf(tileId - maxRow + 1) > -1) && !(tilesOpened.indexOf(tileId - maxRow + 1) > -1) ) { onTileOpened(tileId - maxRow + 1) }         // top-right
      if ( ((tileId + 1) > 0) && !(tilesWithBomb.indexOf(tileId + 1) > -1) && !(tilesWithFlag.indexOf(tileId + 1) > -1) && !(tilesOpened.indexOf(tileId + 1) > -1) ) { onTileOpened(tileId + 1) }                                    // right
      if ( ((tileId + maxRow + 1) > 0) && !(tilesWithBomb.indexOf(tileId + maxRow + 1) > -1) && !(tilesWithFlag.indexOf(tileId + maxRow + 1) > -1) && !(tilesOpened.indexOf(tileId + maxRow + 1) > -1) ) { onTileOpened(tileId + maxRow + 1) }         // bottom-right
      if ( ((tileId + maxRow) > 0) && !(tilesWithBomb.indexOf(tileId + maxRow) > -1) && !(tilesWithFlag.indexOf(tileId + maxRow) > -1) && !(tilesOpened.indexOf(tileId + maxRow) > -1) ) { onTileOpened(tileId + maxRow) }                     // bottom
    } else {
      if ( ((tileId - maxRow - 1) > 0) && !(tilesWithBomb.indexOf(tileId - maxRow - 1) > -1) && !(tilesWithFlag.indexOf(tileId - maxRow - 1) > -1) && !(tilesOpened.indexOf(tileId - maxRow - 1) > -1) ) { onTileOpened(tileId - maxRow - 1) }         // top-left
      if ( ((tileId - maxRow) > 0) && !(tilesWithBomb.indexOf(tileId - maxRow) > -1) && !(tilesWithFlag.indexOf(tileId - maxRow) > -1) && !(tilesOpened.indexOf(tileId - maxRow) > -1) ) { onTileOpened(tileId - maxRow) }                     // top
      if ( ((tileId - maxRow + 1) > 0) && !(tilesWithBomb.indexOf(tileId - maxRow + 1) > -1) && !(tilesWithFlag.indexOf(tileId - maxRow + 1) > -1) && !(tilesOpened.indexOf(tileId - maxRow + 1) > -1) ) { onTileOpened(tileId - maxRow + 1) }         // top-right
      if ( ((tileId + 1) > 0) && !(tilesWithBomb.indexOf(tileId + 1) > -1) && !(tilesWithFlag.indexOf(tileId + 1) > -1) && !(tilesOpened.indexOf(tileId + 1) > -1) ) { onTileOpened(tileId + 1) }                                    // right
      if ( ((tileId + maxRow + 1) > 0) && !(tilesWithBomb.indexOf(tileId + maxRow + 1) > -1) && !(tilesWithFlag.indexOf(tileId + maxRow + 1) > -1) && !(tilesOpened.indexOf(tileId + maxRow + 1) > -1) ) { onTileOpened(tileId + maxRow + 1) }         // bottom-right
      if ( ((tileId + maxRow) > 0) && !(tilesWithBomb.indexOf(tileId + maxRow) > -1) && !(tilesWithFlag.indexOf(tileId + maxRow) > -1) && !(tilesOpened.indexOf(tileId + maxRow) > -1) ) { onTileOpened(tileId + maxRow) }                     // bottom
      if ( ((tileId + maxRow - 1) > 0) && !(tilesWithBomb.indexOf(tileId + maxRow - 1) > -1) && !(tilesWithFlag.indexOf(tileId + maxRow - 1) > -1) && !(tilesOpened.indexOf(tileId + maxRow - 1) > -1) ) { onTileOpened(tileId + maxRow - 1) }         // bottom-left
      if ( ((tileId - 1) > 0) && !(tilesWithBomb.indexOf(tileId - 1) > -1) && !(tilesWithFlag.indexOf(tileId - 1) > -1) && !(tilesOpened.indexOf(tileId - 1) > -1) ) { onTileOpened(tileId - 1) }                                    // left
    }         
  }

  const flagClickedHandler = (tileId) => {
    if  (!(tilesOpened.indexOf(tileId) > -1) && 
        !(tilesWithFlag.indexOf(tileId) > -1)) {
      onTileFlagged(tileId);
    } else if ((tilesWithFlag.indexOf(tileId) > -1)) {
      onUnFlagTile(tileId);
    }

  };

  const gameRestartHandler = () => {
    setModalIsShown(false);
    resetTimer();
    onGameRestart();
    setGameCompleted(true);
  }

  const genRandom = () => {
    const minNum = 1;
    const maxNum = maxRow * maxCol;
    const randNo = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    return randNo;
  }

  const hideBombs = () => {
    for (let i = 0; i < bombsCount ; i++) {
      onHideBomb(genRandom());
    }
  }

  const adjValCount = (tileId) => {
    let count = 0;
    if ((tileId % maxRow) === 0 ) {               // right edge tile
      if ( ((tileId - maxRow - 1) > 0) &&  (tilesWithBomb.indexOf(tileId - maxRow - 1) > -1) ) { count++; } // top-left
      if ( ((tileId - maxRow) > 0) &&  (tilesWithBomb.indexOf(tileId - maxRow) > -1) ) { count++; }         // top
      if ( ((tileId + maxRow) > 0) &&  (tilesWithBomb.indexOf(tileId + maxRow) > -1) ) { count++; }         // bottom
      if ( ((tileId + maxRow - 1) > 0) &&  (tilesWithBomb.indexOf(tileId + maxRow - 1) > -1) ) { count++; } // bottom-left
      if ( ((tileId - 1) > 0) &&  (tilesWithBomb.indexOf(tileId - 1) > -1) ) { count++; }                   // left
    } else if (((tileId - 1) % maxRow) === 0) {   // left edge tile
      if ( ((tileId - maxRow) > 0) &&  (tilesWithBomb.indexOf(tileId - maxRow) > -1) ) { count++; }         // top
      if ( ((tileId - maxRow + 1) > 0) &&  (tilesWithBomb.indexOf(tileId - maxRow + 1) > -1) ) { count++; } // top-right
      if ( ((tileId + 1) > 0) &&  (tilesWithBomb.indexOf(tileId + 1) > -1) ) { count++; }                   // right
      if ( ((tileId + maxRow + 1) > 0) &&  (tilesWithBomb.indexOf(tileId + maxRow + 1) > -1) ) { count++; } // bottom-right
      if ( ((tileId + maxRow) > 0) &&  (tilesWithBomb.indexOf(tileId + maxRow) > -1) ) { count++; }         // bottom
    } else {
      if ( ((tileId - maxRow) > 0) &&  (tilesWithBomb.indexOf(tileId - maxRow) > -1) ) { count++; }         // top
      if ( ((tileId - maxRow - 1) > 0) &&  (tilesWithBomb.indexOf(tileId - maxRow - 1) > -1) ) { count++; } // top-left
      if ( ((tileId - maxRow + 1) > 0) &&  (tilesWithBomb.indexOf(tileId - maxRow + 1) > -1) ) { count++; } // top-right
      if ( ((tileId - 1) > 0) &&  (tilesWithBomb.indexOf(tileId - 1) > -1) ) { count++; }                   // left
      if ( ((tileId + 1) > 0) &&  (tilesWithBomb.indexOf(tileId + 1) > -1) ) { count++; }                   // right
      if ( ((tileId + maxRow) > 0) &&  (tilesWithBomb.indexOf(tileId + maxRow) > -1) ) { count++; }         // bottom
      if ( ((tileId + maxRow - 1) > 0) &&  (tilesWithBomb.indexOf(tileId + maxRow - 1) > -1) ) { count++; } // bottom-left
      if ( ((tileId + maxRow + 1) > 0) &&  (tilesWithBomb.indexOf(tileId + maxRow + 1) > -1) ) { count++; } // bottom-right
    }
    return count;
  }

  const gameTiles = (
    <div  className={classes.Game} 
          style={{ cursor: isActive ? 'default' : 'not-allowed' }}>
      {
        [...Array(maxRow * maxCol)].map( (x, i) =>
          <GameTile key={i + 1} id={i + 1} 
            hasbomb={tilesWithBomb.indexOf(i + 1) > -1 ? true : false}
            adjacent={adjValCount(i + 1)}
            flagged={tilesWithFlag.indexOf(i + 1) > -1} 
            coverShow={!(tilesOpened.indexOf(i + 1) > -1)} 
            clicked={() => clickedHandler(i + 1)} 
            flagClicked={() => flagClickedHandler(i + 1)}
            isActive={isActive}
            /> )
      }
    </div>
  );

  let gameModal = (
    <div className={classes.GameModal}>
      <div><h1>{gameWon ? <div className={classes.BannerWin}><p>Congratulations!</p><p>You won the game!</p></div> : 'Game Over!'}</h1></div>
      <div className={classes.PlayAgain} onClick={gameRestartHandler}>Play Again!</div>
    </div>
  );

  return (
    <div className={classes.Main}>
      <Toolbar 
        gameCompleted={gameCompleted}
        reStartClicked={gameRestartHandler}
        toggle={toggleStart}
        isActive={isActive}
        flagCount={tilesWithFlag.length}
        clearedCount={tilesOpened.length}
        >
          {seconds}
        </Toolbar>
      <Modal show={modalIsShown} modalClosed={gameRestartHandler}>
        <div>{gameModal}</div>
      </Modal>
      <div>
        {gameTiles}
      </div>
      <Footer />
    </div>
  )
}

export default Main;
