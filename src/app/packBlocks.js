import PackingAlgorithm from "../components/PackingAlgorithm.js";
import { errorMaxBlockSizes } from "../helpers/errors.js";

export function packBlocks(containerData, blocks, canvas) {
  let arrBlocksLength = blocks.length;
  let blockSizes = [];
  let blockCoordinates = [];

  for (let i = 0; i < arrBlocksLength; ++i) {
    let current = blocks[i];
    blockSizes[i] = [current.W, current.H];

    if (current.W > containerData.width || current.H > containerData.height) {
      errorMaxBlockSizes(canvas, i + 1);
      return;
    }
  }

  let packedBlocks = new PackingAlgorithm(
    blockSizes,
    containerData.width,
    containerData.height
  );
  let result = packedBlocks.RESULT;

  for (let i = 0; i < arrBlocksLength; ++i) {
    let current = blocks[i];
    current.X = result[i][0];
    current.Y = result[i][1];

    blockCoordinates.push({
      top: current.Y,
      left: current.X,
      right: current.X + current.W,
      bottom: current.Y + current.H,
      initialOrder: i + 1,
    });
  }

  return { blockCoordinates };
}
