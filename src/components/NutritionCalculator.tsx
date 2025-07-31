import { useState, useMemo } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { 
  Ingredient, 
  SelectedIngredients, 
  NutritionalTotals,
  getIngredientsForRestaurant
} from '../data/menuData';
import { getCategoriesForRestaurant, getCategoryRules } from '../data/categoryData';

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

interface NutritionCalculatorProps {
  restaurantId: string;
  restaurantName: string;
  onBack: () => void;
}

const NutritionCalculator: React.FC<NutritionCalculatorProps> = ({ 
  restaurantId, 
  restaurantName, 
  onBack 
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredients>({});

  // Get ingredients for the specific restaurant
  const ingredients = useMemo(() => 
    getIngredientsForRestaurant(restaurantId), 
    [restaurantId]
  );

  const categories = useMemo(() => 
    getCategoriesForRestaurant(restaurantId), 
    [restaurantId]
  );

  const updateIngredient = (category: string, name: string, multiplier: number) => {
    const key = `${category}-${name}`;
    setSelectedIngredients(prev => {
      const newState = { ...prev };
      
      // Get rules for this category
      const rules = getCategoryRules(restaurantId, category);
      
      // Handle mutually exclusive categories
      if (rules.mutuallyExclusive) {
        // Clear all selections in this category first
        Object.keys(newState).forEach(k => {
          if (k.startsWith(`${category}-`)) {
            delete newState[k];
          }
        });
        // Add the new selection if multiplier > 0
        if (multiplier > 0) {
          newState[key] = { category, name, multiplier };
        }
      } else {
        // For non-exclusive categories, handle normally
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
        totals.servingGrams! += (ingredient.servingGrams ?? 0) * multiplier;
        totals.calories += ingredient.calories * multiplier;
        totals.fat += ingredient.fat * multiplier;
        totals.satFat! += (ingredient.satFat ?? 0) * multiplier;
        totals.transFat! += (ingredient.transFat ?? 0) * multiplier;
        totals.cholesterol! += (ingredient.cholesterol ?? 0) * multiplier;
        totals.carbs += ingredient.carbs * multiplier;
        totals.fiber! += (ingredient.fiber ?? 0) * multiplier;
        totals.sugar! += (ingredient.sugar ?? 0) * multiplier;
        totals.protein += ingredient.protein * multiplier;
        totals.sodium! += (ingredient.sodium ?? 0) * multiplier;
        totals.potassium! += (ingredient.potassium ?? 0) * multiplier;
      }
    });

    // Round to 1 decimal place
    (Object.keys(totals) as (keyof NutritionalTotals)[]).forEach(key => {
      const value = totals[key];
      if (value !== undefined) {
        totals[key] = Math.round(value);
      }
    });

    return totals;
  }, [selectedIngredients, ingredients]);

  const ServingControls = ({ category, ingredient }: { category: string; ingredient: Ingredient }) => {
    const key = `${category}-${ingredient.name}`;
    const current = selectedIngredients[key]?.multiplier || 0;
    
    // Get rules for this category
    const rules = getCategoryRules(restaurantId, category);
    const { portions, mutuallyExclusive } = rules;

    // For mutually exclusive categories (like Style), show single selection button
    if (mutuallyExclusive && portions?.length === 1) {
      const portion = portions[0];
      
      return (
        <div className="flex gap-2">
          <button
            onClick={() => updateIngredient(category, ingredient.name, current === portion.multiplier ? 0 : portion.multiplier)}
            className={`px-2 py-1 rounded-pill text-xs font-medium transition-colors duration-fast ease-cardEase ${
              current === portion.multiplier 
                ? 'bg-text-primary text-background-primary border border-stroke' 
                : 'bg-background-card text-text-tertiary hover:bg-stroke border border-stroke'
            }`}
          >
            {current === portion.multiplier ? `✓ ${portion.name}` : 'Select'}
          </button>
        </div>
      );
    }

    // For categories with multiple portion options, show all available portions
    return (
      <div className="flex gap-1">
        {portions?.map(portion => {
          return (
            <button
              key={portion.multiplier}
              onClick={() => updateIngredient(category, ingredient.name, current === portion.multiplier ? 0 : portion.multiplier)}
              className={`px-2 py-1 rounded-pill text-xs font-medium transition-colors duration-fast ease-cardEase ${
                current === portion.multiplier 
                  ? 'bg-text-primary text-background-primary border border-stroke' 
                  : 'bg-background-card text-text-tertiary hover:bg-stroke border border-stroke'
              }`}
            >
              {portion.name}
            </button>
          );
        })}
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
                <span className="font-bold whitespace-nowrap">{Math.round(ingredient.calories)}<FlameIcon className="w-3 h-3 inline -translate-y-0.5" /></span> <span className="font-bold">{Math.round(ingredient.protein)}P {Math.round(ingredient.fat)}F {Math.round(ingredient.carbs)}C • {Math.round(ingredient.servingGrams ?? 0)}g</span>
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
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={onBack}
              className="absolute left-6 top-6 px-3 py-2 bg-background-card text-text-primary rounded-pill hover:bg-stroke transition-colors duration-fast ease-cardEase flex items-center gap-2 text-sm border border-stroke"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <h1 className="text-titleBar text-text-primary">{restaurantName} Nutrition Calculator</h1>
          </div>
          <p className="text-text-secondary">Build your custom meal and track the nutrition</p>
        </div>

        <div className="grid md:grid-cols-1 gap-8">
          {/* Ingredient Selection */}
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryIngredients = ingredients.filter(item => item.category === category.name);
              return (
                <IngredientSection 
                  key={category.name}
                  title={`${category.displayName}`} 
                  category={category.name} 
                  items={categoryIngredients} 
                />
              );
            })}
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
                      
                                          // Get size label using category rules
                    const rules = getCategoryRules(restaurantId, category);
                    const portion = rules.portions?.find(p => p.multiplier === multiplier);
                    const sizeLabel = rules.mutuallyExclusive && rules.portions?.length === 1 
                      ? '' // No label for mutually exclusive single-option categories
                      : ` (${portion?.name || `${multiplier}x`})`;
                      
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
              <div className="text-lg font-bold text-text-secondary">• {totals.servingGrams ?? 0}g</div>
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

export default NutritionCalculator;