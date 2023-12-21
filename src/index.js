import { createBlocks } from "./app/createBlocks.js";
import { packBlocks } from "./app/packBlocks.js";
import { ui } from "./app/ui.js";

import { downloadData } from "./api/downloadData.js";

import { errorFetchData, errorAreas } from "./helpers/errors.js";
import { calcAreas } from "./helpers/calcAreas.js";

async function runApp() {
  try {
    const containerData = await downloadData("../data/container.json");
    const canvas = document.getElementById("container");
    const fullnessValue = document.getElementById("fullness");

    if (!canvas || !fullnessValue) return;

    if (!containerData || !containerData.width || !containerData.height) {
      errorFetchData("Container", canvas);
      return;
    }

    canvas.width = containerData.width;
    canvas.height = containerData.height;

    const blocksData = await downloadData("../data/blocks.json");
    if (blocksData.length === 0) {
      errorFetchData("Blocks", canvas);
      return;
    }

    const squares = calcAreas(blocksData, containerData);

    if (squares.blocksArea > squares.containerArea) {
      errorAreas(canvas);
      return;
    }

    const blocks = createBlocks(blocksData);
    const { blockCoordinates, gapsArea } = packBlocks(
      containerData,
      blocks,
      canvas
    );

    const fullness = 1 - gapsArea / (squares.blocksArea + gapsArea);
    fullnessValue.textContent = `Fullness: ${Math.round(fullness * 100)}%`;

    console.log("Block Coordinates:", {
      fullness,
      blockCoordinates,
    });

    ui(canvas, blocks);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

runApp();
