export function calc(blocks, container) {
  const containerArea = container.width * container.height;
  const blocksArea = blocks.reduce(
    (area, block) => area + block.width * block.height,
    0
  );

  return {
    fullness: 1 - (containerArea - blocksArea) / containerArea,
    containerArea,
    blocksArea,
  };
}
