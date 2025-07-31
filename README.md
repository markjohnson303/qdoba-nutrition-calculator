# Qdoba Nutrition Calculator

A self-contained React app that helps you calculate nutrition facts for your custom Qdoba burrito or bowl. Built with React, TypeScript, and Tailwind CSS, featuring official 2025 Qdoba nutrition data.

## Features

- 🥙 **Complete Ingredient Database**: All Qdoba ingredients with official nutrition facts
- 📊 **Real-time Calculations**: Live nutrition totals as you build your meal
- 🎛️ **Portion Control**: Light/Regular/Extra portions for most ingredients
- 📱 **Mobile Responsive**: Works great on all devices
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS
- ⚡ **Fast & Lightweight**: No backend required, runs entirely in the browser

## Live Demo

Visit the live app: [https://USERNAME.github.io/qdoba-nutrition-calculator](https://USERNAME.github.io/qdoba-nutrition-calculator)

*(Replace USERNAME with your GitHub username)*

## Deployment to GitHub Pages

### Quick Setup

1. **Fork or clone this repository**
2. **Update the repository name** in `package.json` and `vite.config.ts`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/qdoba-nutrition-calculator"
   ```
   ```ts
   base: '/qdoba-nutrition-calculator/',
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "GitHub Actions"

4. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

The GitHub Action will automatically build and deploy your app!

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
qdoba-nutrition-calculator/
├── src/
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles with Tailwind
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions deployment
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **GitHub Actions**: Automated deployment

## Nutrition Data

All nutrition information is based on official Qdoba 2025 nutrition facts. The app includes:

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

*Note: This is an unofficial nutrition calculator. Always verify nutrition information with Qdoba directly for dietary restrictions or precise nutritional needs.*