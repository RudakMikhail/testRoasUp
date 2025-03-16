import * as PIXI from 'pixi.js';
import { Assets, Sprite, Container } from "pixi.js";
import { initDevtools } from '@pixi/devtools';

(async () => {
    const app = new PIXI.Application();
    initDevtools({ app });
    await app.init({
        resizeTo: window,
        backgroundColor: 0x545454,
    });
    app.canvas.style.position = 'absolute';

    document.body.appendChild(app.canvas);

    const activeCarsContainer = new Container();
    app.stage.addChild(activeCarsContainer);

    const inactiveCarsContainer = new Container();
    app.stage.addChild(inactiveCarsContainer);

    const redCar = await Assets.load("../assets/redCar.png");
    const redCarSprite = new Sprite(redCar);
    redCarSprite.anchor.set(0.5);

    const yellowCar = await Assets.load("../assets/yellowCar.png");
    const yellowCarSprite = new Sprite(yellowCar);
    yellowCarSprite.anchor.set(0.5);

    activeCarsContainer.addChild(redCarSprite, yellowCarSprite);

    const blueCar = await Assets.load("../assets/blueCar.png");
    const blueCarSprite = new Sprite(blueCar);
    blueCarSprite.anchor.set(0.5);

    const greenCar = await Assets.load("../assets/greenCar.png");
    const greenCarSprite = new Sprite(greenCar);
    greenCarSprite.anchor.set(0.5);

    inactiveCarsContainer.addChild(blueCarSprite, greenCarSprite);

    redCarSprite.interactive = true;
    yellowCarSprite.interactive = true;

    function resize() {
        const isHorizontal = window.innerWidth > window.innerHeight;

        const carSpacing = 150;

        redCarSprite.x = window.innerWidth / 2 - carSpacing;
        redCarSprite.y = window.innerHeight - 800;

        yellowCarSprite.x = window.innerWidth / 2 + carSpacing;
        yellowCarSprite.y = window.innerHeight - 800;

        blueCarSprite.x = window.innerWidth / 2 - carSpacing;
        blueCarSprite.y = 100;

        greenCarSprite.x = window.innerWidth / 2 + carSpacing;
        greenCarSprite.y = 100;

        const scale = Math.min(window.innerWidth / 800, window.innerHeight / 600);
        activeCarsContainer.scale.set(scale);
        inactiveCarsContainer.scale.set(scale);


        if (isHorizontal) {

            redCarSprite.x = window.innerWidth / 2 - carSpacing;
            redCarSprite.y = window.innerHeight - 100;

            yellowCarSprite.x = window.innerWidth / 2 + carSpacing;
            yellowCarSprite.y =  window.innerHeight - 100;

            blueCarSprite.x = window.innerWidth / 2 - carSpacing;
            blueCarSprite.y = 100;

            greenCarSprite.x = window.innerWidth / 2 + carSpacing;
            greenCarSprite.y = 100;
            const horizontalScale = Math.min(window.innerWidth / 1200, window.innerHeight / 600);
            activeCarsContainer.scale.set(horizontalScale);
            inactiveCarsContainer.scale.set(horizontalScale);
        }
    }

    window.addEventListener('resize', resize);
    resize();

})();
