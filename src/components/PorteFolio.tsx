import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    Code2,
    ChevronDown,
    Github,
    Mail,
    Phone,
    Linkedin,
    ExternalLink,
    Send,
    Check,
    User,
    GraduationCap,
    Target,
    Home,
    UserCircle,
    Layers,
    Briefcase,
    MessageSquare,
    ArrowRight,
    ChevronUp,
    Database,
    Monitor,
    Server,
    Cpu,
    Terminal,
    Bot,
    Sparkles
} from 'lucide-react';
// Définir le type Project
type ProjectType = {
    title: string;
    description: string;
    technologies: string[];
    category: 'cms' | 'fullstack' | 'frontend' | 'backend';
    image: string;
    gallery?: string[]; // Optionnel avec ?
    link: string;
    github?: string; // Optionnel avec ?
    featured?: boolean; // Optionnel avec ?
};

// Définir le type pour selectedProject
type SelectedProjectType = ProjectType | null;

const Portfolio = () => {
    // État pour la navigation et les interactions
    const [activeSection, setActiveSection] = useState('accueil');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [activeSkillCategory, setActiveSkillCategory] = useState('all');
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    // Etat pour le popup
    const [showPopup, setShowPopup] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    // État pour la pagination et galerie
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedProject, setSelectedProject] = useState<SelectedProjectType>(null);
    const [showGallery, setShowGallery] = useState<boolean>(false);
    const [currentGalleryImage, setCurrentGalleryImage] = useState<number>(0);
    // Filtres des projets
    const [activeFilter, setActiveFilter] = useState('Tous');

    // Références pour observer les sections
    const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Données des projets
    const projects = [
        {
            title: 'Restaurant Sahameva',
            description: 'Site web moderne pour restaurant avec réservation en ligne',
            technologies: ['WordPress', 'Elementor'],
            category: 'cms',
            image: 'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Klub%20Sahameva.png?raw=true',
            gallery: [
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Sahameva1.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Sahameva2.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Sahameva3.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Sahameva4.png?raw=true'
            ],
            link: 'https://sahameva.com',
            github: '#',
            featured: false
        },
        {
            title: 'Printy',
            description: 'Gestion et suivi des demandes d\'impression numérique à distance',
            technologies: ['Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
            category: 'fullstack',
            image: 'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Printmg.png?raw=true',
            gallery: [
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/print1.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/print2.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/print3.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/print4.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/print5.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/print6.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/print7.png?raw=true'
            ],
            link: 'https://www.printy.mg',
            github: 'https://github.com/harilalainafitiavana/print.mg/tree/master',
            featured: false
        },
        {
            title: 'Vente des ordinateurs',
            description: 'Site de vente en ligne d\'ordinateurs et accessoires informatiques',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'frontend',
            image: 'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Venteordinateur.png?raw=true',
            gallery: [
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/vente1.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/vente2.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/vente3.png?raw=true'
            ],
            link: 'https://venteordinateur.netlify.app',
            github: 'https://github.com/harilalainafitiavana/Site_de_vente_ordinateur',
            featured: false
        },
        {
            title: 'Plateforme éducative',
            description: 'Plateforme web permettant aux étudiants de télecharger et de voir des leçons ou des exercices',
            technologies: ['Django', 'TailwindCSS', 'PostgreSQL'],
            category: 'fullstack',
            image: 'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Usvpa.png?raw=true',
            gallery: [
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/usvpa1.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/usvpa4.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/usvpa5.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/usvpa6.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/usvpa7.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/usvpa8.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/usvpa9.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/usvpa10.png?raw=true'
            ],
            link: '#',
            github: 'https://github.com/harilalainafitiavana/usvpa',
            featured: false
        },
        {
            title: 'Bibliothèque numérique',
            description: 'Plateforme web permettant aux utilisateur de CNRE de télecharger et de voir des livres et des articles de recherche scientifique',
            technologies: ['PHP', 'Bootstrap5', 'HTML', 'MySQL'],
            category: 'fullstack',
            image: 'https://github.com/harilalainafitiavana/images-portefolio/blob/main/Cnreprojet.png?raw=true',
            gallery: [
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/cnre2.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/cnre3.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/cnre4.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/cnre5.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/cnre6.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/cnre7.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/cnre8.png?raw=true'
            ],
            link: '#',
            github: 'https://github.com/harilalainafitiavana/bibliotheque-numerique',
            featured: false
        },
        {
            title: 'Gestion des rapports mensuels du ministère',
            description: 'Plateforme web permettant aux agents du ministère de télecharger et de voir des rapports mensuels de chaque département du ministère',
            technologies: ['Django', 'React', 'TailwindCSS', 'PostgreSQL'],
            category: 'fullstack',
            image: 'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister7.png?raw=true',
            gallery: [
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister1.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister2.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister3.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister4.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister5.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister6.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister8.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister9.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister10.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister11.png?raw=true',
                'https://github.com/harilalainafitiavana/images-portefolio/blob/main/minister12.png?raw=true'
            ],
            link: '#',
            github: 'https://github.com/harilalainafitiavana/Rapport_mensuel_avec_django_react',
            featured: false
        }
        // ... ajoutez d'autres projets
    ]

    // Filtrez les projets en fonction de la catégorie active
    const filteredProjects = activeFilter === 'Tous'
        ? projects
        : projects.filter(project => {
            if (activeFilter === 'Full Stack') return project.category === 'fullstack';
            if (activeFilter === 'Frontend') return project.category === 'frontend';
            if (activeFilter === 'CMS') return project.category === 'cms';
            if (activeFilter === 'Backend') return project.category === 'backend';
            return true;
        });

    // Configuration de la pagination
    const projectsPerPage = 6;
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    // Projets à afficher sur la page actuelle
    const currentProjects = filteredProjects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );

    // Catégories de technologies avec icônes
    const skillCategories = [
        { id: 'all', label: 'Tous', icon: Layers },
        { id: 'frontend', label: 'Frontend', icon: Monitor },
        { id: 'backend', label: 'Backend', icon: Server },
        { id: 'database', label: 'Base de données', icon: Database },
        { id: 'cms', label: 'CMS', icon: Cpu },
        { id: 'tools', label: 'Outils', icon: Terminal }
    ];

    // Données des compétences organisées par catégorie
    const skills = [
        // Frontend
        { name: 'HTML', category: 'frontend', color: 'from-orange-500 to-orange-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS', category: 'frontend', color: 'from-blue-500 to-blue-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', category: 'frontend', color: 'from-yellow-500 to-yellow-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Bootstrap', category: 'frontend', color: 'from-purple-500 to-purple-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind CSS', category: 'frontend', color: 'from-cyan-500 to-cyan-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'React', category: 'frontend', color: 'from-blue-400 to-cyan-500', logo: 'https://www.svgrepo.com/show/327388/logo-react.svg' },

        // Backend
        { name: 'Python', category: 'backend', color: 'from-blue-600 to-blue-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Django', category: 'backend', color: 'from-green-600 to-green-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        { name: 'Flask', category: 'backend', color: 'from-gray-700 to-gray-800', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
        { name: 'PHP', category: 'backend', color: 'from-indigo-600 to-purple-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: 'Node.js', category: 'backend', color: 'from-green-600 to-gray-900', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/960px-Node.js_logo.svg.png?20170401104355' },

        // Base de données
        { name: 'PostgreSQL', category: 'database', color: 'from-blue-700 to-blue-800', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MySQL', category: 'database', color: 'from-blue-800 to-blue-900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'SQL', category: 'database', color: 'from-red-500 to-red-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },

        // CMS
        { name: 'WordPress', category: 'cms', color: 'from-blue-900 to-gray-900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
        { name: 'Elementor', category: 'cms', color: 'from-orange-600 to-red-600', logo: 'https://cdn.simpleicons.org/elementor' },

        // Outils
        { name: 'Linux', category: 'tools', color: 'from-yellow-600 to-yellow-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        { name: 'Git', category: 'tools', color: 'from-orange-700 to-red-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', category: 'tools', color: 'from-gray-900 to-black', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    ];

    // Filtrage des compétences par catégorie
    const filteredSkills = activeSkillCategory === 'all'
        ? skills
        : skills.filter(skill => skill.category === activeSkillCategory);

    // Liens sociaux avec GitHub mis à jour
    const socialLinks = [
        { icon: Github, label: 'GitHub', href: 'https://github.com/harilalainafitiavana', color: 'hover:text-gray-900' },
        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-600' },
        { icon: Mail, label: 'Email', href: 'mailto:harilalainafitiavana@gmail.com', color: 'hover:text-red-500' },
    ];

    // Navigation items
    const navItems = [
        { id: 'accueil', label: 'Accueil', icon: Home },
        { id: 'apropos', label: 'À propos', icon: UserCircle },
        { id: 'competences', label: 'Compétences', icon: Layers },
        { id: 'projets', label: 'Projets', icon: Briefcase },
        { id: 'contact', label: 'Contact', icon: MessageSquare },
    ];

    // Fonction pour faire défiler vers le haut
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Fonction pour détecter le défilement
    useEffect(() => {
        const handleScroll = () => {
            // Afficher le bouton après 300px de défilement
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        // Nettoyer l'événement
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Observer pour détecter la section active
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        Object.values(sectionsRef.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // UseEffect pour gérer le timer et l'animation du texte partie popup
    useEffect(() => {
        // Timer pour afficher la popup après 40 secondes
        const popupTimer = setTimeout(() => {
            setShowPopup(true);
            startTypingAnimation();
        }, 30000); // 30 secondes

        return () => {
            clearTimeout(popupTimer);
        };
    }, []);

    // Fonction pour l'animation de frappe Patie Popup
    const startTypingAnimation = () => {
        setIsTyping(true);
        let index = 0;
        const text = popupMessage;

        const typingInterval = setInterval(() => {
            if (index <= text.length) {
                setDisplayedText(text.substring(0, index));
                index++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
            }
        }, 50); // Vitesse d'affichage des caractères (plus lent)
    };

    // Fonction pour fermer la popup
    const closePopup = () => {
        setShowPopup(false);
        setDisplayedText('');
    };

    // Gestionnaire de clic sur la navigation
    const handleNavClick = (id: string) => {
        setActiveSection(id);
        setIsMenuOpen(false);
        sectionsRef.current[id]?.scrollIntoView({ behavior: 'smooth' });
    };

    // Gestionnaire de soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Préparer les données
        const emailData = {
            to: 'harilalainafitiavana@gmail.com',
            subject: `[Portfolio] Message de ${formData.name}`,
            body: `
                ${formData.message}
    
                ---
                Informations de contact :
                • Nom : ${formData.name}
                • Email : ${formData.email}
                • Date : ${new Date().toLocaleDateString('fr-FR')}
                • URL : ${window.location.href}
            `
        };

        // Essayer mailto
        const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;

        // Ouvrir dans un nouvel onglet
        const newWindow = window.open(mailtoLink, '_blank');

        // Vérifier si ça a fonctionné
        setTimeout(() => {
            if (!newWindow || newWindow.closed || newWindow.closed === undefined) {
                // Échec - proposer des alternatives
                showEmailFallback(emailData);
            } else {
                // Succès
                setIsSubmitted(true);
                setTimeout(() => setIsSubmitted(false), 5000);
                setFormData({ name: '', email: '', message: '' });
            }
        }, 1000);
    };

    interface EmailData {
        to: string;
        subject: string;
        body: string;
    }

    const showEmailFallback = (emailData: EmailData): void => {
        const modalContent = `
            <div style="padding: 20px; max-width: 500px;">
                <h3 style="color: #7c3aed; margin-bottom: 15px;">Ouvrez votre client email</h3>
                <p>Votre navigateur n'a pas pu ouvrir automatiquement votre client email.</p>
                
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>Destinataire :</strong> ${emailData.to}</p>
                    <p><strong>Sujet :</strong> ${emailData.subject}</p>
                    <p><strong>Message :</strong></p>
                    <pre style="background: white; padding: 10px; border-radius: 5px; overflow: auto;">
    ${emailData.body}
                    </pre>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="navigator.clipboard.writeText('${emailData.to}\\n\\nSujet: ${emailData.subject}\\n\\n${emailData.body}')" 
                            style="padding: 10px 15px; background: #7c3aed; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        📋 Copier
                    </button>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${emailData.to}&su=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}" 
                       target="_blank"
                       style="padding: 10px 15px; background: #ea4335; color: white; text-decoration: none; border-radius: 5px;">
                        📧 Ouvrir Gmail
                    </a>
                </div>
            </div>
        `;

        // Créer une modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5); display: flex;
            align-items: center; justify-content: center; z-index: 10000;
        `;
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);

        // Fermer la modal au clic
        modal.addEventListener('click', (e: MouseEvent) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                setIsSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
            }
        });
    };

    // Gestionnaire de changement de formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Message à afficher - personnalisable
    const popupMessage = "👋 Bienvenue sur mon portfolio! Je suis Fitiavana Harilalaina, développeur Full Stack, passionné par le web et prêt à collaborer sur de nouveau projets. Bonne visite 🚀";

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
            >
                <div className="px-6 py-4 md:px-12 lg:px-24 flex items-center justify-between">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleNavClick('accueil')}
                    >
                        <Code2 className="w-8 h-8 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text" />
                        <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                            HariFitia
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNavClick(item.id)}
                                className={`flex items-center gap-2 text-lg font-medium transition-colors ${activeSection === item.id
                                    ? 'text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text'
                                    : 'text-gray-600 hover:text-violet-500'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </motion.button>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t"
                        >
                            <div className="px-6 py-4 flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        className={`flex items-center gap-3 py-2 font-medium ${activeSection === item.id
                                            ? 'text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text'
                                            : 'text-gray-600'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Hero Section */}
            <section
                id="accueil"
                ref={(el) => { sectionsRef.current['accueil'] = el as HTMLDivElement | null; }}
                className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 flex flex-col justify-center pt-16 sm:pt-20"
            >
                <div className="max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16"
                    >
                        {/* Texte principal */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="mb-6 sm:mb-8"
                            >
                                <span className="inline-block px-4 py-2 bg-gradient-to-r from-violet-500/10 to-pink-600/10 rounded-full text-violet-600 font-medium text-sm sm:text-base mb-3 sm:mb-4">
                                    Développeur Full Stack
                                </span>
                                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-300 mb-3 sm:mb-4 leading-tight">
                                    Bonjour, je suis{' '}
                                    <span className="text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                        Harilalaina Fitiavana
                                    </span>
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                                    Passionné par la création de solutions web modernes et performantes.
                                    Actuellement licencié en Informatique – Parcours Développeur Web.
                                </p>
                            </motion.div>

                            {/* Boutons d'action */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
                            >
                                <motion.a
                                    href="https://github.com/harilalainafitiavana"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                >
                                    <Github size={18} className="sm:w-5 sm:h-5" />
                                    Voir mon GitHub
                                </motion.a>
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                >
                                    <Mail size={18} className="sm:w-5 sm:h-5" />
                                    Contactez-moi
                                </motion.a>
                            </motion.div>

                            {/* Liens sociaux */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="flex justify-center lg:justify-start gap-4 sm:gap-6"
                            >
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
                                    >
                                        <social.icon size={20} className="sm:w-6 sm:h-6" />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>

                        {/* Image avec animations améliorées */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotate: 0,
                                y: [0, -10, 0] // Flottement léger
                            }}
                            transition={{
                                duration: 0.8,
                                rotate: { duration: 0.6 },
                                y: {
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotate: 2,
                                transition: { duration: 0.3 }
                            }}
                            className="relative w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0"
                        >
                            {/* Effet de lumière pulsante */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-violet-300 to-pink-400 rounded-full blur-3xl -z-10"
                            />

                            {/* Anneaux concentriques animés */}
                            <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                {/* Anneau externe */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 border-4 border-transparent border-t-violet-500/30 border-r-pink-600/30 rounded-full"
                                />

                                {/* Anneau intermédiaire */}
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-4 border-3 border-transparent border-b-violet-500/20 border-l-pink-600/20 rounded-full"
                                />

                                {/* Conteneur principal de l'image */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
                                    >
                                        {/* Gradient animé derrière l'image */}
                                        <motion.div
                                            animate={{
                                                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="absolute inset-0 bg-gradient-to-br from-violet-500 via-pink-600 to-violet-500 bg-[length:200%_200%] rounded-full p-1"
                                        >
                                            {/* Cadre blanc */}
                                            <div className="w-full h-full bg-white rounded-full p-1">
                                                {/* Image avec effet de brillance */}
                                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                                    <motion.img
                                                        src='https://github.com/harilalainafitiavana/images-portefolio/blob/main/Fitiavana.png?raw=true'
                                                        alt="Harilalaina Fitiavana - Développeur Full Stack"
                                                        className="w-full h-full object-cover"
                                                        initial={{ scale: 1.1 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.8 }}
                                                        whileHover={{ scale: 1.05 }}
                                                    />

                                                    {/* Effet de brillance au survol */}
                                                    <motion.div
                                                        initial={{ x: '-100%' }}
                                                        whileHover={{ x: '200%' }}
                                                        transition={{ duration: 0.6 }}
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Points décoratifs */}
                                        {[...Array(4)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    y: [0, -10, 0],
                                                    opacity: [0.5, 1, 0.5]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    delay: i * 0.5,
                                                    repeat: Infinity
                                                }}
                                                className={`absolute w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-600 ${i === 0 ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' :
                                                    i === 1 ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2' :
                                                        i === 2 ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' :
                                                            'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
                                                    }`}
                                            />
                                        ))}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Badge flottant */}
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 5, 0, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -bottom-2 right-4 sm:right-8 md:right-12 lg:-right-4 lg:bottom-8 bg-white dark:bg-gray-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
                            >
                                <span className="text-xs sm:text-sm font-semibold text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                    Disponible
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Indicateur de défilement */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
                >
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" />
                </motion.div>
            </section>

            {/* About Section */}
            <section
                id="apropos"
                ref={(el) => { sectionsRef.current['apropos'] = el as HTMLDivElement | null; }}
                className="px-6 py-16 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl text-gray-400 font-bold mb-4">
                            À propos de <span className="text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">moi</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Passionné par le développement web et les nouvelles technologies
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {[
                                    { icon: User, label: 'Âge', value: '23 ans' },
                                    { icon: GraduationCap, label: 'Niveau', value: 'Licence en Informatique' },
                                    { icon: Target, label: 'Titre', value: 'Développeur Full Stack Junior' },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                                    >
                                        <item.icon className="w-8 h-8 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text mx-auto mb-4" />
                                        <p className="text-gray-500 font-bold text-xl">{item.label}</p>
                                        <p className="text-gray-400 text-sm">{item.value}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg">
                                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                        Ma motivation
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Développeur Full Stack passionné par la création de solutions web modernes
                                        et performantes. Mon parcours en 3ᵉ année Informatique m'a permis d'acquérir
                                        une solide base technique et une passion pour l'apprentissage continu.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mt-4">
                                        Je suis constamment à la recherche de nouveaux défis qui me permettront
                                        de progresser et de livrer des solutions innovantes qui répondent aux
                                        besoins des clients avec excellence et professionnalisme.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-gradient-to-br from-violet-500 to-pink-600 p-8 rounded-2xl text-white">
                                <h3 className="text-2xl font-bold mb-4">
                                    Mon approche
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'Développement centré utilisateur',
                                        'Code propre et maintenable',
                                        'Performance et optimisation',
                                        'Veille technologique constante',
                                    ].map((item, index) => (
                                        <motion.li
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                            <span>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-4 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                    Contact rapide
                                </h3>
                                <div className="space-y-4">
                                    <motion.a
                                        href="mailto:harilalainafitiavana@gmail.com"
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <Mail className="w-5 h-5 text-violet-500" />
                                        <span className="font-medium text-violet-500">harilalainafitiavana@gmail.com</span>
                                    </motion.a>
                                    <motion.a
                                        href="https://wa.me/261336691909"
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <Phone className="w-5 h-5 text-green-500" />
                                        <span className="font-medium text-green-500">WhatsApp: 033 66 919 09</span>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section - MODERNISÉE */}
            <section
                id="competences"
                ref={(el) => { sectionsRef.current['competences'] = el as HTMLDivElement | null; }}
                className="px-6 py-16 md:px-12 lg:px-24"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl text-gray-400 font-bold mb-4">
                            Technologies <span className="text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">maîtrisées</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Un ensemble de technologies modernes organisées par catégories
                        </p>
                    </motion.div>

                    {/* Filtres par catégorie */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {skillCategories.map((category) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveSkillCategory(category.id)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${activeSkillCategory === category.id
                                    ? 'bg-gradient-to-r from-violet-500 to-pink-600 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                                    }`}
                            >
                                <category.icon className="w-4 h-4" />
                                <span className="font-medium">{category.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Grille des compétences */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="group"
                            >
                                <div className={`h-full bg-gradient-to-br ${skill.color} rounded-xl p-4 flex flex-col items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:shadow-2xl`}>
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="relative mb-3">
                                            {/* Conteneur avec fond blanc semi-transparent */}
                                            <div className="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
                                                <img
                                                    src={skill.logo}
                                                    alt={skill.name}
                                                    className="w-10 h-10 object-contain"
                                                    loading="lazy"
                                                />
                                            </div>
                                            {/* Badge de catégorie */}
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800 shadow-sm">
                                                {skill.category === 'frontend' ? 'FE' :
                                                    skill.category === 'backend' ? 'BE' :
                                                        skill.category === 'database' ? 'DB' :
                                                            skill.category === 'cms' ? 'CMS' : 'TOOL'}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-bold mb-1">{skill.name}</div>
                                            <div className="text-xs opacity-80">
                                                {skill.category === 'frontend' ? 'Frontend' :
                                                    skill.category === 'backend' ? 'Backend' :
                                                        skill.category === 'database' ? 'Base de données' :
                                                            skill.category === 'cms' ? 'CMS' : 'Outil'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* GitHub Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-12 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">GitHub</h3>
                                <p className="text-gray-300">Découvrez mes projets et contributions</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Github className="w-5 h-5" />
                                    <span className="font-mono">harilalainafitiavana</span>
                                </div>
                            </div>
                            <motion.a
                                href="https://github.com/harilalainafitiavana"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                            >
                                <ExternalLink size={18} />
                                Visiter mon GitHub
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section - MODERNISÉE */}
            <section
                id="projets"
                ref={(el) => { sectionsRef.current['projets'] = el as HTMLDivElement | null; }}
                className="px-4 sm:px-6 lg:px-8 xl:px-24 py-16 bg-gradient-to-b from-gray-50 to-white"
            >
                <div className="max-w-7xl mx-auto">
                    {/* En-tête avec filtres */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-gradient-to-r from-violet-500/10 to-pink-600/10 rounded-full text-violet-600 font-medium text-sm">
                                Portfolio
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                            Mes <span className="text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">Réalisations</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Des solutions web innovantes qui marquent la différence
                        </p>

                        {/* Filtres par catégorie - VERSION FONCTIONNELLE */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {[
                                { label: 'Tous', icon: '📁', value: 'Tous' },
                                { label: 'Full Stack', icon: '⚡', value: 'Full Stack' },
                                { label: 'Frontend', icon: '🎨', value: 'Frontend' },
                                { label: 'Backend', icon: '⚙️', value: 'Backend' },
                                { label: 'CMS', icon: '🖥️', value: 'CMS' },
                            ].map((item) => (
                                <motion.button
                                    key={item.value}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setActiveFilter(item.value);
                                        setCurrentPage(1);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${activeFilter === item.value
                                        ? 'bg-gradient-to-r from-violet-500 to-pink-600 text-white shadow-lg shadow-violet-500/30'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:border-violet-300 hover:shadow-md'
                                        }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    <span>{item.label}</span>

                                    {/* Badge avec nombre de projets dans cette catégorie */}
                                    {item.value !== 'Tous' && (
                                        <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${activeFilter === item.value
                                            ? 'bg-white/30'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {projects.filter(p => {
                                                if (item.value === 'Full Stack') return p.category === 'fullstack';
                                                if (item.value === 'Frontend') return p.category === 'frontend';
                                                if (item.value === 'Backend') return p.category === 'backend';
                                                if (item.value === 'CMS') return p.category === 'cms';
                                                return false;
                                            }).length}
                                        </span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Grille de projets modernes */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-12">
                        {currentProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white rounded overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Badge "Featured" */}
                                {project.featured && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-full text-xs font-semibold shadow-lg">
                                            ⭐ Projet Phare
                                        </span>
                                    </div>
                                )}

                                {/* Conteneur image avec effet parallax */}
                                <div className="relative h-56 md:h-64 overflow-hidden">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        className="relative h-full"
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />

                                        {/* Effet de brillance au survol */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </motion.div>

                                    {/* Badge de catégorie */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${project.category === 'fullstack' ? 'bg-blue-500/90 text-white' :
                                            project.category === 'frontend' ? 'bg-green-500/90 text-white' :
                                                project.category === 'cms' ? 'bg-orange-500/90 text-white' :
                                                    'bg-purple-500/90 text-white'
                                            }`}>
                                            {project.category.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Icône Gallery qui apparaît au survol */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        className="absolute bottom-4 right-4 z-10"
                                    >
                                        <button
                                            onClick={() => {
                                                setSelectedProject({
                                                    ...project,
                                                    category: project.category as "frontend" | "backend" | "cms" | "fullstack",
                                                });
                                                setShowGallery(true);
                                                setCurrentGalleryImage(0);
                                            }}
                                            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/gallery"
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-5 h-5 text-gray-800 group-hover/gallery:text-violet-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-xs font-medium text-gray-800 group-hover/gallery:text-violet-600 transition-colors">
                                                    {project.gallery?.length || 0} photos
                                                </span>
                                            </div>
                                        </button>
                                    </motion.div>
                                </div>

                                {/* Contenu de la carte */}
                                <div className="p-6 md:p-7">
                                    <div className="mb-4">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Technologies sous forme de badges */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-200"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 4 && (
                                                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">
                                                    +{project.technologies.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Boutons d'action */}
                                    <div className="flex gap-3">
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05, x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 group/live"
                                        >
                                            <ExternalLink className="w-4 h-4 group-hover/live:rotate-12 transition-transform" />
                                            <span className="font-medium">Visiter</span>
                                        </motion.a>

                                        <motion.button
                                            onClick={() => {
                                                setSelectedProject({
                                                    ...project,
                                                    category: project.category as "cms" | "fullstack" | "frontend" | "backend",
                                                });
                                                setShowGallery(true);
                                            }}
                                            whileHover={{ scale: 1.05, x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-violet-500 hover:text-violet-600 transition-all duration-300 group/gallery-btn"
                                        >
                                            <svg className="w-4 h-4 group-hover/gallery-btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-medium">Galerie</span>
                                        </motion.button>

                                        {project.github && (
                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05, x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center justify-center px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 group/github"
                                            >
                                                <Github className="w-4 h-4 group-hover/github:scale-110 transition-transform" />
                                            </motion.a>
                                        )}
                                    </div>
                                </div>

                                {/* Ligne décorative en bas */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-pink-600 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination moderne */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <motion.button
                                    key={page}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${currentPage === page
                                        ? 'bg-gradient-to-r from-violet-500 to-pink-600 text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {page}
                                </motion.button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                                Projets {Math.min((currentPage - 1) * projectsPerPage + 1, projects.length)}-
                                {Math.min(currentPage * projectsPerPage, projects.length)} sur {projects.length}
                            </span>

                            {/* Boutons précédent/suivant */}
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-violet-500'
                                        }`}
                                >
                                    ← Précédent
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, x: 2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-violet-500 to-pink-600 text-white hover:opacity-90'
                                        }`}
                                >
                                    Suivant →
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section GitHub améliorée */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-pink-600 rounded-xl flex items-center justify-center">
                                                <Github className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">Découvrez mon GitHub</h3>
                                                <p className="text-gray-300">Projets open-source, contributions et code source</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <span className="font-mono">harilalainafitiavana</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-sm">Actif maintenant</span>
                                            </div>
                                        </div>
                                    </div>
                                    <motion.a
                                        href="https://github.com/harilalainafitiavana"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold group/github-btn"
                                    >
                                        <Github className="w-5 h-5 group-hover/github-btn:rotate-12 transition-transform" />
                                        <span>Explorer mon GitHub</span>
                                        <ArrowRight className="w-4 h-4 group-hover/github-btn:translate-x-1 transition-transform" />
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Modal Gallery - À ajouter à la fin de votre composant */}
                <AnimatePresence>
                    {showGallery && selectedProject && (
                        <>
                            {/* Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowGallery(false)}
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            />

                            {/* Modal EN HAUT À GAUCHE */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: -20, y: -20 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 300
                                }}
                                className="fixed top-6 left-6 z-[101] w-[calc(100vw-3rem)] max-w-md"
                            >
                                <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-pink-50 flex-shrink-0">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-gray-900 truncate">
                                                {selectedProject?.title || 'Galerie du projet'}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {selectedProject?.gallery?.length || 0} photos
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowGallery(false)}
                                            className="ml-3 p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                                        >
                                            <X className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </div>

                                    {/* Image principale - conteneur scrollable */}
                                    <div className="flex-1 overflow-hidden">
                                        <div className="h-[40vh] min-h-[250px] relative">
                                            {selectedProject?.gallery && selectedProject.gallery.length > 0 ? (
                                                <>
                                                    <img
                                                        src={selectedProject.gallery[currentGalleryImage]}
                                                        alt={`${selectedProject.title} - Image ${currentGalleryImage + 1}`}
                                                        className="w-full h-full object-contain bg-gray-300"
                                                    />

                                                    {/* Navigation */}
                                                    <button
                                                        onClick={() => setCurrentGalleryImage(prev =>
                                                            prev > 0 ? prev - 1 : (selectedProject.gallery?.length || 1) - 1
                                                        )}
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
                                                    >
                                                        <ChevronUp className="w-5 h-5 text-gray-800 rotate-90" />
                                                    </button>
                                                    <button
                                                        onClick={() => setCurrentGalleryImage(prev =>
                                                            prev < (selectedProject.gallery?.length || 1) - 1 ? prev + 1 : 0
                                                        )}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
                                                    >
                                                        <ChevronUp className="w-5 h-5 text-gray-800 -rotate-90" />
                                                    </button>

                                                    {/* Indicateur d'image */}
                                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                                                        <span className="text-white text-xs font-medium">
                                                            {currentGalleryImage + 1} / {selectedProject.gallery.length}
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <p className="text-gray-500 text-sm">Aucune image disponible</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Miniatures - seulement si des images existent */}
                                        {selectedProject?.gallery && selectedProject.gallery.length > 0 && (
                                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                                <div className="mb-2">
                                                    <p className="text-xs font-medium text-gray-600">Miniatures :</p>
                                                </div>
                                                <div className="flex gap-2 overflow-x-auto pb-2">
                                                    {selectedProject.gallery.map((img, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentGalleryImage(index)}
                                                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentGalleryImage
                                                                ? 'border-violet-500 scale-105 shadow-sm'
                                                                : 'border-transparent hover:border-gray-300'
                                                                }`}
                                                        >
                                                            <img
                                                                src={img}
                                                                alt={`Miniature ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Boutons d'action en bas */}
                                    <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                                        <div className="flex gap-3">
                                            <a
                                                href={selectedProject?.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Visiter le site
                                            </a>
                                            {selectedProject?.github && (
                                                <a
                                                    href={selectedProject.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center px-3 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                ref={(el) => { sectionsRef.current['contact'] = el as HTMLDivElement | null; }}
                className="px-6 py-16 md:px-12 lg:px-24"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl text-gray-400 md:text-5xl font-bold mb-4">
                            Travaillons <span className="text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">ensemble</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Discutons de votre projet et voyons comment je peux vous aider à le réaliser
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h3 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                    Envoyez-moi un message
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Nom</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
                                            placeholder="Votre nom"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
                                            placeholder="votre@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition"
                                            placeholder="Décrivez votre projet..."
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-medium"
                                    >
                                        {isSubmitted ? (
                                            <>
                                                <Check size={20} />
                                                Message envoyé !
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Envoyer le message
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-gradient-to-br from-violet-500 to-pink-600 rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm opacity-80">Email</p>
                                            <a
                                                href="mailto:harilalainafitiavana@gmail.com"
                                                className="font-medium hover:underline"
                                            >
                                                harilalainafitiavana@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm opacity-80">Téléphone</p>
                                            <a
                                                href="tel:+261347964792"
                                                className="font-medium hover:underline"
                                            >
                                                034 79 647 92
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <MessageSquare className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm opacity-80">WhatsApp</p>
                                            <a
                                                href="https://wa.me/261336691909"
                                                className="font-medium hover:underline"
                                            >
                                                033 66 919 09
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h3 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                    Disponibilité
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Je suis disponible pour des missions freelance, des collaborations
                                    ou des opportunités en CDI. N'hésitez pas à me contacter pour
                                    discuter de votre projet.
                                </p>

                                {/* GitHub Info */}
                                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Github className="w-6 h-6 text-gray-800" />
                                        <div>
                                            <p className="text-sm text-gray-600">GitHub</p>
                                            <p className="font-mono text-gray-800">harilalainafitiavana</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bouton "Afficher mes contacts" */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowContacts(!showContacts)}
                                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500/10 to-pink-600/10 text-violet-600 rounded-lg hover:opacity-90 transition-opacity w-full justify-center"
                                >
                                    {showContacts ? (
                                        <>
                                            <ChevronUp className="w-5 h-5" />
                                            Masquer les contacts supplémentaires
                                        </>
                                    ) : (
                                        <>
                                            <ArrowRight className="w-5 h-5" />
                                            Afficher mes contacts
                                        </>
                                    )}
                                </motion.button>

                                {/* Section contacts supplémentaires */}
                                <AnimatePresence>
                                    {showContacts && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden mt-6"
                                        >
                                            <div className="space-y-4 pt-4 border-t">
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <Phone className="w-5 h-5 text-violet-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Téléphone principal</p>
                                                        <p className="font-medium text-violet-500">034 79 647 92</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <MessageSquare className="w-5 h-5 text-green-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">WhatsApp professionnel</p>
                                                        <p className="font-medium text-green-500">033 66 919 09</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <Mail className="w-5 h-5 text-red-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Email professionnel</p>
                                                        <p className="font-medium text-red-400">harilalainafitiavana@gmail.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50 border-t">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                                <Code2 className="w-8 h-8 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text" />
                                <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                    Harilalaina Fitiavana
                                </span>
                            </div>
                            <p className="text-gray-600">
                                Développeur Full Stack – Passionné par l'innovation
                            </p>
                            <div className="mt-2 flex items-center gap-2 justify-center md:justify-start">
                                <Github className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-500">github.com/harilalainafitiavana</span>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-gray-600 ${social.color} transition-colors`}
                                >
                                    <social.icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t text-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} Harilalaina Fitiavana. Tous droits réservés.</p>
                        <p className="mt-2">Portfolio créé avec React, Tailwind CSS et Framer Motion</p>
                    </div>
                </div>
            </footer>

            {/* Bouton "Retour en haut" */}
            <AnimatePresence>
                {showScrollButton && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                        aria-label="Retour en haut"
                    >
                        <ChevronUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Pour la partie popup,  */}
            <AnimatePresence>
                {showPopup && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closePopup}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Popup EN HAUT À GAUCHE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -20, y: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: -20, y: -20 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300
                            }}
                            className="fixed top-6 left-6 z-50 w-[85vw] max-w-sm"
                        >
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                                {/* En-tête de la popup */}
                                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-violet-500/5 to-pink-600/5">
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <Bot className="w-5 h-5 text-violet-600" />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                                            />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700">HariFitia</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={closePopup}
                                        className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                        aria-label="Fermer"
                                    >
                                        <X className="w-4 h-4 text-gray-600" />
                                    </motion.button>
                                </div>

                                {/* Contenu de la popup */}
                                <div className="p-5">
                                    <div className="flex gap-4">
                                        {/* Robot à gauche */}
                                        <div className="flex-shrink-0">
                                            <motion.div
                                                animate={{
                                                    y: [0, -3, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                                className="relative"
                                            >
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-pink-600 flex items-center justify-center">
                                                    <Bot className="w-7 h-7 text-white" />
                                                </div>

                                                {/* Animation des yeux */}
                                                <motion.div
                                                    animate={{ scaleY: [1, 0.8, 1] }}
                                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                                    className="absolute top-3.5 left-1/2 transform -translate-x-1/2 flex gap-1"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                </motion.div>
                                            </motion.div>

                                            {/* Points animés */}
                                            {isTyping && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="flex justify-center gap-1 mt-2"
                                                >
                                                    {[...Array(3)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{
                                                                scale: [1, 1.3, 1],
                                                                opacity: [0.5, 1, 0.5]
                                                            }}
                                                            transition={{
                                                                duration: 0.6,
                                                                repeat: Infinity,
                                                                delay: i * 0.2
                                                            }}
                                                            className="w-1 h-1 bg-violet-500 rounded-full"
                                                        />
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Message à droite */}
                                        <div className="flex-1">
                                            <div className="bg-gradient-to-r from-violet-500/10 to-pink-600/10 rounded-xl p-4 min-h-[100px]">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <MessageSquare className="w-3.5 h-3.5 text-violet-600" />
                                                    <span className="text-xs font-medium text-violet-600">Message</span>
                                                    {isTyping && (
                                                        <motion.span
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="text-xs text-gray-500"
                                                        >
                                                            écrit...
                                                        </motion.span>
                                                    )}
                                                </div>

                                                {/* Texte avec animation */}
                                                <div className="text-gray-700">
                                                    <div className="text-sm leading-relaxed">
                                                        {displayedText}
                                                        {isTyping && (
                                                            <motion.span
                                                                animate={{ opacity: [1, 0, 1] }}
                                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                                className="inline-block w-1.5 h-3.5 bg-violet-500 ml-1 align-middle"
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Émojis */}
                                                    {!isTyping && displayedText.length === popupMessage.length && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.5 }}
                                                            className="flex gap-1.5 mt-2"
                                                        >
                                                            {["👋", "🚀", "💻", "😊"].map((emoji, index) => (
                                                                <motion.span
                                                                    key={index}
                                                                    initial={{ scale: 0, rotate: -20 }}
                                                                    animate={{ scale: 1, rotate: 0 }}
                                                                    transition={{
                                                                        delay: 0.1 * index
                                                                    }}
                                                                    className="text-lg"
                                                                >
                                                                    {emoji}
                                                                </motion.span>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bouton d'action */}
                                    {!isTyping && displayedText.length === popupMessage.length && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="mt-5 flex gap-2"
                                        >
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={closePopup}
                                                className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs font-medium"
                                            >
                                                Fermer
                                            </motion.button>
                                            <motion.a
                                                href="#contact"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={closePopup}
                                                className="flex-1 py-2 px-3 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity text-xs font-medium text-center"
                                            >
                                                Contact
                                            </motion.a>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Pied de la popup */}
                                <div className="px-4 py-2 bg-gradient-to-r from-violet-500/5 to-pink-600/5 border-t border-gray-200">
                                    <div className="flex items-center justify-center gap-1">
                                        <Sparkles className="w-2.5 h-2.5 text-violet-500" />
                                        <span className="text-xs text-gray-600">
                                            Merci de votre visite !
                                        </span>
                                        <Sparkles className="w-2.5 h-2.5 text-pink-500" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;

