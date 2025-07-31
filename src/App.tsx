import { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';

// Flame SVG Component
const FlameIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 512 512" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M394.23,197.56a300.43,300.43,0,0,0-53.37-90C301.2,61.65,249.05,32,208,32a16,16,0,0,0-15.48,20c13.87,53-14.88,97.07-45.31,143.72C122,234.36,96,274.27,96,320c0,88.22,71.78,160,160,160s160-71.78,160-160C416,276.7,408.68,235.51,394.23,197.56ZM288.33,418.69C278,429.69,265.05,432,256,432s-22-2.31-32.33-13.31S208,390.24,208,368c0-25.14,8.82-44.28,17.34-62.78,4.95-10.74,10-21.67,13-33.37a8,8,0,0,1,12.49-4.51A126.48,126.48,0,0,1,275,292c18.17,24,29,52.42,29,76C304,390.24,298.58,407.77,288.33,418.69Z"/>
  </svg>
);

// Type definitions
interface Ingredient {
  name: string;
  category: string;
  serving: string;
  servingGrams: number;
  calories: number;
  fat: number;
  satFat: number;
  transFat: number;
  cholesterol: number;
  carbs: number;
  fiber: number;
  sugar: number;
  protein: number;
  sodium: number;
  potassium: number;
}

interface SelectedIngredient {
  category: string;
  name: string;
  multiplier: number;
}

interface SelectedIngredients {
  [key: string]: SelectedIngredient;
}

interface NutritionalTotals {
  servingGrams: number;
  calories: number;
  fat: number;
  satFat: number;
  transFat: number;
  cholesterol: number;
  carbs: number;
  fiber: number;
  sugar: number;
  protein: number;
  sodium: number;
  potassium: number;
}

