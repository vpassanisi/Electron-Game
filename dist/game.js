import Player from "./lib/player.js";
import { Map } from "./lib/world/map.js";
import { buildBackgroundCanvas, renderBackgroundCanvas } from "./lib/world/background.js";
export const Game = {
    start: document.timeline ? document.timeline.currentTime : performance.now(),
    camera: document.getElementById("camera"),
    canvas: document.getElementById("root"),
    playerSpriteSheet: new Image(),
    envSpriteSheet: new Image(),
    enemySpriteSheet: new Image(),
    init() {
        this.gamepad.init();
        this.state.map = Map(Game);
        this.canvas.height = this.camera.offsetHeight * 2;
        this.canvas.width = this.camera.offsetWidth * 2;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.bgCanvas = document.createElement("canvas");
        this.bgCanvas.height = this.camera.offsetHeight;
        this.bgCanvas.width = this.camera.offsetWidth;
        this.bgCtx = this.bgCanvas.getContext("2d");
        this.bgCtx.imageSmoothingEnabled = false;
        this.playerSpriteSheet.src = "./src/assets/player/knight_idle_spritesheet.png";
        this.envSpriteSheet.src = "./src/assets/environment/Final_Tileset.png";
        this.enemySpriteSheet.src = "./src/assets/enemy/fly_anim_spritesheet.png";
        this.player = new Player(Game);
        this.initFloor();
        this.playerSpriteSheet.onload = () => Game.render();
        this.envSpriteSheet.onload = () => {
            buildBackgroundCanvas(Game);
            Game.render();
        };
        this.enemySpriteSheet.onload = () => Game.render();
        this.frame(this.start);
    },
    state: {
        paused: true,
        elapsedTime: 0,
        map: [],
        currentRoom: {
            x: 0,
            y: 0,
        },
        debug: false,
        check: false,
        timer(time) {
            Game.state.check = true;
            setTimeout(() => (Game.state.check = !Game.state.check), time);
        },
    },
    gamepad: {
        init() {
            window.addEventListener("gamepadconnected", this.connect);
            window.addEventListener("gamepaddisconnected", this.disconnect);
        },
        controller: {},
        turbo: false,
        connect: function (e) {
            Game.gamepad.controller = e.gamepad;
            console.log("connected");
        },
        disconnect: function (e) {
            delete this.controller;
            Game.state.paused = true;
            console.log("disconnected");
        },
        update: function () {
            this.controller = navigator.getGamepads()[this.controller.index];
        },
        buttonPressed: function () {
            this.buttonsCache = this.buttonsStatus;
            this.buttonsStatus = {};
            for (let i = 0; i < this.controller.buttons.length; i++) {
                if (this.controller.buttons[i].pressed) {
                    this.buttonsStatus[this.buttons[i]] = this.controller.buttons[i];
                }
            }
            if (this.buttonsStatus["Start"] && !this.buttonsCache["Start"]) {
                Game.state.paused = !Game.state.paused;
            }
            if (Game.state.paused)
                return;
            if (this.buttonsStatus["Y"] && !this.buttonsCache["Y"]) {
                Game.player.fire("up");
            }
            if (this.buttonsStatus["A"] && !this.buttonsCache["A"]) {
                Game.player.fire("down");
            }
            if (this.buttonsStatus["X"] && !this.buttonsCache["X"]) {
                Game.player.fire("left");
            }
            if (this.buttonsStatus["B"] && !this.buttonsCache["B"]) {
                Game.player.fire("right");
            }
            if (this.buttonsStatus["Select"] && !this.buttonsCache["Select"]) {
                Game.state.debug = !Game.state.debug;
                console.log(Game.playerEntities);
            }
        },
        buttons: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Select", "Start"],
        buttonsCache: {},
        buttonsStatus: {},
    },
    loadRoomToTheRight() {
        Game.ctx.clearRect(Game.state.currentRoom.x * Game.camera.offsetWidth, Game.state.currentRoom.y * Game.camera.offsetHeight, Game.camera.offsetWidth, Game.camera.offsetHeight);
        renderBackgroundCanvas(Game);
        Game.nonPlayerEntities.forEach((npe) => npe.render());
        Game.playerEntities.forEach((pe) => pe.render());
        Game.nonPlayerEntities = [];
        Game.state.currentRoom.x += 1;
        Game.state.map[Game.state.currentRoom.y][Game.state.currentRoom.x].mount();
        buildBackgroundCanvas(Game);
        Game.canvas.style.transform = `translate(-${50 * Game.state.currentRoom.x}%, -${50 * Game.state.currentRoom.y}%)`;
        Game.player.positionLeft =
            Game.camera.offsetWidth * Game.state.currentRoom.x +
                Game.camera.offsetWidth / 15 +
                Game.player.width / 2;
        Game.player.direction.set([0, 0]);
        Game.state.timer(500);
    },
    loadRoomToTheLeft() {
        Game.ctx.clearRect(Game.state.currentRoom.x * Game.camera.offsetWidth, Game.state.currentRoom.y * Game.camera.offsetHeight, Game.camera.offsetWidth, Game.camera.offsetHeight);
        renderBackgroundCanvas(Game);
        Game.nonPlayerEntities.forEach((npe) => npe.render());
        Game.playerEntities.forEach((pe) => pe.render());
        Game.nonPlayerEntities = [];
        Game.state.currentRoom.x -= 1;
        Game.state.map[Game.state.currentRoom.y][Game.state.currentRoom.x].mount();
        buildBackgroundCanvas(Game);
        Game.canvas.style.transform = `translate(-${50 * Game.state.currentRoom.x}%, -${50 * Game.state.currentRoom.y}%)`;
        Game.player.positionLeft =
            Game.camera.offsetWidth * (Game.state.currentRoom.x + 1) -
                Game.camera.offsetWidth / 15 -
                Game.player.width / 2;
        Game.player.direction.set([0, 0]);
        Game.state.timer(500);
    },
    loadRoomToTheBottom() {
        Game.ctx.clearRect(Game.state.currentRoom.x * Game.camera.offsetWidth, Game.state.currentRoom.y * Game.camera.offsetHeight, Game.camera.offsetWidth, Game.camera.offsetHeight);
        renderBackgroundCanvas(Game);
        Game.nonPlayerEntities.forEach((npe) => npe.render());
        Game.playerEntities.forEach((pe) => pe.render());
        Game.nonPlayerEntities = [];
        Game.state.currentRoom.y += 1;
        Game.state.map[Game.state.currentRoom.y][Game.state.currentRoom.x].mount();
        buildBackgroundCanvas(Game);
        Game.canvas.style.transform = `translate(-${50 * Game.state.currentRoom.x}%, -${50 * Game.state.currentRoom.y}%)`;
        Game.player.positionTop =
            Game.camera.offsetHeight * Game.state.currentRoom.y +
                Game.camera.offsetHeight / 9 +
                Game.player.height / 2;
        Game.player.direction.set([0, 0]);
        Game.state.timer(500);
    },
    loadRoomToTheTop() {
        Game.ctx.clearRect(Game.state.currentRoom.x * Game.camera.offsetWidth, Game.state.currentRoom.y * Game.camera.offsetHeight, Game.camera.offsetWidth, Game.camera.offsetHeight);
        renderBackgroundCanvas(Game);
        Game.nonPlayerEntities.forEach((npe) => npe.render());
        Game.playerEntities.forEach((pe) => pe.render());
        Game.nonPlayerEntities = [];
        Game.state.currentRoom.y -= 1;
        Game.state.map[Game.state.currentRoom.y][Game.state.currentRoom.x].mount();
        buildBackgroundCanvas(Game);
        Game.canvas.style.transform = `translate(-${50 * Game.state.currentRoom.x}%, -${50 * Game.state.currentRoom.y}%)`;
        Game.player.positionTop =
            Game.camera.offsetHeight * (Game.state.currentRoom.y + 1) -
                Game.camera.offsetHeight / 9 -
                Game.player.height / 2;
        Game.player.direction.set([0, 0]);
        Game.state.timer(500);
    },
    initFloor() {
        Game.state.map[Game.state.currentRoom.y][Game.state.currentRoom.x].mount();
    },
    nonPlayerEntities: [],
    playerEntities: [],
    updatePlayerEntities() {
        Game.playerEntities.forEach((pe, i, arr) => {
            if (!pe.update(Game.player)) {
                arr.splice(i, 1);
            }
        });
    },
    updateNonPlayerEntities() {
        let enemies = 0;
        Game.nonPlayerEntities.forEach((npe, i, arr) => {
            if (npe.constructor.name === "Enemy")
                enemies += 1;
            if (!npe.update(Game.player)) {
                arr.splice(i, 1);
            }
        });
        if (enemies === 0 &&
            Game.state.map[Game.state.currentRoom.y][Game.state.currentRoom.x].isOpen === false) {
            Game.state.map[Game.state.currentRoom.y][Game.state.currentRoom.x].open();
        }
    },
    render() {
        Game.ctx.clearRect(Game.state.currentRoom.x * Game.camera.offsetWidth, Game.state.currentRoom.y * Game.camera.offsetHeight, Game.camera.offsetWidth, Game.camera.offsetHeight);
        renderBackgroundCanvas(Game);
        // npe
        Game.nonPlayerEntities.forEach((npe) => npe.render());
        // pe
        Game.playerEntities.forEach((pe) => pe.render());
        // player
        Game.player.render();
    },
    detectCollisions() {
        // pe vs npe
        for (let x = 0; x < Game.playerEntities.length; x++) {
            for (let y = 0; y < Game.nonPlayerEntities.length; y++) {
                const playerEntity = Game.playerEntities[x];
                const nonPlayerEntity = Game.nonPlayerEntities[y];
                if (!playerEntity || !nonPlayerEntity)
                    continue;
                if (playerEntity.leftSide < nonPlayerEntity.rightSide &&
                    playerEntity.rightSide > nonPlayerEntity.leftSide &&
                    playerEntity.topSide < nonPlayerEntity.bottomSide &&
                    playerEntity.bottomSide > nonPlayerEntity.topSide) {
                    Game.playerEntities.splice(x, 1);
                    nonPlayerEntity.hit(2);
                }
            }
        }
        // npe vs npe
        for (let x = 0; x < Game.nonPlayerEntities.length; x++) {
            for (let y = 0; y < Game.nonPlayerEntities.length; y++) {
                if (x === y)
                    continue;
                const entity1 = Game.nonPlayerEntities[x];
                const entity2 = Game.nonPlayerEntities[y];
                if (!entity1 || !entity2)
                    continue;
                if (entity1.leftSide < entity2.rightSide &&
                    entity1.rightSide > entity2.leftSide &&
                    entity1.topSide < entity2.bottomSide &&
                    entity1.bottomSide > entity2.topSide) {
                    entity2.nonPlayerCollision(entity1);
                }
            }
        }
        // npe vs player
        Game.nonPlayerEntities.forEach((npe) => {
            if (Game.player.leftSide < npe.rightSide &&
                Game.player.rightSide > npe.leftSide &&
                Game.player.topSide < npe.bottomSide &&
                Game.player.bottomSide > npe.topSide) {
                Game.player.collision(npe.playerCollision(Game.player));
                npe.playerCollision(Game.player);
            }
        });
    },
    frame(time) {
        if (Game.gamepad.controller.connected) {
            Game.gamepad.update();
            Game.gamepad.buttonPressed();
        }
        if (!Game.state.paused) {
            if (!Game.state.check) {
                Game.player.update();
                Game.updatePlayerEntities();
                Game.updateNonPlayerEntities();
                Game.detectCollisions();
            }
            Game.render();
        }
        Game.scheduleFrame(time);
    },
    scheduleFrame(time) {
        const elapsed = time - this.start;
        const roundedElapsed = Math.round(elapsed / 16) * 16;
        this.state.elapsedTime = roundedElapsed;
        const targetNext = this.start + roundedElapsed + 16;
        const delay = targetNext - performance.now();
        setTimeout(() => requestAnimationFrame(this.frame), delay);
    },
};
Game.init();
//# sourceMappingURL=game.js.map