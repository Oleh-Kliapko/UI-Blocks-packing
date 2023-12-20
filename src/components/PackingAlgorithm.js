import MergeSort from "./MergeSort.js";

class PackingAlgorithm {
  constructor(rect, w, h) {
    this.RECT = rect;
    this.W = w;
    this.H = h;

    this.calculateAreas();
    this.sortAreas();
    this.pack();
  }

  pack() {
    this.RESULT = [];

    let nodes = [{ x: 0, y: 0, prevLeaf: -1, nextLeaf: -1 }];
    let nodeSize = 1;
    let firstLeafPointer = 0;

    let currentWidth = 0;
    let currentHeight = 0;

    for (let i = 0; i < this.rectSize; ++i) {
      let k = this.sortedIndexes[i];
      let currentLeafNode = firstLeafPointer;
      let minArea = 99999999;
      let minAreaNode = -1;

      while (true) {
        let currentNode = nodes[currentLeafNode];

        let newWidth = currentWidth;
        let newHeight = currentHeight;

        if (currentNode.x + this.RECT[k][0] > currentWidth) {
          newWidth = currentNode.x + this.RECT[k][0];
        }

        if (currentNode.y + this.RECT[k][1] > currentHeight) {
          newHeight = currentNode.y + this.RECT[k][1];
        }

        if (newWidth <= this.W && newHeight <= this.H) {
          let newArea = newWidth * newHeight;

          if (minArea > newArea) {
            if (!this.testOverlapping(i, currentNode)) {
              minArea = newArea;
              minAreaNode = currentLeafNode;
            }
          }
        }

        if (currentNode.nextLeaf == -1) break;
        currentLeafNode = currentNode.nextLeaf;
      }

      if (minAreaNode == -1) {
        this.RESULT[k] = [width, height];
      } else {
        let bestNode = nodes[minAreaNode];
        this.putBox(bestNode, k);

        currentWidth = Math.max(currentWidth, bestNode.x + this.RECT[k][0]);
        currentHeight = Math.max(currentHeight, bestNode.y + this.RECT[k][1]);

        let newRight = {
          x: bestNode.x + this.RECT[k][0],
          y: bestNode.y,
          prevLeaf: -1,
          nextLeaf: -1,
        };
        let newLeft = {
          x: bestNode.x,
          y: bestNode.y + this.RECT[k][1],
          prevLeaf: -1,
          nextLeaf: -1,
        };

        this.updateLinkedList(nodes, bestNode, newRight, newLeft, nodeSize);

        if (firstLeafPointer == minAreaNode) {
          firstLeafPointer = nodeSize;
        }

        nodes.push(newRight);
        nodes.push(newLeft);

        bestNode.right = nodeSize;
        bestNode.left = nodeSize + 1;

        nodeSize += 2;
      }
    }
  }

  putBox(bestNode, currentBoxPos) {
    this.RESULT[currentBoxPos] = [bestNode.x, bestNode.y];
  }

  updateLinkedList(nodes, bestNode, newRight, newLeft, nodeSize) {
    if (bestNode.prevLeaf != -1) nodes[bestNode.prevLeaf].nextLeaf = nodeSize;
    newRight.prevLeaf = bestNode.prevLeaf;
    newRight.nextLeaf = nodeSize + 1;
    newLeft.prevLeaf = nodeSize;
    newLeft.nextLeaf = bestNode.nextLeaf;
    if (bestNode.nextLeaf != -1)
      nodes[bestNode.nextLeaf].prevLeaf = nodeSize + 1;
  }

  testOverlapping(rectNumber, currentNode) {
    let k = this.sortedIndexes[rectNumber];
    let cx = currentNode.x;
    let cy = currentNode.y;
    let cw = this.RECT[k][0];
    let ch = this.RECT[k][1];

    for (let j = 0; j < rectNumber; ++j) {
      let jk = this.sortedIndexes[j];

      let jw = this.RECT[jk][0];
      let jh = this.RECT[jk][1];
      let jx = this.RESULT[jk][0];
      let jy = this.RESULT[jk][1];

      if (cx < jx + jw && cy < jy + jh && cx + cw > jx && cy + ch > jy) {
        return true;
      }
    }

    return false;
  }

  calculateAreas() {
    this.rectSize = this.RECT.length;
    this.areas = new Array(this.rectSize);

    for (let i = 0; i < this.rectSize; ++i) {
      this.areas[i] = this.RECT[i][0] * this.RECT[i][1];
    }
  }

  sortAreas() {
    let ms = new MergeSort(this.areas, false);
    this.sortedIndexes = ms.ResultIndexes();
  }
}

export default PackingAlgorithm;
