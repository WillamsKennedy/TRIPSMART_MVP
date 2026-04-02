export interface RichActivity {
  time: string;
  period: string;
  title: string;
  description: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  estimatedCost: number;
  duration: string;
  transport: string;
  tips?: string;
}

export interface RichDay {
  day: number;
  title: string;
  summary: string;
  activities: RichActivity[];
}

export interface AttractionHighlight {
  name: string;
  description: string;
  lat: number;
  lng: number;
  practicalInfo: {
    address: string;
    hours: string;
    price: string;
    phone?: string;
    instagram?: string;
  };
}

export interface AttractionZone {
  name: string;
  description: string;
  highlights: AttractionHighlight[];
  recommendedItinerary: {
    title: string;
    arrivalTime: string;
    steps: string[];
  };
}

export interface FestiveAlert {
  name: string;
  description: string;
  priceIncrease: string;
}

export interface CostBreakdown {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  extras: number;
}

export interface PracticalTip {
  category: string;
  tip: string;
}

export interface RichItinerary {
  city: string;
  cityId: string;
  introduction: string;
  festiveAlert: FestiveAlert | null;
  days: RichDay[];
  attractionZones: AttractionZone[];
  practicalTips: PracticalTip[];
  estimatedTotalCost: number;
  costBreakdown: CostBreakdown;
}
