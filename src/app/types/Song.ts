export const GET_SONGS="GET_SONGS"
import {Socket} from 'socket.io-client';


export type Song = {
    tone?: String;
    name: String;
    lyric?: String;
    author?: String;
    _id?: String;
    scale?: String;
    intensity?: String
}


export interface SongContextType {
    songs: Array<Song>;
    socket: any;
    createNewSong: (newSong: Song) => void;
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