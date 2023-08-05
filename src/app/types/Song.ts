export const GET_SONGS="GET_SONGS"


import {Socket} from 'socket.io-client';


export type Song = {
    tone?: String;
    name: String;
    lyric?: Array<String> | String | any;
    author?: String;
    _id?: String;
    scale?: String;
    intensity?: String;
    idVideo?: String;
    chords?: any;
}


export interface SongContextType {
    songs: Array<Song>;
    socket: any;
    createNewSong: (newSong: Song, fileData?: any) => void;
    updateSong: (newSong: Song) => void;
    downloadChords: (idFile: String) => void;
    getSongs: () => void;
}


export interface StateReducer  {
    songs: Array<Song>;
    socket: Socket;
    songSelected: Song | null;

}

export interface ActionsReducer {
    type: String;
    payload?: any;
}