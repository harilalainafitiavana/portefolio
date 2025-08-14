import { Container } from "lucide-react"

const Navbar = () => {
    return (
        <div className="flex justify-center md:justify-between items-center p-4">
            <a href="#" className="flex items-center font-bold text-2xl md:text-3xl">
                <Container className="mr-2" />
                HARI
                <span className="text-accent">FITIA</span>
            </a>
            <ul className="hidden flex md:flex items-center">
                <li>
                    <a href="#Home" className="btn btn-sm btn-ghost">Accueil</a>
                </li>
                <li>
                    <a href="#About" className="btn btn-sm btn-ghost">A propos</a>
                </li>
                <li>
                    <a href="#Experience" className="btn btn-sm btn-ghost">Mes expériences</a>
                </li>
                <li>
                    <a href="#Project" className="btn btn-sm btn-ghost">Mes projets</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar