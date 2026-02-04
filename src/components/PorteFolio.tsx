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
    Globe,
    ArrowRight,
    ChevronUp
} from 'lucide-react';
import img from "../assets/Fitiavana.png"

const Portfolio = () => {
    // État pour la navigation et les interactions
    const [activeSection, setActiveSection] = useState('accueil');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Références pour observer les sections
    const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Données des projets
    const projects = [
        {
            title: 'Restaurant Sahameva',
            description: 'Site web moderne pour restaurant avec réservation en ligne',
            technologies: ['WordPress', 'Elementor'],
            imageColor: 'from-orange-500 to-red-500',
            link: 'https://sahameva.com',
        },
        {
            title: 'Printy',
            description: 'Gestion et suivi des demandes d\'impression numérique à distance',
            technologies: ['Django', 'React', 'Tailwind CSS', 'DaisyUI'],
            imageColor: 'from-purple-500 to-pink-500',
            link: 'https://www.printy.mg',
        },
        {
            title: 'Plateforme éducative',
            description: 'Université Saint Vincent de Paul Akamasoa - Plateforme éducative complète',
            technologies: ['Django', 'Tailwind CSS', 'PostgreSQL'],
            imageColor: 'from-blue-500 to-cyan-500',
            link: 'https://github.com/harilalainafitiavana/dashboard-with-django',
        },
        {
            title: 'Bibliothèque numérique',
            description: 'Application web de bibliothèque numérique pour CNRE',
            technologies: ['PHP', 'Bootstrap 5', 'HTML'],
            imageColor: 'from-green-500 to-emerald-500',
            link: 'https://github.com/harilalainafitiavana',
        },
    ];

    // Données des compétences avec logos en ligne
    const skills = [
        { name: 'HTML', color: 'from-orange-500 to-orange-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS', color: 'from-blue-500 to-blue-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', color: 'from-yellow-500 to-yellow-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Bootstrap', color: 'from-purple-500 to-purple-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
        { name: 'Tailwind CSS', color: 'from-cyan-500 to-cyan-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
        { name: 'React', color: 'from-blue-400 to-cyan-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Python', color: 'from-blue-600 to-blue-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Django', color: 'from-green-600 to-green-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        { name: 'Flask', color: 'from-gray-700 to-gray-800', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
        { name: 'PostgreSQL', color: 'from-blue-700 to-blue-800', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MySQL', color: 'from-blue-800 to-blue-900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'SQL', color: 'from-red-500 to-red-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
        { name: 'WordPress', color: 'from-blue-900 to-gray-900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
        { name: 'Elementor', color: 'from-orange-600 to-red-600', logo: 'https://cdn.worldvectorlogo.com/logos/elementor.svg' },
    ];

    // Liens sociaux
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

    // Gestionnaire de clic sur la navigation
    const handleNavClick = (id: string) => {
        setActiveSection(id);
        setIsMenuOpen(false);
        sectionsRef.current[id]?.scrollIntoView({ behavior: 'smooth' });
    };

    // Gestionnaire de soumission du formulaire - FIXÉ
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Créer le lien mailto correctement encodé
        const subject = `Message de ${encodeURIComponent(formData.name)}`;
        const body = `${encodeURIComponent(formData.message)}\n\nRépondre à: ${encodeURIComponent(formData.email)}`;
        const mailtoLink = `mailto:harilalainafitiavana@gmail.com?subject=${subject}&body=${body}`;

        // Ouvrir le client email
        window.open(mailtoLink, '_blank');

        // Réinitialiser le formulaire et afficher le message de confirmation
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    // Gestionnaire de changement de formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
                            Harilalaina
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
                className="min-h-screen px-6 py-20 md:px-12 lg:px-24 flex flex-col justify-center pt-20"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-8"
                            >
                                <span className="inline-block px-4 py-2 bg-gradient-to-r from-violet-500/10 to-pink-600/10 rounded-full text-violet-600 font-medium mb-4">
                                    Développeur Full Stack Junior
                                </span>
                                <h1 className="text-4xl md:text-6xl text-gray-500 font-bold mb-4">
                                    Bonjour, je suis{' '}
                                    <span className="text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                        Harilalaina Fitiavana
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 mb-8">
                                    Passionné par la création de solutions web modernes et performantes.
                                    Actuellement licencé en Informatique – Parcours Développeur Web.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap gap-4 mb-8"
                            >
                                <motion.a
                                    href="https://github.com/harilalainafitiavana"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <Github size={20} />
                                    GitHub
                                </motion.a>
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <Mail size={20} />
                                    Contactez-moi
                                </motion.a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex gap-6"
                            >
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
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                                <div className="relative w-full h-full bg-gradient-to-br from-violet-500/20 to-pink-600/20 rounded-full flex items-center justify-center">
                                    <div className="w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-violet-500 to-pink-600 rounded-full flex items-center justify-center">
                                        <div className="w-52 h-52 md:w-80 md:h-80 bg-white rounded-full overflow-hidden border-4 border-white">
                                            {/* Remplacez cette URL par celle de votre photo */}
                                            <img
                                                src={img}
                                                alt="Harilalaina Fitiavana - Développeur Full Stack"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <ChevronDown className="w-8 h-8 text-gray-400" />
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
                                    { icon: GraduationCap, label: 'Niveau', value: 'Licence Informatique' },
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
                                        Développeur Full Stack Junior passionné par la création de solutions web modernes
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

            {/* Skills Section - AVEC LOGOS EN LIGNE */}
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
                            Un ensemble de technologies modernes pour créer des solutions web complètes
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="aspect-square"
                            >
                                <div className={`h-full bg-gradient-to-br ${skill.color} rounded-xl p-4 flex flex-col items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {/* Logo de la technologie */}
                                        <img
                                            src={skill.logo}
                                            alt={skill.name}
                                            className="w-12 h-12 mb-2 object-contain filter brightness-0 invert"
                                            loading="lazy"
                                        />
                                        <div className="text-center">
                                            <div className="text-sm font-bold mb-1">{skill.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-12 bg-gradient-to-r from-violet-500/10 to-pink-600/10 rounded-2xl p-8"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text text-center">
                            Stack technique complet
                        </h3>
                        <p className="text-center text-gray-600">
                            Frontend, Backend, Base de données et CMS - Toutes les compétences
                            nécessaires pour réaliser des projets web de A à Z
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section
                id="projets"
                ref={(el) => { sectionsRef.current['projets'] = el as HTMLDivElement | null; }}
                className="px-6 py-16 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white"
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
                            Mes <span className="text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">projets</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Des réalisations concrètes qui démontrent mes compétences techniques
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                            >
                                <div className={`h-48 bg-gradient-to-r ${project.imageColor} relative`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                                            <Globe className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-gradient-to-r from-violet-500 to-pink-600 bg-clip-text">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-gradient-to-r from-violet-500/10 to-pink-600/10 text-violet-600 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <ExternalLink size={18} />
                                        Voir le projet
                                    </motion.a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section - CORRIGÉE */}
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

                                {/* Bouton "Afficher mes contacts" avec fonctionnalité corrigée */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowContacts(!showContacts)}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500/10 to-pink-600/10 text-violet-600 rounded-lg hover:opacity-90 transition-opacity w-full justify-center"
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

                                {/* Section contacts supplémentaires qui s'affiche/masque */}
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
                                Développeur Full Stack Junior – Passionné par l'innovation
                            </p>
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
        </div>
    );
};

export default Portfolio;