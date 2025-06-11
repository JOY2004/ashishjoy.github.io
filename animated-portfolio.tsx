"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Calendar,
  Code,
  Database,
  Globe,
  Brain,
  Award,
  Users,
  Sun,
  Moon,
} from "lucide-react"

const DarkModeToggle = ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (value: boolean) => void }) => {
  return (
    <motion.div
      className="fixed top-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
        <Sun className={`w-4 h-4 transition-colors duration-300 ${!darkMode ? "text-yellow-400" : "text-gray-400"}`} />
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            darkMode ? "bg-blue-600" : "bg-gray-300"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
            animate={{
              x: darkMode ? 26 : 2,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
        <Moon className={`w-4 h-4 transition-colors duration-300 ${darkMode ? "text-blue-400" : "text-gray-400"}`} />
      </div>
    </motion.div>
  )
}

const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

const SkillBar = ({ skill, percentage, delay }: { skill: string; percentage: number; delay: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium dark:text-gray-300 text-gray-700">{skill}</span>
        <span className="text-sm dark:text-gray-400 text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full dark:bg-gray-700 bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="group relative dark:bg-gray-800 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden dark:border-gray-700 border-gray-100 border"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
            <Code className="w-6 h-6" />
          </div>
        </div>

        <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string, i: number) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <ul className="space-y-2 dark:text-gray-300 text-gray-600">
          {project.highlights.map((highlight: string, i: number) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.2 + i * 0.1, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 dark:border-gray-800 border-white shadow-lg" />
      <div className="absolute left-2 top-4 w-0.5 h-full bg-gradient-to-b from-blue-200 dark:from-blue-800 to-transparent" />

      <div className="dark:bg-gray-800 bg-white rounded-2xl shadow-lg p-6 ml-4 dark:border-gray-700 border-gray-100 border hover:shadow-xl transition-all duration-500">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{item.title}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-semibold">{item.company}</p>
          </div>
          <div className="flex items-center gap-1 text-sm dark:text-gray-400 text-gray-500 dark:bg-gray-700 bg-gray-50 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4" />
            {item.date}
          </div>
        </div>

        {item.highlights && (
          <ul className="space-y-2 dark:text-gray-300 text-gray-600">
            {item.highlights.map((highlight: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: index * 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-2"
              >
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

export default function AnimatedPortfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const skills = [
    { name: "Python", percentage: 90 },
    { name: "JavaScript", percentage: 55 },
    { name: "React", percentage: 80 },
    { name: "Machine Learning", percentage: 80 },
    { name: "Database Management", percentage: 80 },
    { name: "Full-Stack Development", percentage: 65 },
  ]

  const projects = [
    {
      title: "Natural Language Processing Web Application",
      technologies: ["Flask", "HTML5", "CSS3", "BART", "Google Translate API"],
      highlights: [
        "Architected comprehensive web application integrating pre-trained LLMs",
        "Implemented BART Extractive Summarizer and Google Translate APIs",
        "Developed robust PDF data extraction with intuitive UI",
      ],
    },
    {
      title: "Enterprise Rental Management System",
      technologies: ["Python", "MySQL", "Tkinter", "Database Design"],
      highlights: [
        "Designed comprehensive DBMS solution for rental property management",
        "Created intuitive Tkinter-based GUI for efficient data operations",
        "Optimized database schema for enhanced performance",
      ],
    },
    {
      title: "Secure File Sharing System",
      technologies: ["Python", "AES Encryption", "Diffie-Hellman", "Cryptography"],
      highlights: [
        "Implemented enterprise-grade file encryption using AES algorithms",
        "Integrated Diffie-Hellman key exchange protocol",
        "Applied practical cryptographic principles for security",
      ],
    },
    {
      title: "Literature Research Chat Application",
      technologies: ["RAG", "NLP", "Python", "Machine Learning"],
      highlights: [
        "Developed intelligent chatbot using Retrieval-Augmented Generation",
        "Implemented sophisticated search algorithms across research papers",
        "Delivered highly accurate, context-aware responses",
      ],
    },
  ]

  const experience = [
    {
      title: "AI/ML Intern",
      company: "TATA MOTORS, Dharwad",
      date: "January 2025 – Present",
      highlights: [
        "Developing emotion detection application for employee well-being",
        "Leading full-stack development for real-time process monitoring",
        "Collaborating with cross-functional teams on AI-driven solutions",
      ],
    },
    {
      title: "Core Team Member & PR Coordinator",
      company: "HR Conclave 2024, IIIT Dharwad",
      date: "2024",
      highlights: [
        "Served as primary Student Point of Contact for HR delegates",
        "Managed sponsorship relationships and networking events",
      ],
    },
    {
      title: "Event Lead",
      company: "RUSH E-sports Tournament, IIIT Dharwad",
      date: "2024",
      highlights: [
        "Successfully executed gaming tournament with 600+ participants",
        "Demonstrated exceptional project management capabilities",
      ],
    },
  ]

  const stats = [
    { label: "Projects Completed", value: 11, icon: Code },
    { label: "Technologies Mastered", value: 10, icon: Database },
    { label: "Team Events Led", value: 5, icon: Users },
    { label: "Months Experience", value: 6, icon: Award },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark" : ""}`}>
      {/* Google Fonts Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 transition-colors duration-500">
        {/* Dark Mode Toggle */}
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-600/30 dark:to-pink-600/30 rounded-full blur-3xl"
          />
        </div>

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform-gpu z-50"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />

        {/* Header Section */}
        <motion.header
          style={{ opacity }}
          className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900" />
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white/20"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joy%20pic%20.jpg-k9PNlo6q7ChO4WuqzunutCZC2agCIq.jpeg"
                alt="Ashish Joy Jonnakuti"
                className="w-full h-full object-cover rounded-full scale-110 brightness-110 contrast-110"
                style={{
                  filter: "brightness(1.1) contrast(1.1) saturate(1.1)",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4"
            >
              <p
                className="text-blue-300 text-lg font-medium tracking-wider uppercase mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                AI/ML and Software Engineer
              </p>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                Ashish Joy Jonnakuti
              </h1>
              <div className="flex items-center justify-center gap-2 text-blue-200 text-lg">
                <MapPin className="w-5 h-5" />
                <span>Dharwad, Karnataka, India</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {[
                { icon: Phone, text: "+91 9877368015", href: "tel:+919877368015" },
                { icon: Mail, text: "ashishjoyenjoy@gmail.com", href: "mailto:ashishjoyenjoy@gmail.com" },
                { icon: Linkedin, text: "LinkedIn", href: "#" },
                { icon: Github, text: "GitHub", href: "#" },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <contact.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{contact.text}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="animate-bounce"
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="relative z-10 dark:bg-gray-800/80 bg-white/80 backdrop-blur-sm transition-colors duration-500">
          <div className="max-w-6xl mx-auto px-4 py-20">
            {/* Stats Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center p-6 dark:bg-gray-800 bg-white rounded-2xl shadow-lg dark:border-gray-700 border-gray-100 border"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
                      <AnimatedCounter end={stat.value} />+
                    </div>
                    <p className="dark:text-gray-400 text-gray-600 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Professional Summary */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">Professional Summary</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 dark:border-blue-800/30 border-blue-100 border">
                <p className="text-lg dark:text-gray-300 text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                  Passionate Computer Science student at IIIT Dharwad with demonstrated expertise in software
                  development, web technologies, and machine learning. Proven track record in full-stack development,
                  natural language processing, and database management. Strong leadership experience with excellent
                  communication skills and a commitment to continuous learning and innovation in emerging technologies.
                </p>
              </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">Technical Expertise</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-6">Proficiency Levels</h3>
                  {skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill.name} percentage={skill.percentage} delay={index * 0.1} />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Programming", skills: ["C/C++", "Python", "JavaScript"], icon: Code },
                    { title: "Frontend", skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Figma"], icon: Globe },
                    { title: "Database", skills: ["MySQL", "Git", "Docker"], icon: Database },
                    { title: "AI/ML", skills: ["Machine Learning", "NLP", "Flask"], icon: Brain },
                  ].map((category, index) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="dark:bg-gray-800 bg-white rounded-xl p-6 shadow-lg dark:border-gray-700 border-gray-100 border hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                          <category.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-bold dark:text-white text-gray-900">{category.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 dark:bg-blue-900/30 bg-blue-50 dark:text-blue-300 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">Professional Experience</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
              </div>
              <div className="max-w-4xl mx-auto">
                {experience.map((item, index) => (
                  <TimelineItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">Featured Projects</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
            </motion.section>

            {/* Education Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">Education</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
              </div>
              <div className="max-w-4xl mx-auto">
                {[
                  {
                    title: "Bachelor of Technology in Computer Science and Engineering",
                    company: "Indian Institute of Information Technology (IIIT), Dharwad",
                    date: "November 2021 – Present",
                    highlights: ["Current CPI: 6.0"],
                  },
                  {
                    title: "Higher Secondary Education",
                    company: "Kendriya Vidyalaya No.2, Indore",
                    date: "2021",
                    highlights: ["Score: 75%"],
                  },
                ].map((item, index) => (
                  <TimelineItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 dark:from-gray-800 dark:to-blue-900 rounded-2xl p-12 text-white">
                <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h2>
                <p className="text-blue-200 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  I'm always excited to work on innovative projects and collaborate with talented teams. Let's connect
                  and explore opportunities!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
                  >
                    Get In Touch
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
                  >
                    Download Resume
                  </motion.button>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}
