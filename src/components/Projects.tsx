import Title from "./Title"

import img10 from "../assets/projects/10.png"
import img7 from "../assets/projects/7.png"
import img11 from "../assets/projects/11.png"
import img12 from "../assets/projects/12.png"
import img8 from "../assets/projects/8.png"
import img6 from "../assets/projects/6.png"
import { Github, Video } from "lucide-react"

const projects = [
    {
        id: 1,
        title: "Gestion de l'université",
        description: "Application web pour la gestion des universités, incluant la gestion des étudiants, des cours et des notes.",
        technologies: ["React", "Django", "PostgreSQL"],
        demoLink: "#",
        repoLink: "#",
        image: img10,
    },
    {
        id: 2,
        title: "Gestionnaire de tâches",
        description: "Application web pour la gestion des tâches, permettant aux utilisateurs de créer, modifier et supprimer des tâches",
        technologies: ["Django", "TailwindCss", "PostgreSQL"],
        demoLink: "#",
        repoLink: "#",
        image: img7,
    },
    {
        id: 3,
        title: "Portefolio interactif",
        description: "Portefolio interactif pour présenter mes projets et compétences.",
        technologies: ["TailwindCss", "Html"],
        demoLink: "#",
        repoLink: "#",
        image: img11,
    },
    {
        id: 4,
        title: "Bibliothèque numérique",
        description: "Application web pour la gestion d'une bibliothèque numérique, incluant la gestion des livres et des utilisateurs.",
        technologies: ["React", "Php", "MySQL"],
        demoLink: "#",
        repoLink: "#",
        image: img12
    },
    {
        id: 5,
        title: "Gestion des étudiants et professeurs",
        description: "Application web pour la gestion des étudiants,profs incluant la gestion des inscriptions et des notes.",
        technologies: ["React", "Django", "PostgreSQL"],
        demoLink: "#",
        repoLink: "#",
        image: img8,
    },
    {
        id: 6,
        title: "Analyseur de sentiment",
        description: "Application web pour l'analyse de sentiment des commentaires, permettant aux utilisateurs de soumettre des commentaires et d'obtenir une analyse de sentiment.",
        technologies: ["Django", "TailwindCss", "PostgreSQL"],
        demoLink: "#",
        repoLink: "#",
        image: img6,
    }

]

const Projects = () => {
    return (
        <div className="mt-10" id="Project">
            <Title title="Mes Projets" />
            <div className="grid md:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-base-300 p-5 h-fit rounded-xl shadow-lg">
                        <img src={project.image} alt={project.title} className="w-full rounded-xl h-56 object-cover"/>
                        <div>
                            <h1 className="my-2 font-bold">
                                {project.title}
                            </h1>
                            <p className="text-sm">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 my-3">
                            {project.technologies.map((tech) => (
                                <span className="badge badge-accent badge-sm text-white">{tech}</span>
                            )
                            )}
                        </div>
                        <div className="flex">
                            <a className="btn btn-accent text-white" href={project.demoLink}>
                                Demonstration
                                <Video className="w-6"/>
                            </a>
                            <a className="btn btn-neutral text-white w-1/3 ml-2" href={project.demoLink}>
                                <Github className="w-6"/>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects