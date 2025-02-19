"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { Copy, Mail, Calendar, MessageSquare, Check, ExternalLink } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Cal, { getCalApi } from "@calcom/embed-react"

type ContactMethod = 'form' | 'chat' | 'call' | null

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string | { question: string; options: string[] }
  selected?: string
}

export default function Contact() {
  const [activeMethod, setActiveMethod] = useState<ContactMethod>(null)
  const [greeting, setGreeting] = useState('')
  const [currentMonth, setCurrentMonth] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const initialQuestion: ChatMessage = {
    id: '1',
    type: 'bot',
    content: {
      question: "Hi! I'm Carlos. What would you like to know about?",
      options: [
        "Tell me about your experience",
        "What services do you offer?",
        "Do you own a design studio?",
        "What's your tech stack?"
      ]
    }
  }

  const responses: Record<string, ChatMessage> = {
    "Tell me about your experience": {
      id: 'exp',
      type: 'bot',
      content: "I have over 8 years of experience in DevOps and cloud engineering. I've worked with major companies in healthcare, banking, and technology sectors. Currently, I'm focusing on platform engineering at AI MEDICA.",
    },
    "What services do you offer?": {
      id: 'services',
      type: 'bot',
      content: {
        question: "I offer several services. Which area interests you most?",
        options: [
          "Cloud Infrastructure",
          "DevOps Automation",
          "Platform Engineering",
          "Security Implementation"
        ]
      }
    },
    "Do you own a design studio?": {
      id: 'studio',
      type: 'bot',
      content: "Yes! I own Vimi Studio (vimistudio.com), where we focus on creating beautiful and functional digital experiences. We combine design excellence with technical expertise to deliver outstanding results.",
    },
    "What's your tech stack?": {
      id: 'tech',
      type: 'bot',
      content: "I work with a wide range of technologies including AWS, GCP, Azure, Kubernetes, Terraform, Docker, and various CI/CD tools. For specific projects, I choose the best tools that fit the requirements.",
    },
    "Cloud Infrastructure": {
      id: 'cloud',
      type: 'bot',
      content: "I specialize in AWS, GCP, and Azure, focusing on scalable, secure, and cost-effective cloud solutions. Want to discuss your cloud needs?"
    },
    "DevOps Automation": {
      id: 'devops',
      type: 'bot',
      content: "I can help automate your development workflow using tools like GitHub Actions, GitLab CI, and Jenkins. Let's make your deployments faster and more reliable."
    },
    "Platform Engineering": {
      id: 'platform',
      type: 'bot',
      content: "I build robust platforms using Kubernetes, service mesh, and modern observability tools. Ready to modernize your infrastructure?"
    },
    "Security Implementation": {
      id: 'security',
      type: 'bot',
      content: "Security is crucial. I implement zero-trust architectures, IAM policies, and compliance frameworks to keep your systems secure."
    }
  }

  const generateMessageId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    ;(async () => {
      const cal = await getCalApi()
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#7B68EE" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
    })()

    const now = new Date()
    const currentMonthName = now.toLocaleString("default", { month: "long" })
    const currentYear = now.getFullYear()
    setCurrentMonth(`${currentMonthName} ${currentYear}`)
  }, [])

  useEffect(() => {
    if (activeMethod === 'chat') {
      setMessages([initialQuestion])
    }
  }, [activeMethod])

  const handleOptionClick = (option: string) => {
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      type: 'user',
      content: option,
    }
    
    const botResponse = {
      ...responses[option],
      id: generateMessageId()
    }
    
    setMessages(prev => [...prev, userMessage, botResponse])
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText('cmromero.dev@gmail.com')
    setCopied(true)
    toast({
      title: "Email copied to clipboard! 📋",
      description: "Feel free to reach out anytime.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const contactMethods = [
    {
      id: 'form',
      title: 'Send a Message',
      icon: Mail,
      description: "Get my email address to contact me directly"
    },
    {
      id: 'call',
      title: 'Schedule a Call',
      icon: Calendar,
      description: 'Book a time that works best for you'
    },
    {
      id: 'chat',
      title: 'Quick Chat',
      icon: MessageSquare,
      description: 'Get quick answers to common questions'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background/50 relative">
      <div className="animated-gradient-background" />
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {greeting}! 👋
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              How can I help you today?
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <AnimatePresence mode="wait">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <Card 
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      activeMethod === method.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setActiveMethod(method.id as ContactMethod)}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <method.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">{method.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {activeMethod === 'form' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <Card className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Mail className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Email Me Directly</h3>
                    <p className="text-muted-foreground mb-6">
                      I typically respond within 24 hours
                    </p>
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-lg mb-4">
                      <span className="text-lg">cmromero.dev@gmail.com</span>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={copyEmail}
                        className="ml-2"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeMethod === 'call' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                    <p className="text-lg">Available for calls</p>
                  </div>
                  <p className="text-lg">New spots open for {currentMonth}</p>
                </div>
                <div className="w-full">
                  <Cal
                    calLink="worksbycarlos"
                    style={{ width: "100%", height: "100%", minHeight: "600px" }}
                    config={{
                      name: "WorksbyCarlos",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {activeMethod === 'chat' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 max-w-2xl mx-auto"
              >
                <Card className="p-4">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.type === 'bot' && (
                            <div className="flex gap-2 max-w-[80%]">
                              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                  src="https://media.licdn.com/dms/image/v2/D4E03AQFOEltQwyEO3A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724316058019?e=1743638400&v=beta&t=5XmN3Nryg_VxEIvI9oP_8lddYAU4Zt8JqKS2y-acmRE"
                                  alt="Carlos"
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                {typeof message.content === 'string' ? (
                                  <p>{message.content}</p>
                                ) : (
                                  <div className="space-y-4">
                                    <p>{message.content.question}</p>
                                    <div className="grid gap-2">
                                      {message.content.options.map((option) => (
                                        <Button
                                          key={option}
                                          variant="outline"
                                          className="justify-start"
                                          onClick={() => handleOptionClick(option)}
                                        >
                                          {option}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          {message.type === 'user' && (
                            <div className="bg-primary text-primary-foreground p-4 rounded-lg max-w-[80%]">
                              <p>{message.content}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t"
          >
            <p className="text-center text-muted-foreground mb-6">
              Connect with me on social media or check out my design studio
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" asChild>
                <a 
                  href="https://github.com/romerocm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a 
                  href="https://linkedin.com/in/romerocm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a 
                  href="https://vimistudio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Vimi Studio
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} WorksbyCarlos. All rights reserved.
      </footer>
    </div>
  )
}