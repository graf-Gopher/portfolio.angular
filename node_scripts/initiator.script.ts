import * as fs from "fs";
import * as path from "path";

interface ConfigData {
    resources: {
        pathToLogo: string;
        backColor: string;
        pathToResources: string;
    };
    build: {
        // pathNode: string;
        // pathElectron: string;
        desktop: boolean;
        mobile: boolean;
        ssr: boolean;
    };
}

export default class InitiatorService {
    private configFilePath: string = path.join(__dirname, "config.json");
    private packageFilePath: string = path.join(__dirname, "../", "package.json");

    private demoConfig: ConfigData = {
        resources: {
            pathToLogo: "src/assets/images/logo.svg",
            backColor: "#000000",
            pathToResources: "resources",
        },
        build: {
            // pathNode: `${packageJson.name.split(".")[0]}.node/.app`,
            // pathElectron: `${packageJson.name.split(".")[0]}.exe/.app`,
            desktop: false,
            mobile: false,
            ssr: false,
        },
    };
    private demoPackage: string = `
        {
            "name": "${path.basename(path.resolve(__dirname, "../"))}",
            "title": "#",
            "version": "0.0.1",
            "description": "#",
            "author": {
                "name": "Under Tree Entertainment",
                "url": "https://under-tree-e.com",
                "email": "under-tree-e@outlook.com",
                "twitter": "under_tree_e",
                "linkedin": "under-tree-e"
            },
            "contributors": [
                {
                    "name": "Under Tree Entertainment",
                    "url": "https://under-tree-e.com",
                    "email": "under-tree-e@outlook.com",
                    "twitter": "under_tree_e",
                    "linkedin": "under-tree-e"
                }
            ],
            "homepage": "#",
            "demopage": "#",
            "repository": {
                "type": "git",
                "url": "https://github.com/<user>/${path.basename(path.resolve(__dirname, "../"))}"
            },
            "bugs": {
                "url": "https://github.com/<user>/${path.basename(path.resolve(__dirname, "../"))}/issues"
            },
            "keywords": [
                "typescript",
                "angular",
                "ssr"
            ],
            "private": true,
            "license": "Close-Source/${new Date().getFullYear()}",
            "engines": {
                "npm": ">=${process.versions.npm}",
                "node": ">=${process.versions.node}"
            },
            "scripts": {
                "start": "ng serve",
                "watch": "ng build --watch --configuration development",
                "build": "ng build",
                "pack": "asar pack dist/under_tree.angular dist/app/app.asar",
                "ssr": "ng run under_tree.angular:ssr",
                "server": "node dist/under_tree.angular/server/main.js",
                "---": "INSTALL",
                "init": "npm install ts-node --save-dev && npx ts-node node_scripts --init",
                "load": "npm i --force",
                "fix": "npm audit fix --force",
                "rebuild": "npm rebuild",
                "----": "NODE SCRIPTS",
                "ns-help": "npx ts-node node_scripts --help",
                "ns-build": "npx ts-node node_scripts --build",
                "ns-publish": "npx ts-node node_scripts --publish",
                "-----": "VERSIONS",
                "major-update": "npm version major --no-git-tag-version",
                "minor-update": "npm version minor --no-git-tag-version",
                "patch-update": "npm version patch --no-git-tag-version",
                "dev-update": "npm version prerelease --preid=dev --no-git-tag-version && git add . && git commit -m 'dev_update_'$npm_package_version && git push --all",
            },
            "dependencies": {},
            "devDependencies": {}
        }
    `;
    private requiredPackages: string[] = [
        "@aws-sdk/client-ses",
        "@electron/asar",
        "axios",
        "body-parser",
        "crypto-js",
        "date-and-time",
        "dotenv",
        "express",
        "geoip-lite",
        "get-current-line",
        "google-auth-library",
        "googleapis",
        "hbs",
        "image-thumbnail",
        "mysql2",
        "nodemailer",
        "pg",
        "pg-hstore",
        "sequelize",
        "sequelize-typescript",
        "socket.io",
        "tedious",
        "uuid",
        "@types/crypto-js",
        "@types/express",
        "@types/geoip-lite",
        "@types/hbs",
        "@types/image-thumbnail",
        "@types/node",
        "@types/nodemailer",
        "@types/pg",
        "@types/tedious",
        "bestzip",
        "clear-folder",
        "copy-webpack-plugin",
        "npm-check-updates",
        "ts-loader",
        "ts-node",
        "ts-node-dev",
        "tsconfig-paths",
        "tsconfig-paths-webpack-plugin",
        "tslib",
        "typescript",
        "webpack",
        "webpack-cli",
        "webpack-dev-server",
    ];

    constructor(private command: any) {}

    public async init() {
        console.log("Prepare config file...");
        if (!fs.existsSync(this.configFilePath)) {
            fs.writeFileSync(this.configFilePath, JSON.stringify(this.demoConfig, null, 2));
            console.log("config.json file created with demo data.");
        } else {
            console.log("config.json file already exists.");
        }

        console.log("Prepare package.json file...");
        if (!fs.existsSync(this.packageFilePath)) {
            fs.writeFileSync(this.packageFilePath, JSON.stringify(this.demoPackage, null, 2));
            console.log("package.json file created with demo data.");
        } else {
            console.log("package.json file already exists.");
        }

        console.log("Install required packages...");
        for (const pkg of this.requiredPackages) {
            try {
                await this.command("npm", ["install", `${pkg}@latest`]);
            } catch (error: any) {
                console.error(`Error installing ${pkg}: ${error.message}`);
            }
        }

        console.log("Initiator complete success!");
    }
}
