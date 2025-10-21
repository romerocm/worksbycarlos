"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import {
  Play,
  Award,
  Briefcase,
  Coffee,
  Pizza,
  Sparkles,
  Terminal,
  Zap,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InteractiveTerminal } from "@/components/interactive-terminal";

function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable particles on mobile for performance
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
    }[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      if (typeof window !== "undefined") {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const createParticles = () => {
      particles = [];
      // Reduce particle count for better performance
      const particleCount =
        typeof window !== "undefined" ? Math.floor(window.innerWidth / 30) : 20;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(123, 104, 238, 0.2)";
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123, 104, 238, ${
              0.2 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}

const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default function Home() {
  const ref = useRef(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  // Interactive Terminal state
  const [showTerminal, setShowTerminal] = useState(false);

  // Terminal scroll detection - only show at bottom of page
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show terminal when user is within 100px of the bottom
      const isNearBottom = scrollTop + windowHeight >= docHeight - 100;
      setShowTerminal(isNearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background/50 relative" ref={ref}>
      <ParticleEffect />
      <div className="animated-gradient-background" />
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-24 auto-rows-[200px]">
          {/* Profile Section - Tetris square 2x2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 row-span-2"
          >
            <Card
              ref={profileCardRef}
              className="p-8 bg-[#7B68EE] dark:bg-[#5B4BC5] text-white h-full relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="mb-6 relative">
                  <div className="w-48 h-48 mx-auto relative animate-float-slow">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300 to-purple-400 opacity-50 blur-lg animate-float-reverse" />
                    <div className="relative w-full h-full rounded-full border-4 border-white/30 overflow-hidden group-hover:border-white/50 transition-all duration-300">
                      <Image
                        src="/assets/images/profile.png"
                        alt="Carlos"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Status badge - centered in lower portion */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="absolute bottom-2 right-4"
                    >
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg shadow-green-500/30 flex items-center gap-1.5 backdrop-blur-sm border border-green-400/30 whitespace-nowrap">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Available for projects
                      </div>
                    </motion.div>

                    {/* Social links positioned below status badge, centered */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                      className="absolute -bottom-6 right-4 flex gap-1"
                    >
                      <motion.a
                        href="https://github.com/romerocm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg border border-white/20"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </motion.a>
                      <motion.a
                        href="https://linkedin.com/in/romerocm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors shadow-lg border border-white/20"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
                <motion.h1
                  className="text-4xl lg:text-5xl font-bold mb-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <TypewriterEffect text="Carlos Romero" />
                </motion.h1>
                <p className="text-sm sm:text-base lg:text-lg mb-4 opacity-90 text-center px-2">
                  <span className="hidden sm:inline">
                    Technology Leader in{" "}
                  </span>
                  DevOps & UX/UI Design
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />

              {/* Interactive elements */}
              <motion.div
                className="absolute top-4 right-4 text-white/60"
                whileHover={{ scale: 1.1 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <motion.div
                className="absolute bottom-4 left-4 text-white/60"
                whileHover={{ scale: 1.1 }}
              >
                <Terminal className="w-6 h-6" />
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-4 text-white/60"
                whileHover={{ scale: 1.1 }}
              >
                <Zap className="w-6 h-6" />
              </motion.div>
            </Card>
          </motion.div>

          {/* Current Location - Tetris 2x1 piece */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 md:col-span-2 row-span-1"
          >
            <Card className="group relative overflow-hidden h-full cursor-pointer">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/images/sansalvador-cover.jpg"
                  alt="San Salvador, El Salvador"
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center mb-1">
                    <div className="flex items-center justify-center"></div>
                    <span className="text-xs opacity-90">Currently in</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">
                    San Salvador, El Salvador
                  </h3>
                  <p className="text-xs opacity-90">
                    CST • Available for remote work
                  </p>
                </div>
                <div className="absolute top-3 right-3 opacity-70">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Featured Project - Tetris 2x1 piece (second row) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1 md:col-span-2 row-span-1"
          >
            <Link href="/projects/health-platform">
              <Card className="group relative overflow-hidden h-full cursor-pointer">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/images/aimedica-cover.png"
                    alt="AI MEDICA Project"
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Play className="w-3 h-3" />
                      <span className="text-xs">Featured Project</span>
                    </div>
                    <h2 className="text-lg font-bold mb-1">
                      AI MEDICA Platform
                    </h2>
                    <p className="text-xs opacity-90">
                      Next-generation healthcare infrastructure
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Server Stats - 1x1 Tetris piece */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1 md:col-span-1 row-span-1 order-4 md:order-4"
          >
            <Card className="p-6 bg-[#98FB98] dark:bg-[#2E8B57] h-full group hover:scale-[1.02] transition-all duration-300 relative">
              <div className="flex flex-col h-full">
                <div>
                  <span className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    180+
                  </span>
                  <span className="text-lg block">Servers Tamed</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Coffee className="w-8 h-8 opacity-60" />
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* All-Nighters Stats - 1x1 Tetris piece */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-1 md:col-span-1 row-span-1 order-5 md:order-5"
          >
            <Card className="p-6 bg-[#FFB6C1] dark:bg-[#CD5C5C] h-full text-white group hover:scale-[1.02] transition-all duration-300 relative">
              <div className="flex flex-col h-full">
                <div>
                  <span className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    25+
                  </span>
                  <span className="text-lg block">All-Nighters</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Pizza className="w-8 h-8 opacity-60" />
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Experience Stats - 1x1 Tetris piece */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-1 md:col-span-1 row-span-1 order-6 md:order-6"
          >
            <Card className="p-6 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 dark:from-purple-600 dark:via-purple-700 dark:to-purple-800 h-full text-white group hover:scale-[1.02] transition-all duration-300 relative">
              <div className="flex flex-col h-full">
                <div>
                  <span className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    8+
                  </span>
                  <span className="text-lg block">Years XP</span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="w-8 h-8 opacity-60" />
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact/CTA - 1x1 Tetris piece */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="col-span-1 md:col-span-1 row-span-1 order-7 md:order-7"
          >
            <Link href="/contact">
              <Card className="p-6 bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 dark:from-orange-400 dark:via-orange-500 dark:to-orange-600 h-full text-white group hover:scale-[1.02] transition-all duration-300 relative cursor-pointer">
                <div className="flex flex-col h-full">
                  <div>
                    <span className="text-3xl font-bold mb-2 block">
                      Let's Talk
                    </span>
                    <span className="text-lg block opacity-90">
                      Start your project
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Briefcase className="w-6 h-6 opacity-60" />
                    </motion.div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Tech Stack Section - Full width Tetris piece */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="col-span-1 md:col-span-4 row-span-1 order-3 md:order-8"
          >
            <Card className="p-6 bg-gray-900 dark:bg-gray-800 text-white h-full overflow-visible">
              <div className="flex flex-col h-full">
                <div className="mb-3 relative">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl font-bold mb-1">
                      My Tech Stack
                    </h3>
                  </div>
                  <p className="text-sm md:text-base opacity-80">
                    Tools I use to build reliable, scalable solutions
                  </p>
                </div>

                {/* Interactive Tech Cloud - Responsive design */}
                <div className="relative h-40 md:h-56 overflow-hidden">
                  {/* Mobile: Horizontal scroll with auto-scroll and hints */}
                  <div className="relative md:hidden h-full">
                    {/* Gradient hints for scrollability */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

                    <motion.div
                      className="flex items-center gap-6 overflow-x-auto px-4 py-6 h-full scroll-smooth"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        WebkitOverflowScrolling: "touch",
                      }}
                      animate={{
                        x: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    >
                      {[
                        {
                          name: "Kubernetes",
                          icon: "kubernetes/kubernetes-plain.svg",
                          size: "w-16 h-16 flex-shrink-0",
                        },
                        {
                          name: "Terraform",
                          icon: "terraform/terraform-original.svg",
                          size: "w-14 h-14 flex-shrink-0",
                        },
                        {
                          name: "Docker",
                          icon: "docker/docker-original.svg",
                          size: "w-20 h-20 flex-shrink-0",
                        },
                        {
                          name: "Python",
                          icon: "python/python-original.svg",
                          size: "w-16 h-16 flex-shrink-0",
                        },
                        {
                          name: "AWS",
                          icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg",
                          size: "w-16 h-16 flex-shrink-0",
                        },
                        {
                          name: "Ansible",
                          icon: "ansible/ansible-plain.svg",
                          size: "w-14 h-14 flex-shrink-0",
                        },
                        {
                          name: "GitHub",
                          icon: "github/github-original.svg",
                          size: "w-14 h-14 flex-shrink-0",
                        },
                        {
                          name: "Nginx",
                          icon: "nginx/nginx-original.svg",
                          size: "w-16 h-16 flex-shrink-0",
                        },
                      ].map((tech, index) => (
                        <motion.div
                          key={`mobile-${tech.name}`}
                          className="group relative cursor-pointer touch-manipulation"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 1.05 }}
                        >
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}`}
                            className={`${
                              tech.size
                            } transition-all duration-300 ${
                              tech.name === "GitHub" ||
                              tech.name === "AWS" ||
                              tech.name === "Ansible"
                                ? "brightness-0 invert"
                                : ""
                            }`}
                            alt={tech.name}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Desktop: Floating animation */}
                  <div className="absolute inset-0 hidden md:flex md:flex-wrap md:items-center md:justify-start md:gap-6 md:p-4">
                    {[
                      {
                        name: "Kubernetes",
                        icon: "kubernetes/kubernetes-plain.svg",
                        size: "w-12 h-12 md:w-14 md:h-14",
                        delay: 0,
                      },
                      {
                        name: "Terraform",
                        icon: "terraform/terraform-original.svg",
                        size: "w-10 h-10 md:w-12 md:h-12",
                        delay: 0.1,
                      },
                      {
                        name: "Docker",
                        icon: "docker/docker-original.svg",
                        size: "w-14 h-14 md:w-16 md:h-16",
                        delay: 0.2,
                      },
                      {
                        name: "Python",
                        icon: "python/python-original.svg",
                        size: "w-12 h-12 md:w-14 md:h-14",
                        delay: 0.3,
                      },
                      {
                        name: "AWS",
                        icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg",
                        size: "w-12 h-12 md:w-16 md:h-16",
                        delay: 0.4,
                      },
                      {
                        name: "Ansible",
                        icon: "ansible/ansible-plain.svg",
                        size: "w-10 h-10 md:w-12 md:h-12",
                        delay: 0.5,
                      },
                      {
                        name: "GitHub",
                        icon: "github/github-original.svg",
                        size: "w-10 h-10 md:w-12 md:h-12",
                        delay: 0.6,
                      },
                      {
                        name: "Nginx",
                        icon: "nginx/nginx-original.svg",
                        size: "w-12 h-12 md:w-14 md:h-14",
                        delay: 0.7,
                      },
                    ].map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        className="group relative cursor-pointer touch-manipulation"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: tech.delay }}
                        whileHover={{ scale: 1.2, z: 10 }}
                        whileTap={{ scale: 1.1 }}
                        style={{
                          transform: `translate(${
                            Math.sin(index * 0.8) *
                            (typeof window !== "undefined" &&
                            window.innerWidth > 768
                              ? 15
                              : 8)
                          }px, ${
                            Math.cos(index * 0.7) *
                            (typeof window !== "undefined" &&
                            window.innerWidth > 768
                              ? 10
                              : 5)
                          }px)`,
                        }}
                      >
                        <motion.img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}`}
                          className={`${
                            tech.size
                          } transition-all duration-300 ${
                            tech.name === "GitHub"
                              ? "brightness-0 invert"
                              : tech.name === "AWS" || tech.name === "Ansible"
                              ? "brightness-0 invert"
                              : ""
                          }`}
                          alt={tech.name}
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 2 + index * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Add floating particles for the cloud effect - reduced on mobile */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.8, 0.2],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Interactive Terminal */}
      <InteractiveTerminal
        isVisible={showTerminal}
        onClose={() => setShowTerminal(false)}
      />
    </div>
  );
}
