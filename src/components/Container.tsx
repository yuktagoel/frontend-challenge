import React, { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchCardData";
import { Card } from "./Card";
import { DataItem } from "../types/types";

export const Container = () => {
  const { data, loading, error } = useFetchData();
  const [cards, setCards] = useState<DataItem[]>(data);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="card-container">
      {cards.map((item) => {
        return <Card key={item.id} item={item} moveCard={moveCard} />;
      })}
    </div>
  );
};
