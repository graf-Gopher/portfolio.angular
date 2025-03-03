import fs from "fs";
import packageJson from "../package.json";

export default class PackScript {
    /**
     * Initializes the pack process for the application.
     *
     * @returns A promise that resolves when the initialization is complete.
     *
     * @throws An error if any step in the pack process fails.
     *
     * The pack process includes the following steps:
     * 1. Preparing folders.
     * 2. Writing the version into the file.
     */
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
            } catch (error: any) {
                reject(error as Error);
            }
        });
    }
}
