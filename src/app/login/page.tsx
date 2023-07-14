'use client'
import { axiosClient } from "@/config/axios";
import { cookies } from "next/dist/client/components/headers";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

interface UserLogin{
    email: String;
    password: String;
}

const Page = () => {

    const [user, setUser] = useState<UserLogin>({
        email:"",
        password:""
    })

    const router = useRouter()

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const login = async(e: FormEvent) => {
        e.preventDefault();
        console.log(user)
        try {
            const res = await axiosClient.post('/users/login', user); 
            Swal.fire({
                icon: 'success',
                title: 'Inicio correcto',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#06B6D4'
            })
            document.cookie = `x-access-token=${res.data}`
            router.back()
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Datos incorrectos',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#06B6D4'
            })
            setUser({
                email: '',
                password: ''
            })
        }

    }

    return (
        <>
            <div className="w-full max-w-lg mx-auto">
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
                            type="email"
                            name="email"
                            value={`${user.email}`}
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
        </>
    )
}


export default Page;