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
    thumbnail: "/assets/images/aimedica-cover.png",
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
    id: "autofacil-platform",
    client: "AUTOFACIL",
    title: "Azure DevOps Automation & CMS Deployment",
    description: "Implementing automated CI/CD pipelines and deploying a modern CMS solution with Orchard and Nuxt.js",
    year: "2021 - 2022",
    metrics: {
      value: "65%",
      label: "deployment efficiency"
    },
    tags: ["Azure", "DevOps", "CMS", "Terraform"],
    scope: ["CI/CD Automation", "Infrastructure as Code", "CMS Development"],
    stack: ["Azure DevOps", "Terraform", "Orchard CMS", "Nuxt.js"],
    industry: ["Automotive", "E-commerce"],
    thumbnail: "/assets/images/autofacil-cover.png",
    results: [
      {
        title: "CI/CD Automation",
        description: "Automated end-to-end deployment pipelines in Azure DevOps using Terraform, significantly reducing manual intervention"
      },
      {
        title: "Modern CMS Implementation",
        description: "Successfully deployed and configured Orchard CMS, providing a robust content management solution"
      },
      {
        title: "Frontend Optimization",
        description: "Deployed and optimized Nuxt.js frontend application, ensuring high performance and seamless user experience"
      }
    ]
  },
  {
    id: "credicomer-transformation",
    client: "CREDICOMER",
    title: "Banking Infrastructure Modernization",
    description: "Transforming legacy banking infrastructure into a modern microservices architecture with on-premise Kubernetes",
    year: "2020 - 2021",
    metrics: {
      value: "90%",
      label: "system reliability"
    },
    tags: ["Kubernetes", "DevOps", "Banking", "Infrastructure"],
    scope: ["Infrastructure Modernization", "DevOps Training", "Version Control"],
    stack: ["Kubernetes", "Docker", "GitLab", "IBM Power9"],
    industry: ["Banking", "Financial Services"],
    thumbnail: "/assets/images/credicomer-cover.png",
    results: [
      {
        title: "Infrastructure Modernization",
        description: "Successfully built and deployed Kubernetes infrastructure on IBM Power9 architecture, enabling microservices transformation"
      },
      {
        title: "Version Control Migration",
        description: "Implemented self-hosted GitLab solution and orchestrated complete repository migration to on-premise infrastructure"
      },
      {
        title: "Knowledge Transfer",
        description: "Conducted comprehensive Docker and Kubernetes training sessions, empowering bank employees with modern DevOps practices"
      },
      {
        title: "Security Compliance",
        description: "Ensured all implementations met strict banking security standards while enabling modern development practices"
      }
    ]
  }
]

