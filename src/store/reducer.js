import * as actionTypes from './actions';

const initialState = {
  tilesWithBomb: [],
  tilesWithFlag: [],
  tilesOpened: [],
  score: null
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FLAG_TILE:
      return {
        ...state,
        tilesWithFlag: [
          ...state.tilesWithFlag,
          action.tileNumber
        ]
      };
    case actionTypes.UNFLAG_TILE:
      return {
        ...state,
        tilesWithFlag: [
          ...state.tilesWithFlag.filter(item => action.tileNumber !== item)
        ]
      };
    case actionTypes.OPEN_TILE:
      return {
        ...state,
        tilesOpened: [
          ...state.tilesOpened,
          action.tileNumber
        ]
      };
    case actionTypes.HIDE_BOMB:
      return {
        ...state,
        tilesWithBomb: [
          ...state.tilesWithBomb,
          action.tileNumber
        ]
      };
    case actionTypes.GAME_RESTART:
      return initialState;
    default:
      return state;
  }
}

export default reducer;