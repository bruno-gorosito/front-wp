
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from './styles/header.module.css'
import foto1 from './assets/equipo1.jpg'
import foto2 from './assets/equipo2.jpg'
import foto3 from './assets/equipo3.jpg'
import foto4 from './assets/equipo4.jpg'

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Slide = {
    id: string;
    title: string;
    desc: string;
    img: StaticImport;
}


const Carrusel = () => {

    const slides: Slide[] = [
        {
            id: "1",
            title: 'Musical de Pascua',
            desc: "En estas pascuas nos reunimos para recordar que Él murió por nosotros... ¡y que volverá!",
            img: foto1
        },
        {
            id: "2",
            title: 'Coro (in)estable',
            desc: "En esta navidad tuvimos la participación del coro (in)estable de nuestra iglesia. ",
            img: foto2
        },
        {
            id: "3",
            title: 'Tiempo de alabanza en el nuestro Parque Furniss',
            desc: "Recordamos el tiempo de alabanza en nuestro amado Parque Furniss",
            img: foto3
        },
        {
            id: "4",
            title: 'Equipo de JX',
            desc: "Jovenes colaborando en el campamento de JX mediante canciones en el tiempo de alabanza.",
            img: foto4
        }
    ]

    return (
        <>
            <Carousel
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                swipeable={true}
                autoPlay={true}
                emulateTouch={true}
                infiniteLoop={true}
                interval={4000}
            >
                {slides.map(slide => (
                    <div
                        key={slide.id}
                    >
                        <Image src={slide.img} alt={slide.title} className={styles.carrusel}/>
                        <div className="legend hidden md:block !bg-black/60">
                            <h2 className="title">{slide.title}</h2>
                            <p>{slide.desc}</p>
                        </div>
                    </div>
                    ))}
            </Carousel>
        </>

    )
}


export default Carrusel;