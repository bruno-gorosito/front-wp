'use client'
import { ChangeEvent, FormEvent, useState } from "react";

interface UserLogin{
    username: String;
    password: String;
}

const Page = () => {

    const [user, setUser] = useState<UserLogin>({
        username:"",
        password:""
    })

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const login = (e: FormEvent) => {
        e.preventDefault();

    }

    return (
        <>
            <div className="w-full max-w-5xl mx-auto">
                <div className="">
                    <form
                        onSubmit={e => login(e)}
                        className="flex flex-wrap gap-y-4 px-4"
                    >
                        <h2 className="text-3xl text-center w-full my-6">
                            Iniciar sesión
                        </h2>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full my-2">Usuario: </label>
                            <input 
                                type="text"
                                name="username"
                                value={`${user.username}`}
                                onChange={e => handleState(e)}
                                className=" w-full border border-black/30 rounded px-4 py-1 block outline-1"
                            />
                        </div>
                        <div className="w-full border-transparent border-r-8 flex flex-wrap justify-center items-center">
                            <label className="w-full my-2">Contraseña: </label>
                            <input 
                                type="password"
                                name="password"
                                value={`${user.password}`}
                                onChange={e => handleState(e)}
                                className=" w-full border border-black/30 rounded px-4 py-1 block outline-1"
                            />
                        </div>
                        
                        
                        
                        <button
                            className="w-full py-2 bg-cyan-500 rounded my-4 text-white"
                        >Ingresar</button>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Page;