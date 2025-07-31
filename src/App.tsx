import { useState } from 'react';
import RestaurantSelection from './RestaurantSelection';
import NutritionCalculator from './components/NutritionCalculator';

interface AppState {
  currentView: 'restaurant-selection' | 'calculator';
  selectedRestaurant: {
    id: string;
    name: string;
  } | null;
}

const App = () => {
  const [appState, setAppState] = useState<AppState>({
    currentView: 'restaurant-selection',
    selectedRestaurant: null
  });

  const handleRestaurantSelection = (restaurantId: string) => {
    const restaurantName = restaurantId === 'qdoba' ? 'Qdoba' : 'Chipotle';
    
    setAppState({
      currentView: 'calculator',
      selectedRestaurant: {
        id: restaurantId,
        name: restaurantName
      }
    });
  };

  const handleBackToSelection = () => {
    setAppState({
      currentView: 'restaurant-selection',
      selectedRestaurant: null
    });
  };

  // Render the appropriate view based on current state
  if (appState.currentView === 'calculator' && appState.selectedRestaurant) {
    return (
      <NutritionCalculator
        restaurantId={appState.selectedRestaurant.id}
        restaurantName={appState.selectedRestaurant.name}
        onBack={handleBackToSelection}
      />
    );
  }

  // Default to restaurant selection
  return <RestaurantSelection onSelectRestaurant={handleRestaurantSelection} />;
};

export default App;