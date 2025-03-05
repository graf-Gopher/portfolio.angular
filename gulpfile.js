const gulp = require("gulp");
const fs = require("fs");
const { toCSS, toJSON } = require("css-convert-json");

function findDuplicateAttributes(data) {
    function mergeObjects(objArray) {
        const result = {};

        objArray.forEach((obj) => {
            for (const key in obj) {
                if (!result[key]) {
                    result[key] = JSON.parse(JSON.stringify(obj[key]));
                } else {
                    result[key].attributes = getCommonAttributes(result[key].attributes, obj[key].attributes);
                    result[key].children = mergeObjects([result[key].children, obj[key].children]);
                }
            }
        });
        return result;
    }

    function getCommonAttributes(attr1, attr2) {
        if (!attr1 || !attr2) return {};
        return Object.keys(attr1).reduce((common, key) => {
            if (attr2.hasOwnProperty(key) && attr1[key] === attr2[key]) {
                common[key] = attr1[key];
            }
            return common;
        }, {});
    }

    function extractGlobalStyles(data) {
        const globalStyles = {};

        for (const key in data) {
            const allMediaAttributes = data[key].children || {};
            const mediaKeys = Object.keys(allMediaAttributes);

            if (mediaKeys.length > 0) {
                const attributeLists = mediaKeys.map((media) => allMediaAttributes[media].attributes || {});
                const commonAttributes = findCommonAttributes(attributeLists);

                globalStyles[key] = {
                    attributes: commonAttributes,
                    children: extractGlobalStyles(allMediaAttributes),
                };
            } else {
                globalStyles[key] = JSON.parse(JSON.stringify(data[key]));
            }
        }
        return globalStyles;
    }

    function findCommonAttributes(attributeLists) {
        if (attributeLists.length === 0) return {};

        return attributeLists.reduce(
            (common, attributes) => {
                for (const key in common) {
                    if (!(key in attributes) || common[key] !== attributes[key]) {
                        delete common[key];
                    }
                }
                return common;
            },
            { ...attributeLists[0] }
        );
    }

    const mergedData = mergeObjects(data);
    return extractGlobalStyles(mergedData);
}

function removeDuplicateAttributes(data, commonAttrs) {
    function cleanObject(obj, common) {
        for (const key in obj) {
            if (common[key]) {
                obj[key].attributes = removeCommon(obj[key].attributes, common[key].attributes);
                obj[key].children = cleanObject(obj[key].children, common[key].children);
            }
        }
        return removeEmptyObjects(obj);
    }

    function removeCommon(attrs, commonAttrs) {
        if (!attrs || !commonAttrs) return attrs;
        return Object.keys(attrs).reduce((filtered, key) => {
            if (!commonAttrs.hasOwnProperty(key)) {
                filtered[key] = attrs[key];
            }
            return filtered;
        }, {});
    }

    function removeEmptyObjects(obj) {
        return Object.keys(obj).reduce((filtered, key) => {
            if (Object.keys(obj[key].attributes || {}).length > 0 || Object.keys(obj[key].children || {}).length > 0) {
                filtered[key] = obj[key];
            }
            return filtered;
        }, {});
    }

    return data.map((obj) => cleanObject(JSON.parse(JSON.stringify(obj)), commonAttrs));
}

function restoreOriginalData(cleanedData, commonAttrs) {
    function restoreObject(obj, common) {
        for (const key in common) {
            if (!obj[key]) {
                obj[key] = JSON.parse(JSON.stringify(common[key]));
            } else {
                obj[key].attributes = { ...obj[key].attributes, ...common[key].attributes };
                obj[key].children = restoreObject(obj[key].children, common[key].children);
            }
        }
        return obj;
    }

    return cleanedData.map((obj) => restoreObject(JSON.parse(JSON.stringify(obj)), commonAttrs));
}

gulp.task("minify", async () => {
    await fs.copyFile("./" + filePath, "./" + filePath + ".backup", (err) => {
        if (err) {
            console.error(err);
        }
    });
    await fs.readFile("./" + filePath, { encoding: "utf-8" }, (err, data) => {
        if (!err) {
            const json = toJSON(data);

            let mediaArray = [];
            let keys = [];
            let elser = {};

            Object.keys(json.children).map((key, ik) => {
                if (key.includes("@media")) {
                    keys.push(key);
                    mediaArray.push(Object.values(json.children)[ik].children);
                }
            });
            Object.keys(json).map((key) => {
                if (!key.includes("children")) {
                    elser[key] = json[key];
                }
            });
            Object.keys(elser).map((key) => {
                if (elser[key] === Object(elser[key]) && Object.keys(elser[key]).length === 0) {
                    delete elser[key];
                }
            });

            const commonAttributes = findDuplicateAttributes(mediaArray);
            const cleanedData = removeDuplicateAttributes(mediaArray, commonAttributes);

            const newJson = {
                children: {
                    ...commonAttributes,
                    ...Object.fromEntries(keys.map((key, ik) => [key, { children: cleanedData[ik], attributes: {} }])),
                },
                attributes: {},
            };

            let scss = toCSS(newJson, 0, 0);
            Object.entries(elser).forEach(([key, value]) => {
                scss = `${value}\n${scss}`;
            });
            // scss = scss.replace(/\n+/g, "");
            // scss = scss.replace(/\s+/g, " ");
            fs.writeFileSync("./" + filePath, scss);
        } else {
            reject(err);
        }
    });
});

gulp.task("restore", async () => {
    await fs.readFile("./" + filePath, { encoding: "utf-8" }, (err, data) => {
        if (!err) {
            const json = toJSON(data);

            let mediaArray = [];
            let commonAttributes = {};
            let keys = [];
            let elser = {};

            Object.keys(json.children).map((key, ik) => {
                if (key.includes("@media")) {
                    keys.push(key);
                    mediaArray.push(Object.values(json.children)[ik].children);
                } else {
                    commonAttributes[key] = Object.values(json.children)[ik];
                }
            });

            Object.keys(json).map((key) => {
                if (!key.includes("children")) {
                    elser[key] = json[key];
                }
            });
            Object.keys(elser).map((key) => {
                if (elser[key] === Object(elser[key]) && Object.keys(elser[key]).length === 0) {
                    delete elser[key];
                }
            });

            const cleanedData = removeDuplicateAttributes(mediaArray, commonAttributes);
            const restoredData = restoreOriginalData(cleanedData, commonAttributes);

            const restoreJson = {
                children: {
                    ...Object.fromEntries(keys.map((key, ik) => [key, { children: restoredData[ik], attributes: {} }])),
                },
                attributes: {},
            };

            let scssRest = toCSS(restoreJson);
            Object.entries(elser).forEach(([key, value]) => {
                scssRest = `${value}\n${scssRest}`;
            });
            fs.writeFileSync("./" + filePath, scssRest);
        } else {
            reject(err);
        }
    });
});

gulp.task("backup", async () => {
    await fs.copyFile("./" + filePath + ".backup", "./" + filePath, (err) => {
        if (err) {
            console.error(err);
        }
    });
    await fs.unlink("./" + filePath + ".backup", (err) => {
        if (err) {
            console.error(err);
        }
    });
});

const filePath = "src/app/shared/site/header/header.scss";
gulp.task("default", gulp.series("minify"));
// gulp.task("default", gulp.series("restore"));
// gulp.task("default", gulp.series("backup"));
