'use client'
import { Song } from "@/app/types/Song";
import { axiosClient } from "@/config/axios"

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { io } from "socket.io-client";
import { SongContext } from "@/app/context/songContext";
import { useRouter } from "next/navigation";



const Page = ({params}: {params: {id: String}}) => {


    const context = useContext(SongContext);
    const router = useRouter();

    const grado = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];
    const menOMay = ["Mayor", "Menor"];
    const intensities = ["Lenta", "Intermedia", "Rapida"];
    const [song, setSong] = useState<Song>({
        name:"",
        author:"",
        tone: "",
        scale: "",
        lyric: "",
        intensity: ""
    })

    const handleState = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
        setSong({
            ...song,
            [e.target.name] : e.target.value
        })
    }

    const loadSong = async() => {
        const res = await getData(params.id);
        res === undefined ? router.push('/') : null;
        if (res.tone?.endsWith('m')) {
            setSong({...res, scale: 'Menor'})
        } else {
            setSong({...res, scale: 'Mayor'})
        }
    }

    const submitNewSong= (e: FormEvent) =>{
        e.preventDefault()
    }


    useEffect(() => {
        loadSong();
    }, [context?.socket])
    
    
    return(
        <>
            <div className="w-full max-w-5xl mx-auto">
                <div>
                    <form
                        onSubmit={e => submitNewSong(e)}
                        className="flex flex-wrap gap-y-4 px-4"
                    >
                        <h2 className="text-3xl text-center w-full my-6">
                            Editar canción
                        </h2>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Nombre: </label>
                            <input 
                                type="text"
                                name="name"
                                value={`${song.name}`}
                                onChange={e => handleState(e)}
                                className=" w-full lg:w-5/6 border border-black/30 rounded px-4 py-1 block outline-1"
                            />
                        </div>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Autor: </label>
                            <input 
                                type="text"
                                name="author"
                                value={`${song.author}`}
                                onChange={e => handleState(e)}
                                className=" w-full capitalize lg:w-5/6 border border-black/30 rounded px-4 py-1 block outline-1"
                            />
                        </div>
                        <div className="w-full lg:w-1/3 border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/2 lg:text-right lg:px-10 my-2">Tono: </label>
                            <select className="w-full lg:w-1/2 border border-black/30 rounded py-1 px-2"
                                
                                name="tone"
                                value={`${song.tone}`}
                                onChange={e => handleState(e)}
                            >
                                <option value="">No definido</option>
                                {grado.map(grado => (
                                    <option value={grado} key={grado}>{grado}</option>
                                ))  }
                            </select>
                        </div>
                        <div className="w-full lg:w-1/3 border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/2  lg:text-right lg:px-10 my-2">Escala: </label>
                            <select className="w-full lg:w-1/2 border border-black/30 py-1 rounded px-2"
                                name="scale"
                                value={`${song.scale}`}
                                onChange={e => handleState(e)}
                            >
                                <option value="">No definido</option>
                                {menOMay.map(mayOMen => (
                                    <option value={mayOMen} key={mayOMen}>{mayOMen}</option>
                                ))  }
                            </select>
                        </div>
                        <div className="w-full lg:w-1/3 border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/2  lg:text-right lg:px-10 my-2">Intensidad: </label>
                            <select className="w-full lg:w-1/2 border border-black/30 py-1 rounded px-2"
                                name="intensity"
                                value={`${song.intensity}`}
                                onChange={e => handleState(e)}
                            >
                                <option value="">No definido</option>
                                {intensities.map(intensity => (
                                    <option value={intensity} key={intensity}>{intensity}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-start">
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Letra: </label>
                            <textarea 
                                className=" w-full normal-case lg:w-5/6 border border-black/30 rounded p-2 block outline-1 h-96"
                                name="lyric"
                                value={`${song.lyric}`}
                                onChange={e => handleState(e)}
                            >
                            </textarea>
                        </div>
                        <button
                            className="w-full py-2 bg-cyan-500 rounded my-4 text-white"
                        >Cargar canción</button>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Page;


async function getData(id: String){
    const res = await axiosClient.get(`/songs/${id}`);
    return res.data;
}


