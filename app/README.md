# CalcFlow - Modern Scientific Calculator

A beautifully designed, fully-featured scientific calculator built with **React + TypeScript + Vite**. Features glass-morphism UI, smooth animations, calculation history, and keyboard support.

**Built by [Huncho.Dev](https://huncho.dev)**

![CalcFlow](https://img.shields.io/badge/Built_with-React_19-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite&logoColor=white)

## Features

✨ **Modern UI Design**
- Glass-morphism aesthetic with backdrop blur effects
- Smooth Framer Motion animations
- Gradient backgrounds with dark/light theme support
- Responsive design that works on all devices

🧮 **Full Calculator Functionality**
- Basic arithmetic operations (+, −, ×, ÷)
- Decimal support
- Memory functions (MC, MR, M+, M−, MS)
- Percentage calculations
- Error handling with visual feedback

🔬 **Scientific Mode**
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Power and root operations (√, x², x³, x!, 1/x)
- Mathematical constants (π, e)

📱 **User Experience**
- Full keyboard support (0-9, +, −, ×, ÷, =, Backspace, Escape)
- Calculation history with persistent storage
- Sound effects (toggleable)
- Responsive button interactions
- Real-time expression display

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or download the project
cd app

# Install dependencies
npm install

# Start development server
npm run dev
```

The calculator will be available at `http://localhost:3000/`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## Project Structure

```
src/
├── App.tsx                    # Root component with theme management
├── main.tsx                   # Application entry point
├── index.css                  # Global styles & glass utilities
├── components/
│   ├── Calculator.tsx        # Main calculator interface
│   ├── CalculatorButton.tsx  # Reusable button component
│   ├── CalculatorDisplay.tsx # Display & expression output
│   └── HistoryPanel.tsx      # History sidebar panel
├── hooks/
│   ├── useCalculator.ts      # Calculator logic & state
│   └── useSound.ts           # Audio feedback system
└── lib/
    └── utils.ts              # Utility helpers
```

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS + Custom utilities
- **Icons:** Lucide React
- **Dev Tools:** ESLint, TypeScript

## Available Scripts

- `npm run dev` - Start dev server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

## Performance

- **Bundle Size:** ~150KB (gzipped)
- **Load Time:** <1s on 4G
- **60 FPS animations** on all modern browsers
- Optimized with code splitting and lazy loading

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Input digits |
| `.` | Decimal point |
| `+`, `−`, `×`, `÷` | Operations |
| `Enter` / `=` | Calculate |
| `Backspace` | Delete last digit |
| `Escape` | Clear all |
| `%` | Percentage |

## License

MIT License - Built by Huncho.Dev

## Credits

- Icons by [Lucide React](https://lucide.dev)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

**Website:** [huncho.dev](https://huncho.dev)  
**Built with ❤️ by Huncho.Dev**
