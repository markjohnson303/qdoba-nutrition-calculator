import { getIngredientsForRestaurant } from './menuData';

// Portion configuration interface
interface Portion {
  name: string;
  multiplier: number;
}

// Unified category configuration interface
interface CategoryRule {
  // Display and ordering properties
  displayName?: string;
  order?: number;
  
  // Behavior properties  
  mutuallyExclusive?: boolean;
  portions?: Portion[]; // available portion sizes with names and multipliers
}

// Restaurant-specific configuration including default rules
interface RestaurantConfig {
  default?: CategoryRule; // Default rules for this restaurant
  [categoryName: string]: CategoryRule | undefined; // Category-specific overrides
}

// Global fallback rule when no restaurant or restaurant default is defined
const GLOBAL_DEFAULT_RULE: CategoryRule = {
  // Display defaults (will use category name as-is, natural order)
  displayName: undefined, // Will use original category name
  order: undefined, // Will use natural order from ingredients
  
  // Behavior defaults
  mutuallyExclusive: false,
  portions: [
    { name: "Light", multiplier: 0.5 },
    { name: "Regular", multiplier: 1 },
    { name: "Extra", multiplier: 2 }
  ]
};

// Restaurant-specific category configuration (combines behavior, display, and ordering)
export const categoryRules: Record<string, RestaurantConfig> = {
  // Qdoba category rules
  qdoba: {
    // Default rules for all Qdoba categories (can be overridden per category)
    default: {
      mutuallyExclusive: false,
      portions: [
        { name: "Light", multiplier: 0.5 },
        { name: "Regular", multiplier: 1 },
        { name: "Extra", multiplier: 2 }
      ]
    },
    
    // Category-specific overrides
    "Style": {
      order: 0, // Force Style to be first
      mutuallyExclusive: true,
      portions: [
        { name: "Select", multiplier: 1 }
      ]
    }
  },
  
  // Chipotle category rules
  chipotle: {
    // Default rules for all Chipotle categories (can be overridden per category)
    default: {
      mutuallyExclusive: false,
      portions: [
        { name: "Half", multiplier: 0.5 },
        { name: "Regular", multiplier: 1 },
        { name: "Double", multiplier: 2 }
      ]
    },
    
    // Category-specific overrides
    "Style": {
      order: 0, // Always first
      mutuallyExclusive: true,
      portions: [
        { name: "Select", multiplier: 1 }
      ]
    },
    "Salsa": {
      displayName: "Salsas & Dressings",
      // portions will inherit from default (Half, Regular, Double)
    },
    "Sides": {
      order: 10,
      portions: [
        { name: "Add", multiplier: 1 }
      ]
    }
  }
};

/**
 * Get category rules for a specific restaurant and category
 * Uses restaurant default rules, then category-specific overrides, then global fallback
 */
export const getCategoryRules = (restaurantId: string, categoryName: string): CategoryRule => {
  const restaurantConfig = categoryRules[restaurantId];
  
  // If no restaurant config exists, use global default
  if (!restaurantConfig) {
    return GLOBAL_DEFAULT_RULE;
  }
  
  // Get restaurant default rules (if any)
  const restaurantDefault = restaurantConfig.default || {};
  
  // Get category-specific rules (if any)
  const categorySpecific = restaurantConfig[categoryName] || {};
  
  // Merge in priority order: Global Default < Restaurant Default < Category Specific
  return {
    displayName: categorySpecific.displayName ?? restaurantDefault.displayName ?? GLOBAL_DEFAULT_RULE.displayName,
    order: categorySpecific.order ?? restaurantDefault.order ?? GLOBAL_DEFAULT_RULE.order,
    mutuallyExclusive: categorySpecific.mutuallyExclusive ?? restaurantDefault.mutuallyExclusive ?? GLOBAL_DEFAULT_RULE.mutuallyExclusive,
    portions: categorySpecific.portions ?? restaurantDefault.portions ?? GLOBAL_DEFAULT_RULE.portions
  };
};

/**
 * Natural discovery of categories with unified rules
 * Returns categories in order of first appearance from ingredients, with optional restaurant-specific customizations
 */
export const getCategoriesForRestaurant = (restaurantId: string): Array<{ name: string; displayName: string }> => {
  const ingredients = getIngredientsForRestaurant(restaurantId);
  
  // Extract categories in order of first appearance (natural ordering)
  const naturalCategories: string[] = [];
  const seenCategories = new Set<string>();
  
  ingredients.forEach(ingredient => {
    if (!seenCategories.has(ingredient.category)) {
      naturalCategories.push(ingredient.category);
      seenCategories.add(ingredient.category);
    }
  });
  
  // Create category objects with display names and orders
  const categoriesWithMetadata = naturalCategories.map(category => {
    // Use the getCategoryRules function to get properly merged rules
    const rule = getCategoryRules(restaurantId, category);
    return {
      name: category,
      displayName: rule.displayName || category, // Use rule displayName or original name
      order: rule.order !== undefined ? rule.order : naturalCategories.indexOf(category) // Use rule order or natural order
    };
  });
  
  // Sort by order (categories with custom order first, then natural order)
  categoriesWithMetadata.sort((a, b) => a.order - b.order);
  
  // Return name and displayName for UI
  return categoriesWithMetadata.map(({ name, displayName }) => ({ name, displayName }));
};