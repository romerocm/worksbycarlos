import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const jokes = [
    {
      setup: "Why do DevOps engineers prefer dark mode?",
      punchline: "Because light attracts bugs! 🐛",
    },
    {
      setup: "How do you comfort a JavaScript bug?",
      punchline: "You console it! 😅",
    },
    {
      setup: "Why did the developer go broke?",
      punchline: "Because he used up all his cache! 💰",
    },
    {
      setup: "What's the object-oriented way to become wealthy?",
      punchline: "Inheritance! 👑",
    },
    {
      setup: "Why do programmers hate nature?",
      punchline: "It has too many bugs! 🌿🐛",
    },
    {
      setup: "What do you call a programmer from Finland?",
      punchline: "Nerdic! 🇫🇮",
    },
    {
      setup: "Why did the Kubernetes pod break up with the service?",
      punchline: "It wasn’t getting enough traffic! 💔",
    },
    {
      setup: "What’s a DevOps engineer’s favorite type of music?",
      punchline: "Heavy Metal (as in, metal servers)! 🎸",
    },
    {
      setup: "Why did the Git commit refuse to push?",
      punchline: "It had too many unresolved conflicts! ⚔️",
    },
    {
      setup: "How does a site reliability engineer meditate?",
      punchline: "By watching logs flow by like a calm river. 🌊",
    },
  ];

  const devopsQuotes = [
    "“There are only 10 types of people in the world: those who understand binary and those who don’t.”",
    "“99 little bugs in the code, 99 little bugs... Take one down, patch it around, 127 little bugs in the code.”",
    "“I don’t always test my code, but when I do, I do it in production.”",
    "“Infrastructure as Code: because YAML wasn’t confusing enough already.”",
    "“Docker: turning ‘works on my machine’ into a universal truth.”",
    "“Kubernetes: making simple things complicated since 2014.”",
    "“Terraform: destroying your infrastructure with style since 2014.”",
    "“Git: where your code goes to develop trust issues.”",
    "“DevOps isn’t a job title. It’s a lifestyle choice... and possibly a cry for help.”",
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  const randomQuote =
    devopsQuotes[Math.floor(Math.random() * devopsQuotes.length)];
  const version = `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(
    Math.random() * 10
  )}.${Math.floor(Math.random() * 100)}`;

  const data = {
    version,
    daily_joke: randomJoke,
    wisdom_of_the_day: randomQuote,
    uptime: `${(Math.random() * 99.999).toFixed(3)}%`,
    all_jokes: jokes,
    bonus_quotes: devopsQuotes,
    warning:
      "⚠️  Use these jokes at your own risk. Carlos is not responsible for groaning coworkers or unexpected laughter in production.",
    pro_tip:
      "💡 Best served with coffee, logs, and a failed deployment to debug.",
    disclaimer:
      "No servers were harmed in the making of these jokes... probably.",
    easter_egg:
      "Try hitting this endpoint at 3:14 AM for something extra nerdy. 🥧",
  };

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Humor-Level": "Elite Dad Mode",
      "X-Groan-Factor": "Critical",
      "X-Powered-By": "Caffeine & Chaos",
      "X-Joke-Version": version,
    },
  });
}
