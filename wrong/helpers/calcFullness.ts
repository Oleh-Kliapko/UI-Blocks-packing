import { IBlock, IContainer } from "../types.js";

export function calcFullness(blocks: IBlock[], container: IContainer): number {
  const totalSquare = container.width * container.height;
  const blocksSquare = blocks.reduce(
    (square, block) => square + block.width * block.height,
    0
  );
  const emptySpace = totalSquare - blocksSquare;
  return 1 - emptySpace / totalSquare;
}
