export function renderBackground(game) {
    game.state.map[game.state.currentRoom.y][game.state.currentRoom.x].layout.forEach((row, i) => {
        row.forEach((tile, j) => {
            if (tile.bg) {
                const tileWidth = game.camera.offsetWidth / 15;
                const tileHeight = game.camera.offsetHeight / 9;
                const roomWidth = game.camera.offsetWidth;
                const roomHeight = game.camera.offsetHeight;
                game.ctx.drawImage(game.envSpriteSheet, tile.bg[0] * 16, tile.bg[1] * 16, 16, 16, roomWidth * game.state.currentRoom.x + (tileWidth * (j + 1) - tileWidth), roomHeight * game.state.currentRoom.y + (tileHeight * (i + 1) - tileHeight), tileWidth, tileHeight);
            }
        });
    });
}
//# sourceMappingURL=background.js.map