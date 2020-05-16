export const FLAG_TILE = 'FLAG_TILE';
export const UNFLAG_TILE = 'UNFLAG_TILE';
export const OPEN_TILE = 'OPEN_TILE';

export const HIDE_BOMB = 'HIDE_BOMB';
export const GAME_RESTART = 'GAME_RESTART';

export const flagTile = (tileId) => {
  return {
    type: FLAG_TILE,
    tileNumber: tileId
  }
}

export const unFlagTile = (tileId) => {
  return {
    type: UNFLAG_TILE,
    tileNumber: tileId
  }
}

export const openTile = (tileId) => {
  return {
    type: OPEN_TILE,
    tileNumber: tileId
  }
}

export const hideBomb = (tileId) => {
  return {
    type: HIDE_BOMB,
    tileNumber: tileId
  }
}

export const gameRestart = () => {
  return {
    type: GAME_RESTART
  }
}