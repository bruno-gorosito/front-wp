'use client'
import { Song } from "@/app/types/Song";
import { axiosClient } from "@/config/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




const Page = ({params}: {params: {id: String}}) => {

    const [song, setSong] = useState<Song | null>(null);
    const router = useRouter();

    const loadSong = async() => {
        const res = await getData(params.id);
        res === undefined ? router.push('/') : null;
        setSong(res);
    }


    useEffect(() => {
        loadSong();
    }, [])
    
    
    return(
        <>
            <div className="w-full max-w-7xl mx-auto px-4 mb-8">
                <div className="flex flex-wrap py-4">
                    <div className=" w-full md:w-1/2 tracking-wide mb-4">
                        <h2 className="my-4 text-3xl">{song?.name}</h2>
                        <h3>Autor: &nbsp;&nbsp;{song?.author !== "Sin definir" ? song?.author : null}</h3>
                        <h3>Intensidad: &nbsp;&nbsp;{song?.intensity}</h3>
                        <h3>Tono: &nbsp;&nbsp;{song?.tone}</h3>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-end">
                        <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${song?.idVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </div>
                
                <div

                >
                    <h2 className="text-2xl border-b py-2 mb-4">
                        Letra: 
                    </h2>
                    <p className="whitespace-pre-line">
                        {song?.lyric}
                    </p>
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


