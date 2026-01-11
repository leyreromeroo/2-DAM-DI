export interface RecetaModel {
  id: number;
  title: string;
  foto?: string;
  number_diner: number;
  type: {
    id: number;
    name: string;
    description: string;
  };
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  steps: {
    order: number;
    description: string;
  }[];
  nutrients: {
    id: number;
    type: {
      id: number;
      name: string;
      unit: string;
    };
    quantity: number;
  }[];
  rating: {
    'number-votes': number;
    'rating-avg': number;
  };
}