import sharp from "sharp";
import fs from "fs";
import { CanvasRenderingContext2D, Canvas, createCanvas } from "canvas";

export default class ResourcesScript {
    constructor(private readonly path: string = "", private readonly back: string = "", private readonly folder: string = "", private readonly command: any) {
        fs.mkdirSync(`${process.cwd()}/${this.folder}`, { recursive: true });
    }

    public async init() {
        try {
            this.createImages(`${process.cwd()}/${this.path}`, this.back, `${process.cwd()}/${this.folder}`);

            console.log(`Resources files success created at path ${process.cwd()}/${this.folder}`);
            console.log("Please wait for `@capacitor/assets`...");

            await this.command(
                "npx",
                [
                    "@capacitor/assets",
                    "generate",
                    `'${this.back}'`,
                    "--iconBackgroundColorDark",
                    `'${this.back}'`,
                    "--splashBackgroundColor",
                    `'${this.back}'`,
                    "--splashBackgroundColorDark",
                    `'${this.back}'`,
                ],
                true
            );

            console.error(`Capacitor Android assets generated at path ${process.cwd()}/android/app/src/main/res`);
            console.error(`Capacitor IOS assets generated at path ${process.cwd()}/ios/App/App/Assets.xcassets`);
        } catch (error) {
            console.error("**Assets not generated**");
            console.error(error);
        }
    }

    private async createImages(imagePath: string, color: string, savePath: string) {
        const canvas: Canvas = createCanvas(1024, 1024);
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

        // #4 Create image with background color
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let buffer = canvas.toBuffer("image/png");
        await sharp(buffer).toFile(`${savePath}/icon-background.png`);

        // #5 Create image with original image and padding
        let img = await sharp(imagePath).resize({ width: 820 });
        buffer = await img.toBuffer();
        await sharp({
            create: {
                width: 1024,
                height: 1024,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            },
        })
            .composite([{ input: buffer, gravity: "centre" }])
            .toFile(`${savePath}/icon-foreground.png`);

        // #6 Create image with combination of #4 and #5
        const background = await sharp(`${savePath}/icon-background.png`).toBuffer();
        const foreground = await sharp(`${savePath}/icon-foreground.png`).toBuffer();
        await sharp(background)
            .composite([{ input: foreground }])
            .toFile(`${savePath}/icon-only.png`);

        // #7 Create splash image
        const splashCanvas = createCanvas(2732, 2732);
        const splashCtx = splashCanvas.getContext("2d");
        splashCtx.fillStyle = color;
        splashCtx.fillRect(0, 0, splashCanvas.width, splashCanvas.height);
        img = await sharp(imagePath).resize({ width: 180 }); // 10%
        buffer = await img.toBuffer();
        await sharp({
            create: {
                width: 2732,
                height: 2732,
                channels: 4,
                background: color,
            },
        })
            .composite([{ input: buffer, gravity: "centre" }])
            .toFile(`${savePath}/splash.png`);

        const splash = await sharp(`${savePath}/splash.png`).toBuffer();
        await sharp(splash).toFile(`${savePath}/splash-dark.png`);
    }
}