const App = () => {
  // Complete ingredient data extracted from official Qdoba 2025 nutrition facts
  const ingredients: Ingredient[] = [
    { name: "Bowl", category: "style", serving: "no tortilla", servingGrams: 0, calories: 0, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, sodium: 0, potassium: 0 },
    { name: "Burrito", category: "style", serving: "12.5\" tortilla", servingGrams: 102, calories: 300, fat: 7, satFat: 2.5, transFat: 0, cholesterol: 0, carbs: 52, fiber: 3, sugar: 2, protein: 8, sodium: 760, potassium: 50 },
    { name: "Cilantro Lime Rice", category: "rice", serving: "4 oz", servingGrams: 113, calories: 190, fat: 2.5, satFat: 0.5, transFat: 0, cholesterol: 0, carbs: 38, fiber: 1, sugar: 0, protein: 3, sodium: 390, potassium: 30 },
    { name: "Seasoned Brown Rice", category: "rice", serving: "4 oz", servingGrams: 113, calories: 170, fat: 1.5, satFat: 0, transFat: 0, cholesterol: 0, carbs: 36, fiber: 2, sugar: 1, protein: 4, sodium: 250, potassium: 135 },
    { name: "Black Beans", category: "beans", serving: "4 oz", servingGrams: 113, calories: 140, fat: 1, satFat: 0, transFat: 0, cholesterol: 0, carbs: 24, fiber: 14, sugar: 1, protein: 9, sodium: 330, potassium: 360 },
    { name: "Pinto Beans", category: "beans", serving: "4 oz", servingGrams: 113, calories: 130, fat: 1, satFat: 0, transFat: 0, cholesterol: 0, carbs: 23, fiber: 14, sugar: 1, protein: 8, sodium: 350, potassium: 440 },
    { name: "Grilled Adobo Chicken", category: "protein", serving: "3.5 oz", servingGrams: 99, calories: 190, fat: 12, satFat: 3.5, transFat: 0, cholesterol: 90, carbs: 2, fiber: 0.45, sugar: 1, protein: 19, sodium: 440, potassium: 430 },
    { name: "Grilled Steak", category: "protein", serving: "3.5 oz", servingGrams: 99, calories: 360, fat: 28, satFat: 10, transFat: 1, cholesterol: 85, carbs: 5, fiber: 0.66, sugar: 1, protein: 20, sodium: 600, potassium: 340 },
    { name: "Ground Beef", category: "protein", serving: "3.5 oz", servingGrams: 99, calories: 190, fat: 12, satFat: 5, transFat: 0, cholesterol: 40, carbs: 4, fiber: 1, sugar: 1, protein: 15, sodium: 480, potassium: 40 },
    { name: "Pork Carnitas", category: "protein", serving: "3.5 oz", servingGrams: 99, calories: 110, fat: 4.5, satFat: 2.5, transFat: 0, cholesterol: 45, carbs: 0, fiber: 0, sugar: 1, protein: 14, sodium: 560, potassium: 15 },
    { name: "Chorizo", category: "protein", serving: "3.0 oz", servingGrams: 85, calories: 260, fat: 20, satFat: 8, transFat: 0, cholesterol: 55, carbs: 5, fiber: 0, sugar: 0, protein: 14, sodium: 820, potassium: 290 },
    { name: "Cholula® Hot & Sweet Chicken", category: "protein", serving: "3.5 oz", servingGrams: 99, calories: 190, fat: 10, satFat: 2.5, transFat: 0, cholesterol: 75, carbs: 10, fiber: 1, sugar: 8, protein: 16, sodium: 540, potassium: 360 },
    { name: "Brisket Birria", category: "protein", serving: "3.5 oz", servingGrams: 99, calories: 140, fat: 7, satFat: 3, transFat: 0, cholesterol: 50, carbs: 3, fiber: 0, sugar: 1, protein: 15, sodium: 450, potassium: 260 },
    { name: "Plant-Based Impossible™", category: "protein", serving: "3.1 oz", servingGrams: 88, calories: 170, fat: 9, satFat: 4, transFat: 0, cholesterol: 0, carbs: 8, fiber: 0, sugar: 1, protein: 13, sodium: 350, potassium: 520 },
    { name: "Three Cheese Queso", category: "quesos", serving: "2 oz", servingGrams: 57, calories: 80, fat: 8, satFat: 5, transFat: 0, cholesterol: 20, carbs: 3, fiber: 0, sugar: 1, protein: 3, sodium: 340, potassium: 45 },
    { name: "Queso Diablo", category: "quesos", serving: "2 oz", servingGrams: 57, calories: 90, fat: 7, satFat: 5, transFat: 0, cholesterol: 15, carbs: 3, fiber: 0, sugar: 1, protein: 2, sodium: 320, potassium: 60 },
    { name: "Hand-Crafted Guacamole", category: "toppings", serving: "2 oz", servingGrams: 57, calories: 80, fat: 8, satFat: 1, transFat: 0, cholesterol: 0, carbs: 5, fiber: 4, sugar: 0, protein: 1, sodium: 160, potassium: 260 },
    { name: "Pickled Red Onions", category: "toppings", serving: "0.8 oz", servingGrams: 23, calories: 10, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 3, fiber: 0, sugar: 2, protein: 0, sodium: 75, potassium: 15 },
    { name: "Pickled Jalapeños", category: "toppings", serving: "1 oz", servingGrams: 28, calories: 15, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 3, fiber: 0, sugar: 2, protein: 0, sodium: 90, potassium: 30 },
    { name: "Fajita Veggies", category: "toppings", serving: "2 oz", servingGrams: 57, calories: 40, fat: 3, satFat: 0, transFat: 0, cholesterol: 0, carbs: 3, fiber: 1, sugar: 2, protein: 1, sodium: 115, potassium: 95 },
    { name: "Shredded Cheese", category: "toppings", serving: "1 oz", servingGrams: 28, calories: 110, fat: 9, satFat: 5, transFat: 0, cholesterol: 30, carbs: 1, fiber: 0, sugar: 0, protein: 7, sodium: 180, potassium: 30 },
    { name: "Sour Cream", category: "toppings", serving: "1 oz", servingGrams: 28, calories: 50, fat: 5, satFat: 3, transFat: 0, cholesterol: 15, carbs: 3, fiber: 0, sugar: 1, protein: 1, sodium: 10, potassium: 40 },
    { name: "Shredded Romaine Lettuce", category: "toppings", serving: "0.25 oz", servingGrams: 7, calories: 0, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, sodium: 0, potassium: 0 },
    { name: "Cotija (Crumbled White Cheese)", category: "toppings", serving: "0.25 oz", servingGrams: 7, calories: 25, fat: 2, satFat: 1.5, transFat: 0, cholesterol: 5, carbs: 0, fiber: 0, sugar: 0, protein: 1, sodium: 95, potassium: 5 },
    { name: "Crispy Tortilla Strips", category: "toppings", serving: "0.5 oz", servingGrams: 14, calories: 70, fat: 4.5, satFat: 0, transFat: 0, cholesterol: 0, carbs: 8, fiber: 0, sugar: 0, protein: 1, sodium: 35, potassium: 30 },
    { name: "Cilantro", category: "toppings", serving: "0.12 oz", servingGrams: 3, calories: 0, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, sodium: 0, potassium: 20 },
    { name: "Mango Salsa (Mild)", category: "salsasSauces", serving: "2 oz", servingGrams: 57, calories: 25, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 7, fiber: 1, sugar: 5, protein: 0, sodium: 120, potassium: 70 },
    { name: "Roasted Tomato Salsa (Mild)", category: "salsasSauces", serving: "1 oz", servingGrams: 28, calories: 5, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 1, fiber: 0, sugar: 1, protein: 0, sodium: 190, potassium: 15 },
    { name: "Freshly Made Pico de Gallo (Mild)", category: "salsasSauces", serving: "1 oz", servingGrams: 28, calories: 5, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 1, fiber: 0, sugar: 0, protein: 0, sodium: 70, potassium: 70 },
    { name: "Chile Corn Salsa (Mild)", category: "salsasSauces", serving: "1 oz", servingGrams: 28, calories: 25, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 5, fiber: 0, sugar: 1, protein: 1, sodium: 75, potassium: 74 },
    { name: "Citrus Lime Vinaigrette (Mild)", category: "salsasSauces", serving: "1.5 oz", servingGrams: 43, calories: 100, fat: 8, satFat: 0.5, transFat: 0, cholesterol: 0, carbs: 7, fiber: 0, sugar: 5, protein: 0, sodium: 330, potassium: 0 },
    { name: "Salsa Verde (Medium)", category: "salsasSauces", serving: "1 oz", servingGrams: 28, calories: 10, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 0, fiber: 1, sugar: 1, protein: 0, sodium: 240, potassium: 20 },
    { name: "Chile Crema (Medium)", category: "salsasSauces", serving: "1 oz", servingGrams: 28, calories: 130, fat: 14, satFat: 2, transFat: 0, cholesterol: 10, carbs: 1, fiber: 0, sugar: 1, protein: 0, sodium: 290, potassium: 16 },
    { name: "Picante Ranch Dressing (Medium)", category: "salsasSauces", serving: "1.5 oz", servingGrams: 43, calories: 80, fat: 8, satFat: 2, transFat: 0, cholesterol: 15, carbs: 3, fiber: 0, sugar: 1, protein: 1, sodium: 180, potassium: 45 },
    { name: "Salsa Roja (Hot)", category: "salsasSauces", serving: "1 oz", servingGrams: 28, calories: 5, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 2, fiber: 0, sugar: 1, protein: 0, sodium: 85, potassium: 35 },
    { name: "Fiery Habanero Salsa (Hot)", category: "salsasSauces", serving: "1 oz", servingGrams: 28, calories: 10, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 2, fiber: 1, sugar: 1, protein: 0, sodium: 110, potassium: 10 }
  ];

  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredients>({});

  const updateIngredient = (category: string, name: string, multiplier: number) => {
    const key = `${category}-${name}`;
    setSelectedIngredients(prev => {
      const newState = { ...prev };
      
      // For style, ensure only one can be selected at a time
      if (category === 'style') {
        // Clear all style selections first
        Object.keys(newState).forEach(k => {
          if (k.startsWith('style-')) {
            delete newState[k];
          }
        });
        // Add the new selection if multiplier > 0
        if (multiplier > 0) {
          newState[key] = { category, name, multiplier };
        }
      } else {
        // For all other categories, handle normally
        if (multiplier === 0) {
          delete newState[key];
        } else {
          newState[key] = { category, name, multiplier };
        }
      }
      
      return newState;
    });
  };

  const resetCalculator = () => {
    setSelectedIngredients({});
  };

  const totals = useMemo(() => {
    let totals: NutritionalTotals = {
      servingGrams: 0,
      calories: 0,
      fat: 0,
      satFat: 0,
      transFat: 0,
      cholesterol: 0,
      carbs: 0,
      fiber: 0,
      sugar: 0,
      protein: 0,
      sodium: 0,
      potassium: 0
    };

    Object.values(selectedIngredients).forEach(({ name, multiplier }) => {
      const ingredient = ingredients.find(item => item.name === name);
      if (ingredient) {
        totals.servingGrams += ingredient.servingGrams * multiplier;
        totals.calories += ingredient.calories * multiplier;
        totals.fat += ingredient.fat * multiplier;
        totals.satFat += ingredient.satFat * multiplier;
        totals.transFat += ingredient.transFat * multiplier;
        totals.cholesterol += ingredient.cholesterol * multiplier;
        totals.carbs += ingredient.carbs * multiplier;
        totals.fiber += ingredient.fiber * multiplier;
        totals.sugar += ingredient.sugar * multiplier;
        totals.protein += ingredient.protein * multiplier;
        totals.sodium += ingredient.sodium * multiplier;
        totals.potassium += ingredient.potassium * multiplier;
      }
    });

    // Round to 1 decimal place
    (Object.keys(totals) as (keyof NutritionalTotals)[]).forEach(key => {
      totals[key] = Math.round(totals[key]);
    });

    return totals;
  }, [selectedIngredients]);

  const ServingControls = ({ category, ingredient }: { category: string; ingredient: Ingredient }) => {
    const key = `${category}-${ingredient.name}`;
    const current = selectedIngredients[key]?.multiplier || 0;

    // Style uses radio-style selection
    if (category === 'style') {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => updateIngredient(category, ingredient.name, current === 1 ? 0 : 1)}
            className={`px-2 py-1 rounded-pill text-xs font-medium transition-colors duration-fast ease-cardEase ${
              current === 1 
                ? 'bg-text-primary text-background-primary border border-stroke' 
                : 'bg-background-card text-text-tertiary hover:bg-stroke border border-stroke'
            }`}
          >
            {current === 1 ? '✓ Selected' : 'Select'}
          </button>
        </div>
      );
    }

    // Protein has Regular (1x) or Extra (2x) only
    if (category === 'protein') {
      return (
        <div className="flex gap-1">
          <button
            onClick={() => updateIngredient(category, ingredient.name, current === 1 ? 0 : 1)}
            className={`px-2 py-1 rounded-pill text-xs font-medium transition-colors duration-fast ease-cardEase ${
              current === 1 
                ? 'bg-text-primary text-background-primary border border-stroke' 
                : 'bg-background-card text-text-tertiary hover:bg-stroke border border-stroke'
            }`}
          >
            Regular
          </button>
          <button
            onClick={() => updateIngredient(category, ingredient.name, current === 2 ? 0 : 2)}
            className={`px-2 py-1 rounded-pill text-xs font-medium transition-colors duration-fast ease-cardEase ${
              current === 2 
                ? 'bg-text-primary text-background-primary border border-stroke' 
                : 'bg-background-card text-text-tertiary hover:bg-stroke border border-stroke'
            }`}
          >
            Extra
          </button>
        </div>
      );
    }

    // All other ingredients have Light (0.5x), Regular (1x), Extra (2x)
    return (
      <div className="flex gap-1">
        <button
          onClick={() => updateIngredient(category, ingredient.name, current === 0.5 ? 0 : 0.5)}
          className={`px-2 py-1 rounded-pill text-xs font-medium transition-colors duration-fast ease-cardEase ${
            current === 0.5 
              ? 'bg-text-primary text-background-primary border border-stroke' 
              : 'bg-background-card text-text-tertiary hover:bg-stroke border border-stroke'
          }`}
        >
          Light
        </button>
        <button
          onClick={() => updateIngredient(category, ingredient.name, current === 1 ? 0 : 1)}
          className={`px-2 py-1 rounded-pill text-xs font-medium transition-colors duration-fast ease-cardEase ${
            current === 1 
              ? 'bg-text-primary text-background-primary border border-stroke' 
              : 'bg-background-card text-text-tertiary hover:bg-stroke border border-stroke'
          }`}
        >
          Regular
        </button>
        <button
          onClick={() => updateIngredient(category, ingredient.name, current === 2 ? 0 : 2)}
          className={`px-2 py-1 rounded-pill text-xs font-medium transition-colors duration-fast ease-cardEase ${
            current === 2 
              ? 'bg-text-primary text-background-primary border border-stroke' 
              : 'bg-background-card text-text-tertiary hover:bg-stroke border border-stroke'
          }`}
        >
          Extra
        </button>
      </div>
    );
  };

  const IngredientSection = ({ title, category, items }: { title: string; category: string; items: Ingredient[] }) => (
    <div className="mb-6">
      <h3 className="text-sectionHeading text-text-primary border-b border-stroke pb-2 mb-3">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((ingredient: Ingredient, index: number) => (
          <div key={`${ingredient.name}-${index}`} className="flex items-center justify-between p-3 bg-background-card rounded-lg gap-2 border border-stroke shadow-card overflow-hidden">
            <div className="flex-1 min-w-0 pr-2">
              <div className="text-sm font-medium text-text-primary leading-tight">{ingredient.name}</div>
              <div className="text-xs text-text-secondary">{ingredient.serving}</div>
              <div className="text-xs text-text-tertiary mt-0.5">
                <span className="font-bold whitespace-nowrap">{Math.round(ingredient.calories)}<FlameIcon className="w-3 h-3 inline -translate-y-0.5" /></span> <span className="font-bold">{Math.round(ingredient.protein)}P {Math.round(ingredient.fat)}F {Math.round(ingredient.carbs)}C • {Math.round(ingredient.servingGrams)}g</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ServingControls category={category} ingredient={ingredient} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-background-primary text-text-primary ${Object.keys(selectedIngredients).length > 0 ? 'pb-28' : 'pb-6'}`}>
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-titleBar text-text-primary mb-2">Qdoba Nutrition Calculator</h1>
          <p className="text-text-secondary">Build your custom burrito or bowl and track the nutrition</p>
        </div>

      <div className="grid md:grid-cols-1 gap-8">
        {/* Ingredient Selection */}
        <div className="space-y-6">
          <IngredientSection title="1. Style" category="style" items={ingredients.filter(item => item.category === 'style')} />
          <IngredientSection title="2. Rice" category="rice" items={ingredients.filter(item => item.category === 'rice')} />
          <IngredientSection title="3. Beans" category="beans" items={ingredients.filter(item => item.category === 'beans')} />
          <IngredientSection title="4. Protein" category="protein" items={ingredients.filter(item => item.category === 'protein')} />
          <IngredientSection title="5. Quesos" category="quesos" items={ingredients.filter(item => item.category === 'quesos')} />
          <IngredientSection title="6. Toppings" category="toppings" items={ingredients.filter(item => item.category === 'toppings')} />
          <IngredientSection title="7. Salsa & Sauces" category="salsasSauces" items={ingredients.filter(item => item.category === 'salsasSauces')} />
        </div>
      </div>

      {/* Full Nutrition Breakdown Section - always at bottom when ingredients selected */}
        <div className="mt-12 bg-background-card p-6 rounded-lg border border-stroke">
          <div className="text-center mb-6">
            <h2 className="text-titleBar text-text-primary mb-2">Nutrition Breakdown</h2>
          </div>
          
          {/* Main macros - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            <div className="bg-macro-calorie p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-black whitespace-nowrap">{totals.calories}</div>
              <div className="text-sm text-black opacity-80">Calories</div>
            </div>
            <div className="bg-macro-protein p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-black">{totals.protein}g</div>
              <div className="text-sm text-black opacity-80">Protein</div>
            </div>
            <div className="bg-macro-fat p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-black">{totals.fat}g</div>
              <div className="text-sm text-black opacity-80">Total Fat</div>
            </div>
            <div className="bg-macro-carb p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-black">{totals.carbs}g</div>
              <div className="text-sm text-black opacity-80">Carbohydrates</div>
            </div>
          </div>
          
          {/* Secondary nutritional info - 2 columns on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-background-primary p-3 rounded-lg text-center border border-stroke shadow-card">
              <div className="text-lg font-semibold text-text-primary">{totals.servingGrams}g</div>
              <div className="text-caption text-text-secondary">Serving Size</div>
            </div>
            <div className="bg-background-primary p-3 rounded-lg text-center border border-stroke shadow-card">
              <div className="text-lg font-semibold text-text-primary">{totals.satFat}g</div>
              <div className="text-caption text-text-secondary">Saturated Fat</div>
            </div>
            <div className="bg-background-primary p-3 rounded-lg text-center border border-stroke shadow-card">
              <div className="text-lg font-semibold text-text-primary">{totals.transFat}g</div>
              <div className="text-caption text-text-secondary">Trans Fat</div>
            </div>
            <div className="bg-background-primary p-3 rounded-lg text-center border border-stroke shadow-card">
              <div className="text-lg font-semibold text-text-primary">{totals.cholesterol}mg</div>
              <div className="text-caption text-text-secondary">Cholesterol</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-background-primary p-3 rounded-lg text-center border border-stroke shadow-card">
              <div className="text-lg font-semibold text-text-primary">{totals.fiber}g</div>
              <div className="text-caption text-text-secondary">Dietary Fiber</div>
            </div>
            <div className="bg-background-primary p-3 rounded-lg text-center border border-stroke shadow-card">
              <div className="text-lg font-semibold text-text-primary">{totals.sugar}g</div>
              <div className="text-caption text-text-secondary">Sugar</div>
            </div>
            <div className="bg-background-primary p-3 rounded-lg text-center border border-stroke shadow-card">
              <div className="text-lg font-semibold text-text-primary">{totals.sodium}mg</div>
              <div className="text-caption text-text-secondary">Sodium</div>
            </div>
            <div className="bg-background-primary p-3 rounded-lg text-center border border-stroke shadow-card">
              <div className="text-lg font-semibold text-text-primary">{totals.potassium}mg</div>
              <div className="text-caption text-text-secondary">Potassium</div>
            </div>
          </div>

          {/* Your Selection */}
          {Object.keys(selectedIngredients).length > 0 && (
          <div className="bg-background-primary p-4 rounded-lg border border-stroke shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="border-b border-stroke">
                    <th className="text-left py-3 px-2 text-caption text-text-secondary uppercase font-bold align-middle w-1/2"></th>
                    <th className="text-right py-3 px-2 text-caption text-text-secondary uppercase font-bold align-middle w-1/8 whitespace-nowrap"><FlameIcon className="w-3 h-3 inline -translate-y-0.5" /></th>
                    <th className="text-right py-3 px-2 text-caption text-text-secondary uppercase font-bold align-middle w-1/8">P</th>
                    <th className="text-right py-3 px-2 text-caption text-text-secondary uppercase font-bold align-middle w-1/8">F</th>
                    <th className="text-right py-3 px-2 text-caption text-text-secondary uppercase font-bold align-middle w-1/8">C</th>
                  </tr>
                </thead>
                <tbody>
                  {(Object.values(selectedIngredients) as { category: string, name: string, multiplier: number }[]).map((item) => {
                    const category = item.category;
                    const name = item.name;
                    const multiplier = item.multiplier;
                    
                    // Find the ingredient data to calculate nutrition
                    const ingredient = ingredients.find(ing => ing.name === name);
                    
                    let sizeLabel = '';
                    if (category === 'style') {
                      sizeLabel = '';
                    } else if (category === 'protein') {
                      sizeLabel = multiplier === 2 ? ' (Extra)' : ' (Regular)';
                    } else {
                      sizeLabel = multiplier === 0.5 ? ' (Light)' : multiplier === 1 ? ' (Regular)' : ' (Extra)';
                    }
                    
                    // Calculate nutrition values for this item
                    const itemCalories = ingredient ? Math.round((ingredient.calories * multiplier)) : 0;
                    const itemProtein = ingredient ? Math.round((ingredient.protein * multiplier)) : 0;
                    const itemFat = ingredient ? Math.round((ingredient.fat * multiplier)) : 0;
                    const itemCarbs = ingredient ? Math.round((ingredient.carbs * multiplier)) : 0;
                    
                    return (
                      <tr key={`${category}-${name}`} className="border-b border-stroke last:border-b-0">
                        <td className="py-3 px-2 text-text-tertiary align-middle">{name}{sizeLabel}</td>
                        <td className="py-3 px-2 text-right text-text-primary font-medium align-middle whitespace-nowrap">{itemCalories}</td>
                        <td className="py-3 px-2 text-right text-text-primary font-medium align-middle">{itemProtein}</td>
                        <td className="py-3 px-2 text-right text-text-primary font-medium align-middle">{itemFat}</td>
                        <td className="py-3 px-2 text-right text-text-primary font-medium align-middle">{itemCarbs}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>

      {/* Simple Sticky Macro Footer - always compact */}
        <div className="fixed bottom-0 left-0 right-0 bg-background-card border-t border-stroke shadow-lg px-4 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-lg font-bold text-macro-calorie whitespace-nowrap">{totals.calories}<FlameIcon className="w-4 h-4 inline -translate-y-0.5" /></div>
              <div className="text-lg font-bold text-macro-protein">{totals.protein}P</div>
              <div className="text-lg font-bold text-macro-fat">{totals.fat}F</div>
              <div className="text-lg font-bold text-macro-carb">{totals.carbs}C</div>
              <div className="text-lg font-bold text-text-secondary">• {totals.servingGrams}g</div>
            </div>
            <button
              onClick={resetCalculator}
              className="px-4 py-2 bg-background-surface text-text-primary rounded-pill hover:bg-stroke transition-colors duration-fast ease-cardEase flex items-center gap-2 text-sm flex-shrink-0 border border-stroke"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;