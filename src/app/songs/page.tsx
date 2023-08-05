'use client'

import { useContext, useEffect } from "react";
import { SongContext } from "../context/songs/songContext";
import { axiosClient } from "@/config/axios";
import Link from "next/link";


const Page = () => {

    const context = useContext(SongContext);
    
    

    const obtenerSongs = async() => {
        const res = await context?.getSongs();
        console.log(context?.songs)
    }

    const downloadFile = (idFile: String) => {
        console.log(idFile)
        const res = context?.downloadChords(idFile)
    }


    useEffect(() => {
        
        obtenerSongs();
        context?.socket.on('loadNewSong', (data: any) => {
            obtenerSongs();
        })
    }, [context?.socket])

    return(
        <>
            <h2 className="text-2xl text-center mt-20 mb-6">Canciones</h2>
            <div className="max-w-7xl mx-auto overflow-x-scroll md:overflow-auto">
                {context?.songs.length !== 0
                    ? (
                        <table className="min-w-full text-left text-sm font-light overflow-scroll">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                <th scope="col" className="px-6 py-4">Nombre</th>
                                <th scope="col" className="px-6 py-4">Autor</th>
                                <th scope="col" className="px-6 py-4">Tono</th>
                                <th scope="col" className="px-6 py-4">Intensidad</th>
                                <th scope="col" className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {context?.songs.map(song => (
                                        <tr className="border-b dark:border-neutral-500" key={`${song._id}`}>
                                            <Link href={`./songs/${song._id}`}>
                                                <td className="capitalize whitespace-nowrap px-6 py-4 font-medium">{song.name}</td>
                                            
                                            </Link>
                                            <td className="capitalize whitespace-nowrap px-6 py-4 font-medium">{song.author}</td>
                                            <td className="normal-case whitespace-nowrap px-6 py-4 font-medium">{song.tone}</td>
                                            <td className="capitalize whitespace-nowrap px-6 py-4 font-medium">{song.intensity}</td>
                                            <td className="capitalize whitespace-nowrap  font-medium">
                                                <Link
                                                    href={`./songs/edit/${song._id}`}
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    className="bg-green-400 p-2 mx-2 rounded"
                                                    onClick={() => downloadFile(song.chords)}
                                                >
                                                    Acordes
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                    : <p>No hay canciones disponibles</p>
                }
            </div>
        </>
    )
}



export default Page;




