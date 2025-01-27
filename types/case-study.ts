export interface CaseStudy {
  id: string
  client: string
  title: string
  description: string
  year: string
  metrics?: {
    value: string
    label: string
  }
  tags: string[]
  scope: string[]
  stack: string[]
  industry: string[]
  thumbnail: string
  results: {
    title: string
    description: string
  }[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: "health-platform",
    client: "AI MEDICA",
    title: "Seamless Healthcare Platform Engineering",
    description: "Crafting a next-generation healthcare infrastructure that seamlessly blends security, automation, and innovation",
    year: "2024 - ONGOING",
    metrics: {
      value: "80%",
      label: "faster deployments"
    },
    tags: ["Healthcare", "AWS", "DevOps", "Security"],
    scope: ["Platform Engineering", "CI/CD", "Cloud Architecture"],
    stack: ["AWS ECS", "Terraform", "GitHub Actions", "Airflow"],
    industry: ["Healthcare", "Technology"],
    thumbnail: "/placeholder.svg?height=450&width=800",
    results: [
      {
        title: "Automated Cloud Excellence",
        description: "Engineered a sophisticated ECS/ECR infrastructure with seamless GitHub Actions integration, enabling continuous deployment that just works"
      },
      {
        title: "Enterprise-Grade Security",
        description: "Architected a zero-trust security framework with private networking, internal load balancers, and VPN access, ensuring data remains private and secure"
      },
      {
        title: "Development Velocity",
        description: "Implemented trunk-based development with intelligent versioning, dramatically reducing the time from commit to production while maintaining reliability"
      },
      {
        title: "Infrastructure as Code",
        description: "Created a comprehensive suite of Terraform modules that transform complex infrastructure into elegant, maintainable code"
      }
    ]
  },
  {
    id: "terraform-automation",
    client: "VIMIHOST",
    title: "Enterprise Infrastructure Automation",
    description: "Developing a comprehensive Terraform module library for multi-cloud infrastructure",
    year: "2023 - 2024",
    metrics: {
      value: "70%",
      label: "faster deployments"
    },
    tags: ["Infrastructure", "Automation", "Multi-cloud"],
    scope: ["Infrastructure as Code", "Cloud Architecture", "DevOps"],
    stack: ["Terraform", "AWS", "Azure", "GCP"],
    industry: ["Technology", "Enterprise"],
    thumbnail: "/placeholder.svg?height=450&width=800",
    results: [
      {
        title: "Deployment Efficiency",
        description: "Reduced infrastructure provisioning time from days to hours"
      },
      {
        title: "Standardization",
        description: "Implemented consistent infrastructure patterns across multiple cloud providers"
      },
      {
        title: "Cost Management",
        description: "Achieved 25% reduction in cloud spending through optimized resource allocation"
      }
    ]
  },
  {
    id: "kubernetes-platform",
    client: "RESULTIER",
    title: "Kubernetes Optimization Platform",
    description: "Building a custom Kubernetes cluster autoscaler for optimal resource utilization",
    year: "2023",
    metrics: {
      value: "40%",
      label: "resource optimization"
    },
    tags: ["Kubernetes", "Automation", "DevOps"],
    scope: ["Container Orchestration", "Automation", "Performance"],
    stack: ["Kubernetes", "Go", "Prometheus"],
    industry: ["Technology"],
    thumbnail: "/placeholder.svg?height=450&width=800",
    results: [
      {
        title: "Resource Optimization",
        description: "Improved cluster resource utilization by 40%"
      },
      {
        title: "Cost Reduction",
        description: "Reduced cloud infrastructure costs by 25% through intelligent scaling"
      },
      {
        title: "Performance Improvement",
        description: "Decreased application deployment time by 60%"
      }
    ]
  }
]

