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
  const maxNum = maxRow * maxCol;
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
      if ((maxNum - tilesWithBomb.length - tilesOpened.length) === 0 ) {
        setIsActive(!isActive);
        setGameWon(true);
        setModalIsShown(true);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, maxNum, tilesWithBomb.length, tilesOpened.length]);

  const bombClicked = () => {
    setIsActive(!isActive);
    setGameCompleted(true);
    setGameWon(false);
    tilesWithBomb.map((tile) => onTileOpened(tile));
    setModalIsShown(true);
  }

  const clickedHandler = (tileId) => {
    if ((tilesWithFlag.indexOf(tileId) > -1)) {
      return;
    } else if ((tilesWithBomb.indexOf(tileId) > -1)) {
      bombClicked();
    } else if ((tilesOpened.indexOf(tileId) === -1)) {
      onTileOpened(tileId);
      openAround(tileId);
    }
  };

  const top_lft = (tileId) => (tileId - maxRow - 1);    // top-left
  const top_ctr = (tileId) => (tileId - maxRow);        // top
  const top_rht = (tileId) => (tileId - maxRow + 1);    // top-right
  const ctr_rht = (tileId) => (tileId + 1);             // right
  const btm_rht = (tileId) => (tileId + maxRow + 1);    // bottom-right
  const btm_ctr = (tileId) => (tileId + maxRow);        // bottom
  const btm_lft = (tileId) => (tileId + maxRow - 1);    // bottom-left
  const ctr_lft = (tileId) => (tileId - 1);             // left

  const openAround = (tileId) => {
    if ((tileId % maxRow) === 0 ) {               // right edge tile
      if ( ((top_lft(tileId) > 0) && (top_lft(tileId) <= maxNum)) && (tilesWithBomb.indexOf(top_lft(tileId)) === -1) && (tilesWithFlag.indexOf(top_lft(tileId)) === -1)  && (tilesOpened.indexOf(top_lft(tileId)) === -1) ) { onTileOpened(top_lft(tileId)) }  // top-left
      if ( ((top_ctr(tileId) > 0) && (top_ctr(tileId) <= maxNum)) && (tilesWithBomb.indexOf(top_ctr(tileId)) === -1) && (tilesWithFlag.indexOf(top_ctr(tileId)) === -1) && (tilesOpened.indexOf(top_ctr(tileId)) === -1) ) { onTileOpened(top_ctr(tileId)) } // top
      if ( ((btm_ctr(tileId) > 0) && (btm_ctr(tileId) <= maxNum)) && (tilesWithBomb.indexOf(btm_ctr(tileId)) === -1) && (tilesWithFlag.indexOf(btm_ctr(tileId)) === -1) && (tilesOpened.indexOf(btm_ctr(tileId)) === -1) ) { onTileOpened(btm_ctr(tileId)) } // bottom
      if ( ((btm_lft(tileId) > 0) && (btm_lft(tileId) <= maxNum)) && (tilesWithBomb.indexOf(btm_lft(tileId)) === -1) && (tilesWithFlag.indexOf(btm_lft(tileId)) === -1) && (tilesOpened.indexOf(btm_lft(tileId)) === -1) ) { onTileOpened(btm_lft(tileId)) } // bottom-left
      if ( ((ctr_lft(tileId) > 0) && (ctr_lft(tileId) <= maxNum)) && (tilesWithBomb.indexOf(ctr_lft(tileId)) === -1) && (tilesWithFlag.indexOf(ctr_lft(tileId)) === -1) && (tilesOpened.indexOf(ctr_lft(tileId)) === -1) ) { onTileOpened(ctr_lft(tileId)) } // left
    } else if (((tileId - 1) % maxRow) === 0) {   // left edge tile   
      if ( ((top_ctr(tileId) > 0) && (top_ctr(tileId) <= maxNum)) && (tilesWithBomb.indexOf(top_ctr(tileId)) === -1) && (tilesWithFlag.indexOf(top_ctr(tileId)) === -1) && (tilesOpened.indexOf(top_ctr(tileId)) === -1) ) { onTileOpened(top_ctr(tileId)) } // top
      if ( ((top_rht(tileId) > 0) && (top_rht(tileId) <= maxNum)) && (tilesWithBomb.indexOf(top_rht(tileId)) === -1) && (tilesWithFlag.indexOf(top_rht(tileId)) === -1) && (tilesOpened.indexOf(top_rht(tileId)) === -1) ) { onTileOpened(top_rht(tileId)) } // top-right
      if ( ((ctr_rht(tileId) > 0) && (ctr_rht(tileId) <= maxNum)) && (tilesWithBomb.indexOf(ctr_rht(tileId)) === -1) && (tilesWithFlag.indexOf(ctr_rht(tileId)) === -1) && (tilesOpened.indexOf(ctr_rht(tileId)) === -1) ) { onTileOpened(ctr_rht(tileId)) } // right
      if ( ((btm_rht(tileId) > 0) && (btm_rht(tileId) <= maxNum)) && (tilesWithBomb.indexOf(btm_rht(tileId)) === -1) && (tilesWithFlag.indexOf(btm_rht(tileId)) === -1) && (tilesOpened.indexOf(btm_rht(tileId)) === -1) ) { onTileOpened(btm_rht(tileId)) } // bottom-right
      if ( ((btm_ctr(tileId) > 0) && (btm_ctr(tileId) <= maxNum)) && (tilesWithBomb.indexOf(btm_ctr(tileId)) === -1) && (tilesWithFlag.indexOf(btm_ctr(tileId)) === -1) && (tilesOpened.indexOf(btm_ctr(tileId)) === -1) ) { onTileOpened(btm_ctr(tileId)) } // bottom
    } else {
      if ( ((top_lft(tileId) > 0) && (top_lft(tileId) <= maxNum)) && (tilesWithBomb.indexOf(top_lft(tileId)) === -1) && (tilesWithFlag.indexOf(top_lft(tileId)) === -1)  && (tilesOpened.indexOf(top_lft(tileId)) === -1) ) { onTileOpened(top_lft(tileId)) }  // top-left
      if ( ((top_ctr(tileId) > 0) && (top_ctr(tileId) <= maxNum)) && (tilesWithBomb.indexOf(top_ctr(tileId)) === -1) && (tilesWithFlag.indexOf(top_ctr(tileId)) === -1) && (tilesOpened.indexOf(top_ctr(tileId)) === -1) ) { onTileOpened(top_ctr(tileId)) } // top
      if ( ((top_rht(tileId) > 0) && (top_rht(tileId) <= maxNum)) && (tilesWithBomb.indexOf(top_rht(tileId)) === -1) && (tilesWithFlag.indexOf(top_rht(tileId)) === -1) && (tilesOpened.indexOf(top_rht(tileId)) === -1) ) { onTileOpened(top_rht(tileId)) } // top-right
      if ( ((ctr_rht(tileId) > 0) && (ctr_rht(tileId) <= maxNum)) && (tilesWithBomb.indexOf(ctr_rht(tileId)) === -1) && (tilesWithFlag.indexOf(ctr_rht(tileId)) === -1) && (tilesOpened.indexOf(ctr_rht(tileId)) === -1) ) { onTileOpened(ctr_rht(tileId)) } // right
      if ( ((btm_rht(tileId) > 0) && (btm_rht(tileId) <= maxNum)) && (tilesWithBomb.indexOf(btm_rht(tileId)) === -1) && (tilesWithFlag.indexOf(btm_rht(tileId)) === -1) && (tilesOpened.indexOf(btm_rht(tileId)) === -1) ) { onTileOpened(btm_rht(tileId)) } // bottom-right
      if ( ((btm_ctr(tileId) > 0) && (btm_ctr(tileId) <= maxNum)) && (tilesWithBomb.indexOf(btm_ctr(tileId)) === -1) && (tilesWithFlag.indexOf(btm_ctr(tileId)) === -1) && (tilesOpened.indexOf(btm_ctr(tileId)) === -1) ) { onTileOpened(btm_ctr(tileId)) } // bottom
      if ( ((btm_lft(tileId) > 0) && (btm_lft(tileId) <= maxNum)) && (tilesWithBomb.indexOf(btm_lft(tileId)) === -1) && (tilesWithFlag.indexOf(btm_lft(tileId)) === -1) && (tilesOpened.indexOf(btm_lft(tileId)) === -1) ) { onTileOpened(btm_lft(tileId)) } // bottom-left
      if ( ((ctr_lft(tileId) > 0) && (ctr_lft(tileId) <= maxNum)) && (tilesWithBomb.indexOf(ctr_lft(tileId)) === -1) && (tilesWithFlag.indexOf(ctr_lft(tileId)) === -1) && (tilesOpened.indexOf(ctr_lft(tileId)) === -1) ) { onTileOpened(ctr_lft(tileId)) } // left
    }
  }

  const flagClickedHandler = (tileId) => {
    if  ((tilesOpened.indexOf(tileId) === -1) && 
        (tilesWithFlag.indexOf(tileId) === -1)) {
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

  const hideBombs = () => {
    const randNos = [];
    const minNum = 1;
    while (randNos.length < bombsCount) {
      let randNo = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
      if (randNos.indexOf(randNo) === -1 ) {
        randNos.push(randNo);
        onHideBomb(randNo);
      }
    }
  }

  const adjValCount = (tileId) => {
    let count = 0;
    if ((tileId % maxRow) === 0 ) {               // right edge tile
      if ( (top_lft(tileId) > 0) &&  (tilesWithBomb.indexOf(top_lft(tileId)) > -1) ) { count++; } // top-left
      if ( (top_ctr(tileId) > 0) &&  (tilesWithBomb.indexOf(top_ctr(tileId)) > -1) ) { count++; } // top
      if ( (btm_ctr(tileId) > 0) &&  (tilesWithBomb.indexOf(btm_ctr(tileId)) > -1) ) { count++; } // bottom
      if ( (btm_lft(tileId) > 0) &&  (tilesWithBomb.indexOf(btm_lft(tileId)) > -1) ) { count++; } // bottom-left
      if ( (ctr_lft(tileId) > 0) &&  (tilesWithBomb.indexOf(ctr_lft(tileId)) > -1) ) { count++; } // left
    } else if (((tileId - 1) % maxRow) === 0) {   // left edge tile
      if ( (top_ctr(tileId) > 0) &&  (tilesWithBomb.indexOf(top_ctr(tileId)) > -1) ) { count++; } // top
      if ( (top_rht(tileId) > 0) &&  (tilesWithBomb.indexOf(top_rht(tileId)) > -1) ) { count++; } // top-right
      if ( (ctr_rht(tileId) > 0) &&  (tilesWithBomb.indexOf(ctr_rht(tileId)) > -1) ) { count++; } // right
      if ( (btm_rht(tileId) > 0) &&  (tilesWithBomb.indexOf(btm_rht(tileId)) > -1) ) { count++; } // bottom-right
      if ( (btm_ctr(tileId) > 0) &&  (tilesWithBomb.indexOf(btm_ctr(tileId)) > -1) ) { count++; } // bottom
    } else {
      if ( (top_lft(tileId) > 0) &&  (tilesWithBomb.indexOf(top_lft(tileId)) > -1) ) { count++; } // top-left
      if ( (top_ctr(tileId) > 0) &&  (tilesWithBomb.indexOf(top_ctr(tileId)) > -1) ) { count++; } // top
      if ( (top_rht(tileId) > 0) &&  (tilesWithBomb.indexOf(top_rht(tileId)) > -1) ) { count++; } // top-right
      if ( (ctr_rht(tileId) > 0) &&  (tilesWithBomb.indexOf(ctr_rht(tileId)) > -1) ) { count++; } // right
      if ( (btm_rht(tileId) > 0) &&  (tilesWithBomb.indexOf(btm_rht(tileId)) > -1) ) { count++; } // bottom-right
      if ( (btm_ctr(tileId) > 0) &&  (tilesWithBomb.indexOf(btm_ctr(tileId)) > -1) ) { count++; } // bottom
      if ( (btm_lft(tileId) > 0) &&  (tilesWithBomb.indexOf(btm_lft(tileId)) > -1) ) { count++; } // bottom-left
      if ( (ctr_lft(tileId) > 0) &&  (tilesWithBomb.indexOf(ctr_lft(tileId)) > -1) ) { count++; } // left
    }
    return count;
  }

  const checkered = (tileId) => {
    const row = Math.ceil(tileId / maxRow);
    const col = tileId % maxRow;
    if ((row + col) % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }

  const gameTiles = (
    <div  className={classes.Game} 
          style={{ cursor: isActive ? 'default' : 'not-allowed' }}>
      {
        [...Array(maxNum)].map( (x, i) =>
          <GameTile key={i + 1} id={i + 1} 
            hasbomb={tilesWithBomb.indexOf(i + 1) > -1 ? true : false}
            adjacent={adjValCount(i + 1)}
            flagged={tilesWithFlag.indexOf(i + 1) > -1} 
            coverShow={(tilesOpened.indexOf(i + 1) === -1)} 
            clicked={() => clickedHandler(i + 1)} 
            flagClicked={() => flagClickedHandler(i + 1)}
            isActive={isActive}
            shade={checkered(i + 1)}
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
        flagCount={gameCompleted ? null : tilesWithFlag.length}
        clearedCount={gameCompleted ? null : (maxNum - tilesWithBomb.length - tilesOpened.length)}
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
