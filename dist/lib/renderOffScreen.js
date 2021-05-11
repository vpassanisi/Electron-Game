export function renderOffScreen(game) {
    const up = game.state.map[game.state.currentRoom.y - 1]?.[game.state.currentRoom.x];
    const down = game.state.map[game.state.currentRoom.y + 1]?.[game.state.currentRoom.x];
    const left = game.state.map[game.state.currentRoom.y]?.[game.state.currentRoom.x - 1];
    const right = game.state.map[game.state.currentRoom.y]?.[game.state.currentRoom.x + 1];
    if (up) {
        up.layout.forEach((row, i) => {
            row.forEach((tile, j) => {
                const tileWidth = game.camera.offsetWidth / 15;
                const tileHeight = game.camera.offsetHeight / 9;
                const roomWidth = game.camera.offsetWidth;
                const roomHeight = game.camera.offsetHeight;
                if (tile.bg) {
                    game.ctx.drawImage(game.envSpriteSheet, tile.bg[0] * 16, tile.bg[1] * 16, 16, 16, roomWidth * up.iX + (tileWidth * (j + 1) - tileWidth), roomHeight * up.iY + (tileHeight * (i + 1) - tileHeight), tileWidth, tileHeight);
                }
                if (tile.mounted) {
                    tile.mounted.render();
                }
            });
        });
    }
    if (down) {
        down.layout.forEach((row, i) => {
            row.forEach((tile, j) => {
                const tileWidth = game.camera.offsetWidth / 15;
                const tileHeight = game.camera.offsetHeight / 9;
                const roomWidth = game.camera.offsetWidth;
                const roomHeight = game.camera.offsetHeight;
                if (tile.bg) {
                    game.ctx.drawImage(game.envSpriteSheet, tile.bg[0] * 16, tile.bg[1] * 16, 16, 16, roomWidth * down.iX + (tileWidth * (j + 1) - tileWidth), roomHeight * down.iY + (tileHeight * (i + 1) - tileHeight), tileWidth, tileHeight);
                }
                if (tile.mounted) {
                    tile.mounted.render();
                }
            });
        });
    }
    if (left) {
        left.layout.forEach((row, i) => {
            row.forEach((tile, j) => {
                const tileWidth = game.camera.offsetWidth / 15;
                const tileHeight = game.camera.offsetHeight / 9;
                const roomWidth = game.camera.offsetWidth;
                const roomHeight = game.camera.offsetHeight;
                if (tile.bg) {
                    game.ctx.drawImage(game.envSpriteSheet, tile.bg[0] * 16, tile.bg[1] * 16, 16, 16, roomWidth * left.iX + (tileWidth * (j + 1) - tileWidth), roomHeight * left.iY + (tileHeight * (i + 1) - tileHeight), tileWidth, tileHeight);
                }
                if (tile.mounted) {
                    tile.mounted.render();
                }
            });
        });
    }
    if (right) {
        right.layout.forEach((row, i) => {
            row.forEach((tile, j) => {
                const tileWidth = game.camera.offsetWidth / 15;
                const tileHeight = game.camera.offsetHeight / 9;
                const roomWidth = game.camera.offsetWidth;
                const roomHeight = game.camera.offsetHeight;
                if (tile.bg) {
                    game.ctx.drawImage(game.envSpriteSheet, tile.bg[0] * 16, tile.bg[1] * 16, 16, 16, roomWidth * right.iX + (tileWidth * (j + 1) - tileWidth), roomHeight * right.iY + (tileHeight * (i + 1) - tileHeight), tileWidth, tileHeight);
                }
                if (tile.mounted) {
                    tile.mounted.render();
                }
            });
        });
    }
}
//# sourceMappingURL=renderOffScreen.js.map