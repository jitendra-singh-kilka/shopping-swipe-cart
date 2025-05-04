import { useState, useRef } from "react";

const useSwipe = ({
  onSwipe,
  id,
  swipeLimit = 100,
}: {
  onSwipe?: (swipeDirection: string, id: number) => void; // ✅ Fix here
  id: number;
  swipeLimit: number;
}) => {
  const [positionOfCard, setPositionOfCard] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  const startDragging = (pointX: number, pointY: number) => {
    dragging.current = true;
    start.current = { x: pointX, y: pointY };
  };

  const handleMove = (pointX: number, pointY: number) => {
    if (!dragging.current) return;
    setPositionOfCard({
      x: pointX - start.current.x,
      y: pointY - start.current.y,
    });
  };

  const endDragging = () => {
    if (!dragging.current) return;

    const pointX = positionOfCard.x;
    const pointY = positionOfCard.y;

    if (Math.abs(pointX) > swipeLimit || Math.abs(pointY) > swipeLimit) {
      if (Math.abs(pointX) > Math.abs(pointY)) {
        onSwipe?.(pointX > 0 ? "right" : "left", id);
      } else if (pointY < 0) {
        onSwipe?.("up", id);
      }
    }

    setPositionOfCard({ x: 0, y: 0 });
    dragging.current = false;
  };

  const mouseEvents = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => startDragging(e.clientX, e.clientY),
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => handleMove(e.clientX, e.clientY),
    onMouseUp: () => endDragging(),
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) =>startDragging(e.touches[0].clientX, e.touches[0].clientY),
    onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => handleMove(e.touches[0].clientX, e.touches[0].clientY),
    onTouchEnd: () => endDragging(),
  };

  const style = {
    transform: `translate(${positionOfCard.x}px, ${
      positionOfCard.y
    }px) rotate(${positionOfCard.x * 0.1}deg)`,
    transition: dragging.current ? "none" : "transform 0.3s ease",
  };

  return { mouseEvents, style };
};

export default useSwipe;
