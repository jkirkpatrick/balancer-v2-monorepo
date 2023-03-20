#!/usr/bin/env node

/* eslint-disable */
const fs = require('fs');
const path = require('path');

/*
  I looked up the antonymn for 'yarn' ... I was surprised to learn that it accuracy and authenticity were in the results
*/

// TODO: parse .gitignore
// skips dotfiles is built-in to function
const skipDirs = [ 'node_modules', 'dist', 'artifacts', 'cache', 'forge-artifacts', 'forge-cache', 'forge-std' ];

try {
  const result = getAllFiles(".", "package.json")
  // console.log(result);
  for(let i=0; i<result.length; i++) {
    const f = fs.readFileSync(result[i], 'utf-8');
    const pkg = JSON.parse(f);
    const deppkg = search(pkg, 'dependencies', result, result[i]);
    const devpkg = search(deppkg, 'devDependencies', result, result[i]);
    // console.log(JSON.stringify(devpkg));
    // console.log(devpkg);
    //const pkgstr = JSON.stringify(pkg, null, 2);
    const newpkg = JSON.stringify(devpkg, null, 2);
    // if (pkgstr !== newpkg) {
      console.log('updated', result[i]);
      fs.renameSync(result[i], `${result[i]}.ignore`);
      fs.writeFileSync(result[i], newpkg);
    //}
  }
} catch (err) {
  console.error(err);
  console.log(err.message);
  process.exit(1);
}

function search(pkg, key, foundpackages, packagefile) {
  for (let f in pkg[key]) {
    if (pkg[key][f] === 'workspace:*') {
      const pname = getpkgname(f);
      if (!pname) {
        throw new Error(`Can not get package name: ${f}`);
      }
      const ppname = findpkgpath(pname, foundpackages);
      if (!ppname) {
        throw new Error(`Can not get package path: ${packagefile} ${key}.${pname}`);
      }
      const fname = `file:./../.${ppname}`
      // console.log(key, f, ":", pkg[key][f], "=>", fname);
      pkg[key][f] = fname;
      // console.log(key, f, ":", pkg[key][f], "=>", fname);
    }
  }
  return pkg;
}

function getpkgname(pkgname) {
  const namespace = pkgname.replace("@balancer-labs/", "");
  return namespace.replace("v2-", "");
}

function findpkgpath(pathname, foundpackages) {
  const pathpart = `/${pathname}/package.json`;
  // console.log('search pattern', pathpart);
  for(let p in foundpackages) {
    if (foundpackages[p].includes(pathpart)) {
      return foundpackages[p].replace('package.json', ''); 
    }
  }
}


function getAllFiles(dirPath, findName, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      // skip dotfiles
      if (!file.startsWith('.') && !skipDirs.includes(file)) { 
        arrayOfFiles = getAllFiles(dirPath + "/" + file, findName, arrayOfFiles);
      }
    } else {
      if (findName) {
        if (file === findName) { 
          arrayOfFiles.push(`./${path.join(dirPath, file)}`);
        }
      } else {
        arrayOfFiles.push(`./${path.join(dirPath, file)}`);
      }
    }
  })
  return arrayOfFiles;
}
