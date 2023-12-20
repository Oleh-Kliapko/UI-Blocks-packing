import { IBlock, IContainer } from "./types.js";
import { arrangeBlocks } from "./algorithm.js";
import { ui } from "./ui.js";
import { downloadBlocks, downloadContainer } from "./helpers/downloadData.js";

async function main() {
  try {
    const blocks: IBlock[] = await downloadBlocks("../data/blocks.json");
    const container: IContainer = await downloadContainer(
      "../data/container.json"
    );

    const result = arrangeBlocks(blocks, container);
    ui(blocks, container, result.blockCoordinates);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

main();
