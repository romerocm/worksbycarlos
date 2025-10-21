import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isCurl = userAgent.toLowerCase().includes('curl')
  
  const data = {
    message: "Don't try this in production (or do, I'm not your dad) 🤷‍♂️",
    author: "Carlos Romero",
    role: "DevOps Engineer & Platform Architect",
    motto: "Scalable Infrastructure. Reliable Systems.",
    tech_stack: {
      cloud_platforms: [
        "AWS ☁️",
        "Google Cloud Platform 🌤️", 
        "Microsoft Azure 🌩️"
      ],
      infrastructure: [
        "Terraform 🏗️",
        "Kubernetes ⎈",
        "Docker 🐳",
        "Ansible 📜"
      ],
      languages: [
        "Python 🐍",
        "TypeScript/JavaScript 📜",
        "Go 🔥",
        "Bash 💻"
      ],
      cicd: [
        "GitHub Actions 🚀",
        "GitLab CI 🦊",
        "Jenkins 🔧"
      ],
      monitoring: [
        "Prometheus 📊",
        "Grafana 📈",
        "ELK Stack 🔍",
        "Airflow 🌊"
      ],
      databases: [
        "PostgreSQL 🐘",
        "MySQL 🐬",
        "Redis ⚡",
        "MongoDB 🍃"
      ]
    },
    favorite_tools: [
      {
        name: "kubectl",
        description: "Because YAML is a lifestyle choice",
        danger_level: "🔥🔥🔥"
      },
      {
        name: "terraform",
        description: "Infrastructure as Code (and occasionally as Chaos)",
        danger_level: "🔥🔥🔥🔥"
      },
      {
        name: "docker",
        description: "It works on my container",
        danger_level: "🔥🔥"
      },
      {
        name: "vim",
        description: "How to exit? That's the real DevOps challenge",
        danger_level: "🔥🔥🔥🔥🔥"
      }
    ],
    quotes: [
      "Infrastructure as Code is just fancy YAML with commitment issues",
      "There are only 10 types of people: those who understand containers and those who don't",
      "I don't always test my code, but when I do, I make sure not to deploy it on fridays",
      "99.9% uptime means 8.77 hours of downtime per year (but who's counting?)"
    ],
    contact: {
      email: "cmromero.dev@gmail.com",
      website: "https://worksbycarlos.com",
      portfolio: "Check out my projects at /projects",
      fun_fact: "I own Vimi Studio (vimistudio.com) too!"
    },
    api_endpoints: {
      "/api/stack": "You are here! 📍",
      "/api/whoami": "Brief bio in JSON format",
      "/api/jokes": "DevOps humor (use at your own risk)",
      "/api/tools": "Detailed favorite tools"
    },
    easter_egg: isCurl ? "🎉 Nice! You used curl like a true developer!" : "Try this with curl for a special message! 😉"
  }

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Powered-By': 'Coffee and Kubernetes',
      'X-Carlos-Says': 'Hello from the command line!',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}