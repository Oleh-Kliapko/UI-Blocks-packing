import { IBlock, IContainer, IBlockCoordinate, IResult } from "./types.js";
import { calcFullness } from "./helpers/calcFullness.js";

export function arrangeBlocks(
  blocks: IBlock[],
  container: IContainer
): IResult {
  const blockCoordinates: IBlockCoordinate[] = [];
  let currentX = 0;
  let currentY = 0;
  const initialContainerWidth = container.width;

  const sortedBlocks = [...blocks].sort(
    (a, b) => b.width * b.height - a.width * a.height
  );

  for (let i = 0; i < sortedBlocks.length; i++) {
    const block = sortedBlocks[i];
    let rotated = false;

    // Перевірка можливості повороту блока
    if (block.width <= container.height && block.height <= container.width) {
      [block.width, block.height] = [block.height, block.width];
      rotated = true;
    }

    const canPlaceBlock =
      currentX + block.width <= container.width &&
      currentY + block.height <= container.height;

    if (canPlaceBlock) {
      // Розмістити блок у контейнері
      blockCoordinates.push({
        top: currentY,
        left: currentX,
        right: currentX + block.width,
        bottom: currentY + block.height,
        initialOrder: blocks.indexOf(block) + 1,
      });

      currentX += rotated ? block.height : block.width;
    } else {
      // Перейти на наступний ряд
      currentX = 0;
      currentY += rotated ? block.width : block.height;

      // Перевірка, чи можна розмістити блок в новому ряду
      if (
        currentX + block.width <= container.width &&
        currentY + block.height <= container.height
      ) {
        // Розмістити блок у контейнері
        blockCoordinates.push({
          top: currentY,
          left: currentX,
          right: currentX + block.width,
          bottom: currentY + block.height,
          initialOrder: blocks.indexOf(block) + 1,
        });

        currentX += rotated ? block.height : block.width;
      } else {
        // Якщо навіть в новому ряду не можна розмістити блок, розмістити його в наступному ряду після цього
        currentX = 0;
        currentY += rotated ? block.width : block.height;
        i--;
      }
    }

    if (rotated) {
      [block.width, block.height] = [block.height, block.width];
    }
  }

  const fullness = calcFullness(blocks, {
    width: initialContainerWidth,
    height: container.height,
  });
  return { fullness, blockCoordinates };
}
