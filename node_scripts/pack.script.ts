import fs from "fs";
import packageJson from "../package.json";

export default class PackScript {
    public init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const path: string = process.cwd() + "/dist/app/";

                fs.mkdirSync(path, { recursive: true });
                fs.writeFile(path + "VERSION", packageJson.version, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(`Version file success created at path ${process.cwd()}/app/VERSION`);
                        resolve(true);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}
