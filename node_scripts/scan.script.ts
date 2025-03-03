import packageJson from "../package.json";
import { readFileSync } from "fs";

interface ScanData {
    title: string;
    name: string;
    version: string;
}

export default class ScanScript {
    constructor(private readonly command: any) {}

    public async init() {
        try {
            const pr: ScanData = packageJson as any;

            const sonarToken = readFileSync(".sonarToken", "utf8").trim();

            await this.command("docker", [
                "run",
                "--rm",
                "-v",
                "./:/usr/src",
                "--network=databases_default",
                "sonarsource/sonar-scanner-cli",
                `-Dsonar.host.url=http://sonarqube:9000`,
                `-Dsonar.token=${sonarToken}`,
                `-Dsonar.projectKey=${pr.name}`,
                `-Dsonar.projectName=${pr.title}/${pr.name}`,
                `-Dsonar.projectVersion=${pr.version}`,
            ]);

            console.log("Scan complete success!");
        } catch (error) {
            console.error(error);
        }
    }
}
