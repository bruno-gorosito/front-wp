'use client'
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { GET_SONGS, Song, SongContextType, StateReducer } from "../../types/Song";
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


    const obtenerCookie = () => {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('x-access-token=')) {
                return cookie.substring('x-access-token='.length);
            }
        }
        return undefined
    }


    const createNewSong = async(newSong: Song) => {
        
        newSong = splitAndCleanSong(newSong)
        
        const token = obtenerCookie();
        

        const res = await axiosClient.post('/songs', newSong, {
            headers: {
                'x-access-token': token
            }
        });
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

    const updateSong = async(newSong: Song) => {
        newSong = splitAndCleanSong(newSong)
        
        const res = await axiosClient.put(`/songs/edit/${newSong._id}`, newSong);
        console.log(res)
        return res;
    }
    
    const splitAndCleanSong = (newSong: Song) => {
        if (newSong.lyric?.length !== 0) {
            let coro;
            let partes = newSong.lyric?.split('\n\n');
            // --------- LOGICA PARA SEPARAR EN ESTROFAS Y CORO AUTOMATICAMENTE
            // for (let i = 0; i < partes.length - 1; i++) {
            //     let lines1 = partes[i].split('\n')
            //     for (let j = i + 1; j < partes.length; j++) {
            //         let lines2 = partes[j].split('\n');
            //         if (lines1[0] == lines2[0]) {
            //             coro = partes[i];
            //         }
            //     }
            // }

            // const line1Coro = coro.slice(0, 15);

            // newSong.lyric = partes.map(parte => {
            //     let line1Parte = parte.split('\n')
            //     console.log(line1Parte[0])
            //     if (line1Parte[0].includes(line1Coro)) {
            //         return ['coro', parte.trim()]
            //     } else {
            //         return ['estrofa', parte.trim()]
            //     }
            // })
            //-------------------------------------------
            newSong.lyric = partes.map((parte: String) => { //String le puso vscode para solucionar el problema.
                const line0 = parte.split('\n')[0];
                if (line0.toLowerCase().includes('pre-coro') || line0.toLowerCase().includes('precoro')) {
                    return ['pre-coro', parte.split('\n').slice(1)];
                } else
                if (line0.toLowerCase().includes('estrofa')) {
                    return ['estrofa', parte.split('\n').slice(1)];
                }
                if (line0.toLowerCase().includes('coro')) {
                    return ['coro', parte.split('\n').slice(1)];
                }
                if (line0.toLowerCase().includes('puente')) {
                    return ['puente', parte.split('\n').slice(1)];
                }
                if (line0.toLowerCase().includes('outro') || line0.toLowerCase().includes('final')) {
                    return ['outro', parte.split('\n').slice(1)];
                }
                return ['', parte]
                
                
            })
            
        }
        if (newSong.scale?.toLowerCase() === "menor" && !newSong.tone?.endsWith("m") && newSong.tone?.trim() !== "") {
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
        
        const {scale,...newSongWithoutScale} = newSong;
        return newSongWithoutScale;
    }

    




    return(
        <SongContext.Provider
            value={{
                socket: state.socket,
                songs: state.songs,
                createNewSong,
                updateSong,
                getSongs
            }}
        >
            {children}
        </SongContext.Provider>
    )
}


export default SongProvider;

