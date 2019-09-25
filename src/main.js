/*
* Usage:
* node main.js -clean d:\myproject\assets d:\out.txt
* node main.js -size d:\myproject\assets d:\out.txt
* node main.js -mem d:\myproject\assets d:\out.txt
*/
const AssetCleaner = require('./Asset_Cleaner');
const AssetSize = require('./Asset_Cleaner_Sort');
const AssetFind = require('./Asset_UuidFinder');


module.exports = function parseCommand(command, sourceFile, destFile, uuid) {
    if (!command || command.length <= 0) {
        console.error('main: command is invalid');
        return;
    }
    if (!sourceFile || sourceFile.length <= 0) {
        console.error('main: sourceFile is invalid');
        return;
    }
    if (!destFile || destFile.length <= 0) {
        console.error('main: destFile is invalid');
        return;
    }

    switch (command) {
        case '-clean':
            AssetCleaner.start(sourceFile, destFile);
            break;
        case '-size':
            AssetSize.start(sourceFile, destFile);
            break;
        case '-find':
            AssetFind.start_find(sourceFile, destFile, uuid);
            break;
        default:
            let strHelp = 'Usage: node main.js <command>\n' +
                'Examples:\n' +
                '  node main.js -clean d:/myproject/assets d:/out.txt\n' +
                '  node main.js -size d:/myproject/assets d:/out.txt';
            console.log(strHelp);
            break;
    }

    return true;
};

