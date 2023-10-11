/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
// The below lacks promises, henceforth you need to add a promise 
const unzip = (pathIn, pathOut) => {
fs.createReadStream(pathIn).pipe(
  unzipper.Extract({ path: pathOut })
    .on("error", err => {rejects(err);})
    .on("finish", () => {resolve()})
)
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  // Should return a list with the complete paths to the three images inside your myfile.zip folder (which should be unzipped)
  // If there is other stuff that is not a png, you want to ignore it from the list.
  // This is also lacking a promise, you need to convert it to accept promises. 
  // Recall:
  // function readShit() {
    // return new Promise((resolve, reject) => {
      // fs.createReadStream('abc.txt')
        // .on("error", (err) => reject(err))
        // .on("end", (err) => resolve(err))
    // })
  // }
  IOhandler.unzip()
    .then(() => IOhandler.readDir())
    .then((arr) => IOhandler(arr))
    .catch(err => console.log(err)); 
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {};
//

module.exports = {
  unzip,
  readDir,
  grayScale,
};
