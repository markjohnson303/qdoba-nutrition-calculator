// Type definitions
export interface Ingredient {
  name: string;
  category: string;
  serving: string;
  servingGrams?: number;
  calories: number;
  fat: number;
  satFat?: number;
  transFat?: number;
  cholesterol?: number;
  carbs: number;
  fiber?: number;
  sugar?: number;
  protein: number;
  sodium?: number;
  potassium?: number;
  restaurant: string;
}

export interface SelectedIngredient {
  category: string;
  name: string;
  multiplier: number;
}

export interface SelectedIngredients {
  [key: string]: SelectedIngredient;
}

export interface NutritionalTotals {
  servingGrams?: number;
  calories: number;
  fat: number;
  satFat?: number;
  transFat?: number;
  cholesterol?: number;
  carbs: number;
  fiber?: number;
  sugar?: number;
  protein: number;
  sodium?: number;
  potassium?: number;
}

// Restaurant data
export const restaurantIngredients: Ingredient[] = [
  // Qdoba menu items (extracted from official 2025 nutrition facts)
  { name: "Bowl", category: "Style", serving: "no tortilla", servingGrams: 0, calories: 0, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, sodium: 0, potassium: 0, restaurant: "qdoba" },
  { name: "Burrito", category: "Style", serving: "12.5\" tortilla", servingGrams: 102, calories: 300, fat: 7, satFat: 2.5, transFat: 0, cholesterol: 0, carbs: 52, fiber: 3, sugar: 2, protein: 8, sodium: 760, potassium: 50, restaurant: "qdoba" },
  { name: "Cilantro Lime Rice", category: "Rice", serving: "4 oz", servingGrams: 113, calories: 190, fat: 2.5, satFat: 0.5, transFat: 0, cholesterol: 0, carbs: 38, fiber: 1, sugar: 0, protein: 3, sodium: 390, potassium: 30, restaurant: "qdoba" },
  { name: "Seasoned Brown Rice", category: "Rice", serving: "4 oz", servingGrams: 113, calories: 170, fat: 1.5, satFat: 0, transFat: 0, cholesterol: 0, carbs: 36, fiber: 2, sugar: 1, protein: 4, sodium: 250, potassium: 135, restaurant: "qdoba" },
  { name: "Black Beans", category: "Beans", serving: "4 oz", servingGrams: 113, calories: 140, fat: 1, satFat: 0, transFat: 0, cholesterol: 0, carbs: 24, fiber: 14, sugar: 1, protein: 9, sodium: 330, potassium: 360, restaurant: "qdoba" },
  { name: "Pinto Beans", category: "Beans", serving: "4 oz", servingGrams: 113, calories: 130, fat: 1, satFat: 0, transFat: 0, cholesterol: 0, carbs: 23, fiber: 14, sugar: 1, protein: 8, sodium: 350, potassium: 440, restaurant: "qdoba" },
  { name: "Grilled Adobo Chicken", category: "Protein", serving: "3.5 oz", servingGrams: 99, calories: 190, fat: 12, satFat: 3.5, transFat: 0, cholesterol: 90, carbs: 2, fiber: 0.45, sugar: 1, protein: 19, sodium: 440, potassium: 430, restaurant: "qdoba" },
  { name: "Grilled Steak", category: "Protein", serving: "3.5 oz", servingGrams: 99, calories: 360, fat: 28, satFat: 10, transFat: 1, cholesterol: 85, carbs: 5, fiber: 0.66, sugar: 1, protein: 20, sodium: 600, potassium: 340, restaurant: "qdoba" },
  { name: "Ground Beef", category: "Protein", serving: "3.5 oz", servingGrams: 99, calories: 190, fat: 12, satFat: 5, transFat: 0, cholesterol: 40, carbs: 4, fiber: 1, sugar: 1, protein: 15, sodium: 480, potassium: 40, restaurant: "qdoba" },
  { name: "Pork Carnitas", category: "Protein", serving: "3.5 oz", servingGrams: 99, calories: 110, fat: 4.5, satFat: 2.5, transFat: 0, cholesterol: 45, carbs: 0, fiber: 0, sugar: 1, protein: 14, sodium: 560, potassium: 15, restaurant: "qdoba" },
  { name: "Chorizo", category: "Protein", serving: "3.0 oz", servingGrams: 85, calories: 260, fat: 20, satFat: 8, transFat: 0, cholesterol: 55, carbs: 5, fiber: 0, sugar: 0, protein: 14, sodium: 820, potassium: 290, restaurant: "qdoba" },
  { name: "Cholula® Hot & Sweet Chicken", category: "Protein", serving: "3.5 oz", servingGrams: 99, calories: 190, fat: 10, satFat: 2.5, transFat: 0, cholesterol: 75, carbs: 10, fiber: 1, sugar: 8, protein: 16, sodium: 540, potassium: 360, restaurant: "qdoba" },
  { name: "Brisket Birria", category: "Protein", serving: "3.5 oz", servingGrams: 99, calories: 140, fat: 7, satFat: 3, transFat: 0, cholesterol: 50, carbs: 3, fiber: 0, sugar: 1, protein: 15, sodium: 450, potassium: 260, restaurant: "qdoba" },
  { name: "Plant-Based Impossible™", category: "Protein", serving: "3.1 oz", servingGrams: 88, calories: 170, fat: 9, satFat: 4, transFat: 0, cholesterol: 0, carbs: 8, fiber: 0, sugar: 1, protein: 13, sodium: 350, potassium: 520, restaurant: "qdoba" },
  { name: "Three Cheese Queso", category: "Quesos", serving: "2 oz", servingGrams: 57, calories: 80, fat: 8, satFat: 5, transFat: 0, cholesterol: 20, carbs: 3, fiber: 0, sugar: 1, protein: 3, sodium: 340, potassium: 45, restaurant: "qdoba" },
  { name: "Queso Diablo", category: "Quesos", serving: "2 oz", servingGrams: 57, calories: 90, fat: 7, satFat: 5, transFat: 0, cholesterol: 15, carbs: 3, fiber: 0, sugar: 1, protein: 2, sodium: 320, potassium: 60, restaurant: "qdoba" },
  { name: "Hand-Crafted Guacamole", category: "Toppings", serving: "2 oz", servingGrams: 57, calories: 80, fat: 8, satFat: 1, transFat: 0, cholesterol: 0, carbs: 5, fiber: 4, sugar: 0, protein: 1, sodium: 160, potassium: 260, restaurant: "qdoba" },
  { name: "Pickled Red Onions", category: "Toppings", serving: "0.8 oz", servingGrams: 23, calories: 10, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 3, fiber: 0, sugar: 2, protein: 0, sodium: 75, potassium: 15, restaurant: "qdoba" },
  { name: "Pickled Jalapeños", category: "Toppings", serving: "1 oz", servingGrams: 28, calories: 15, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 3, fiber: 0, sugar: 2, protein: 0, sodium: 90, potassium: 30, restaurant: "qdoba" },
  { name: "Fajita Veggies", category: "Toppings", serving: "2 oz", servingGrams: 57, calories: 40, fat: 3, satFat: 0, transFat: 0, cholesterol: 0, carbs: 3, fiber: 1, sugar: 2, protein: 1, sodium: 115, potassium: 95, restaurant: "qdoba" },
  { name: "Shredded Cheese", category: "Toppings", serving: "1 oz", servingGrams: 28, calories: 110, fat: 9, satFat: 5, transFat: 0, cholesterol: 30, carbs: 1, fiber: 0, sugar: 0, protein: 7, sodium: 180, potassium: 30, restaurant: "qdoba" },
  { name: "Sour Cream", category: "Toppings", serving: "1 oz", servingGrams: 28, calories: 50, fat: 5, satFat: 3, transFat: 0, cholesterol: 15, carbs: 3, fiber: 0, sugar: 1, protein: 1, sodium: 10, potassium: 40, restaurant: "qdoba" },
  { name: "Shredded Romaine Lettuce", category: "Toppings", serving: "0.25 oz", servingGrams: 7, calories: 0, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, sodium: 0, potassium: 0, restaurant: "qdoba" },
  { name: "Cotija (Crumbled White Cheese)", category: "Toppings", serving: "0.25 oz", servingGrams: 7, calories: 25, fat: 2, satFat: 1.5, transFat: 0, cholesterol: 5, carbs: 0, fiber: 0, sugar: 0, protein: 1, sodium: 95, potassium: 5, restaurant: "qdoba" },
  { name: "Crispy Tortilla Strips", category: "Toppings", serving: "0.5 oz", servingGrams: 14, calories: 70, fat: 4.5, satFat: 0, transFat: 0, cholesterol: 0, carbs: 8, fiber: 0, sugar: 0, protein: 1, sodium: 35, potassium: 30, restaurant: "qdoba" },
  { name: "Cilantro", category: "Toppings", serving: "0.12 oz", servingGrams: 3, calories: 0, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, sodium: 0, potassium: 20, restaurant: "qdoba" },
  { name: "Mango Salsa (Mild)", category: "Salsa & Sauces", serving: "2 oz", servingGrams: 57, calories: 25, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 7, fiber: 1, sugar: 5, protein: 0, sodium: 120, potassium: 70, restaurant: "qdoba" },
  { name: "Roasted Tomato Salsa (Mild)", category: "Salsa & Sauces", serving: "1 oz", servingGrams: 28, calories: 5, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 1, fiber: 0, sugar: 1, protein: 0, sodium: 190, potassium: 15, restaurant: "qdoba" },
  { name: "Freshly Made Pico de Gallo (Mild)", category: "Salsa & Sauces", serving: "1 oz", servingGrams: 28, calories: 5, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 1, fiber: 0, sugar: 0, protein: 0, sodium: 70, potassium: 70, restaurant: "qdoba" },
  { name: "Chile Corn Salsa (Mild)", category: "Salsa & Sauces", serving: "1 oz", servingGrams: 28, calories: 25, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 5, fiber: 0, sugar: 1, protein: 1, sodium: 75, potassium: 74, restaurant: "qdoba" },
  { name: "Citrus Lime Vinaigrette (Mild)", category: "Salsa & Sauces", serving: "1.5 oz", servingGrams: 43, calories: 100, fat: 8, satFat: 0.5, transFat: 0, cholesterol: 0, carbs: 7, fiber: 0, sugar: 5, protein: 0, sodium: 330, potassium: 0, restaurant: "qdoba" },
  { name: "Salsa Verde (Medium)", category: "Salsa & Sauces", serving: "1 oz", servingGrams: 28, calories: 10, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 0, fiber: 1, sugar: 1, protein: 0, sodium: 240, potassium: 20, restaurant: "qdoba" },
  { name: "Chile Crema (Medium)", category: "Salsa & Sauces", serving: "1 oz", servingGrams: 28, calories: 130, fat: 14, satFat: 2, transFat: 0, cholesterol: 10, carbs: 1, fiber: 0, sugar: 1, protein: 0, sodium: 290, potassium: 16, restaurant: "qdoba" },
  { name: "Picante Ranch Dressing (Medium)", category: "Salsa & Sauces", serving: "1.5 oz", servingGrams: 43, calories: 80, fat: 8, satFat: 2, transFat: 0, cholesterol: 15, carbs: 3, fiber: 0, sugar: 1, protein: 1, sodium: 180, potassium: 45, restaurant: "qdoba" },
  { name: "Salsa Roja (Hot)", category: "Salsa & Sauces", serving: "1 oz", servingGrams: 28, calories: 5, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 2, fiber: 0, sugar: 1, protein: 0, sodium: 85, potassium: 35, restaurant: "qdoba" },
  { name: "Fiery Habanero Salsa (Hot)", category: "Salsa & Sauces", serving: "1 oz", servingGrams: 28, calories: 10, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 2, fiber: 1, sugar: 1, protein: 0, sodium: 110, potassium: 10, restaurant: "qdoba" },

  // Chipotle menu items (approximate nutrition data - would need official data for production)
  { name: "Burrito", category: "Style", serving: "1 large flour tortilla", calories: 320, fat: 9, satFat: 0.5, transFat: 0, cholesterol: 0, carbs: 50, fiber: 3, sugar: 0, protein: 8, sodium: 600, restaurant: "chipotle" },
  { name: "Soft Tacos", category: "Style", serving: "3 small flour tortillas", calories: 240, fat: 2.5, satFat: 0, transFat: 0, cholesterol: 0, carbs: 13, fiber: 1, sugar: 0, protein: 2, sodium: 160, restaurant: "chipotle" },
  { name: "Crispy Tacos", category: "Style", serving: "3 crispy corn tortillas", calories: 210, fat: 3, satFat: 0, transFat: 0, cholesterol: 0, carbs: 10, fiber: 1, sugar: 0, protein: 1, sodium: 0, restaurant: "chipotle" },
  { name: "Cilantro-Lime Brown Rice", category: "Base", serving: "4 oz", calories: 210, fat: 6, satFat: 0, transFat: 0, cholesterol: 0, carbs: 36, fiber: 2, sugar: 0, protein: 4, sodium: 190, restaurant: "chipotle" },
  { name: "Cilantro-Lime White Rice", category: "Base", serving: "4 oz", calories: 210, fat: 4, satFat: 1, transFat: 0, cholesterol: 0, carbs: 40, fiber: 1, sugar: 0, protein: 4, sodium: 350, restaurant: "chipotle" },
  { name: "Black Beans", category: "Beans", serving: "4 oz", calories: 130, fat: 1.5, satFat: 0, transFat: 0, cholesterol: 0, carbs: 22, fiber: 7, sugar: 2, protein: 8, sodium: 210, restaurant: "chipotle" },
  { name: "Pinto Beans", category: "Beans", serving: "4 oz", calories: 130, fat: 1.5, satFat: 0, transFat: 0, cholesterol: 0, carbs: 21, fiber: 8, sugar: 1, protein: 8, sodium: 210, restaurant: "chipotle" },
  { name: "Fajita Vegetables", category: "Protein & Veg", serving: "2 oz", calories: 20, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 5, fiber: 1, sugar: 2, protein: 1, sodium: 150, restaurant: "chipotle" },
  { name: "Barbacoa", category: "Protein & Veg", serving: "4 oz", calories: 170, fat: 7, satFat: 2.5, transFat: 0, cholesterol: 65, carbs: 2, fiber: 1, sugar: 0, protein: 24, sodium: 530, restaurant: "chipotle" },
  { name: "Chicken", category: "Protein & Veg", serving: "4 oz", calories: 180, fat: 7, satFat: 3, transFat: 0, cholesterol: 125, carbs: 0, fiber: 0, sugar: 0, protein: 32, sodium: 310, restaurant: "chipotle" },
  { name: "Carnitas", category: "Protein & Veg", serving: "4 oz", calories: 210, fat: 12, satFat: 7, transFat: 0, cholesterol: 65, carbs: 0, fiber: 0, sugar: 0, protein: 23, sodium: 450, restaurant: "chipotle" },
  { name: "Steak", category: "Protein & Veg", serving: "4 oz", calories: 150, fat: 6, satFat: 2.5, transFat: 0, cholesterol: 80, carbs: 1, fiber: 1, sugar: 0, protein: 21, sodium: 330, restaurant: "chipotle" },
  { name: "Sofritas", category: "Protein & Veg", serving: "4 oz", calories: 150, fat: 10, satFat: 1.5, transFat: 0, cholesterol: 0, carbs: 9, fiber: 3, sugar: 5, protein: 8, sodium: 560, restaurant: "chipotle" },
  { name: "Supergreens Salad Mix", category: "Base", serving: "3 oz", calories: 15, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 3, fiber: 2, sugar: 1, protein: 1, sodium: 15, restaurant: "chipotle" },
  { name: "Romaine Lettuce (tacos)", category: "Other toppings", serving: "1 oz", calories: 5, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 1, fiber: 1, sugar: 0, protein: 0, sodium: 0, restaurant: "chipotle" },
  { name: "Fresh Tomato Salsa", category: "Salsa", serving: "4 oz", calories: 25, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 4, fiber: 1, sugar: 1, protein: 0, sodium: 550, restaurant: "chipotle" },
  { name: "Roasted Chili-Corn Salsa", category: "Salsa", serving: "4 oz", calories: 80, fat: 1.5, satFat: 0, transFat: 0, cholesterol: 0, carbs: 16, fiber: 3, sugar: 4, protein: 3, sodium: 330, restaurant: "chipotle" },
  { name: "Tomatillo-Green Chili Salsa", category: "Salsa", serving: "2 fl oz", calories: 15, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 4, fiber: 0, sugar: 2, protein: 0, sodium: 260, restaurant: "chipotle" },
  { name: "Tomatillo-Red Chili Salsa", category: "Salsa", serving: "2 fl oz", calories: 30, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, carbs: 4, fiber: 1, sugar: 0, protein: 0, sodium: 500, restaurant: "chipotle" },
  { name: "Cheese", category: "Other toppings", serving: "1 oz", calories: 110, fat: 8, satFat: 5, transFat: 0, cholesterol: 30, carbs: 1, fiber: 0, sugar: 0, protein: 6, sodium: 190, restaurant: "chipotle" },
  { name: "Sour Cream", category: "Other toppings", serving: "2 oz", calories: 110, fat: 9, satFat: 7, transFat: 0, cholesterol: 40, carbs: 2, fiber: 0, sugar: 2, protein: 2, sodium: 30, restaurant: "chipotle" },
  { name: "Guacamole (topping)", category: "Other toppings", serving: "4 oz", calories: 230, fat: 22, satFat: 3.5, transFat: 0, cholesterol: 0, carbs: 8, fiber: 6, sugar: 1, protein: 2, sodium: 370, restaurant: "chipotle" },
  { name: "Queso Blanco", category: "Other toppings", serving: "2 oz", calories: 120, fat: 9, satFat: 6, transFat: 0, cholesterol: 30, carbs: 4, fiber: 0, sugar: 1, protein: 5, sodium: 250, restaurant: "chipotle" },
  { name: "Queso Blanco (side)", category: "Sides", serving: "4 oz", calories: 240, fat: 18, satFat: 12, transFat: 1, cholesterol: 60, carbs: 7, fiber: 0, sugar: 2, protein: 10, sodium: 490, restaurant: "chipotle" },
  { name: "Queso Blanco (large)", category: "Sides", serving: "8 oz", calories: 480, fat: 37, satFat: 23, transFat: 1.5, cholesterol: 120, carbs: 14, fiber: 1, sugar: 5, protein: 20, sodium: 980, restaurant: "chipotle" },
  { name: "Chips (regular)", category: "Sides", serving: "4 oz", calories: 540, fat: 25, satFat: 3.5, transFat: 0, cholesterol: 0, carbs: 73, fiber: 7, sugar: 1, protein: 7, sodium: 390, restaurant: "chipotle" },
  { name: "Chips (large)", category: "Sides", serving: "6 oz", calories: 810, fat: 38, satFat: 5, transFat: 0, cholesterol: 0, carbs: 110, fiber: 11, sugar: 2, protein: 11, sodium: 590, restaurant: "chipotle" },
  { name: "Guacamole (side)", category: "Sides", serving: "4 oz", calories: 230, fat: 22, satFat: 3.5, transFat: 0, cholesterol: 0, carbs: 8, fiber: 6, sugar: 1, protein: 2, sodium: 370, restaurant: "chipotle" },
  { name: "Guacamole (large)", category: "Sides", serving: "8 oz", calories: 460, fat: 44, satFat: 7, transFat: 0, cholesterol: 0, carbs: 16, fiber: 12, sugar: 2, protein: 4, sodium: 740, restaurant: "chipotle" },
  { name: "Chipotle-Honey Vinaigrette", category: "Salsa", serving: "2 fl oz", calories: 220, fat: 16, satFat: 2.5, transFat: 0, cholesterol: 0, carbs: 18, fiber: 1, sugar: 12, protein: 1, sodium: 850, restaurant: "chipotle" }
];

// Helper functions
export const getIngredientsForRestaurant = (restaurantId: string): Ingredient[] => {
  return restaurantIngredients.filter(ingredient => ingredient.restaurant === restaurantId);
};