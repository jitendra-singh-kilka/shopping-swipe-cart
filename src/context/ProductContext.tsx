import { createContext, useContext } from 'react';
import { AppContextType } from '../models/AppContextType';

const defaultContextValue: AppContextType = {
  products: [],
  current: 0,
  totalLiked: 0,
  cart: 0,
  totalDisliked: 0,
  handleSwipe: () => {}, 
  stop: false,
  reset: () => {} 
};

export const ProductContext = createContext<AppContextType>(defaultContextValue);

export const useProductContext = () => {
  return useContext(ProductContext);
};