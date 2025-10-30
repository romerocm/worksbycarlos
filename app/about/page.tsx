"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Cloud,
  Server,
  Database,
  Code,
  Terminal,
  MapPin,
  Mail,
  Linkedin,
  Download,
  Music,
  Guitar,
  Piano,
  User,
  Lightbulb,
  Users,
  Wrench,
} from "lucide-react";

const workingWithMe = {
  philosophy: "I build like I create music: with precision, creativity, and harmony between all components.",
  style: "Systems thinker, infrastructure advocate, and composed during incidents.",
  skills: ["Strategic", "Analytical", "Collaborative", "Resilient", "Efficiency-driven", "Problem Solver"]
};

const technicalSkills = [
  {
    category: "PLATFORM SKILLS",
    items: ["AWS", "GCP", "Azure", "Terraform", "Kubernetes", "Docker", "Ansible", "GitLab CI"],
    icon: Cloud,
  },
  {
    category: "TECHNICAL SKILLS",
    items: ["Infrastructure as Code", "CI/CD Pipelines", "Monitoring & Observability", "Container Orchestration"],
    icon: Code,
  },
  {
    category: "DATABASES & SERVERS",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Nginx", "Apache"],
    icon: Database,
  },
];

const musicalInterests = [
  {
    title: "Taylor 314ce Guitar",
    description: "Acoustic fingerstyle and songwriting",
    icon: Guitar,
  },
  {
    title: "Piano",
    description: "Classical and contemporary pieces",
    icon: Piano,
  },
  {
    title: "Saxophone (Learning)",
    description: "Currently exploring jazz fundamentals",
    icon: Music,
  },
];

