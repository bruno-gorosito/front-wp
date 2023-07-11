import { Reducer } from "react";
import { ActionsReducer, StateReducer } from "../types/Song";


export const SongReducer: Reducer<StateReducer, ActionsReducer> = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
}