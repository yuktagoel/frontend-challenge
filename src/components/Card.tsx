import React, { useState } from "react";
import { documentImages } from "../utils";
import { DataItem } from "../types/types";

interface DataCardProps {
  item: DataItem;
}

export const Card = ({ item }: DataCardProps) => {
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
            src={documentImages[item.type]}
            alt="placeholder"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
};
