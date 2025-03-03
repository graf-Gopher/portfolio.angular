import fs from "fs";
import PackScript from "./pack.script";
import path from "path";
import packageJson from "../package.json";
import ReadmeScript from "./readme.script";

export default class BuildScript {
    private readonly packScript: PackScript = new PackScript();

    constructor(
        private readonly node: string = "",
        private readonly electron: string = "",
        private readonly mobile: boolean = false,
        private readonly ssr: boolean = false,
        private readonly command: any
    ) {}

    /**
     * Initializes the build process for the application.
     *
     * @param publish - Indicates whether to publish the app after building.
     *
     * @returns A promise that resolves when the initialization is complete.
     *
     * @throws An error if any step in the build process fails.
     *
     * The build process includes the following steps:
     * 1. Preparing folders.
     * 2. Building the app.
     * 3. Building the SSR version (if applicable).
     * 4. Packing the app.
     * 5. Packing the app for Mobile (if applicable).
     * 6. Packing the app for Web (if applicable).
     * 7. Packing the app for Electron (if applicable).
     * 8. Syncing git branches and publishing the app to GitHub (if `publish` is true).
     */
    public async init(publish: boolean = false) {
        try {
            console.log("Prepare folders...");

            await this.command("cf", ["./dist"]);
            const readmeScript: ReadmeScript = new ReadmeScript(this.command);
            await readmeScript.init();

            console.log("Building app...");

            await this.command("ng", ["build"]);

            if (this.ssr) {
                console.log("Building SSR version...");
                await this.command("ng", ["run", "under_tree.angular:ssr"]);
            }

            console.log("Packing app...");

            await this.packScript.init();

            if (this.mobile) {
                console.log("Packing app for Mobile...");

                const android: string = process.cwd() + "/android/";
                fs.mkdirSync(android, { recursive: true });

                const ios: string = process.cwd() + "/ios/";
                fs.mkdirSync(ios, { recursive: true });

                await this.command("npx", ["cap", "sync"]);
            }

            if (this.node) {
                console.log("Packing app for Web...");

                await this.command("asar", ["pack", `dist/${packageJson.name}/browser`, "dist/app/app.asar"]);

                if (this.ssr) {
                    await this.command("asar", ["pack", `dist/${packageJson.name}/server`, "dist/app/ssr.asar"]);
                }

                fs.rmSync(path.join(__dirname, `../../${this.node}`), { recursive: true, force: true });
                fs.cpSync("./dist/app/", path.join(__dirname, `../../${this.node}`), { recursive: true });
            }

            if (this.electron) {
                console.log("Packing app for Electron...");

                this.changeBase(true);

                await this.command("asar", ["pack", `dist/${packageJson.name}/browser`, "dist/app/app.asar"]);

                fs.rmSync(path.join(__dirname, `../../${this.electron}`), { recursive: true, force: true });

                fs.cpSync(`./dist/${packageJson.name}`, path.join(__dirname, `../../${this.electron}`), { recursive: true });
                fs.copyFileSync("./dist/app/VERSION", path.join(__dirname, `../../${this.electron}/VERSION`));
            }

            if (publish) {
                console.log("Sync git branches...");

                await this.command("git", [`checkout`, `master`]);
                await this.command("git", [`pull`, `--all`]);

                await this.command("git", [`checkout`, `dev`]);
                await this.command("git", [`add`, `.`]);
                await this.command("git", [`commit`, `-m`, `Update v${packageJson.version}`]);
                await this.command("git", [`push`]);

                console.log("Update master branch");

                let result: string = await this.command("gh", [`pr`, `create`, `--base`, `master`, `--head`, `dev`, `--fill`], true);
                const pullStrings: string[] = result.split("/");
                const pullId: number = parseInt(pullStrings[pullStrings.length - 1]);
                await this.command("gh", [`pr`, `merge`, `${pullId}`, `--merge`]);

                await this.command("git", [`pull`, `origin`, `master`]);
                await this.command("git", [`push`]);

                console.log("Publishing app to Github...");

                if (!fs.existsSync("dist/publish")) {
                    fs.mkdirSync("dist/publish");
                }

                this.changeBase();
                await this.command("asar", ["pack", `dist/${packageJson.name}`, "dist/app/app.asar"]);
                await this.command("bestzip", [`./dist/publish/v${packageJson.version}.zip`, `./dist/app/*`]);
                await this.command("gh", [`auth`, `login`, `--with-token`, `<`, `.gitToken`]);
                await this.command("gh", [`release`, `create`, `v${packageJson.version}`, `./dist/publish/v${packageJson.version}.zip`, `--target`, `master`, `--generate-notes`]);
            }

            console.log("Build complete success!");
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Changes the base href in the index.html file located in the dist folder.
     *
     * @param {boolean} [dot=false] - Determines the new base href value.
     *                                If true, sets the base href to ".".
     *                                If false, sets the base href to "".
     *
     * @remarks
     * This function reads the index.html file, modifies the base href, and writes the changes back to the file.
     * If an error occurs during reading or writing the file, it logs the error to the console.
     */
    private changeBase(dot: boolean = false) {
        fs.readFile(`dist/${packageJson.name}/index.html`, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }

            const modifiedData = data.replace(`<base href="${dot ? "" : "."}/">`, `<base href="${dot ? "." : ""}/"/>`);

            fs.writeFile(`dist/${packageJson.name}/index.html`, modifiedData, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err);
                }
            });
        });
    }
}
