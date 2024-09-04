import React, { useState } from "react";
import { documentImages, FALLBACK_IMAGE } from "../utils";
import { DataItem } from "../types/types";

interface CardProps {
  item: DataItem;
}

export const Card = ({ item }: CardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
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
