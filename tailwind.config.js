export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"Lora"', 'serif'],
        ui: ['"Jost"', 'sans-serif'],
      },
      colors: {
        ink: '#1E2B3C',
        paper: '#FFFFFF',
        charcoal: '#2D2D2D',
        ash: '#7A7672',
        bone: '#C8C4BC',
        warm: '#F5F3EF',
        slate: '#1E2B3C',
      },
    },
  },
  plugins: [],
}