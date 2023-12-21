class MergeSort {
  constructor(input, increasing) {
    this.array = input.slice();
    this.arrayIndexes = Array.from({ length: input.length }, (_, i) => i);
    this.tempFirst = new Array(Math.floor(input.length / 2) + 2);
    this.tempSecond = new Array(Math.floor(input.length / 2) + 2);
    this.compare = increasing === undefined ? true : increasing;

    this.sortInit();
  }

  sortInit() {
    let is = this.array.length;

    for (let i = 0; i < is; ++i) {
      this.array[i] = this.array[i];
      this.arrayIndexes[i] = i;
    }

    this.sort(0, is - 1);

    for (let i = 0; i < is; ++i) {
      this.array[i] = this.array[this.arrayIndexes[i]];
    }
  }

  sort(start, end) {
    if (start < end) {
      let middle = Math.floor((start + end) / 2);
      this.sort(start, middle);
      this.sort(middle + 1, end);
      this.merge(start, middle, end);
    }
  }

  merge(start, middle, end) {
    for (let i = start; i <= middle; ++i) {
      this.tempFirst[i - start] = this.arrayIndexes[i];
      let secondPos = middle + (i - start) + 1;
      if (secondPos <= end) {
        this.tempSecond[i - start] = this.arrayIndexes[secondPos];
      }
    }

    let INF = this.compare ? 99999999 : -99999999;
    this.tempFirst[middle - start + 1] = INF;
    this.tempSecond[end - middle] = INF;

    let i = 0,
      j = 0;
    for (let k = start; k <= end; ++k) {
      if (this.tempSecond[j] == INF) {
        this.arrayIndexes[k] = this.tempFirst[i];
        i++;
        continue;
      }

      if (this.tempFirst[i] == INF) {
        this.arrayIndexes[k] = this.tempSecond[j];
        j++;
        continue;
      }

      if (
        this.COMPARE(
          this.array[this.tempFirst[i]],
          this.array[this.tempSecond[j]]
        )
      ) {
        this.arrayIndexes[k] = this.tempFirst[i];
        i++;
      } else {
        this.arrayIndexes[k] = this.tempSecond[j];
        j++;
      }
    }
  }

  COMPARE(a, b) {
    if (this.compare) {
      if (a <= b) return true;
    } else {
      if (a >= b) return true;
    }
    return false;
  }

  Result() {
    return this.array;
  }

  ResultIndexes() {
    return this.arrayIndexes;
  }
}

export default MergeSort;
