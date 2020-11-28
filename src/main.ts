import path = require('path');
import chokidar = require('chokidar');
import child_process = require('child_process');
import util = require('util');

const exec = util.promisify(child_process.exec);
const watcher = chokidar.watch('/Users/yuichielectric/Downloads', {
    persistent: true,
    ignoreInitial: true,
    depth: 0
});

async function compress(filepath: string) {
    try {
        await exec(`/usr/local/bin/gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${filepath}".optimized "${filepath}"`);
        await exec(`mv ${filepath}.optimized ${filepath}`);
    } catch(error) {
        console.error(error);
    }
}

watcher.on('add', filepath => {
    if (path.extname(filepath).toLowerCase() === '.pdf') {
        compress(filepath);
    }
});
