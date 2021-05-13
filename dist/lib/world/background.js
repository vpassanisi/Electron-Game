export function buildBackgroundCanvas(game) {
    game.state.map[game.state.currentRoom.y][game.state.currentRoom.x].layout.forEach((row, i) => {
        row.forEach((tile, j) => {
            if (tile.bg) {
                const tileWidth = game.camera.offsetWidth / 15;
                const tileHeight = game.camera.offsetHeight / 9;
                game.bgCtx.drawImage(game.envSpriteSheet, tile.bg[0] * 16, tile.bg[1] * 16, 16, 16, tileWidth * (j + 1) - tileWidth, tileHeight * (i + 1) - tileHeight, tileWidth, tileHeight);
            }
        });
    });
}
export function renderBackgroundCanvas(game) {
    game.ctx.drawImage(game.bgCanvas, game.state.currentRoom.x * game.camera.offsetWidth, game.state.currentRoom.y * game.camera.offsetHeight);
}
//# sourceMappingURL=background.js.map