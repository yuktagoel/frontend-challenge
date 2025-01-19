import React, { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchCardData";
import { Card } from "./Card";
import { DataItem } from "../types/types";
import { documentImages, FALLBACK_IMAGE } from "../utils";

export const Container = () => {
  const { data, loading, error } = useFetchData();
  const [cards, setCards] = useState<DataItem[]>(data);
  const [clickedItem, setClickedItem] = useState<DataItem | null>(null);

  useEffect(() => {
    if (data) {
      setCards(data);
    }
  }, [data]);

  const moveCard = React.useMemo(() => {
    return (dragIndex: number, hoverIndex: number) => {
      const updatedCards = [...cards];
      const [draggedCard] = updatedCards.splice(dragIndex, 1);
      updatedCards.splice(hoverIndex, 0, draggedCard);
      setCards(updatedCards);
    };
  }, [cards]);

  const setClickedCard = (item: DataItem) => {
    setClickedItem(item);
  };
  interface HandleKeyDownEvent extends React.KeyboardEvent<HTMLDivElement> {}

  const handleKeyDown = (event: HandleKeyDownEvent) => {
    if (event.key === "Escape") {
      setClickedItem(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="container">
      {clickedItem && (
        <div className="card-modal">
          <div>{clickedItem.title}</div>
          <img
            height={600}
            width={600}
            src={documentImages[clickedItem.id] ?? FALLBACK_IMAGE}
            alt="placeholder"
          />{" "}
        </div>
      )}
      <div
        tabIndex={0}
        className={clickedItem ? "blur-container" : "card-container"}
        onKeyDown={handleKeyDown}
      >
        {cards.map((item) => {
          return (
            <Card
              key={item.id}
              item={item}
              moveCard={moveCard}
              setClickedCard={setClickedCard}
            />
          );
        })}
      </div>
    </div>
  );
};
