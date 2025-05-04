import { useProductContext } from "../context/ProductContext";
import { Product } from "../models/Product";
import ProductCard from "./ProductCard";

const MAX_LIST_PRODUCTS = 3;
export const ProductList = () => {
  const {
    products,
    current,
    handleSwipe,
    stop,
  } = useProductContext();

  const getFilteredProducts = () => {
    if (stop) return [];
    const startIndex = current;
    const endIndex = Math.min(current + MAX_LIST_PRODUCTS, products.length);
    return products.slice(startIndex, endIndex);
  };

  const filteredProducts: Product[] = getFilteredProducts();

  if (stop || filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[90dvh]">
      {filteredProducts.map((product, index) => {
        return (
          <div
            key={product.id}
            className="absolute w-full h-[90dvh]"
            style={{
              zIndex: filteredProducts.length - index
            }}
          >
            <ProductCard
              product={product}
              onSwipe={(index === 0) ? handleSwipe : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}