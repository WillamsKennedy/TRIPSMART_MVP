export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  peakMonths: number[];
  rating: number;
  lat: number;
  lng: number;
  imageEmoji: string;
  imageUrl?: string;
  avgCostPerPerson?: number;
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
  budgetLabel: string;
  people: number;
  days: number;
  groupType: 'solo' | 'couple' | 'friends';
  month: number | null;
  transportToDestination: string | null;
  state: string;
  stateName: string;
  selectedSpots: TouristSpot[];
  accommodation: AccommodationDetail | null;
  localTransport: string | null;
}

export interface StateData {
  id: string;
  name: string;
  region: string;
  demand: 'high' | 'moderate' | 'low';
  demandLabel: string;
  description: string;
  imageEmoji: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: { time: string; description: string; location?: string }[];
}
