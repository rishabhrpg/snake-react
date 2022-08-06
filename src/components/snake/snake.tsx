import { Fragment, useEffect, useState } from "react";
import {
  Direction,
  Location,
  SnakeType,
} from "../../interfaces/snake-interfaces";

export const Snake = (props: { snake: SnakeType }) => {
  // console.log("Rendering Snake ");

  const renderSnake = props.snake.map((location, index) => {
    return (
      <div
        key={index}
        className="snake"
        style={{ gridRowStart: location.y, gridColumnStart: location.x }}
      ></div>
    );
  });

  return <Fragment>{renderSnake}</Fragment>;
};
