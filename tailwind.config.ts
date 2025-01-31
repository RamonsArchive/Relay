import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: {
          "100": "#FFE8F0",
          "200": "#004BFE",
          "300": "#5982DA",
        },
        secondary: {
          "100": "#85A8FB",
          "200": "#8BC6FF",
          "300": "#95989A",
        },
        third: {
          "100": "#F7F7F7",
          "200": "#060934",
          "300": "#01020a",
          "400": "#333333",
        },
        white: {
          "100": "#e3e5fc",
          "200": "#f6f6fe",
          "300": "#f0f0f0",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
				"plex-sans": ["var(--font-plex-sans)"],
			},

      fontWeight: {
        thin: "100",
        extralight: "200",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},

      boxShadow: {
				100: "2px 2px 0px 0px rgb(0, 0, 0)",
				200: "2px 2px 0px 2px rgb(0, 0, 0)",
				300: "2px 2px 0px 2px rgb(238, 43, 105)",
			},
    },
  },
  plugins: [require("@tailwindcss/typography")], // might need to add tailwindcss-animate
} satisfies Config;
