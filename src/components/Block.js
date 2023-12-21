class Block {
  constructor(x = 0, y = 0, w, h, title) {
    this.X = x;
    this.Y = y;
    this.W = w;
    this.H = h;
    this.defaultColor = 80;
    this.title = title;
    this.borderColor = "black";
    this.backgroundColor = this.generateColor();
  }

  generateColor() {
    const area = this.W * this.H;
    if (!Block.colors) {
      Block.colors = {};
    }

    if (!Block.colors[area]) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      Block.colors[area] = color;
    }

    return Block.colors[area];
  }
  draw(ctx) {
    this.drawBackground(ctx);
    this.drawBorder(ctx);
    this.drawTitle(ctx);
  }

  drawBorder(ctx) {
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(this.X, this.Y, this.W, this.H);
  }

  drawBackground(ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.X, this.Y, this.W, this.H);
  }

  drawTitle(ctx) {
    const textWidth = ctx.measureText(this.title).width;
    const textHeight = 12;

    const x = this.X + (this.W - textWidth) / 2;
    const y = this.Y + (this.H + textHeight) / 2;

    ctx.fillStyle = "white";
    ctx.fillRect(x - 1, y - textHeight, textWidth + 4, textHeight + 4);

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.title, x, y);
  }
}

export default Block;
