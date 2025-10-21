import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isCurl = userAgent.toLowerCase().includes('curl')
  
  const tools = {
    essential_weapons: {
      kubectl: {
        description: "The Swiss Army knife of Kubernetes. Can do everything except make your YAML valid.",
        danger_level: "🔥🔥🔥",
        pro_tip: "kubectl get pods --all-namespaces | grep -v Running (you're welcome)",
        reality_check: "Will make you question your life choices at 3 AM"
      },
      terraform: {
        description: "Infrastructure as Code. Emphasis on 'as Code' (meaning it will break spectacularly).",
        danger_level: "🔥🔥🔥🔥",
        pro_tip: "Always run 'terraform plan' twice. Trust, but verify.",
        reality_check: "terraform destroy --auto-approve is not a deployment strategy"
      },
      docker: {
        description: "Containerization magic. It works on my container, and yours too!",
        danger_level: "🔥🔥",
        pro_tip: "Docker build --no-cache when things get weird (which is often)",
        reality_check: "Your container is 2GB because you forgot to use multi-stage builds"
      },
      ansible: {
        description: "YAML-powered automation. Like Terraform's more organized cousin.",
        danger_level: "🔥🔥",
        pro_tip: "ansible-playbook --check --diff is your friend",
        reality_check: "Idempotency is a suggestion, not a guarantee"
      }
    },
    monitoring_arsenal: {
      prometheus: {
        description: "Metrics collection that never sleeps. Like your DevOps engineer.",
        danger_level: "🔥🔥",
        pro_tip: "rate(cpu_usage[5m]) > 0.8 means someone's having a bad day",
        reality_check: "Your dashboard has 47 graphs but you only look at 3"
      },
      grafana: {
        description: "Pretty graphs that make your metrics look professional.",
        danger_level: "🔥",
        pro_tip: "Red means bad, green means good (usually)",
        reality_check: "Correlation does not imply causation, but it makes great alerts"
      },
      elk_stack: {
        description: "Elasticsearch + Logstash + Kibana = Log analysis paradise",
        danger_level: "🔥🔥🔥",
        pro_tip: "grep is still faster for simple stuff (don't @ me)",
        reality_check: "Your log retention policy is 'forever' because storage is cheap, right?"
      }
    },
    editor_of_destiny: {
      vim: {
        description: "The editor that makes strong developers and breaks weak ones.",
        danger_level: "🔥🔥🔥🔥🔥",
        pro_tip: ":wq! saves everything. :q! saves nothing. Choose wisely.",
        reality_check: "You've been in insert mode for 3 hours",
        escape_plan: "ESC :q! (memorize this, thank me later)"
      }
    },
    secret_weapons: {
      jq: {
        description: "JSON processor that makes APIs bearable",
        danger_level: "🔥",
        pro_tip: "curl api/stack | jq '.tech_stack' (try it!)",
        reality_check: "You'll forget the syntax 5 minutes after using it"
      },
      tmux: {
        description: "Terminal multiplexer. Multiple sessions, one terminal, infinite possibilities.",
        danger_level: "🔥🔥",
        pro_tip: "Ctrl+b then % for vertical split, \" for horizontal",
        reality_check: "You have 47 tmux sessions running and forgot what they do"
      }
    },
    disclaimer: "Tools don't make the engineer, but coffee does ☕",
    easter_egg: isCurl ? "🎉 Curl detected! You're doing it right!" : "These tools love being curled! Try it! 😉"
  }

  return NextResponse.json(tools, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Tool-Count': Object.keys(tools.essential_weapons).length.toString(),
      'X-Danger-Level': 'Maximum',
      'X-Coffee-Required': 'Yes',
    },
  })
}