import React from "react";
import { useFetchData } from "../hooks/useFetchCardData";
import { Card } from "./Card";

export const Container = () => {
  const { data, loading, error } = useFetchData();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="card-container">
      {data.map((item) => {
        return <Card item={item} />;
      })}
    </div>
  );
};
