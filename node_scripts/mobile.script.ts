import ResourcesScript from "./resources.script";
import config from "./config.json";
import fs from "fs";
import path from "path";

export default class MobileScript {
    constructor(private command: any) {}

    public async init() {
        try {
            console.log("Remove old folders...");

            fs.rmSync(path.join(__dirname, `./android`), { recursive: true, force: true });
            fs.rmSync(path.join(__dirname, `./ios`), { recursive: true, force: true });

            console.log("Generate new mobile apps...");

            await this.command("npx", ["cap", "add", "android"]);
            await this.command("npx", ["cap", "add", "ios"]);

            console.log("Sync mobile apps...");

            await this.command("npx", ["cap", "sync", "android"]);
            await this.command("npx", ["cap", "sync", "ios"]);

            console.log("Generate assets...");

            const resourcesScript: ResourcesScript = new ResourcesScript(config.resources.pathToLogo, config.resources.backColor, config.resources.pathToResources, this.command);
            await resourcesScript.init();

            console.error(`Mobile App Created!`);
        } catch (error) {
            console.error("**Mobile App not created**");
            console.error(error);
        }
    }
}
