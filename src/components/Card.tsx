import React, { useRef, useState } from "react";
import { documentImages, FALLBACK_IMAGE } from "../utils";
import { DataItem } from "../types/types";
import { useDrag, useDrop } from "react-dnd";

interface CardProps {
  item: DataItem;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  setClickedCard: (item: DataItem) => any;
}

export const Card = ({ item, moveCard, setClickedCard }: CardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const index = item.position;
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover(draggedItem: { id: string; index: number }) {
      if (draggedItem.index !== index) {
        console.log("dragged", draggedItem.id);
        console.log("current", item.id, item.position);
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      onClick={() => {
        setClickedCard(item);
      }}
      ref={ref}
      className="card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <span>{item.title}</span>
      <div className="data-card">
        <div
          className="skeleton-loader"
          style={{ display: isLoading ? "flex" : "none" }}
        >
          <div className="spinner"></div>
        </div>
        <div style={{ display: !isLoading ? "flex" : "none" }}>
          <img
            src={documentImages[item.id] ?? FALLBACK_IMAGE}
            alt="placeholder"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
};
