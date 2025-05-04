import { Product } from "../models/Product";
import useSwipe from "../hooks/useSwipe";
import { ProductInfo } from "./ProductInfo";

export default function ProductCard({ product, onSwipe }: {product:Product, onSwipe?: (swipeDirection: string, id: number) => void}) {
  const { style, mouseEvents } = useSwipe({
    onSwipe: onSwipe,
    id: product.id,
    swipeLimit: 100
  });

  return (
    <div
      className="absolute w-full h-[90dvh] bg-white rounded-xl shadow-lg overflow-hidden"
      style={{
        ...style,
        zIndex: 10,
      }}
      onMouseDown={mouseEvents.onMouseDown}
      onMouseMove={mouseEvents.onMouseMove}
      onMouseUp={mouseEvents.onMouseUp}
      onTouchStart={mouseEvents.onTouchStart}
      onTouchMove={mouseEvents.onTouchMove}
      onTouchEnd={mouseEvents.onTouchEnd}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-[90dvh] object-cover"
      />
      <ProductInfo product={product} />
    </div>
  );
}