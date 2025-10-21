export const siteConfig = {
  // Feature toggles
  features: {
    blog: {
      enabled: false, // Set to true to show blog, false to hide it
    },
  },

  // Site metadata
  site: {
    name: "WorksbyCarlos",
    tagline: "Scalable Infrastructure. Reliable Systems.",
    description:
      "Personal portfolio of Carlos, a visionary technology leader specializing in DevOps, platform engineering, and infrastructure automation in the health sector.",
  },
} as const;
