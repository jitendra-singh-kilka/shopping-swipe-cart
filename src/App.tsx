import { useState } from "react";
import { DataProducts } from "./data/DataProducts";
import { ProductContext } from "./context/ProductContext";
import { ProductList } from "./components/ProductList";

export default function App() {
  const [totalLiked, setTotalLiked] = useState(0);
  const [cart, setCart] = useState(0);
  const [totalDisliked, setTotalDisliked] = useState(0);
  const [current, setCurrent] = useState(0);
  const [stop, setStop] = useState(false);

  const handleSwipe = (swiped = "left", id = 1) => {
    const product = DataProducts.find((p) => p.id === id);
    if (!product) return;
    switch (swiped) {
      case "right":
        setTotalLiked((prev) => ++prev);
        console.log("Liked Product ID: " + id);
        break;
      case "left":
        setTotalDisliked((prev) => ++prev);
        console.log("Passed Product ID: " + id);
        break;
      case "up":
        setCart((prev) => ++prev);
        console.log("Add to cart Product ID: " + id);
        break;
    }
    if (current < DataProducts.length - 1) {
      setCurrent(current + 1);
    } else {
      setStop(true);
    }
  };

  const reset = () => {
    setCurrent(0);
    setStop(false);
    setTotalLiked(0);
    setTotalDisliked(0);
    setCart(0);
  };

  const contextValue = {
    products: DataProducts,
    current: current,
    totalLiked: totalLiked,
    cart: cart,
    totalDisliked: totalDisliked,
    handleSwipe: handleSwipe,
    stop: stop,
    reset: reset,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      <div className="flex flex-col min-h-screen p-4">
        {!stop ? (
          <ProductList />
        ) : (
          <div className="flex flex-col items-center justify-center mt-8 text-center">
            <p className="mb-4 text-lg font-medium">List Ended</p>
            <button
              onClick={reset}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Start Over
            </button>

            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm text-sm">
              <h3 className="text-lg font-semibold mb-2">
                Swiping Interactions
              </h3>
              <div className="text-left">
                <p className="font-medium flex justify-between border-[gray] pb-2">
                  Liked:
                  <span className="text-[green] text-right"> {totalLiked}</span>
                </p>
                <p className="font-medium flex justify-between border-[gray] pb-2">
                  Disliked:
                  <span className="text-[red]"> {totalDisliked}</span>
                </p>
                <p className="font-medium flex justify-between border-[gray] pb-2">
                  Cart:
                  <span className="text-[blue]"> {cart}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProductContext.Provider>
  );
}
