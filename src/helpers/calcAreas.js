export function calcAreas(blocks, container, gapsArea) {
  const containerArea = container.width * container.height;
  const blocksArea = blocks.reduce(
    (area, block) => area + block.width * block.height,
    0
  );

  return {
    containerArea,
    blocksArea,
  };
}
