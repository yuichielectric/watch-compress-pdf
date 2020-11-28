import path = require('path');
import chokidar = require('chokidar');
const watcher = chokidar.watch('/Users/yuichielectric/Downloads', {
    persistent: true,
    ignoreInitial: true,
    depth: 0
});
watcher.on('add', filepath => {
    if (path.extname(filepath).toLowerCase() === '.pdf') {
        console.log(`File ${filepath} has been added`);
    }
});

watcher.on('change', filepath => {
    if (path.extname(filepath).toLowerCase() === '.pdf') {
        console.log(`File ${filepath} has been changed`);
    }
});
