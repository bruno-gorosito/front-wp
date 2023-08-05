'use client'

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { io } from "socket.io-client";
import { SongContext } from "../context/songs/songContext";
import { Song } from "../types/Song";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/config/axios";


const Page = () => {

    const context = useContext(SongContext);
    const router = useRouter();

    const grado = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];
    const menOMay = ["Mayor", "Menor"];
    const intensities = ["Lenta", "Intermedia", "Rapida"];
    const [file, setFile] = useState<any>(null);
    const [newSong, setNewSong] = useState<Song>({
        name:"",
        author:"",
        tone: "",
        scale: "",
        lyric: "",
        intensity: ""
    })

    const handleState = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
        setNewSong({
            ...newSong,
            [e.target.name] : e.target.value
        })
    }


    const submitNewSong = async(e: any) => {
        e.preventDefault();
        const {name, author, tone, scale, lyric, intensity} = newSong
        const fileInput = e.target.elements.file;
        const file = fileInput.files[0];
        const fileData = new FormData();
        fileData.append('file', file); // Agrega el archivo al FormData
        try {
            const res: any = await context?.createNewSong(newSong, fileData);
            console.log(res)
            //CASO CANCION AÑADIDA
            setNewSong({
                name:"",
                author:"",
                tone: "",
                scale: "",
                lyric: "",
                intensity: ""
            })


            
            Swal.fire({
                icon: 'success',
                title: 'Cancion añadida',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#06B6D4'
            })

            context?.socket.emit('newSong', newSong)

            setTimeout(()=>router.push('/songs'), 1000)

            return
    
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#06B6D4'
            })
        }
    }


    return (
        <>
            <div className="w-full max-w-5xl mx-auto">
                <div>
                    <form
                        onSubmit={e => submitNewSong(e)}
                        className="flex flex-wrap gap-y-4 px-4"
                        encType="multipart/form-data"
                    >
                        <h2 className="text-3xl text-center w-full my-6">
                            Agregar una canción
                        </h2>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Nombre: </label>
                            <input 
                                type="text"
                                name="name"
                                // value={`${newSong.name}`}
                                onChange={e => handleState(e)}
                                className=" w-full lg:w-5/6 border border-black/30 rounded px-4 py-1 block outline-1"
                            />
                        </div>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Autor: </label>
                            <input 
                                type="text"
                                name="author"
                                value={`${newSong.author}`}
                                onChange={e => handleState(e)}
                                className=" w-full capitalize lg:w-5/6 border border-black/30 rounded px-4 py-1 block outline-1"
                            />
                        </div>
                        <div className="w-full lg:w-1/3 border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/2 lg:text-right lg:px-10 my-2">Tono: </label>
                            <select className="w-full lg:w-1/2 border border-black/30 rounded py-1 px-2"
                                
                                name="tone"
                                value={`${newSong.tone}`}
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
                                value={`${newSong.scale}`}
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
                                value={`${newSong.intensity}`}
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
                                value={`${newSong.lyric}`}
                                onChange={e => handleState(e)}
                            >
                            </textarea>
                        </div>
                        <div>
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Acordes: </label>
                            <input 
                                // className=" w-full normal-case lg:w-5/6 border border-black/30 rounded p-2 block outline-1 h-96"
                                name="file"
                                type="file"
                            />
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