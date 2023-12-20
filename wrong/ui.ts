import { IBlock, IContainer, IBlockCoordinate } from "./types.js";
import { calcFullness } from "./helpers/calcFullness.js";

export function ui(
  blocks: IBlock[],
  container: IContainer,
  blockCoordinates: IBlockCoordinate[]
): void {
  const containerElement = document.getElementById("app");

  if (!containerElement) return;
  containerElement.style.width = `${container.width}px`;
  containerElement.style.height = `${container.height}px`;
  containerElement.innerHTML = "";

  for (let i = 0; i < blockCoordinates.length; i++) {
    const blockCoordinate = blockCoordinates[i];
    const block = blocks[i];

    const blockElement = document.createElement("div");
    blockElement.className = "block";
    blockElement.style.width = `${block.width}px`;
    blockElement.style.height = `${block.height}px`;
    blockElement.style.top = `${blockCoordinate.top}px`;
    blockElement.style.left = `${blockCoordinate.left}px`;
    blockElement.innerText = `${i + 1}`;

    containerElement.appendChild(blockElement);
  }

  console.log(`Fullness: ${calcFullness(blocks, container)}`);
}
