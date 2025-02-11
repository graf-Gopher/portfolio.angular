// Required
// npm i css-convert-json --save-dev

const fs = require("fs");
const { toCSS, toJSON } = require("css-convert-json");

function writeFile(filePath, content, origin) {
    return new Promise(async (resolve, reject) => {
        try {
            let scss = toCSS({ children: content, attributes: {} });
            if (origin) {
                scss = `${origin}\n${scss}`;
            }
            fs.writeFileSync(filePath, scss);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

function readFile(filePath) {
    return new Promise(async (resolve, reject) => {
        await fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
            if (!err) {
                resolve({ js: toJSON(data), or: data });
            } else {
                reject(err);
            }
        });
    });
}

function getAll(mobile, desktop) {
    return new Promise(async (resolve, reject) => {
        try {
            let all = {};

            Object.keys(mobile).map(async (keyM, iM) => {
                Object.keys(desktop).map(async (keyD, iD) => {
                    if (keyM === keyD) {
                        let attrsM = Object.values(mobile)[iM].attributes;
                        let attrsD = Object.values(desktop)[iD].attributes;
                        Object.keys(attrsM).map((akM, iaM) => {
                            Object.keys(attrsD).map((akD, iaD) => {
                                if (akM === akD) {
                                    if (Object.values(attrsM)[iaM] === Object.values(attrsD)[iaD]) {
                                        if (!all[keyM]) {
                                            all[keyM] = { children: {}, attributes: {} };
                                        }
                                        all[keyM].attributes[akM] = Object.values(attrsM)[iaM];
                                        attrsM[akM] = "remove";
                                        attrsD[akD] = "remove";
                                    }
                                }
                            });
                        });
                        let childM = Object.values(mobile)[iM].children;
                        let childD = Object.values(desktop)[iD].children;
                        if (childM && childD) {
                            let result = await getAll(childM, childD);
                            if (!all[keyM]) {
                                all[keyM] = { children: {}, attributes: {} };
                            }
                            all[keyM].children = result.all;
                            childM = result.mob;
                            childD = result.des;
                        }
                    }
                });
            });
            mobile = await cleaner(mobile);
            desktop = await cleaner(desktop);
            resolve({ all: all, mob: mobile, des: desktop });
        } catch (error) {
            reject(error);
        }
    });
}

function removeAll(child, all) {
    return new Promise(async (resolve, reject) => {
        try {
            let newChild = { ...child };
            Object.keys(all).map(async (keyA) => {
                let isFind = false;
                Object.keys(child).map(async (keyD) => {
                    if (keyA === keyD) {
                        isFind = true;
                        let attrsA = all[keyA].attributes;
                        let attrsD = child[keyD].attributes;
                        newChild[keyD].attributes = { ...attrsD, ...attrsA };

                        let childA = all[keyA].children;
                        let childD = child[keyD].children;
                        newChild[keyD].children = await removeAll(childD, childA);
                    }
                });
                if (!isFind && !keyA.includes("@media")) {
                    newChild[keyA] = all[keyA];
                }
            });

            resolve(newChild);
        } catch (error) {
            reject(error);
        }
    });
}

function cleaner(obj) {
    return new Promise(async (resolve, reject) => {
        try {
            for (const key in obj) {
                if (typeof obj[key] === "object") {
                    cleaner(obj[key], "remove");

                    if (Object.keys(obj[key]).length === 0 && obj[key].constructor === Object) {
                        delete obj[key];
                    }
                } else if (obj[key] === "remove") {
                    delete obj[key];
                }
            }
            resolve(obj);
        } catch (error) {
            reject(error);
        }
    });
}

async function pack(allFilePath) {
    try {
        let mobileFilePath = "";
        let desktopFilePath = "";
        const allContent = await readFile(allFilePath);
        let allSplit = allFilePath.split("/");

        Object.keys(allContent.js.children).map((key, ik) => {
            if (key.includes("@media")) {
                let importValue = Object.values(allContent.js.children)[ik]["0"];
                importValue = importValue.replace('@use "./', "").replace('";', "");
                allSplit[allSplit.length - 1] = importValue;
                if (importValue.includes("mob")) {
                    mobileFilePath = allSplit.join("/");
                } else {
                    desktopFilePath = allSplit.join("/");
                }
            } else {
                throw "Pack ERROR - Already PACK";
            }
        });

        if (!mobileFilePath || !desktopFilePath) {
            throw "Pack ERROR - Sub files NOT FOUND";
        }

        const mobileContent = (await readFile(mobileFilePath)).js;
        const desktopContent = (await readFile(desktopFilePath)).js;

        let all = await getAll(mobileContent.children, desktopContent.children);

        await writeFile(mobileFilePath, all.mob);
        await writeFile(desktopFilePath, all.des);
        await writeFile(allFilePath, all.all, allContent.or);

        console.log("Pack Complete");
    } catch (error) {
        console.error(error);
    }
}

async function unpack(allFilePath) {
    try {
        let mobileFilePath = "";
        let desktopFilePath = "";
        const allContent = await readFile(allFilePath);
        let allSplit = allFilePath.split("/");
        let allBase = "";
        let isPack = false;

        Object.keys(allContent.js.children).map((key, ik) => {
            if (key.includes("@media")) {
                let importValue = Object.values(allContent.js.children)[ik]["0"];
                importValue = importValue.replace('@use "./', "").replace('";', "");
                allSplit[allSplit.length - 1] = importValue;
                if (importValue.includes("mob")) {
                    mobileFilePath = allSplit.join("/");
                } else {
                    desktopFilePath = allSplit.join("/");
                }
                allBase += `${key}{\n@use "./${importValue}";\n}\n`;
            } else {
                isPack = true;
            }
        });

        if (!isPack) {
            throw "Unpack ERROR - Not PACK";
        }

        if (!allBase) {
            throw "Unpack ERROR - All EMPTY";
        }

        if (!mobileFilePath || !desktopFilePath) {
            throw "Unpack ERROR - Sub files NOT FOUND";
        }

        const mobileContent = (await readFile(mobileFilePath)).js;
        const desktopContent = (await readFile(desktopFilePath)).js;

        let all = { all: allBase };

        all.des = await removeAll(desktopContent.children, allContent.js.children);
        all.mob = await removeAll(mobileContent.children, allContent.js.children);

        await writeFile(mobileFilePath, all.mob);
        await writeFile(desktopFilePath, all.des);
        await writeFile(allFilePath, {}, all.all);

        console.log("Unpack Complete");
    } catch (error) {
        console.error(error);
    }
}

function packer() {
    let path = process.argv[process.argv.length - 1];
    if (process.argv.find((argv) => argv === "--pack")) {
        console.log("Pack Start");
        pack(path);
    } else if (process.argv.find((argv) => argv === "--unpack")) {
        console.log("Unpack Start");
        unpack(path);
    } else {
        console.warn("Incorrect param");
    }
}

packer();
