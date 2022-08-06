import { Location } from "../../interfaces/snake-interfaces";

export const Food = (props : { food: Location }) => {
  return (
    <div
      className="food"
      style={{ gridRowStart: props.food.y, gridColumnStart: props.food.x }}
    ></div>
  );
};
