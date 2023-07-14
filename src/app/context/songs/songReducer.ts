import { Reducer } from "react";
import { ActionsReducer, GET_SONGS, StateReducer } from "../../types/Song";


export const SongReducer: Reducer<StateReducer, ActionsReducer> = (state, action) => {
    switch(action.type) {
        case GET_SONGS:
            return {
                ...state,
                songs: action.payload
            }
        default:
            return state;
    }
}