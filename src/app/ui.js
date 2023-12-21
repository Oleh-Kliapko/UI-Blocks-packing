export function ui(canvas, blocks) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].draw(ctx);
  }
}
