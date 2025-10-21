import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const jokes = [
    {
      setup: "Why do DevOps engineers prefer dark mode?",
      punchline: "Because light attracts bugs! 🐛"
    },
    {
      setup: "How do you comfort a JavaScript bug?",
      punchline: "You console it! 😅"
    },
    {
      setup: "Why did the developer go broke?",
      punchline: "Because he used up all his cache! 💰"
    },
    {
      setup: "What's the object-oriented way to become wealthy?",
      punchline: "Inheritance! 👑"
    },
    {
      setup: "Why do programmers hate nature?",
      punchline: "It has too many bugs! 🌿🐛"
    },
    {
      setup: "What do you call a programmer from Finland?",
      punchline: "Nerdic! 🇫🇮"
    },
    {
      setup: "Why did the kubernetes pod break up with the service?",
      punchline: "It wasn't getting enough traffic! 💔"
    },
    {
      setup: "What's a DevOps engineer's favorite type of music?",
      punchline: "Heavy Metal (as in, metal servers)! 🎸"
    }
  ]

  const devopsQuotes = [
    "There are only 10 types of people in the world: those who understand binary and those who don't.",
    "99 little bugs in the code, 99 little bugs. Take one down, patch it around, 127 little bugs in the code...",
    "I don't always test my code, but when I do, I do it in production.",
    "Infrastructure as Code is just fancy YAML with commitment issues.",
    "Docker containers: It works on my machine... and yours too!",
    "Kubernetes: Making simple things complicated since 2014.",
    "Terraform: Destroying your infrastructure with style since 2014.",
    "Git: Where your code goes to have trust issues."
  ]

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
  const randomQuote = devopsQuotes[Math.floor(Math.random() * devopsQuotes.length)]

  const data = {
    daily_joke: randomJoke,
    wisdom_of_the_day: randomQuote,
    all_jokes: jokes,
    bonus_quotes: devopsQuotes,
    warning: "⚠️  Use these jokes at your own risk. Carlos is not responsible for groaning coworkers or eye rolls.",
    pro_tip: "Best served with coffee and a side of patience.",
    disclaimer: "No servers were harmed in the making of these jokes... probably."
  }

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Humor-Level': 'Dad-joke-tier',
      'X-Groan-Factor': 'Maximum',
    },
  })
}