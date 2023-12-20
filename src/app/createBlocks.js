import Block from "../components/Block.js";

export function createBlocks(blocksData) {
  return blocksData.map(
    (block, idx) =>
      new Block(0, 0, block.width, block.height, (idx + 1).toString())
  );
}
