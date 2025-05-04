import { Product } from "./Product";

export interface AppContextType {
  products: Product[];
  current: number;
  totalLiked: number;
  cart: number;
  totalDisliked: number;
  handleSwipe: (swiped?: string, id?: number) => void;
  stop: boolean;
  reset: () => void;
}
