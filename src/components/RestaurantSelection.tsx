import React from 'react';
import { ArrowRight } from 'lucide-react';
import { restaurants } from '../data/restaurantData';

interface RestaurantSelectionProps {
  onSelectRestaurant: (restaurantId: string) => void;
}

const RestaurantSelection: React.FC<RestaurantSelectionProps> = ({ onSelectRestaurant }) => {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary flex flex-col">
      <div className="max-w-4xl mx-auto p-6 flex-1 flex flex-col">
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

        <div className="mt-auto pt-16 max-w-3xl mx-auto">
          <div className="bg-background border border-stroke rounded-lg p-6">
            <h3 className="text-text-primary font-semibold mb-3">Disclaimer</h3>
            <p className="text-text-secondary text-sm mb-3">
              This is an unofficial nutrition calculator that I built for fun, personal use, and education. It's not affiliated with Chipotle, Qdoba, MacroFactor, or anyone else.
            </p>
            <p className="text-text-secondary text-sm mb-3">
              The nutrition info might not be 100% accurate or up to date, so if you have specific dietary needs, allergies, or health goals, you should double-check with the restaurant or a healthcare professional. I don't collect any data, and I'm not responsible for how you use the tool or any decisions you make based on it. Use it at your own risk.
            </p>
            <p className="text-text-secondary text-sm mb-3">
              All brand names and logos belong to their respective owners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSelection; 