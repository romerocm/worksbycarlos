"use client"

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Cloud, Server, Database, Code, Github, DockIcon as Docker, Terminal, Award, Building2, MapPin, Mail, Linkedin } from 'lucide-react'

const experiences = [
  {
    company: "AI MEDICA",
    role: "Platform Engineer",
    period: "JULY 2024 - Current",
    description: [
      "Architected and implemented a cloud-native infrastructure on AWS, optimized for healthcare data processing and storage",
      "Designed and deployed a HIPAA-compliant environment, ensuring data security and privacy at all levels",
      "Implemented auto-scaling solutions that improved system responsiveness by 40% during peak usage periods"
    ],
    icon: Cloud
  },
  {
    company: "VIMIHOST",
    role: "DevOps Engineer",
    period: "Sep 2023 - Jun 2024 · 10 mos",
    description: [
      "Build and deploy Docker images for all projects, ensuring that applications are packaged with their dependencies for consistency across environments",
      "Design and implement Terraform configurations for provisioning and managing infrastructure across multiple environments",
      "Develop and maintain CI/CD pipelines to automate the build, test, and deployment"
    ],
    icon: Server
  },
  {
    company: "RESULTIER",
    role: "DevOps Manager",
    period: "2021 - JULY 2023 · 2 yr",
    description: [
      "Implement and manage continuous delivery pipelines for cloud-based applications, using tools such as Terraform and Ansible",
      "Administer Linux-based systems, including installing, configuring, and maintaining packages and services",
      "Mentor and train other engineers in cloud engineering best practices, including infrastructure as code and continuous integration/continuous delivery"
    ],
    icon: Code
  },
  {
    company: "RESULTIER",
    role: "Program Manager",
    period: "Jan 2022 - June 2023 · 1yr 5 mos",
    description: [
      "I was responsible for project kick-offs, retrospective sessions, and task prioritization in six different projects"
    ],
    icon: Award
  },
  {
    company: "ELANIIN TECH COMPANY",
    role: "Engineering Manager",
    period: "Feb 2021 - Jan 2022 · 1 yr",
    description: [
      "As an Engineering Manager, I have successfully led and managed engineering teams across multiple locations, catering to esteemed clients in the US",
      "Managed engineers across multiple teams and locations for US based clients",
      "Managed large product budgets and oversee medium to large-scale deployments",
      "Followed 1:1 meetings with team members to ensure satisfaction within the organization",
      "Led DevOps team and served as a mentor to help empower team members for their own professional and personal growth"
    ],
    icon: Building2
  },
  {
    company: "ELANIIN TECH COMPANY",
    role: "DevOps Engineer",
    period: "Nov 2019 - Feb 2021 · 1yr 4 mos",
    description: [
      "In charge of the maintenance, support, planning and design of cloud to comply with clients' needs",
      "Setting up development, testing and production environment",
      "Designing, implementing, and administrating high-availability, auto-scalable, and secure AWS infrastructure",
      "Building and deploying Docker images for all of our projects",
      "Developing products with CI / CD on Gitlab"
    ],
    icon: Docker
  }
]

const skills = [
  {
    category: "CLOUD PROVIDERS",
    items: ["AWS", "GCP", "Microsoft Azure", "DigitalOcean"],
    icon: Cloud
  },
  {
    category: "LINUX DISTRIBUTIONS",
    items: ["RHEL/CentOS", "UbuntuServer", "Debian", "FreeBSD"],
    icon: Terminal
  },
  {
    category: "HTTP SERVERS",
    items: ["Nginx", "Apache"],
    icon: Server
  },
  {
    category: "INFRASTRUCTURE",
    items: ["Docker", "Kubernetes", "Terraform", "Ansible"],
    icon: Database
  },
  {
    category: "CI/CD TOOLING",
    items: ["GitLabCI", "Github Actions", "CloudBuild / CloudRun", "Jenkins"],
    icon: Code
  },
  {
    category: "DATABASES",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
    icon: Database
  }
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const contactsRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const checkScroll = () => {
      if (contactsRef.current) {
        const isScrollable = contactsRef.current.scrollWidth > contactsRef.current.clientWidth
        if (isScrollable) {
          controls.start({
            x: [0, -10, 0],
            transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          })
        } else {
          controls.stop()
        }
      }
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [controls])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <h1 className="text-4xl font-bold mb-6">Cloud Engineer</h1>
          <div 
            ref={contactsRef}
            className="flex gap-4 text-muted-foreground overflow-x-auto pb-2 max-w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <motion.div 
              className="flex whitespace-nowrap"
              animate={controls}
            >
              <a href="https://linkedin.com/in/romerocm" className="flex items-center gap-2 hover:text-foreground transition-colors px-2">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <span>romerocm</span>
              </a>
              <a href="mailto:cmromero.dev@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors px-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>cmromero.dev@gmail.com</span>
              </a>
              <span className="flex items-center gap-2 px-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>San Salvador, El Salvador</span>
              </span>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Skills Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <h2 className="text-2xl font-bold mb-4">Core Technologies</h2>
            {skills.map((skill, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <skill.icon className="w-4 h-4" />
                  <h3 className="font-semibold">{skill.category}</h3>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {skill.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </motion.div>

          {/* Experience Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-9"
            ref={ref}
          >
            <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border" style={{ scaleY: scrollYProgress }} />
              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-12 relative"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0 animate-float">
                      <experience.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{experience.company}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground mb-4">
                        <span className="font-medium">{experience.role}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{experience.period}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        {experience.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

