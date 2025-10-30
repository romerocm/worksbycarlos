"use client";

import { useRef, useEffect, useState } from "react";
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

// Custom hooks for micro-interactions
const useTypewriter = (
  text: string,
  speed: number = 100,
  startDelay: number = 0
) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) {
          setIsComplete(true);
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};

const useMagneticMouse = (strength: number = 0.2) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        if (distance < 100) {
          // Within 100px
          const force = Math.max(0, (100 - distance) / 100);
          setMousePos({
            x: distanceX * strength * force,
            y: distanceY * strength * force,
          });
        } else {
          setMousePos({ x: 0, y: 0 });
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [strength]);

  return {
    elementRef,
    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
  };
};

const workingWithMe = {
  philosophy:
    "I build like I create music: with precision, creativity, and harmony between all components.",
  style:
    "Systems thinker, infrastructure advocate, and composed during incidents.",
  skills: [
    "Strategic",
    "Analytical",
    "Collaborative",
    "Resilient",
    "Efficiency-driven",
    "Problem Solver",
  ],
};

const technicalSkills = [
  {
    category: "PLATFORM SKILLS",
    items: [
      "AWS",
      "GCP",
      "Azure",
      "Terraform",
      "Kubernetes",
      "Docker",
      "Ansible",
      "GitLab CI",
    ],
    icon: Cloud,
  },
  {
    category: "TECHNICAL SKILLS",
    items: [
      "Infrastructure as Code",
      "CI/CD Pipelines",
      "Monitoring & Observability",
      "Container Orchestration",
    ],
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

  // Typewriter effects
  const { displayedText: hiText, isComplete: hiComplete } = useTypewriter(
    "HI THERE,",
    80,
    1000
  );

  // Magnetic effects
  const cloudEngineerMagnetic = useMagneticMouse(0.15);
  const contactMagnetic = useMagneticMouse(0.1);

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
        className="relative h-screen w-screen flex items-center justify-start overflow-hidden bg-black"
      >
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ y: heroY }}
        >
          {/* Desktop Image with closer crop */}
          <motion.div
            className="hidden md:block w-full h-full transform scale-[1.8] translate-y-[-15%]"
            style={{
              y: useTransform(heroScrollProgress, [0, 1], ["0%", "20%"]),
            }}
          >
            <Image
              src="/assets/images/me-urban-large.png"
              alt="Carlos Romero - Cloud Engineer"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          {/* Mobile Image with proper coverage and zoom */}
          <motion.div
            className="block md:hidden w-full h-full transform scale-[1.4] translate-y-[-5%]"
            style={{
              y: useTransform(heroScrollProgress, [0, 1], ["0%", "15%"]),
            }}
          >
            <Image
              src="/assets/images/me-urban-large.png"
              alt="Carlos Romero - Cloud Engineer"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent"
            style={{
              opacity: useTransform(heroScrollProgress, [0, 1], [1, 0.7]),
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"
            style={{ height: "100px" }}
          />
        </motion.div>

        <div className="relative z-10 h-full flex items-end md:items-center justify-start container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-0">
          {/* Main Content - Brutalist Style */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Personal Greeting with Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="text-4xl md:text-6xl font-black leading-none tracking-tighter text-white mb-2 glitch-hover">
                {hiText}
                {!hiComplete && <span className="animate-pulse">|</span>}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{
                  opacity: hiComplete ? 1 : 0,
                  scale: hiComplete ? 1 : 0.8,
                  y: hiComplete ? 0 : 10,
                }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="bg-[#b6da9b] p-4 md:p-6 transform rotate-2 inline-block magnetic-element"
                ref={cloudEngineerMagnetic.elementRef}
                style={{
                  transform: `rotate(2deg) ${cloudEngineerMagnetic.transform}`,
                }}
              >
                <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter text-black">
                  I'M CARLOS
                </h1>
              </motion.div>
            </motion.div>

            {/* Cloud Engineer in Geometric Box */}
            {hiComplete && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-black p-4 md:p-6 transform -rotate-1 mb-12 max-w-fit"
              >
                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight glitch-hover">
                  CLOUD ENGINEER
                </h2>
              </motion.div>
            )}

            {/* Contact Info - Brutalist Style */}
            {hiComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 items-start"
                ref={contactMagnetic.elementRef}
                style={{ transform: contactMagnetic.transform }}
              >
                <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 transform rotate-1 heartbeat-hover magnetic-element">
                  <a
                    href="https://linkedin.com/in/romerocm"
                    className="flex items-center gap-2 md:gap-3 text-white hover:text-[#b6da9b] transition-colors font-bold text-sm md:text-lg"
                  >
                    <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                    <span>ROMEROCM</span>
                  </a>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 transform -rotate-1 heartbeat-hover magnetic-element">
                  <a
                    href="mailto:cmromero.dev@gmail.com"
                    className="flex items-center gap-2 md:gap-3 text-white hover:text-[#b6da9b] transition-colors font-bold text-sm md:text-lg"
                  >
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="hidden sm:inline">
                      CMROMERO.DEV@GMAIL.COM
                    </span>
                    <span className="sm:hidden">EMAIL</span>
                  </a>
                </div>
              </motion.div>
            )}

            {/* Brutalist Download Button */}
            {hiComplete && (
              <motion.a
                href="https://33vyi7jhxz3mujt2.public.blob.vercel-storage.com/CarlosRomero-CloudEngineer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="inline-flex items-center gap-4 bg-[#b6da9b] text-black px-12 py-6 font-black text-2xl tracking-tight transform -rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <Download className="w-8 h-8" />
                DOWNLOAD RESUME
              </motion.a>
            )}
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
            <h2 className="text-6xl font-black mb-16 text-black dark:text-white tracking-tight text-breathe glitch-hover">
              WORKING
              <br />
              WITH ME
            </h2>

            {/* Asymmetric Layout */}
            <div className="space-y-12">
              {/* Philosophy - Full Width */}
              <div className="bg-[#b6da9b] p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <h3 className="text-3xl font-black mb-4 text-black tracking-tight">
                  PHILOSOPHY
                </h3>
                <p className="text-xl text-black font-medium leading-tight max-w-3xl">
                  {workingWithMe.philosophy}
                </p>
              </div>

              {/* Style & Skills - Broken Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Style */}
                <div className="lg:col-span-2 bg-black dark:bg-white p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <h3 className="text-3xl font-black mb-4 text-white dark:text-black tracking-tight">
                    STYLE
                  </h3>
                  <p className="text-lg text-gray-200 dark:text-gray-800 font-medium leading-tight">
                    {workingWithMe.style}
                  </p>
                </div>

                {/* Professional Skills */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6">
                  <h3 className="text-2xl font-black mb-6 text-black dark:text-white tracking-tight">
                    SKILLS
                  </h3>
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
            <h2 className="text-5xl font-black mb-16 text-black dark:text-white tracking-tight text-breathe glitch-hover">
              TECHNICAL
              <br />
              EXPERTISE
            </h2>

            {/* Broken Grid Layout with Staggered Animations */}
            <div className="space-y-8">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`p-6 ${
                    index % 3 === 0
                      ? "bg-[#b6da9b] text-black ml-0 mr-8"
                      : index % 3 === 1
                      ? "bg-black dark:bg-white text-white dark:text-black ml-8 mr-0"
                      : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white ml-4 mr-4"
                  } transform ${
                    index % 2 === 0 ? "rotate-1" : "-rotate-1"
                  } hover:rotate-0 transition-transform duration-300`}
                  style={
                    {
                      "--initial-rotation": `${
                        index % 2 === 0 ? "1deg" : "-1deg"
                      }`,
                    } as any
                  }
                >
                  <h3 className="text-2xl font-black mb-4 tracking-tight glitch-hover">
                    {skill.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {skill.items.map((item, i) => (
                      <motion.div
                        key={i}
                        className="text-sm font-bold tracking-wide"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.2 + i * 0.1,
                        }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
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
            <h2 className="text-6xl font-black mb-16 text-black dark:text-white tracking-tight text-breathe glitch-hover">
              BEYOND
              <br />
              CODE
            </h2>

            {/* Interactive Musical Elements */}
            <div className="space-y-12">
              {/* Guitar Section */}
              <div
                className="group cursor-pointer relative"
                onMouseEnter={() => {
                  /* Add hover sound effect later */
                }}
              >
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="bg-[#b6da9b] p-8 flex-1 transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                    <h3 className="text-4xl font-black mb-4 text-black tracking-tight">
                      TAYLOR 314CE
                    </h3>
                    <p className="text-xl text-black font-medium">
                      I've been playing guitar since I was 12 and just recently
                      got one of my dream guitars – I've always wanted a Taylor.
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
                    <h3 className="text-3xl font-black mb-4 text-white dark:text-black tracking-tight">
                      KURZWEIL MP20F
                    </h3>
                    <p className="text-lg text-gray-200 dark:text-gray-800 font-medium">
                      Started playing piano in my early 20s and quickly fell in
                      love with it.
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
                    <h3 className="text-3xl font-black mb-4 text-black dark:text-white tracking-tight">
                      SAXOPHONE
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                      Currently exploring jazz fundamentals
                    </p>
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-[#b6da9b] text-black text-xs font-black px-3 py-1 transform rotate-12">
                        LEARNING
                      </span>
                    </div>
                  </div>

                  {/* Alto Saxophone Image - Positioned on the container */}
                  <div className="absolute -right-4 top-12 w-32 transform rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-md group-hover:shadow-xl">
                    <Image
                      src="/assets/images/alto-sax.png"
                      alt="Alto Saxophone"
                      width={128}
                      height={160}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Mac Miller & FKJ Section - Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Mac Miller Tiny Desk YouTube Embed */}
                <div className="transform -rotate-2 shadow-lg">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-sm"
                      src="https://www.youtube-nocookie.com/embed/QrR_gm6RqCo?si=LbLRZKtAzPxyNq0Z"
                      title="Mac Miller: NPR Music Tiny Desk Concert"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>

                {/* MAC MILLER & FKJ Text Box */}
                <div className="bg-[#b6da9b] p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <h3 className="text-3xl font-black mb-4 text-black tracking-tight">
                    LATELY I'VE BEEN INTO
                  </h3>
                  <p className="text-lg text-black font-medium">
                    Drawing inspiration from artists who dedicate themselves to
                    their craft. The same precision and creativity that goes
                    into my music flows into my code.
                  </p>
                </div>
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
                WANT THE
                <br />
                FULL STORY?
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-700 font-medium mb-12 max-w-2xl mx-auto">
                Download my detailed resume for complete professional experience
                and technical expertise.
              </p>
              <motion.a
                href="https://33vyi7jhxz3mujt2.public.blob.vercel-storage.com/CarlosRomero-CloudEngineer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 bg-[#b6da9b] text-black px-12 py-6 font-black text-2xl tracking-tight transform rotate-2 hover:rotate-0 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <Download className="w-8 h-8" />
                DOWNLOAD RESUME
              </motion.a>
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
