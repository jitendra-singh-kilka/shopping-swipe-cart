import { Product } from "../models/Product";

export const ProductInfo = ({ product }: { product: Product }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
      <h2 className="text-xl font-semibold capitalize">{product.name}</h2>
      <p className="mb-2 capitalize">{product.brand}</p>

      <div className="flex items-center gap-[10px]">
        <span className="font-bold text-lg">
          ₹{product.price.toLocaleString()}
        </span>
        {product.discountPercentage && (
          <>
            <span className="line-through text-sm opacity-80">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {product.discountPercentage}% OFF
            </span>
          </>
        )}
      </div>
    </div>
  );
};
