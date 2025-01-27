"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Play, Award, Briefcase, ArrowUpRight, Layout, Cloud, Palette, Code, Coffee, Pizza } from 'lucide-react'

const ServiceCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
      <motion.div
        className="relative bg-background border border-primary/10 p-6 rounded-2xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:-translate-y-1 h-full flex flex-col"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
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
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
          >
            <Card className="p-8 bg-[#7B68EE] dark:bg-[#5B4BC5] text-white h-full relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-6 relative">
                  <div className="w-48 h-48 mx-auto relative animate-float-slow">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300 to-purple-400 opacity-50 blur-lg animate-float-reverse" />
                    <div className="relative w-full h-full rounded-full border-4 border-white/30 overflow-hidden">
                      <Image
                        src="https://sjc.microlink.io/bM3FRxsyHGWzAW8evAK8l3uo_Cqndn7NmtYBpBp5mUH76sJm2ocrk7FEONauSUm3t3R3ns1mEupfM9yyZQ6BbQ.jpeg"
                        alt="Carlos"
                        fill
                        className="object-cover object-left"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <h1 className="text-5xl font-bold mb-4 text-center animate-float-delayed">
                  Carlos Romero
                </h1>
                <p className="text-lg mb-4 opacity-90 text-center animate-float-delayed">Technology Leader in DevOps & UX/UI Design | Integrating User-Centric Design & Seamless Deployment Processes</p>
                <div className="text-sm opacity-80 text-center">
                  cmromero.dev@gmail.com
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
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
                    <h2 className="text-2xl font-bold mb-2">AI MEDICA Platform</h2>
                    <p className="text-sm opacity-90">
                      Next-generation healthcare infrastructure with seamless security and automation
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
            <Card className="p-8 bg-gray-900 dark:bg-gray-800 text-white overflow-hidden">
              <div className="flex flex-col">
                <div className="mb-6 relative group">
                  <h3 className="text-3xl font-bold mb-2">curl | bash My Favorites</h3>
                  <p className="text-lg opacity-80">Don't try this in production (or do, I'm not your dad)</p>
                  
                  {/* Terminal Popup */}
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] scale-0 group-hover:scale-100 transition-transform duration-200 z-[9999] overflow-visible">
                    <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 terminal-shadow">
                      {/* Terminal Header */}
                      <div className="flex items-center p-2 border-b border-gray-700">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 text-center text-sm text-gray-400">bash</div>
                      </div>
                      
                      {/* Terminal Content */}
                      <div className="p-4 font-mono text-sm">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> $ curl https://api.worksbycarlos.dev/favorites.sh | bash
                        </motion.div>
                        <motion.pre
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                          className="mt-2 text-green-200"
                        >
{`# My DevOps Favorites
tools:
  - name: Kubernetes
    type: Container Orchestration
    love_level: Over 9000
  - name: Terraform
    type: Infrastructure as Code
    love_level: Maximum
  - name: Docker
    type: Containerization
    love_level: Infinite
  - name: GitHub Actions
    type: CI/CD
    love_level: Legendary
  - name: Python
    type: Automation
    love_level: Snake Charmer
  - name: Ansible
    type: Configuration Management
    love_level: Playbook Master
  - name: Nginx
    type: Web Server
    love_level: Proxy King
  - name: AWS
    type: Cloud Provider
    love_level: Cloud Native`}
                        </motion.pre>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-scroll scrollbar-hide">
                  <div className="flex gap-8 items-center py-4 min-w-max w-full justify-end">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" className="w-16 h-16 hover:scale-110 transition-transform" alt="Kubernetes" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" className="w-16 h-16 hover:scale-110 transition-transform" alt="Terraform" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" className="w-16 h-16 hover:scale-110 transition-transform" alt="Docker" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-16 h-16 hover:scale-110 transition-transform dark:invert" alt="GitHub" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-16 h-16 hover:scale-110 transition-transform" alt="Python" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" className="w-16 h-16 hover:scale-110 transition-transform" alt="Ansible" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" className="w-16 h-16 hover:scale-110 transition-transform" alt="Nginx" />
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" className="w-16 h-16 hover:scale-110 transition-transform dark:invert" alt="AWS" />
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
  )
}

