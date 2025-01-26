export interface CaseStudy {
  id: string
  client: string
  title: string
  description: string
  year: string
  funding?: string
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
    title: "Healthcare Platform Transformation",
    description: "Revolutionizing healthcare infrastructure with cloud-native solutions and HIPAA compliance",
    year: "2024 - ONGOING",
    funding: "$5.2M",
    tags: ["Healthcare", "Cloud Infrastructure", "HIPAA"],
    scope: ["Cloud Architecture", "DevOps", "Security"],
    stack: ["AWS", "Kubernetes", "Terraform"],
    industry: ["Healthcare", "Technology"],
    thumbnail: "/placeholder.svg?height=450&width=800",
    results: [
      {
        title: "Infrastructure Reliability",
        description: "Achieved 99.99% system reliability through implementation of robust cloud-native architecture"
      },
      {
        title: "Cost Optimization",
        description: "Reduced operational costs by 30% through efficient resource utilization and automation"
      },
      {
        title: "Security Compliance",
        description: "Implemented comprehensive HIPAA-compliant security measures across all system components"
      }
    ]
  },
  {
    id: "terraform-automation",
    client: "VIMIHOST",
    title: "Enterprise Infrastructure Automation",
    description: "Developing a comprehensive Terraform module library for multi-cloud infrastructure",
    year: "2023 - 2024",
    funding: "$2.8M",
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
    funding: "$1.5M",
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

