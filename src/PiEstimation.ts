interface PiEstimationConfig {
  totalPointsElement?: HTMLElement;
  totalPointsInCircleElement?: HTMLElement;
  piElement?: HTMLElement;
  interval: number;
  squareStyle: string;
  circleStyle: string;
  pointStyle: string;
}

const defaultConfig: PiEstimationConfig = {
  interval: 100,
  squareStyle: "red",
  circleStyle: "blue",
  pointStyle: "rgba(0, 0, 0, 0.8)",
};

export default class PiEstimation {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly w: number;
  private readonly h: number;
  private readonly d: number;
  private interval = 0;
  private totalPoints = 0;
  private pointsInCircle = 0;
  private readonly config: PiEstimationConfig;

  constructor(
    canvas: HTMLCanvasElement,
    config: Partial<PiEstimationConfig> = {}
  ) {
    this.config = Object.assign(defaultConfig, config);
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("?");
    }
    this.ctx = ctx;

    const bcr = this.canvas.getBoundingClientRect();
    this.w = bcr.width;
    this.h = bcr.height;
    this.d = Math.min(this.w, this.h);

    this.initializeCanvas();
  }

  private initializeCanvas() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.strokeStyle = this.config.squareStyle;
    this.ctx.strokeRect(0, 0, this.d, this.d);
    this.ctx.strokeStyle = this.config.circleStyle;
    this.ctx.beginPath();
    this.ctx.arc(this.d / 2, this.d / 2, this.d / 2, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.strokeStyle = this.config.pointStyle;
  }

  stop() {
    window.clearInterval(this.interval);
  }

  start() {
    if (this.interval) {
      this.stop();
    }
    this.interval = window.setInterval(() => {
      this.totalPoints++;
      const x = Math.random();
      const y = Math.random();
      const tx = x * 2 - 1;
      const ty = y * 2 - 1;
      const r = tx * tx + ty * ty;
      if (r <= 1) {
        this.pointsInCircle++;
      }
      const pi = 4 * (this.pointsInCircle / this.totalPoints);
      this.ctx.strokeRect(this.d * x, this.d * y, 1, 1);

      if (this.config.totalPointsElement) {
        this.config.totalPointsElement.textContent = this.totalPoints.toString();
      }

      if (this.config.totalPointsInCircleElement) {
        this.config.totalPointsInCircleElement.textContent = this.pointsInCircle.toString();
      }

      if (this.config.piElement) {
        this.config.piElement.textContent = pi.toFixed(10);
      }
    }, this.config.interval);
  }

  reset() {
    this.totalPoints = 0;
    this.pointsInCircle = 0;
    this.initializeCanvas();
  }
}
