export interface TravelState {
  budget: number;
  people: number;
  groupType: 'solo' | 'couple' | 'friends';
  country: string;
  state: string;
  entertainment: string[];
  food: string[];
  accommodation: string | null;
}

export interface StateRecommendation {
  id: string;
  name: string;
  country: string;
  seasonLabel: string;
  seasonType: 'high' | 'low' | 'moderate';
  description: string;
  avgCostPerPerson: number;
}

export interface EntertainmentOption {
  id: string;
  label: string;
  icon: string;
}

export interface FoodOption {
  id: string;
  label: string;
  icon: string;
}

export interface AccommodationOption {
  id: string;
  name: string;
  type: 'hotel' | 'hostel' | 'pousada';
  pricePerNight: number;
  budgetMatch: number;
  location: string;
  description: string;
}
