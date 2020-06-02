import PiEstimation from "./PiEstimation";

const $canvas = document.getElementById("canvas");
const $startButton = document.querySelector(
  "[data-start]"
) as HTMLButtonElement;
const $stopButton = document.querySelector("[data-stop]") as HTMLButtonElement;
const $resetButton = document.querySelector(
  "[data-reset]"
) as HTMLButtonElement;

const piEstimation = new PiEstimation($canvas as HTMLCanvasElement, {
  totalPointsElement: document.querySelector(
    "[data-total-points]"
  ) as HTMLElement,
  totalPointsInCircleElement: document.querySelector(
    "[data-total-inside]"
  ) as HTMLElement,
  piElement: document.querySelector("[data-pi]") as HTMLElement,
  interval: 0,
});

$startButton.addEventListener("click", () => {
  piEstimation.start();
  $startButton.disabled = true;
  $stopButton.disabled = false;
});

$stopButton.addEventListener("click", () => {
  piEstimation.stop();
  $stopButton.disabled = true;
  $startButton.disabled = false;
});

$resetButton.addEventListener("click", () => {
  piEstimation.reset();
});

// piEstimation.start();
