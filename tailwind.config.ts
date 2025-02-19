import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            'blockquote p:first-of-type::before': {
              content: '""'
            },
            'blockquote p:last-of-type::after': {
              content: '""'
            },
            blockquote: {
              borderLeftColor: '#FF79C6',
              borderLeftWidth: '3px',
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              fontStyle: 'italic',
              '.dark &': {
                borderLeftColor: '#FF79C6',
                backgroundColor: 'hsl(var(--muted))',
                color: 'hsl(var(--foreground))',
              }
            },
            // Enhanced table styles
            table: {
              width: '100%',
              marginTop: '2rem',
              marginBottom: '2rem',
              borderCollapse: 'separate',
              borderSpacing: '0',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'hsl(var(--border))',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              '.dark &': {
                borderColor: 'hsl(var(--border))',
              }
            },
            'thead': {
              backgroundColor: 'hsl(var(--muted))',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'hsl(var(--border))',
              '.dark &': {
                backgroundColor: 'hsl(var(--muted))',
                borderBottomColor: 'hsl(var(--border))',
              }
            },
            'th': {
              padding: '0.75rem 1rem',
              fontWeight: '600',
              textAlign: 'left',
              color: 'hsl(var(--foreground))',
              '.dark &': {
                color: 'hsl(var(--foreground))',
              }
            },
            'tr': {
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'hsl(var(--border))',
              '.dark &': {
                borderBottomColor: 'hsl(var(--border))',
              }
            },
            'tr:last-child': {
              borderBottomWidth: '0',
            },
            'td': {
              padding: '0.75rem 1rem',
              verticalAlign: 'top',
              color: 'hsl(var(--foreground))',
              '.dark &': {
                color: 'hsl(var(--foreground))',
              }
            },
            'tr:nth-child(even)': {
              backgroundColor: 'hsl(var(--muted))',
              '.dark &': {
                backgroundColor: 'hsl(var(--muted))',
              }
            },
            img: {
              borderRadius: '0.5rem'
            },
            h2: {
              borderBottom: '3px solid #FF79C6',
              paddingBottom: '0.5rem',
              marginBottom: '1rem',
              '.dark &': {
                borderColor: '#FF79C6',
                opacity: '0.8'
              }
            },
            hr: {
              borderColor: '#FF79C6',
              borderWidth: '3px',
              opacity: '0.8',
              marginTop: '2rem',
              marginBottom: '2rem',
              '.dark &': {
                borderColor: '#FF79C6',
                opacity: '0.8'
              }
            },
            ul: {
              li: {
                '&::marker': {
                  color: 'hsl(var(--foreground))',
                  opacity: '0.8',
                  '.dark &': {
                    color: 'hsl(var(--foreground))',
                    opacity: '0.8'
                  }
                },
                '&::before': {
                  backgroundColor: 'hsl(var(--foreground))',
                  opacity: '0.8',
                  '.dark &': {
                    backgroundColor: 'hsl(var(--foreground))',
                    opacity: '0.8'
                  }
                }
              }
            },
            ol: {
              li: {
                '&::marker': {
                  color: 'hsl(var(--foreground))',
                  opacity: '0.8',
                  fontWeight: '600',
                  '.dark &': {
                    color: 'hsl(var(--foreground))',
                    opacity: '0.8'
                  }
                }
              }
            },
            code: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--primary))',
              fontWeight: '600',
              '.dark &': {
                backgroundColor: '#282A36',
                color: '#F8F8F2',
                '&::before': {
                  content: '""'
                },
                '&::after': {
                  content: '""'
                }
              }
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--primary))',
              borderRadius: '0.5rem',
              padding: '1rem',
              '.dark &': {
                backgroundColor: '#282A36',
                color: '#F8F8F2',
                border: '1px solid #44475A'
              }
            },
            '.token.comment': {
              color: '#6272A4'
            },
            '.token.string': {
              color: '#F1FA8C'
            },
            '.token.number': {
              color: '#BD93F9'
            },
            '.token.function': {
              color: '#50FA7B'
            },
            '.token.keyword': {
              color: '#FF79C6'
            },
            '.token.operator': {
              color: '#FF79C6'
            },
            '.token.punctuation': {
              color: '#F8F8F2'
            },
            '.token.property': {
              color: '#8BE9FD'
            },
            '.token.class-name': {
              color: '#8BE9FD'
            },
            maxWidth: 'none'
          }
        }
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
};

export default config;