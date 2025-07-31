# Restaurant Menu Calculator

A multi-restaurant React app that helps you calculate nutrition facts for your custom meals. Built with React, TypeScript, and Tailwind CSS, featuring official nutrition data from various restaurants.

## Features

- 🥙 **Complete Ingredient Database**: All restaurant ingredients with official nutrition facts
- 📊 **Real-time Calculations**: Live nutrition totals as you build your meal
- 🎛️ **Portion Control**: Light/Regular/Extra portions for most ingredients
- 📱 **Mobile Responsive**: Works great on all devices
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS
- ⚡ **Fast & Lightweight**: No backend required, runs entirely in the browser

## Live Demo

Visit the live app: [https://markjohnson303.github.io/restaurant-menu-calculator](https://markjohnson303.github.io/restaurant-menu-calculator)

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
npm run deploy
```

## Project Structure

```
Restaurant-Menu-Calculator/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Global styles with Tailwind
│   ├── RestaurantSelection.tsx    # Restaurant selection component
│   ├── components/
│   │   └── NutritionCalculator.tsx # Main nutrition calculator component
│   └── data/
│       ├── menuData.ts            # Menu items and nutrition data
│       ├── restaurantData.ts      # Restaurant information
│       └── categoryData.ts        # Menu categories and organization
├── .github/workflows/
│   └── deploy.yml                 # GitHub Actions deployment
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # TypeScript config for Node.js
├── .gitignore                     # Git ignore patterns
└── restaurant-menu-calculator.tsx # Legacy single-file component
```

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **GitHub Actions**: Automated deployment

## Nutrition Data

All nutrition information is based on official restaurant nutrition facts. The app includes:

- All style options (Bowl, Burrito)
- Rice varieties (Cilantro Lime, Seasoned Brown)
- Bean options (Black, Pinto)
- All protein choices including plant-based options
- Quesos and toppings
- Salsas and sauces with heat levels

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - feel free to use this project for your own nutrition tracking needs!

## Support

If you find this useful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs via GitHub issues
- 💡 Suggesting features

---

*Note: This is an unofficial nutrition calculator. Always verify nutrition information with restaurants directly for dietary restrictions or precise nutritional needs.*