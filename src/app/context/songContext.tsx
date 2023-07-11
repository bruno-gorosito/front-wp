'use client'
import { createContext, ReactNode, useReducer } from "react";
import { Song, SongContextType, StateReducer } from "../types/Song";
import { SongReducer } from "./songReducer";
import { stat } from "fs";
import { axiosClient } from "@/config/axios";

export const SongContext = createContext<SongContextType | null>(null);


const SongProvider = ({children}: {children: ReactNode}) => {
    const initialState: StateReducer = {
        songs: [],
        songSelected: null,

    }


    const [state, dispatch] = useReducer(SongReducer, initialState);

    const createNewSong = async(newSong: Song) => {
        if (newSong.scale === "menor") {
            newSong.tone = newSong.tone + "m"
        }
        const {scale,...newSongWithoutScale} = newSong;
        console.log(newSongWithoutScale)
        console.log(newSong)
        const res = await axiosClient.post('/songs', newSongWithoutScale);
        console.log(res)
    }


    return(
        <SongContext.Provider
            value={{
                songs: state.songs,
                createNewSong
            }}
        >
            {children}
        </SongContext.Provider>
    )
}


export default SongProvider;

