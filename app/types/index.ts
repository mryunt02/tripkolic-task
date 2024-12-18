export interface Location {
  id: number;
  lat: number;
  lng: number;
  name: string;
  stop: number | null;
  activities: { name: string }[];
  sightseeing: boolean;
}

export interface Route {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  operatingDays: string[];
  locations: Location[];
  groupSize: number;
  startTime: string[];
  duration: string;
  guideLanguage: string[];
}

export interface FoodAndDrink {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Price {
  id: number;
  isShared: boolean;
  isPrivate: boolean;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  addOns: any[];
  additionalPrices: {
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
  };
  group: {
    size: number;
    retailPrice: number;
  };
}

export interface Tour {
  id: number;
  productId: string;
  title: string;
  description: string;
  isPayLater: boolean;
  cutOffTime: number;
  transferType: string;
  isTransfer: boolean;
  transferDescription: string;
  activityLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  vehicle: {
    id: number;
    name: string;
  };
  foodAndDrinks: FoodAndDrink[];
  tourCategory: {
    id: number;
    name: string;
  };
  routes: Route[];
  price: Price;
  galleries: {
    id: number;
    url: string;
  }[];
}
