'use client'
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { GET_SONGS, Song, SongContextType, StateReducer } from "../types/Song";
import { SongReducer } from "./songReducer";
import { axiosClient } from "@/config/axios";
import {io} from 'socket.io-client'
export const SongContext = createContext<SongContextType | null>(null);


const SongProvider = ({children}: {children: ReactNode}) => {
    const initialState: StateReducer = {
        songs: [],
        songSelected: null,
        socket: io(`${process.env.NEXT_PUBLIC_BACK}`)
    }
    


    const [state, dispatch] = useReducer(SongReducer, initialState);

    const createNewSong = async(newSong: Song) => {
        if (newSong.scale === "menor" && !newSong.tone?.endsWith("m")) {
            newSong.tone = newSong.tone + "m";
        }
        if (newSong.intensity?.trim() === '') {
            delete newSong.intensity;
        }
        if (newSong.tone?.trim() === '') {
            delete newSong.tone;
        }
        if (newSong.scale?.trim() === '') {
            delete newSong.scale;
        }
        if (newSong.lyric?.trim() === '') {
            delete newSong.lyric;
        }
        const {scale,...newSongWithoutScale} = newSong;
        console.log(newSongWithoutScale)
        // console.log(newSong)
        const res = await axiosClient.post('/songs', newSongWithoutScale);
        return res;
    }

    const getSongs = async() => {
        const res = await axiosClient.get('/songs');
        dispatch({
            type: GET_SONGS,
            payload: res.data
        })
        console.log(res)
    }
    





    return(
        <SongContext.Provider
            value={{
                socket: state.socket,
                songs: state.songs,
                createNewSong,
                getSongs
            }}
        >
            {children}
        </SongContext.Provider>
    )
}


export default SongProvider;

