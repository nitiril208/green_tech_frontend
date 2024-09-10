/** @type {import('tailwindcss').Config} */

module.exports = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-button": "#00778B",
        "secondary-button": "#64A70B",
        "primary-bg": "var(--rkp-primary-color)",

        white: "#fff",
        silver: "#b9b9b9",
        olivedrab: "#4c7d0a",
        dimgray: {
          100: "#4e5566",
          200: "#555454",
        },
        yellowgreen: {
          100: "#76bc42",
          200: "#64a70b",
        },
        lightgreen: "#c1ef85",
        darkslategray: {
          100: "#3a3a3a",
          200: "#042937",
          300: "#002a3a",
        },
        glacier: {
          300: "#7AB3C0",
          800: "#00778B",
        },
        black: "#000",
        teal: "#00778b",
        gainsboro: {
          100: "#e8e8e8",
          200: "#d9d9d9",
        },
        darkgray: "#adabab",
        lightslategray: "#7c878e",
        skyblue: "#71b2c9",
        ghostwhite: "#f7f8fc",
        steelblue: {
          100: "#1762a7",
          200: "rgba(11, 101, 167, 0.75)",
        },
        paleturquoise: "#acebf5",
        gray: {
          100: "#fafafa",
          200: "#898989",
          300: "#332727",
          400: "#202020",
          500: "rgba(255, 255, 255, 0.5)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      fontFamily: {
        inter: "Inter",
        "d-din-pro": "D-DIN-PRO",
        calibri: "Calibri",
        "uni-neue-trial": "'Uni Neue-Trial'",
        UniNeue: "UniNeue",
        Poppins: "Poppins",
        abhaya: ["Abhaya Libre", "serif"],
        nunito: ["Nunito Sans", "sans"],
        greatvibes: ["Great Vibes", "cursive"],
        droid: ["Droid Regular", "Sans"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
