import Title from "./Title"
import imgHTML from "../assets/techno/html.png"
import imgCSS from "../assets/techno/css.png"
import imgJavaScript from "../assets/techno/js.png"
import imgDjango from "../assets/techno/django.webp"
import imgPython from "../assets/techno/python.png"
import imgPhp from "../assets/techno/php.png"
import imgReact from "../assets/techno/react.png"
import imgTailwind from "../assets/techno/tailwind.png"
import imgGithub from "../assets/techno/github.jpg"
import logoPrint from "../assets/companies/images.jpg"
import logoUsvpa from "../assets/companies/usvpa.jpg"
import logoCnre from "../assets/companies/logo-cnre.png"


const skills = [
    { id: 1, name: "HTML", image: imgHTML },
    { id: 2, name: "CSS", image: imgCSS },
    { id: 3, name: "JavaScript", image: imgJavaScript },
    { id: 4, name: "Django", image: imgDjango },
    { id: 5, name: "Python", image: imgPython },
    { id: 6, name: "Php", image: imgPhp },
    { id: 7, name: "React", image: imgReact },
    { id: 8, name: "Tailwindcss", image: imgTailwind },
    { id: 9, name: "Github", image: imgGithub },
]

const experiences = [
    {
        id: 1,
        role: "Développeur Fullstack",
        company: "Personel Project",
        duration: "Août 2025 - Present",
        description: [
            "Développement d'une application web pour faire une ampréssion enligne.",
            "Collaboration avec l'équipe de design pour améliorer l'expérience utilisateur."
        ],
        image: logoPrint,
    },
    {
        id: 2,
        role: "Développeur Fullstack",
        company: "USVPA",
        duration: "Avril 2025 - Juillet 2025",
        description: [
            "Développement d'une application web pour la gestion des université.",
            "Mise en place d'une architecture scalable et optimisée."
        ],
        image: logoUsvpa,
    },
    {
        id: 3,
        role: "Développeur Fullstack",
        company: "CNRE",
        duration: "Avril 2024 - Juillet 2024",
        description: [
            "Développement d'une application web pour les articles de recherche et mémoire des étudiants.",
            "Mise en place d'une architecture scalable et optimisée."
        ],
        image: logoCnre,
    },
]

const Experiences = () => {
    return (
        <div id="Experience">
            <Title title="Expériences"/>
            <div className="flex flex-col-reverse md:flex-row justify-center items-center">
                <div className="flex flex-wrap gap-4 justify-center items-center md:w-1/3 mt-4 md:mt-0">
                    {
                        skills.map((skill) => (
                            <div key={skill.id} className="flex flex-col items-center justify-center">
                                <div className="w-24 h-24 p-2 rounded-full border-2 border-accent">
                                    <img src={skill.image} alt={skill.name} className="object-cover w-full h-full rounded-full" />
                                </div>
                                <span className="mt-2 text-sm">{skill.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="ml-4 flex flex-col space-y-4">
                    {experiences.map((experience) => (
                        <div key={experience.id} className="flex flex-col bg-base-200 p-5 rounded-xl shadow-lg">
                            <div className="flex items-center">
                                <img src={experience.image} alt={experience.company} className="object-cover w-10 h-10 rounded-full" />
                                <div className="ml-4">
                                    <h1 className="text-xl font-bold text-accent">
                                        {experience.role}, {experience.company}
                                    </h1>
                                    <span className="text-sm">{experience.duration}</span>
                                </div>
                            </div>
                            <ul className="list-disc ml-12 md:ml-16 mt-2">
                                {experience.description.map((desc, index) => (
                                    <li key={index}>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )

                    )}
                </div>
            </div>
        </div>
    )
}

export default Experiences