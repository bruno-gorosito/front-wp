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
            <div>
                <h2>{song?.name}</h2>
                <h2>{song?.intensity}</h2>
                <h2>{song?.tone}</h2>
                <p className="whitespace-pre-line">{song?.lyric}</p>
            </div>

            <iframe className="w-full max-w-lg aspect-video" src={`https://www.youtube.com/embed/${song?.idVideo}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  picture-in-picture; web-share" allowFullScreen></iframe>
        </>
    )
}


export default Page;


async function getData(id: String){
    const res = await axiosClient.get(`/songs/${id}`);
    return res.data;
}


