'use client'

import { FormEvent } from "react";



const Page = () => {

    const grado = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];
    const menOMay = ["Mayor", "Menor"];

    const cargarCancion = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('first')
    }


    return (
        <>
            <div className="w-full max-w-5xl mx-auto">
                <div>
                    <form
                        onSubmit={e => cargarCancion(e)}
                        className="flex flex-wrap gap-y-4 px-4"
                    >
                        <h2 className="text-3xl text-center w-full my-6">
                            Agregar una canción
                        </h2>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Nombre: </label>
                            <input 
                                type="text"
                                className=" w-full lg:w-5/6 border border-black/30 rounded px-4 py-1 block outline-1"
                            />
                        </div>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Autor: </label>
                            <input 
                                type="text"
                                className=" w-full lg:w-5/6 border border-black/30 rounded px-4 py-1 block outline-1"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-2/6 lg:text-right lg:px-10 my-2">Tono: </label>
                            <select className="w-full lg:w-4/6 border border-black/30 rounded py-1 px-2">
                                <option value="">No definido</option>
                                {grado.map(grado => (
                                    <option value={grado} key={grado}>{grado}</option>
                                ))  }
                            </select>
                        </div>
                        <div className="w-full lg:w-1/2 border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full lg:w-2/6  lg:text-right lg:px-10 my-2">Escala: </label>
                            <select className="w-full lg:w-4/6 border border-black/30 py-1 rounded px-2">
                                <option value="">No definido</option>
                                {menOMay.map(mayOMen => (
                                    <option value={mayOMen} key={mayOMen}>{mayOMen}</option>
                                ))  }
                            </select>
                        </div>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-start">
                            <label className="w-full lg:w-1/6 lg:text-right lg:px-10 my-2">Letra: </label>
                            <textarea 
                                className=" w-full lg:w-5/6 border border-black/30 rounded p-2 block outline-1 h-96"
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