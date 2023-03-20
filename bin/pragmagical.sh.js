#!/usr/bin/env node

/* eslint-disable */
const fs = require('fs');
const path = require('path');

// skips dotfiles is built-in to function
const skipDirs = [ 'node_modules', 'dist', 'artifacts', 'cache', 'forge-artifacts', 'forge-cache', 'forge-std', 'deployments', 'governance-scripts' ];

try {
  const result = getAllFiles(".", "*.sol")
  // console.log(result);
  for(let i=0; i<result.length; i++) {
    const f = fs.readFileSync(result[i], 'utf-8');
    // const pkg = JSON.parse(f);
    // const deppkg = search(pkg, 'dependencies', result, result[i]);
    // const devpkg = search(deppkg, 'devDependencies', result, result[i]);
      console.log('updated', result[i]);
    //  fs.renameSync(result[i], `${result[i]}.ignore`);
    //  fs.writeFileSync(result[i], newpkg);
    
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