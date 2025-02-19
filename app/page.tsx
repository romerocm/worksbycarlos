"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; dx: number; dy: number; size: number }[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 20);
      
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
        ctx.fillStyle = 'rgba(123, 104, 238, 0.2)';
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123, 104, 238, ${0.2 * (1 - distance / 100)})`;
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

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
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
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-24">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
            style={{ y, opacity }}
          >
            <Card className="p-8 bg-[#7B68EE] dark:bg-[#5B4BC5] text-white h-full relative overflow-hidden group">
              <div className="relative z-10">
                <div className="mb-6 relative">
                  <div className="w-48 h-48 mx-auto relative animate-float-slow">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300 to-purple-400 opacity-50 blur-lg animate-float-reverse" />
                    <div className="relative w-full h-full rounded-full border-4 border-white/30 overflow-hidden">
                      <Image
                        src="/assets/images/profile.jpeg"
                        alt="Carlos"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
                <motion.h1 
                  className="text-5xl font-bold mb-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <TypewriterEffect text="Carlos Romero" />
                </motion.h1>
                <p className="text-lg mb-4 opacity-90 text-center">
                  Technology Leader in DevOps & UX/UI Design | Integrating
                  User-Centric Design & Seamless Deployment Processes
                </p>
                <div className="text-sm opacity-80 text-center">
                  cmromero.dev@gmail.com
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

          {/* Featured Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 md:col-span-2"
          >
            <Link href="/projects/health-platform">
              <Card className="group relative overflow-hidden h-[300px] cursor-pointer">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/images/aimedica-cover.png"
                    alt="AI MEDICA Project"
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Featured Project</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      AI MEDICA Platform
                    </h2>
                    <p className="text-sm opacity-90">
                      Next-generation healthcare infrastructure with seamless
                      security and automation
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 bg-[#98FB98] dark:bg-[#2E8B57] h-full">
              <div className="flex flex-col h-full">
                <div>
                  <span className="text-5xl font-bold mb-2">180+</span>
                  <span className="text-xl block">Servers Tamed</span>
                </div>
                <div className="mt-auto self-end">
                  <Coffee className="w-8 h-8 opacity-60" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 bg-[#FFB6C1] dark:bg-[#CD5C5C] h-full text-white">
              <div className="flex flex-col h-full">
                <div>
                  <span className="text-5xl font-bold mb-2">25+</span>
                  <span className="text-xl block">All-Nighters Pulled</span>
                </div>
                <div className="mt-auto self-end">
                  <Pizza className="w-8 h-8 opacity-60" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-1 md:col-span-2 lg:col-span-4"
          >
            <Card className="p-8 bg-gray-900 dark:bg-gray-800 text-white overflow-visible">
              <div className="flex flex-col">
                <div className="mb-6 relative">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold mb-2">
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
                              Click to see my favorite tools! 🚀
                              <div className="absolute w-3 h-3 bg-white dark:bg-gray-800 border-t border-r border-border rotate-45 -bottom-[7px] right-6 transform" />
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
                          className="text-white/70 hover:text-white hover:bg-white/10 relative touch-manipulation"
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
                  <p className="text-lg opacity-80">
                    Don't try this in production (or do, I'm not your dad)
                  </p>

                  <TerminalPopup 
                    isOpen={isTerminalOpen}
                    onClose={() => setIsTerminalOpen(false)}
                  />
                </div>

                <div className="overflow-x-scroll scrollbar-hide">
                  <div className="flex gap-8 items-center py-4 min-w-max w-full justify-end">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
                      className="w-16 h-16 hover:scale-110 transition-transform"
                      alt="Kubernetes"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
                      className="w-16 h-16 hover:scale-110 transition-transform"
                      alt="Terraform"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                      className="w-16 h-16 hover:scale-110 transition-transform"
                      alt="Docker"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                      className="w-16 h-16 hover:scale-110 transition-transform invert"
                      alt="GitHub"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                      className="w-16 h-16 hover:scale-110 transition-transform"
                      alt="Python"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg"
                      className="w-16 h-16 hover:scale-110 transition-transform"
                      alt="Ansible"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"
                      className="w-16 h-16 hover:scale-110 transition-transform"
                      alt="Nginx"
                    />
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
                      className="w-16 h-16 hover:scale-110 transition-transform dark:invert"
                      alt="AWS"
                    />
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