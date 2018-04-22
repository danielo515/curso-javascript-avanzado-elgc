'use strict';

const { createContext, runInContext, runInThisContext } = require('vm');
const { readFileSync, appendFileSync, createReadStream, createWriteStream } = require('fs');
const { resolve } = require('path');
const { red, blue, bold, green, yellow } = require('chalk');
const repl = require('repl');
const clear = require('clear');
const prompt = red.bold('GEEK! > ');

const replContext = {
    __clear: clear
}

const filePath = resolve(process.argv[2]);
const fileContent = readFileSync(filePath,'utf8');
console.log(fileContent);
const evalOptions = {
    filename: filePath,
    lineOffset: fileContent.split('\n').length
};

const autocompleteRegex = /^try { .* } catch \(e\) {}$/;
const isAutoCompleteCmd = (x) => autocompleteRegex.test(x);

const customEval = (cmd, context, filename, callback) => {

    const result = runInContext(cmd, context, evalOptions);
    callback(null,result);
    if (isAutoCompleteCmd(cmd)) {
        return;
    };
    // console.info('Eval this: ',green(cmd.replace(/\n/,'')));
    const output =
        result === undefined
            ? cmd
            : `${cmd.trim()} /* ${JSON.stringify(result)} */\n`;

    appendFileSync('./repl-session.js', output)
}

const customWriter = (input) => {
    console.log('Outputo', input)
    return yellow.bold(input)
}

const replServer = repl.start({
    prompt,
    ignoreUndefined: true,
    // writer: customWriter,
    eval: customEval,
    // useColors: true,
})

// fileStream.on('data', process.stdin.write);
// process.stdin.on('data', (ch) => {
//     if (ch.toString() === 'x') {
//         process.stdout.cursorTo(0);
//         process.stdout.write(green('xxxx'))
//     }
// })

runInContext(fileContent, replServer.context);

Object.assign(replServer.context, replContext);


clear();
console.info(blue.bold('\nWelcome sir'));