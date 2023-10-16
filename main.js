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

// fs.createReadStream(zipFilePath).pipe(zip.extractAllTo(pathUnzipped, true));
IOhandler.unzip(zipFilePath, pathUnzipped)
.then(() => {
    console.log('Extraction operation complete');
})
.catch((err) => {
    console.log('Extraction Error: ', err);
})

IOhandler.readDir(pathUnzipped)
.then((filePaths) => {
    console.log(filePaths);
})
.catch((err) => {
    console.log('Filepaths Error: ', err);
})