// Run command:
// npm install ts-node --save-dev
// npx ts-node node_scripts

import PackScript from "./pack.script";
import ResourcesScript from "./resources.script";
import BuildScript from "./build.script";
import ReadmeScript from "./readme.script";
import MobileScript from "./mobile.script";
import InitiatorService from "./initiator.script";
import config from "./config.json";
import { spawn } from "child_process";
import ScanScript from "./scan.script";

class NodeScripts {
    private readonly packScript: PackScript = new PackScript();
    private readonly resourcesScript: ResourcesScript = new ResourcesScript(config.resources.pathToLogo, config.resources.backColor, config.resources.pathToResources, this.command);
    private readonly buildScript: BuildScript = new BuildScript(config.build.pathNode, config.build.pathElectron, config.build.mobile, config.build.ssr, this.command);
    private readonly readmeScript: ReadmeScript = new ReadmeScript(this.command);
    private readonly mobileScript: MobileScript = new MobileScript(this.command);
    private readonly initScript: InitiatorService = new InitiatorService(this.command);
    private readonly scanScript: ScanScript = new ScanScript(this.command);

    constructor() {
        let noArg: boolean = true;
        process.argv
            .filter((arg) => arg.includes("--") || arg.match(/^-\w/g))
            .forEach((arg) => {
                noArg = false;
                switch (arg) {
                    case "--pack":
                    case "-p":
                        this.packScript.init();
                        break;
                    case "--resources":
                    case "-r":
                        this.resourcesScript.init();
                        break;
                    case "--build":
                    case "-b":
                        this.buildScript.init();
                        break;
                    case "--readme":
                    case "-rm":
                        this.readmeScript.init();
                        break;
                    case "--publish":
                    case "-pb":
                        this.buildScript.init(true);
                        break;
                    case "--mobile":
                    case "-m":
                        this.mobileScript.init();
                        break;
                    case "--init":
                    case "-i":
                        this.initScript.init();
                        break;
                    case "--scan":
                    case "-s":
                        this.scanScript.init();
                        break;
                    case "--help":
                    case "-h":
                        console.log("--pack OR -p", "- Create VERSION file");
                        console.log("--resources OR -r", "- Create app images");
                        console.log("--build OR -b", "- Build app");
                        console.log("--mobile OR -m", "- Add or Update mobile builds");
                        console.log("--readme OR -r", "- Generate README file");
                        console.log("--publish OR -pb", "- Make prod version & publish to github");
                        console.log("--init OR -i", "- Create config.json file");
                        console.log("--scan OR -s", "- Scan for vulnerabilities");
                        break;
                }
            });
        if (noArg) {
            console.log("No arguments found. Print `--help` for more info");
        }
    }

    private command(command: string, args: string[], returnString: boolean = false): Promise<any> {
        let p = spawn(command, args);
        let text: string = "";
        return new Promise((resolve, reject) => {
            p.stdout.on("data", (x) => {
                if (x.toString().length > 100) {
                    process.stdout.write(x.toString().slice(-100));
                } else {
                    process.stdout.write(x.toString());
                    if (returnString) text = x.toString();
                }
            });
            p.stderr.on("data", (x) => {
                process.stderr.write(x.toString());
                if (returnString) {
                    reject(x.toString() as Error);
                }
            });
            p.on("close", () => {
                resolve(returnString ? text : true);
            });
        });
    }
}

new NodeScripts();
