import * as PIXI from '../node_modules/pixi.js/dist/pixi.mjs';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  antialias: true,
});

document.body.appendChild(app.view);

const rect = new PIXI.Graphics();
rect.beginFill(0x000000);
rect.drawRect(-50, -25, 100, 50);
rect.endFill();

rect.x = app.screen.width / 2;
rect.y = app.screen.height / 2;

app.stage.addChild(rect);

app.ticker.add((delta) => {
  rect.rotation += 0.05 * delta;
});