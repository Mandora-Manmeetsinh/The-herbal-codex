
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				playfair: ['"Playfair Display"', 'serif'],
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				// Custom color palette for Herbal Codex
				herb: {
					'green-dark': '#2D6A4F',
					'green': '#40916C',
					'green-light': '#52B788',
					'cream': '#F6F7E8',
					'brown': '#774936',
					'gold': '#D4AC2B',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"float": {
					"0%, 100%": {
						transform: "translateY(0)"
					},
					"50%": {
						transform: "translateY(-10px)"
					}
				},
				"sway": {
					"0%, 100%": {
						transform: "rotate(-3deg)"
					},
					"50%": {
						transform: "rotate(3deg)"
					}
				},
				"pulse-glow": {
					"0%, 100%": {
						boxShadow: "0 0 5px rgba(82, 183, 136, 0.2), 0 0 10px rgba(82, 183, 136, 0.2)"
					},
					"50%": {
						boxShadow: "0 0 10px rgba(82, 183, 136, 0.5), 0 0 20px rgba(82, 183, 136, 0.3)"
					}
				},
				"rotate-slow": {
					"0%": {
						transform: "rotate(0deg)"
					},
					"100%": {
						transform: "rotate(360deg)"
					}
				},
				"shimmer": {
					"0%": {
						backgroundPosition: "-200% 0"
					},
					"100%": {
						backgroundPosition: "200% 0"
					}
				},
				"leaf-fall": {
					"0%": {
						transform: "translateY(-10%) rotate(0deg)",
						opacity: "0"
					},
					"10%": {
						opacity: "1"
					},
					"100%": {
						transform: "translateY(100vh) rotate(360deg)",
						opacity: "0"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"float": "float 6s ease-in-out infinite",
				"sway": "sway 8s ease-in-out infinite",
				"pulse-glow": "pulse-glow 3s ease-in-out infinite",
				"rotate-slow": "rotate-slow 12s linear infinite",
				"shimmer": "shimmer 3s infinite",
				"leaf-fall": "leaf-fall 10s linear forwards"
			},
			backgroundImage: {
				'hero-pattern': "url('/herbs-bg.jpg')",
				'paper-texture': "url('/paper-texture.png')",
				'leaf-pattern': "url('/leaf-pattern.svg')",
			},
			transitionDelay: {
				'400': '400ms',
				'600': '600ms',
				'800': '800ms',
				'900': '900ms',
				'1100': '1100ms',
				'1200': '1200ms',
				'1500': '1500ms',
				'2000': '2000ms',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
