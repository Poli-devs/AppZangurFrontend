/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // === PALETA DE CONSISTENCIA ZANGUR ===
        
        // 1. BASE PROFESIONAL (Tableros, textos oscuros, estructura)
        corporate: {
          DEFAULT: '#0F172A', // Azul marino muy oscuro (casi negro). Serio.
          light: '#1E293B',   // Un poco más claro para el Sidebar del dashboard.
        },

        // 2. IDENTIDAD DE MARCA (Logo, toques sutiles)
        brand: {
          red: '#991B1B',     // Rojo profundo, no chillón.
        },

        // 3. ACCIÓN Y SALUD (Botones, éxito)
        action: {
          green: '#65A30D',   // Verde vibrante pero profesional. Invita al clic.
          hover: '#4D7C0F',   // Versión más oscura para cuando pones el mouse encima.
        },

        // 4. NEUTROS MODERNOS (Fondos limpios)
        bg: {
          app: '#F1F5F9',     // Gris muy pálido para el fondo detrás de las tarjetas.
          card: '#FFFFFF',    // Blanco puro para el contenido.
        }
      },
    },
  },
  plugins: [],
}