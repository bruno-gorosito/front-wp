'use client'
import Image from 'next/image'
import agu from './components/assets/agu.png'
import Carrusel from './components/carousel'
import Redes from './components/redes'
export default function Home() {



  return (
    <>
      <Carrusel />
      {/* <div className='flex max-w-6xl mx-auto my-4 flex-wrap px-4'>
        
        <div className='flex w-full md:w-2/3 items-center flex-wrap lg:border-r-8 lg:border-transparent' >
          <p className='text-4xl font-normal text-center italic lg:-mb-20'>
            <span className='text-6xl mr-2 tracking-wider'>“</span>La anticipacion es la clave del éxito.<span className='text-6xl ml-2'>”</span>
          </p>
          <p className='w-full text-right mt-4 mb-10 px-4'>Agustin Suarez</p>
        </div>
        <div className='w-full md:w-1/3 flex items-center justify-center lg:border-l-8 lg:border-transparent'>
          <Image 
            src={agu}
            alt='agu'
            className='aspect-square object-cover w-2/3 md:w-full rounded-full'
          />
        </div>
      </div> */}
      {/* <Redes /> */}
    </>
  )
}
