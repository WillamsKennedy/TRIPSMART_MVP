export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  peakMonths: number[];
  rating: number;
  lat: number;
  lng: number;
  imageEmoji: string;
}

export interface AccommodationDetail {
  id: string;
  name: string;
  address: string;
  rating: number;
  pricePerNight: number;
  safetyScore: number;
  distanceToSpots: number;
  lat: number;
  lng: number;
  type: string;
}

export interface RestaurantDetail {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  address: string;
  lat: number;
  lng: number;
}

export interface TravelState {
  budget: number;
  people: number;
  groupType: 'solo' | 'couple' | 'friends';
  month: number | null;
  transportToDestination: string | null;
  country: string;
  countryName: string;
  state: string;
  stateName: string;
  selectedSpots: TouristSpot[];
  accommodation: AccommodationDetail | null;
  localTransport: string | null;
  selectedRestaurants: RestaurantDetail[];
}

export interface StateData {
  id: string;
  name: string;
  country: string;
  demand: 'high' | 'moderate' | 'low';
  demandLabel: string;
  description: string;
}

// Legacy types kept for compatibility
export interface StateRecommendation {
  id: string;
  name: string;
  country: string;
  seasonLabel: string;
  seasonType: 'high' | 'low' | 'moderate';
  description: string;
  avgCostPerPerson: number;
}

export interface EntertainmentOption { id: string; label: string; icon: string; }
export interface FoodOption { id: string; label: string; icon: string; }
export interface AccommodationOption { id: string; name: string; type: string; pricePerNight: number; budgetMatch: number; location: string; description: string; }
