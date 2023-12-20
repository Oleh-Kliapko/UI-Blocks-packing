import { createBlocks } from "./app/createBlocks.js";
import { packBlocks } from "./app/packBlocks.js";

import { downloadData } from "./api/downloadData.js";
import { errorFetchData, errorAreas } from "./helpers/errors.js";
import { calc } from "./helpers/calc.js";

async function runApp() {
  try {
    const containerData = await downloadData("../data/container.json");
    const canvas = document.getElementById("container");

    if (!canvas) return;

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

    const squares = calc(blocksData, container);

    if (squares.blocksArea > squares.containerArea) {
      errorAreas(canvas);
      return;
    }

    const blocks = createBlocks(blocksData);
    packBlocks(containerData, blocks, canvas);
    draw(canvas, blocks);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function draw(canvas, blocks) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].draw(ctx);
  }
}

runApp();