export default function About() {
  const ref = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);

  const contactsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const checkScroll = () => {
      if (contactsRef.current) {
        const isScrollable =
          contactsRef.current.scrollWidth > contactsRef.current.clientWidth;
        if (isScrollable) {
          controls.start({
            x: [0, -10, 0],
            transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
          });
        } else {
          controls.stop();
        }
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [controls]);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Desktop Image with closer crop */}
          <div className="hidden md:block w-full h-full transform scale-[1.8] translate-y-[-15%]">
            <Image
              src="/assets/images/me-urban-large.png"
              alt="Carlos Romero - Cloud Engineer"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Mobile Image with proper coverage and zoom */}
          <div className="block md:hidden w-full h-full transform scale-[1.4] translate-y-[-5%]">
            <Image
              src="/assets/images/me-urban-large.png"
              alt="Carlos Romero - Cloud Engineer"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" style={{ height: '100px' }} />
        </div>

        <div className="relative z-10 h-full flex items-end md:items-center justify-start px-4 md:px-12 pb-16 md:pb-0">

          {/* Main Content - Brutalist Style */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Personal Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tighter text-white mb-2">
                HI THERE,
              </h1>
              <div className="bg-[#b6da9b] p-4 md:p-6 transform rotate-2 inline-block">
                <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter text-black">
                  I'M CARLOS
                </h1>
              </div>
            </motion.div>
            
            {/* Cloud Engineer in Geometric Box */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-black p-4 md:p-6 transform -rotate-1 mb-12 max-w-fit"
            >
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                CLOUD ENGINEER
              </h2>
            </motion.div>
            
            {/* Contact Info - Brutalist Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 items-start"
            >
              <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 transform rotate-1">
                <a
                  href="https://linkedin.com/in/romerocm"
                  className="flex items-center gap-2 md:gap-3 text-white hover:text-[#b6da9b] transition-colors font-bold text-sm md:text-lg"
                >
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                  <span>ROMEROCM</span>
                </a>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 transform -rotate-1">
                <a
                  href="mailto:cmromero.dev@gmail.com"
                  className="flex items-center gap-2 md:gap-3 text-white hover:text-[#b6da9b] transition-colors font-bold text-sm md:text-lg"
                >
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">CMROMERO.DEV@GMAIL.COM</span>
                  <span className="sm:hidden">EMAIL</span>
                </a>
              </div>
              
            </motion.div>
            
            {/* Brutalist Download Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="inline-flex items-center gap-4 bg-[#b6da9b] text-black px-12 py-6 font-black text-2xl tracking-tight transform -rotate-3 hover:rotate-0 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Download className="w-8 h-8" />
              DOWNLOAD RESUME
            </motion.button>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      <div className="min-h-screen bg-white dark:bg-gray-950 relative">
        <main className="container mx-auto px-4 py-16 max-w-5xl">
          {/* Working with Me Section - Brutalist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="text-6xl font-black mb-16 text-black dark:text-white tracking-tight">
              WORKING<br />WITH ME
            </h2>
            
            {/* Asymmetric Layout */}
            <div className="space-y-12">
              {/* Philosophy - Full Width */}
              <div className="bg-[#b6da9b] p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <h3 className="text-3xl font-black mb-4 text-black tracking-tight">PHILOSOPHY</h3>
                <p className="text-xl text-black font-medium leading-tight max-w-3xl">
                  {workingWithMe.philosophy}
                </p>
              </div>

              {/* Style & Skills - Broken Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Style */}
                <div className="lg:col-span-2 bg-black dark:bg-white p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <h3 className="text-3xl font-black mb-4 text-white dark:text-black tracking-tight">STYLE</h3>
                  <p className="text-lg text-gray-200 dark:text-gray-800 font-medium leading-tight">
                    {workingWithMe.style}
                  </p>
                </div>

                {/* Professional Skills */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6">
                  <h3 className="text-2xl font-black mb-6 text-black dark:text-white tracking-tight">SKILLS</h3>
                  <div className="space-y-3">
                    {workingWithMe.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-[#b6da9b] px-4 py-2 text-black font-bold text-sm tracking-wide"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Technical Skills - Brutalist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-24"
          >
            <h2 className="text-5xl font-black mb-16 text-black dark:text-white tracking-tight">
              TECHNICAL<br />EXPERTISE
            </h2>
            
            {/* Broken Grid Layout */}
            <div className="space-y-8">
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className={`p-6 ${
                    index % 3 === 0 
                      ? 'bg-[#b6da9b] text-black ml-0 mr-8' 
                      : index % 3 === 1 
                      ? 'bg-black dark:bg-white text-white dark:text-black ml-8 mr-0' 
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white ml-4 mr-4'
                  } transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-300`}
                >
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{skill.category}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {skill.items.map((item, i) => (
                      <div key={i} className="text-sm font-bold tracking-wide">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Beyond Code - Musical Interests with Paper Instruments */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-24 relative"
          >
            <h2 className="text-6xl font-black mb-16 text-black dark:text-white tracking-tight">
              BEYOND<br />CODE
            </h2>
            
            
            {/* Interactive Musical Elements */}
            <div className="space-y-12">
              {/* Guitar Section */}
              <div 
                className="group cursor-pointer relative"
                onMouseEnter={() => {/* Add hover sound effect later */}}
              >
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="bg-[#b6da9b] p-8 flex-1 transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                    <h3 className="text-4xl font-black mb-4 text-black tracking-tight">TAYLOR 314CE</h3>
                    <p className="text-xl text-black font-medium">
                      I've played guitar since I was 12 and finally got my dream guitar.
                    </p>
                  </div>
                  
                  {/* Paper Guitar Image */}
                  <div className="w-48 transform rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <Image
                      src="/assets/images/taylor-guitar.png"
                      alt="Taylor 314ce Guitar"
                      width={192}
                      height={256}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Piano & Sax Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Piano */}
                <div className="group cursor-pointer">
                  {/* Piano Image - Above Piano Text on Desktop */}
                  <div className="hidden lg:block mb-6 transform -rotate-1 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <Image
                      src="/assets/images/kurzweil-piano.png"
                      alt="Kurzweil Piano"
                      width={400}
                      height={128}
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <div className="bg-black dark:bg-white p-8 transform rotate-1 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                    <h3 className="text-3xl font-black mb-4 text-white dark:text-black tracking-tight">PIANO</h3>
                    <p className="text-lg text-gray-200 dark:text-gray-800 font-medium">
                      Classical foundations meet contemporary exploration
                    </p>
                  </div>
                  
                  {/* Mobile Piano Image */}
                  <div className="lg:hidden mt-6 transform rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <Image
                      src="/assets/images/kurzweil-piano.png"
                      alt="Kurzweil Piano"
                      width={300}
                      height={96}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Saxophone - Learning */}
                <div className="group cursor-pointer relative">
                  <div className="bg-gray-100 dark:bg-gray-800 p-8 transform -rotate-1 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                    <h3 className="text-3xl font-black mb-4 text-black dark:text-white tracking-tight">SAXOPHONE</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                      Currently exploring jazz fundamentals
                    </p>
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-[#b6da9b] text-black text-xs font-black px-3 py-1 transform rotate-12">
                        LEARNING
                      </span>
                    </div>
                  </div>
                  
                  {/* Paper Sax Placeholder */}
                  <div className="absolute -right-4 -bottom-4 w-32 h-40 bg-amber-100 dark:bg-amber-200 flex items-center justify-center transform rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-md group-hover:shadow-xl">
                    <div className="text-center">
                      <Music className="w-8 h-8 mx-auto text-amber-600 mb-1" />
                      <p className="text-xs font-black text-amber-800">SAX IMAGE<br />PLACEHOLDER</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mac Miller Inspiration */}
              <div className="bg-[#b6da9b] p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300 max-w-2xl ml-auto">
                <h3 className="text-3xl font-black mb-4 text-black tracking-tight">MAC MILLER VIBES</h3>
                <p className="text-lg text-black font-medium">
                  Drawing inspiration from artists who dedicate themselves to their craft. The same precision and creativity that goes into music flows into code.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Download Resume CTA - Brutalist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-black dark:bg-white p-12 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <h2 className="text-5xl font-black mb-8 text-white dark:text-black tracking-tight">
                WANT THE<br />FULL STORY?
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-700 font-medium mb-12 max-w-2xl mx-auto">
                Download my detailed resume for complete professional experience and technical expertise.
              </p>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 bg-[#b6da9b] text-black px-12 py-6 font-black text-2xl tracking-tight transform rotate-2 hover:rotate-0 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <Download className="w-8 h-8" />
                DOWNLOAD RESUME
              </motion.button>
            </div>
          </motion.section>
        </main>

        <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          © {new Date().getFullYear()} WorksbyCarlos. All rights reserved.
        </footer>
      </div>
    </>
  );
}
