import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isCurl = userAgent.toLowerCase().includes('curl')
  
  const data = {
    name: "Carlos Romero",
    role: "DevOps Engineer & Platform Architect",
    location: "Building the future, one YAML file at a time",
    experience: "8+ years turning coffee into infrastructure",
    specialties: [
      "Making servers behave (mostly)",
      "Kubernetes whispering",
      "Terraform archaeology",
      "Docker container therapy"
    ],
    current_status: "Probably debugging something in production 🔥",
    philosophy: "If it's not automated, it's not done",
    skills: {
      debugging: "Expert (unfortunately)",
      yaml_writing: "Dangerous",
      coffee_consumption: "Professional level",
      sleep_schedule: "What's that?"
    },
    achievements: [
      "Made Kubernetes actually work (twice!)",
      "Survived a terraform destroy --auto-approve",
      "Owner of Vimi Studio (vimistudio.com)",
      "Can exit vim (most of the time)"
    ],
    fun_facts: [
      "I speak fluent Python, Terraform, and Sarcasm",
      "Ansible playbooks are my bedtime stories",
      "I have a love-hate relationship with YAML (mostly hate)",
      "My ideal vacation involves no servers"
    ],
    contact: {
      email: "cmromero.dev@gmail.com",
      website: "https://worksbycarlos.com",
      studio: "https://vimistudio.com"
    },
    curl_appreciation: isCurl ? "You're using curl! I like you already 😎" : "Try me with curl for extra geek cred! 🤓"
  }

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Carlos-Status': 'Caffeinated and Ready',
      'X-Fun-Fact': 'This endpoint was written while listening to lo-fi hip hop',
    },
  })
}