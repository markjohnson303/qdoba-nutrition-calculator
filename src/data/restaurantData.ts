// Restaurant interface
export interface Restaurant {
  id: string;
  name: string;
}

// Available restaurants
export const restaurants: Restaurant[] = [
  {
    id: 'qdoba',
    name: 'Qdoba',
  },
  {
    id: 'chipotle',
    name: 'Chipotle'
  }
];

// Helper function to get restaurant by ID
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === id);
};

// Helper function to get restaurant name by ID
export const getRestaurantName = (id: string): string => {
  const restaurant = getRestaurantById(id);
  return restaurant ? restaurant.name : '';
};