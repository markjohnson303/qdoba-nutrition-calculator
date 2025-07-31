import React from 'react';
import { ArrowRight } from 'lucide-react';
import { restaurants } from './data/restaurantData';

interface RestaurantSelectionProps {
  onSelectRestaurant: (restaurantId: string) => void;
}

const RestaurantSelection: React.FC<RestaurantSelectionProps> = ({ onSelectRestaurant }) => {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-titleBar text-text-primary mb-4">Nutrition Calculator</h1>
          <p className="text-lg text-text-secondary">Choose your restaurant to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-background-card border border-stroke rounded-lg p-8 text-center shadow-card"
            >
              <div className="mb-6">
                <h2 
                  className="text-text-primary text-2xl font-bold mb-2"
                >
                  {restaurant.name}
                </h2>
              </div>
              <button
                onClick={() => onSelectRestaurant(restaurant.id)}
                className="bg-white text-gray-900 px-6 py-3 rounded-pill font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center gap-2"
              >
                Build your meal
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-tertiary text-sm">
            More restaurants coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSelection;