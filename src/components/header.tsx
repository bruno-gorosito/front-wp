


const Header = () => {
    return (
        <>
            <header className="bg-blue-500/90">
                <div className="container mx-auto flex items-center justify-between text-white">
                    <h1><a href="/">My Blog</a></h1>
                        <ul className="flex cursor-pointer">
                            <li className="p-4 hover:bg-red-400">
                                Canciones
                            </li>
                            <li className="p-4 hover:bg-red-400">
                                Letras
                            </li>
                            <li className="p-4 hover:bg-red-400">
                                Añadir canciones
                            </li>
                        </ul>

                </div>
            </header>
        </>
    )
}



export default Header;