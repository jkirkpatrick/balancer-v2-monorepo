#!/usr/bin/env node

/* eslint-disable */
const fs = require('fs');
const path = require('path');

// skips dotfiles is built-in to function
const skipDirs = [ 'node_modules', 'dist', 'artifacts', 'cache', 'forge-artifacts', 'forge-cache', 'forge-std', 'deployments', 'governance-scripts' ];

const OLD_PRAGMA_REGEX=/pragma solidity \^0.7.0;/g;
const NEW_PRAGMA="pragma solidity 0.8.19;";


try {
  const result = getAllFiles(".", "*.sol")

  for(let i=0; i<result.length; i++) {
    const f = fs.readFileSync(result[i], { options: 'utf-8' }).toString();
    if (f.match(OLD_PRAGMA_REGEX) !== null) {
      const fixedpragma = f.replace(OLD_PRAGMA_REGEX, NEW_PRAGMA);
      fs.writeFileSync(result[i], fixedpragma);
      console.log('updated', result[i]);
    //} else {
      // console.log('no pragma match', result[i]);
    }
  }
} catch (err) {
  console.error(err);
  console.log(err.message);
  process.exit(1);
}


function getAllFiles(dirPath, findName, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  let globExt;
  if (findName.startsWith("*.")) {
    globExt = findName.split(".")[1];
  }

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      // skip dotfiles
      if (!file.startsWith('.') && !skipDirs.includes(file)) { 
        arrayOfFiles = getAllFiles(dirPath + "/" + file, findName, arrayOfFiles);
      }
    } else {
      if (findName) {
        if (file === findName || file.endsWith(`.${globExt}`)) { 
          arrayOfFiles.push(`./${path.join(dirPath, file)}`);
        }
      } else {
        arrayOfFiles.push(`./${path.join(dirPath, file)}`);
      }
    }
  })
  return arrayOfFiles;
}