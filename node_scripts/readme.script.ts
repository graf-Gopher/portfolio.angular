import fs from "fs";
import packageJson from "../package.json";

interface ReadmeData {
    title: string;
    name: string;
    description: string;
    version: string;
    author: { name: string; url: string; email: string; twitter: string; linkedin: string };
    contributors: {
        name: string;
        url: string;
    }[];
    homepage: string;
    demopage: string;
    repository: { type: string; url: string };
    bugs: string;
    engines: { npm: string; node: string };
    keywords: string;
    license: { name: string; year: string };
}

export default class ReadmeScript {
    constructor(private command: any) {}

    public init(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const pr: ReadmeData = packageJson as any;

                let nodeVer: string = await this.command("node", [`-v`], true);
                nodeVer = nodeVer.substring(1);
                nodeVer = nodeVer.slice(0, -1);
                let npmVer: string = await this.command("npm", [`-v`], true);
                npmVer = npmVer.slice(0, -1);
                const repo: string = pr.repository.url.replace("https://github.com/", "");
                const git: string = pr.repository.url.replace(`/${pr.name}`, "");
                const lis: string[] = (packageJson as any).license.split("/");
                pr.license = {
                    name: lis[0],
                    year: lis[1] || new Date().getFullYear().toString(),
                };
                const contributors: string = pr.contributors
                    ? pr.contributors
                          .map((cn) => {
                              return `[${cn.name}](${cn.url})`;
                          })
                          .join("\n")
                    : "";

                const readmeString: string = `
# Welcome to ${pr.title} 👋
![Prerequisite](https://img.shields.io/badge/version-${pr.version.split("-")[0]}-green.svg)
![Prerequisite](https://img.shields.io/badge/npm-%3E%3D${npmVer}-blue.svg)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D%20${nodeVer}-blue.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/${repo}#readme)

> ${pr.description}

### 🏠 [Homepage](${pr.homepage})

### ✨ [Demo](${pr.demopage})

## Prerequisites

- npm &gt;=${npmVer}
- node &gt;=${nodeVer}

## Install

\`\`\`sh
npm install
\`\`\`

## Usage

\`\`\`sh
npm run start
\`\`\`

## Author

👤 **${pr.author.name}**

* Website: ${pr.author.url}
* Twitter: [@${pr.author.twitter}](${pr.author.twitter ? `https://twitter.com/${pr.author.twitter}` : "#"})
* GitHub: [@${repo.split("/")[0]}](${git}})
* LinkedIn: [@${pr.author.linkedin}](${pr.author.linkedin ? `https://linkedin.com/company/${pr.author.linkedin}` : "#"})

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/${repo}/issues). You can also take a look at the [contributing guide](https://github.com/${repo}/blob/master/CONTRIBUTING.md).
${contributors ? `\n${contributors}` : ""}

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © ${pr.license.year} [${pr.author.name}](${pr.author.url}).

This project is [${pr.license.name}](https://github.com/${repo}/blob/master/LICENSE) licensed.
`;
                fs.writeFileSync(`${process.cwd()}/README.md`, readmeString);
                console.log("Readme Generated Success");
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }
}
