/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

// Replaced with AdmZip due to corruption to unzipped files. 
const AdmZip = require("adm-zip"),
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

// function unzip originally from starter code
// create a directory called unzipped with your images in it
const unzip = (pathIn, pathOut) => {
  // implementation of promise 
  return new Promise((resolve, reject) => {
    try{
      // defining zip variable taking pathIn...
      const zip = new AdmZip(pathIn);
      // ...to be used here to write to pathOut 
      zip.extractAllTo(pathOut, true); 
      // ending the promise if successful
      resolve(); 
    }
    // error detection
    catch (error) {
      reject(error);
    }
  }
)}

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
  // Implementation of required promises 
  return new Promise((resolve, reject) => {
    // Reading the directory taken from 'dir' 
    fs.readdir(dir, (err, file) => {
      if (err) {
        reject(err);
        // return to kill the function 
        return;
      }
      // This is automatically your else 
      // filter the items (file) finding anything that has the extention .png 
      const pngExtensions = file.filter((file) => path.extname(file) === '.png')
      // Should return a list with the complete paths to the three images inside your myfile.zip folder (which should be unzipped)
      const filePaths = []
      // If there is other stuff that is not a png, you want to ignore it from the list.

      // looping through everything in pngExtensions 
      for (const file of pngExtensions) {
        // which we push towards our array 
        filePaths.push(path.join(dir, file));
      }
      // ending the promise with the resolve 
      resolve(filePaths); 
    })
  })
}

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
      fs.createReadStream(pathIn)
      .pipe(
        new PNG()
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            const grey = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
            this.data[idx] = grey;
            this.data[idx + 1] = grey;
            this.data[idx + 2] = grey;
          }
        }

        this.pack().pipe(fs.createWriteStream(pathOut));
      });
 }
// const grayScale = (pathIn, pathOut) => {
//   return new Promise((resolve, reject) => {
//     colored = fs.createReadStream(pathIn)
//     colored.pipe(new PNG({})).on('parsed', function() {
//       for (var y = 0; y < this.height; y++) {
//         for (var x = 0; x < this.width; x++) {
//           var idx = (this.width * y + x) << 2;
          
//           const grey = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;

//           this.data[idx] = grey;
//           this.data[idx + 1] = grey;
//           this.data[idx + 2] = grey;
//           //this.data[idx + 3] = this.data[idx + 3];
//         }
//       }
//       const grayWriter = fs.createWriteStream(
//         path.join(pathOut, path.basename(pathIn))
//       );
//       this.pack().pipe(grayWriter);
//       grayWrite.on("finished", () => {
//         resolve(path.basename(pathIn) + "grayscaled");
//       });
//     });

//     colored.on("error", (err) => {
//       reject('Conversion failure: ' + err);
//     });
//   });
// };


module.exports = {
  unzip,
  readDir,
  grayScale,
};
