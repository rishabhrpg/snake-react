import { Fragment } from "react";
import { SnakeType } from "../../interfaces/snake-interfaces";

export const Snake = (props: { snake: SnakeType }) => {
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
