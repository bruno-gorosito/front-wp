
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
    createNewSong: (newSong: Song) => void;
}


export interface StateReducer  {
    songs: Array<Song>;
    songSelected: Song | null;

}

export interface ActionsReducer {
    type: String;
    payload?: any;
}