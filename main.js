const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const AdmZip = require("adm-zip");
const zip = new AdmZip(zipFilePath);
const fs = require('fs');

let index = 0;

// fs.createReadStream(zipFilePath).pipe(zip.extractAllTo(pathUnzipped, true));
IOhandler.unzip(zipFilePath, pathUnzipped)
.then(() => console.log('Extraction operation complete'))
.then(() => IOhandler.readDir(pathUnzipped))
.then((filePaths) => {
    console.log(filePaths);
    const promises = filePaths.map((filePath) => {
        index++;
        const processedFilePath = `${pathProcessed}/${index}.png`;
        return IOhandler.grayScale(filePath, processedFilePath); 
    });
    return Promise.all(promises);
})
.then(() => console.log('Grayscale Complete'))
.catch(error => console.log(error))
