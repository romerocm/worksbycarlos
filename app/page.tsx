"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Play,
  Award,
  Briefcase,
  ArrowUpRight,
  Layout,
  Cloud,
  Palette,
  Code,
  Coffee,
  Pizza,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TerminalPopup } from "@/components/terminal-popup";

const PinkTerminalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="#FF79C6"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

interface ServiceCardProps {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  delay,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
      <motion.div
        className="relative bg-background border border-primary/10 p-6 rounded-2xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:-translate-y-1 h-full flex flex-col"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ArrowUpRight className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable particles on mobile for performance
    const isMobile = window.innerWidth < 768;
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      // Reduce particle count for better performance
      const particleCount = Math.floor(window.innerWidth / 30);

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const profileCardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    return () => clearTimeout(timer);
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

                {/* Status indicator */}
                <div className="flex items-center justify-center gap-2 mb-4 px-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm opacity-80 text-center">
                    Available for projects
                  </span>
                </div>

                <div className="text-sm opacity-80 text-center">
                  cmromero.dev@gmail.com
                </div>

                {/* Social links */}
                <div className="flex justify-center gap-4 mt-4">
                  <motion.a
                    href="https://github.com/romerocm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-4 h-4"
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
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </motion.a>
                </div>
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
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-2 h-2 border border-white/70 rounded-full"
                    />
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
                    <ArrowUpRight className="w-5 h-5 text-white" />
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
            className="col-span-1 md:col-span-1 row-span-1"
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
            className="col-span-1 md:col-span-1 row-span-1"
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
            className="col-span-1 md:col-span-1 row-span-1"
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
            className="col-span-1 md:col-span-1 row-span-1"
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
            className="col-span-1 md:col-span-4 row-span-1"
          >
            <Card className="p-6 bg-gray-900 dark:bg-gray-800 text-white h-full overflow-visible">
              <div className="flex flex-col h-full">
                <div className="mb-3 relative">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl font-bold mb-1">
                      curl | bash My Favorites
                    </h3>
                    <div className="relative">
                      <AnimatePresence>
                        {showTooltip && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-white dark:bg-gray-800 text-black dark:text-white text-sm rounded-lg shadow-lg border border-border"
                            style={{
                              filter: "drop-shadow(0 0 8px rgba(0,0,0,0.1))",
                            }}
                          >
                            <div className="relative">
                              Click the pink terminal icon to see my favorite
                              tools! 🚀
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/70 hover:text-white hover:bg-white/20 relative touch-manipulation cursor-pointer border border-white/20 hover:border-white/40 transition-all duration-300"
                          onClick={() => {
                            setIsTerminalOpen(true);
                            setShowTooltip(false);
                          }}
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          >
                            <PinkTerminalIcon />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <p className="text-sm md:text-base opacity-80">
                    Don't try this in production (or do, I'm not your dad)
                  </p>

                  <TerminalPopup
                    isOpen={isTerminalOpen}
                    onClose={() => setIsTerminalOpen(false)}
                  />
                </div>

                {/* Interactive Tech Cloud - Responsive design */}
                <div className="relative h-24 md:h-32 overflow-hidden">
                  <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 md:gap-6 p-2 md:p-4">
                    {[
                      {
                        name: "Kubernetes",
                        icon: "kubernetes/kubernetes-plain.svg",
                        size: "w-12 h-12 md:w-16 md:h-16",
                        delay: 0,
                      },
                      {
                        name: "Terraform",
                        icon: "terraform/terraform-original.svg",
                        size: "w-10 h-10 md:w-14 md:h-14",
                        delay: 0.1,
                      },
                      {
                        name: "Docker",
                        icon: "docker/docker-original.svg",
                        size: "w-14 h-14 md:w-20 md:h-20",
                        delay: 0.2,
                      },
                      {
                        name: "Python",
                        icon: "python/python-original.svg",
                        size: "w-12 h-12 md:w-16 md:h-16",
                        delay: 0.3,
                      },
                      {
                        name: "AWS",
                        icon: "amazonwebservices/amazonwebservices-plain-wordmark.svg",
                        size: "w-12 h-12 md:w-18 md:h-18",
                        delay: 0.4,
                      },
                      {
                        name: "Ansible",
                        icon: "ansible/ansible-original.svg",
                        size: "w-10 h-10 md:w-14 md:h-14",
                        delay: 0.5,
                      },
                      {
                        name: "GitHub",
                        icon: "github/github-original.svg",
                        size: "w-10 h-10 md:w-14 md:h-14",
                        delay: 0.6,
                      },
                      {
                        name: "Nginx",
                        icon: "nginx/nginx-original.svg",
                        size: "w-12 h-12 md:w-16 md:h-16",
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
                            (window.innerWidth > 768 ? 20 : 10)
                          }px, ${
                            Math.cos(index * 0.7) *
                            (window.innerWidth > 768 ? 15 : 8)
                          }px)`,
                        }}
                      >
                        <motion.img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}`}
                          className={`${
                            tech.size
                          } transition-all duration-300 ${
                            tech.name === "GitHub" || tech.name === "AWS"
                              ? "dark:invert"
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
                        {/* Tooltip - hidden on touch devices */}
                        <motion.div
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 hidden md:block"
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                        >
                          {tech.name}
                        </motion.div>
                      </motion.div>
                    ))}
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
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How I Turn Chaos into Code
          </motion.h2>
          <motion.div
            className="inline-block px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Carlos's Toolkit of Tricks
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={Layout}
              title="DevOps Sorcery"
              description="Turning 'It works on my machine' into 'It works everywhere' faster than you can say 'git push'. CI/CD pipelines are my magic wands."
              delay={0.2}
            />
            <ServiceCard
              icon={Cloud}
              title="Cloud Whispering"
              description="Making clouds rain efficiency. Your servers will thank you, and so will your wallet. AWS, GCP, and Azure are my playgrounds."
              delay={0.3}
            />
            <ServiceCard
              icon={Palette}
              title="Infrastructure Artistry"
              description="Painting beautiful landscapes of servers and services. It's like Bob Ross, but with more Kubernetes clusters and Docker containers."
              delay={0.4}
            />
            <ServiceCard
              icon={Code}
              title="Code Telepathy"
              description="Reading between the lines of your infrastructure. I speak fluent Python, Terraform, and Sarcasm. Ansible playbooks are my bedtime stories."
              delay={0.5}
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
