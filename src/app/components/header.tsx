'use client'

import { useState } from 'react';
import styles from '../components/styles/header.module.css'
import Image from 'next/image';
import logo from './assets/ice.png'
import Link from 'next/link';


const Header = () => {
    
    const [menu, setMenu] = useState<Boolean>(false);

    return (
        <>
            <header className="select-none w-full bg-gray-200 tracking-wide top-0 fixed z-20">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between h-auto ">
                    <h1 className='px-4 w-full lg:w-auto flex justify-between items-center py-1 z-10'>
                        <a href="/" className='flex items-center gap-4 font-medium '>
                            <Image src={logo} alt='logo' className='w-10'/>
                            Ministerio de Alabanza
                        </a>
                        <div 
                            className={`p-3 lg:hidden rounded-full lg:cursor-pointer ${menu ? 'bg-gray-300' : ''}`}
                            onClick={() => setMenu(!menu)}
                        >
                            {!menu
                                ? (
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                                : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>

                                )
                            }
                        </div>

                    </h1>
                    <ul className={`${styles.menuDesplegable} ${menu ? styles.active : ''}  bg-gray-200`}>
                        <Link href="/songs">
                            <li className="p-4 hover:bg-gray-300 cursor-pointer">
                            Canciones
                            </li>    
                        </Link>
                        
                        {/* <li className="p-4 hover:bg-gray-300  cursor-pointer">
                            <Link href="/lyrics">Letras</Link>
                        </li> */}
                        <Link href='/add-song'>
                            <li className="p-4 hover:bg-gray-300 cursor-pointer">
                            Añadir canciones
                            </li>
                        </Link>
                    </ul>
                </div>
            </header>
            {/* Para cerrar menu */}
            <div 
                className={`${styles.backMenu} ${menu ? 'block' : 'hidden'}`}
                onClick={() => setMenu(!menu)}
            ></div>
        </>
    )
}



export default Header;