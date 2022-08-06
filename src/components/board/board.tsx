import React from "react";
import {
  Direction,
  Location,
  SnakeType,
} from "../../interfaces/snake-interfaces";
import { Food } from "../food/food";
import { Snake } from "../snake/snake";

export class Board extends React.Component<
  any,
  {
    snake: SnakeType;
    food: Location;
    lastRender: number;
    snakeDirection: Direction;
  }
> {
  private speed = 2;
  private foodAudio = new Audio("/snake-react/assets/sounds/food.mp3");
  private gameOverAudio = new Audio("/snake-react/assets/sounds/game-over.mp3");
  private moveAudio = new Audio("/snake-react/assets/sounds/move.mp3");
  private musicAudio = new Audio("/snake-react/assets/sounds/music.mp3");

  constructor(props: any) {
    super(props);
    this.state = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 12, y: 13 },
      lastRender: 0,
      snakeDirection: { x: 0, y: 0 },
    };
    window.requestAnimationFrame((ctime) => this.gameLoop(ctime));
  }

  private generateFood(): Location {
    const food = {
      x: Math.floor(Math.random() * 18),
      y: Math.floor(Math.random() * 18),
    };
    if (food.x === 0 || food.y === 0) {
      return this.generateFood();
    }
    return food;
  }

  private eatFood(snake: SnakeType, food: Location): boolean {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      this.foodAudio.play();
      return true;
    }
    return false;
  }

  private checkCollisionWithWall(snake: SnakeType): boolean {
    if (
      snake[0].x < 0 ||
      snake[0].x > 18 ||
      snake[0].y < 0 ||
      snake[0].y > 18
    ) {
      return true;
    }
    return false;
  }

  private checkCollisionWithSnake(snake: SnakeType): boolean {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  private moveSnake(ctime: number) {
    const newSnake = [...this.state.snake];
    for (let i = newSnake.length - 2; i >= 0; i--) {
      newSnake[i + 1] = { ...newSnake[i] };
    }
    newSnake[0] = {
      x: newSnake[0].x + this.state.snakeDirection.x,
      y: newSnake[0].y + this.state.snakeDirection.y,
    };

    if (
      this.checkCollisionWithSnake(newSnake) ||
      this.checkCollisionWithWall(newSnake)
    ) {
      this.gameOverAudio.play();
      alert("Game Over");
      this.resetState();
      return;
    }
    if (this.eatFood(newSnake, this.state.food)) {
      console.log("EAT Food");
      const newFood = this.generateFood();
      console.log("New food spawned at : ", newFood);
      newSnake.push({
        x: newSnake[newSnake.length - 1].x + this.state.snakeDirection.x,
        y: newSnake[newSnake.length - 1].y + this.state.snakeDirection.y,
      });
      this.setState({
        ...this.state,
        snake: newSnake,
        lastRender: ctime / 1000,
        food: newFood,
      });
      return;
    }    
    this.setState({ ...this.state, snake: newSnake, lastRender: ctime / 1000 });
  }

  public componentDidMount() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        this.setState({ ...this.state, snakeDirection: { x: 0, y: -1 } });
      } else if (e.key === "ArrowDown") {
        this.setState({ ...this.state, snakeDirection: { x: 0, y: 1 } });
      } else if (e.key === "ArrowLeft") {
        this.setState({ ...this.state, snakeDirection: { x: -1, y: 0 } });
      } else if (e.key === "ArrowRight") {
        this.setState({ ...this.state, snakeDirection: { x: 1, y: 0 } });
      }
    });
  }

  private gameLoop(ctime: number) {
    window.requestAnimationFrame((ctime) => this.gameLoop(ctime));
    if (ctime / 1000 > this.state.lastRender + 1 / this.speed) {
      this.moveSnake(ctime);
    }
  }

  private resetState() {
    this.setState({
      snake: [{ x: 10, y: 10 }],
      food: { x: 12, y: 13 },
      lastRender: 0,
      snakeDirection: { x: 0, y: 0 },
    });
  }

  render() {
    return (
      <div id="board">
        <Snake snake={this.state.snake}></Snake>
        <Food food={this.state.food}></Food>
      </div>
    );
  }
}
