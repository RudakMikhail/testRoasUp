import * as PIXI from 'pixi.js';
import { Assets, Sprite, Container } from "pixi.js";
import { initDevtools } from '@pixi/devtools';
import { gsap } from "gsap";

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

    const inactiveSpritesContainer = new Container();
    app.stage.addChild(inactiveSpritesContainer);

    const redCar = await Assets.load("../assets/redCar.png");
    const yellowCar = await Assets.load("../assets/yellowCar.png");
    const blueCar = await Assets.load("../assets/blueCar.png");
    const greenCar = await Assets.load("../assets/greenCar.png");
    const parkingArea = await Assets.load("../assets/parkingArea.png");
    const hand = await Assets.load("../assets/hand.png");
    const logo = await Assets.load("../assets/logo.png");
    const button = await Assets.load("../assets/button.png");

    const redCarSprite = new Sprite(redCar);
    redCarSprite.anchor.set(0.5);

    const yellowCarSprite = new Sprite(yellowCar);
    yellowCarSprite.anchor.set(0.5);

    const blueCarSprite = new Sprite(blueCar);
    blueCarSprite.anchor.set(0.5);

    const greenCarSprite = new Sprite(greenCar);
    greenCarSprite.anchor.set(0.5);

    const parkingAreaSprite = new Sprite(parkingArea);
    parkingAreaSprite.anchor.set(0.5);

    const handSprite = new Sprite(hand);
    handSprite.anchor.set(0.5);

    const logoSprite = new Sprite(logo);
    logoSprite.anchor.set(0.5);
    logoSprite.visible = false;

    const buttonSprite = new Sprite(button);
    buttonSprite.anchor.set(0.5);
    buttonSprite.visible = false;
    buttonSprite.interactive = true;
    buttonSprite.on('pointerdown', () => {
        window.location.href = 'https://roasup.com';
    });

    activeCarsContainer.addChild(redCarSprite, yellowCarSprite);
    inactiveSpritesContainer.addChild(blueCarSprite, greenCarSprite, parkingAreaSprite);
    app.stage.addChild(logoSprite, buttonSprite);
    app.stage.addChild(handSprite)
    redCarSprite.interactive = true;
    yellowCarSprite.interactive = true;


    let inactivityTimer: NodeJS.Timeout | null = null
    let handAnimation: gsap.core.Tween | null = null

    function resetInactivityTimer() {
        if (inactivityTimer) {
            clearTimeout(inactivityTimer)
        }
        inactivityTimer = setTimeout(showLogoAndButton, 20000);
    }

    function showLogoAndButton() {
        logoSprite.visible = true
        buttonSprite.visible = true
        logoSprite.x = window.innerWidth / 2
        logoSprite.y = window.innerHeight / 2 - 50
        buttonSprite.x = window.innerWidth / 2
        buttonSprite.y = window.innerHeight / 2 + 150
    }

    function animateHand() {
        handSprite.x = activeCarsContainer.x
        handSprite.y = activeCarsContainer.y

        gsap.to(handSprite, {
            x: parkingAreaSprite.x + 500,
            y: parkingAreaSprite.y + 200,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    function updateHandAnimation() {
        if (handAnimation) {
            handAnimation.kill();
        }
        animateHand();
    }

    function hideHand() {
        if (handAnimation) {
            handAnimation.kill();
        }
        handSprite.visible = false;
    }

    function resize() {
        yellowCarSprite.x = - 100
        redCarSprite.x = + 100
        blueCarSprite.x = + 210
        blueCarSprite.y = + 160
        greenCarSprite.x = - 210
        greenCarSprite.y = + 160
        inactiveSpritesContainer.x = window.innerWidth / 2
        activeCarsContainer.x = window.innerWidth / 2
        activeCarsContainer.y = window.innerWidth / 2
        updateHandAnimation();
    }

    window.addEventListener('mousedown', hideHand);
    window.addEventListener('touchstart', hideHand);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('mousedown', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);


    resetInactivityTimer();
    resize();
    animateHand();
})();
