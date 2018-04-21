'use strict';
const {writeFileSync, readdirSync, mkdirSync } = require('fs');
const {resolve} = require('path');

const [,,episodeName,epTitle] = process.argv;

const header = `'use strict';`;
const deps = `const fi = require('figlet');
const ch = require('chalk');
const clear = require('clear');
clear();console.log('');`

const title = tit => `console.info(ch.red(fi.textSync(${tit})))`;

const episodePath = (...args) => resolve(__dirname, '..', 'episodios', ...args);

const currentEpisodes = readdirSync(episodePath(''));
const maxEpisodeNumber = Math.max(...currentEpisodes
                            .map(x=>x.slice(0,2))
                            .map(Number)
                            .filter(x=>x))

const nextEpisodePrefix = (maxEpisodeNumber + 1).toString().padStart(2,'0');

console.log(nextEpisodePrefix);

const fileBody = [
    header, deps, title(epTitle)
].join('\n\n');

const fullEpisodeName = `${nextEpisodePrefix}-${episodeName}`;
mkdirSync(episodePath(fullEpisodeName));

writeFileSync(episodePath(fullEpisodeName, 'index.js'), fileBody);