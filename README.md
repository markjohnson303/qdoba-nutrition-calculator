# Restaurant Menu Calculator

A self-contained, multi-restaurant React app that helps you calculate nutrition facts for your custom meals. Inspired by the [MacroFactor](https://macrofactorapp.com/) app (of which I'm a big fan). Built with React, TypeScript, and Tailwind CSS, featuring official nutrition data from various restaurants (currently Chipotle and Qdoba).

## Features

- 🥙 **Complete Ingredient Database**: All restaurant ingredients with official nutrition facts
- 📊 **Real-time Calculations**: Live nutrition totals as you build your meal
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

## Project Structure

```
Restaurant-Menu-Calculator/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # React entry point
│   ├── index.css                  # Global styles with Tailwind
│   ├── components/
│   │   ├── NutritionCalculator.tsx # Main nutrition calculator component
│   │   └── RestaurantSelection.tsx # Restaurant selection component
│   └── data/
│       ├── menuData.ts            # Menu items and nutrition data
│       ├── restaurantData.ts      # Restaurant information
│       └── categoryData.ts        # Menu categories and organization
├── index.html                     # HTML entry point
```

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **GitHub Actions**: Automated deployment

## Nutrition Data

All nutrition information is based on official restaurant nutrition facts, however I make no guarantee as to its accuracy.

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

## Disclaimer

This is an unofficial nutrition calculator that I built for fun, personal use, and education. It’s not affiliated with Chipotle, Qdoba, MacroFactor, or anyone else.

The nutrition info might not be 100% accurate or up to date, so if you have specific dietary needs, allergies, or health goals, you should double-check with the restaurant or a healthcare professional. I don’t collect any data, and I’m not responsible for how you use the tool or any decisions you make based on it. Use it at your own risk.

All brand names and logos belong to their respective owners.