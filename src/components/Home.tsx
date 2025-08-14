import { useState, useEffect } from "react";
import { Mail, User, Phone, Github } from "lucide-react";
import img from "../assets/img3.jpg";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    // Fermer la modal automatiquement après 60 secondes quand elle s'ouvre
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 60000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center my-32 mx-10" id="Home">
            <div className="flex flex-col">
                <h1 className="text-5xl font-bold text-center md:text-left md:text-6xl md:mt-4">
                    Bonjour, <br /> je suis <span className="text-accent">HariFitia</span>
                </h1>
                <p className="text-center text-md my-4 md:text-left">
                    Je suis un développeur fullstack <br />
                    avec 3ans d'expérience, utilisant React <br />
                    et Django. Contactez-moi si vous avez besoin de mes services.
                </p>
                <button
                    onClick={toggleModal}
                    className="btn btn-accent rounded-lg text-white md:w-fit flex items-center gap-2"
                >
                    <Mail className="w-5 h-5" />
                    Contactez-moi
                </button>
            </div>
            <div className="md:ml-40">
                <img
                    src={img}
                    alt="Photo de profils"
                    className="w-96 h-96 object-cover border-8 shadow-xl border-accent"
                    style={{
                        borderRadius: "30% 70% 70% 30% / 67% 62% 38% 33%",
                    }}
                />
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-70 flex items-start justify-center bg-black bg-opacity-50 pt-20"
                    onClick={toggleModal} // fermer modal en cliquant à l'extérieur
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6"
                        onClick={(e) => e.stopPropagation()} // empêcher fermeture au clic dans la modal
                    >
                        <h2 className="text-xl font-semibold text-accent mb-4">Contactez-moi</h2>

                        <div className="flex items-center gap-3 mb-2">
                            <User className="w-6 h-6 text-accent" />
                            <span className="text-gray-700">Harilalaina Fitiavana</span>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                            <Mail className="w-6 h-6 text-accent" />
                            <span className="text-gray-700">harilalainafitiavana@gmail.com</span>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                            <Github className="w-6 h-6 text-accent" />
                            <a
                                href="https://github.com/harilalainafitiavana"
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                            >
                                github.com/harilalainafitiavana
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="w-6 h-6 text-accent" />
                            <span className="text-gray-700">+261 33 66 919 09 / +261 34 76 647 92</span>
                        </div>

                        <button
                            onClick={toggleModal}
                            className="mt-4 bg-red-500 text-white px-3 py-1 w-100 rounded hover:bg-red-600"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
